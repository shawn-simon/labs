var ChannelUser = require("../models/channelUser");
var User = require("../models/user");
var mongoose = require('mongoose');
var Follower = require('../models/follower');
var logger = require('../lib/logger');
var Promise = require('bluebird');
var _ = require('lodash');

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var squashString = function(_un) {
    return _un.trim()
        .toLowerCase()
        .replace(/\s/g, '')
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
