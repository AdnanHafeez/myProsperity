const util = require('util');
const path = require('path');
const fs = require('fs');

var mime = require("mime");
module.exports = function(source){
	this.cacheable && this.cacheable();
    
	if(!typeof source === 'object'){
       // console.log('Json File loader expects object');
		throw "Json File loader expects object";
	}
    
    var lastValue = this.inputValue[0];
   

    
    var icons = lastValue.icons;
    for(var i = 0; i < icons.length; i++){
       var imgPath = path.resolve(this.context+'/../'+icons[i].src);
       var mimetype = mime.lookup(imgPath);
       var imgBuffer = fs.readFileSync(imgPath);
       icons[i].src = "data:" + (mimetype ? mimetype + ";" : "") + "base64," + imgBuffer.toString("base64");
    }
    
    lastValue.icons = icons;
    this.value = [lastValue]
	return JSON.stringify(lastValue, undefined, "\t");
}