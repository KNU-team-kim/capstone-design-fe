/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/hooks/useWebRTC.ts":
/*!********************************!*\
  !*** ./src/hooks/useWebRTC.ts ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useWebRTC: () => (/* binding */ useWebRTC)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/signaling */ \"(app-pages-browser)/./src/utils/signaling.ts\");\n/* harmony import */ var _utils_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_signaling__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst iceServers = {\n    iceServers: [\n        {\n            urls: 'stun:stun.l.google.com:19302'\n        }\n    ]\n};\nconst useWebRTC = ()=>{\n    const [isConnected, setIsConnected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const peerConnection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const socket = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"useWebRTC.useEffect\": ()=>{\n            const getWebcamStream = {\n                \"useWebRTC.useEffect.getWebcamStream\": async ()=>{\n                    try {\n                        const stream = await navigator.mediaDevices.getUserMedia({\n                            video: true\n                        });\n                        if (videoRef.current) videoRef.current.srcObject = stream;\n                        stream.getTracks().forEach({\n                            \"useWebRTC.useEffect.getWebcamStream\": (track)=>{\n                                var _peerConnection_current;\n                                if (((_peerConnection_current = peerConnection.current) === null || _peerConnection_current === void 0 ? void 0 : _peerConnection_current.signalingState) !== 'closed') {\n                                    var _peerConnection_current1;\n                                    (_peerConnection_current1 = peerConnection.current) === null || _peerConnection_current1 === void 0 ? void 0 : _peerConnection_current1.addTrack(track, stream);\n                                }\n                            }\n                        }[\"useWebRTC.useEffect.getWebcamStream\"]);\n                    } catch (err) {\n                        console.error('웹캠 접근 오류:', err);\n                    }\n                }\n            }[\"useWebRTC.useEffect.getWebcamStream\"];\n            socket.current = (0,_utils_signaling__WEBPACK_IMPORTED_MODULE_1__.connectSignalingServer)({\n                \"useWebRTC.useEffect\": ()=>{}\n            }[\"useWebRTC.useEffect\"]);\n            setIsConnected(true);\n            peerConnection.current = new RTCPeerConnection(iceServers);\n            getWebcamStream();\n            return ({\n                \"useWebRTC.useEffect\": ()=>{\n                    if (peerConnection.current) {\n                        peerConnection.current.close();\n                    }\n                    if (socket.current) {\n                        socket.current.close();\n                    }\n                }\n            })[\"useWebRTC.useEffect\"];\n        }\n    }[\"useWebRTC.useEffect\"], []);\n    return {\n        videoRef,\n        isConnected\n    };\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VXZWJSVEMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBb0Q7QUFDTztBQUUzRCxNQUFNSSxhQUFhO0lBQ2pCQSxZQUFZO1FBQUM7WUFBRUMsTUFBTTtRQUErQjtLQUFFO0FBQ3hEO0FBRU8sTUFBTUMsWUFBWTtJQUN2QixNQUFNLENBQUNDLGFBQWFDLGVBQWUsR0FBR04sK0NBQVFBLENBQUM7SUFDL0MsTUFBTU8sV0FBV1IsNkNBQU1BLENBQTBCO0lBQ2pELE1BQU1TLGlCQUFpQlQsNkNBQU1BLENBQTJCO0lBQ3hELE1BQU1VLFNBQVNWLDZDQUFNQSxDQUFtQjtJQUV4Q0QsZ0RBQVNBOytCQUFDO1lBQ1IsTUFBTVk7dURBQWtCO29CQUN0QixJQUFJO3dCQUNGLE1BQU1DLFNBQVMsTUFBTUMsVUFBVUMsWUFBWSxDQUFDQyxZQUFZLENBQUM7NEJBQUVDLE9BQU87d0JBQUs7d0JBQ3ZFLElBQUlSLFNBQVNTLE9BQU8sRUFBRVQsU0FBU1MsT0FBTyxDQUFDQyxTQUFTLEdBQUdOO3dCQUVuREEsT0FBT08sU0FBUyxHQUFHQyxPQUFPO21FQUFDLENBQUNDO29DQUN0Qlo7Z0NBQUosSUFBSUEsRUFBQUEsMEJBQUFBLGVBQWVRLE9BQU8sY0FBdEJSLDhDQUFBQSx3QkFBd0JhLGNBQWMsTUFBSyxVQUFVO3dDQUN2RGI7cUNBQUFBLDJCQUFBQSxlQUFlUSxPQUFPLGNBQXRCUiwrQ0FBQUEseUJBQXdCYyxRQUFRLENBQUNGLE9BQU9UO2dDQUMxQzs0QkFDRjs7b0JBQ0YsRUFBRSxPQUFPWSxLQUFLO3dCQUNaQyxRQUFRQyxLQUFLLENBQUMsYUFBYUY7b0JBQzdCO2dCQUNGOztZQUVBZCxPQUFPTyxPQUFPLEdBQUdmLHdFQUFzQkE7dUNBQUMsS0FBTzs7WUFDL0NLLGVBQWU7WUFFZkUsZUFBZVEsT0FBTyxHQUFHLElBQUlVLGtCQUFrQnhCO1lBRS9DUTtZQUVBO3VDQUFPO29CQUNMLElBQUlGLGVBQWVRLE9BQU8sRUFBRTt3QkFDMUJSLGVBQWVRLE9BQU8sQ0FBQ1csS0FBSztvQkFDOUI7b0JBQ0EsSUFBSWxCLE9BQU9PLE9BQU8sRUFBRTt3QkFDbEJQLE9BQU9PLE9BQU8sQ0FBQ1csS0FBSztvQkFDdEI7Z0JBQ0Y7O1FBQ0Y7OEJBQUcsRUFBRTtJQUVMLE9BQU87UUFBRXBCO1FBQVVGO0lBQVk7QUFDakMsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL2plb25nc29sYmluL2NhcHN0b25lLWRlc2lnbi1mZS9zcmMvaG9va3MvdXNlV2ViUlRDLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3RTaWduYWxpbmdTZXJ2ZXIgfSBmcm9tICdAL3V0aWxzL3NpZ25hbGluZyc7XG5cbmNvbnN0IGljZVNlcnZlcnMgPSB7XG4gIGljZVNlcnZlcnM6IFt7IHVybHM6ICdzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyJyB9XSxcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VXZWJSVEMgPSAoKSA9PiB7XG4gIGNvbnN0IFtpc0Nvbm5lY3RlZCwgc2V0SXNDb25uZWN0ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCB2aWRlb1JlZiA9IHVzZVJlZjxIVE1MVmlkZW9FbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBlZXJDb25uZWN0aW9uID0gdXNlUmVmPFJUQ1BlZXJDb25uZWN0aW9uIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHNvY2tldCA9IHVzZVJlZjxXZWJTb2NrZXQgfCBudWxsPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGdldFdlYmNhbVN0cmVhbSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgdmlkZW86IHRydWUgfSk7XG4gICAgICAgIGlmICh2aWRlb1JlZi5jdXJyZW50KSB2aWRlb1JlZi5jdXJyZW50LnNyY09iamVjdCA9IHN0cmVhbTtcblxuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaCgodHJhY2spID0+IHtcbiAgICAgICAgICBpZiAocGVlckNvbm5lY3Rpb24uY3VycmVudD8uc2lnbmFsaW5nU3RhdGUgIT09ICdjbG9zZWQnKSB7XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5jdXJyZW50Py5hZGRUcmFjayh0cmFjaywgc3RyZWFtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ+ybuey6oCDsoJHqt7wg7Jik66WYOicsIGVycik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNvY2tldC5jdXJyZW50ID0gY29ubmVjdFNpZ25hbGluZ1NlcnZlcigoKSA9PiB7fSk7XG4gICAgc2V0SXNDb25uZWN0ZWQodHJ1ZSk7XG5cbiAgICBwZWVyQ29ubmVjdGlvbi5jdXJyZW50ID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKGljZVNlcnZlcnMpO1xuXG4gICAgZ2V0V2ViY2FtU3RyZWFtKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHBlZXJDb25uZWN0aW9uLmN1cnJlbnQpIHtcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uY3VycmVudC5jbG9zZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHNvY2tldC5jdXJyZW50KSB7XG4gICAgICAgIHNvY2tldC5jdXJyZW50LmNsb3NlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7IHZpZGVvUmVmLCBpc0Nvbm5lY3RlZCB9O1xufTtcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsImNvbm5lY3RTaWduYWxpbmdTZXJ2ZXIiLCJpY2VTZXJ2ZXJzIiwidXJscyIsInVzZVdlYlJUQyIsImlzQ29ubmVjdGVkIiwic2V0SXNDb25uZWN0ZWQiLCJ2aWRlb1JlZiIsInBlZXJDb25uZWN0aW9uIiwic29ja2V0IiwiZ2V0V2ViY2FtU3RyZWFtIiwic3RyZWFtIiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwiZ2V0VXNlck1lZGlhIiwidmlkZW8iLCJjdXJyZW50Iiwic3JjT2JqZWN0IiwiZ2V0VHJhY2tzIiwiZm9yRWFjaCIsInRyYWNrIiwic2lnbmFsaW5nU3RhdGUiLCJhZGRUcmFjayIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIlJUQ1BlZXJDb25uZWN0aW9uIiwiY2xvc2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useWebRTC.ts\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/utils/signaling.ts":
/*!********************************!*\
  !*** ./src/utils/signaling.ts ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});