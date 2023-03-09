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
/* harmony import */ var _custom_its_global__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./custom/its-global */ "./assets/js/theme/custom/its-global.js");
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
      "aria-live": ariaLiveStatus
    });
  };
  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;
    if (!$("[data-shop-by-price]").length) return;
    if ($(".navList-action").hasClass("is-active")) {
      $("a.navList-action.is-active").focus();
    }
    $("a.navList-action").on("click", function () {
      return _this2.setLiveRegionAttributes($("span.price-filter-message"), "status", "assertive");
    });
  };
  _proto.onReady = function onReady() {
    var _this3 = this;
    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on("click", function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), "status", "polite");
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on("sortBy-submitted", this.onSortBySubmit);
    }
    $("a.reset-btn").on("click", function () {
      return _this3.setLiveRegionsAttributes($("span.reset-message"), "status", "polite");
    });
    this.ariaNotifyNoProducts();
    this.validateProductsCount();
  };
  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $("[data-no-products-notification]");
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
    var $productListingContainer = $("#product-listing-container");
    var $facetedSearchContainer = $("#faceted-search-container");
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
        productListing: this.toggleCategoryListingView.getRequestTemplateType("category"),
        sidebar: "category/sidebar"
      },
      showMore: "category/show-more"
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $("body").triggerHandler("compareReset");
      $("html, body").animate({
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
    $("body").on("productViewModeChanged", function () {
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
          productListing: _this4.toggleCategoryListingView.getRequestTemplateType("category"),
          sidebar: "category/sidebar"
        },
        showMore: "category/show-more"
      };
      _this4.facetedSearch.updateRequestOptions(NewOpts);
    });
  };
  _proto.startGlobal = function startGlobal() {
    Object(_custom_its_global__WEBPACK_IMPORTED_MODULE_7__["default"])(this.context);
  };
  _proto.disableViewDetailButton = function disableViewDetailButton() {
    $("[view-detail-button]").off("click");
  };
  _proto.validateProductsCount = function validateProductsCount() {
    var products = this.context.products;
    var body = this;
    var UUIDcatc = this.context.UUIDcatc;
    var categoryId = this.context.categoryId;
    // console.log(products);
    var existProdId = [];
    products.forEach(function (pr) {
      existProdId.push(pr.id);
    });
    // console.log(existProdId);
    axios.get("https://sufri.autocode.dev/l5t@dev/getATProduct/", {
      params: {
        id: categoryId
      }
    }).then(function (response) {
      var data = response.data.product;
      data.forEach(function (pr) {
        if (existProdId.includes(pr["id"])) {
          var $item = $(".product[data-entity-id=\"" + pr["id"] + "\"]");
          $item.attr("data-best-selling", "" + pr["total_sold"]);
          $item.attr("data-date-created", "" + pr["date_created"]);
        } else {
          var template = constructTemplate(pr);
          $("#product-listing-all").append(template);
        }
      });
      $("#loader-block").hide();
      body.configureIsotopeForAll();
      body.startGlobal();
      body.disableViewDetailButton();
    })["catch"](function (error) {
      console.log(error);
    });
    function constructTemplate(pr) {
      var img = {};
      for (var i = 0; i < pr["images"].length; i++) {
        if (pr["images"][i]["is_thumbnail"]) {
          img = pr["images"][i];
          break;
        }
      }
      var actionSection = "";
      if (pr["variants"].length > 1) {
        actionSection = "<button type=\"button\" class=\"button button--primary quickview button--quickview\" data-product-id=\"" + pr["id"] + "\">View Options</button>";
      } else {
        actionSection = "\n            <div class=\"card-atc js-card-atc\">\n              <div class=\"card-atc__section card-atc__section--qty\">\n                <label for=\"card-atc__qty-" + pr["id"] + "-" + UUIDcatc + "\" class=\"card-atc__label is-srOnly\">Quantity:</label>\n                <div class=\"card-atc-increment card-atc-increment--has-buttons js-card-atc-increment\">\n\n                  <input type=\"tel\" class=\"form-input card-atc__input card-atc__input--total js-card-atc__input--total\" name=\"card-atc__qty-" + pr["id"] + "-" + UUIDcatc + "\" id=\"card-atc__qty-" + pr["id"] + "-" + UUIDcatc + "\" value=\"1\" min=\"1\" pattern=\"[0-9]*\" aria-live=\"polite\">\n                  <div class=\"card-atc-button-wrapper\">\n                    <button class=\"button button--icon\" data-action=\"inc\" type=\"button\">\n                      <span class=\"is-srOnly\">Increase Quantity of undefined</span>\n                      <span class=\"icon-wrapper\" aria-hidden=\"true\">\n                        <svg class=\"icon\">\n                          <use xlink:href=\"#icon-add\"></use>\n                        </svg>\n                      </span>\n                    </button>\n                    <button class=\"button button--icon\" data-action=\"dec\" type=\"button\">\n                      <span class=\"is-srOnly\">Decrease Quantity of undefined</span>\n                      <span class=\"icon-wrapper\" aria-hidden=\"true\">\n                        <svg class=\"icon\">\n                          <use xlink:href=\"#icon-minus\"></use>PP\n                        </svg>\n                      </span>\n                    </button>\n                  </div>\n                </div>\n              </div>\n              <div class=\"card-atc__section card-atc__section--action\">\n                <button type=\"button\" class=\"card-atc__button button button--primary js-card-atc__button\" id=\"card-atc__add-" + pr["id"] + "-" + UUIDcatc + "\" data-default-message=\"Add to Cart\" data-wait-message=\"Adding to cart\u2026\" data-added-message=\"Add to Cart\" value=\"Add to Cart\" data-card-add-to-cart=\"/cart.php?action=add&amp;product_id=" + pr["id"] + "\" data-event-type=\"product-click\">Add to Cart</button>\n                <span class=\"product-status-message aria-description--hidden\">Adding to cart\u2026 The item has been added</span>\n              </div>\n          </div>";
      }
      var template = "\n          <div id=\"product-" + pr["id"] + "\" sort-order=\"" + pr["sort_order"] + "\" \n          class=\"product\"\n          product-data-category=\"" + pr["categories"] + "\" \n          product-data-name=\"" + pr["fake-heading"] + "\" \n          product-data-review=\"" + (pr["reviews_count"] === 0 ? 0 : pr["reviews_rating_sum"] / pr["reviews_count"]) + "\"\n          product-review-count=\"" + pr["reviews_count"] + "\" \n          product-data-price=\"" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\" \n          product-date-created=\"" + pr["date_created"] + "\" \n          product-is-featured=\"" + pr["is_featured"] + "\" \n          product-best-selling=\"" + pr["total_sold"] + "\"\n          product-custom-sort-order=\"" + pr["custom-sort-order"] + "\"\n          \n          product-filter-IAT=\"\"\n          product-filter-FBS=\"\"\n          product-filter-FBC=\"\"\n          product-filter-CAT=\"\"\n          product-filter-NCF=\"\"\n          product-filter-NCP=\"\"\n          product-filter-NSI=\"\"\n          product-filter-HT=\"\"\n          >\n              <div class=\"card-wrapper\">\n                  <article class=\"card\" data-test=\"card-" + pr["id"] + "\">\n                      <figure class=\"card-figure\">\n                          <div class=\"sale-flag-sash\" style=\"display: " + (pr["variants"][0].sale_price !== 0 ? "block;" : "none;") + " \"><span class=\"sale-text\">On Sale</span></div>\n                          <a href=\"" + pr["custom_url"]["url"] + "\" \n                          class=\"card-figure__link\" \n                          aria-label=\"" + pr["name"] + ", \n                          $" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\">\n                              <div class=\" card-img-container\">\n                                  <img src=\"" + img["url_thumbnail"] + "\" \n                                  alt=\"img[\"description\"]\" title=\"" + pr["fake-heading"] + "\" \n                                  data-sizes=\"auto\" \n                                  srcset=\"" + img["url_standard"] + " 80w, \n                                  " + img["url_standard"] + " 160w, \n                                  " + img["url_standard"] + " 320w, \n                                  " + img["url_standard"] + " 640w, \n                                  " + img["url_standard"] + " 960w, \n                                  " + img["url_standard"] + " 1280w, \n                                  " + img["url_standard"] + " 1920w, \n                                  " + img["url_standard"] + " 2560w\" \n                                  data-srcset=\"" + img["url_standard"] + " 80w, \n                                  " + img["url_standard"] + " 160w, \n                                  " + img["url_standard"] + " 320w, \n                                  " + img["url_standard"] + " 640w, \n                                  " + img["url_standard"] + " 960w, \n                                  " + img["url_standard"] + " 1280w, \n                                  " + img["url_standard"] + " 1920w, \n                                  " + img["url_standard"] + " 2560w\" \n                                  class=\"card-image lazyautosizes lazyloaded\" sizes=\"248px\">\n                              </div>\n                          </a>\n                         <figcaption class=\"card-figcaption\">\n                              <div class=\"card-figcaption-body\"></div>\n                         </figcaption>\n                      </figure>\n                      <div class=\"card-body\">\n                          <p class=\"productView-type-title h4\" \n                          product-name=\"\">" + pr["fake-heading"] + "</p>\n                          <h3 class=\"card-title \">\n                              <a aria-label=\"" + pr["name"] + ", \n                                $" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\" \n                              href=\"" + pr["custom_url"]["url"] + "\">\n                              " + pr["name"] + "</a>\n                          </h3>\n                          <p class=\"card-text card-text--sku\">\n                              <span> SKU#: " + pr["sku"] + " </span>\n                          </p>\n                          <div class=\"card-text card-text--price\" data-test-info-type=\"price\">\n                              <div class=\"price-section price-section--withoutTax rrp-price--withoutTax h4\" style=\"display: block;\">\n                                  <span class=\"is-srOnly\"> MSRP: </span>\n                                  <span data-product-rrp-price-without-tax=\"\" class=\"price price--rrp h5\">\n                                    " + (pr["variants"][0].sale_price !== 0 ? "$" + pr["variants"][0].retail_price : "") + "\n                                  </span>\n                              </div>\n                              <div class=\"price-section price-section--withoutTax non-sale-price--withoutTax h5\" style=\"display: none;\">\n                                <span class=\"is-srOnly\"> Was: </span>\n                                <span data-product-non-sale-price-without-tax=\"\" class=\"price price--non-sale\"></span>\n                              </div>\n                              <div class=\"price-section price-section--withoutTax h4\">\n                                <span class=\"price-label is-srOnly\"></span>\n                                <span class=\"price-now-label is-srOnly\" style=\"display: none;\">Now:</span>\n                                <span data-product-price-without-tax=\"\" class=\"price price--withoutTax\">$" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "</span>\n                              </div>\n                          </div>\n                          <p class=\"card-text card-text--extra\" style=\"display: " + (pr["custom_fields"].find(function (field) {
        return field["name"] === "__card-extra-info";
      }) !== undefined ? "relative;" : "none;") + " \"> \n                          " + (pr["custom_fields"].find(function (field) {
        return field["name"] === "__card-extra-info";
      }) !== undefined ? pr["custom_fields"].find(function (field) {
        return field["name"] === "__card-extra-info";
      }).value : "") + "</p>\n                         <div class=\"card-action-wrapper\">\n                              " + actionSection + "\n                              <button type=\"button\" onclick=\"window.location.href=" + pr["custom_url"]["url"] + "\" \n                              class=\"button button--primary\" >View Details</button>\n                         </div>\n                      </div>\n                  </article>\n              </div>\n          </div>";
      return template;
    }
  };
  _proto.configureIsotopeForAll = function configureIsotopeForAll() {
    // $(".grid").css("display", "grid");
    //   $(".lds-block").hide();
    var grid = document.getElementById("product-listing-all");
    var body = this;

    // for testing, comment this section and call the runImageTest()
    var iso;
    runIsotope();
    // if (this.checkMobile()) {
    //   runImageTest();
    // } else {
    //   $(".grid").css("display", "grid");
    //   $(".lds-block").hide();
    //   runIsotope();
    // }

    // runImageTest();

    // it will call runIsotope() if all images are loaded
    function runImageTest() {
      //   $(".grid").css("display", "grid");
      //   $(".lds-block").hide();

      var imgLoaded = true;
      var testImgInt = setInterval(function () {
        var cardImgs = document.querySelectorAll("#grid-all-product .card-image");
        if (cardImgs.length > 0) {
          for (var i = 0; i < cardImgs.length; i++) {
            var nonZero = true;
            if (cardImgs[i].offsetHeight < 100) {
              imgLoaded = false;
              nonZero = false;
              break;
            }
            if (nonZero) {
              imgLoaded = true;
            }
          }
        } else {
          imgLoaded = false;
        }
        if (imgLoaded) {
          clearInterval(testImgInt);
          runIsotope();
          // body.configureIsotopeForAll();
          // body.startGlobal();
          // $(".lds-block").hide();
        }
      }, 0);
    }
    function runIsotope() {
      // $(window).load(function () {
      // setTimeout(function () {

      iso = new Isotope(grid, {
        // options...
        itemSelector: ".product",
        layoutMode: "fitRows",
        getSortData: {
          name: function name(itemElem) {
            return itemElem.getAttribute("data-name");
          },
          price: function price(itemElem) {
            return Number(itemElem.getAttribute("data-product-price"));
          },
          review: function review(itemElem) {
            return itemElem.getAttribute("data-rating");
          },
          best_selling: function best_selling(itemElem) {
            return Number(itemElem.getAttribute("data-best-selling"));
          },
          newest: function newest(itemElem) {
            return itemElem.getAttribute("data-date-created");
          },
          custom_sort_order: function custom_sort_order(itemElem) {
            return Number(itemElem.getAttribute("data-custom-sort"));
          }
        }
      });
      // });
      // }, 0);

      $("#all-sort-select, #all-sort-select-mobile").change(function () {
        var val = $(this).val().split("-");
        if (val[0] === "review") {
          iso.arrange({
            sortBy: [val[0], "rating_count"],
            sortAscending: {
              review: false,
              rating_count: false
            }
          });
        } else {
          iso.arrange({
            sortBy: val[0],
            sortAscending: val[1] === "asc"
          });
        }
      });
      $("#all-sort-select, #all-sort-select-mobile").prop("disabled", false);
      setTimeout(function () {
        if (body.context.subcategories.length === 0) {
          iso.arrange({
            sortBy: "custom_sort_order",
            sortAscending: true
          });
        } else {
          iso.arrange({
            sortBy: "best_selling",
            sortAscending: false
          });
        }
      }, 3);
      var resizeLayout = false;
      addEventListener("resize", function (event) {
        resizeLayout = true;
      });
      iso.on("layoutComplete", function () {
        if (resizeLayout) {
          resizeLayout = false;
          iso.arrange();
          return;
        }
        return;
      });
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS9pdHMtY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS90b2dnbGUtY2F0ZWdvcnktbGlzdGluZy12aWV3LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiX0NhdGFsb2dQYWdlIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJJVFNDYXRlZ29yeSIsInRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXciLCJUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IiwiX3Byb3RvIiwicHJvdG90eXBlIiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCJfdGhpczIiLCIkIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJmb2N1cyIsIm9uIiwib25SZWFkeSIsIl90aGlzMyIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiY29tcGFyZVByb2R1Y3RzIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwidmFsaWRhdGVQcm9kdWN0c0NvdW50IiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwiX3RoaXM0IiwiX3RoaXMkdmFsaWRhdGlvbkRpY3RpIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwiZ2V0UmVxdWVzdFRlbXBsYXRlVHlwZSIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJhZnRlckZhY2V0VXBkYXRlIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJOZXdPcHRzIiwidXBkYXRlUmVxdWVzdE9wdGlvbnMiLCJzdGFydEdsb2JhbCIsImN1c3RvbUdsb2JhbCIsImRpc2FibGVWaWV3RGV0YWlsQnV0dG9uIiwib2ZmIiwiYm9keSIsIlVVSURjYXRjIiwiY2F0ZWdvcnlJZCIsImV4aXN0UHJvZElkIiwiZm9yRWFjaCIsInByIiwicHVzaCIsImlkIiwiYXhpb3MiLCJnZXQiLCJwYXJhbXMiLCJ0aGVuIiwicmVzcG9uc2UiLCJkYXRhIiwicHJvZHVjdCIsImluY2x1ZGVzIiwiJGl0ZW0iLCJjb25zdHJ1Y3RUZW1wbGF0ZSIsImFwcGVuZCIsImhpZGUiLCJjb25maWd1cmVJc290b3BlRm9yQWxsIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiaW1nIiwiaSIsImFjdGlvblNlY3Rpb24iLCJ0b0ZpeGVkIiwic2FsZV9wcmljZSIsInJldGFpbF9wcmljZSIsImZpbmQiLCJmaWVsZCIsInVuZGVmaW5lZCIsInZhbHVlIiwiZ3JpZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpc28iLCJydW5Jc290b3BlIiwicnVuSW1hZ2VUZXN0IiwiaW1nTG9hZGVkIiwidGVzdEltZ0ludCIsInNldEludGVydmFsIiwiY2FyZEltZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwibm9uWmVybyIsIm9mZnNldEhlaWdodCIsImNsZWFySW50ZXJ2YWwiLCJJc290b3BlIiwiaXRlbVNlbGVjdG9yIiwibGF5b3V0TW9kZSIsImdldFNvcnREYXRhIiwibmFtZSIsIml0ZW1FbGVtIiwiZ2V0QXR0cmlidXRlIiwicHJpY2UiLCJOdW1iZXIiLCJyZXZpZXciLCJiZXN0X3NlbGxpbmciLCJuZXdlc3QiLCJjdXN0b21fc29ydF9vcmRlciIsImNoYW5nZSIsInZhbCIsInNwbGl0IiwiYXJyYW5nZSIsInNvcnRCeSIsInNvcnRBc2NlbmRpbmciLCJyYXRpbmdfY291bnQiLCJwcm9wIiwic2V0VGltZW91dCIsInN1YmNhdGVnb3JpZXMiLCJyZXNpemVMYXlvdXQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJDYXRhbG9nUGFnZSIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJhcmd1bWVudHMiLCJKU09OIiwicGFyc2UiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInBvcCIsInJlZHVjZSIsImFjYyIsImRlZmF1bHRWaWV3VHlwZSIsIm9wcG9zaXRlVmlld1R5cGUiLCJsb2FkaW5nT3ZlcmxheSIsImFkZFRvZ2dsZUV2ZW50cyIsImluaXQiLCJnZXRTdG9yZWRWaWV3VHlwZSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInR5cGUiLCJwYWdlVHlwZSIsInN0b3JlVmlld1R5cGUiLCJzZXRJdGVtIiwiZ2V0Q2F0ZWdvcnlQYWdlIiwic2hvdyIsImFwaSIsImdldFBhZ2UiLCJ1cmxVdGlscyIsImdldFVybCIsImVyciIsIkVycm9yIiwic3RvcmVkVmlld1R5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDZjtBQUNvQjtBQUNKO0FBQ21DO0FBQ3ZDO0FBQzhCO0FBQy9CO0FBQUEsSUFFMUJBLFFBQVEsMEJBQUFDLFlBQUE7RUFBQUMsY0FBQSxDQUFBRixRQUFBLEVBQUFDLFlBQUE7RUFDM0IsU0FBQUQsU0FBWUcsT0FBTyxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUNuQkEsS0FBQSxHQUFBSCxZQUFBLENBQUFJLElBQUEsT0FBTUYsT0FBTyxDQUFDO0lBQ2RDLEtBQUEsQ0FBS0Usb0JBQW9CLEdBQUdDLDBHQUEyQixDQUFDSixPQUFPLENBQUM7O0lBRWhFO0FBQ0o7QUFDQTtJQUNJQyxLQUFBLENBQUtJLFdBQVcsR0FBRyxJQUFJQSw0REFBVyxDQUFDTCxPQUFPLENBQUM7SUFDM0NDLEtBQUEsQ0FBS0sseUJBQXlCLEdBQUcsSUFBSUMsNEVBQXlCLENBQUNQLE9BQU8sQ0FBQztJQUFDLE9BQUFDLEtBQUE7RUFDMUU7RUFBQyxJQUFBTyxNQUFBLEdBQUFYLFFBQUEsQ0FBQVksU0FBQTtFQUFBRCxNQUFBLENBRURFLHVCQUF1QixHQUF2QixTQUFBQSx3QkFBd0JDLFFBQVEsRUFBRUMsUUFBUSxFQUFFQyxjQUFjLEVBQUU7SUFDMURGLFFBQVEsQ0FBQ0csSUFBSSxDQUFDO01BQ1pDLElBQUksRUFBRUgsUUFBUTtNQUNkLFdBQVcsRUFBRUM7SUFDZixDQUFDLENBQUM7RUFDSixDQUFDO0VBQUFMLE1BQUEsQ0FFRFEsK0JBQStCLEdBQS9CLFNBQUFBLGdDQUFBLEVBQWtDO0lBQUEsSUFBQUMsTUFBQTtJQUNoQyxJQUFJLENBQUNDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDQyxNQUFNLEVBQUU7SUFFdkMsSUFBSUQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUNFLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtNQUM5Q0YsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUNHLEtBQUssRUFBRTtJQUN6QztJQUVBSCxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQ0ksRUFBRSxDQUFDLE9BQU8sRUFBRTtNQUFBLE9BQ2hDTCxNQUFJLENBQUNQLHVCQUF1QixDQUMxQlEsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLEVBQzlCLFFBQVEsRUFDUixXQUFXLENBQ1o7SUFBQSxFQUNGO0VBQ0gsQ0FBQztFQUFBVixNQUFBLENBRURlLE9BQU8sR0FBUCxTQUFBQSxRQUFBLEVBQVU7SUFBQSxJQUFBQyxNQUFBO0lBQ1IsSUFBSSxDQUFDQyxvQkFBb0IsRUFBRTtJQUUzQlAsQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQ0ksQ0FBQztNQUFBLE9BQy9DRixNQUFJLENBQUNkLHVCQUF1QixDQUMxQlEsQ0FBQyxDQUFDUSxDQUFDLENBQUNDLGFBQWEsQ0FBQyxDQUFDQyxJQUFJLEVBQUUsRUFDekIsUUFBUSxFQUNSLFFBQVEsQ0FDVDtJQUFBLEVBQ0Y7SUFFRCxJQUFJLENBQUNaLCtCQUErQixFQUFFO0lBRXRDYSx3RUFBZSxDQUFDLElBQUksQ0FBQzdCLE9BQU8sQ0FBQztJQUU3QixJQUFJa0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUNDLE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFDbEMsSUFBSSxDQUFDVyxpQkFBaUIsRUFBRTtJQUMxQixDQUFDLE1BQU07TUFDTCxJQUFJLENBQUNDLGNBQWMsR0FBRyxJQUFJLENBQUNBLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztNQUNwREMsZ0VBQUssQ0FBQ1gsRUFBRSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQ1MsY0FBYyxDQUFDO0lBQ25EO0lBRUFiLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQ0ksRUFBRSxDQUFDLE9BQU8sRUFBRTtNQUFBLE9BQzNCRSxNQUFJLENBQUNVLHdCQUF3QixDQUFDaEIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztJQUFBLEVBQzNFO0lBRUQsSUFBSSxDQUFDaUIsb0JBQW9CLEVBQUU7SUFDM0IsSUFBSSxDQUFDQyxxQkFBcUIsRUFBRTtFQUM5QixDQUFDO0VBQUE1QixNQUFBLENBRUQyQixvQkFBb0IsR0FBcEIsU0FBQUEscUJBQUEsRUFBdUI7SUFDckIsSUFBTUUsa0JBQWtCLEdBQUduQixDQUFDLENBQUMsaUNBQWlDLENBQUM7SUFDL0QsSUFBSW1CLGtCQUFrQixDQUFDbEIsTUFBTSxFQUFFO01BQzdCa0Isa0JBQWtCLENBQUNoQixLQUFLLEVBQUU7SUFDNUI7RUFDRixDQUFDO0VBQUFiLE1BQUEsQ0FFRHNCLGlCQUFpQixHQUFqQixTQUFBQSxrQkFBQSxFQUFvQjtJQUFBLElBQUFRLE1BQUE7SUFDbEIsSUFBQUMscUJBQUEsR0FNSSxJQUFJLENBQUNwQyxvQkFBb0I7TUFMTHFDLGVBQWUsR0FBQUQscUJBQUEsQ0FBckNFLG9CQUFvQjtNQUNFQyxlQUFlLEdBQUFILHFCQUFBLENBQXJDSSxvQkFBb0I7TUFDR0Msa0JBQWtCLEdBQUFMLHFCQUFBLENBQXpDTSxxQkFBcUI7TUFDRUMsa0JBQWtCLEdBQUFQLHFCQUFBLENBQXpDUSxxQkFBcUI7TUFDQUMsY0FBYyxHQUFBVCxxQkFBQSxDQUFuQ1UsbUJBQW1CO0lBRXJCLElBQU1DLHdCQUF3QixHQUFHaEMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDO0lBQ2hFLElBQU1pQyx1QkFBdUIsR0FBR2pDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztJQUM5RCxJQUFNa0MsZUFBZSxHQUFHLElBQUksQ0FBQ3BELE9BQU8sQ0FBQ3FELHVCQUF1QjtJQUM1RCxJQUFNQyxjQUFjLEdBQUc7TUFDckJDLE1BQU0sRUFBRTtRQUNOQyxRQUFRLEVBQUU7VUFDUkMsYUFBYSxFQUFFLElBQUk7VUFDbkJDLFFBQVEsRUFBRTtZQUNSQyxLQUFLLEVBQUVQO1VBQ1Q7UUFDRjtNQUNGLENBQUM7TUFDRFEsUUFBUSxFQUFFO1FBQ1JDLGNBQWMsRUFDWixJQUFJLENBQUN2RCx5QkFBeUIsQ0FBQ3dELHNCQUFzQixDQUFDLFVBQVUsQ0FBQztRQUNuRUMsT0FBTyxFQUFFO01BQ1gsQ0FBQztNQUNEQyxRQUFRLEVBQUU7SUFDWixDQUFDO0lBRUQsSUFBSSxDQUFDQyxhQUFhLEdBQUcsSUFBSUMsOERBQWEsQ0FDcENaLGNBQWMsRUFDZCxVQUFDYSxPQUFPLEVBQUs7TUFDWGpCLHdCQUF3QixDQUFDa0IsSUFBSSxDQUFDRCxPQUFPLENBQUNOLGNBQWMsQ0FBQztNQUNyRFYsdUJBQXVCLENBQUNpQixJQUFJLENBQUNELE9BQU8sQ0FBQ0osT0FBTyxDQUFDO01BRTdDN0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDbUQsY0FBYyxDQUFDLGNBQWMsQ0FBQztNQUV4Q25ELENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQ29ELE9BQU8sQ0FDckI7UUFDRUMsU0FBUyxFQUFFO01BQ2IsQ0FBQyxFQUNELEdBQUcsQ0FDSjs7TUFFRDtBQUNSO0FBQ0E7TUFDUWpDLE1BQUksQ0FBQ2pDLFdBQVcsQ0FBQ21FLGdCQUFnQixFQUFFO0lBQ3JDLENBQUMsRUFDRDtNQUNFQyx1QkFBdUIsRUFBRTtRQUN2QmpDLGVBQWUsRUFBZkEsZUFBZTtRQUNmRSxlQUFlLEVBQWZBLGVBQWU7UUFDZkUsa0JBQWtCLEVBQWxCQSxrQkFBa0I7UUFDbEJFLGtCQUFrQixFQUFsQkEsa0JBQWtCO1FBQ2xCRSxjQUFjLEVBQWRBO01BQ0Y7SUFDRixDQUFDLENBQ0Y7SUFFRDlCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ0ksRUFBRSxDQUFDLHdCQUF3QixFQUFFLFlBQU07TUFDM0MsSUFBTW9ELE9BQU8sR0FBRztRQUNkbkIsTUFBTSxFQUFFO1VBQ05DLFFBQVEsRUFBRTtZQUNSQyxhQUFhLEVBQUUsSUFBSTtZQUNuQkMsUUFBUSxFQUFFO2NBQ1JDLEtBQUssRUFBRVA7WUFDVDtVQUNGO1FBQ0YsQ0FBQztRQUNEUSxRQUFRLEVBQUU7VUFDUkMsY0FBYyxFQUNadkIsTUFBSSxDQUFDaEMseUJBQXlCLENBQUN3RCxzQkFBc0IsQ0FBQyxVQUFVLENBQUM7VUFDbkVDLE9BQU8sRUFBRTtRQUNYLENBQUM7UUFDREMsUUFBUSxFQUFFO01BQ1osQ0FBQztNQUVEMUIsTUFBSSxDQUFDMkIsYUFBYSxDQUFDVSxvQkFBb0IsQ0FBQ0QsT0FBTyxDQUFDO0lBQ2xELENBQUMsQ0FBQztFQUNKLENBQUM7RUFBQWxFLE1BQUEsQ0FFRG9FLFdBQVcsR0FBWCxTQUFBQSxZQUFBLEVBQWM7SUFDWkMsa0VBQVksQ0FBQyxJQUFJLENBQUM3RSxPQUFPLENBQUM7RUFDNUIsQ0FBQztFQUFBUSxNQUFBLENBRURzRSx1QkFBdUIsR0FBdkIsU0FBQUEsd0JBQUEsRUFBMEI7SUFDeEI1RCxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQzZELEdBQUcsQ0FBQyxPQUFPLENBQUM7RUFDeEMsQ0FBQztFQUFBdkUsTUFBQSxDQUVENEIscUJBQXFCLEdBQXJCLFNBQUFBLHNCQUFBLEVBQXdCO0lBQ3RCLElBQU1zQixRQUFRLEdBQUcsSUFBSSxDQUFDMUQsT0FBTyxDQUFDMEQsUUFBUTtJQUN0QyxJQUFNc0IsSUFBSSxHQUFHLElBQUk7SUFDakIsSUFBTUMsUUFBUSxHQUFHLElBQUksQ0FBQ2pGLE9BQU8sQ0FBQ2lGLFFBQVE7SUFDdEMsSUFBTUMsVUFBVSxHQUFHLElBQUksQ0FBQ2xGLE9BQU8sQ0FBQ2tGLFVBQVU7SUFDMUM7SUFDQSxJQUFNQyxXQUFXLEdBQUcsRUFBRTtJQUN0QnpCLFFBQVEsQ0FBQzBCLE9BQU8sQ0FBQyxVQUFDQyxFQUFFLEVBQUs7TUFDdkJGLFdBQVcsQ0FBQ0csSUFBSSxDQUFDRCxFQUFFLENBQUNFLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUM7SUFDRjtJQUNBQyxLQUFLLENBQ0ZDLEdBQUcsQ0FBQyxrREFBa0QsRUFBRTtNQUN2REMsTUFBTSxFQUFFO1FBQUVILEVBQUUsRUFBRUw7TUFBVztJQUMzQixDQUFDLENBQUMsQ0FDRFMsSUFBSSxDQUFDLFVBQVVDLFFBQVEsRUFBRTtNQUN4QixJQUFNQyxJQUFJLEdBQUdELFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxPQUFPO01BQ2xDRCxJQUFJLENBQUNULE9BQU8sQ0FBQyxVQUFDQyxFQUFFLEVBQUs7UUFDbkIsSUFBSUYsV0FBVyxDQUFDWSxRQUFRLENBQUNWLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1VBQ2xDLElBQU1XLEtBQUssR0FBRzlFLENBQUMsZ0NBQTZCbUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFLO1VBQ3pEVyxLQUFLLENBQUNsRixJQUFJLENBQUMsbUJBQW1CLE9BQUt1RSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUc7VUFDdERXLEtBQUssQ0FBQ2xGLElBQUksQ0FBQyxtQkFBbUIsT0FBS3VFLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBRztRQUMxRCxDQUFDLE1BQU07VUFDTCxJQUFNekIsUUFBUSxHQUFHcUMsaUJBQWlCLENBQUNaLEVBQUUsQ0FBQztVQUN0Q25FLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDZ0YsTUFBTSxDQUFDdEMsUUFBUSxDQUFDO1FBQzVDO01BQ0YsQ0FBQyxDQUFDO01BQ0YxQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUNpRixJQUFJLEVBQUU7TUFDekJuQixJQUFJLENBQUNvQixzQkFBc0IsRUFBRTtNQUM3QnBCLElBQUksQ0FBQ0osV0FBVyxFQUFFO01BQ2xCSSxJQUFJLENBQUNGLHVCQUF1QixFQUFFO0lBQ2hDLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQ3VCLEtBQUssRUFBSztNQUNoQkMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLEtBQUssQ0FBQztJQUNwQixDQUFDLENBQUM7SUFFSixTQUFTSixpQkFBaUJBLENBQUNaLEVBQUUsRUFBRTtNQUM3QixJQUFJbUIsR0FBRyxHQUFHLENBQUMsQ0FBQztNQUNaLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHcEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDbEUsTUFBTSxFQUFFc0YsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsSUFBSXBCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQ29CLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1VBQ25DRCxHQUFHLEdBQUduQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUNvQixDQUFDLENBQUM7VUFDckI7UUFDRjtNQUNGO01BRUEsSUFBSUMsYUFBYSxHQUFHLEVBQUU7TUFDdEIsSUFBSXJCLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQ2xFLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDN0J1RixhQUFhLCtHQUF3R3JCLEVBQUUsQ0FBQyxJQUFJLENBQUMsNkJBQXlCO01BQ3hKLENBQUMsTUFBTTtRQUNMcUIsYUFBYSwrS0FHdUJyQixFQUFFLENBQUMsSUFBSSxDQUFDLFNBQUlKLFFBQVEsK1RBRzhFSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQUlKLFFBQVEsOEJBQXVCSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQUlKLFFBQVEsd3pDQXNCL0VJLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBSUosUUFBUSxnTkFBNExJLEVBQUUsQ0FBQyxJQUFJLENBQUMsMk9BR3JVO01BQ1g7TUFFQSxJQUFNekIsUUFBUSxzQ0FDU3lCLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQWlCQSxFQUFFLENBQUMsWUFBWSxDQUFDLDRFQUVuQ0EsRUFBRSxDQUFDLFlBQVksQ0FBQywyQ0FDcEJBLEVBQUUsQ0FBQyxjQUFjLENBQUMsOENBRXJDQSxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUNyQixDQUFDLEdBQ0RBLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHQSxFQUFFLENBQUMsZUFBZSxDQUFDLDhDQUU1QkEsRUFBRSxDQUFDLGVBQWUsQ0FBQyw2Q0FFekNBLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQ2xFLE1BQU0sR0FBRyxDQUFDLEdBQ3JCa0UsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUNzQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQ2hEdEIsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUNzQixPQUFPLENBQUMsQ0FBQyxDQUFDLCtDQUVmdEIsRUFBRSxDQUFDLGNBQWMsQ0FBQyw2Q0FDbkJBLEVBQUUsQ0FBQyxhQUFhLENBQUMsOENBQ2hCQSxFQUFFLENBQUMsWUFBWSxDQUFDLGtEQUNYQSxFQUFFLENBQUMsbUJBQW1CLENBQUMsbWFBWUpBLEVBQUUsQ0FBQyxJQUFJLENBQUMsNklBR3RDQSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUN1QixVQUFVLEtBQUssQ0FBQyxHQUM5QixRQUFRLEdBQ1IsT0FBTyxpR0FFRnZCLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsNEdBRXBCQSxFQUFFLENBQUMsTUFBTSxDQUFDLHdDQUV0QkEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDbEUsTUFBTSxHQUFHLENBQUMsR0FDckJrRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQ3NCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FDaER0QixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQ3NCLE9BQU8sQ0FBQyxDQUFDLENBQUMsOEhBR25CSCxHQUFHLENBQUMsZUFBZSxDQUFDLG9GQUU5Qm5CLEVBQUUsQ0FBQyxjQUFjLENBQUMsZ0hBR1ZtQixHQUFHLENBQUMsY0FBYyxDQUFDLGtEQUMzQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsbURBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLG1EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsb0RBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLG9EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtRUFDTkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxrREFDaENBLEdBQUcsQ0FBQyxjQUFjLENBQUMsbURBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLG1EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsbURBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLG9EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxvREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsK2lCQVVYbkIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxrSEFFZkEsRUFBRSxDQUFDLE1BQU0sQ0FBQyw4Q0FFdkJBLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQ2xFLE1BQU0sR0FBRyxDQUFDLEdBQ3JCa0UsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNmLGtCQUFrQixDQUNuQixDQUFDc0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUNadEIsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUNzQixPQUFPLENBQUMsQ0FBQyxDQUFDLG1EQUVqQ3RCLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsMkNBQzdCQSxFQUFFLENBQUMsTUFBTSxDQUFDLDRKQUdHQSxFQUFFLENBQUMsS0FBSyxDQUFDLGlnQkFPaEJBLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ3VCLFVBQVUsS0FBSyxDQUFDLEdBQzlCLEdBQUcsR0FBR3ZCLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ3dCLFlBQVksR0FDcEMsRUFBRSw0MUJBWVZ4QixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUNsRSxNQUFNLEdBQUcsQ0FBQyxHQUNyQmtFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDZixrQkFBa0IsQ0FDbkIsQ0FBQ3NCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FDWnRCLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDc0IsT0FBTyxDQUFDLENBQUMsQ0FBQyw4S0FLM0N0QixFQUFFLENBQUMsZUFBZSxDQUFDLENBQUN5QixJQUFJLENBQ3RCLFVBQUNDLEtBQUs7UUFBQSxPQUFLQSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssbUJBQW1CO01BQUEsRUFDakQsS0FBS0MsU0FBUyxHQUNYLFdBQVcsR0FDWCxPQUFPLDJDQUdYM0IsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDeUIsSUFBSSxDQUN0QixVQUFDQyxLQUFLO1FBQUEsT0FBS0EsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLG1CQUFtQjtNQUFBLEVBQ2pELEtBQUtDLFNBQVMsR0FDWDNCLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQ3lCLElBQUksQ0FDdEIsVUFBQ0MsS0FBSztRQUFBLE9BQ0pBLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxtQkFBbUI7TUFBQSxFQUN4QyxDQUFDRSxLQUFLLEdBQ1AsRUFBRSwyR0FHRlAsYUFBYSwrRkFFYnJCLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsb09BT3RDO01BQ1gsT0FBT3pCLFFBQVE7SUFDakI7RUFDRixDQUFDO0VBQUFwRCxNQUFBLENBRUQ0RixzQkFBc0IsR0FBdEIsU0FBQUEsdUJBQUEsRUFBeUI7SUFDdkI7SUFDQTtJQUNBLElBQUljLElBQUksR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMscUJBQXFCLENBQUM7SUFDekQsSUFBTXBDLElBQUksR0FBRyxJQUFJOztJQUVqQjtJQUNBLElBQUlxQyxHQUFHO0lBQ1BDLFVBQVUsRUFBRTtJQUNaO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBOztJQUVBO0lBQ0EsU0FBU0MsWUFBWUEsQ0FBQSxFQUFHO01BQ3RCO01BQ0E7O01BRUEsSUFBSUMsU0FBUyxHQUFHLElBQUk7TUFFcEIsSUFBSUMsVUFBVSxHQUFHQyxXQUFXLENBQUMsWUFBTTtRQUNqQyxJQUFJQyxRQUFRLEdBQUdSLFFBQVEsQ0FBQ1MsZ0JBQWdCLENBQ3RDLCtCQUErQixDQUNoQztRQUNELElBQUlELFFBQVEsQ0FBQ3hHLE1BQU0sR0FBRyxDQUFDLEVBQUU7VUFDdkIsS0FBSyxJQUFJc0YsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHa0IsUUFBUSxDQUFDeEcsTUFBTSxFQUFFc0YsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSW9CLE9BQU8sR0FBRyxJQUFJO1lBQ2xCLElBQUlGLFFBQVEsQ0FBQ2xCLENBQUMsQ0FBQyxDQUFDcUIsWUFBWSxHQUFHLEdBQUcsRUFBRTtjQUNsQ04sU0FBUyxHQUFHLEtBQUs7Y0FDakJLLE9BQU8sR0FBRyxLQUFLO2NBQ2Y7WUFDRjtZQUNBLElBQUlBLE9BQU8sRUFBRTtjQUNYTCxTQUFTLEdBQUcsSUFBSTtZQUNsQjtVQUNGO1FBQ0YsQ0FBQyxNQUFNO1VBQ0xBLFNBQVMsR0FBRyxLQUFLO1FBQ25CO1FBRUEsSUFBSUEsU0FBUyxFQUFFO1VBQ2JPLGFBQWEsQ0FBQ04sVUFBVSxDQUFDO1VBQ3pCSCxVQUFVLEVBQUU7VUFDWjtVQUNBO1VBQ0E7UUFDRjtNQUNGLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDUDtJQUVBLFNBQVNBLFVBQVVBLENBQUEsRUFBRztNQUNwQjtNQUNBOztNQUVBRCxHQUFHLEdBQUcsSUFBSVcsT0FBTyxDQUFDZCxJQUFJLEVBQUU7UUFDdEI7UUFDQWUsWUFBWSxFQUFFLFVBQVU7UUFDeEJDLFVBQVUsRUFBRSxTQUFTO1FBQ3JCQyxXQUFXLEVBQUU7VUFDWEMsSUFBSSxFQUFFLFNBQUFBLEtBQVVDLFFBQVEsRUFBRTtZQUN4QixPQUFPQSxRQUFRLENBQUNDLFlBQVksQ0FBQyxXQUFXLENBQUM7VUFDM0MsQ0FBQztVQUNEQyxLQUFLLEVBQUUsU0FBQUEsTUFBVUYsUUFBUSxFQUFFO1lBQ3pCLE9BQU9HLE1BQU0sQ0FBQ0gsUUFBUSxDQUFDQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQztVQUM1RCxDQUFDO1VBQ0RHLE1BQU0sRUFBRSxTQUFBQSxPQUFVSixRQUFRLEVBQUU7WUFDMUIsT0FBT0EsUUFBUSxDQUFDQyxZQUFZLENBQUMsYUFBYSxDQUFDO1VBQzdDLENBQUM7VUFDREksWUFBWSxFQUFFLFNBQUFBLGFBQVVMLFFBQVEsRUFBRTtZQUNoQyxPQUFPRyxNQUFNLENBQUNILFFBQVEsQ0FBQ0MsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7VUFDM0QsQ0FBQztVQUNESyxNQUFNLEVBQUUsU0FBQUEsT0FBVU4sUUFBUSxFQUFFO1lBQzFCLE9BQU9BLFFBQVEsQ0FBQ0MsWUFBWSxDQUFDLG1CQUFtQixDQUFDO1VBQ25ELENBQUM7VUFDRE0saUJBQWlCLEVBQUUsU0FBQUEsa0JBQVVQLFFBQVEsRUFBRTtZQUNyQyxPQUFPRyxNQUFNLENBQUNILFFBQVEsQ0FBQ0MsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7VUFDMUQ7UUFDRjtNQUNGLENBQUMsQ0FBQztNQUNGO01BQ0E7O01BRUFwSCxDQUFDLENBQUMsMkNBQTJDLENBQUMsQ0FBQzJILE1BQU0sQ0FBQyxZQUFZO1FBQ2hFLElBQU1DLEdBQUcsR0FBRzVILENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzRILEdBQUcsRUFBRSxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRXBDLElBQUlELEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7VUFDdkJ6QixHQUFHLENBQUMyQixPQUFPLENBQUM7WUFDVkMsTUFBTSxFQUFFLENBQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUM7WUFDaENJLGFBQWEsRUFBRTtjQUNiVCxNQUFNLEVBQUUsS0FBSztjQUNiVSxZQUFZLEVBQUU7WUFDaEI7VUFDRixDQUFDLENBQUM7UUFDSixDQUFDLE1BQU07VUFDTDlCLEdBQUcsQ0FBQzJCLE9BQU8sQ0FBQztZQUNWQyxNQUFNLEVBQUVILEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDZEksYUFBYSxFQUFFSixHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs7VUFDNUIsQ0FBQyxDQUFDO1FBQ0o7TUFDRixDQUFDLENBQUM7TUFFRjVILENBQUMsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDa0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7TUFFdEVDLFVBQVUsQ0FBQyxZQUFZO1FBQ3JCLElBQUlyRSxJQUFJLENBQUNoRixPQUFPLENBQUNzSixhQUFhLENBQUNuSSxNQUFNLEtBQUssQ0FBQyxFQUFFO1VBQzNDa0csR0FBRyxDQUFDMkIsT0FBTyxDQUFDO1lBQ1ZDLE1BQU0sRUFBRSxtQkFBbUI7WUFDM0JDLGFBQWEsRUFBRTtVQUNqQixDQUFDLENBQUM7UUFDSixDQUFDLE1BQU07VUFDTDdCLEdBQUcsQ0FBQzJCLE9BQU8sQ0FBQztZQUNWQyxNQUFNLEVBQUUsY0FBYztZQUN0QkMsYUFBYSxFQUFFO1VBQ2pCLENBQUMsQ0FBQztRQUNKO01BQ0YsQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUVMLElBQUlLLFlBQVksR0FBRyxLQUFLO01BRXhCQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsVUFBQ0MsS0FBSyxFQUFLO1FBQ3BDRixZQUFZLEdBQUcsSUFBSTtNQUNyQixDQUFDLENBQUM7TUFDRmxDLEdBQUcsQ0FBQy9GLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZO1FBQ25DLElBQUlpSSxZQUFZLEVBQUU7VUFDaEJBLFlBQVksR0FBRyxLQUFLO1VBQ3BCbEMsR0FBRyxDQUFDMkIsT0FBTyxFQUFFO1VBQ2I7UUFDRjtRQUNBO01BQ0YsQ0FBQyxDQUFDO0lBQ0o7RUFDRixDQUFDO0VBQUEsT0FBQW5KLFFBQUE7QUFBQSxFQXJoQm1DNkosZ0RBQVc7Ozs7Ozs7Ozs7Ozs7O0FDVGpEO0FBQUE7QUFBQSxJQUFNQyxZQUFZLEdBQUcsY0FBYztBQUNuQyxJQUFNQywrQkFBK0IsR0FBRyxTQUFsQ0EsK0JBQStCQSxDQUFJQyxVQUFVO0VBQUEsT0FBSyxDQUFDLENBQUNDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDRixVQUFVLENBQUNGLFlBQVksQ0FBQyxDQUFDLENBQUN4SSxNQUFNO0FBQUE7QUFDdEcsSUFBTTZJLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUEsRUFBOEI7RUFDdEQsS0FBSyxJQUFJdkQsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHd0QsU0FBQSxDQUFtQjlJLE1BQU0sRUFBRXNGLENBQUMsRUFBRSxFQUFFO0lBQ2hELElBQU1vRCxVQUFVLEdBQUdLLElBQUksQ0FBQ0MsS0FBSyxDQUFvQjFELENBQUMsUUFBQXdELFNBQUEsQ0FBQTlJLE1BQUEsSUFBRHNGLENBQUMsR0FBQU8sU0FBQSxHQUFBaUQsU0FBQSxDQUFEeEQsQ0FBQyxFQUFFO0lBQ3BELElBQUltRCwrQkFBK0IsQ0FBQ0MsVUFBVSxDQUFDLEVBQUU7TUFDN0MsT0FBT0EsVUFBVTtJQUNyQjtFQUNKO0FBQ0osQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxJQUFNekosMkJBQTJCLEdBQUcsU0FBOUJBLDJCQUEyQkEsQ0FBSUosT0FBTyxFQUFLO0VBQ3BELElBQVFvSyx3QkFBd0IsR0FBd0VwSyxPQUFPLENBQXZHb0ssd0JBQXdCO0lBQUVDLGdDQUFnQyxHQUFzQ3JLLE9BQU8sQ0FBN0VxSyxnQ0FBZ0M7SUFBRUMsK0JBQStCLEdBQUt0SyxPQUFPLENBQTNDc0ssK0JBQStCO0VBQ25HLElBQU1DLGdCQUFnQixHQUFHUCxzQkFBc0IsQ0FBQ0ksd0JBQXdCLEVBQUVDLGdDQUFnQyxFQUFFQywrQkFBK0IsQ0FBQztFQUM1SSxJQUFNRSxhQUFhLEdBQUdWLE1BQU0sQ0FBQ1csTUFBTSxDQUFDRixnQkFBZ0IsQ0FBQ1osWUFBWSxDQUFDLENBQUM7RUFDbkUsSUFBTWUsZUFBZSxHQUFHWixNQUFNLENBQUNDLElBQUksQ0FBQ1EsZ0JBQWdCLENBQUNaLFlBQVksQ0FBQyxDQUFDLENBQUNnQixHQUFHLENBQUMsVUFBQUMsR0FBRztJQUFBLE9BQUlBLEdBQUcsQ0FBQzdCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzhCLEdBQUcsRUFBRTtFQUFBLEVBQUM7RUFFcEcsT0FBT0gsZUFBZSxDQUFDSSxNQUFNLENBQUMsVUFBQ0MsR0FBRyxFQUFFSCxHQUFHLEVBQUVuRSxDQUFDLEVBQUs7SUFDM0NzRSxHQUFHLENBQUNILEdBQUcsQ0FBQyxHQUFHSixhQUFhLENBQUMvRCxDQUFDLENBQUM7SUFDM0IsT0FBT3NFLEdBQUc7RUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDVixDQUFDLEM7Ozs7Ozs7Ozs7Ozs7O0lDM0JvQjFLLFdBQVc7RUFDNUIsU0FBQUEsWUFBWUwsT0FBTyxFQUFFO0lBQ2pCLElBQUksQ0FBQ0EsT0FBTyxHQUFHQSxPQUFPO0VBQzFCO0VBQUMsSUFBQVEsTUFBQSxHQUFBSCxXQUFBLENBQUFJLFNBQUE7RUFBQUQsTUFBQSxDQUVEZ0UsZ0JBQWdCLEdBQWhCLFNBQUFBLGlCQUFBLEVBQW1CLENBRW5CLENBQUM7RUFBQSxPQUFBbkUsV0FBQTtBQUFBOzs7Ozs7Ozs7Ozs7O0FDUEw7QUFBQTtBQUFBO0FBQUE7QUFBaUQ7QUFDQTtBQUFBLElBRTVCRSx5QkFBeUI7RUFDMUMsU0FBQUEsMEJBQVlQLE9BQU8sRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDakIsSUFBSSxDQUFDRCxPQUFPLEdBQUdBLE9BQU87SUFDdEIsSUFBSSxDQUFDZ0wsZUFBZSxHQUFHLElBQUksQ0FBQ2hMLE9BQU8sQ0FBQ2dMLGVBQWU7SUFDbkQsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUNELGVBQWUsS0FBSyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU07SUFDekUsSUFBSSxDQUFDNUgsZUFBZSxHQUFHLElBQUksQ0FBQ3BELE9BQU8sQ0FBQ3FELHVCQUF1QjtJQUMzRCxJQUFJLENBQUM2SCxjQUFjLEdBQUdoSyxDQUFDLENBQUMsaURBQWlELENBQUM7SUFFMUVBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ0ksRUFBRSxDQUFDLHNCQUFzQixFQUFFLFlBQU07TUFDdkNyQixLQUFJLENBQUNrTCxlQUFlLEVBQUU7SUFDMUIsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDQyxJQUFJLEVBQUU7RUFDZjtFQUFDLElBQUE1SyxNQUFBLEdBQUFELHlCQUFBLENBQUFFLFNBQUE7RUFBQUQsTUFBQSxDQUVENkssaUJBQWlCLEdBQWpCLFNBQUFBLGtCQUFBLEVBQW9CO0lBQ2hCLE9BQU9DLGNBQWMsQ0FBQ0MsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksSUFBSTtFQUMvRCxDQUFDO0VBQUEvSyxNQUFBLENBRURzRCxzQkFBc0IsR0FBdEIsU0FBQUEsdUJBQXVCMEgsSUFBSSxFQUFFO0lBQ3pCLElBQU1DLFFBQVEsR0FBRyxJQUFJLENBQUNKLGlCQUFpQixFQUFFO0lBQ3pDLE9BQU8sQ0FBQ0ksUUFBUSxHQUFNRCxJQUFJLDZDQUF3Q0MsUUFBUSxVQUFPO0VBQ3JGLENBQUM7RUFBQWpMLE1BQUEsQ0FFRGtMLGFBQWEsR0FBYixTQUFBQSxjQUFjRixJQUFJLEVBQUU7SUFDaEJGLGNBQWMsQ0FBQ0ssT0FBTyxDQUFDLG9CQUFvQixFQUFFSCxJQUFJLENBQUM7RUFDdEQsQ0FBQztFQUFBaEwsTUFBQSxDQUVEb0wsZUFBZSxHQUFmLFNBQUFBLGdCQUFnQkgsUUFBUSxFQUFFO0lBQUEsSUFBQXhLLE1BQUE7SUFDdEIsSUFBTXNDLE1BQU0sR0FBRztNQUNYQSxNQUFNLEVBQUU7UUFDSkMsUUFBUSxFQUFFO1VBQ05DLGFBQWEsRUFBRSxJQUFJO1VBQ25CQyxRQUFRLEVBQUU7WUFDTkMsS0FBSyxFQUFFLElBQUksQ0FBQ1A7VUFDaEI7UUFDSjtNQUNKLENBQUM7TUFDRFEsUUFBUSx1QkFBcUI2SCxRQUFRO0lBQ3pDLENBQUM7SUFFRCxJQUFJLENBQUNQLGNBQWMsQ0FBQ1csSUFBSSxFQUFFO0lBRTFCQyw4REFBRyxDQUFDQyxPQUFPLENBQUNDLCtEQUFRLENBQUNDLE1BQU0sRUFBRSxFQUFFMUksTUFBTSxFQUFFLFVBQUMySSxHQUFHLEVBQUUvSCxPQUFPLEVBQUs7TUFDckQsSUFBSStILEdBQUcsRUFBRTtRQUNMLE1BQU0sSUFBSUMsS0FBSyxDQUFDRCxHQUFHLENBQUM7TUFDeEI7TUFFQWhMLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDa0QsSUFBSSxDQUFDRCxPQUFPLENBQUM7TUFFN0NsRCxNQUFJLENBQUNpSyxjQUFjLENBQUMvRSxJQUFJLEVBQUU7TUFFMUJsRixNQUFJLENBQUN5SyxhQUFhLENBQUNELFFBQVEsQ0FBQztNQUU1QnhLLE1BQUksQ0FBQ2tLLGVBQWUsRUFBRTtNQUV0QmpLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ21ELGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQztJQUN0RCxDQUFDLENBQUM7RUFDTixDQUFDO0VBQUE3RCxNQUFBLENBRUQySyxlQUFlLEdBQWYsU0FBQUEsZ0JBQUEsRUFBa0I7SUFBQSxJQUFBM0osTUFBQTtJQUNkTixDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQ0ksRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDSSxDQUFDLEVBQUs7TUFDOUMsSUFBTThKLElBQUksR0FBR3RLLENBQUMsQ0FBQ1EsQ0FBQyxDQUFDQyxhQUFhLENBQUMsQ0FBQ2tFLElBQUksQ0FBQyxXQUFXLENBQUM7TUFFakQsSUFBSTNFLENBQUMsQ0FBQ1EsQ0FBQyxDQUFDQyxhQUFhLENBQUMsQ0FBQ1AsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7TUFFekRJLE1BQUksQ0FBQ29LLGVBQWUsQ0FBQ0osSUFBSSxFQUFFaEssTUFBSSxDQUFDMkosZUFBZSxDQUFDO0lBQ3BELENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQTNLLE1BQUEsQ0FFRDRLLElBQUksR0FBSixTQUFBQSxLQUFBLEVBQU87SUFDSCxJQUFNZ0IsY0FBYyxHQUFHLElBQUksQ0FBQ2YsaUJBQWlCLEVBQUU7SUFFL0MsSUFBSWUsY0FBYyxLQUFLLElBQUksQ0FBQ3BCLGVBQWUsSUFBSSxDQUFDb0IsY0FBYyxFQUFFO01BQzVELE9BQU8sSUFBSSxDQUFDakIsZUFBZSxFQUFFO0lBQ2pDO0lBRUEsSUFBSSxDQUFDUyxlQUFlLENBQUMsSUFBSSxDQUFDWCxnQkFBZ0IsQ0FBQztFQUMvQyxDQUFDO0VBQUEsT0FBQTFLLHlCQUFBO0FBQUEiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tIFwiQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHNcIjtcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tIFwiLi9jYXRhbG9nXCI7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gXCIuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzXCI7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tIFwiLi9jb21tb24vZmFjZXRlZC1zZWFyY2hcIjtcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gXCIuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzXCI7XG5pbXBvcnQgSVRTQ2F0ZWdvcnkgZnJvbSBcIi4vY3VzdG9tL2l0cy1jYXRlZ29yeVwiO1xuaW1wb3J0IFRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXcgZnJvbSBcIi4vY3VzdG9tL3RvZ2dsZS1jYXRlZ29yeS1saXN0aW5nLXZpZXdcIjtcbmltcG9ydCBjdXN0b21HbG9iYWwgZnJvbSBcIi4vY3VzdG9tL2l0cy1nbG9iYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICBzdXBlcihjb250ZXh0KTtcbiAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuXG4gICAgLyoqXG4gICAgICogSW50dWl0U29sdXRpb25zIC0gQ3VzdG9tIENhdGVnb3J5XG4gICAgICovXG4gICAgdGhpcy5JVFNDYXRlZ29yeSA9IG5ldyBJVFNDYXRlZ29yeShjb250ZXh0KTtcbiAgICB0aGlzLnRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXcgPSBuZXcgVG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyhjb250ZXh0KTtcbiAgfVxuXG4gIHNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCRlbGVtZW50LCByb2xlVHlwZSwgYXJpYUxpdmVTdGF0dXMpIHtcbiAgICAkZWxlbWVudC5hdHRyKHtcbiAgICAgIHJvbGU6IHJvbGVUeXBlLFxuICAgICAgXCJhcmlhLWxpdmVcIjogYXJpYUxpdmVTdGF0dXMsXG4gICAgfSk7XG4gIH1cblxuICBtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xuICAgIGlmICghJChcIltkYXRhLXNob3AtYnktcHJpY2VdXCIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgaWYgKCQoXCIubmF2TGlzdC1hY3Rpb25cIikuaGFzQ2xhc3MoXCJpcy1hY3RpdmVcIikpIHtcbiAgICAgICQoXCJhLm5hdkxpc3QtYWN0aW9uLmlzLWFjdGl2ZVwiKS5mb2N1cygpO1xuICAgIH1cblxuICAgICQoXCJhLm5hdkxpc3QtYWN0aW9uXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgIHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoXG4gICAgICAgICQoXCJzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlXCIpLFxuICAgICAgICBcInN0YXR1c1wiLFxuICAgICAgICBcImFzc2VydGl2ZVwiXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIG9uUmVhZHkoKSB7XG4gICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuXG4gICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKFwiY2xpY2tcIiwgKGUpID0+XG4gICAgICB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxuICAgICAgICAkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLFxuICAgICAgICBcInN0YXR1c1wiLFxuICAgICAgICBcInBvbGl0ZVwiXG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpO1xuXG4gICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dCk7XG5cbiAgICBpZiAoJChcIiNmYWNldGVkU2VhcmNoXCIpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgIGhvb2tzLm9uKFwic29ydEJ5LXN1Ym1pdHRlZFwiLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICB9XG5cbiAgICAkKFwiYS5yZXNldC1idG5cIikub24oXCJjbGlja1wiLCAoKSA9PlxuICAgICAgdGhpcy5zZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMoJChcInNwYW4ucmVzZXQtbWVzc2FnZVwiKSwgXCJzdGF0dXNcIiwgXCJwb2xpdGVcIilcbiAgICApO1xuXG4gICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xuICAgIHRoaXMudmFsaWRhdGVQcm9kdWN0c0NvdW50KCk7XG4gIH1cblxuICBhcmlhTm90aWZ5Tm9Qcm9kdWN0cygpIHtcbiAgICBjb25zdCAkbm9Qcm9kdWN0c01lc3NhZ2UgPSAkKFwiW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXVwiKTtcbiAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJChcIiNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyXCIpO1xuICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJChcIiNmYWNldGVkLXNlYXJjaC1jb250YWluZXJcIik7XG4gICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHByb2R1Y3RMaXN0aW5nOlxuICAgICAgICAgIHRoaXMudG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldy5nZXRSZXF1ZXN0VGVtcGxhdGVUeXBlKFwiY2F0ZWdvcnlcIiksXG4gICAgICAgIHNpZGViYXI6IFwiY2F0ZWdvcnkvc2lkZWJhclwiLFxuICAgICAgfSxcbiAgICAgIHNob3dNb3JlOiBcImNhdGVnb3J5L3Nob3ctbW9yZVwiLFxuICAgIH07XG5cbiAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChcbiAgICAgIHJlcXVlc3RPcHRpb25zLFxuICAgICAgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcblxuICAgICAgICAkKFwiYm9keVwiKS50cmlnZ2VySGFuZGxlcihcImNvbXBhcmVSZXNldFwiKTtcblxuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEwMFxuICAgICAgICApO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnR1aXRTb2x1dGlvbnMgLSBDYXRlZ29yeSBVcGRhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuSVRTQ2F0ZWdvcnkuYWZ0ZXJGYWNldFVwZGF0ZSgpO1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgICQoXCJib2R5XCIpLm9uKFwicHJvZHVjdFZpZXdNb2RlQ2hhbmdlZFwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBOZXdPcHRzID0ge1xuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgcHJvZHVjdExpc3Rpbmc6XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXcuZ2V0UmVxdWVzdFRlbXBsYXRlVHlwZShcImNhdGVnb3J5XCIpLFxuICAgICAgICAgIHNpZGViYXI6IFwiY2F0ZWdvcnkvc2lkZWJhclwiLFxuICAgICAgICB9LFxuICAgICAgICBzaG93TW9yZTogXCJjYXRlZ29yeS9zaG93LW1vcmVcIixcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaC51cGRhdGVSZXF1ZXN0T3B0aW9ucyhOZXdPcHRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0R2xvYmFsKCkge1xuICAgIGN1c3RvbUdsb2JhbCh0aGlzLmNvbnRleHQpO1xuICB9XG5cbiAgZGlzYWJsZVZpZXdEZXRhaWxCdXR0b24oKSB7XG4gICAgJChcIlt2aWV3LWRldGFpbC1idXR0b25dXCIpLm9mZihcImNsaWNrXCIpO1xuICB9XG5cbiAgdmFsaWRhdGVQcm9kdWN0c0NvdW50KCkge1xuICAgIGNvbnN0IHByb2R1Y3RzID0gdGhpcy5jb250ZXh0LnByb2R1Y3RzO1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzO1xuICAgIGNvbnN0IFVVSURjYXRjID0gdGhpcy5jb250ZXh0LlVVSURjYXRjO1xuICAgIGNvbnN0IGNhdGVnb3J5SWQgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlJZDtcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0cyk7XG4gICAgY29uc3QgZXhpc3RQcm9kSWQgPSBbXTtcbiAgICBwcm9kdWN0cy5mb3JFYWNoKChwcikgPT4ge1xuICAgICAgZXhpc3RQcm9kSWQucHVzaChwci5pZCk7XG4gICAgfSk7XG4gICAgLy8gY29uc29sZS5sb2coZXhpc3RQcm9kSWQpO1xuICAgIGF4aW9zXG4gICAgICAuZ2V0KFwiaHR0cHM6Ly9zdWZyaS5hdXRvY29kZS5kZXYvbDV0QGRldi9nZXRBVFByb2R1Y3QvXCIsIHtcbiAgICAgICAgcGFyYW1zOiB7IGlkOiBjYXRlZ29yeUlkIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhLnByb2R1Y3Q7XG4gICAgICAgIGRhdGEuZm9yRWFjaCgocHIpID0+IHtcbiAgICAgICAgICBpZiAoZXhpc3RQcm9kSWQuaW5jbHVkZXMocHJbXCJpZFwiXSkpIHtcbiAgICAgICAgICAgIGNvbnN0ICRpdGVtID0gJChgLnByb2R1Y3RbZGF0YS1lbnRpdHktaWQ9XCIke3ByW1wiaWRcIl19XCJdYCk7XG4gICAgICAgICAgICAkaXRlbS5hdHRyKFwiZGF0YS1iZXN0LXNlbGxpbmdcIiwgYCR7cHJbXCJ0b3RhbF9zb2xkXCJdfWApO1xuICAgICAgICAgICAgJGl0ZW0uYXR0cihcImRhdGEtZGF0ZS1jcmVhdGVkXCIsIGAke3ByW1wiZGF0ZV9jcmVhdGVkXCJdfWApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGNvbnN0cnVjdFRlbXBsYXRlKHByKTtcbiAgICAgICAgICAgICQoXCIjcHJvZHVjdC1saXN0aW5nLWFsbFwiKS5hcHBlbmQodGVtcGxhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoXCIjbG9hZGVyLWJsb2NrXCIpLmhpZGUoKTtcbiAgICAgICAgYm9keS5jb25maWd1cmVJc290b3BlRm9yQWxsKCk7XG4gICAgICAgIGJvZHkuc3RhcnRHbG9iYWwoKTtcbiAgICAgICAgYm9keS5kaXNhYmxlVmlld0RldGFpbEJ1dHRvbigpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RUZW1wbGF0ZShwcikge1xuICAgICAgbGV0IGltZyA9IHt9O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcltcImltYWdlc1wiXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocHJbXCJpbWFnZXNcIl1baV1bXCJpc190aHVtYm5haWxcIl0pIHtcbiAgICAgICAgICBpbWcgPSBwcltcImltYWdlc1wiXVtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgYWN0aW9uU2VjdGlvbiA9IFwiXCI7XG4gICAgICBpZiAocHJbXCJ2YXJpYW50c1wiXS5sZW5ndGggPiAxKSB7XG4gICAgICAgIGFjdGlvblNlY3Rpb24gPSBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1wcmltYXJ5IHF1aWNrdmlldyBidXR0b24tLXF1aWNrdmlld1wiIGRhdGEtcHJvZHVjdC1pZD1cIiR7cHJbXCJpZFwiXX1cIj5WaWV3IE9wdGlvbnM8L2J1dHRvbj5gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aW9uU2VjdGlvbiA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0YyBqcy1jYXJkLWF0Y1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1hdGNfX3NlY3Rpb24gY2FyZC1hdGNfX3NlY3Rpb24tLXF0eVwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYXJkLWF0Y19fcXR5LSR7cHJbXCJpZFwiXX0tJHtVVUlEY2F0Y31cIiBjbGFzcz1cImNhcmQtYXRjX19sYWJlbCBpcy1zck9ubHlcIj5RdWFudGl0eTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0Yy1pbmNyZW1lbnQgY2FyZC1hdGMtaW5jcmVtZW50LS1oYXMtYnV0dG9ucyBqcy1jYXJkLWF0Yy1pbmNyZW1lbnRcIj5cblxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZWxcIiBjbGFzcz1cImZvcm0taW5wdXQgY2FyZC1hdGNfX2lucHV0IGNhcmQtYXRjX19pbnB1dC0tdG90YWwganMtY2FyZC1hdGNfX2lucHV0LS10b3RhbFwiIG5hbWU9XCJjYXJkLWF0Y19fcXR5LSR7cHJbXCJpZFwiXX0tJHtVVUlEY2F0Y31cIiBpZD1cImNhcmQtYXRjX19xdHktJHtwcltcImlkXCJdfS0ke1VVSURjYXRjfVwiIHZhbHVlPVwiMVwiIG1pbj1cIjFcIiBwYXR0ZXJuPVwiWzAtOV0qXCIgYXJpYS1saXZlPVwicG9saXRlXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1hdGMtYnV0dG9uLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLWljb25cIiBkYXRhLWFjdGlvbj1cImluY1wiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlzLXNyT25seVwiPkluY3JlYXNlIFF1YW50aXR5IG9mIHVuZGVmaW5lZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24td3JhcHBlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiI2ljb24tYWRkXCI+PC91c2U+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0taWNvblwiIGRhdGEtYWN0aW9uPVwiZGVjXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXMtc3JPbmx5XCI+RGVjcmVhc2UgUXVhbnRpdHkgb2YgdW5kZWZpbmVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi13cmFwcGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1taW51c1wiPjwvdXNlPlBQXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1hdGNfX3NlY3Rpb24gY2FyZC1hdGNfX3NlY3Rpb24tLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2FyZC1hdGNfX2J1dHRvbiBidXR0b24gYnV0dG9uLS1wcmltYXJ5IGpzLWNhcmQtYXRjX19idXR0b25cIiBpZD1cImNhcmQtYXRjX19hZGQtJHtwcltcImlkXCJdfS0ke1VVSURjYXRjfVwiIGRhdGEtZGVmYXVsdC1tZXNzYWdlPVwiQWRkIHRvIENhcnRcIiBkYXRhLXdhaXQtbWVzc2FnZT1cIkFkZGluZyB0byBjYXJ04oCmXCIgZGF0YS1hZGRlZC1tZXNzYWdlPVwiQWRkIHRvIENhcnRcIiB2YWx1ZT1cIkFkZCB0byBDYXJ0XCIgZGF0YS1jYXJkLWFkZC10by1jYXJ0PVwiL2NhcnQucGhwP2FjdGlvbj1hZGQmYW1wO3Byb2R1Y3RfaWQ9JHtwcltcImlkXCJdfVwiIGRhdGEtZXZlbnQtdHlwZT1cInByb2R1Y3QtY2xpY2tcIj5BZGQgdG8gQ2FydDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZHVjdC1zdGF0dXMtbWVzc2FnZSBhcmlhLWRlc2NyaXB0aW9uLS1oaWRkZW5cIj5BZGRpbmcgdG8gY2FydOKApiBUaGUgaXRlbSBoYXMgYmVlbiBhZGRlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+YDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBgXG4gICAgICAgICAgPGRpdiBpZD1cInByb2R1Y3QtJHtwcltcImlkXCJdfVwiIHNvcnQtb3JkZXI9XCIke3ByW1wic29ydF9vcmRlclwiXX1cIiBcbiAgICAgICAgICBjbGFzcz1cInByb2R1Y3RcIlxuICAgICAgICAgIHByb2R1Y3QtZGF0YS1jYXRlZ29yeT1cIiR7cHJbXCJjYXRlZ29yaWVzXCJdfVwiIFxuICAgICAgICAgIHByb2R1Y3QtZGF0YS1uYW1lPVwiJHtwcltcImZha2UtaGVhZGluZ1wiXX1cIiBcbiAgICAgICAgICBwcm9kdWN0LWRhdGEtcmV2aWV3PVwiJHtcbiAgICAgICAgICAgIHByW1wicmV2aWV3c19jb3VudFwiXSA9PT0gMFxuICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgOiBwcltcInJldmlld3NfcmF0aW5nX3N1bVwiXSAvIHByW1wicmV2aWV3c19jb3VudFwiXVxuICAgICAgICAgIH1cIlxuICAgICAgICAgIHByb2R1Y3QtcmV2aWV3LWNvdW50PVwiJHtwcltcInJldmlld3NfY291bnRcIl19XCIgXG4gICAgICAgICAgcHJvZHVjdC1kYXRhLXByaWNlPVwiJHtcbiAgICAgICAgICAgIHByW1widmFyaWFudHNcIl0ubGVuZ3RoID4gMVxuICAgICAgICAgICAgICA/IHByW1widmFyaWFudHNcIl1bMF1bXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgOiBwcltcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxuICAgICAgICAgIH1cIiBcbiAgICAgICAgICBwcm9kdWN0LWRhdGUtY3JlYXRlZD1cIiR7cHJbXCJkYXRlX2NyZWF0ZWRcIl19XCIgXG4gICAgICAgICAgcHJvZHVjdC1pcy1mZWF0dXJlZD1cIiR7cHJbXCJpc19mZWF0dXJlZFwiXX1cIiBcbiAgICAgICAgICBwcm9kdWN0LWJlc3Qtc2VsbGluZz1cIiR7cHJbXCJ0b3RhbF9zb2xkXCJdfVwiXG4gICAgICAgICAgcHJvZHVjdC1jdXN0b20tc29ydC1vcmRlcj1cIiR7cHJbXCJjdXN0b20tc29ydC1vcmRlclwiXX1cIlxuICAgICAgICAgIFxuICAgICAgICAgIHByb2R1Y3QtZmlsdGVyLUlBVD1cIlwiXG4gICAgICAgICAgcHJvZHVjdC1maWx0ZXItRkJTPVwiXCJcbiAgICAgICAgICBwcm9kdWN0LWZpbHRlci1GQkM9XCJcIlxuICAgICAgICAgIHByb2R1Y3QtZmlsdGVyLUNBVD1cIlwiXG4gICAgICAgICAgcHJvZHVjdC1maWx0ZXItTkNGPVwiXCJcbiAgICAgICAgICBwcm9kdWN0LWZpbHRlci1OQ1A9XCJcIlxuICAgICAgICAgIHByb2R1Y3QtZmlsdGVyLU5TST1cIlwiXG4gICAgICAgICAgcHJvZHVjdC1maWx0ZXItSFQ9XCJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJjYXJkXCIgZGF0YS10ZXN0PVwiY2FyZC0ke3ByW1wiaWRcIl19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImNhcmQtZmlndXJlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzYWxlLWZsYWctc2FzaFwiIHN0eWxlPVwiZGlzcGxheTogJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcltcInZhcmlhbnRzXCJdWzBdLnNhbGVfcHJpY2UgIT09IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJibG9jaztcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIm5vbmU7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcIj48c3BhbiBjbGFzcz1cInNhbGUtdGV4dFwiPk9uIFNhbGU8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3ByW1wiY3VzdG9tX3VybFwiXVtcInVybFwiXX1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYXJkLWZpZ3VyZV9fbGlua1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiJHtwcltcIm5hbWVcIl19LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJCR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJ2YXJpYW50c1wiXS5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByW1widmFyaWFudHNcIl1bMF1bXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJbXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiBjYXJkLWltZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7aW1nW1widXJsX3RodW1ibmFpbFwiXX1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJpbWdbXCJkZXNjcmlwdGlvblwiXVwiIHRpdGxlPVwiJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByW1wiZmFrZS1oZWFkaW5nXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc2l6ZXM9XCJhdXRvXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Jjc2V0PVwiJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDgwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDE2MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAzMjB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gNjQwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDk2MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAxMjgwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDE5MjB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMjU2MHdcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXNyY3NldD1cIiR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSA4MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAxNjB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMzIwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDY0MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSA5NjB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMTI4MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAxOTIwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDI1NjB3XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYXJkLWltYWdlIGxhenlhdXRvc2l6ZXMgbGF6eWxvYWRlZFwiIHNpemVzPVwiMjQ4cHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPGZpZ2NhcHRpb24gY2xhc3M9XCJjYXJkLWZpZ2NhcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZpZ2NhcHRpb24tYm9keVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmlnY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZHVjdFZpZXctdHlwZS10aXRsZSBoNFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0LW5hbWU9XCJcIj4ke3ByW1wiZmFrZS1oZWFkaW5nXCJdfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiY2FyZC10aXRsZSBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGFyaWEtbGFiZWw9XCIke3ByW1wibmFtZVwiXX0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcltcInZhcmlhbnRzXCJdLmxlbmd0aCA+IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJbXCJ2YXJpYW50c1wiXVswXVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNhbGN1bGF0ZWRfcHJpY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJbXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj1cIiR7cHJbXCJjdXN0b21fdXJsXCJdW1widXJsXCJdfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtwcltcIm5hbWVcIl19PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dCBjYXJkLXRleHQtLXNrdVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+IFNLVSM6ICR7cHJbXCJza3VcIl19IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10ZXh0IGNhcmQtdGV4dC0tcHJpY2VcIiBkYXRhLXRlc3QtaW5mby10eXBlPVwicHJpY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXggcnJwLXByaWNlLS13aXRob3V0VGF4IGg0XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlzLXNyT25seVwiPiBNU1JQOiA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LXJycC1wcmljZS13aXRob3V0LXRheD1cIlwiIGNsYXNzPVwicHJpY2UgcHJpY2UtLXJycCBoNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJ2YXJpYW50c1wiXVswXS5zYWxlX3ByaWNlICE9PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiRcIiArIHByW1widmFyaWFudHNcIl1bMF0ucmV0YWlsX3ByaWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2Utc2VjdGlvbiBwcmljZS1zZWN0aW9uLS13aXRob3V0VGF4IG5vbi1zYWxlLXByaWNlLS13aXRob3V0VGF4IGg1XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlzLXNyT25seVwiPiBXYXM6IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LW5vbi1zYWxlLXByaWNlLXdpdGhvdXQtdGF4PVwiXCIgY2xhc3M9XCJwcmljZSBwcmljZS0tbm9uLXNhbGVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXggaDRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmljZS1sYWJlbCBpcy1zck9ubHlcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJpY2Utbm93LWxhYmVsIGlzLXNyT25seVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5Ob3c6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXByb2R1Y3QtcHJpY2Utd2l0aG91dC10YXg9XCJcIiBjbGFzcz1cInByaWNlIHByaWNlLS13aXRob3V0VGF4XCI+JCR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJ2YXJpYW50c1wiXS5sZW5ndGggPiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByW1widmFyaWFudHNcIl1bMF1bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYWxjdWxhdGVkX3ByaWNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS50b0ZpeGVkKDIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHByW1wiY2FsY3VsYXRlZF9wcmljZVwiXS50b0ZpeGVkKDIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0IGNhcmQtdGV4dC0tZXh0cmFcIiBzdHlsZT1cImRpc3BsYXk6ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJjdXN0b21fZmllbGRzXCJdLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZmllbGQpID0+IGZpZWxkW1wibmFtZVwiXSA9PT0gXCJfX2NhcmQtZXh0cmEtaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwicmVsYXRpdmU7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJub25lO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByW1wiY3VzdG9tX2ZpZWxkc1wiXS5maW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZpZWxkKSA9PiBmaWVsZFtcIm5hbWVcIl0gPT09IFwiX19jYXJkLWV4dHJhLWluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwcltcImN1c3RvbV9maWVsZHNcIl0uZmluZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZmllbGQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFtcIm5hbWVcIl0gPT09IFwiX19jYXJkLWV4dHJhLWluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1hY3Rpb24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHthY3Rpb25TZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25jbGljaz1cIndpbmRvdy5sb2NhdGlvbi5ocmVmPSR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByW1wiY3VzdG9tX3VybFwiXVtcInVybFwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1wcmltYXJ5XCIgPlZpZXcgRGV0YWlsczwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgfVxuXG4gIGNvbmZpZ3VyZUlzb3RvcGVGb3JBbGwoKSB7XG4gICAgLy8gJChcIi5ncmlkXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJncmlkXCIpO1xuICAgIC8vICAgJChcIi5sZHMtYmxvY2tcIikuaGlkZSgpO1xuICAgIGxldCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9kdWN0LWxpc3RpbmctYWxsXCIpO1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzO1xuXG4gICAgLy8gZm9yIHRlc3RpbmcsIGNvbW1lbnQgdGhpcyBzZWN0aW9uIGFuZCBjYWxsIHRoZSBydW5JbWFnZVRlc3QoKVxuICAgIGxldCBpc287XG4gICAgcnVuSXNvdG9wZSgpO1xuICAgIC8vIGlmICh0aGlzLmNoZWNrTW9iaWxlKCkpIHtcbiAgICAvLyAgIHJ1bkltYWdlVGVzdCgpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICAkKFwiLmdyaWRcIikuY3NzKFwiZGlzcGxheVwiLCBcImdyaWRcIik7XG4gICAgLy8gICAkKFwiLmxkcy1ibG9ja1wiKS5oaWRlKCk7XG4gICAgLy8gICBydW5Jc290b3BlKCk7XG4gICAgLy8gfVxuXG4gICAgLy8gcnVuSW1hZ2VUZXN0KCk7XG5cbiAgICAvLyBpdCB3aWxsIGNhbGwgcnVuSXNvdG9wZSgpIGlmIGFsbCBpbWFnZXMgYXJlIGxvYWRlZFxuICAgIGZ1bmN0aW9uIHJ1bkltYWdlVGVzdCgpIHtcbiAgICAgIC8vICAgJChcIi5ncmlkXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJncmlkXCIpO1xuICAgICAgLy8gICAkKFwiLmxkcy1ibG9ja1wiKS5oaWRlKCk7XG5cbiAgICAgIGxldCBpbWdMb2FkZWQgPSB0cnVlO1xuXG4gICAgICBsZXQgdGVzdEltZ0ludCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdmFyIGNhcmRJbWdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcIiNncmlkLWFsbC1wcm9kdWN0IC5jYXJkLWltYWdlXCJcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGNhcmRJbWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRJbWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9uWmVybyA9IHRydWU7XG4gICAgICAgICAgICBpZiAoY2FyZEltZ3NbaV0ub2Zmc2V0SGVpZ2h0IDwgMTAwKSB7XG4gICAgICAgICAgICAgIGltZ0xvYWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICBub25aZXJvID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vblplcm8pIHtcbiAgICAgICAgICAgICAgaW1nTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW1nTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW1nTG9hZGVkKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0ZXN0SW1nSW50KTtcbiAgICAgICAgICBydW5Jc290b3BlKCk7XG4gICAgICAgICAgLy8gYm9keS5jb25maWd1cmVJc290b3BlRm9yQWxsKCk7XG4gICAgICAgICAgLy8gYm9keS5zdGFydEdsb2JhbCgpO1xuICAgICAgICAgIC8vICQoXCIubGRzLWJsb2NrXCIpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSXNvdG9wZSgpIHtcbiAgICAgIC8vICQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICBpc28gPSBuZXcgSXNvdG9wZShncmlkLCB7XG4gICAgICAgIC8vIG9wdGlvbnMuLi5cbiAgICAgICAgaXRlbVNlbGVjdG9yOiBcIi5wcm9kdWN0XCIsXG4gICAgICAgIGxheW91dE1vZGU6IFwiZml0Um93c1wiLFxuICAgICAgICBnZXRTb3J0RGF0YToge1xuICAgICAgICAgIG5hbWU6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtbmFtZVwiKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByaWNlOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1wcm9kdWN0LXByaWNlXCIpKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJldmlldzogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1yYXRpbmdcIik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBiZXN0X3NlbGxpbmc6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcihpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWJlc3Qtc2VsbGluZ1wiKSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBuZXdlc3Q6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtZGF0ZS1jcmVhdGVkXCIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY3VzdG9tX3NvcnRfb3JkZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcihpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWN1c3RvbS1zb3J0XCIpKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICAvLyB9KTtcbiAgICAgIC8vIH0sIDApO1xuXG4gICAgICAkKFwiI2FsbC1zb3J0LXNlbGVjdCwgI2FsbC1zb3J0LXNlbGVjdC1tb2JpbGVcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgdmFsID0gJCh0aGlzKS52YWwoKS5zcGxpdChcIi1cIik7XG5cbiAgICAgICAgaWYgKHZhbFswXSA9PT0gXCJyZXZpZXdcIikge1xuICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgIHNvcnRCeTogW3ZhbFswXSwgXCJyYXRpbmdfY291bnRcIl0sXG4gICAgICAgICAgICBzb3J0QXNjZW5kaW5nOiB7XG4gICAgICAgICAgICAgIHJldmlldzogZmFsc2UsXG4gICAgICAgICAgICAgIHJhdGluZ19jb3VudDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgIHNvcnRCeTogdmFsWzBdLFxuICAgICAgICAgICAgc29ydEFzY2VuZGluZzogdmFsWzFdID09PSBcImFzY1wiLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJChcIiNhbGwtc29ydC1zZWxlY3QsICNhbGwtc29ydC1zZWxlY3QtbW9iaWxlXCIpLnByb3AoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYm9keS5jb250ZXh0LnN1YmNhdGVnb3JpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgc29ydEJ5OiBcImN1c3RvbV9zb3J0X29yZGVyXCIsXG4gICAgICAgICAgICBzb3J0QXNjZW5kaW5nOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgIHNvcnRCeTogXCJiZXN0X3NlbGxpbmdcIixcbiAgICAgICAgICAgIHNvcnRBc2NlbmRpbmc6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LCAzKTtcblxuICAgICAgbGV0IHJlc2l6ZUxheW91dCA9IGZhbHNlO1xuXG4gICAgICBhZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIChldmVudCkgPT4ge1xuICAgICAgICByZXNpemVMYXlvdXQgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICBpc28ub24oXCJsYXlvdXRDb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChyZXNpemVMYXlvdXQpIHtcbiAgICAgICAgICByZXNpemVMYXlvdXQgPSBmYWxzZTtcbiAgICAgICAgICBpc28uYXJyYW5nZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElUU0NhdGVnb3J5IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuXG4gICAgYWZ0ZXJGYWNldFVwZGF0ZSgpIHtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IGFwaSB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuLi9jb21tb24vdXRpbHMvdXJsLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldyB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmRlZmF1bHRWaWV3VHlwZSA9IHRoaXMuY29udGV4dC5kZWZhdWx0Vmlld1R5cGU7XG4gICAgICAgIHRoaXMub3Bwb3NpdGVWaWV3VHlwZSA9IHRoaXMuZGVmYXVsdFZpZXdUeXBlICE9PSAnZ3JpZCcgPyAnZ3JpZCcgOiAnbGlzdCc7XG4gICAgICAgIHRoaXMucHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICB0aGlzLmxvYWRpbmdPdmVybGF5ID0gJCgnLmxvYWRpbmdPdmVybGF5LmxvYWRpbmdPdmVybGF5LS1wcm9kdWN0LWxpc3RpbmcnKTtcblxuICAgICAgICAkKCdib2R5Jykub24oJ2ZhY2V0ZWRTZWFyY2hSZWZyZXNoJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRUb2dnbGVFdmVudHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgZ2V0U3RvcmVkVmlld1R5cGUoKSB7XG4gICAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdjYXRlZ29yeS12aWV3LXR5cGUnKSB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldFJlcXVlc3RUZW1wbGF0ZVR5cGUodHlwZSkge1xuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IHRoaXMuZ2V0U3RvcmVkVmlld1R5cGUoKTtcbiAgICAgICAgcmV0dXJuICFwYWdlVHlwZSA/IGAke3R5cGV9L3Byb2R1Y3QtbGlzdGluZ2AgOiBgY3VzdG9tL2NhdGVnb3J5LSR7cGFnZVR5cGV9LXZpZXdgO1xuICAgIH1cblxuICAgIHN0b3JlVmlld1R5cGUodHlwZSkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdjYXRlZ29yeS12aWV3LXR5cGUnLCB0eXBlKTtcbiAgICB9XG5cbiAgICBnZXRDYXRlZ29yeVBhZ2UocGFnZVR5cGUpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiB0aGlzLnByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgY3VzdG9tL2NhdGVnb3J5LSR7cGFnZVR5cGV9LXZpZXdgLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubG9hZGluZ092ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIGFwaS5nZXRQYWdlKHVybFV0aWxzLmdldFVybCgpLCBjb25maWcsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKS5odG1sKGNvbnRlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdPdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgdGhpcy5zdG9yZVZpZXdUeXBlKHBhZ2VUeXBlKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRUb2dnbGVFdmVudHMoKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdwcm9kdWN0Vmlld01vZGVDaGFuZ2VkJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFRvZ2dsZUV2ZW50cygpIHtcbiAgICAgICAgJCgnLmpzLWNhdGVnb3J5X190b2dnbGUtdmlldycpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3ZpZXctdHlwZScpO1xuXG4gICAgICAgICAgICBpZiAoJChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdhY3RpdmUtY2F0ZWdvcnktdmlldycpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZWdvcnlQYWdlKHR5cGUsIHRoaXMuYWRkVG9nZ2xlRXZlbnRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkVmlld1R5cGUgPSB0aGlzLmdldFN0b3JlZFZpZXdUeXBlKCk7XG5cbiAgICAgICAgaWYgKHN0b3JlZFZpZXdUeXBlID09PSB0aGlzLmRlZmF1bHRWaWV3VHlwZSB8fCAhc3RvcmVkVmlld1R5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFRvZ2dsZUV2ZW50cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRDYXRlZ29yeVBhZ2UodGhpcy5vcHBvc2l0ZVZpZXdUeXBlKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9