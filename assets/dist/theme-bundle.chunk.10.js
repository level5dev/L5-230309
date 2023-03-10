(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _custom_its_category__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom/its-category */ "./assets/js/theme/custom/its-category.js");
/* harmony import */ var _custom_toggle_category_listing_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./custom/toggle-category-listing-view */ "./assets/js/theme/custom/toggle-category-listing-view.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);
  function Category(context) {
    var _this;
    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);

    /**
     * IntuitSolutions - Custom Category
     */
    _this.ITSCategory = new _custom_its_category__WEBPACK_IMPORTED_MODULE_5__["default"](context);
    _this.toggleCategoryListingView = new _custom_toggle_category_listing_view__WEBPACK_IMPORTED_MODULE_6__["default"](context);
    return _this;
  }
  var _proto = Category.prototype;
  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      'aria-live': ariaLiveStatus
    });
  };
  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;
    if (!$('[data-shop-by-price]').length) return;
    if ($('.navList-action').hasClass('is-active')) {
      $('a.navList-action.is-active').focus();
    }
    $('a.navList-action').on('click', function () {
      return _this2.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive');
    });
  };
  _proto.onReady = function onReady() {
    var _this3 = this;
    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on('click', function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite');
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }
    $('a.reset-btn').on('click', function () {
      return _this3.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite');
    });
    this.ariaNotifyNoProducts();
  };
  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $('[data-no-products-notification]');
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this4 = this;
    var _this$validationDicti = this.validationDictionary,
      onMinPriceError = _this$validationDicti.price_min_evaluation,
      onMaxPriceError = _this$validationDicti.price_max_evaluation,
      minPriceNotEntered = _this$validationDicti.price_min_not_entered,
      maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
      onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: this.toggleCategoryListingView.getRequestTemplateType('category'),
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);

      /**
       * IntuitSolutions - Category Update
       */
      _this4.ITSCategory.afterFacetUpdate();
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
    $('body').on('productViewModeChanged', function () {
      var NewOpts = {
        config: {
          category: {
            shop_by_price: true,
            products: {
              limit: productsPerPage
            }
          }
        },
        template: {
          productListing: _this4.toggleCategoryListingView.getRequestTemplateType('category'),
          sidebar: 'category/sidebar'
        },
        showMore: 'category/show-more'
      };
      _this4.facetedSearch.updateRequestOptions(NewOpts);
    });
  };
  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ }),

/***/ "./assets/js/theme/custom/its-category.js":
/*!************************************************!*\
  !*** ./assets/js/theme/custom/its-category.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ITSCategory; });
var ITSCategory = /*#__PURE__*/function () {
  function ITSCategory(context) {
    this.context = context;
  }
  var _proto = ITSCategory.prototype;
  _proto.afterFacetUpdate = function afterFacetUpdate() {};
  return ITSCategory;
}();


/***/ }),

/***/ "./assets/js/theme/custom/toggle-category-listing-view.js":
/*!****************************************************************!*\
  !*** ./assets/js/theme/custom/toggle-category-listing-view.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ToggleCategoryListingView; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");


var ToggleCategoryListingView = /*#__PURE__*/function () {
  function ToggleCategoryListingView(context) {
    var _this = this;
    this.context = context;
    this.defaultViewType = this.context.defaultViewType;
    this.oppositeViewType = this.defaultViewType !== 'grid' ? 'grid' : 'list';
    this.productsPerPage = this.context.categoryProductsPerPage;
    this.loadingOverlay = $('.loadingOverlay.loadingOverlay--product-listing');
    $('body').on('facetedSearchRefresh', function () {
      _this.addToggleEvents();
    });
    this.init();
  }
  var _proto = ToggleCategoryListingView.prototype;
  _proto.getStoredViewType = function getStoredViewType() {
    return sessionStorage.getItem('category-view-type') || null;
  };
  _proto.getRequestTemplateType = function getRequestTemplateType(type) {
    var pageType = this.getStoredViewType();
    return !pageType ? type + "/product-listing" : "custom/category-" + pageType + "-view";
  };
  _proto.storeViewType = function storeViewType(type) {
    sessionStorage.setItem('category-view-type', type);
  };
  _proto.getCategoryPage = function getCategoryPage(pageType) {
    var _this2 = this;
    var config = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: this.productsPerPage
          }
        }
      },
      template: "custom/category-" + pageType + "-view"
    };
    this.loadingOverlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["api"].getPage(_common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].getUrl(), config, function (err, content) {
      if (err) {
        throw new Error(err);
      }
      $('#product-listing-container').html(content);
      _this2.loadingOverlay.hide();
      _this2.storeViewType(pageType);
      _this2.addToggleEvents();
      $('body').triggerHandler('productViewModeChanged');
    });
  };
  _proto.addToggleEvents = function addToggleEvents() {
    var _this3 = this;
    $('.js-category__toggle-view').on('click', function (e) {
      var type = $(e.currentTarget).data('view-type');
      if ($(e.currentTarget).hasClass('active-category-view')) return;
      _this3.getCategoryPage(type, _this3.addToggleEvents);
    });
  };
  _proto.init = function init() {
    var storedViewType = this.getStoredViewType();
    if (storedViewType === this.defaultViewType || !storedViewType) {
      return this.addToggleEvents();
    }
    this.getCategoryPage(this.oppositeViewType);
  };
  return ToggleCategoryListingView;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS9pdHMtY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS90b2dnbGUtY2F0ZWdvcnktbGlzdGluZy12aWV3LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiX0NhdGFsb2dQYWdlIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJJVFNDYXRlZ29yeSIsInRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXciLCJUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IiwiX3Byb3RvIiwicHJvdG90eXBlIiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCJfdGhpczIiLCIkIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJmb2N1cyIsIm9uIiwib25SZWFkeSIsIl90aGlzMyIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiY29tcGFyZVByb2R1Y3RzIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwiX3RoaXM0IiwiX3RoaXMkdmFsaWRhdGlvbkRpY3RpIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwiZ2V0UmVxdWVzdFRlbXBsYXRlVHlwZSIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJhZnRlckZhY2V0VXBkYXRlIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJOZXdPcHRzIiwidXBkYXRlUmVxdWVzdE9wdGlvbnMiLCJDYXRhbG9nUGFnZSIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwiYXJndW1lbnRzIiwiSlNPTiIsInBhcnNlIiwidW5kZWZpbmVkIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyIsImRlZmF1bHRWaWV3VHlwZSIsIm9wcG9zaXRlVmlld1R5cGUiLCJsb2FkaW5nT3ZlcmxheSIsImFkZFRvZ2dsZUV2ZW50cyIsImluaXQiLCJnZXRTdG9yZWRWaWV3VHlwZSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInR5cGUiLCJwYWdlVHlwZSIsInN0b3JlVmlld1R5cGUiLCJzZXRJdGVtIiwiZ2V0Q2F0ZWdvcnlQYWdlIiwic2hvdyIsImFwaSIsImdldFBhZ2UiLCJ1cmxVdGlscyIsImdldFVybCIsImVyciIsIkVycm9yIiwiaGlkZSIsImRhdGEiLCJzdG9yZWRWaWV3VHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDb0I7QUFDSjtBQUNtQztBQUN2QztBQUM4QjtBQUFBLElBRXpEQSxRQUFRLDBCQUFBQyxZQUFBO0VBQUFDLGNBQUEsQ0FBQUYsUUFBQSxFQUFBQyxZQUFBO0VBQ3pCLFNBQUFELFNBQVlHLE9BQU8sRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDakJBLEtBQUEsR0FBQUgsWUFBQSxDQUFBSSxJQUFBLE9BQU1GLE9BQU8sQ0FBQztJQUNkQyxLQUFBLENBQUtFLG9CQUFvQixHQUFHQywwR0FBMkIsQ0FBQ0osT0FBTyxDQUFDOztJQUVoRTtBQUNSO0FBQ0E7SUFDUUMsS0FBQSxDQUFLSSxXQUFXLEdBQUcsSUFBSUEsNERBQVcsQ0FBQ0wsT0FBTyxDQUFDO0lBQzNDQyxLQUFBLENBQUtLLHlCQUF5QixHQUFHLElBQUlDLDRFQUF5QixDQUFDUCxPQUFPLENBQUM7SUFBQyxPQUFBQyxLQUFBO0VBQzVFO0VBQUMsSUFBQU8sTUFBQSxHQUFBWCxRQUFBLENBQUFZLFNBQUE7RUFBQUQsTUFBQSxDQUVERSx1QkFBdUIsR0FBdkIsU0FBQUEsd0JBQXdCQyxRQUFRLEVBQUVDLFFBQVEsRUFBRUMsY0FBYyxFQUFFO0lBQ3hERixRQUFRLENB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QUFBO0lBQ2ROLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDSSxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUNJLENBQUMsRUFBSztNQUM5QyxJQUFNa0YsSUFBSSxHQUFHMUYsQ0FBQyxDQUFDUSxDQUFDLENBQUNDLGFBQWEsQ0FBQyxDQUFDOEYsSUFBSSxDQUFDLFdBQVcsQ0FBQztNQUVqRCxJQUFJdkcsQ0FBQyxDQUFDUSxDQUFDLENBQUNDLGFBQWEsQ0FBQyxDQUFDUCxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtNQUV6REksTUFBSSxDQUFDd0YsZUFBZSxDQUFDSixJQUFJLEVBQUVwRixNQUFJLENBQUMrRSxlQUFlLENBQUM7SUFDcEQsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBL0YsTUFBQSxDQUVEZ0csSUFBSSxHQUFKLFNBQUFBLEtBQUEsRUFBTztJQUNILElBQU1rQixjQUFjLEdBQUcsSUFBSSxDQUFDakIsaUJBQWlCLEVBQUU7SUFFL0MsSUFBSWlCLGNBQWMsS0FBSyxJQUFJLENBQUN0QixlQUFlLElBQUksQ0FBQ3NCLGNBQWMsRUFBRTtNQUM1RCxPQUFPLElBQUksQ0FBQ25CLGVBQWUsRUFBRTtJQUNqQztJQUVBLElBQUksQ0FBQ1MsZUFBZSxDQUFDLElBQUksQ0FBQ1gsZ0JBQWdCLENBQUM7RUFDL0MsQ0FBQztFQUFBLE9BQUE5Rix5QkFBQTtBQUFBIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgSVRTQ2F0ZWdvcnkgZnJvbSAnLi9jdXN0b20vaXRzLWNhdGVnb3J5JztcbmltcG9ydCBUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IGZyb20gJy4vY3VzdG9tL3RvZ2dsZS1jYXRlZ29yeS1saXN0aW5nLXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnR1aXRTb2x1dGlvbnMgLSBDdXN0b20gQ2F0ZWdvcnlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuSVRTQ2F0ZWdvcnkgPSBuZXcgSVRTQ2F0ZWdvcnkoY29udGV4dCk7XG4gICAgICAgIHRoaXMudG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyA9IG5ldyBUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3KGNvbnRleHQpO1xuICAgIH1cblxuICAgIHNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCRlbGVtZW50LCByb2xlVHlwZSwgYXJpYUxpdmVTdGF0dXMpIHtcbiAgICAgICAgJGVsZW1lbnQuYXR0cih7XG4gICAgICAgICAgICByb2xlOiByb2xlVHlwZSxcbiAgICAgICAgICAgICdhcmlhLWxpdmUnOiBhcmlhTGl2ZVN0YXR1cyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpIHtcbiAgICAgICAgaWYgKCEkKCdbZGF0YS1zaG9wLWJ5LXByaWNlXScpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICgkKCcubmF2TGlzdC1hY3Rpb24nKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICQoJ2EubmF2TGlzdC1hY3Rpb24uaXMtYWN0aXZlJykuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2EubmF2TGlzdC1hY3Rpb24nKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoJ3NwYW4ucHJpY2UtZmlsdGVyLW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdhc3NlcnRpdmUnKSk7XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuXG4gICAgICAgICQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbignY2xpY2snLCAoZSkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLCAnc3RhdHVzJywgJ3BvbGl0ZScpKTtcblxuICAgICAgICB0aGlzLm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKTtcblxuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2EucmVzZXQtYnRuJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMoJCgnc3Bhbi5yZXNldC1tZXNzYWdlJyksICdzdGF0dXMnLCAncG9saXRlJykpO1xuXG4gICAgICAgIHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKTtcbiAgICB9XG5cbiAgICBhcmlhTm90aWZ5Tm9Qcm9kdWN0cygpIHtcbiAgICAgICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpO1xuICAgICAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdGluZzogdGhpcy50b2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3LmdldFJlcXVlc3RUZW1wbGF0ZVR5cGUoJ2NhdGVnb3J5JyksXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnY2F0ZWdvcnkvc2hvdy1tb3JlJyxcbiAgICAgICAgfTtcblxuXG4gICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCAoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEludHVpdFNvbHV0aW9ucyAtIENhdGVnb3J5IFVwZGF0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLklUU0NhdGVnb3J5LmFmdGVyRmFjZXRVcGRhdGUoKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdib2R5Jykub24oJ3Byb2R1Y3RWaWV3TW9kZUNoYW5nZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBOZXdPcHRzID0ge1xuICAgICAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdGluZzogdGhpcy50b2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3LmdldFJlcXVlc3RUZW1wbGF0ZVR5cGUoJ2NhdGVnb3J5JyksXG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNob3dNb3JlOiAnY2F0ZWdvcnkvc2hvdy1tb3JlJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaC51cGRhdGVSZXF1ZXN0T3B0aW9ucyhOZXdPcHRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSVRTQ2F0ZWdvcnkge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG5cbiAgICBhZnRlckZhY2V0VXBkYXRlKCkge1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHVybFV0aWxzIGZyb20gJy4uL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuZGVmYXVsdFZpZXdUeXBlID0gdGhpcy5jb250ZXh0LmRlZmF1bHRWaWV3VHlwZTtcbiAgICAgICAgdGhpcy5vcHBvc2l0ZVZpZXdUeXBlID0gdGhpcy5kZWZhdWx0Vmlld1R5cGUgIT09ICdncmlkJyA/ICdncmlkJyA6ICdsaXN0JztcbiAgICAgICAgdGhpcy5wcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XG4gICAgICAgIHRoaXMubG9hZGluZ092ZXJsYXkgPSAkKCcubG9hZGluZ092ZXJsYXkubG9hZGluZ092ZXJsYXktLXByb2R1Y3QtbGlzdGluZycpO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignZmFjZXRlZFNlYXJjaFJlZnJlc2gnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZFRvZ2dsZUV2ZW50cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBnZXRTdG9yZWRWaWV3VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2NhdGVnb3J5LXZpZXctdHlwZScpIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0UmVxdWVzdFRlbXBsYXRlVHlwZSh0eXBlKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VUeXBlID0gdGhpcy5nZXRTdG9yZWRWaWV3VHlwZSgpO1xuICAgICAgICByZXR1cm4gIXBhZ2VUeXBlID8gYCR7dHlwZX0vcHJvZHVjdC1saXN0aW5nYCA6IGBjdXN0b20vY2F0ZWdvcnktJHtwYWdlVHlwZX0tdmlld2A7XG4gICAgfVxuXG4gICAgc3RvcmVWaWV3VHlwZSh0eXBlKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2NhdGVnb3J5LXZpZXctdHlwZScsIHR5cGUpO1xuICAgIH1cblxuICAgIGdldENhdGVnb3J5UGFnZShwYWdlVHlwZSkge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHRoaXMucHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBjdXN0b20vY2F0ZWdvcnktJHtwYWdlVHlwZX0tdmlld2AsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nT3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgYXBpLmdldFBhZ2UodXJsVXRpbHMuZ2V0VXJsKCksIGNvbmZpZywgKGVyciwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpLmh0bWwoY29udGVudCk7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZGluZ092ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3JlVmlld1R5cGUocGFnZVR5cGUpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZFRvZ2dsZUV2ZW50cygpO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ3Byb2R1Y3RWaWV3TW9kZUNoYW5nZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkVG9nZ2xlRXZlbnRzKCkge1xuICAgICAgICAkKCcuanMtY2F0ZWdvcnlfX3RvZ2dsZS12aWV3Jykub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgndmlldy10eXBlJyk7XG5cbiAgICAgICAgICAgIGlmICgkKGUuY3VycmVudFRhcmdldCkuaGFzQ2xhc3MoJ2FjdGl2ZS1jYXRlZ29yeS12aWV3JykpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yeVBhZ2UodHlwZSwgdGhpcy5hZGRUb2dnbGVFdmVudHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzdG9yZWRWaWV3VHlwZSA9IHRoaXMuZ2V0U3RvcmVkVmlld1R5cGUoKTtcblxuICAgICAgICBpZiAoc3RvcmVkVmlld1R5cGUgPT09IHRoaXMuZGVmYXVsdFZpZXdUeXBlIHx8ICFzdG9yZWRWaWV3VHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkVG9nZ2xlRXZlbnRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldENhdGVnb3J5UGFnZSh0aGlzLm9wcG9zaXRlVmlld1R5cGUpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=