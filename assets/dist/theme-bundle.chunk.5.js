(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./assets/js/theme/blog.js":
/*!*********************************!*\
  !*** ./assets/js/theme/blog.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Blog; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Blog = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Blog, _PageManager);
  function Blog() {
    return _PageManager.apply(this, arguments) || this;
  }
  var _proto = Blog.prototype;
  _proto.onReady = function onReady() {
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.fetchRecentPosts();
  };
  _proto.fetchRecentPosts = function fetchRecentPosts() {
    var $sidebarRecent = $('#blog-sidebar-recent');
    if (!$sidebarRecent.length) return;
    var requestOptions = {
      config: {
        blog: {
          recent_posts: {
            limit: 5
          }
        }
      },
      template: 'custom/blog/blog-recent-post-items'
    };
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.getPage('/', requestOptions, function (err, res) {
      $sidebarRecent.html(res);
    });
  };
  return Blog;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYmxvZy5qcyJdLCJuYW1lcyI6WyJCbG9nIiwiX1BhZ2VNYW5hZ2VyIiwiX2luaGVyaXRzTG9vc2UiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJmZXRjaFJlY2VudFBvc3RzIiwiJHNpZGViYXJSZWNlbnQiLCIkIiwibGVuZ3RoIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJibG9nIiwicmVjZW50X3Bvc3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInV0aWxzIiwiYXBpIiwiZ2V0UGFnZSIsImVyciIsInJlcyIsImh0bWwiLCJQYWdlTWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUM7QUFDTTtBQUNPO0FBQUEsSUFFakNBLElBQUksMEJBQUFDLFlBQUE7RUFBQUMsY0FBQSxDQUFBRixJQUFBLEVBQUFDLFlBQUE7RUFBQSxTQUFBRCxLQUFBO0lBQUEsT0FBQUMsWUFBQSxDQUFBRSxLQUFBLE9BQUFDLFNBQUE7RUFBQTtFQUFBLElBQUFDLE1BQUEsR0FBQUwsSUFBQSxDQUFBTSxTQUFBO0VBQUFELE1BQUEsQ0FDckJFLE9BQU8sR0FBUCxTQUFBQSxRQUFBLEVBQVU7SUFDTkMsbUVBQWtCLEVBQUU7SUFFcEIsSUFBSSxDQUFDQyxnQkFBZ0IsRUFBRTtFQUMzQixDQUFDO0VBQUFKLE1BQUEsQ0FFREksZ0JBQWdCLEdBQWhCLFNBQUFBLGlCQUFBLEVBQW1CO0lBQ2YsSUFBTUMsY0FBYyxHQUFHQyxDQUFDLENBQUMsc0JBQXNCLENBQUM7SUFFaEQsSUFBSSxDQUFDRCxjQUFjLENBQUNFLE1BQU0sRUFBRTtJQUU1QixJQUFNQyxjQUFjLEdBQUc7TUFDbkJDLE1BQU0sRUFBRTtRQUNKQyxJQUFJLEVBQUU7VUFDRkMsWUFBWSxFQUFFO1lBQ1ZDLEtBQUssRUFBRTtVQUNYO1FBQ0o7TUFDSixDQUFDO01BQ0RDLFFBQVEsRUFBRTtJQUNkLENBQUM7SUFFREMsa0VBQUssQ0FBQ0MsR0FBRyxDQUFDQyxPQUFPLENBQUMsR0FBRyxFQUFFUixjQUFjLEVBQUUsVUFBQ1MsR0FBRyxFQUFFQyxHQUFHLEVBQUs7TUFDakRiLGNBQWMsQ0FBQ2MsSUFBSSxDQUFDRCxHQUFHLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBLE9BQUF2QixJQUFBO0FBQUEsRUExQjZCeUIscURBQVciLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xyXG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29tbW9uL2NvbGxhcHNpYmxlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb2cgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XHJcbiAgICBvblJlYWR5KCkge1xyXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xyXG5cclxuICAgICAgICB0aGlzLmZldGNoUmVjZW50UG9zdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBmZXRjaFJlY2VudFBvc3RzKCkge1xyXG4gICAgICAgIGNvbnN0ICRzaWRlYmFyUmVjZW50ID0gJCgnI2Jsb2ctc2lkZWJhci1yZWNlbnQnKTtcclxuXHJcbiAgICAgICAgaWYgKCEkc2lkZWJhclJlY2VudC5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgYmxvZzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudF9wb3N0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogNSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICdjdXN0b20vYmxvZy9ibG9nLXJlY2VudC1wb3N0LWl0ZW1zJyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSgnLycsIHJlcXVlc3RPcHRpb25zLCAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgJHNpZGViYXJSZWNlbnQuaHRtbChyZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=