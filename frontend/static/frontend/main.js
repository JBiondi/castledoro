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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/src/index.js":
/*!*******************************!*\
  !*** ./frontend/src/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var startTimerButton = document.querySelector('.start-timer');\nvar pauseTimerButton = document.querySelector('.pause-timer');\nvar resetTimerButton = document.querySelector('.reset-timer');\nvar timerMinutes = document.querySelector('.minutes');\nvar timerSeconds = document.querySelector('.seconds');\nvar deleteLink = document.querySelector('.delete-link');\nvar progressLink = document.querySelector('.progress-link');\nvar startTimer;\nvar newSessions = 0;\n\nif (startTimerButton) {\n  startTimerButton.addEventListener('click', function () {\n    if (startTimer === undefined) {\n      startTimer = setInterval(runTimer, 1000);\n    } else {\n      alert('The timer is already counting down');\n    }\n  });\n}\n\nif (pauseTimerButton) {\n  pauseTimerButton.addEventListener('click', function () {\n    clearInterval(startTimer);\n    startTimer = undefined;\n    console.log('Timer paused)');\n  });\n}\n\nif (resetTimerButton) {\n  resetTimerButton.addEventListener('click', function () {\n    clearInterval(startTimer);\n    startTimer = undefined;\n    timerMinutes.innerText = 45;\n    timerSeconds.innerText = '00';\n    console.log('Timer has been reset');\n  });\n}\n\nif (deleteLink) {\n  deleteLink.addEventListener('click', function () {// navigate to delete castle page with Castle instance\n  });\n}\n\nif (progressLink) {\n  progressLink.addEventListener('click', function () {// navigate to progress page with Castle instance\n  });\n}\n\nfunction runTimer() {\n  console.log(\"Running timer!\");\n  var seconds = Number(timerSeconds.innerText);\n  var minutes = Number(timerMinutes.innerText);\n  console.log(minutes, seconds);\n\n  if (seconds !== 0) {\n    console.log('Timer goin');\n    timerSeconds.innerText--;\n  } else if (minutes !== 0 && seconds === 0) {\n    timerSeconds.innerText = 59;\n    timerMinutes.innerText--;\n  } else if (minutes === 0 && seconds === 0) {\n    console.log('ENDED');\n    timerMinutes.innerText = '00';\n    timerSeconds.innerText = '00';\n    newSessions++;\n    console.log(\"Sessions completed is now: \".concat(newSessions));\n    clearInterval(startTimer);\n  }\n}\n\n//# sourceURL=webpack:///./frontend/src/index.js?");

/***/ })

/******/ });