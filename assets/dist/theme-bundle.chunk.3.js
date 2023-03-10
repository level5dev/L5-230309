(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./assets/js/theme/custom/its-product.js":
/*!***********************************************!*\
  !*** ./assets/js/theme/custom/its-product.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ITSProduct; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _custom_schematics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../custom/schematics */ "./assets/js/theme/custom/schematics.js");



/**
 * IntuitSolutions - Custom JS that fires on the PDP
 */
var ITSProduct = /*#__PURE__*/function () {
  function ITSProduct(context) {
    this.context = context;
    var showMoreReviews = this.showMoreReviews.bind(this);
    $('.js-load-more-reviews').on('click', showMoreReviews);

    // schematic + parts list buttons
    $('.schematic__content .button:not(.button--pdf)').on('click', _custom_schematics__WEBPACK_IMPORTED_MODULE_1__["default"]);
    $('.more-info-slider__text a[href="#tab-warranty"]').on('click', function (e) {
      var $targetTabId = $(e.currentTarget).attr('href');
      $(".tab-title[href=\"" + $targetTabId + "\"]").trigger('click');
    });
  }
  var _proto = ITSProduct.prototype;
  _proto.showMoreReviews = function showMoreReviews(e) {
    e.preventDefault();
    var $store = $(e.currentTarget);
    var currentPage = $store.data('current-page');
    var productPageReviewsCount = this.context.productpageReviewsCount || 3;
    var productPageURL = this.context.productpageURL;
    var nextPageURL = productPageURL + "?revpage=" + (currentPage + 1);
    $store.attr('disabled', true);
    var requestOptions = {
      config: {
        product: {
          reviews: {
            limit: productPageReviewsCount
          }
        }
      },
      template: 'products/ajax-reviews'
    };
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage(nextPageURL, requestOptions, function (err, res) {
      if (err) {
        $store.attr('disable', false);
        return;
      }
      $(res).hide().appendTo("#productReviews-list").slideDown(200);
      $store.data('current-page', currentPage + 1).attr('disabled', false);
    });
  };
  return ITSProduct;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/custom/schematics.js":
/*!**********************************************!*\
  !*** ./assets/js/theme/custom/schematics.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var photoswipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! photoswipe */ "./node_modules/photoswipe/dist/photoswipe.js");
/* harmony import */ var photoswipe__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(photoswipe__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! photoswipe/dist/photoswipe-ui-default */ "./node_modules/photoswipe/dist/photoswipe-ui-default.js");
/* harmony import */ var photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (event) {
  event.preventDefault();
  var image = new Image();
  image.src = $(event.currentTarget).attr('href') || '';
  image.onload = function (event) {
    var data = [{
      src: event.target.src,
      w: event.target.width,
      h: event.target.height
    }];
    loadGallery(data);
  };
  function loadGallery(images) {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var options = {
      index: 0,
      bgOpacity: 0.8
    };
    var gallery = new photoswipe__WEBPACK_IMPORTED_MODULE_0___default.a(pswpElement, photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1___default.a, images, options);
    gallery.init();
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _custom_its_product__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./custom/its-product */ "./assets/js/theme/custom/its-product.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/*
 Import all product specific js
 */








var Product = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Product, _PageManager);
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal-review-form')[0];
    return _this;
  }
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.bulkPricingHandler();
    var $reviewForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.writeReview-form');
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]({
      $reviewForm: $reviewForm
    });
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }
      return false;
    });
    this.productReviewHandler();

    /**
     * IntuitSolutions - Custom Product
     */
    this.ITSProduct = new _custom_its_product__WEBPACK_IMPORTED_MODULE_7__["default"](this.context);
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2l0cy1wcm9kdWN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vc2NoZW1hdGljcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC92aWRlby1nYWxsZXJ5LmpzIl0sIm5hbWVzIjpbIklUU1Byb2R1Y3QiLCJjb250ZXh0Iiwic2hvd01vcmVSZXZpZXdzIiwiYmluZCIsIiQiLCJvbiIsInNjaGVtYXRpY3MiLCJlIiwiJHRhcmdldFRhYklkIiwiY3VycmVudFRhcmdldCIsImF0dHIiLCJ0cmlnZ2VyIiwiX3Byb3RvIiwicHJvdG90eXBlIiwicHJldmVudERlZmF1bHQiLCIkc3RvcmUiLCJjdXJyZW50UGFnZSIsImRhdGEiLCJwcm9kdWN0UGFnZVJldmlld3NDb3VudCIsInByb2R1Y3RwYWdlUmV2aWV3c0NvdW50IiwicHJvZHVjdFBhZ2VVUkwiLCJwcm9kdWN0cGFnZVVSTCIsIm5leHRQYWdlVVJMIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJwcm9kdWN0IiwicmV2aWV3cyIsImxpbWl0IiwidGVtcGxhdGUiLCJ1dGlscyIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJyZXMiLCJoaWRlIiwiYXBwZW5kVG8iLCJzbGlkZURvd24iLCJldmVudCIsImltYWdlIiwiSW1hZ2UiLCJzcmMiLCJvbmxvYWQiLCJ0YXJnZXQiLCJ3Iiwid2lkdGgiLCJoIiwiaGVpZ2h0IiwibG9hZEdhbGxlcnkiLCJpbWFnZXMiLCJwc3dwRWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIm9wdGlvbnMiLCJpbmRleCIsImJnT3BhY2l0eSIsImdhbGxlcnkiLCJQaG90b1N3aXBlIiwiUGhvdG9Td2lwZVVJRGVmYXVsdCIsImluaXQiLCJQcm9kdWN0IiwiX1BhZ2VNYW5hZ2VyIiwiX2luaGVyaXRzTG9vc2UiLCJfdGhpcyIsImNhbGwiLCJ1cmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCIkcmV2aWV3TGluayIsIiRidWxrUHJpY2luZ0xpbmsiLCJyZXZpZXdNb2RhbCIsIm1vZGFsRmFjdG9yeSIsIm9uUmVhZHkiLCJfdGhpczIiLCJpbmRleE9mIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInRpdGxlIiwicGF0aG5hbWUiLCJ2YWxpZGF0b3IiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJwcm9kdWN0RGV0YWlscyIsIlByb2R1Y3REZXRhaWxzIiwiQkNEYXRhIiwicHJvZHVjdF9hdHRyaWJ1dGVzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJ2aWRlb0dhbGxlcnkiLCJidWxrUHJpY2luZ0hhbmRsZXIiLCIkcmV2aWV3Rm9ybSIsImNsYXNzaWZ5Rm9ybSIsImxlbmd0aCIsInJldmlldyIsIlJldmlldyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsImFyaWFEZXNjcmliZVJldmlld0lucHV0cyIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwiJGZvcm0iLCJmaW5kIiwiZWFjaCIsIl8iLCJpbnB1dCIsIiRpbnB1dCIsIm1zZ1NwYW5JZCIsInNpYmxpbmdzIiwiUGFnZU1hbmFnZXIiLCJWaWRlb0dhbGxlcnkiLCIkZWxlbWVudCIsIiRwbGF5ZXIiLCIkdmlkZW9zIiwiY3VycmVudFZpZGVvIiwiYmluZEV2ZW50cyIsInNlbGVjdE5ld1ZpZGVvIiwiJHRhcmdldCIsImlkIiwiJHNlbGVjdGVkVGh1bWIiLCJzZXRNYWluVmlkZW8iLCJzZXRBY3RpdmVUaHVtYiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJwbHVnaW5LZXkiLCIkdmlkZW9HYWxsZXJ5IiwiZWxlbWVudCIsIiRlbCIsImlzSW5pdGlhbGl6ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQztBQUNEOztBQUU5QztBQUNBO0FBQ0E7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akUsSUFBSWtCLGFBQWEsRUFBRTtNQUNmO0lBQ0o7SUFFQUQsR0FBRyxDQUFDM0csSUFBSSxDQUFDd0csU0FBUyxFQUFFLElBQUlkLFlBQVksQ0FBQ2lCLEdBQUcsQ0FBQyxDQUFDO0VBQzlDLENBQUMsQ0FBQztBQUNOLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xyXG5pbXBvcnQgc2NoZW1hdGljcyBmcm9tICcuLi9jdXN0b20vc2NoZW1hdGljcyc7XHJcblxyXG4vKipcclxuICogSW50dWl0U29sdXRpb25zIC0gQ3VzdG9tIEpTIHRoYXQgZmlyZXMgb24gdGhlIFBEUFxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElUU1Byb2R1Y3Qge1xyXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IHNob3dNb3JlUmV2aWV3cyA9IHRoaXMuc2hvd01vcmVSZXZpZXdzLmJpbmQodGhpcylcclxuXHJcbiAgICAgICAgJCgnLmpzLWxvYWQtbW9yZS1yZXZpZXdzJykub24oJ2NsaWNrJywgc2hvd01vcmVSZXZpZXdzKTtcclxuXHJcbiAgICAgICAgLy8gc2NoZW1hdGljICsgcGFydHMgbGlzdCBidXR0b25zXHJcbiAgICAgICAgJCgnLnNjaGVtYXRpY19fY29udGVudCAuYnV0dG9uOm5vdCguYnV0dG9uLS1wZGYpJykub24oJ2NsaWNrJywgc2NoZW1hdGljcyk7XHJcblxyXG4gICAgICAgICQoJy5tb3JlLWluZm8tc2xpZGVyX190ZXh0IGFbaHJlZj1cIiN0YWItd2FycmFudHlcIl0nKS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0VGFiSWQgPSAkKGUuY3VycmVudFRhcmdldCkuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgICAkKGAudGFiLXRpdGxlW2hyZWY9XCIkeyR0YXJnZXRUYWJJZH1cIl1gKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dNb3JlUmV2aWV3cyhlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0ICRzdG9yZSA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9ICRzdG9yZS5kYXRhKCdjdXJyZW50LXBhZ2UnKTtcclxuICAgICAgICBjb25zdCBwcm9kdWN0UGFnZVJldmlld3NDb3VudCA9IHRoaXMuY29udGV4dC5wcm9kdWN0cGFnZVJldmlld3NDb3VudCB8fCAzO1xyXG4gICAgICAgIGNvbnN0IHByb2R1Y3RQYWdlVVJMID0gdGhpcy5jb250ZXh0LnByb2R1Y3RwYWdlVVJMO1xyXG4gICAgICAgIGNvbnN0IG5leHRQYWdlVVJMID0gYCR7cHJvZHVjdFBhZ2VVUkx9P3JldnBhZ2U9JHtjdXJyZW50UGFnZSArIDF9YDtcclxuXHJcbiAgICAgICAgJHN0b3JlLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjb25maWc6IHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0UGFnZVJldmlld3NDb3VudCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICdwcm9kdWN0cy9hamF4LXJldmlld3MnLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKG5leHRQYWdlVVJMLCByZXF1ZXN0T3B0aW9ucywgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICRzdG9yZS5hdHRyKCdkaXNhYmxlJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKHJlcykuaGlkZSgpLmFwcGVuZFRvKFwiI3Byb2R1Y3RSZXZpZXdzLWxpc3RcIikuc2xpZGVEb3duKDIwMCk7XHJcblxyXG4gICAgICAgICAgICAkc3RvcmUuZGF0YSgnY3VycmVudC1wYWdlJywgY3VycmVudFBhZ2UgKyAxKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBQaG90b1N3aXBlIGZyb20gJ3Bob3Rvc3dpcGUnO1xyXG5pbXBvcnQgUGhvdG9Td2lwZVVJRGVmYXVsdCBmcm9tICdwaG90b3N3aXBlL2Rpc3QvcGhvdG9zd2lwZS11aS1kZWZhdWx0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWFnZS5zcmMgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2hyZWYnKSB8fCAnJztcclxuICAgIGltYWdlLm9ubG9hZCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBbe1xyXG4gICAgICAgICAgICBzcmM6IGV2ZW50LnRhcmdldC5zcmMsXHJcbiAgICAgICAgICAgIHc6IGV2ZW50LnRhcmdldC53aWR0aCxcclxuICAgICAgICAgICAgaDogZXZlbnQudGFyZ2V0LmhlaWdodCxcclxuICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgbG9hZEdhbGxlcnkoZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWRHYWxsZXJ5KGltYWdlcykge1xyXG4gICAgICAgIGNvbnN0IHBzd3BFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBzd3AnKVswXTtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpbmRleDogMCxcclxuICAgICAgICAgICAgYmdPcGFjaXR5OiAwLjgsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgZ2FsbGVyeSA9IG5ldyBQaG90b1N3aXBlKHBzd3BFbGVtZW50LCBQaG90b1N3aXBlVUlEZWZhdWx0LCBpbWFnZXMsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBnYWxsZXJ5LmluaXQoKTtcclxuICAgIH1cclxufVxyXG4iLCIvKlxyXG4gSW1wb3J0IGFsbCBwcm9kdWN0IHNwZWNpZmljIGpzXHJcbiAqL1xyXG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xyXG5pbXBvcnQgUmV2aWV3IGZyb20gJy4vcHJvZHVjdC9yZXZpZXdzJztcclxuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuL2NvbW1vbi9jb2xsYXBzaWJsZSc7XHJcbmltcG9ydCBQcm9kdWN0RGV0YWlscyBmcm9tICcuL2NvbW1vbi9wcm9kdWN0LWRldGFpbHMnO1xyXG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gJy4vcHJvZHVjdC92aWRlby1nYWxsZXJ5JztcclxuaW1wb3J0IHsgY2xhc3NpZnlGb3JtIH0gZnJvbSAnLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XHJcbmltcG9ydCBtb2RhbEZhY3RvcnkgZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xyXG5pbXBvcnQgSVRTUHJvZHVjdCBmcm9tICcuL2N1c3RvbS9pdHMtcHJvZHVjdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgdGhpcy4kcmV2aWV3TGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJyk7XHJcbiAgICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtYnVsay1wcmljaW5nXCJdJyk7XHJcbiAgICAgICAgdGhpcy5yZXZpZXdNb2RhbCA9IG1vZGFsRmFjdG9yeSgnI21vZGFsLXJldmlldy1mb3JtJylbMF07XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgICAvLyBMaXN0ZW4gZm9yIGZvdW5kYXRpb24gbW9kYWwgY2xvc2UgZXZlbnRzIHRvIHNhbml0aXplIFVSTCBhZnRlciByZXZpZXcuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Nsb3NlLmZuZHRuLnJldmVhbCcsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB2YWxpZGF0b3I7XHJcblxyXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVcclxuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBQcm9kdWN0RGV0YWlscygkKCcucHJvZHVjdFZpZXcnKSwgdGhpcy5jb250ZXh0LCB3aW5kb3cuQkNEYXRhLnByb2R1Y3RfYXR0cmlidXRlcyk7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscy5zZXRQcm9kdWN0VmFyaWFudCgpO1xyXG5cclxuICAgICAgICB2aWRlb0dhbGxlcnkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idWxrUHJpY2luZ0hhbmRsZXIoKTtcclxuXHJcbiAgICAgICAgY29uc3QgJHJldmlld0Zvcm0gPSBjbGFzc2lmeUZvcm0oJy53cml0ZVJldmlldy1mb3JtJyk7XHJcblxyXG4gICAgICAgIGlmICgkcmV2aWV3Rm9ybS5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldyh7ICRyZXZpZXdGb3JtIH0pO1xyXG5cclxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRyZXZpZXdGb3JtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJldmlld0Zvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0UmV2aWV3SGFuZGxlcigpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnR1aXRTb2x1dGlvbnMgLSBDdXN0b20gUHJvZHVjdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuSVRTUHJvZHVjdCA9IG5ldyBJVFNQcm9kdWN0KHRoaXMuY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRmb3JtKSB7XHJcbiAgICAgICAgJGZvcm0uZmluZCgnW2RhdGEtaW5wdXRdJykuZWFjaCgoXywgaW5wdXQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1zZ1NwYW5JZCA9IGAkeyRpbnB1dC5hdHRyKCduYW1lJyl9LW1zZ2A7XHJcblxyXG4gICAgICAgICAgICAkaW5wdXQuc2libGluZ3MoJ3NwYW4nKS5hdHRyKCdpZCcsIG1zZ1NwYW5JZCk7XHJcbiAgICAgICAgICAgICRpbnB1dC5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JywgbXNnU3BhbklkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9kdWN0UmV2aWV3SGFuZGxlcigpIHtcclxuICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI3dyaXRlX3JldmlldycpICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLiRyZXZpZXdMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJ1bGtQcmljaW5nSGFuZGxlcigpIHtcclxuICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI2J1bGtfcHJpY2luZycpICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFZpZGVvR2FsbGVyeSB7XHJcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuJHBsYXllciA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLXBsYXllcl0nKTtcclxuICAgICAgICB0aGlzLiR2aWRlb3MgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1pdGVtXScpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge307XHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0TmV3VmlkZW8oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7XHJcbiAgICAgICAgICAgIGlkOiAkdGFyZ2V0LmRhdGEoJ3ZpZGVvSWQnKSxcclxuICAgICAgICAgICAgJHNlbGVjdGVkVGh1bWI6ICR0YXJnZXQsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRNYWluVmlkZW8oKTtcclxuICAgICAgICB0aGlzLnNldEFjdGl2ZVRodW1iKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWFpblZpZGVvKCkge1xyXG4gICAgICAgIHRoaXMuJHBsYXllci5hdHRyKCdzcmMnLCBgLy93d3cueW91dHViZS5jb20vZW1iZWQvJHt0aGlzLmN1cnJlbnRWaWRlby5pZH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBY3RpdmVUaHVtYigpIHtcclxuICAgICAgICB0aGlzLiR2aWRlb3MucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvLiRzZWxlY3RlZFRodW1iLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuJHZpZGVvcy5vbignY2xpY2snLCB0aGlzLnNlbGVjdE5ld1ZpZGVvLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aWRlb0dhbGxlcnkoKSB7XHJcbiAgICBjb25zdCBwbHVnaW5LZXkgPSAndmlkZW8tZ2FsbGVyeSc7XHJcbiAgICBjb25zdCAkdmlkZW9HYWxsZXJ5ID0gJChgW2RhdGEtJHtwbHVnaW5LZXl9XWApO1xyXG5cclxuICAgICR2aWRlb0dhbGxlcnkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICBjb25zdCAkZWwgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPSAkZWwuZGF0YShwbHVnaW5LZXkpIGluc3RhbmNlb2YgVmlkZW9HYWxsZXJ5O1xyXG5cclxuICAgICAgICBpZiAoaXNJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkZWwuZGF0YShwbHVnaW5LZXksIG5ldyBWaWRlb0dhbGxlcnkoJGVsKSk7XHJcbiAgICB9KTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9