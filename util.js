var Util = {};
const platformWin32 = 'win32';
var path = require('path');

Util.getHomeDirectory = function(){
    if (process.platform == platformWin32) {return process.env.USERPROFILE;}
    else {return process.env.HOME;}
}

Util.getDataPath = function(){
  return path.join(this.getHomeDirectory(), 'data.json');
}

module.exports = Util;
