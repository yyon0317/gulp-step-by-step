!function r(u,l,t){function i(e,o){if(!l[e]){if(!u[e]){var n="function"==typeof require&&require;if(!o&&n)return n(e,!0);if(f)return f(e,!0);throw(o=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",o}n=l[e]={exports:{}},u[e][0].call(n.exports,function(o){return i(u[e][1][o]||o)},n,n.exports,r,u,l,t)}return l[e].exports}for(var f="function"==typeof require&&require,o=0;o<t.length;o++)i(t[o]);return i}({1:[function(o,e,n){var r,u;r=o("./modules/module1"),u=o("./modules/module2"),o=o("./modules/module3"),r(),u(),o()},{"./modules/module1":2,"./modules/module2":3,"./modules/module3":4}],2:[function(o,e,n){e.exports=function(){console.log("hello world! - 1")}},{}],3:[function(o,e,n){e.exports=function(){console.log("hello world! - 2")}},{}],4:[function(o,e,n){e.exports=function(){console.log("hello world! - 3")}},{}]},{},[1]);
//# sourceMappingURL=main.js.map