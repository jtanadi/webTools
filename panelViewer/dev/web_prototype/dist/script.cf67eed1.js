// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({8:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dropdowns = document.querySelectorAll("select");
var mainArea = document.getElementById("main_area");

exports.dropdowns = dropdowns;
exports.mainArea = mainArea;
},{}],16:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var panelsObj = [{
  code: "HH_IP_a",
  selectors: {
    selector0: "human_history",
    selector1: "identification_panel",
    selector2: "horizontal"
  }
}, {
  code: "HH_ROL_GLWD",
  selectors: {
    selector0: "human_history natural_history",
    selector1: "object_label",
    selector2: "vertical"
  }
}, {
  code: "HH_SP_H1",
  selectors: {
    selector0: "human_history",
    selector1: "story_panel",
    selector2: "vertical"
  }
}, {
  code: "HH_SP_H3_a",
  selectors: {
    selector0: "natural_history",
    selector1: "story_panel",
    selector2: "vertical"
  }
}, {
  code: "HH_SP_R1",
  selectors: {
    selector0: "natural_history",
    selector1: "story_panel",
    selector2: "horizontal"
  }
}, {
  code: "HH_IP_a2",
  selectors: {
    selector0: "human_history",
    selector1: "identification_panel",
    selector2: "horizontal"
  }
}, {
  code: "HH_ROL_GLWD2",
  selectors: {
    selector0: "human_history natural_history",
    selector1: "object_label",
    selector2: "vertical"
  }
}, {
  code: "HH_SP_H12",
  selectors: {
    selector0: "human_history",
    selector1: "story_panel",
    selector2: "vertical"
  }
}, {
  code: "HH_SP_H3_a2",
  selectors: {
    selector0: "natural_history",
    selector1: "story_panel",
    selector2: "vertical"
  }
}, {
  code: "HH_SP_R12",
  selectors: {
    selector0: "natural_history",
    selector1: "story_panel",
    selector2: "horizontal"
  }
}];

exports.default = panelsObj;
},{}],15:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _panelsObj = require("./panelsObj");

var _panelsObj2 = _interopRequireDefault(_panelsObj);

var _elements = require("./elements");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getShownPanels = function getShownPanels() {
  return Object.entries(_panelsObj2.default).reduce(function (shownArr, panel) {
    var show = true;
    var _panel$ = panel[1],
        code = _panel$.code,
        selectors = _panel$.selectors;


    Object.entries(selectors).forEach(function (selector) {
      var _selector = _slicedToArray(selector, 2),
          selectorIndex = _selector[0],
          selectorVal = _selector[1];

      var dropdownValue = document.getElementById(selectorIndex).value;

      if (!selectorVal.includes(dropdownValue)) show = false;
    });

    if (show) shownArr.push(code);
    return shownArr;
  }, []);
};

var makeCells = function makeCells() {
  var row = void 0;
  var panelsToShow = getShownPanels();

  return panelsToShow.reduce(function (allCells, panelCode, index) {
    if (index % 5 === 0) {
      row = document.createElement("DIV");
      row.classList.add("panel_row");
      _elements.mainArea.appendChild(row);
    }

    var cell = document.createElement("DIV");
    cell.classList.add("panel_cell");

    var img = document.createElement("IMG");
    img.src = "./_testImages/" + panelCode + ".jpg";
    img.alt = "" + panelCode;
    img.classList.add("panel");

    cell.appendChild(img);
    row.appendChild(cell);

    allCells.push(cell);
    return allCells;
  }, []);
};

exports.default = makeCells;
},{"./panelsObj":16,"./elements":8}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addSpacers = function addSpacers(elements) {
  elements.forEach(function (element) {
    var topL = document.createElement("DIV");
    var topR = document.createElement("DIV");
    var btmL = document.createElement("DIV");
    var btmR = document.createElement("DIV");

    topL.classList.add("spacers", "top", "left");
    topR.classList.add("spacers", "top", "right");
    btmL.classList.add("spacers", "btm", "left");
    btmR.classList.add("spacers", "btm", "right");

    element.appendChild(topL);
    element.appendChild(topR);
    element.appendChild(btmL);
    element.appendChild(btmR);
  });
};

exports.default = addSpacers;
},{}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHOWNCELLS = exports.populateMainArea = undefined;

var _makeCells = require("./makeCells");

var _makeCells2 = _interopRequireDefault(_makeCells);

var _elements = require("./elements");

var _addSpacers = require("./addSpacers");

var _addSpacers2 = _interopRequireDefault(_addSpacers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-mutable-exports */
var SHOWNCELLS = void 0;

var populateMainArea = function populateMainArea() {
  _elements.mainArea.innerHTML = "";
  exports.SHOWNCELLS = SHOWNCELLS = (0, _makeCells2.default)();
  (0, _addSpacers2.default)(SHOWNCELLS);
};

exports.populateMainArea = populateMainArea;
exports.SHOWNCELLS = SHOWNCELLS;
},{"./makeCells":15,"./elements":8,"./addSpacers":10}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var timeOut = void 0;

var scrollPanelInfo = function scrollPanelInfo(evt) {
  var shownInfo = document.querySelector(".panel_info.show");

  if (evt.type === "click" && shownInfo) {
    shownInfo.style.top = window.scrollY - 2 + "px";
    return;
  }

  // This will set a timeout of 100 ms and only then run
  // the actual callback function. If the scroll event
  // is fired again and the 100 ms have not passed yet,
  // it will clear the pending timeout and set a new one.

  // The effect is that the callback is only run once every 100ms.
  if (timeOut) clearTimeout(timeOut);

  timeOut = setTimeout(function () {
    if (!shownInfo) return;
    shownInfo.style.top = window.scrollY - 2 + "px";
  }, 100);
};

exports.default = scrollPanelInfo;
},{}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scrollPanelInfo = require("./scrollPanelInfo");

var _scrollPanelInfo2 = _interopRequireDefault(_scrollPanelInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opened = null;

var togglePanelInfo = function togglePanelInfo(target) {
  var classToRemove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var classToAdd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  var panelInfo = document.querySelectorAll("#sidebar .panel_info");
  var panelCode = target.querySelector("img").alt;

  panelInfo.forEach(function (info) {
    if (info.classList.contains(classToRemove)) {
      info.classList.remove(classToRemove);
    } else if (classToAdd && info.id === panelCode) {
      info.classList.add(classToAdd);
    }
  });
};

var enlargeOnFocus = function enlargeOnFocus(evt, cellsArr) {
  console.log(cellsArr);
  var clickedObj = evt.target;
  var resetStyles = function resetStyles(elmt) {
    elmt.style.width = "";
    elmt.style.height = "";
    elmt.style.padding = "";
  };

  // Early break in case user clicks on non-cell items
  if (!cellsArr.includes(clickedObj)) return;

  if (clickedObj !== opened) {
    // If clicked object is not open,
    // enlarge clicked object & make everything else smaller
    var newDivisions = 100 / 6;
    var newWidth = newDivisions * 2;
    cellsArr.forEach(function (cell) {
      cell.style.width = newDivisions + "%";
      cell.style.height = "";
    });
    clickedObj.style.width = newWidth + "%";
    clickedObj.style.height = "30vw";
    clickedObj.style.padding = "1vw";

    togglePanelInfo(clickedObj, "show", "show");
    opened = clickedObj;
  } else {
    // If clicked object is opened, reset everything
    cellsArr.forEach(function (cell) {
      resetStyles(cell);
    });
    togglePanelInfo(clickedObj, "show");
    opened = null;
  }
  (0, _scrollPanelInfo2.default)(evt);
};

exports.default = enlargeOnFocus;
},{"./scrollPanelInfo":12}],4:[function(require,module,exports) {
"use strict";

var _elements = require("./src/elements");

var _populateMainArea = require("./src/populateMainArea");

var _enlargeOnFocus = require("./src/enlargeOnFocus");

var _enlargeOnFocus2 = _interopRequireDefault(_enlargeOnFocus);

var _scrollPanelInfo = require("./src/scrollPanelInfo");

var _scrollPanelInfo2 = _interopRequireDefault(_scrollPanelInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _populateMainArea.populateMainArea)();

_elements.dropdowns.forEach(function (dropdown) {
  dropdown.addEventListener("change", _populateMainArea.populateMainArea);
});

_elements.mainArea.addEventListener("click", function (evt) {
  (0, _enlargeOnFocus2.default)(evt, _populateMainArea.SHOWNCELLS);
});

window.addEventListener("scroll", _scrollPanelInfo2.default);
},{"./src/elements":8,"./src/populateMainArea":9,"./src/enlargeOnFocus":11,"./src/scrollPanelInfo":12}],26:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50793' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[26,4])
//# sourceMappingURL=/script.cf67eed1.map