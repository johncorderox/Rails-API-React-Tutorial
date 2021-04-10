/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/hello_react.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/hello_react.jsx":
/*!**********************************************!*\
  !*** ./app/javascript/packs/hello_react.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /vagrant/my_app/app/javascript/packs/hello_react.jsx: Unexpected token, expected \"jsxTagEnd\" (10:34)\n\n   8 |\n   9 | const Hello = props => (\n> 10 |   <div><h1>Hello {props.name}!</h1</div>\n     |                                   ^\n  11 | )\n  12 |\n  13 | Hello.defaultProps = {\n    at Object._raise (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:776:17)\n    at Object.raiseWithData (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:769:17)\n    at Object.raise (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:737:17)\n    at Object.unexpected (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:9735:16)\n    at Object.expect (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:9721:28)\n    at Object.jsxParseClosingElementAt (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:5081:10)\n    at Object.jsxParseElementAt (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:5100:37)\n    at Object.jsxParseElementAt (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:5104:32)\n    at Object.jsxParseElement (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:5162:17)\n    at Object.parseExprAtom (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:5169:19)\n    at Object.parseExprSubscripts (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10708:23)\n    at Object.parseUpdate (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10688:21)\n    at Object.parseMaybeUnary (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10666:23)\n    at Object.parseExprOps (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10523:23)\n    at Object.parseMaybeConditional (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10497:23)\n    at Object.parseMaybeAssign (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10460:21)\n    at allowInAnd (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10427:39)\n    at Object.allowInAnd (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:12104:12)\n    at Object.parseMaybeAssignAllowIn (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10427:17)\n    at Object.parseParenAndDistinguishExpression (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:11308:28)\n    at Object.parseExprAtom (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:11026:21)\n    at Object.parseExprAtom (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:5174:20)\n    at Object.parseExprSubscripts (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10708:23)\n    at Object.parseUpdate (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10688:21)\n    at Object.parseMaybeUnary (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10666:23)\n    at Object.parseExprOps (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10523:23)\n    at Object.parseMaybeConditional (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10497:23)\n    at Object.parseMaybeAssign (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:10460:21)\n    at Object.parseFunctionBody (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:11770:24)\n    at Object.parseArrowExpression (/vagrant/my_app/node_modules/@babel/parser/lib/index.js:11749:10)");

/***/ })

/******/ });
//# sourceMappingURL=hello_react-3aa7d0c055b2331d654b.js.map