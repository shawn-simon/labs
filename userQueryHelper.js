var ChannelUser = require("../models/channelUser");
var User = require("../models/user");
var mongoose = require('mongoose');
var Follower = require('../models/follower');
var logger = require('../lib/logger');
var XRegExp = require('xregexp').XRegExp;

var _ = require('underscore');

var SQ_DEFAULT_PAGE_SIZE = 20;

var validateRegexp = function( _un) { 
 return  XRegExp("^[\\p{L}\\^\\*\\$\\.\\[\\]\\#\\-\\p{N}]+$").test(_un);
}

var squashString = function(_un) {
  return _un.trim()
    .toLowerCase()
    .replace(/\s/g, '')
}

// given index, size page params : return linear ranges [start, end]
var pageMify = function ( pageIndex, pageSize) {
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

      var _pm = pageMify( pageIndex, pageSize);

      var pS = _pm[0];
      var pE = _pm[1];

      var userIds = [];
      chanUsers.forEach(function(f, i) {
        userIds.push(f._id)
      });

      if ( userIds.length > 0)
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
      var _pm = pageMify( pageIndex, pageSize);

      var pS = _pm[0];
      var pE = _pm[1];

      followers.forEach(function(f, i) {
        userIds.push(f._id.toString() )
      });
      if ( userIds.length > 0)
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

// get a users followers. users have properties as specified in field_sel
var getFollowers = function(curr_user, field_sel, pageIndex, pageSize, fn_e_o) {
  var fs = field_sel;
  var query = {};

  query = {
    followedUser: mongoose.Types.ObjectId(curr_user._id),
    followedType: 'user'

  };

  var followerQuery = Follower.find(query)
    .populate('follower', field_sel) // is  a user
    .select('follower _id')
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
        _ret.push(e.follower);
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
  if(!validateRegexp(reg_exp)) {
    fn_e_o(null,[]);
    return;
  }
  
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

  User
    .find(query)
    .select(fs)
    .lean(true)
    .exec(function(err, userObjects) {
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


// Squshes everything to single case ( so darbBIT1001 == darkbit1001 ) and removes spaces ( should be any)
var findDuplicateUser = function ( _un, _em, fn_e_cond) { 
    var q = { $or: [{username: new RegExp(squashString( _un), "i")}, {email: _em}] };
    var _ERRCOND ;

    User.findOne( q  ).select("_id username email").exec(function(err, user) {
      if(user) { 
        if(user.username.toLowerCase() == _un)
          _ERRCOND = "USERNAME";
        if(user.email.toLowerCase() == _em)
          _ERRCOND = "EMAIL";
      } 
        else
          _ERRCOND = "OK";

       fn_e_cond( err? err: null,  _ERRCOND);
    })

}

module.exports = {
  findDuplicateUser: findDuplicateUser,
  getFollowers: getFollowers,
  searchFollowers: searchFollowers,
  getUsersInChannel: getUsersInChannel,
  searchUsersInIdBag: searchUsersInIdBag,
  searchChannel: searchChannel
}
