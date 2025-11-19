const sum = require("./index");
if(sum(2,3) !== 5){
	throw Error("test failed");
}
if(sum(3,4) !== 7){
	throw Error("test failed");
}
console.log("success");

