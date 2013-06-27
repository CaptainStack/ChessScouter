// This file contains utility functions

// Define an inheritance function (copy the prototype chain of one
// function and give it to the other)
if (typeof Object.beget !== 'function') {
	Object.beget = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	}; 
}


// Add a method conditionally to the Function type.
Function.prototype.method = function (name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;    
	} 
};


