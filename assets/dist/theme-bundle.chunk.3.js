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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2l0cy1wcm9kdWN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vc2NoZW1hdGljcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC92aWRlby1nYWxsZXJ5LmpzIl0sIm5hbWVzIjpbIklUU1Byb2R1Y3QiLCJjb250ZXh0Iiwic2hvd01vcmVSZXZpZXdzIiwiYmluZCIsIiQiLCJvbiIsInNjaGVtYXRpY3MiLCJlIiwiJHRhcmdldFRhYklkIiwiY3VycmVudFRhcmdldCIsImF0dHIiLCJ0cmlnZ2VyIiwiX3Byb3RvIiwicHJvdG90eXBlIiwicHJldmVudERlZmF1bHQiLCIkc3RvcmUiLCJjdXJyZW50UGFnZSIsImRhdGEiLCJwcm9kdWN0UGFnZVJldmlld3NDb3VudCIsInByb2R1Y3RwYWdlUmV2aWV3c0NvdW50IiwicHJvZHVjdFBhZ2VVUkwiLCJwcm9kdWN0cGFnZVVSTCIsIm5leHRQYWdlVVJMIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJwcm9kdWN0IiwicmV2aWV3cyIsImxpbWl0IiwidGVtcGxhdGUiLCJ1dGlscyIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJyZXMiLCJoaWRlIiwiYXBwZW5kVG8iLCJzbGlkZURvd24iLCJldmVudCIsImltYWdlIiwiSW1hZ2UiLCJzcmMiLCJvbmxvYWQiLCJ0YXJnZXQiLCJ3Iiwid2lkdGgiLCJoIiwiaGVpZ2h0IiwibG9hZEdhbGxlcnkiLCJpbWFnZXMiLCJwc3dwRWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIm9wdGlvbnMiLCJpbmRleCIsImJnT3BhY2l0eSIsImdhbGxlcnkiLCJQaG90b1N3aXBlIiwiUGhvdG9Td2lwZVVJRGVmYXVsdCIsImluaXQiLCJQcm9kdWN0IiwiX1BhZ2VNYW5hZ2VyIiwiX2luaGVyaXRzTG9vc2UiLCJfdGhpcyIsImNhbGwiLCJ1cmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCIkcmV2aWV3TGluayIsIiRidWxrUHJpY2luZ0xpbmsiLCJyZXZpZXdNb2RhbCIsIm1vZGFsRmFjdG9yeSIsIm9uUmVhZHkiLCJfdGhpczIiLCJpbmRleE9mIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInRpdGxlIiwicGF0aG5hbWUiLCJ2YWxpZGF0b3IiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJwcm9kdWN0RGV0YWlscyIsIlByb2R1Y3REZXRhaWxzIiwiQkNEYXRhIiwicHJvZHVjdF9hdHRyaWJ1dGVzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJ2aWRlb0dhbGxlcnkiLCJidWxrUHJpY2luZ0hhbmRsZXIiLCIkcmV2aWV3Rm9ybSIsImNsYXNzaWZ5Rm9ybSIsImxlbmd0aCIsInJldmlldyIsIlJldmlldyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsImFyaWFEZXNjcmliZVJldmlld0lucHV0cyIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwiJGZvcm0iLCJmaW5kIiwiZWFjaCIsIl8iLCJpbnB1dCIsIiRpbnB1dCIsIm1zZ1NwYW5JZCIsInNpYmxpbmdzIiwiUGFnZU1hbmFnZXIiLCJWaWRlb0dhbGxlcnkiLCIkZWxlbWVudCIsIiRwbGF5ZXIiLCIkdmlkZW9zIiwiY3VycmVudFZpZGVvIiwiYmluZEV2ZW50cyIsInNlbGVjdE5ld1ZpZGVvIiwiJHRhcmdldCIsImlkIiwiJHNlbGVjdGVkVGh1bWIiLCJzZXRNYWluVmlkZW8iLCJzZXRBY3RpdmVUaHVtYiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJwbHVnaW5LZXkiLCIkdmlkZW9HYWxsZXJ5IiwiZWxlbWVudCIsIiRlbCIsImlzSW5pdGlhbGl6ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQztBQUNEOztBQUU5QztBQUNBO0FBQ0E7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akUsSUFBSWtCLGFBQWEsRUFBRTtNQUNmO0lBQ0o7SUFFQUQsR0FBRyxDQUFDM0csSUFBSSxDQUFDd0csU0FBUyxFQUFFLElBQUlkLFlBQVksQ0FBQ2lCLEdBQUcsQ0FBQyxDQUFDO0VBQzlDLENBQUMsQ0FBQztBQUNOLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHNjaGVtYXRpY3MgZnJvbSAnLi4vY3VzdG9tL3NjaGVtYXRpY3MnO1xuXG4vKipcbiAqIEludHVpdFNvbHV0aW9ucyAtIEN1c3RvbSBKUyB0aGF0IGZpcmVzIG9uIHRoZSBQRFBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJVFNQcm9kdWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICAgICAgY29uc3Qgc2hvd01vcmVSZXZpZXdzID0gdGhpcy5zaG93TW9yZVJldmlld3MuYmluZCh0aGlzKVxuXG4gICAgICAgICQoJy5qcy1sb2FkLW1vcmUtcmV2aWV3cycpLm9uKCdjbGljaycsIHNob3dNb3JlUmV2aWV3cyk7XG5cbiAgICAgICAgLy8gc2NoZW1hdGljICsgcGFydHMgbGlzdCBidXR0b25zXG4gICAgICAgICQoJy5zY2hlbWF0aWNfX2NvbnRlbnQgLmJ1dHRvbjpub3QoLmJ1dHRvbi0tcGRmKScpLm9uKCdjbGljaycsIHNjaGVtYXRpY3MpO1xuXG4gICAgICAgICQoJy5tb3JlLWluZm8tc2xpZGVyX190ZXh0IGFbaHJlZj1cIiN0YWItd2FycmFudHlcIl0nKS5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHRhcmdldFRhYklkID0gJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgICQoYC50YWItdGl0bGVbaHJlZj1cIiR7JHRhcmdldFRhYklkfVwiXWApLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3dNb3JlUmV2aWV3cyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgJHN0b3JlID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9ICRzdG9yZS5kYXRhKCdjdXJyZW50LXBhZ2UnKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdFBhZ2VSZXZpZXdzQ291bnQgPSB0aGlzLmNvbnRleHQucHJvZHVjdHBhZ2VSZXZpZXdzQ291bnQgfHwgMztcbiAgICAgICAgY29uc3QgcHJvZHVjdFBhZ2VVUkwgPSB0aGlzLmNvbnRleHQucHJvZHVjdHBhZ2VVUkw7XG4gICAgICAgIGNvbnN0IG5leHRQYWdlVVJMID0gYCR7cHJvZHVjdFBhZ2VVUkx9P3JldnBhZ2U9JHtjdXJyZW50UGFnZSArIDF9YDtcblxuICAgICAgICAkc3RvcmUuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblxuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIHByb2R1Y3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RQYWdlUmV2aWV3c0NvdW50LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdwcm9kdWN0cy9hamF4LXJldmlld3MnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKG5leHRQYWdlVVJMLCByZXF1ZXN0T3B0aW9ucywgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgJHN0b3JlLmF0dHIoJ2Rpc2FibGUnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKHJlcykuaGlkZSgpLmFwcGVuZFRvKFwiI3Byb2R1Y3RSZXZpZXdzLWxpc3RcIikuc2xpZGVEb3duKDIwMCk7XG5cbiAgICAgICAgICAgICRzdG9yZS5kYXRhKCdjdXJyZW50LXBhZ2UnLCBjdXJyZW50UGFnZSArIDEpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiIsImltcG9ydCBQaG90b1N3aXBlIGZyb20gJ3Bob3Rvc3dpcGUnO1xuaW1wb3J0IFBob3RvU3dpcGVVSURlZmF1bHQgZnJvbSAncGhvdG9zd2lwZS9kaXN0L3Bob3Rvc3dpcGUtdWktZGVmYXVsdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uuc3JjID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKCdocmVmJykgfHwgJyc7XG4gICAgaW1hZ2Uub25sb2FkID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbe1xuICAgICAgICAgICAgc3JjOiBldmVudC50YXJnZXQuc3JjLFxuICAgICAgICAgICAgdzogZXZlbnQudGFyZ2V0LndpZHRoLFxuICAgICAgICAgICAgaDogZXZlbnQudGFyZ2V0LmhlaWdodCxcbiAgICAgICAgfV07XG5cbiAgICAgICAgbG9hZEdhbGxlcnkoZGF0YSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvYWRHYWxsZXJ5KGltYWdlcykge1xuICAgICAgICBjb25zdCBwc3dwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wc3dwJylbMF07XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIGJnT3BhY2l0eTogMC44LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGdhbGxlcnkgPSBuZXcgUGhvdG9Td2lwZShwc3dwRWxlbWVudCwgUGhvdG9Td2lwZVVJRGVmYXVsdCwgaW1hZ2VzLCBvcHRpb25zKTtcblxuICAgICAgICBnYWxsZXJ5LmluaXQoKTtcbiAgICB9XG59XG4iLCIvKlxuIEltcG9ydCBhbGwgcHJvZHVjdCBzcGVjaWZpYyBqc1xuICovXG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IFJldmlldyBmcm9tICcuL3Byb2R1Y3QvcmV2aWV3cyc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCBQcm9kdWN0RGV0YWlscyBmcm9tICcuL2NvbW1vbi9wcm9kdWN0LWRldGFpbHMnO1xuaW1wb3J0IHZpZGVvR2FsbGVyeSBmcm9tICcuL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeSc7XG5pbXBvcnQgeyBjbGFzc2lmeUZvcm0gfSBmcm9tICcuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCBtb2RhbEZhY3RvcnkgZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IElUU1Byb2R1Y3QgZnJvbSAnLi9jdXN0b20vaXRzLXByb2R1Y3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xuICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1idWxrLXByaWNpbmdcIl0nKTtcbiAgICAgICAgdGhpcy5yZXZpZXdNb2RhbCA9IG1vZGFsRmFjdG9yeSgnI21vZGFsLXJldmlldy1mb3JtJylbMF07XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgLy8gTGlzdGVuIGZvciBmb3VuZGF0aW9uIG1vZGFsIGNsb3NlIGV2ZW50cyB0byBzYW5pdGl6ZSBVUkwgYWZ0ZXIgcmV2aWV3LlxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xvc2UuZm5kdG4ucmV2ZWFsJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHZhbGlkYXRvcjtcblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoJCgnLnByb2R1Y3RWaWV3JyksIHRoaXMuY29udGV4dCwgd2luZG93LkJDRGF0YS5wcm9kdWN0X2F0dHJpYnV0ZXMpO1xuICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzLnNldFByb2R1Y3RWYXJpYW50KCk7XG5cbiAgICAgICAgdmlkZW9HYWxsZXJ5KCk7XG5cbiAgICAgICAgdGhpcy5idWxrUHJpY2luZ0hhbmRsZXIoKTtcblxuICAgICAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybSgnLndyaXRlUmV2aWV3LWZvcm0nKTtcblxuICAgICAgICBpZiAoJHJldmlld0Zvcm0ubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldyh7ICRyZXZpZXdGb3JtIH0pO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nLCAoKSA9PiB7XG4gICAgICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICB0aGlzLmFyaWFEZXNjcmliZVJldmlld0lucHV0cygkcmV2aWV3Rm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyZXZpZXdGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIHRoaXMucHJvZHVjdFJldmlld0hhbmRsZXIoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW50dWl0U29sdXRpb25zIC0gQ3VzdG9tIFByb2R1Y3RcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuSVRTUHJvZHVjdCA9IG5ldyBJVFNQcm9kdWN0KHRoaXMuY29udGV4dCk7XG4gICAgfVxuXG4gICAgYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRmb3JtKSB7XG4gICAgICAgICRmb3JtLmZpbmQoJ1tkYXRhLWlucHV0XScpLmVhY2goKF8sIGlucHV0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkaW5wdXQgPSAkKGlucHV0KTtcbiAgICAgICAgICAgIGNvbnN0IG1zZ1NwYW5JZCA9IGAkeyRpbnB1dC5hdHRyKCduYW1lJyl9LW1zZ2A7XG5cbiAgICAgICAgICAgICRpbnB1dC5zaWJsaW5ncygnc3BhbicpLmF0dHIoJ2lkJywgbXNnU3BhbklkKTtcbiAgICAgICAgICAgICRpbnB1dC5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JywgbXNnU3BhbklkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvZHVjdFJldmlld0hhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLiRyZXZpZXdMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWxrUHJpY2luZ0hhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjYnVsa19wcmljaW5nJykgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBWaWRlb0dhbGxlcnkge1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHBsYXllciA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLXBsYXllcl0nKTtcbiAgICAgICAgdGhpcy4kdmlkZW9zID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8taXRlbV0nKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7fTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0TmV3VmlkZW8oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHtcbiAgICAgICAgICAgIGlkOiAkdGFyZ2V0LmRhdGEoJ3ZpZGVvSWQnKSxcbiAgICAgICAgICAgICRzZWxlY3RlZFRodW1iOiAkdGFyZ2V0LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2V0TWFpblZpZGVvKCk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlVGh1bWIoKTtcbiAgICB9XG5cbiAgICBzZXRNYWluVmlkZW8oKSB7XG4gICAgICAgIHRoaXMuJHBsYXllci5hdHRyKCdzcmMnLCBgLy93d3cueW91dHViZS5jb20vZW1iZWQvJHt0aGlzLmN1cnJlbnRWaWRlby5pZH1gKTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVUaHVtYigpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8uJHNlbGVjdGVkVGh1bWIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5vbignY2xpY2snLCB0aGlzLnNlbGVjdE5ld1ZpZGVvLmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmlkZW9HYWxsZXJ5KCkge1xuICAgIGNvbnN0IHBsdWdpbktleSA9ICd2aWRlby1nYWxsZXJ5JztcbiAgICBjb25zdCAkdmlkZW9HYWxsZXJ5ID0gJChgW2RhdGEtJHtwbHVnaW5LZXl9XWApO1xuXG4gICAgJHZpZGVvR2FsbGVyeS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCAkZWwgPSAkKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpc0luaXRpYWxpemVkID0gJGVsLmRhdGEocGx1Z2luS2V5KSBpbnN0YW5jZW9mIFZpZGVvR2FsbGVyeTtcblxuICAgICAgICBpZiAoaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJGVsLmRhdGEocGx1Z2luS2V5LCBuZXcgVmlkZW9HYWxsZXJ5KCRlbCkpO1xuICAgIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==