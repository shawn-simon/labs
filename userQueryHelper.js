var ChannelUser = require("../models/channelUser");
var User = require("../models/user");
var mongoose = require('mongoose');
var Follower = require('../models/follower');
var logger = require('../lib/logger');
var Promise = require('bluebird');
var _ = require('lodash');

var SQ_DEFAULT_PAGE_SIZE = 20;

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var squashString = function(_un) {
    return _un.trim()
        .toLowerCase()
        .replace(/\s/g, '')
}

// given index, size page params : return linear ranges [start, end]
var pageMify = function(pageIndex, pageSize) {
    pageIndex = (pageIndex == null || isNaN(pageIndex)) ? 0 : pageIndex;
    pageSize = (pageSize == null || isNaN(pageSize)) ? SQ_DEFAULT_PAGE_SIZE : pageSize;
    var pS = pageIndex * pageSize;
    var pE = (pageIndex * pageSize) + pageSize;
    return [pS, pE];
}

// searches for users in a channel 
// given reg_exp applied to q_property.  returns users with fields selected with field_sel.
var searchChannel = function(curr_user, channelId, reg_exp, q_property, field_sel, pageIndex, pageSize, fn_e_o) {
    getUsersInChannel(curr_user, channelId, "_id", null, null, function(err, chanUsers) {
        if (!err) {
            var numChanUsers = chanUsers.length;

            var _pm = pageMify(pageIndex, pageSize);

            var pS = _pm[0];
            var pE = _pm[1];

            var userIds = [];
            chanUsers.forEach(function(f, i) {
                userIds.push(f._id)
            });

            if (userIds.length > 0)
                searchUsersInIdBag(curr_user, userIds, reg_exp, q_property, field_sel, function(uErr, users) {
                    if (!uErr) {
                        var _retUsers = [];
                        users.forEach(function(f, i) {
                            if (i >= pS && i < pE) _retUsers.push(f);
                        });
                        fn_e_o(null, {
                            total: numChanUsers,
                            users: _retUsers
                        })
                    } else
                        fn_e_o(uErr)
                })
            else
                fn_e_o(null, {
                    total: numChanUsers,
                    users: []
                })
        }
    })
}


var searchFollowers = function(curr_user, reg_exp, q_property, field_sel, pageIndex, pageSize, fn_e_o) {
    getFollowers(curr_user, "_id", null, null, function(fErr, followers) {
        if (!fErr) {
            var userIds = [];
            var _pm = pageMify(pageIndex, pageSize);

            var pS = _pm[0];
            var pE = _pm[1];

            followers.forEach(function(f, i) {
                userIds.push(f._id.toString())
            });
            if (userIds.length > 0)
                searchUsersInIdBag(curr_user, userIds, reg_exp, q_property, field_sel, function(uErr, users) {
                    if (!uErr) {
                        var _retUsers = [];
                        users.forEach(function(f, i) {
                            if (i >= pS && i < pE) _retUsers.push(f);
                        });
                        fn_e_o(null, {
                            total: followers.length,
                            users: _retUsers
                        });
                    } else
                        fn_e_o(uErr);
                })
            else
                fn_e_o(null, {
                    total: 0,
                    users: []
                })

        } else
            fn_e_o(fErr);
    })
}

// TODO: sort by order of username (A-Z)
// get a users followers. users have properties as specified in field_sel
var getFollowers = function(curr_user, field_sel, pageIndex, pageSize, fn_e_o) {
    var fs = field_sel;
    var query = {};

    query = {
        followedUser: mongoose.Types.ObjectId(curr_user._id),
        followedType: 'user',
        enabled: true
    };
    mongoose.set('debug', true);
    var followerQuery =
        Follower.find(query)
            .populate({
                path:'follower',
                select: field_sel,
                model: undefined,
                options: { sort: { "username": 1}}
            })
            // .populate('follower', field_sel, null, null, {
            //   sort: {
            //     "username": -1
            //   }
            // }) // is  a user
            //.select('follower _id')
            .lean(true);
    if (pageIndex && pageIndex >= 0) {
        followerQuery.skip(pageIndex * pageSize).limit(pageSize);
    }

    followerQuery.exec(function(err, followerUsers) {
        if (err) {
            logger.mainLogger.error("Error finding followers for user ");
            fn_e_o(err);
        } else {
            var _ret = []
            followerUsers.forEach(function(e) {
                if (e.follower && e.follower._id) {
                    _ret.push(e.follower);
                }
            })
            fn_e_o(null, _ret)
        }
    })
}

// returns users in a channel.  Users have propertis as specified in field_sel
var getUsersInChannel = function(curr_user, _in_channelId, field_sel, pageIndex, pageSize, fn_e_o) {

    var fs = field_sel;
    var query = {};
    var cid;

    if (_in_channelId && typeof _in_channelId === mongoose.Types.ObjectId)
        cid = _in_channelId;
    else
        cid = mongoose.Types.ObjectId(_in_channelId);


    query['channel'] = cid
    var cuQuery = ChannelUser
        .find(query)
        .populate('user', fs)
        .select('user isAdmin');

    if (pageIndex && pageIndex >= 0) {
        if (!pageSize) pageSize = SQ_DEFAULT_PAGE_SIZE;
        cuQuery.skip(pageIndex * pageSize).limit(pageSize);
    }

    cuQuery.lean(true)
        .exec(function(err, channelUserObjects) {
            if (err) {
                logger.mainLogger.error('Error when getting the channel users for channel ID %s', _in_channelId);
                fn_e_o(err);
            } else {
                var _ret = []
                channelUserObjects.forEach(function(e) {
                    _ret.push(e.user);
                })
                //ChannelUser()
                fn_e_o(null, _ret);
            }
        });
}

// NOTE: omit user_ids (as empty array) to provide global search
var searchUsersInIdBag = function(curr_user, user_ids, reg_exp, q_property, field_sel, fn_e_o) {
    // logger.mainLogger.info("Searching: " + JSON.stringify({
    //   curUser: curr_user._id,
    //   userids: user_ids,
    //   regex: reg_exp,
    //   prop: q_property,
    //   fields: field_sel
    // }) )
    // setup some defaults for field selection
    var fs = field_sel; //

    var _ids = [];
    if (user_ids)
        user_ids.forEach(function(el) {
            var iE = mongoose.Types.ObjectId(el)
            _ids.push(iE)
        });

    var property = q_property;
    if (!property)
        property = 'username';

    var query = {}
    if (reg_exp)
        query[property] = new RegExp(reg_exp, "i")

    if (_ids.length > 0)
        query['_id'] = {
            $in: _ids
        }

    var uQuery = User
        .find(query)
        .select(fs)
        .lean(true);
    // global search limit
    if (_ids.length == 0)
        uQuery.limit(20);

    uQuery.exec(function(err, userObjects) {
        if (err) {
            logger.mainLogger.error('Unable to query for users');
            logger.mainLogger.error(err);
            fn_e_o(err)
        } else {
            if (userObjects) {
                fn_e_o(null, userObjects);
            } else {
                fn_e_o();
            }
        }
    });
}

// Queries Users having starts-with-URL semantic on url property
// builds an associative list of known suffixes
// then searches that with an incremental suffix counter until
// one is not present (that will be our new suffix ).
// resolves a thenable(new_url)
var determineUrl = function( sluggedUrl) {
    var q = {
        url: new RegExp('^' + sluggedUrl , "i")
    };

    return Promise.resolve().then(function()
    {
        return User.find(q).lean()
            .select("url").exec().then(function (users) {
                var suffixes = [];
                if (users) {
                    _.each(users, function (u) {         // get only suffixes and/or empty suffix
                        var _suffix = u.url.substring(sluggedUrl.length, u.length);
                        if (!_.includes(suffixes, _suffix))
                            suffixes.push(_suffix);
                    });
                }
                return suffixes;
            })
            .then(function (suffixes) {
                // nothing - not even empty suffix -, highest likelyhood of it being unique
                if (suffixes.length  == 0)
                    return Promise.resolve( sluggedUrl );

                // Map of suffixes
                var mapOfSuffixes = {};

                // create a map:bool of all known suffixes
                _.each(suffixes, function(s) {
                    mapOfSuffixes[s] = true;
                });

                // construct a suffix match counter
                // because we match the raw name as '', increment
                var _sx =  mapOfSuffixes['']?1:0;

                // search map with new suffixes until failure.  increment suffix counter per iteration
                // NOT matching means that suffix is free 'e.g. _1'
                while(mapOfSuffixes['_' + (_sx)]) {
                    _sx++;
                }

                var newSuffix = '';                     // no matches: pass

                if(_sx > 0)
                    newSuffix = '_' + (_sx);            // at least one match: set suffix

                // return url with suffix string appended
                return Promise.resolve( sluggedUrl + newSuffix);
            })
    })
}


// Squshes string to single case ( so darbBIT1001 == darkbit1001 ) and removes spaces
var findDuplicateUser = function (_un, _em, _url, fn_e_cond) {
    var escapedUn = escapeRegExp(_un);
    var escapedEm = escapeRegExp(_em);
    // URL should be safe already ( it's a slug )

    var q = {
        $or: [{
            username: new RegExp('^' + escapedUn + '$', "i")
        }, {
            email: _em
        }, {
            url: _url
        }]
    };

    var _ERRCOND;

    User.findOne(q).select("_id username url email").exec(function (err, user) {

        if (user) {
            if (escapeRegExp(user.username.toLowerCase().trim()) == escapedUn.toLowerCase().trim() )
                _ERRCOND = "USERNAME";
            if (escapeRegExp(user.email.toLowerCase().trim()) == escapedEm.toLowerCase().trim() )
                _ERRCOND = "EMAIL";
            if (user.url == _url)
                _ERRCOND = "USERNAME"; // URLS
        }

        if(!_ERRCOND)
            _ERRCOND = "OK";

        console.log("ERR: " + _ERRCOND);
        fn_e_cond(err ? err : null, _ERRCOND);
    })

}

module.exports = {
    determineUrl: determineUrl,
    findDuplicateUser: Promise.promisify(findDuplicateUser),
    getFollowers: getFollowers,
    searchFollowers: searchFollowers,
    getUsersInChannel: getUsersInChannel,
    searchUsersInIdBag: searchUsersInIdBag,
    searchChannel: searchChannel
}
