"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/Webcam.tsx":
/*!***********************************!*\
  !*** ./src/components/Webcam.tsx ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _hooks_useWebRTC__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/hooks/useWebRTC */ \"(app-pages-browser)/./src/hooks/useWebRTC.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\nconst Webcam = ()=>{\n    _s();\n    const { videoRef, isConnected } = (0,_hooks_useWebRTC__WEBPACK_IMPORTED_MODULE_1__.useWebRTC)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"WebRTC Connection\"\n            }, void 0, false, {\n                fileName: \"/Users/jeongsolbin/capstone-design-fe/src/components/Webcam.tsx\",\n                lineNumber: 10,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"video\", {\n                ref: videoRef,\n                autoPlay: true,\n                playsInline: true,\n                width: \"100%\"\n            }, void 0, false, {\n                fileName: \"/Users/jeongsolbin/capstone-design-fe/src/components/Webcam.tsx\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: isConnected ? '시그널링 서버 연결 완료완료👍' : '연결중...'\n            }, void 0, false, {\n                fileName: \"/Users/jeongsolbin/capstone-design-fe/src/components/Webcam.tsx\",\n                lineNumber: 12,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jeongsolbin/capstone-design-fe/src/components/Webcam.tsx\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Webcam, \"9ls8JqIdgXU4YbTmfJGd+aRtn7o=\", false, function() {\n    return [\n        _hooks_useWebRTC__WEBPACK_IMPORTED_MODULE_1__.useWebRTC\n    ];\n});\n_c = Webcam;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Webcam);\nvar _c;\n$RefreshReg$(_c, \"Webcam\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1dlYmNhbS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFOEM7QUFFOUMsTUFBTUMsU0FBUzs7SUFDYixNQUFNLEVBQUVDLFFBQVEsRUFBRUMsV0FBVyxFQUFFLEdBQUdILDJEQUFTQTtJQUUzQyxxQkFDRSw4REFBQ0k7OzBCQUNDLDhEQUFDQzswQkFBRzs7Ozs7OzBCQUNKLDhEQUFDQztnQkFBTUMsS0FBS0w7Z0JBQVVNLFFBQVE7Z0JBQUNDLFdBQVc7Z0JBQUNDLE9BQU07Ozs7OzswQkFDakQsOERBQUNDOzBCQUFHUixjQUFjLHNCQUFzQjs7Ozs7Ozs7Ozs7O0FBRzlDO0dBVk1GOztRQUM4QkQsdURBQVNBOzs7S0FEdkNDO0FBWU4saUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9qZW9uZ3NvbGJpbi9jYXBzdG9uZS1kZXNpZ24tZmUvc3JjL2NvbXBvbmVudHMvV2ViY2FtLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IHVzZVdlYlJUQyB9IGZyb20gJ0AvaG9va3MvdXNlV2ViUlRDJztcblxuY29uc3QgV2ViY2FtID0gKCkgPT4ge1xuICBjb25zdCB7IHZpZGVvUmVmLCBpc0Nvbm5lY3RlZCB9ID0gdXNlV2ViUlRDKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGgxPldlYlJUQyBDb25uZWN0aW9uPC9oMT5cbiAgICAgIDx2aWRlbyByZWY9e3ZpZGVvUmVmfSBhdXRvUGxheSBwbGF5c0lubGluZSB3aWR0aD1cIjEwMCVcIiAvPlxuICAgICAgPHA+e2lzQ29ubmVjdGVkID8gJ+yLnOq3uOuEkOungSDshJzrsoQg7Jew6rKwIOyZhOujjOyZhOujjPCfkY0nIDogJ+yXsOqysOykkS4uLid9PC9wPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgV2ViY2FtO1xuIl0sIm5hbWVzIjpbInVzZVdlYlJUQyIsIldlYmNhbSIsInZpZGVvUmVmIiwiaXNDb25uZWN0ZWQiLCJkaXYiLCJoMSIsInZpZGVvIiwicmVmIiwiYXV0b1BsYXkiLCJwbGF5c0lubGluZSIsIndpZHRoIiwicCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Webcam.tsx\n"));

/***/ })

});