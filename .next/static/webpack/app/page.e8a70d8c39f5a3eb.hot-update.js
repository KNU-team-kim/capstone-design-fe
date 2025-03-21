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

/***/ "(app-pages-browser)/./src/hooks/useWebRTC.ts":
/*!********************************!*\
  !*** ./src/hooks/useWebRTC.ts ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useWebRTC: () => (/* binding */ useWebRTC)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/signaling */ \"(app-pages-browser)/./src/utils/signaling.ts\");\n\n\nconst iceServers = {\n    iceServers: [\n        {\n            urls: 'stun:stun.l.google.com:19302'\n        }\n    ]\n};\nconst useWebRTC = ()=>{\n    const [isConnected, setIsConnected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const peerConnection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    const socket = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"useWebRTC.useEffect\": ()=>{\n            const handleSignalingMessage = {\n                \"useWebRTC.useEffect.handleSignalingMessage\": async (message)=>{\n                    switch(message.type){\n                        case 'offer':\n                            var _peerConnection_current, _peerConnection_current1, _peerConnection_current2;\n                            await ((_peerConnection_current = peerConnection.current) === null || _peerConnection_current === void 0 ? void 0 : _peerConnection_current.setRemoteDescription(new RTCSessionDescription(message.offer)));\n                            const answer = await ((_peerConnection_current1 = peerConnection.current) === null || _peerConnection_current1 === void 0 ? void 0 : _peerConnection_current1.createAnswer());\n                            await ((_peerConnection_current2 = peerConnection.current) === null || _peerConnection_current2 === void 0 ? void 0 : _peerConnection_current2.setLocalDescription(answer));\n                            if (socket.current) {\n                                (0,_utils_signaling__WEBPACK_IMPORTED_MODULE_1__.sendMessage)(socket.current, {\n                                    type: 'answer',\n                                    answer\n                                });\n                            }\n                            break;\n                        case 'answer':\n                            var _peerConnection_current3;\n                            await ((_peerConnection_current3 = peerConnection.current) === null || _peerConnection_current3 === void 0 ? void 0 : _peerConnection_current3.setRemoteDescription(new RTCSessionDescription(message.answer)));\n                            break;\n                        case 'ice-candidate':\n                            var _peerConnection_current4;\n                            const candidate = new RTCIceCandidate(message.candidate);\n                            await ((_peerConnection_current4 = peerConnection.current) === null || _peerConnection_current4 === void 0 ? void 0 : _peerConnection_current4.addIceCandidate(candidate));\n                            break;\n                        default:\n                            break;\n                    }\n                }\n            }[\"useWebRTC.useEffect.handleSignalingMessage\"];\n            socket.current = (0,_utils_signaling__WEBPACK_IMPORTED_MODULE_1__.connectSignalingServer)(handleSignalingMessage);\n            setIsConnected(true);\n            peerConnection.current = new RTCPeerConnection(iceServers);\n            const getWebcamStream = {\n                \"useWebRTC.useEffect.getWebcamStream\": async ()=>{\n                    try {\n                        const stream = await navigator.mediaDevices.getUserMedia({\n                            video: true\n                        });\n                        if (videoRef.current) videoRef.current.srcObject = stream;\n                        stream.getTracks().forEach({\n                            \"useWebRTC.useEffect.getWebcamStream\": (track)=>{\n                                var _peerConnection_current;\n                                if (((_peerConnection_current = peerConnection.current) === null || _peerConnection_current === void 0 ? void 0 : _peerConnection_current.signalingState) !== 'closed') {\n                                    var _peerConnection_current1;\n                                    (_peerConnection_current1 = peerConnection.current) === null || _peerConnection_current1 === void 0 ? void 0 : _peerConnection_current1.addTrack(track, stream);\n                                }\n                            }\n                        }[\"useWebRTC.useEffect.getWebcamStream\"]);\n                    } catch (err) {\n                        console.error('웹캠 접근 오류:', err);\n                    }\n                }\n            }[\"useWebRTC.useEffect.getWebcamStream\"];\n            getWebcamStream();\n            return ({\n                \"useWebRTC.useEffect\": ()=>{\n                    if (peerConnection.current) {\n                        peerConnection.current.close();\n                    }\n                    (0,_utils_signaling__WEBPACK_IMPORTED_MODULE_1__.closeSignalingServer)();\n                }\n            })[\"useWebRTC.useEffect\"];\n        }\n    }[\"useWebRTC.useEffect\"], []);\n    return {\n        videoRef,\n        isConnected\n    };\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VXZWJSVEMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFvRDtBQUMwQztBQUc5RixNQUFNTSxhQUFhO0lBQ2pCQSxZQUFZO1FBQUM7WUFBRUMsTUFBTTtRQUErQjtLQUFFO0FBQ3hEO0FBRU8sTUFBTUMsWUFBWTtJQUN2QixNQUFNLENBQUNDLGFBQWFDLGVBQWUsR0FBR1IsK0NBQVFBLENBQUM7SUFDL0MsTUFBTVMsV0FBV1YsNkNBQU1BLENBQTBCO0lBQ2pELE1BQU1XLGlCQUFpQlgsNkNBQU1BLENBQTJCO0lBQ3hELE1BQU1ZLFNBQVNaLDZDQUFNQSxDQUFtQjtJQUV4Q0QsZ0RBQVNBOytCQUFDO1lBQ1IsTUFBTWM7OERBQXlCLE9BQU9DO29CQUNwQyxPQUFRQSxRQUFRQyxJQUFJO3dCQUNsQixLQUFLO2dDQUNHSix5QkFDZUEsMEJBQ2ZBOzRCQUZOLFFBQU1BLDBCQUFBQSxlQUFlSyxPQUFPLGNBQXRCTCw4Q0FBQUEsd0JBQXdCTSxvQkFBb0IsQ0FBQyxJQUFJQyxzQkFBc0JKLFFBQVFLLEtBQUs7NEJBQzFGLE1BQU1DLFNBQVMsUUFBTVQsMkJBQUFBLGVBQWVLLE9BQU8sY0FBdEJMLCtDQUFBQSx5QkFBd0JVLFlBQVk7NEJBQ3pELFFBQU1WLDJCQUFBQSxlQUFlSyxPQUFPLGNBQXRCTCwrQ0FBQUEseUJBQXdCVyxtQkFBbUIsQ0FBQ0Y7NEJBQ2xELElBQUlSLE9BQU9JLE9BQU8sRUFBRTtnQ0FDbEJiLDZEQUFXQSxDQUFDUyxPQUFPSSxPQUFPLEVBQUU7b0NBQUVELE1BQU07b0NBQVVLO2dDQUFPOzRCQUN2RDs0QkFDQTt3QkFDRixLQUFLO2dDQUNHVDs0QkFBTixRQUFNQSwyQkFBQUEsZUFBZUssT0FBTyxjQUF0QkwsK0NBQUFBLHlCQUF3Qk0sb0JBQW9CLENBQUMsSUFBSUMsc0JBQXNCSixRQUFRTSxNQUFNOzRCQUMzRjt3QkFDRixLQUFLO2dDQUVHVDs0QkFETixNQUFNWSxZQUFZLElBQUlDLGdCQUFnQlYsUUFBUVMsU0FBUzs0QkFDdkQsUUFBTVosMkJBQUFBLGVBQWVLLE9BQU8sY0FBdEJMLCtDQUFBQSx5QkFBd0JjLGVBQWUsQ0FBQ0Y7NEJBQzlDO3dCQUNGOzRCQUNFO29CQUNKO2dCQUNGOztZQUVBWCxPQUFPSSxPQUFPLEdBQUdkLHdFQUFzQkEsQ0FBQ1c7WUFDeENKLGVBQWU7WUFFZkUsZUFBZUssT0FBTyxHQUFHLElBQUlVLGtCQUFrQnJCO1lBRS9DLE1BQU1zQjt1REFBa0I7b0JBQ3RCLElBQUk7d0JBQ0YsTUFBTUMsU0FBUyxNQUFNQyxVQUFVQyxZQUFZLENBQUNDLFlBQVksQ0FBQzs0QkFBRUMsT0FBTzt3QkFBSzt3QkFDdkUsSUFBSXRCLFNBQVNNLE9BQU8sRUFBRU4sU0FBU00sT0FBTyxDQUFDaUIsU0FBUyxHQUFHTDt3QkFFbkRBLE9BQU9NLFNBQVMsR0FBR0MsT0FBTzttRUFBQyxDQUFDQztvQ0FDdEJ6QjtnQ0FBSixJQUFJQSxFQUFBQSwwQkFBQUEsZUFBZUssT0FBTyxjQUF0QkwsOENBQUFBLHdCQUF3QjBCLGNBQWMsTUFBSyxVQUFVO3dDQUN2RDFCO3FDQUFBQSwyQkFBQUEsZUFBZUssT0FBTyxjQUF0QkwsK0NBQUFBLHlCQUF3QjJCLFFBQVEsQ0FBQ0YsT0FBT1I7Z0NBQzFDOzRCQUNGOztvQkFDRixFQUFFLE9BQU9XLEtBQUs7d0JBQ1pDLFFBQVFDLEtBQUssQ0FBQyxhQUFhRjtvQkFDN0I7Z0JBQ0Y7O1lBRUFaO1lBRUE7dUNBQU87b0JBQ0wsSUFBSWhCLGVBQWVLLE9BQU8sRUFBRTt3QkFDMUJMLGVBQWVLLE9BQU8sQ0FBQzBCLEtBQUs7b0JBQzlCO29CQUNBdEMsc0VBQW9CQTtnQkFDdEI7O1FBQ0Y7OEJBQUcsRUFBRTtJQUVMLE9BQU87UUFBRU07UUFBVUY7SUFBWTtBQUNqQyxFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvamVvbmdzb2xiaW4vY2Fwc3RvbmUtZGVzaWduLWZlL3NyYy9ob29rcy91c2VXZWJSVEMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdFNpZ25hbGluZ1NlcnZlciwgc2VuZE1lc3NhZ2UsIGNsb3NlU2lnbmFsaW5nU2VydmVyIH0gZnJvbSAnQC91dGlscy9zaWduYWxpbmcnO1xuaW1wb3J0IHsgU2lnbmFsaW5nTWVzc2FnZSB9IGZyb20gJ0AvdHlwZXMvc2lnbmFsaW5nJztcblxuY29uc3QgaWNlU2VydmVycyA9IHtcbiAgaWNlU2VydmVyczogW3sgdXJsczogJ3N0dW46c3R1bi5sLmdvb2dsZS5jb206MTkzMDInIH1dLFxufTtcblxuZXhwb3J0IGNvbnN0IHVzZVdlYlJUQyA9ICgpID0+IHtcbiAgY29uc3QgW2lzQ29ubmVjdGVkLCBzZXRJc0Nvbm5lY3RlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHZpZGVvUmVmID0gdXNlUmVmPEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSB1c2VSZWY8UlRDUGVlckNvbm5lY3Rpb24gfCBudWxsPihudWxsKTtcbiAgY29uc3Qgc29ja2V0ID0gdXNlUmVmPFdlYlNvY2tldCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlU2lnbmFsaW5nTWVzc2FnZSA9IGFzeW5jIChtZXNzYWdlOiBTaWduYWxpbmdNZXNzYWdlICkgPT4ge1xuICAgICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnb2ZmZXInOlxuICAgICAgICAgIGF3YWl0IHBlZXJDb25uZWN0aW9uLmN1cnJlbnQ/LnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24obWVzc2FnZS5vZmZlcikpO1xuICAgICAgICAgIGNvbnN0IGFuc3dlciA9IGF3YWl0IHBlZXJDb25uZWN0aW9uLmN1cnJlbnQ/LmNyZWF0ZUFuc3dlcigpO1xuICAgICAgICAgIGF3YWl0IHBlZXJDb25uZWN0aW9uLmN1cnJlbnQ/LnNldExvY2FsRGVzY3JpcHRpb24oYW5zd2VyKTtcbiAgICAgICAgICBpZiAoc29ja2V0LmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlKHNvY2tldC5jdXJyZW50LCB7IHR5cGU6ICdhbnN3ZXInLCBhbnN3ZXIgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhbnN3ZXInOlxuICAgICAgICAgIGF3YWl0IHBlZXJDb25uZWN0aW9uLmN1cnJlbnQ/LnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24obWVzc2FnZS5hbnN3ZXIpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaWNlLWNhbmRpZGF0ZSc6XG4gICAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gbmV3IFJUQ0ljZUNhbmRpZGF0ZShtZXNzYWdlLmNhbmRpZGF0ZSk7XG4gICAgICAgICAgYXdhaXQgcGVlckNvbm5lY3Rpb24uY3VycmVudD8uYWRkSWNlQ2FuZGlkYXRlKGNhbmRpZGF0ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNvY2tldC5jdXJyZW50ID0gY29ubmVjdFNpZ25hbGluZ1NlcnZlcihoYW5kbGVTaWduYWxpbmdNZXNzYWdlKTtcbiAgICBzZXRJc0Nvbm5lY3RlZCh0cnVlKTtcblxuICAgIHBlZXJDb25uZWN0aW9uLmN1cnJlbnQgPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oaWNlU2VydmVycyk7XG5cbiAgICBjb25zdCBnZXRXZWJjYW1TdHJlYW0gPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IHZpZGVvOiB0cnVlIH0pO1xuICAgICAgICBpZiAodmlkZW9SZWYuY3VycmVudCkgdmlkZW9SZWYuY3VycmVudC5zcmNPYmplY3QgPSBzdHJlYW07XG5cbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB7XG4gICAgICAgICAgaWYgKHBlZXJDb25uZWN0aW9uLmN1cnJlbnQ/LnNpZ25hbGluZ1N0YXRlICE9PSAnY2xvc2VkJykge1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uY3VycmVudD8uYWRkVHJhY2sodHJhY2ssIHN0cmVhbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCfsm7nsuqAg7KCR6re8IOyYpOulmDonLCBlcnIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBnZXRXZWJjYW1TdHJlYW0oKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocGVlckNvbm5lY3Rpb24uY3VycmVudCkge1xuICAgICAgICBwZWVyQ29ubmVjdGlvbi5jdXJyZW50LmNsb3NlKCk7XG4gICAgICB9XG4gICAgICBjbG9zZVNpZ25hbGluZ1NlcnZlcigpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4geyB2aWRlb1JlZiwgaXNDb25uZWN0ZWQgfTtcbn07XG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlUmVmIiwidXNlU3RhdGUiLCJjb25uZWN0U2lnbmFsaW5nU2VydmVyIiwic2VuZE1lc3NhZ2UiLCJjbG9zZVNpZ25hbGluZ1NlcnZlciIsImljZVNlcnZlcnMiLCJ1cmxzIiwidXNlV2ViUlRDIiwiaXNDb25uZWN0ZWQiLCJzZXRJc0Nvbm5lY3RlZCIsInZpZGVvUmVmIiwicGVlckNvbm5lY3Rpb24iLCJzb2NrZXQiLCJoYW5kbGVTaWduYWxpbmdNZXNzYWdlIiwibWVzc2FnZSIsInR5cGUiLCJjdXJyZW50Iiwic2V0UmVtb3RlRGVzY3JpcHRpb24iLCJSVENTZXNzaW9uRGVzY3JpcHRpb24iLCJvZmZlciIsImFuc3dlciIsImNyZWF0ZUFuc3dlciIsInNldExvY2FsRGVzY3JpcHRpb24iLCJjYW5kaWRhdGUiLCJSVENJY2VDYW5kaWRhdGUiLCJhZGRJY2VDYW5kaWRhdGUiLCJSVENQZWVyQ29ubmVjdGlvbiIsImdldFdlYmNhbVN0cmVhbSIsInN0cmVhbSIsIm5hdmlnYXRvciIsIm1lZGlhRGV2aWNlcyIsImdldFVzZXJNZWRpYSIsInZpZGVvIiwic3JjT2JqZWN0IiwiZ2V0VHJhY2tzIiwiZm9yRWFjaCIsInRyYWNrIiwic2lnbmFsaW5nU3RhdGUiLCJhZGRUcmFjayIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsImNsb3NlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useWebRTC.ts\n"));

/***/ })

});