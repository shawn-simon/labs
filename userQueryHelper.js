var ChannelUser = require("../models/channelUser");
var User = require("../models/user");
var mongoose = require('mongoose');
var Follower = require('../models/follower');
var logger = require('../lib/logger');
var XRegExp = require('xregexp').XRegExp;

var _ = require('underscore');

var validateRegexp = function( _un) { 
 return  XRegExp("^[\\p{L}\\^\\*\\$\\.\\[\\]\\#\\-\\p{N}]+$").test(_un);
}

var squashString = function(_un) {
  return _un.trim()
    .toLowerCase()
    .replace(/\s/g, '')
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
