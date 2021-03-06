'use strict';

module.exports = function sender() {
  var inport = this.openInputPort('COUNT');
  var outport = this.openOutputPort('OUT');
  var ip = inport.receive();
  var count = ip.contents;
  this.dropIP(ip);
  //console.log(count);
  for (var i = 0; i < count; i++) {
    var ip = this.createIP(i + '');
    if (-1 == outport.send(ip)) {
      return;
    }
  }
};