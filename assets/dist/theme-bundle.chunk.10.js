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
    $("#all-sort-select, #all-sort-select-mobile").prop("disabled", true);
    var products = this.context.products;
    var body = this;
    var UUIDcatc = this.context.UUIDcatc;
    var categoryId = this.context.categoryId;
    var num = this.context.num;
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
      var restOfTemplate = [];
      data.forEach(function (pr) {
        if (existProdId.includes(pr["id"])) {
          var $item = $(".product[data-entity-id=\"" + pr["id"] + "\"]");
          $item.attr("data-best-selling", "" + pr["total_sold"]);
          $item.attr("data-date-created", "" + pr["date_created"]);
        } else if (products.length > 99) {
          restOfTemplate.push({
            total_sold: pr["total_sold"],
            item: pr
          });
        }
      });
      restOfTemplate = customInsertionSort(restOfTemplate, restOfTemplate.length);
      restOfTemplate.forEach(function (pr) {
        var template = constructTemplate(pr["item"], num);
        num = num + 1;
        $("#product-listing-all").append(template);
      });
      $("#loader-block").hide();
      body.configureIsotopeForAll();
      body.startGlobal();
      body.disableViewDetailButton();
    })["catch"](function (error) {
      console.log(error);
    });
    function constructTemplate(pr, num) {
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
      var template = "\n          <div id=\"product-" + pr["id"] + "\" sort-order=\"" + pr["sort_order"] + "\" \n          class=\"product\"\n          product-data-category=\"" + pr["categories"] + "\" \n          data-name=\"" + pr["name"] + "\" \n           data-fake-name=\"" + pr["fake-heading"] + "\"\n          data-rating=\"" + (pr["reviews_count"] === 0 ? 0 : pr["reviews_rating_sum"] / pr["reviews_count"]) + "\"\n          product-review-count=\"" + pr["reviews_count"] + "\" \n          data-product-price=\"" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\" \n          data-date-created=\"" + pr["date_created"] + "\" \n          product-is-featured=\"" + pr["is_featured"] + "\" \n          data-best-selling=\"" + pr["total_sold"] + "\"\n          data-custom-sort=\"" + pr["custom-sort-order"] + "\"\n          data-custom-num=\"" + num + "\"\n          \n          product-filter-IAT=\"\"\n          product-filter-FBS=\"\"\n          product-filter-FBC=\"\"\n          product-filter-CAT=\"\"\n          product-filter-NCF=\"\"\n          product-filter-NCP=\"\"\n          product-filter-NSI=\"\"\n          product-filter-HT=\"\"\n          >\n              <div class=\"card-wrapper\">\n                  <article class=\"card\" data-test=\"card-" + pr["id"] + "\">\n                      <figure class=\"card-figure\">\n                          <div class=\"sale-flag-sash\" style=\"display: " + (pr["variants"][0].sale_price !== 0 ? "block;" : "none;") + " \"><span class=\"sale-text\">On Sale</span></div>\n                          <a href=\"" + pr["custom_url"]["url"] + "\" \n                          class=\"card-figure__link\" \n                          aria-label=\"" + pr["name"] + ", \n                          $" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\">\n                              <div class=\" card-img-container\">\n                                  <img src=\"" + img["url_thumbnail"] + "\" \n                                  alt=\"img[\"description\"]\" title=\"" + pr["fake-heading"] + "\" \n                                  data-sizes=\"auto\" \n                                  srcset=\"" + img["url_standard"] + " 80w, \n                                  " + img["url_standard"] + " 160w, \n                                  " + img["url_standard"] + " 320w, \n                                  " + img["url_standard"] + " 640w, \n                                  " + img["url_standard"] + " 960w, \n                                  " + img["url_standard"] + " 1280w, \n                                  " + img["url_standard"] + " 1920w, \n                                  " + img["url_standard"] + " 2560w\" \n                                  data-srcset=\"" + img["url_standard"] + " 80w, \n                                  " + img["url_standard"] + " 160w, \n                                  " + img["url_standard"] + " 320w, \n                                  " + img["url_standard"] + " 640w, \n                                  " + img["url_standard"] + " 960w, \n                                  " + img["url_standard"] + " 1280w, \n                                  " + img["url_standard"] + " 1920w, \n                                  " + img["url_standard"] + " 2560w\" \n                                  class=\"card-image lazyautosizes lazyloaded\" sizes=\"248px\">\n                              </div>\n                          </a>\n                         <figcaption class=\"card-figcaption\">\n                              <div class=\"card-figcaption-body\"></div>\n                         </figcaption>\n                      </figure>\n                      <div class=\"card-body\">\n                          <p class=\"productView-type-title h4\" \n                          product-name=\"\">" + pr["fake-heading"] + "</p>\n                          <h3 class=\"card-title \">\n                              <a aria-label=\"" + pr["name"] + ", \n                                $" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "\" \n                              href=\"" + pr["custom_url"]["url"] + "\">\n                              " + pr["name"] + "</a>\n                          </h3>\n                          <p class=\"card-text card-text--sku\">\n                              <span> SKU#: " + pr["sku"] + " </span>\n                          </p>\n                          <div class=\"card-text card-text--price\" data-test-info-type=\"price\">\n                              <div class=\"price-section price-section--withoutTax rrp-price--withoutTax h4\" style=\"display: block;\">\n                                  <span class=\"is-srOnly\"> MSRP: </span>\n                                  <span data-product-rrp-price-without-tax=\"\" class=\"price price--rrp h5\">\n                                    " + (pr["variants"][0].sale_price !== 0 ? "$" + pr["variants"][0].retail_price : "") + "\n                                  </span>\n                              </div>\n                              <div class=\"price-section price-section--withoutTax non-sale-price--withoutTax h5\" style=\"display: none;\">\n                                <span class=\"is-srOnly\"> Was: </span>\n                                <span data-product-non-sale-price-without-tax=\"\" class=\"price price--non-sale\"></span>\n                              </div>\n                              <div class=\"price-section price-section--withoutTax h4\">\n                                <span class=\"price-label is-srOnly\"></span>\n                                <span class=\"price-now-label is-srOnly\" style=\"display: none;\">Now:</span>\n                                <span data-product-price-without-tax=\"\" class=\"price price--withoutTax\">$" + (pr["variants"].length > 1 ? pr["variants"][0]["calculated_price"].toFixed(2) : pr["calculated_price"].toFixed(2)) + "</span>\n                              </div>\n                          </div>\n                          <p class=\"card-text card-text--extra\" style=\"display: " + (pr["custom_fields"].find(function (field) {
        return field["name"] === "__card-extra-info";
      }) !== undefined ? "relative;" : "none;") + " \"> \n                          " + (pr["custom_fields"].find(function (field) {
        return field["name"] === "__card-extra-info";
      }) !== undefined ? pr["custom_fields"].find(function (field) {
        return field["name"] === "__card-extra-info";
      }).value : "") + "</p>\n                         <div class=\"card-action-wrapper\">\n                              " + actionSection + "\n                              <button type=\"button\" onclick=\"window.location.href=" + pr["custom_url"]["url"] + "\" \n                              class=\"button button--primary\" >View Details</button>\n                         </div>\n                      </div>\n                  </article>\n              </div>\n          </div>";
      return template;
    }
    function customInsertionSort(arr, n) {
      var i, key, j;
      for (i = 1; i < n; i++) {
        key = arr[i]["total_sold"];
        j = i - 1;

        /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
        while (j >= 0 && arr[j]["total_sold"] > key) {
          arr[j + 1]["total_sold"] = arr[j]["total_sold"];
          j = j - 1;
        }
        arr[j + 1]["total_sold"] = key;
      }
      return arr;
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
          },
          custom_sort_num: function custom_sort_num(itemElem) {
            return Number(itemElem.getAttribute("data-custom-num"));
          }
        }
      });
      // });
      // }, 0);

      $("#all-sort-select, #all-sort-select-mobile").change(function () {
        var val = $(this).val().split("-");
        if (val[0] === "review") {
          iso.arrange({
            sortBy: [val[0]],
            sortAscending: {
              review: false
              // rating_count: false,
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
            sortBy: "custom_sort_num",
            sortAscending: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS9pdHMtY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS90b2dnbGUtY2F0ZWdvcnktbGlzdGluZy12aWV3LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiX0NhdGFsb2dQYWdlIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJJVFNDYXRlZ29yeSIsInRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXciLCJUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IiwiX3Byb3RvIiwicHJvdG90eXBlIiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCJfdGhpczIiLCIkIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJmb2N1cyIsIm9uIiwib25SZWFkeSIsIl90aGlzMyIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiY29tcGFyZVByb2R1Y3RzIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwidmFsaWRhdGVQcm9kdWN0c0NvdW50IiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwiX3RoaXM0IiwiX3RoaXMkdmFsaWRhdGlvbkRpY3RpIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwiZ2V0UmVxdWVzdFRlbXBsYXRlVHlwZSIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJhZnRlckZhY2V0VXBkYXRlIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJOZXdPcHRzIiwidXBkYXRlUmVxdWVzdE9wdGlvbnMiLCJzdGFydEdsb2JhbCIsImN1c3RvbUdsb2JhbCIsImRpc2FibGVWaWV3RGV0YWlsQnV0dG9uIiwib2ZmIiwicHJvcCIsImJvZHkiLCJVVUlEY2F0YyIsImNhdGVnb3J5SWQiLCJudW0iLCJleGlzdFByb2RJZCIsImZvckVhY2giLCJwciIsInB1c2giLCJpZCIsImF4aW9zIiwiZ2V0IiwicGFyYW1zIiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsInByb2R1Y3QiLCJyZXN0T2ZUZW1wbGF0ZSIsImluY2x1ZGVzIiwiJGl0ZW0iLCJ0b3RhbF9zb2xkIiwiaXRlbSIsImN1c3RvbUluc2VydGlvblNvcnQiLCJjb25zdHJ1Y3RUZW1wbGF0ZSIsImFwcGVuZCIsImhpZGUiLCJjb25maWd1cmVJc290b3BlRm9yQWxsIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiaW1nIiwiaSIsImFjdGlvblNlY3Rpb24iLCJ0b0ZpeGVkIiwic2FsZV9wcmljZSIsInJldGFpbF9wcmljZSIsImZpbmQiLCJmaWVsZCIsInVuZGVmaW5lZCIsInZhbHVlIiwiYXJyIiwibiIsImtleSIsImoiLCJncmlkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlzbyIsInJ1bklzb3RvcGUiLCJydW5JbWFnZVRlc3QiLCJpbWdMb2FkZWQiLCJ0ZXN0SW1nSW50Iiwic2V0SW50ZXJ2YWwiLCJjYXJkSW1ncyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJub25aZXJvIiwib2Zmc2V0SGVpZ2h0IiwiY2xlYXJJbnRlcnZhbCIsIklzb3RvcGUiLCJpdGVtU2VsZWN0b3IiLCJsYXlvdXRNb2RlIiwiZ2V0U29ydERhdGEiLCJuYW1lIiwiaXRlbUVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJwcmljZSIsIk51bWJlciIsInJldmlldyIsImJlc3Rfc2VsbGluZyIsIm5ld2VzdCIsImN1c3RvbV9zb3J0X29yZGVyIiwiY3VzdG9tX3NvcnRfbnVtIiwiY2hhbmdlIiwidmFsIiwic3BsaXQiLCJhcnJhbmdlIiwic29ydEJ5Iiwic29ydEFzY2VuZGluZyIsInNldFRpbWVvdXQiLCJzdWJjYXRlZ29yaWVzIiwicmVzaXplTGF5b3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiYXJndW1lbnRzIiwiSlNPTiIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiLCJkZWZhdWx0Vmlld1R5cGUiLCJvcHBvc2l0ZVZpZXdUeXBlIiwibG9hZGluZ092ZXJsYXkiLCJhZGRUb2dnbGVFdmVudHMiLCJpbml0IiwiZ2V0U3RvcmVkVmlld1R5cGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ0eXBlIiwicGFnZVR5cGUiLCJzdG9yZVZpZXdUeXBlIiwic2V0SXRlbSIsImdldENhdGVnb3J5UGFnZSIsInNob3ciLCJhcGkiLCJnZXRQYWdlIiwidXJsVXRpbHMiLCJnZXRVcmwiLCJlcnIiLCJFcnJvciIsInN0b3JlZFZpZXdUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDb0I7QUFDSjtBQUNtQztBQUN2QztBQUM4QjtBQUMvQjtBQUFBLElBRTFCQSxRQUFRLDBCQUFBQyxZQUFBO0VBQUFDLGNBQUEsQ0FBQUYsUUFBQSxFQUFBQyxZQUFBO0VBQzNCLFNBQUFELFNBQVlHLE9BQU8sRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDbkJBLEtBQUEsR0FBQUgsWUFBQSxDQUFBSSxJQUFBLE9BQU1GLE9BQU8sQ0FBQztJQUNkQyxLQUFBLENBQUtFLG9CQUFvQixHQUFHQywwR0FBMkIsQ0FBQ0osT0FBTyxDQUFDOztJQUVoRTtBQUNKO0FBQ0E7SUFDSUMsS0FBQSxDQUFLSSxXQUFXLEdBQUcsSUFBSUEsNERBQVcsQ0FBQ0wsT0FBTyxDQUFDO0lBQzNDQyxLQUFBLENBQUtLLHlCQUF5QixHQUFHLElBQUlDLDRFQUF5QixDQUFDUCxPQUFPLENBQUM7SUFBQyxPQUFBQyxLQUFBO0VBQzFFO0VBQUMsSUFBQU8sTUFBQSxHQUFBWCxRQUFBLENBQUFZLFNBQUE7RUFBQUQsTUFBQSxDQUVERSx1QkFBdUIsR0FBdkIsU0FBQUEs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VyxDQUFDO01BRWpELElBQUk3RSxDQUFDLENBQUNRLENBQUMsQ0FBQ0MsYUFBYSxDQUFDLENBQUNQLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO01BRXpESSxNQUFJLENBQUM0SyxlQUFlLENBQUNKLElBQUksRUFBRXhLLE1BQUksQ0FBQ21LLGVBQWUsQ0FBQztJQUNwRCxDQUFDLENBQUM7RUFDTixDQUFDO0VBQUFuTCxNQUFBLENBRURvTCxJQUFJLEdBQUosU0FBQUEsS0FBQSxFQUFPO0lBQ0gsSUFBTWdCLGNBQWMsR0FBRyxJQUFJLENBQUNmLGlCQUFpQixFQUFFO0lBRS9DLElBQUllLGNBQWMsS0FBSyxJQUFJLENBQUNwQixlQUFlLElBQUksQ0FBQ29CLGNBQWMsRUFBRTtNQUM1RCxPQUFPLElBQUksQ0FBQ2pCLGVBQWUsRUFBRTtJQUNqQztJQUVBLElBQUksQ0FBQ1MsZUFBZSxDQUFDLElBQUksQ0FBQ1gsZ0JBQWdCLENBQUM7RUFDL0MsQ0FBQztFQUFBLE9BQUFsTCx5QkFBQTtBQUFBIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSBcIkBiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzXCI7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSBcIi4vY2F0YWxvZ1wiO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tIFwiLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0c1wiO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSBcIi4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoXCI7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tIFwiLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlsc1wiO1xuaW1wb3J0IElUU0NhdGVnb3J5IGZyb20gXCIuL2N1c3RvbS9pdHMtY2F0ZWdvcnlcIjtcbmltcG9ydCBUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IGZyb20gXCIuL2N1c3RvbS90b2dnbGUtY2F0ZWdvcnktbGlzdGluZy12aWV3XCI7XG5pbXBvcnQgY3VzdG9tR2xvYmFsIGZyb20gXCIuL2N1c3RvbS9pdHMtZ2xvYmFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgc3VwZXIoY29udGV4dCk7XG4gICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcblxuICAgIC8qKlxuICAgICAqIEludHVpdFNvbHV0aW9ucyAtIEN1c3RvbSBDYXRlZ29yeVxuICAgICAqL1xuICAgIHRoaXMuSVRTQ2F0ZWdvcnkgPSBuZXcgSVRTQ2F0ZWdvcnkoY29udGV4dCk7XG4gICAgdGhpcy50b2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3ID0gbmV3IFRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXcoY29udGV4dCk7XG4gIH1cblxuICBzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XG4gICAgJGVsZW1lbnQuYXR0cih7XG4gICAgICByb2xlOiByb2xlVHlwZSxcbiAgICAgIFwiYXJpYS1saXZlXCI6IGFyaWFMaXZlU3RhdHVzLFxuICAgIH0pO1xuICB9XG5cbiAgbWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpIHtcbiAgICBpZiAoISQoXCJbZGF0YS1zaG9wLWJ5LXByaWNlXVwiKS5sZW5ndGgpIHJldHVybjtcblxuICAgIGlmICgkKFwiLm5hdkxpc3QtYWN0aW9uXCIpLmhhc0NsYXNzKFwiaXMtYWN0aXZlXCIpKSB7XG4gICAgICAkKFwiYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmVcIikuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAkKFwiYS5uYXZMaXN0LWFjdGlvblwiKS5vbihcImNsaWNrXCIsICgpID0+XG4gICAgICB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxuICAgICAgICAkKFwic3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZVwiKSxcbiAgICAgICAgXCJzdGF0dXNcIixcbiAgICAgICAgXCJhc3NlcnRpdmVcIlxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBvblJlYWR5KCkge1xuICAgIHRoaXMuYXJyYW5nZUZvY3VzT25Tb3J0QnkoKTtcblxuICAgICQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbihcImNsaWNrXCIsIChlKSA9PlxuICAgICAgdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcyhcbiAgICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLm5leHQoKSxcbiAgICAgICAgXCJzdGF0dXNcIixcbiAgICAgICAgXCJwb2xpdGVcIlxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKTtcblxuICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgaWYgKCQoXCIjZmFjZXRlZFNlYXJjaFwiKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICBob29rcy5vbihcInNvcnRCeS1zdWJtaXR0ZWRcIiwgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgfVxuXG4gICAgJChcImEucmVzZXQtYnRuXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgIHRoaXMuc2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzKCQoXCJzcGFuLnJlc2V0LW1lc3NhZ2VcIiksIFwic3RhdHVzXCIsIFwicG9saXRlXCIpXG4gICAgKTtcblxuICAgIHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKTtcbiAgICB0aGlzLnZhbGlkYXRlUHJvZHVjdHNDb3VudCgpO1xuICB9XG5cbiAgYXJpYU5vdGlmeU5vUHJvZHVjdHMoKSB7XG4gICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJChcIltkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl1cIik7XG4gICAgaWYgKCRub1Byb2R1Y3RzTWVzc2FnZS5sZW5ndGgpIHtcbiAgICAgICRub1Byb2R1Y3RzTWVzc2FnZS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRGYWNldGVkU2VhcmNoKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByaWNlX21pbl9ldmFsdWF0aW9uOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxuICAgICAgcHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICBwcmljZV9tYXhfbm90X2VudGVyZWQ6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxuICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoXCIjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoXCIjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5jYXRlZ29yeVByb2R1Y3RzUGVyUGFnZTtcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICBwcm9kdWN0TGlzdGluZzpcbiAgICAgICAgICB0aGlzLnRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXcuZ2V0UmVxdWVzdFRlbXBsYXRlVHlwZShcImNhdGVnb3J5XCIpLFxuICAgICAgICBzaWRlYmFyOiBcImNhdGVnb3J5L3NpZGViYXJcIixcbiAgICAgIH0sXG4gICAgICBzaG93TW9yZTogXCJjYXRlZ29yeS9zaG93LW1vcmVcIixcbiAgICB9O1xuXG4gICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2goXG4gICAgICByZXF1ZXN0T3B0aW9ucyxcbiAgICAgIChjb250ZW50KSA9PiB7XG4gICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgJChcImJvZHlcIikudHJpZ2dlckhhbmRsZXIoXCJjb21wYXJlUmVzZXRcIik7XG5cbiAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAxMDBcbiAgICAgICAgKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW50dWl0U29sdXRpb25zIC0gQ2F0ZWdvcnkgVXBkYXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLklUU0NhdGVnb3J5LmFmdGVyRmFjZXRVcGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XG4gICAgICAgICAgb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICAkKFwiYm9keVwiKS5vbihcInByb2R1Y3RWaWV3TW9kZUNoYW5nZWRcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgTmV3T3B0cyA9IHtcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOlxuICAgICAgICAgICAgdGhpcy50b2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3LmdldFJlcXVlc3RUZW1wbGF0ZVR5cGUoXCJjYXRlZ29yeVwiKSxcbiAgICAgICAgICBzaWRlYmFyOiBcImNhdGVnb3J5L3NpZGViYXJcIixcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd01vcmU6IFwiY2F0ZWdvcnkvc2hvdy1tb3JlXCIsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmZhY2V0ZWRTZWFyY2gudXBkYXRlUmVxdWVzdE9wdGlvbnMoTmV3T3B0cyk7XG4gICAgfSk7XG4gIH1cblxuICBzdGFydEdsb2JhbCgpIHtcbiAgICBjdXN0b21HbG9iYWwodGhpcy5jb250ZXh0KTtcbiAgfVxuXG4gIGRpc2FibGVWaWV3RGV0YWlsQnV0dG9uKCkge1xuICAgICQoXCJbdmlldy1kZXRhaWwtYnV0dG9uXVwiKS5vZmYoXCJjbGlja1wiKTtcbiAgfVxuXG4gIHZhbGlkYXRlUHJvZHVjdHNDb3VudCgpIHtcbiAgICAkKFwiI2FsbC1zb3J0LXNlbGVjdCwgI2FsbC1zb3J0LXNlbGVjdC1tb2JpbGVcIikucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuICAgIGNvbnN0IHByb2R1Y3RzID0gdGhpcy5jb250ZXh0LnByb2R1Y3RzO1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzO1xuICAgIGNvbnN0IFVVSURjYXRjID0gdGhpcy5jb250ZXh0LlVVSURjYXRjO1xuICAgIGNvbnN0IGNhdGVnb3J5SWQgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlJZDtcbiAgICBsZXQgbnVtID0gdGhpcy5jb250ZXh0Lm51bTtcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0cyk7XG4gICAgY29uc3QgZXhpc3RQcm9kSWQgPSBbXTtcbiAgICBwcm9kdWN0cy5mb3JFYWNoKChwcikgPT4ge1xuICAgICAgZXhpc3RQcm9kSWQucHVzaChwci5pZCk7XG4gICAgfSk7XG4gICAgLy8gY29uc29sZS5sb2coZXhpc3RQcm9kSWQpO1xuICAgIGF4aW9zXG4gICAgICAuZ2V0KFwiaHR0cHM6Ly9zdWZyaS5hdXRvY29kZS5kZXYvbDV0QGRldi9nZXRBVFByb2R1Y3QvXCIsIHtcbiAgICAgICAgcGFyYW1zOiB7IGlkOiBjYXRlZ29yeUlkIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhLnByb2R1Y3Q7XG4gICAgICAgIGxldCByZXN0T2ZUZW1wbGF0ZSA9IFtdO1xuICAgICAgICBkYXRhLmZvckVhY2goKHByKSA9PiB7XG4gICAgICAgICAgaWYgKGV4aXN0UHJvZElkLmluY2x1ZGVzKHByW1wiaWRcIl0pKSB7XG4gICAgICAgICAgICBjb25zdCAkaXRlbSA9ICQoYC5wcm9kdWN0W2RhdGEtZW50aXR5LWlkPVwiJHtwcltcImlkXCJdfVwiXWApO1xuICAgICAgICAgICAgJGl0ZW0uYXR0cihcImRhdGEtYmVzdC1zZWxsaW5nXCIsIGAke3ByW1widG90YWxfc29sZFwiXX1gKTtcbiAgICAgICAgICAgICRpdGVtLmF0dHIoXCJkYXRhLWRhdGUtY3JlYXRlZFwiLCBgJHtwcltcImRhdGVfY3JlYXRlZFwiXX1gKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2R1Y3RzLmxlbmd0aCA+IDk5KXtcbiAgICAgICAgICAgIHJlc3RPZlRlbXBsYXRlLnB1c2goeyB0b3RhbF9zb2xkOiBwcltcInRvdGFsX3NvbGRcIl0sIGl0ZW06IHByIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3RPZlRlbXBsYXRlID0gY3VzdG9tSW5zZXJ0aW9uU29ydChcbiAgICAgICAgICByZXN0T2ZUZW1wbGF0ZSxcbiAgICAgICAgICByZXN0T2ZUZW1wbGF0ZS5sZW5ndGhcbiAgICAgICAgKTtcblxuICAgICAgICByZXN0T2ZUZW1wbGF0ZS5mb3JFYWNoKChwcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gY29uc3RydWN0VGVtcGxhdGUocHJbXCJpdGVtXCJdLCBudW0pO1xuICAgICAgICAgIG51bSA9IG51bSArIDE7XG4gICAgICAgICAgJChcIiNwcm9kdWN0LWxpc3RpbmctYWxsXCIpLmFwcGVuZCh0ZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoXCIjbG9hZGVyLWJsb2NrXCIpLmhpZGUoKTtcbiAgICAgICAgYm9keS5jb25maWd1cmVJc290b3BlRm9yQWxsKCk7XG4gICAgICAgIGJvZHkuc3RhcnRHbG9iYWwoKTtcbiAgICAgICAgYm9keS5kaXNhYmxlVmlld0RldGFpbEJ1dHRvbigpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RUZW1wbGF0ZShwciwgbnVtKSB7XG4gICAgICBsZXQgaW1nID0ge307XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByW1wiaW1hZ2VzXCJdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwcltcImltYWdlc1wiXVtpXVtcImlzX3RodW1ibmFpbFwiXSkge1xuICAgICAgICAgIGltZyA9IHByW1wiaW1hZ2VzXCJdW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBhY3Rpb25TZWN0aW9uID0gXCJcIjtcbiAgICAgIGlmIChwcltcInZhcmlhbnRzXCJdLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgYWN0aW9uU2VjdGlvbiA9IGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXByaW1hcnkgcXVpY2t2aWV3IGJ1dHRvbi0tcXVpY2t2aWV3XCIgZGF0YS1wcm9kdWN0LWlkPVwiJHtwcltcImlkXCJdfVwiPlZpZXcgT3B0aW9uczwvYnV0dG9uPmA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3Rpb25TZWN0aW9uID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYXRjIGpzLWNhcmQtYXRjXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0Y19fc2VjdGlvbiBjYXJkLWF0Y19fc2VjdGlvbi0tcXR5XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNhcmQtYXRjX19xdHktJHtwcltcImlkXCJdfS0ke1VVSURjYXRjfVwiIGNsYXNzPVwiY2FyZC1hdGNfX2xhYmVsIGlzLXNyT25seVwiPlF1YW50aXR5OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYXRjLWluY3JlbWVudCBjYXJkLWF0Yy1pbmNyZW1lbnQtLWhhcy1idXR0b25zIGpzLWNhcmQtYXRjLWluY3JlbWVudFwiPlxuXG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRlbFwiIGNsYXNzPVwiZm9ybS1pbnB1dCBjYXJkLWF0Y19faW5wdXQgY2FyZC1hdGNfX2lucHV0LS10b3RhbCBqcy1jYXJkLWF0Y19faW5wdXQtLXRvdGFsXCIgbmFtZT1cImNhcmQtYXRjX19xdHktJHtwcltcImlkXCJdfS0ke1VVSURjYXRjfVwiIGlkPVwiY2FyZC1hdGNfX3F0eS0ke3ByW1wiaWRcIl19LSR7VVVJRGNhdGN9XCIgdmFsdWU9XCIxXCIgbWluPVwiMVwiIHBhdHRlcm49XCJbMC05XSpcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0Yy1idXR0b24td3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0taWNvblwiIGRhdGEtYWN0aW9uPVwiaW5jXCIgdHlwZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXMtc3JPbmx5XCI+SW5jcmVhc2UgUXVhbnRpdHkgb2YgdW5kZWZpbmVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi13cmFwcGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1hZGRcIj48L3VzZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLS1pY29uXCIgZGF0YS1hY3Rpb249XCJkZWNcIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj5EZWNyZWFzZSBRdWFudGl0eSBvZiB1bmRlZmluZWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLXdyYXBwZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJpY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNpY29uLW1pbnVzXCI+PC91c2U+UFBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0Y19fc2VjdGlvbiBjYXJkLWF0Y19fc2VjdGlvbi0tYWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjYXJkLWF0Y19fYnV0dG9uIGJ1dHRvbiBidXR0b24tLXByaW1hcnkganMtY2FyZC1hdGNfX2J1dHRvblwiIGlkPVwiY2FyZC1hdGNfX2FkZC0ke3ByW1wiaWRcIl19LSR7VVVJRGNhdGN9XCIgZGF0YS1kZWZhdWx0LW1lc3NhZ2U9XCJBZGQgdG8gQ2FydFwiIGRhdGEtd2FpdC1tZXNzYWdlPVwiQWRkaW5nIHRvIGNhcnTigKZcIiBkYXRhLWFkZGVkLW1lc3NhZ2U9XCJBZGQgdG8gQ2FydFwiIHZhbHVlPVwiQWRkIHRvIENhcnRcIiBkYXRhLWNhcmQtYWRkLXRvLWNhcnQ9XCIvY2FydC5waHA/YWN0aW9uPWFkZCZhbXA7cHJvZHVjdF9pZD0ke3ByW1wiaWRcIl19XCIgZGF0YS1ldmVudC10eXBlPVwicHJvZHVjdC1jbGlja1wiPkFkZCB0byBDYXJ0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9kdWN0LXN0YXR1cy1tZXNzYWdlIGFyaWEtZGVzY3JpcHRpb24tLWhpZGRlblwiPkFkZGluZyB0byBjYXJ04oCmIFRoZSBpdGVtIGhhcyBiZWVuIGFkZGVkPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcbiAgICAgICAgICA8ZGl2IGlkPVwicHJvZHVjdC0ke3ByW1wiaWRcIl19XCIgc29ydC1vcmRlcj1cIiR7cHJbXCJzb3J0X29yZGVyXCJdfVwiIFxuICAgICAgICAgIGNsYXNzPVwicHJvZHVjdFwiXG4gICAgICAgICAgcHJvZHVjdC1kYXRhLWNhdGVnb3J5PVwiJHtwcltcImNhdGVnb3JpZXNcIl19XCIgXG4gICAgICAgICAgZGF0YS1uYW1lPVwiJHtwcltcIm5hbWVcIl19XCIgXG4gICAgICAgICAgIGRhdGEtZmFrZS1uYW1lPVwiJHtwcltcImZha2UtaGVhZGluZ1wiXX1cIlxuICAgICAgICAgIGRhdGEtcmF0aW5nPVwiJHtcbiAgICAgICAgICAgIHByW1wicmV2aWV3c19jb3VudFwiXSA9PT0gMFxuICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgOiBwcltcInJldmlld3NfcmF0aW5nX3N1bVwiXSAvIHByW1wicmV2aWV3c19jb3VudFwiXVxuICAgICAgICAgIH1cIlxuICAgICAgICAgIHByb2R1Y3QtcmV2aWV3LWNvdW50PVwiJHtwcltcInJldmlld3NfY291bnRcIl19XCIgXG4gICAgICAgICAgZGF0YS1wcm9kdWN0LXByaWNlPVwiJHtcbiAgICAgICAgICAgIHByW1widmFyaWFudHNcIl0ubGVuZ3RoID4gMVxuICAgICAgICAgICAgICA/IHByW1widmFyaWFudHNcIl1bMF1bXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgOiBwcltcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxuICAgICAgICAgIH1cIiBcbiAgICAgICAgICBkYXRhLWRhdGUtY3JlYXRlZD1cIiR7cHJbXCJkYXRlX2NyZWF0ZWRcIl19XCIgXG4gICAgICAgICAgcHJvZHVjdC1pcy1mZWF0dXJlZD1cIiR7cHJbXCJpc19mZWF0dXJlZFwiXX1cIiBcbiAgICAgICAgICBkYXRhLWJlc3Qtc2VsbGluZz1cIiR7cHJbXCJ0b3RhbF9zb2xkXCJdfVwiXG4gICAgICAgICAgZGF0YS1jdXN0b20tc29ydD1cIiR7cHJbXCJjdXN0b20tc29ydC1vcmRlclwiXX1cIlxuICAgICAgICAgIGRhdGEtY3VzdG9tLW51bT1cIiR7bnVtfVwiXG4gICAgICAgICAgXG4gICAgICAgICAgcHJvZHVjdC1maWx0ZXItSUFUPVwiXCJcbiAgICAgICAgICBwcm9kdWN0LWZpbHRlci1GQlM9XCJcIlxuICAgICAgICAgIHByb2R1Y3QtZmlsdGVyLUZCQz1cIlwiXG4gICAgICAgICAgcHJvZHVjdC1maWx0ZXItQ0FUPVwiXCJcbiAgICAgICAgICBwcm9kdWN0LWZpbHRlci1OQ0Y9XCJcIlxuICAgICAgICAgIHByb2R1Y3QtZmlsdGVyLU5DUD1cIlwiXG4gICAgICAgICAgcHJvZHVjdC1maWx0ZXItTlNJPVwiXCJcbiAgICAgICAgICBwcm9kdWN0LWZpbHRlci1IVD1cIlwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cImNhcmRcIiBkYXRhLXRlc3Q9XCJjYXJkLSR7cHJbXCJpZFwiXX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiY2FyZC1maWd1cmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNhbGUtZmxhZy1zYXNoXCIgc3R5bGU9XCJkaXNwbGF5OiAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByW1widmFyaWFudHNcIl1bMF0uc2FsZV9wcmljZSAhPT0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImJsb2NrO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwibm9uZTtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9IFwiPjxzcGFuIGNsYXNzPVwic2FsZS10ZXh0XCI+T24gU2FsZTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cHJbXCJjdXN0b21fdXJsXCJdW1widXJsXCJdfVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNhcmQtZmlndXJlX19saW5rXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCIke3ByW1wibmFtZVwiXX0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAkJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcltcInZhcmlhbnRzXCJdLmxlbmd0aCA+IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJbXCJ2YXJpYW50c1wiXVswXVtcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcltcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiIGNhcmQtaW1nLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtpbWdbXCJ1cmxfdGh1bWJuYWlsXCJdfVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD1cImltZ1tcImRlc2NyaXB0aW9uXCJdXCIgdGl0bGU9XCIke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJmYWtlLWhlYWRpbmdcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zaXplcz1cImF1dG9cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNzZXQ9XCIke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gODB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMTYwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDMyMHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSA2NDB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gOTYwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDEyODB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMTkyMHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAyNTYwd1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtc3Jjc2V0PVwiJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDgwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDE2MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAzMjB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gNjQwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDk2MHcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAxMjgwdywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDE5MjB3LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMjU2MHdcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNhcmQtaW1hZ2UgbGF6eWF1dG9zaXplcyBsYXp5bG9hZGVkXCIgc2l6ZXM9XCIyNDhweFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlnY2FwdGlvbiBjbGFzcz1cImNhcmQtZmlnY2FwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZmlnY2FwdGlvbi1ib2R5XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9maWdjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9kdWN0Vmlldy10eXBlLXRpdGxlIGg0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3QtbmFtZT1cIlwiPiR7cHJbXCJmYWtlLWhlYWRpbmdcIl19PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJjYXJkLXRpdGxlIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgYXJpYS1sYWJlbD1cIiR7cHJbXCJuYW1lXCJdfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByW1widmFyaWFudHNcIl0ubGVuZ3RoID4gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwcltcInZhcmlhbnRzXCJdWzBdW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FsY3VsYXRlZF9wcmljZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0udG9GaXhlZCgyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcltcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiJHtwcltcImN1c3RvbV91cmxcIl1bXCJ1cmxcIl19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3ByW1wibmFtZVwiXX08L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0IGNhcmQtdGV4dC0tc2t1XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4gU0tVIzogJHtwcltcInNrdVwiXX0gPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRleHQgY2FyZC10ZXh0LS1wcmljZVwiIGRhdGEtdGVzdC1pbmZvLXR5cGU9XCJwcmljZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlLXNlY3Rpb24gcHJpY2Utc2VjdGlvbi0td2l0aG91dFRheCBycnAtcHJpY2UtLXdpdGhvdXRUYXggaDRcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXMtc3JPbmx5XCI+IE1TUlA6IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXByb2R1Y3QtcnJwLXByaWNlLXdpdGhvdXQtdGF4PVwiXCIgY2xhc3M9XCJwcmljZSBwcmljZS0tcnJwIGg1XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcltcInZhcmlhbnRzXCJdWzBdLnNhbGVfcHJpY2UgIT09IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiJFwiICsgcHJbXCJ2YXJpYW50c1wiXVswXS5yZXRhaWxfcHJpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXggbm9uLXNhbGUtcHJpY2UtLXdpdGhvdXRUYXggaDVcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXMtc3JPbmx5XCI+IFdhczogPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXByb2R1Y3Qtbm9uLXNhbGUtcHJpY2Utd2l0aG91dC10YXg9XCJcIiBjbGFzcz1cInByaWNlIHByaWNlLS1ub24tc2FsZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlLXNlY3Rpb24gcHJpY2Utc2VjdGlvbi0td2l0aG91dFRheCBoNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByaWNlLWxhYmVsIGlzLXNyT25seVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmljZS1ub3ctbGFiZWwgaXMtc3JPbmx5XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPk5vdzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtcHJvZHVjdC1wcmljZS13aXRob3V0LXRheD1cIlwiIGNsYXNzPVwicHJpY2UgcHJpY2UtLXdpdGhvdXRUYXhcIj4kJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcltcInZhcmlhbnRzXCJdLmxlbmd0aCA+IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJbXCJ2YXJpYW50c1wiXVswXVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNhbGN1bGF0ZWRfcHJpY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJbXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHQgY2FyZC10ZXh0LS1leHRyYVwiIHN0eWxlPVwiZGlzcGxheTogJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcltcImN1c3RvbV9maWVsZHNcIl0uZmluZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmaWVsZCkgPT4gZmllbGRbXCJuYW1lXCJdID09PSBcIl9fY2FyZC1leHRyYS1pbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJyZWxhdGl2ZTtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIm5vbmU7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcIj4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJjdXN0b21fZmllbGRzXCJdLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZmllbGQpID0+IGZpZWxkW1wibmFtZVwiXSA9PT0gXCJfX2NhcmQtZXh0cmEtaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByW1wiY3VzdG9tX2ZpZWxkc1wiXS5maW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmaWVsZCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkW1wibmFtZVwiXSA9PT0gXCJfX2NhcmQtZXh0cmEtaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWFjdGlvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2FjdGlvblNlY3Rpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPVwid2luZG93LmxvY2F0aW9uLmhyZWY9JHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJjdXN0b21fdXJsXCJdW1widXJsXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXByaW1hcnlcIiA+VmlldyBEZXRhaWxzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PmA7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3VzdG9tSW5zZXJ0aW9uU29ydChhcnIsIG4pIHtcbiAgICAgIGxldCBpLCBrZXksIGo7XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGtleSA9IGFycltpXVtcInRvdGFsX3NvbGRcIl07XG4gICAgICAgIGogPSBpIC0gMTtcblxuICAgICAgICAvKiBNb3ZlIGVsZW1lbnRzIG9mIGFyclswLi5pLTFdLCB0aGF0IGFyZSBcbiAgICAgICAgZ3JlYXRlciB0aGFuIGtleSwgdG8gb25lIHBvc2l0aW9uIGFoZWFkIFxuICAgICAgICBvZiB0aGVpciBjdXJyZW50IHBvc2l0aW9uICovXG4gICAgICAgIHdoaWxlIChqID49IDAgJiYgYXJyW2pdW1widG90YWxfc29sZFwiXSA+IGtleSkge1xuICAgICAgICAgIGFycltqICsgMV1bXCJ0b3RhbF9zb2xkXCJdID0gYXJyW2pdW1widG90YWxfc29sZFwiXTtcbiAgICAgICAgICBqID0gaiAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgYXJyW2ogKyAxXVtcInRvdGFsX3NvbGRcIl0gPSBrZXk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgfVxuXG4gIGNvbmZpZ3VyZUlzb3RvcGVGb3JBbGwoKSB7XG4gICAgLy8gJChcIi5ncmlkXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJncmlkXCIpO1xuICAgIC8vICAgJChcIi5sZHMtYmxvY2tcIikuaGlkZSgpO1xuICAgIGxldCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9kdWN0LWxpc3RpbmctYWxsXCIpO1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzO1xuXG4gICAgLy8gZm9yIHRlc3RpbmcsIGNvbW1lbnQgdGhpcyBzZWN0aW9uIGFuZCBjYWxsIHRoZSBydW5JbWFnZVRlc3QoKVxuICAgIGxldCBpc287XG4gICAgcnVuSXNvdG9wZSgpO1xuICAgIC8vIGlmICh0aGlzLmNoZWNrTW9iaWxlKCkpIHtcbiAgICAvLyAgIHJ1bkltYWdlVGVzdCgpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICAkKFwiLmdyaWRcIikuY3NzKFwiZGlzcGxheVwiLCBcImdyaWRcIik7XG4gICAgLy8gICAkKFwiLmxkcy1ibG9ja1wiKS5oaWRlKCk7XG4gICAgLy8gICBydW5Jc290b3BlKCk7XG4gICAgLy8gfVxuXG4gICAgLy8gcnVuSW1hZ2VUZXN0KCk7XG5cbiAgICAvLyBpdCB3aWxsIGNhbGwgcnVuSXNvdG9wZSgpIGlmIGFsbCBpbWFnZXMgYXJlIGxvYWRlZFxuICAgIGZ1bmN0aW9uIHJ1bkltYWdlVGVzdCgpIHtcbiAgICAgIC8vICAgJChcIi5ncmlkXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJncmlkXCIpO1xuICAgICAgLy8gICAkKFwiLmxkcy1ibG9ja1wiKS5oaWRlKCk7XG5cbiAgICAgIGxldCBpbWdMb2FkZWQgPSB0cnVlO1xuXG4gICAgICBsZXQgdGVzdEltZ0ludCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdmFyIGNhcmRJbWdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcIiNncmlkLWFsbC1wcm9kdWN0IC5jYXJkLWltYWdlXCJcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGNhcmRJbWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRJbWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9uWmVybyA9IHRydWU7XG4gICAgICAgICAgICBpZiAoY2FyZEltZ3NbaV0ub2Zmc2V0SGVpZ2h0IDwgMTAwKSB7XG4gICAgICAgICAgICAgIGltZ0xvYWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICBub25aZXJvID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vblplcm8pIHtcbiAgICAgICAgICAgICAgaW1nTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW1nTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW1nTG9hZGVkKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0ZXN0SW1nSW50KTtcbiAgICAgICAgICBydW5Jc290b3BlKCk7XG4gICAgICAgICAgLy8gYm9keS5jb25maWd1cmVJc290b3BlRm9yQWxsKCk7XG4gICAgICAgICAgLy8gYm9keS5zdGFydEdsb2JhbCgpO1xuICAgICAgICAgIC8vICQoXCIubGRzLWJsb2NrXCIpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSXNvdG9wZSgpIHtcbiAgICAgIC8vICQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICBpc28gPSBuZXcgSXNvdG9wZShncmlkLCB7XG4gICAgICAgIC8vIG9wdGlvbnMuLi5cbiAgICAgICAgaXRlbVNlbGVjdG9yOiBcIi5wcm9kdWN0XCIsXG4gICAgICAgIGxheW91dE1vZGU6IFwiZml0Um93c1wiLFxuXG4gICAgICAgIGdldFNvcnREYXRhOiB7XG4gICAgICAgICAgbmFtZTogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1uYW1lXCIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJpY2U6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcihpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2R1Y3QtcHJpY2VcIikpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmV2aWV3OiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJhdGluZ1wiKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJlc3Rfc2VsbGluZzogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtYmVzdC1zZWxsaW5nXCIpKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5ld2VzdDogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1kYXRlLWNyZWF0ZWRcIik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdXN0b21fc29ydF9vcmRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtY3VzdG9tLXNvcnRcIikpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY3VzdG9tX3NvcnRfbnVtOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1jdXN0b20tbnVtXCIpKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICAvLyB9KTtcbiAgICAgIC8vIH0sIDApO1xuXG4gICAgICAkKFwiI2FsbC1zb3J0LXNlbGVjdCwgI2FsbC1zb3J0LXNlbGVjdC1tb2JpbGVcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgdmFsID0gJCh0aGlzKS52YWwoKS5zcGxpdChcIi1cIik7XG5cbiAgICAgICAgaWYgKHZhbFswXSA9PT0gXCJyZXZpZXdcIikge1xuICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgIHNvcnRCeTogW3ZhbFswXV0sXG4gICAgICAgICAgICBzb3J0QXNjZW5kaW5nOiB7XG4gICAgICAgICAgICAgIHJldmlldzogZmFsc2UsXG4gICAgICAgICAgICAgIC8vIHJhdGluZ19jb3VudDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgIHNvcnRCeTogdmFsWzBdLFxuICAgICAgICAgICAgc29ydEFzY2VuZGluZzogdmFsWzFdID09PSBcImFzY1wiLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJChcIiNhbGwtc29ydC1zZWxlY3QsICNhbGwtc29ydC1zZWxlY3QtbW9iaWxlXCIpLnByb3AoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYm9keS5jb250ZXh0LnN1YmNhdGVnb3JpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgc29ydEJ5OiBcImN1c3RvbV9zb3J0X29yZGVyXCIsXG4gICAgICAgICAgICBzb3J0QXNjZW5kaW5nOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgIHNvcnRCeTogXCJjdXN0b21fc29ydF9udW1cIixcbiAgICAgICAgICAgIHNvcnRBc2NlbmRpbmc6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDMpO1xuXG4gICAgICBsZXQgcmVzaXplTGF5b3V0ID0gZmFsc2U7XG5cbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIHJlc2l6ZUxheW91dCA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIGlzby5vbihcImxheW91dENvbXBsZXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHJlc2l6ZUxheW91dCkge1xuICAgICAgICAgIHJlc2l6ZUxheW91dCA9IGZhbHNlO1xuICAgICAgICAgIGlzby5hcnJhbmdlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSVRTQ2F0ZWdvcnkge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG5cbiAgICBhZnRlckZhY2V0VXBkYXRlKCkge1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHVybFV0aWxzIGZyb20gJy4uL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuZGVmYXVsdFZpZXdUeXBlID0gdGhpcy5jb250ZXh0LmRlZmF1bHRWaWV3VHlwZTtcbiAgICAgICAgdGhpcy5vcHBvc2l0ZVZpZXdUeXBlID0gdGhpcy5kZWZhdWx0Vmlld1R5cGUgIT09ICdncmlkJyA/ICdncmlkJyA6ICdsaXN0JztcbiAgICAgICAgdGhpcy5wcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XG4gICAgICAgIHRoaXMubG9hZGluZ092ZXJsYXkgPSAkKCcubG9hZGluZ092ZXJsYXkubG9hZGluZ092ZXJsYXktLXByb2R1Y3QtbGlzdGluZycpO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignZmFjZXRlZFNlYXJjaFJlZnJlc2gnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZFRvZ2dsZUV2ZW50cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBnZXRTdG9yZWRWaWV3VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2NhdGVnb3J5LXZpZXctdHlwZScpIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0UmVxdWVzdFRlbXBsYXRlVHlwZSh0eXBlKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VUeXBlID0gdGhpcy5nZXRTdG9yZWRWaWV3VHlwZSgpO1xuICAgICAgICByZXR1cm4gIXBhZ2VUeXBlID8gYCR7dHlwZX0vcHJvZHVjdC1saXN0aW5nYCA6IGBjdXN0b20vY2F0ZWdvcnktJHtwYWdlVHlwZX0tdmlld2A7XG4gICAgfVxuXG4gICAgc3RvcmVWaWV3VHlwZSh0eXBlKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2NhdGVnb3J5LXZpZXctdHlwZScsIHR5cGUpO1xuICAgIH1cblxuICAgIGdldENhdGVnb3J5UGFnZShwYWdlVHlwZSkge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHRoaXMucHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IGBjdXN0b20vY2F0ZWdvcnktJHtwYWdlVHlwZX0tdmlld2AsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nT3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgYXBpLmdldFBhZ2UodXJsVXRpbHMuZ2V0VXJsKCksIGNvbmZpZywgKGVyciwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpLmh0bWwoY29udGVudCk7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZGluZ092ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3JlVmlld1R5cGUocGFnZVR5cGUpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZFRvZ2dsZUV2ZW50cygpO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ3Byb2R1Y3RWaWV3TW9kZUNoYW5nZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkVG9nZ2xlRXZlbnRzKCkge1xuICAgICAgICAkKCcuanMtY2F0ZWdvcnlfX3RvZ2dsZS12aWV3Jykub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgndmlldy10eXBlJyk7XG5cbiAgICAgICAgICAgIGlmICgkKGUuY3VycmVudFRhcmdldCkuaGFzQ2xhc3MoJ2FjdGl2ZS1jYXRlZ29yeS12aWV3JykpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yeVBhZ2UodHlwZSwgdGhpcy5hZGRUb2dnbGVFdmVudHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBjb25zdCBzdG9yZWRWaWV3VHlwZSA9IHRoaXMuZ2V0U3RvcmVkVmlld1R5cGUoKTtcblxuICAgICAgICBpZiAoc3RvcmVkVmlld1R5cGUgPT09IHRoaXMuZGVmYXVsdFZpZXdUeXBlIHx8ICFzdG9yZWRWaWV3VHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkVG9nZ2xlRXZlbnRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldENhdGVnb3J5UGFnZSh0aGlzLm9wcG9zaXRlVmlld1R5cGUpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=