'use strict';

var IP = require('../../core/IP');

module.exports = function wschatresp() {
  var ip;
  var inport = this.openInputPort('IN');
  while (true) {
    ip = inport.receive();   // shd be open bracket
    if (ip === null) {
      break;
    }
    //console.log(ip);
    this.dropIP(ip);
    ip = inport.receive();   // shd be wss
    //console.log(ip);
    var wss = ip.contents;
    this.dropIP(ip);
    ip = inport.receive();   // shd be orig connection
    //console.log(ip);
    var ws = ip.contents;
    this.dropIP(ip);
    while (true) {
      ip = inport.receive();
      //console.log(ip);
      if (ip.type == IP.CLOSE) {
        this.dropIP(ip);
        break;
      }
      var msg = ip.contents;
      this.dropIP(ip);
      wss.clients.forEach(function(client) {
        client.send(msg);
      });
    }
  }
}
