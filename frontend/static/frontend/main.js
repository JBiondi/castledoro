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

eval("var pauseTimerButton = document.querySelector('.pause-timer');\nvar resetTimerButton = document.querySelector('.reset-timer');\nvar minutesInput = document.querySelector('.minutes-input');\nvar timerSubmit = document.querySelector('.timer-submit');\nvar minutesDisplay = document.querySelector('.minutes-display');\nvar secondsDisplay = document.querySelector('.seconds-display');\nvar secondsExtraZero = document.querySelector('.seconds-extra-zero');\nvar minutesExtraZero = document.querySelector('.minutes-extra-zero');\nvar completedBlocksText = document.querySelector('.completed-blocks-text');\nvar block1 = document.querySelector('.block1');\nvar block2 = document.querySelector('.block2');\nvar block3 = document.querySelector('.block3');\nvar blocksArray = [block1, block2, block3];\nvar startTimer;\nvar newSessions = 0;\n\nif (timerSubmit) {\n  timerSubmit.addEventListener('click', function () {\n    if (startTimer === undefined) {\n      minutesDisplay.innerText = minutesInput.value;\n      console.log(\"MD = \".concat(minutesDisplay.innerText));\n      startTimer = setInterval(runTimer, 1000);\n    } else {\n      alert('The timer is already counting down');\n    }\n  });\n}\n\nif (pauseTimerButton) {\n  pauseTimerButton.addEventListener('click', function () {\n    clearInterval(startTimer);\n    startTimer = undefined;\n    console.log('Timer paused)');\n  });\n}\n\nif (resetTimerButton) {\n  resetTimerButton.addEventListener('click', function () {\n    clearInterval(startTimer);\n    startTimer = undefined;\n    minutesDisplay.innerText = 45;\n    secondsDisplay.innerText = '00';\n    console.log('Timer has been reset');\n  });\n}\n\nfunction getCookie(flavor) {\n  var allCookies = document.cookie.split(';');\n  var trimmedCookies = allCookies.map(function (cookie) {\n    return cookie.trim();\n  });\n  var matchingCookie = trimmedCookies.find(function (cookie) {\n    return cookie.startsWith(flavor + '=');\n  });\n  return matchingCookie.split('=')[1];\n}\n\nvar csrftoken = getCookie('csrftoken');\n\nfunction runTimer() {\n  console.log(\"Running timer!\");\n  var seconds = Number(secondsDisplay.innerText);\n  console.log(minutesDisplay.innerText, seconds);\n\n  if (minutesDisplay.innerText != 0 && seconds === 0) {\n    if (minutesDisplay.innerText < 10) {\n      minutesExtraZero.style.display = 'block';\n      secondsExtraZero.style.display = 'none';\n      secondsDisplay.innerText = 59;\n      minutesDisplay.innerText--;\n    } else {\n      secondsExtraZero.style.display = 'none';\n      secondsDisplay.innerText = 59;\n      minutesDisplay.innerText--;\n    }\n  } else if (minutesDisplay.innerText !== 0 && seconds !== 0) {\n    if (minutesDisplay.innerText < 10) {\n      minutesExtraZero.style.display = 'block';\n\n      if (secondsDisplay.innerText < 11) {\n        secondsExtraZero.style.display = 'block';\n        secondsDisplay.innerText--;\n      } else {\n        secondsDisplay.innerText--;\n      }\n    } else {\n      if (secondsDisplay.innerText < 11) {\n        secondsExtraZero.style.display = 'block';\n        secondsDisplay.innerText--;\n      } else {\n        secondsDisplay.innerText--;\n      }\n    }\n  } else if (minutesDisplay.innerText == 0 && seconds === 0) {\n    console.log('ENDED');\n    minutesExtraZero.style.display = 'none';\n    secondsExtraZero.style.display = 'none';\n    minutesDisplay.innerText = '00';\n    secondsDisplay.innerText = '00';\n    newSessions++;\n    console.log(\"Sessions completed is now: \".concat(newSessions));\n    updateCastleBlocks();\n    clearInterval(startTimer);\n  }\n}\n\nfunction updateCastleBlocks() {\n  fetch(\"http://127.0.0.1:8000/session_completed_api_endpoint/\", {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'X-CSRFToken': csrftoken\n    }\n  }).then(function (response) {\n    return response.json();\n  }).then(function updateBlocksHTML(data) {\n    console.log(\"This is the data \".concat(data));\n    completedBlocksText.innerHTML = \"Completed Blocks: \".concat(JSON.stringify(data));\n    blocksArray.forEach(function (block) {\n      if (block.classList.contains(\"block\".concat(data))) {\n        block.style.fill = 'green';\n      }\n    });\n  });\n}\n\n//# sourceURL=webpack:///./frontend/src/index.js?");

/***/ })

/******/ });