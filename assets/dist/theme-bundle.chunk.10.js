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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS9pdHMtY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2N1c3RvbS90b2dnbGUtY2F0ZWdvcnktbGlzdGluZy12aWV3LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiX0NhdGFsb2dQYWdlIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJJVFNDYXRlZ29yeSIsInRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXciLCJUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IiwiX3Byb3RvIiwicHJvdG90eXBlIiwic2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMiLCIkZWxlbWVudCIsInJvbGVUeXBlIiwiYXJpYUxpdmVTdGF0dXMiLCJhdHRyIiwicm9sZSIsIm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUiLCJfdGhpczIiLCIkIiwibGVuZ3RoIiwiaGFzQ2xhc3MiLCJmb2N1cyIsIm9uIiwib25SZWFkeSIsIl90aGlzMyIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJuZXh0IiwiY29tcGFyZVByb2R1Y3RzIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsInNldExpdmVSZWdpb25zQXR0cmlidXRlcyIsImFyaWFOb3RpZnlOb1Byb2R1Y3RzIiwidmFsaWRhdGVQcm9kdWN0c0NvdW50IiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwiX3RoaXM0IiwiX3RoaXMkdmFsaWRhdGlvbkRpY3RpIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwiZ2V0UmVxdWVzdFRlbXBsYXRlVHlwZSIsInNpZGViYXIiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJhZnRlckZhY2V0VXBkYXRlIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJOZXdPcHRzIiwidXBkYXRlUmVxdWVzdE9wdGlvbnMiLCJzdGFydEdsb2JhbCIsImN1c3RvbUdsb2JhbCIsImRpc2FibGVWaWV3RGV0YWlsQnV0dG9uIiwib2ZmIiwicHJvcCIsImJvZHkiLCJVVUlEY2F0YyIsImNhdGVnb3J5SWQiLCJudW0iLCJleGlzdFByb2RJZCIsImZvckVhY2giLCJwciIsInB1c2giLCJpZCIsImF4aW9zIiwiZ2V0IiwicGFyYW1zIiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsInByb2R1Y3QiLCJyZXN0T2ZUZW1wbGF0ZSIsImluY2x1ZGVzIiwiJGl0ZW0iLCJ0b3RhbF9zb2xkIiwiaXRlbSIsImN1c3RvbUluc2VydGlvblNvcnQiLCJjb25zdHJ1Y3RUZW1wbGF0ZSIsImFwcGVuZCIsImhpZGUiLCJjb25maWd1cmVJc290b3BlRm9yQWxsIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiaW1nIiwiaSIsImFjdGlvblNlY3Rpb24iLCJ0b0ZpeGVkIiwic2FsZV9wcmljZSIsInJldGFpbF9wcmljZSIsImZpbmQiLCJmaWVsZCIsInVuZGVmaW5lZCIsInZhbHVlIiwiYXJyIiwibiIsImtleSIsImoiLCJncmlkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlzbyIsInJ1bklzb3RvcGUiLCJydW5JbWFnZVRlc3QiLCJpbWdMb2FkZWQiLCJ0ZXN0SW1nSW50Iiwic2V0SW50ZXJ2YWwiLCJjYXJkSW1ncyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJub25aZXJvIiwib2Zmc2V0SGVpZ2h0IiwiY2xlYXJJbnRlcnZhbCIsIklzb3RvcGUiLCJpdGVtU2VsZWN0b3IiLCJsYXlvdXRNb2RlIiwiZ2V0U29ydERhdGEiLCJuYW1lIiwiaXRlbUVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJwcmljZSIsIk51bWJlciIsInJldmlldyIsImJlc3Rfc2VsbGluZyIsIm5ld2VzdCIsImN1c3RvbV9zb3J0X29yZGVyIiwiY3VzdG9tX3NvcnRfbnVtIiwiY2hhbmdlIiwidmFsIiwic3BsaXQiLCJhcnJhbmdlIiwic29ydEJ5Iiwic29ydEFzY2VuZGluZyIsInNldFRpbWVvdXQiLCJzdWJjYXRlZ29yaWVzIiwicmVzaXplTGF5b3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiYXJndW1lbnRzIiwiSlNPTiIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiLCJkZWZhdWx0Vmlld1R5cGUiLCJvcHBvc2l0ZVZpZXdUeXBlIiwibG9hZGluZ092ZXJsYXkiLCJhZGRUb2dnbGVFdmVudHMiLCJpbml0IiwiZ2V0U3RvcmVkVmlld1R5cGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ0eXBlIiwicGFnZVR5cGUiLCJzdG9yZVZpZXdUeXBlIiwic2V0SXRlbSIsImdldENhdGVnb3J5UGFnZSIsInNob3ciLCJhcGkiLCJnZXRQYWdlIiwidXJsVXRpbHMiLCJnZXRVcmwiLCJlcnIiLCJFcnJvciIsInN0b3JlZFZpZXdUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDb0I7QUFDSjtBQUNtQztBQUN2QztBQUM4QjtBQUMvQjtBQUFBLElBRTFCQSxRQUFRLDBCQUFBQyxZQUFBO0VBQUFDLGNBQUEsQ0FBQUYsUUFBQSxFQUFBQyxZQUFBO0VBQzNCLFNBQUFELFNBQVlHLE9BQU8sRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDbkJBLEtBQUEsR0FBQUgsWUFBQSxDQUFBSSxJQUFBLE9BQU1GLE9BQU8sQ0FBQztJQUNkQyxLQUFBLENBQUtFLG9CQUFvQixHQUFHQywwR0FBMkIsQ0FBQ0osT0FBTyxDQUFDOztJQUVoRTtBQUNKO0FBQ0E7SUFDSUMsS0FBQSxDQUFLSSxXQUFXLEdBQUcsSUFBSUEsNERBQVcsQ0FBQ0wsT0FBTyxDQUFDO0lBQzNDQyxLQUFBLENBQUtLLHlCQUF5QixHQUFHLElBQUlDLDRFQUF5QixDQUFDUCxPQUFPLENBQUM7SUFBQyxPQUFBQyxLQUFBO0VBQzFFO0VBQUMsSUFBQU8sTUFBQSxHQUFBWCxRQUFBLENBQUFZLFNBQUE7RUFBQUQsTUFBQSxDQUVERSx1QkFBdUIsR0FBdkIsU0FBQUEsd0JBQXdCQyxRQUFRLEVBQUVDLFFBQVEsRUFBRUMsY0FBYyxFQUFFO0lBQzFERixRQUFRLENBQUNHLElBQUksQ0FBQztNQUNaQyxJQUFJLEVBQUVILFFBQVE7TUFDZCxXQUFXLEVBQUVDO0lBQ2YsQ0FBQyxDQUFDO0VBQ0osQ0FBQztFQUFBTCxNQUFBLENBRURRLCtCQUErQixHQUEvQixTQUFBQSxnQ0FBQSxFQUFrQztJQUFBLElBQUFDLE1BQUE7SUFDaEMsSUFBSSxDQUFDQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQ0MsTUFBTSxFQUFFO0lBRXZDLElBQUlELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDRSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7TUFDOUNGLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDRyxLQUFLLEVBQUU7SUFDekM7SUFFQUgsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7TUFBQSxPQUNoQ0wsTUFBSSxDQUFDUCx1QkFBdUIsQ0FDMUJRLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxFQUM5QixRQUFRLEVBQ1IsV0FBVyxDQUNaO0lBQUEsRUFDRjtFQUNILENBQUM7RUFBQVYsTUFBQSxDQUVEZSxPQUFPLEdBQVAsU0FBQUEsUUFBQSxFQUFVO0lBQUEsSUFBQUMsTUFBQTtJQUNSLElBQUksQ0FBQ0Msb0JBQW9CLEVBQUU7SUFFM0JQLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDSSxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUNJLENBQUM7TUFBQSxPQUMvQ0YsTUFBSSxDQUFDZCx1QkFBdUIsQ0FDMUJRLENBQUMsQ0FBQ1EsQ0FBQyxDQUFDQyxhQUFhLENBQUMsQ0FBQ0MsSUFBSSxFQUFFLEVBQ3pCLFFBQVEsRUFDUixRQUFRLENBQ1Q7SUFBQSxFQUNGO0lBRUQsSUFBSSxDQUFDWiwrQkFBK0IsRUFBRTtJQUV0Q2Esd0VBQWUsQ0FBQyxJQUFJLENBQUM3QixPQUFPLENBQUM7SUFFN0IsSUFBSWtCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ2xDLElBQUksQ0FBQ1csaUJBQWlCLEVBQUU7SUFDMUIsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDQyxjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7TUFDcERDLGdFQUFLLENBQUNYLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUNTLGNBQWMsQ0FBQztJQUNuRDtJQUVBYixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7TUFBQSxPQUMzQkUsTUFBSSxDQUFDVSx3QkFBd0IsQ0FBQ2hCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7SUFBQSxFQUMzRTtJQUVELElBQUksQ0FBQ2lCLG9CQUFvQixFQUFFO0lBQzNCLElBQUksQ0FBQ0MscUJBQXFCLEVBQUU7RUFDOUIsQ0FBQztFQUFBNUIsTUFBQSxDQUVEMkIsb0JBQW9CLEdBQXBCLFNBQUFBLHFCQUFBLEVBQXVCO0lBQ3JCLElBQU1FLGtCQUFrQixHQUFHbkIsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDO0lBQy9ELElBQUltQixrQkFBa0IsQ0FBQ2xCLE1BQU0sRUFBRTtNQUM3QmtCLGtCQUFrQixDQUFDaEIsS0FBSyxFQUFFO0lBQzVCO0VBQ0YsQ0FBQztFQUFBYixNQUFBLENBRURzQixpQkFBaUIsR0FBakIsU0FBQUEsa0JBQUEsRUFBb0I7SUFBQSxJQUFBUSxNQUFBO0lBQ2xCLElBQUFDLHFCQUFBLEdBTUksSUFBSSxDQUFDcEMsb0JBQW9CO01BTExxQyxlQUFlLEdBQUFELHFCQUFBLENBQXJDRSxvQkFBb0I7TUFDRUMsZUFBZSxHQUFBSCxxQkFBQSxDQUFyQ0ksb0JBQW9CO01BQ0dDLGtCQUFrQixHQUFBTCxxQkFBQSxDQUF6Q00scUJBQXFCO01BQ0VDLGtCQUFrQixHQUFBUCxxQkFBQSxDQUF6Q1EscUJBQXFCO01BQ0FDLGNBQWMsR0FBQVQscUJBQUEsQ0FBbkNVLG1CQUFtQjtJQUVyQixJQUFNQyx3QkFBd0IsR0FBR2hDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQztJQUNoRSxJQUFNaUMsdUJBQXVCLEdBQUdqQyxDQUFDLENBQUMsMkJBQTJCLENBQUM7SUFDOUQsSUFBTWtDLGVBQWUsR0FBRyxJQUFJLENBQUNwRCxPQUFPLENBQUNxRCx1QkFBdUI7SUFDNUQsSUFBTUMsY0FBYyxHQUFHO01BQ3JCQyxNQUFNLEVBQUU7UUFDTkMsUUFBUSxFQUFFO1VBQ1JDLGFBQWEsRUFBRSxJQUFJO1VBQ25CQyxRQUFRLEVBQUU7WUFDUkMsS0FBSyxFQUFFUDtVQUNUO1FBQ0Y7TUFDRixDQUFDO01BQ0RRLFFBQVEsRUFBRTtRQUNSQyxjQUFjLEVBQ1osSUFBSSxDQUFDdkQseUJBQXlCLENBQUN3RCxzQkFBc0IsQ0FBQyxVQUFVLENBQUM7UUFDbkVDLE9BQU8sRUFBRTtNQUNYLENBQUM7TUFDREMsUUFBUSxFQUFFO0lBQ1osQ0FBQztJQUVELElBQUksQ0FBQ0MsYUFBYSxHQUFHLElBQUlDLDhEQUFhLENBQ3BDWixjQUFjLEVBQ2QsVUFBQ2EsT0FBTyxFQUFLO01BQ1hqQix3QkFBd0IsQ0FBQ2tCLElBQUksQ0FBQ0QsT0FBTyxDQUFDTixjQUFjLENBQUM7TUFDckRWLHVCQUF1QixDQUFDaUIsSUFBSSxDQUFDRCxPQUFPLENBQUNKLE9BQU8sQ0FBQztNQUU3QzdDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ21ELGNBQWMsQ0FBQyxjQUFjLENBQUM7TUFFeENuRCxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUNvRCxPQUFPLENBQ3JCO1FBQ0VDLFNBQVMsRUFBRTtNQUNiLENBQUMsRUFDRCxHQUFHLENBQ0o7O01BRUQ7QUFDUjtBQUNBO01BQ1FqQyxNQUFJLENBQUNqQyxXQUFXLENBQUNtRSxnQkFBZ0IsRUFBRTtJQUNyQyxDQUFDLEVBQ0Q7TUFDRUMsdUJBQXVCLEVBQUU7UUFDdkJqQyxlQUFlLEVBQWZBLGVBQWU7UUFDZkUsZUFBZSxFQUFmQSxlQUFlO1FBQ2ZFLGtCQUFrQixFQUFsQkEsa0JBQWtCO1FBQ2xCRSxrQkFBa0IsRUFBbEJBLGtCQUFrQjtRQUNsQkUsY0FBYyxFQUFkQTtNQUNGO0lBQ0YsQ0FBQyxDQUNGO0lBRUQ5QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNJLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxZQUFNO01BQzNDLElBQU1vRCxPQUFPLEdBQUc7UUFDZG5CLE1BQU0sRUFBRTtVQUNOQyxRQUFRLEVBQUU7WUFDUkMsYUFBYSxFQUFFLElBQUk7WUFDbkJDLFFBQVEsRUFBRTtjQUNSQyxLQUFLLEVBQUVQO1lBQ1Q7VUFDRjtRQUNGLENBQUM7UUFDRFEsUUFBUSxFQUFFO1VBQ1JDLGNBQWMsRUFDWnZCLE1BQUksQ0FBQ2hDLHlCQUF5QixDQUFDd0Qsc0JBQXNCLENBQUMsVUFBVSxDQUFDO1VBQ25FQyxPQUFPLEVBQUU7UUFDWCxDQUFDO1FBQ0RDLFFBQVEsRUFBRTtNQUNaLENBQUM7TUFFRDFCLE1BQUksQ0FBQzJCLGFBQWEsQ0FBQ1Usb0JBQW9CLENBQUNELE9BQU8sQ0FBQztJQUNsRCxDQUFDLENBQUM7RUFDSixDQUFDO0VBQUFsRSxNQUFBLENBRURvRSxXQUFXLEdBQVgsU0FBQUEsWUFBQSxFQUFjO0lBQ1pDLGtFQUFZLENBQUMsSUFBSSxDQUFDN0UsT0FBTyxDQUFDO0VBQzVCLENBQUM7RUFBQVEsTUFBQSxDQUVEc0UsdUJBQXVCLEdBQXZCLFNBQUFBLHdCQUFBLEVBQTBCO0lBQ3hCNUQsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM2RCxHQUFHLENBQUMsT0FBTyxDQUFDO0VBQ3hDLENBQUM7RUFBQXZFLE1BQUEsQ0FFRDRCLHFCQUFxQixHQUFyQixTQUFBQSxzQkFBQSxFQUF3QjtJQUN0QmxCLENBQUMsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDOEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7SUFDckUsSUFBTXRCLFFBQVEsR0FBRyxJQUFJLENBQUMxRCxPQUFPLENBQUMwRCxRQUFRO0lBQ3RDLElBQU11QixJQUFJLEdBQUcsSUFBSTtJQUNqQixJQUFNQyxRQUFRLEdBQUcsSUFBSSxDQUFDbEYsT0FBTyxDQUFDa0YsUUFBUTtJQUN0QyxJQUFNQyxVQUFVLEdBQUcsSUFBSSxDQUFDbkYsT0FBTyxDQUFDbUYsVUFBVTtJQUMxQyxJQUFJQyxHQUFHLEdBQUcsSUFBSSxDQUFDcEYsT0FBTyxDQUFDb0YsR0FBRztJQUMxQjtJQUNBLElBQU1DLFdBQVcsR0FBRyxFQUFFO0lBQ3RCM0IsUUFBUSxDQUFDNEIsT0FBTyxDQUFDLFVBQUNDLEVBQUUsRUFBSztNQUN2QkYsV0FBVyxDQUFDRyxJQUFJLENBQUNELEVBQUUsQ0FBQ0UsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQztJQUNGO0lBQ0FDLEtBQUssQ0FDRkMsR0FBRyxDQUFDLGtEQUFrRCxFQUFFO01BQ3ZEQyxNQUFNLEVBQUU7UUFBRUgsRUFBRSxFQUFFTjtNQUFXO0lBQzNCLENBQUMsQ0FBQyxDQUNEVSxJQUFJLENBQUMsVUFBVUMsUUFBUSxFQUFFO01BQ3hCLElBQU1DLElBQUksR0FBR0QsUUFBUSxDQUFDQyxJQUFJLENBQUNDLE9BQU87TUFDbEMsSUFBSUMsY0FBYyxHQUFHLEVBQUU7TUFDdkJGLElBQUksQ0FBQ1QsT0FBTyxDQUFDLFVBQUNDLEVBQUUsRUFBSztRQUNuQixJQUFJRixXQUFXLENBQUNhLFFBQVEsQ0FBQ1gsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7VUFDbEMsSUFBTVksS0FBSyxHQUFHakYsQ0FBQyxnQ0FBNkJxRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQUs7VUFDekRZLEtBQUssQ0FBQ3JGLElBQUksQ0FBQyxtQkFBbUIsT0FBS3lFLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBRztVQUN0RFksS0FBSyxDQUFDckYsSUFBSSxDQUFDLG1CQUFtQixPQUFLeUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFHO1FBQzFELENBQUMsTUFBTSxJQUFJN0IsUUFBUSxDQUFDdkMsTUFBTSxHQUFHLEVBQUUsRUFBQztVQUM5QjhFLGNBQWMsQ0FBQ1QsSUFBSSxDQUFDO1lBQUVZLFVBQVUsRUFBRWIsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUFFYyxJQUFJLEVBQUVkO1VBQUcsQ0FBQyxDQUFDO1FBQ2pFO01BQ0YsQ0FBQyxDQUFDO01BQ0ZVLGNBQWMsR0FBR0ssbUJBQW1CLENBQ2xDTCxjQUFjLEVBQ2RBLGNBQWMsQ0FBQzlFLE1BQU0sQ0FDdEI7TUFFRDhFLGNBQWMsQ0FBQ1gsT0FBTyxDQUFDLFVBQUNDLEVBQUUsRUFBSztRQUM3QixJQUFNM0IsUUFBUSxHQUFHMkMsaUJBQWlCLENBQUNoQixFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUVILEdBQUcsQ0FBQztRQUNuREEsR0FBRyxHQUFHQSxHQUFHLEdBQUcsQ0FBQztRQUNibEUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUNzRixNQUFNLENBQUM1QyxRQUFRLENBQUM7TUFDNUMsQ0FBQyxDQUFDO01BRUYxQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUN1RixJQUFJLEVBQUU7TUFDekJ4QixJQUFJLENBQUN5QixzQkFBc0IsRUFBRTtNQUM3QnpCLElBQUksQ0FBQ0wsV0FBVyxFQUFFO01BQ2xCSyxJQUFJLENBQUNILHVCQUF1QixFQUFFO0lBQ2hDLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQzZCLEtBQUssRUFBSztNQUNoQkMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLEtBQUssQ0FBQztJQUNwQixDQUFDLENBQUM7SUFFSixTQUFTSixpQkFBaUJBLENBQUNoQixFQUFFLEVBQUVILEdBQUcsRUFBRTtNQUNsQyxJQUFJMEIsR0FBRyxHQUFHLENBQUMsQ0FBQztNQUNaLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHeEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDcEUsTUFBTSxFQUFFNEYsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsSUFBSXhCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQ3dCLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1VBQ25DRCxHQUFHLEdBQUd2QixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUN3QixDQUFDLENBQUM7VUFDckI7UUFDRjtNQUNGO01BRUEsSUFBSUMsYUFBYSxHQUFHLEVBQUU7TUFDdEIsSUFBSXpCLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQ3BFLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDN0I2RixhQUFhLCtHQUF3R3pCLEVBQUUsQ0FBQyxJQUFJLENBQUMsNkJBQXlCO01BQ3hKLENBQUMsTUFBTTtRQUNMeUIsYUFBYSwrS0FHdUJ6QixFQUFFLENBQUMsSUFBSSxDQUFDLFNBQUlMLFFBQVEsK1RBRzhFSyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQUlMLFFBQVEsOEJBQXVCSyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQUlMLFFBQVEsd3pDQXNCL0VLLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBSUwsUUFBUSxnTkFBNExLLEVBQUUsQ0FBQyxJQUFJLENBQUMsMk9BR3JVO01BQ1g7TUFFQSxJQUFNM0IsUUFBUSxzQ0FDUzJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQWlCQSxFQUFFLENBQUMsWUFBWSxDQUFDLDRFQUVuQ0EsRUFBRSxDQUFDLFlBQVksQ0FBQyxtQ0FDNUJBLEVBQUUsQ0FBQyxNQUFNLENBQUMseUNBQ0pBLEVBQUUsQ0FBQyxjQUFjLENBQUMscUNBRW5DQSxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUNyQixDQUFDLEdBQ0RBLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHQSxFQUFFLENBQUMsZUFBZSxDQUFDLDhDQUU1QkEsRUFBRSxDQUFDLGVBQWUsQ0FBQyw2Q0FFekNBLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQ3BFLE1BQU0sR0FBRyxDQUFDLEdBQ3JCb0UsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMwQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQ2hEMUIsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMwQixPQUFPLENBQUMsQ0FBQyxDQUFDLDRDQUVsQjFCLEVBQUUsQ0FBQyxjQUFjLENBQUMsNkNBQ2hCQSxFQUFFLENBQUMsYUFBYSxDQUFDLDJDQUNuQkEsRUFBRSxDQUFDLFlBQVksQ0FBQyx5Q0FDakJBLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyx3Q0FDeEJILEdBQUcsbWFBWTBCRyxFQUFFLENBQUMsSUFBSSxDQUFDLDZJQUd0Q0EsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsVUFBVSxLQUFLLENBQUMsR0FDOUIsUUFBUSxHQUNSLE9BQU8saUdBRUYzQixFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLDRHQUVwQkEsRUFBRSxDQUFDLE1BQU0sQ0FBQyx3Q0FFdEJBLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQ3BFLE1BQU0sR0FBRyxDQUFDLEdBQ3JCb0UsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMwQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQ2hEMUIsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMwQixPQUFPLENBQUMsQ0FBQyxDQUFDLDhIQUduQkgsR0FBRyxDQUFDLGVBQWUsQ0FBQyxvRkFFOUJ2QixFQUFFLENBQUMsY0FBYyxDQUFDLGdIQUdWdUIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxrREFDM0JBLEdBQUcsQ0FBQyxjQUFjLENBQUMsbURBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLG1EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsbURBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLG9EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxvREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsbUVBQ05BLEdBQUcsQ0FBQyxjQUFjLENBQUMsa0RBQ2hDQSxHQUFHLENBQUMsY0FBYyxDQUFDLG1EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxtREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsbURBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLG1EQUNuQkEsR0FBRyxDQUFDLGNBQWMsQ0FBQyxvREFDbkJBLEdBQUcsQ0FBQyxjQUFjLENBQUMsb0RBQ25CQSxHQUFHLENBQUMsY0FBYyxDQUFDLCtpQkFVWHZCLEVBQUUsQ0FBQyxjQUFjLENBQUMsa0hBRWZBLEVBQUUsQ0FBQyxNQUFNLENBQUMsOENBRXZCQSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUNwRSxNQUFNLEdBQUcsQ0FBQyxHQUNyQm9FLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDZixrQkFBa0IsQ0FDbkIsQ0FBQzBCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FDWjFCLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDMEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxtREFFakMxQixFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLDJDQUM3QkEsRUFBRSxDQUFDLE1BQU0sQ0FBQyw0SkFHR0EsRUFBRSxDQUFDLEtBQUssQ0FBQyxpZ0JBT2hCQSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMyQixVQUFVLEtBQUssQ0FBQyxHQUM5QixHQUFHLEdBQUczQixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM0QixZQUFZLEdBQ3BDLEVBQUUsNDFCQVlWNUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDcEUsTUFBTSxHQUFHLENBQUMsR0FDckJvRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2Ysa0JBQWtCLENBQ25CLENBQUMwQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQ1oxQixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQzBCLE9BQU8sQ0FBQyxDQUFDLENBQUMsOEtBSzNDMUIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDNkIsSUFBSSxDQUN0QixVQUFDQyxLQUFLO1FBQUEsT0FBS0EsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLG1CQUFtQjtNQUFBLEVBQ2pELEtBQUtDLFNBQVMsR0FDWCxXQUFXLEdBQ1gsT0FBTywyQ0FHWC9CLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQzZCLElBQUksQ0FDdEIsVUFBQ0MsS0FBSztRQUFBLE9BQUtBLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxtQkFBbUI7TUFBQSxFQUNqRCxLQUFLQyxTQUFTLEdBQ1gvQixFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM2QixJQUFJLENBQ3RCLFVBQUNDLEtBQUs7UUFBQSxPQUNKQSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssbUJBQW1CO01BQUEsRUFDeEMsQ0FBQ0UsS0FBSyxHQUNQLEVBQUUsMkdBR0ZQLGFBQWEsK0ZBRWJ6QixFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLG9PQU90QztNQUNYLE9BQU8zQixRQUFRO0lBQ2pCO0lBRUEsU0FBUzBDLG1CQUFtQkEsQ0FBQ2tCLEdBQUcsRUFBRUMsQ0FBQyxFQUFFO01BQ25DLElBQUlWLENBQUMsRUFBRVcsR0FBRyxFQUFFQyxDQUFDO01BQ2IsS0FBS1osQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHVSxDQUFDLEVBQUVWLENBQUMsRUFBRSxFQUFFO1FBQ3RCVyxHQUFHLEdBQUdGLEdBQUcsQ0FBQ1QsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBQzFCWSxDQUFDLEdBQUdaLENBQUMsR0FBRyxDQUFDOztRQUVUO0FBQ1I7QUFDQTtRQUNRLE9BQU9ZLENBQUMsSUFBSSxDQUFDLElBQUlILEdBQUcsQ0FBQ0csQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUdELEdBQUcsRUFBRTtVQUMzQ0YsR0FBRyxDQUFDRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUdILEdBQUcsQ0FBQ0csQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1VBQy9DQSxDQUFDLEdBQUdBLENBQUMsR0FBRyxDQUFDO1FBQ1g7UUFDQUgsR0FBRyxDQUFDRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUdELEdBQUc7TUFDaEM7TUFDQSxPQUFPRixHQUFHO0lBQ1o7RUFDRixDQUFDO0VBQUFoSCxNQUFBLENBRURrRyxzQkFBc0IsR0FBdEIsU0FBQUEsdUJBQUEsRUFBeUI7SUFDdkI7SUFDQTtJQUNBLElBQUlrQixJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLHFCQUFxQixDQUFDO0lBQ3pELElBQU03QyxJQUFJLEdBQUcsSUFBSTs7SUFFakI7SUFDQSxJQUFJOEMsR0FBRztJQUNQQyxVQUFVLEVBQUU7SUFDWjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7SUFFQTs7SUFFQTtJQUNBLFNBQVNDLFlBQVlBLENBQUEsRUFBRztNQUN0QjtNQUNBOztNQUVBLElBQUlDLFNBQVMsR0FBRyxJQUFJO01BRXBCLElBQUlDLFVBQVUsR0FBR0MsV0FBVyxDQUFDLFlBQU07UUFDakMsSUFBSUMsUUFBUSxHQUFHUixRQUFRLENBQUNTLGdCQUFnQixDQUN0QywrQkFBK0IsQ0FDaEM7UUFDRCxJQUFJRCxRQUFRLENBQUNsSCxNQUFNLEdBQUcsQ0FBQyxFQUFFO1VBQ3ZCLEtBQUssSUFBSTRGLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3NCLFFBQVEsQ0FBQ2xILE1BQU0sRUFBRTRGLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUl3QixPQUFPLEdBQUcsSUFBSTtZQUNsQixJQUFJRixRQUFRLENBQUN0QixDQUFDLENBQUMsQ0FBQ3lCLFlBQVksR0FBRyxHQUFHLEVBQUU7Y0FDbENOLFNBQVMsR0FBRyxLQUFLO2NBQ2pCSyxPQUFPLEdBQUcsS0FBSztjQUNmO1lBQ0Y7WUFDQSxJQUFJQSxPQUFPLEVBQUU7Y0FDWEwsU0FBUyxHQUFHLElBQUk7WUFDbEI7VUFDRjtRQUNGLENBQUMsTUFBTTtVQUNMQSxTQUFTLEdBQUcsS0FBSztRQUNuQjtRQUVBLElBQUlBLFNBQVMsRUFBRTtVQUNiTyxhQUFhLENBQUNOLFVBQVUsQ0FBQztVQUN6QkgsVUFBVSxFQUFFO1VBQ1o7VUFDQTtVQUNBO1FBQ0Y7TUFDRixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ1A7SUFFQSxTQUFTQSxVQUFVQSxDQUFBLEVBQUc7TUFDcEI7TUFDQTs7TUFFQUQsR0FBRyxHQUFHLElBQUlXLE9BQU8sQ0FBQ2QsSUFBSSxFQUFFO1FBQ3RCO1FBQ0FlLFlBQVksRUFBRSxVQUFVO1FBQ3hCQyxVQUFVLEVBQUUsU0FBUztRQUVyQkMsV0FBVyxFQUFFO1VBQ1hDLElBQUksRUFBRSxTQUFBQSxLQUFVQyxRQUFRLEVBQUU7WUFDeEIsT0FBT0EsUUFBUSxDQUFDQyxZQUFZLENBQUMsV0FBVyxDQUFDO1VBQzNDLENBQUM7VUFDREMsS0FBSyxFQUFFLFNBQUFBLE1BQVVGLFFBQVEsRUFBRTtZQUN6QixPQUFPRyxNQUFNLENBQUNILFFBQVEsQ0FBQ0MsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUM7VUFDNUQsQ0FBQztVQUNERyxNQUFNLEVBQUUsU0FBQUEsT0FBVUosUUFBUSxFQUFFO1lBQzFCLE9BQU9BLFFBQVEsQ0FBQ0MsWUFBWSxDQUFDLGFBQWEsQ0FBQztVQUM3QyxDQUFDO1VBQ0RJLFlBQVksRUFBRSxTQUFBQSxhQUFVTCxRQUFRLEVBQUU7WUFDaEMsT0FBT0csTUFBTSxDQUFDSCxRQUFRLENBQUNDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1VBQzNELENBQUM7VUFDREssTUFBTSxFQUFFLFNBQUFBLE9BQVVOLFFBQVEsRUFBRTtZQUMxQixPQUFPQSxRQUFRLENBQUNDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztVQUNuRCxDQUFDO1VBQ0RNLGlCQUFpQixFQUFFLFNBQUFBLGtCQUFVUCxRQUFRLEVBQUU7WUFDckMsT0FBT0csTUFBTSxDQUFDSCxRQUFRLENBQUNDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1VBQzFELENBQUM7VUFDRE8sZUFBZSxFQUFFLFNBQUFBLGdCQUFVUixRQUFRLEVBQUU7WUFDbkMsT0FBT0csTUFBTSxDQUFDSCxRQUFRLENBQUNDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1VBQ3pEO1FBQ0Y7TUFDRixDQUFDLENBQUM7TUFDRjtNQUNBOztNQUVBOUgsQ0FBQyxDQUFDLDJDQUEyQyxDQUFDLENBQUNzSSxNQUFNLENBQUMsWUFBWTtRQUNoRSxJQUFNQyxHQUFHLEdBQUd2SSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUN1SSxHQUFHLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUVwQyxJQUFJRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO1VBQ3ZCMUIsR0FBRyxDQUFDNEIsT0FBTyxDQUFDO1lBQ1ZDLE1BQU0sRUFBRSxDQUFDSCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEJJLGFBQWEsRUFBRTtjQUNiVixNQUFNLEVBQUU7Y0FDUjtZQUNGO1VBQ0YsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxNQUFNO1VBQ0xwQixHQUFHLENBQUM0QixPQUFPLENBQUM7WUFDVkMsTUFBTSxFQUFFSCxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2RJLGFBQWEsRUFBRUosR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLO1VBQzVCLENBQUMsQ0FBQztRQUNKO01BQ0YsQ0FBQyxDQUFDO01BRUZ2SSxDQUFDLENBQUMsMkNBQTJDLENBQUMsQ0FBQzhELElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDO01BRXRFOEUsVUFBVSxDQUFDLFlBQVk7UUFDckIsSUFBSTdFLElBQUksQ0FBQ2pGLE9BQU8sQ0FBQytKLGFBQWEsQ0FBQzVJLE1BQU0sS0FBSyxDQUFDLEVBQUU7VUFDM0M0RyxHQUFHLENBQUM0QixPQUFPLENBQUM7WUFDVkMsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQkMsYUFBYSxFQUFFO1VBQ2pCLENBQUMsQ0FBQztRQUNKLENBQUMsTUFBTTtVQUNMOUIsR0FBRyxDQUFDNEIsT0FBTyxDQUFDO1lBQ1ZDLE1BQU0sRUFBRSxpQkFBaUI7WUFDekJDLGFBQWEsRUFBRTtVQUNqQixDQUFDLENBQUM7UUFDSjtNQUNGLENBQUMsRUFBRSxDQUFDLENBQUM7TUFFTCxJQUFJRyxZQUFZLEdBQUcsS0FBSztNQUV4QkMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUNDLEtBQUssRUFBSztRQUNwQ0YsWUFBWSxHQUFHLElBQUk7TUFDckIsQ0FBQyxDQUFDO01BQ0ZqQyxHQUFHLENBQUN6RyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsWUFBWTtRQUNuQyxJQUFJMEksWUFBWSxFQUFFO1VBQ2hCQSxZQUFZLEdBQUcsS0FBSztVQUNwQmpDLEdBQUcsQ0FBQzRCLE9BQU8sRUFBRTtVQUNiO1FBQ0Y7UUFDQTtNQUNGLENBQUMsQ0FBQztJQUNKO0VBQ0YsQ0FBQztFQUFBLE9BQUE5SixRQUFBO0FBQUEsRUExakJtQ3NLLGdEQUFXOzs7Ozs7Ozs7Ozs7OztBQ1RqRDtBQUFBO0FBQUEsSUFBTUMsWUFBWSxHQUFHLGNBQWM7QUFDbkMsSUFBTUMsK0JBQStCLEdBQUcsU0FBbENBLCtCQUErQkEsQ0FBSUMsVUFBVTtFQUFBLE9BQUssQ0FBQyxDQUFDQyxNQUFNLENBQUNDLElBQUksQ0FBQ0YsVUFBVSxDQUFDRixZQUFZLENBQUMsQ0FBQyxDQUFDakosTUFBTTtBQUFBO0FBQ3RHLElBQU1zSixzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXNCQSxDQUFBLEVBQThCO0VBQ3RELEtBQUssSUFBSTFELENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRzJELFNBQUEsQ0FBbUJ2SixNQUFNLEVBQUU0RixDQUFDLEVBQUUsRUFBRTtJQUNoRCxJQUFNdUQsVUFBVSxHQUFHSyxJQUFJLENBQUNDLEtBQUssQ0FBb0I3RCxDQUFDLFFBQUEyRCxTQUFBLENBQUF2SixNQUFBLElBQUQ0RixDQUFDLEdBQUFPLFNBQUEsR0FBQW9ELFNBQUEsQ0FBRDNELENBQUMsRUFBRTtJQUNwRCxJQUFJc0QsK0JBQStCLENBQUNDLFVBQVUsQ0FBQyxFQUFFO01BQzdDLE9BQU9BLFVBQVU7SUFDckI7RUFDSjtBQUNKLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBTWxLLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBMkJBLENBQUlKLE9BQU8sRUFBSztFQUNwRCxJQUFRNkssd0JBQXdCLEdBQXdFN0ssT0FBTyxDQUF2RzZLLHdCQUF3QjtJQUFFQyxnQ0FBZ0MsR0FBc0M5SyxPQUFPLENBQTdFOEssZ0NBQWdDO0lBQUVDLCtCQUErQixHQUFLL0ssT0FBTyxDQUEzQytLLCtCQUErQjtFQUNuRyxJQUFNQyxnQkFBZ0IsR0FBR1Asc0JBQXNCLENBQUNJLHdCQUF3QixFQUFFQyxnQ0FBZ0MsRUFBRUMsK0JBQStCLENBQUM7RUFDNUksSUFBTUUsYUFBYSxHQUFHVixNQUFNLENBQUNXLE1BQU0sQ0FBQ0YsZ0JBQWdCLENBQUNaLFlBQVksQ0FBQyxDQUFDO0VBQ25FLElBQU1lLGVBQWUsR0FBR1osTUFBTSxDQUFDQyxJQUFJLENBQUNRLGdCQUFnQixDQUFDWixZQUFZLENBQUMsQ0FBQyxDQUFDZ0IsR0FBRyxDQUFDLFVBQUExRCxHQUFHO0lBQUEsT0FBSUEsR0FBRyxDQUFDZ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDMkIsR0FBRyxFQUFFO0VBQUEsRUFBQztFQUVwRyxPQUFPRixlQUFlLENBQUNHLE1BQU0sQ0FBQyxVQUFDQyxHQUFHLEVBQUU3RCxHQUFHLEVBQUVYLENBQUMsRUFBSztJQUMzQ3dFLEdBQUcsQ0FBQzdELEdBQUcsQ0FBQyxHQUFHdUQsYUFBYSxDQUFDbEUsQ0FBQyxDQUFDO0lBQzNCLE9BQU93RSxHQUFHO0VBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ1YsQ0FBQyxDOzs7Ozs7Ozs7Ozs7OztJQzNCb0JsTCxXQUFXO0VBQzVCLFNBQUFBLFlBQVlMLE9BQU8sRUFBRTtJQUNqQixJQUFJLENBQUNBLE9BQU8sR0FBR0EsT0FBTztFQUMxQjtFQUFDLElBQUFRLE1BQUEsR0FBQUgsV0FBQSxDQUFBSSxTQUFBO0VBQUFELE1BQUEsQ0FFRGdFLGdCQUFnQixHQUFoQixTQUFBQSxpQkFBQSxFQUFtQixDQUVuQixDQUFDO0VBQUEsT0FBQW5FLFdBQUE7QUFBQTs7Ozs7Ozs7Ozs7OztBQ1BMO0FBQUE7QUFBQTtBQUFBO0FBQWlEO0FBQ0E7QUFBQSxJQUU1QkUseUJBQXlCO0VBQzFDLFNBQUFBLDBCQUFZUCxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2pCLElBQUksQ0FBQ0QsT0FBTyxHQUFHQSxPQUFPO0lBQ3RCLElBQUksQ0FBQ3dMLGVBQWUsR0FBRyxJQUFJLENBQUN4TCxPQUFPLENBQUN3TCxlQUFlO0lBQ25ELElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDRCxlQUFlLEtBQUssTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNO0lBQ3pFLElBQUksQ0FBQ3BJLGVBQWUsR0FBRyxJQUFJLENBQUNwRCxPQUFPLENBQUNxRCx1QkFBdUI7SUFDM0QsSUFBSSxDQUFDcUksY0FBYyxHQUFHeEssQ0FBQyxDQUFDLGlEQUFpRCxDQUFDO0lBRTFFQSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNJLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxZQUFNO01BQ3ZDckIsS0FBSSxDQUFDMEwsZUFBZSxFQUFFO0lBQzFCLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ0MsSUFBSSxFQUFFO0VBQ2Y7RUFBQyxJQUFBcEwsTUFBQSxHQUFBRCx5QkFBQSxDQUFBRSxTQUFBO0VBQUFELE1BQUEsQ0FFRHFMLGlCQUFpQixHQUFqQixTQUFBQSxrQkFBQSxFQUFvQjtJQUNoQixPQUFPQyxjQUFjLENBQUNDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLElBQUk7RUFDL0QsQ0FBQztFQUFBdkwsTUFBQSxDQUVEc0Qsc0JBQXNCLEdBQXRCLFNBQUFBLHVCQUF1QmtJLElBQUksRUFBRTtJQUN6QixJQUFNQyxRQUFRLEdBQUcsSUFBSSxDQUFDSixpQkFBaUIsRUFBRTtJQUN6QyxPQUFPLENBQUNJLFFBQVEsR0FBTUQsSUFBSSw2Q0FBd0NDLFFBQVEsVUFBTztFQUNyRixDQUFDO0VBQUF6TCxNQUFBLENBRUQwTCxhQUFhLEdBQWIsU0FBQUEsY0FBY0YsSUFBSSxFQUFFO0lBQ2hCRixjQUFjLENBQUNLLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRUgsSUFBSSxDQUFDO0VBQ3RELENBQUM7RUFBQXhMLE1BQUEsQ0FFRDRMLGVBQWUsR0FBZixTQUFBQSxnQkFBZ0JILFFBQVEsRUFBRTtJQUFBLElBQUFoTCxNQUFBO0lBQ3RCLElBQU1zQyxNQUFNLEdBQUc7TUFDWEEsTUFBTSxFQUFFO1FBQ0pDLFFBQVEsRUFBRTtVQUNOQyxhQUFhLEVBQUUsSUFBSTtVQUNuQkMsUUFBUSxFQUFFO1lBQ05DLEtBQUssRUFBRSxJQUFJLENBQUNQO1VBQ2hCO1FBQ0o7TUFDSixDQUFDO01BQ0RRLFFBQVEsdUJBQXFCcUksUUFBUTtJQUN6QyxDQUFDO0lBRUQsSUFBSSxDQUFDUCxjQUFjLENBQUNXLElBQUksRUFBRTtJQUUxQkMsOERBQUcsQ0FBQ0MsT0FBTyxDQUFDQywrREFBUSxDQUFDQyxNQUFNLEVBQUUsRUFBRWxKLE1BQU0sRUFBRSxVQUFDbUosR0FBRyxFQUFFdkksT0FBTyxFQUFLO01BQ3JELElBQUl1SSxHQUFHLEVBQUU7UUFDTCxNQUFNLElBQUlDLEtBQUssQ0FBQ0QsR0FBRyxDQUFDO01BQ3hCO01BRUF4TCxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQ2tELElBQUksQ0FBQ0QsT0FBTyxDQUFDO01BRTdDbEQsTUFBSSxDQUFDeUssY0FBYyxDQUFDakYsSUFBSSxFQUFFO01BRTFCeEYsTUFBSSxDQUFDaUwsYUFBYSxDQUFDRCxRQUFRLENBQUM7TUFFNUJoTCxNQUFJLENBQUMwSyxlQUFlLEVBQUU7TUFFdEJ6SyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNtRCxjQUFjLENBQUMsd0JBQXdCLENBQUM7SUFDdEQsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBN0QsTUFBQSxDQUVEbUwsZUFBZSxHQUFmLFNBQUFBLGdCQUFBLEVBQWtCO0lBQUEsSUFBQW5LLE1BQUE7SUFDZE4sQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQ0ksQ0FBQyxFQUFLO01BQzlDLElBQU1zSyxJQUFJLEdBQUc5SyxDQUFDLENBQUNRLENBQUMsQ0FBQ0MsYUFBYSxDQUFDLENBQUNvRSxJQUFJLENBQUMsV0FBVyxDQUFDO01BRWpELElBQUk3RSxDQUFDLENBQUNRLENBQUMsQ0FBQ0MsYUFBYSxDQUFDLENBQUNQLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO01BRXpESSxNQUFJLENBQUM0SyxlQUFlLENBQUNKLElBQUksRUFBRXhLLE1BQUksQ0FBQ21LLGVBQWUsQ0FBQztJQUNwRCxDQUFDLENBQUM7RUFDTixDQUFDO0VBQUFuTCxNQUFBLENBRURvTCxJQUFJLEdBQUosU0FBQUEsS0FBQSxFQUFPO0lBQ0gsSUFBTWdCLGNBQWMsR0FBRyxJQUFJLENBQUNmLGlCQUFpQixFQUFFO0lBRS9DLElBQUllLGNBQWMsS0FBSyxJQUFJLENBQUNwQixlQUFlLElBQUksQ0FBQ29CLGNBQWMsRUFBRTtNQUM1RCxPQUFPLElBQUksQ0FBQ2pCLGVBQWUsRUFBRTtJQUNqQztJQUVBLElBQUksQ0FBQ1MsZUFBZSxDQUFDLElBQUksQ0FBQ1gsZ0JBQWdCLENBQUM7RUFDL0MsQ0FBQztFQUFBLE9BQUFsTCx5QkFBQTtBQUFBIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSBcIkBiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzXCI7XHJcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tIFwiLi9jYXRhbG9nXCI7XHJcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSBcIi4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHNcIjtcclxuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSBcIi4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gXCIuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzXCI7XHJcbmltcG9ydCBJVFNDYXRlZ29yeSBmcm9tIFwiLi9jdXN0b20vaXRzLWNhdGVnb3J5XCI7XHJcbmltcG9ydCBUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IGZyb20gXCIuL2N1c3RvbS90b2dnbGUtY2F0ZWdvcnktbGlzdGluZy12aWV3XCI7XHJcbmltcG9ydCBjdXN0b21HbG9iYWwgZnJvbSBcIi4vY3VzdG9tL2l0cy1nbG9iYWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgIHN1cGVyKGNvbnRleHQpO1xyXG4gICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEludHVpdFNvbHV0aW9ucyAtIEN1c3RvbSBDYXRlZ29yeVxyXG4gICAgICovXHJcbiAgICB0aGlzLklUU0NhdGVnb3J5ID0gbmV3IElUU0NhdGVnb3J5KGNvbnRleHQpO1xyXG4gICAgdGhpcy50b2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3ID0gbmV3IFRvZ2dsZUNhdGVnb3J5TGlzdGluZ1ZpZXcoY29udGV4dCk7XHJcbiAgfVxyXG5cclxuICBzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XHJcbiAgICAkZWxlbWVudC5hdHRyKHtcclxuICAgICAgcm9sZTogcm9sZVR5cGUsXHJcbiAgICAgIFwiYXJpYS1saXZlXCI6IGFyaWFMaXZlU3RhdHVzLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xyXG4gICAgaWYgKCEkKFwiW2RhdGEtc2hvcC1ieS1wcmljZV1cIikubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgaWYgKCQoXCIubmF2TGlzdC1hY3Rpb25cIikuaGFzQ2xhc3MoXCJpcy1hY3RpdmVcIikpIHtcclxuICAgICAgJChcImEubmF2TGlzdC1hY3Rpb24uaXMtYWN0aXZlXCIpLmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcImEubmF2TGlzdC1hY3Rpb25cIikub24oXCJjbGlja1wiLCAoKSA9PlxyXG4gICAgICB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKFxyXG4gICAgICAgICQoXCJzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlXCIpLFxyXG4gICAgICAgIFwic3RhdHVzXCIsXHJcbiAgICAgICAgXCJhc3NlcnRpdmVcIlxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb25SZWFkeSgpIHtcclxuICAgIHRoaXMuYXJyYW5nZUZvY3VzT25Tb3J0QnkoKTtcclxuXHJcbiAgICAkKCdbZGF0YS1idXR0b24tdHlwZT1cImFkZC1jYXJ0XCJdJykub24oXCJjbGlja1wiLCAoZSkgPT5cclxuICAgICAgdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcyhcclxuICAgICAgICAkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLFxyXG4gICAgICAgIFwic3RhdHVzXCIsXHJcbiAgICAgICAgXCJwb2xpdGVcIlxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpO1xyXG5cclxuICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xyXG5cclxuICAgIGlmICgkKFwiI2ZhY2V0ZWRTZWFyY2hcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xyXG4gICAgICBob29rcy5vbihcInNvcnRCeS1zdWJtaXR0ZWRcIiwgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcImEucmVzZXQtYnRuXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT5cclxuICAgICAgdGhpcy5zZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMoJChcInNwYW4ucmVzZXQtbWVzc2FnZVwiKSwgXCJzdGF0dXNcIiwgXCJwb2xpdGVcIilcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xyXG4gICAgdGhpcy52YWxpZGF0ZVByb2R1Y3RzQ291bnQoKTtcclxuICB9XHJcblxyXG4gIGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xyXG4gICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJChcIltkYXRhLW5vLXByb2R1Y3RzLW5vdGlmaWNhdGlvbl1cIik7XHJcbiAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xyXG4gICAgICAkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXRGYWNldGVkU2VhcmNoKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxyXG4gICAgICBwcmljZV9tYXhfZXZhbHVhdGlvbjogb25NYXhQcmljZUVycm9yLFxyXG4gICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcclxuICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXHJcbiAgICAgIHByaWNlX2ludmFsaWRfdmFsdWU6IG9uSW52YWxpZFByaWNlLFxyXG4gICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XHJcbiAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKFwiI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXJcIik7XHJcbiAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoXCIjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xyXG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XHJcbiAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxyXG4gICAgICAgICAgcHJvZHVjdHM6IHtcclxuICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICBwcm9kdWN0TGlzdGluZzpcclxuICAgICAgICAgIHRoaXMudG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldy5nZXRSZXF1ZXN0VGVtcGxhdGVUeXBlKFwiY2F0ZWdvcnlcIiksXHJcbiAgICAgICAgc2lkZWJhcjogXCJjYXRlZ29yeS9zaWRlYmFyXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHNob3dNb3JlOiBcImNhdGVnb3J5L3Nob3ctbW9yZVwiLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChcclxuICAgICAgcmVxdWVzdE9wdGlvbnMsXHJcbiAgICAgIChjb250ZW50KSA9PiB7XHJcbiAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XHJcbiAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xyXG5cclxuICAgICAgICAkKFwiYm9keVwiKS50cmlnZ2VySGFuZGxlcihcImNvbXBhcmVSZXNldFwiKTtcclxuXHJcbiAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIDEwMFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEludHVpdFNvbHV0aW9ucyAtIENhdGVnb3J5IFVwZGF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuSVRTQ2F0ZWdvcnkuYWZ0ZXJGYWNldFVwZGF0ZSgpO1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcclxuICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcclxuICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcclxuICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcclxuICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcclxuICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgJChcImJvZHlcIikub24oXCJwcm9kdWN0Vmlld01vZGVDaGFuZ2VkXCIsICgpID0+IHtcclxuICAgICAgY29uc3QgTmV3T3B0cyA9IHtcclxuICAgICAgICBjb25maWc6IHtcclxuICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXHJcbiAgICAgICAgICAgIHByb2R1Y3RzOiB7XHJcbiAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZW1wbGF0ZToge1xyXG4gICAgICAgICAgcHJvZHVjdExpc3Rpbmc6XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQ2F0ZWdvcnlMaXN0aW5nVmlldy5nZXRSZXF1ZXN0VGVtcGxhdGVUeXBlKFwiY2F0ZWdvcnlcIiksXHJcbiAgICAgICAgICBzaWRlYmFyOiBcImNhdGVnb3J5L3NpZGViYXJcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3dNb3JlOiBcImNhdGVnb3J5L3Nob3ctbW9yZVwiLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5mYWNldGVkU2VhcmNoLnVwZGF0ZVJlcXVlc3RPcHRpb25zKE5ld09wdHMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGFydEdsb2JhbCgpIHtcclxuICAgIGN1c3RvbUdsb2JhbCh0aGlzLmNvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgZGlzYWJsZVZpZXdEZXRhaWxCdXR0b24oKSB7XHJcbiAgICAkKFwiW3ZpZXctZGV0YWlsLWJ1dHRvbl1cIikub2ZmKFwiY2xpY2tcIik7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZVByb2R1Y3RzQ291bnQoKSB7XHJcbiAgICAkKFwiI2FsbC1zb3J0LXNlbGVjdCwgI2FsbC1zb3J0LXNlbGVjdC1tb2JpbGVcIikucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgY29uc3QgcHJvZHVjdHMgPSB0aGlzLmNvbnRleHQucHJvZHVjdHM7XHJcbiAgICBjb25zdCBib2R5ID0gdGhpcztcclxuICAgIGNvbnN0IFVVSURjYXRjID0gdGhpcy5jb250ZXh0LlVVSURjYXRjO1xyXG4gICAgY29uc3QgY2F0ZWdvcnlJZCA9IHRoaXMuY29udGV4dC5jYXRlZ29yeUlkO1xyXG4gICAgbGV0IG51bSA9IHRoaXMuY29udGV4dC5udW07XHJcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0cyk7XHJcbiAgICBjb25zdCBleGlzdFByb2RJZCA9IFtdO1xyXG4gICAgcHJvZHVjdHMuZm9yRWFjaCgocHIpID0+IHtcclxuICAgICAgZXhpc3RQcm9kSWQucHVzaChwci5pZCk7XHJcbiAgICB9KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGV4aXN0UHJvZElkKTtcclxuICAgIGF4aW9zXHJcbiAgICAgIC5nZXQoXCJodHRwczovL3N1ZnJpLmF1dG9jb2RlLmRldi9sNXRAZGV2L2dldEFUUHJvZHVjdC9cIiwge1xyXG4gICAgICAgIHBhcmFtczogeyBpZDogY2F0ZWdvcnlJZCB9LFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YS5wcm9kdWN0O1xyXG4gICAgICAgIGxldCByZXN0T2ZUZW1wbGF0ZSA9IFtdO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgocHIpID0+IHtcclxuICAgICAgICAgIGlmIChleGlzdFByb2RJZC5pbmNsdWRlcyhwcltcImlkXCJdKSkge1xyXG4gICAgICAgICAgICBjb25zdCAkaXRlbSA9ICQoYC5wcm9kdWN0W2RhdGEtZW50aXR5LWlkPVwiJHtwcltcImlkXCJdfVwiXWApO1xyXG4gICAgICAgICAgICAkaXRlbS5hdHRyKFwiZGF0YS1iZXN0LXNlbGxpbmdcIiwgYCR7cHJbXCJ0b3RhbF9zb2xkXCJdfWApO1xyXG4gICAgICAgICAgICAkaXRlbS5hdHRyKFwiZGF0YS1kYXRlLWNyZWF0ZWRcIiwgYCR7cHJbXCJkYXRlX2NyZWF0ZWRcIl19YCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2R1Y3RzLmxlbmd0aCA+IDk5KXtcclxuICAgICAgICAgICAgcmVzdE9mVGVtcGxhdGUucHVzaCh7IHRvdGFsX3NvbGQ6IHByW1widG90YWxfc29sZFwiXSwgaXRlbTogcHIgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzdE9mVGVtcGxhdGUgPSBjdXN0b21JbnNlcnRpb25Tb3J0KFxyXG4gICAgICAgICAgcmVzdE9mVGVtcGxhdGUsXHJcbiAgICAgICAgICByZXN0T2ZUZW1wbGF0ZS5sZW5ndGhcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXN0T2ZUZW1wbGF0ZS5mb3JFYWNoKChwcikgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBjb25zdHJ1Y3RUZW1wbGF0ZShwcltcIml0ZW1cIl0sIG51bSk7XHJcbiAgICAgICAgICBudW0gPSBudW0gKyAxO1xyXG4gICAgICAgICAgJChcIiNwcm9kdWN0LWxpc3RpbmctYWxsXCIpLmFwcGVuZCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIjbG9hZGVyLWJsb2NrXCIpLmhpZGUoKTtcclxuICAgICAgICBib2R5LmNvbmZpZ3VyZUlzb3RvcGVGb3JBbGwoKTtcclxuICAgICAgICBib2R5LnN0YXJ0R2xvYmFsKCk7XHJcbiAgICAgICAgYm9keS5kaXNhYmxlVmlld0RldGFpbEJ1dHRvbigpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25zdHJ1Y3RUZW1wbGF0ZShwciwgbnVtKSB7XHJcbiAgICAgIGxldCBpbWcgPSB7fTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcltcImltYWdlc1wiXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChwcltcImltYWdlc1wiXVtpXVtcImlzX3RodW1ibmFpbFwiXSkge1xyXG4gICAgICAgICAgaW1nID0gcHJbXCJpbWFnZXNcIl1baV07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBhY3Rpb25TZWN0aW9uID0gXCJcIjtcclxuICAgICAgaWYgKHByW1widmFyaWFudHNcIl0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGFjdGlvblNlY3Rpb24gPSBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1wcmltYXJ5IHF1aWNrdmlldyBidXR0b24tLXF1aWNrdmlld1wiIGRhdGEtcHJvZHVjdC1pZD1cIiR7cHJbXCJpZFwiXX1cIj5WaWV3IE9wdGlvbnM8L2J1dHRvbj5gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFjdGlvblNlY3Rpb24gPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0YyBqcy1jYXJkLWF0Y1wiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0Y19fc2VjdGlvbiBjYXJkLWF0Y19fc2VjdGlvbi0tcXR5XCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2FyZC1hdGNfX3F0eS0ke3ByW1wiaWRcIl19LSR7VVVJRGNhdGN9XCIgY2xhc3M9XCJjYXJkLWF0Y19fbGFiZWwgaXMtc3JPbmx5XCI+UXVhbnRpdHk6PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWF0Yy1pbmNyZW1lbnQgY2FyZC1hdGMtaW5jcmVtZW50LS1oYXMtYnV0dG9ucyBqcy1jYXJkLWF0Yy1pbmNyZW1lbnRcIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGVsXCIgY2xhc3M9XCJmb3JtLWlucHV0IGNhcmQtYXRjX19pbnB1dCBjYXJkLWF0Y19faW5wdXQtLXRvdGFsIGpzLWNhcmQtYXRjX19pbnB1dC0tdG90YWxcIiBuYW1lPVwiY2FyZC1hdGNfX3F0eS0ke3ByW1wiaWRcIl19LSR7VVVJRGNhdGN9XCIgaWQ9XCJjYXJkLWF0Y19fcXR5LSR7cHJbXCJpZFwiXX0tJHtVVUlEY2F0Y31cIiB2YWx1ZT1cIjFcIiBtaW49XCIxXCIgcGF0dGVybj1cIlswLTldKlwiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1hdGMtYnV0dG9uLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0taWNvblwiIGRhdGEtYWN0aW9uPVwiaW5jXCIgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj5JbmNyZWFzZSBRdWFudGl0eSBvZiB1bmRlZmluZWQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24td3JhcHBlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWFkZFwiPjwvdXNlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0taWNvblwiIGRhdGEtYWN0aW9uPVwiZGVjXCIgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj5EZWNyZWFzZSBRdWFudGl0eSBvZiB1bmRlZmluZWQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24td3JhcHBlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNpY29uLW1pbnVzXCI+PC91c2U+UFBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYXRjX19zZWN0aW9uIGNhcmQtYXRjX19zZWN0aW9uLS1hY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2FyZC1hdGNfX2J1dHRvbiBidXR0b24gYnV0dG9uLS1wcmltYXJ5IGpzLWNhcmQtYXRjX19idXR0b25cIiBpZD1cImNhcmQtYXRjX19hZGQtJHtwcltcImlkXCJdfS0ke1VVSURjYXRjfVwiIGRhdGEtZGVmYXVsdC1tZXNzYWdlPVwiQWRkIHRvIENhcnRcIiBkYXRhLXdhaXQtbWVzc2FnZT1cIkFkZGluZyB0byBjYXJ04oCmXCIgZGF0YS1hZGRlZC1tZXNzYWdlPVwiQWRkIHRvIENhcnRcIiB2YWx1ZT1cIkFkZCB0byBDYXJ0XCIgZGF0YS1jYXJkLWFkZC10by1jYXJ0PVwiL2NhcnQucGhwP2FjdGlvbj1hZGQmYW1wO3Byb2R1Y3RfaWQ9JHtwcltcImlkXCJdfVwiIGRhdGEtZXZlbnQtdHlwZT1cInByb2R1Y3QtY2xpY2tcIj5BZGQgdG8gQ2FydDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9kdWN0LXN0YXR1cy1tZXNzYWdlIGFyaWEtZGVzY3JpcHRpb24tLWhpZGRlblwiPkFkZGluZyB0byBjYXJ04oCmIFRoZSBpdGVtIGhhcyBiZWVuIGFkZGVkPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICA8ZGl2IGlkPVwicHJvZHVjdC0ke3ByW1wiaWRcIl19XCIgc29ydC1vcmRlcj1cIiR7cHJbXCJzb3J0X29yZGVyXCJdfVwiIFxyXG4gICAgICAgICAgY2xhc3M9XCJwcm9kdWN0XCJcclxuICAgICAgICAgIHByb2R1Y3QtZGF0YS1jYXRlZ29yeT1cIiR7cHJbXCJjYXRlZ29yaWVzXCJdfVwiIFxyXG4gICAgICAgICAgZGF0YS1uYW1lPVwiJHtwcltcIm5hbWVcIl19XCIgXHJcbiAgICAgICAgICAgZGF0YS1mYWtlLW5hbWU9XCIke3ByW1wiZmFrZS1oZWFkaW5nXCJdfVwiXHJcbiAgICAgICAgICBkYXRhLXJhdGluZz1cIiR7XHJcbiAgICAgICAgICAgIHByW1wicmV2aWV3c19jb3VudFwiXSA9PT0gMFxyXG4gICAgICAgICAgICAgID8gMFxyXG4gICAgICAgICAgICAgIDogcHJbXCJyZXZpZXdzX3JhdGluZ19zdW1cIl0gLyBwcltcInJldmlld3NfY291bnRcIl1cclxuICAgICAgICAgIH1cIlxyXG4gICAgICAgICAgcHJvZHVjdC1yZXZpZXctY291bnQ9XCIke3ByW1wicmV2aWV3c19jb3VudFwiXX1cIiBcclxuICAgICAgICAgIGRhdGEtcHJvZHVjdC1wcmljZT1cIiR7XHJcbiAgICAgICAgICAgIHByW1widmFyaWFudHNcIl0ubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICAgID8gcHJbXCJ2YXJpYW50c1wiXVswXVtcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxyXG4gICAgICAgICAgICAgIDogcHJbXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcclxuICAgICAgICAgIH1cIiBcclxuICAgICAgICAgIGRhdGEtZGF0ZS1jcmVhdGVkPVwiJHtwcltcImRhdGVfY3JlYXRlZFwiXX1cIiBcclxuICAgICAgICAgIHByb2R1Y3QtaXMtZmVhdHVyZWQ9XCIke3ByW1wiaXNfZmVhdHVyZWRcIl19XCIgXHJcbiAgICAgICAgICBkYXRhLWJlc3Qtc2VsbGluZz1cIiR7cHJbXCJ0b3RhbF9zb2xkXCJdfVwiXHJcbiAgICAgICAgICBkYXRhLWN1c3RvbS1zb3J0PVwiJHtwcltcImN1c3RvbS1zb3J0LW9yZGVyXCJdfVwiXHJcbiAgICAgICAgICBkYXRhLWN1c3RvbS1udW09XCIke251bX1cIlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBwcm9kdWN0LWZpbHRlci1JQVQ9XCJcIlxyXG4gICAgICAgICAgcHJvZHVjdC1maWx0ZXItRkJTPVwiXCJcclxuICAgICAgICAgIHByb2R1Y3QtZmlsdGVyLUZCQz1cIlwiXHJcbiAgICAgICAgICBwcm9kdWN0LWZpbHRlci1DQVQ9XCJcIlxyXG4gICAgICAgICAgcHJvZHVjdC1maWx0ZXItTkNGPVwiXCJcclxuICAgICAgICAgIHByb2R1Y3QtZmlsdGVyLU5DUD1cIlwiXHJcbiAgICAgICAgICBwcm9kdWN0LWZpbHRlci1OU0k9XCJcIlxyXG4gICAgICAgICAgcHJvZHVjdC1maWx0ZXItSFQ9XCJcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJjYXJkXCIgZGF0YS10ZXN0PVwiY2FyZC0ke3ByW1wiaWRcIl19XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiY2FyZC1maWd1cmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2FsZS1mbGFnLXNhc2hcIiBzdHlsZT1cImRpc3BsYXk6ICR7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcltcInZhcmlhbnRzXCJdWzBdLnNhbGVfcHJpY2UgIT09IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImJsb2NrO1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJub25lO1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcIj48c3BhbiBjbGFzcz1cInNhbGUtdGV4dFwiPk9uIFNhbGU8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cHJbXCJjdXN0b21fdXJsXCJdW1widXJsXCJdfVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2FyZC1maWd1cmVfX2xpbmtcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiJHtwcltcIm5hbWVcIl19LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAkJHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByW1widmFyaWFudHNcIl0ubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByW1widmFyaWFudHNcIl1bMF1bXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcltcImNhbGN1bGF0ZWRfcHJpY2VcIl0udG9GaXhlZCgyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiBjYXJkLWltZy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtpbWdbXCJ1cmxfdGh1bWJuYWlsXCJdfVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiaW1nW1wiZGVzY3JpcHRpb25cIl1cIiB0aXRsZT1cIiR7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByW1wiZmFrZS1oZWFkaW5nXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXNpemVzPVwiYXV0b1wiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Jjc2V0PVwiJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDgwdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMTYwdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMzIwdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gNjQwdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gOTYwdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMTI4MHcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDE5MjB3LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAyNTYwd1wiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zcmNzZXQ9XCIke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gODB3LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAxNjB3LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAzMjB3LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSA2NDB3LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSA5NjB3LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW1nW1widXJsX3N0YW5kYXJkXCJdfSAxMjgwdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2ltZ1tcInVybF9zdGFuZGFyZFwiXX0gMTkyMHcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbWdbXCJ1cmxfc3RhbmRhcmRcIl19IDI1NjB3XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNhcmQtaW1hZ2UgbGF6eWF1dG9zaXplcyBsYXp5bG9hZGVkXCIgc2l6ZXM9XCIyNDhweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZmlnY2FwdGlvbiBjbGFzcz1cImNhcmQtZmlnY2FwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1maWdjYXB0aW9uLWJvZHlcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvZmlnY2FwdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZHVjdFZpZXctdHlwZS10aXRsZSBoNFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3QtbmFtZT1cIlwiPiR7cHJbXCJmYWtlLWhlYWRpbmdcIl19PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImNhcmQtdGl0bGUgXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGFyaWEtbGFiZWw9XCIke3ByW1wibmFtZVwiXX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQke1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJ2YXJpYW50c1wiXS5sZW5ndGggPiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJbXCJ2YXJpYW50c1wiXVswXVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FsY3VsYXRlZF9wcmljZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJbXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCIke3ByW1wiY3VzdG9tX3VybFwiXVtcInVybFwiXX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtwcltcIm5hbWVcIl19PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHQgY2FyZC10ZXh0LS1za3VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+IFNLVSM6ICR7cHJbXCJza3VcIl19IDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtdGV4dCBjYXJkLXRleHQtLXByaWNlXCIgZGF0YS10ZXN0LWluZm8tdHlwZT1cInByaWNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXggcnJwLXByaWNlLS13aXRob3V0VGF4IGg0XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXMtc3JPbmx5XCI+IE1TUlA6IDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtcHJvZHVjdC1ycnAtcHJpY2Utd2l0aG91dC10YXg9XCJcIiBjbGFzcz1cInByaWNlIHByaWNlLS1ycnAgaDVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcltcInZhcmlhbnRzXCJdWzBdLnNhbGVfcHJpY2UgIT09IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCIkXCIgKyBwcltcInZhcmlhbnRzXCJdWzBdLnJldGFpbF9wcmljZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXggbm9uLXNhbGUtcHJpY2UtLXdpdGhvdXRUYXggaDVcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpcy1zck9ubHlcIj4gV2FzOiA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LW5vbi1zYWxlLXByaWNlLXdpdGhvdXQtdGF4PVwiXCIgY2xhc3M9XCJwcmljZSBwcmljZS0tbm9uLXNhbGVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2Utc2VjdGlvbiBwcmljZS1zZWN0aW9uLS13aXRob3V0VGF4IGg0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmljZS1sYWJlbCBpcy1zck9ubHlcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmljZS1ub3ctbGFiZWwgaXMtc3JPbmx5XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPk5vdzo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LXByaWNlLXdpdGhvdXQtdGF4PVwiXCIgY2xhc3M9XCJwcmljZSBwcmljZS0td2l0aG91dFRheFwiPiQke1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJ2YXJpYW50c1wiXS5sZW5ndGggPiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJbXCJ2YXJpYW50c1wiXVswXVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FsY3VsYXRlZF9wcmljZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJbXCJjYWxjdWxhdGVkX3ByaWNlXCJdLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dCBjYXJkLXRleHQtLWV4dHJhXCIgc3R5bGU9XCJkaXNwbGF5OiAke1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJjdXN0b21fZmllbGRzXCJdLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmaWVsZCkgPT4gZmllbGRbXCJuYW1lXCJdID09PSBcIl9fY2FyZC1leHRyYS1pbmZvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwicmVsYXRpdmU7XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIm5vbmU7XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9IFwiPiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAke1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJjdXN0b21fZmllbGRzXCJdLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmaWVsZCkgPT4gZmllbGRbXCJuYW1lXCJdID09PSBcIl9fY2FyZC1leHRyYS1pbmZvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByW1wiY3VzdG9tX2ZpZWxkc1wiXS5maW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZpZWxkKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFtcIm5hbWVcIl0gPT09IFwiX19jYXJkLWV4dHJhLWluZm9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWFjdGlvbi13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7YWN0aW9uU2VjdGlvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25jbGljaz1cIndpbmRvdy5sb2NhdGlvbi5ocmVmPSR7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJbXCJjdXN0b21fdXJsXCJdW1widXJsXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1wcmltYXJ5XCIgPlZpZXcgRGV0YWlsczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9hcnRpY2xlPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGN1c3RvbUluc2VydGlvblNvcnQoYXJyLCBuKSB7XHJcbiAgICAgIGxldCBpLCBrZXksIGo7XHJcbiAgICAgIGZvciAoaSA9IDE7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBrZXkgPSBhcnJbaV1bXCJ0b3RhbF9zb2xkXCJdO1xyXG4gICAgICAgIGogPSBpIC0gMTtcclxuXHJcbiAgICAgICAgLyogTW92ZSBlbGVtZW50cyBvZiBhcnJbMC4uaS0xXSwgdGhhdCBhcmUgXHJcbiAgICAgICAgZ3JlYXRlciB0aGFuIGtleSwgdG8gb25lIHBvc2l0aW9uIGFoZWFkIFxyXG4gICAgICAgIG9mIHRoZWlyIGN1cnJlbnQgcG9zaXRpb24gKi9cclxuICAgICAgICB3aGlsZSAoaiA+PSAwICYmIGFycltqXVtcInRvdGFsX3NvbGRcIl0gPiBrZXkpIHtcclxuICAgICAgICAgIGFycltqICsgMV1bXCJ0b3RhbF9zb2xkXCJdID0gYXJyW2pdW1widG90YWxfc29sZFwiXTtcclxuICAgICAgICAgIGogPSBqIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyW2ogKyAxXVtcInRvdGFsX3NvbGRcIl0gPSBrZXk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZUlzb3RvcGVGb3JBbGwoKSB7XHJcbiAgICAvLyAkKFwiLmdyaWRcIikuY3NzKFwiZGlzcGxheVwiLCBcImdyaWRcIik7XHJcbiAgICAvLyAgICQoXCIubGRzLWJsb2NrXCIpLmhpZGUoKTtcclxuICAgIGxldCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9kdWN0LWxpc3RpbmctYWxsXCIpO1xyXG4gICAgY29uc3QgYm9keSA9IHRoaXM7XHJcblxyXG4gICAgLy8gZm9yIHRlc3RpbmcsIGNvbW1lbnQgdGhpcyBzZWN0aW9uIGFuZCBjYWxsIHRoZSBydW5JbWFnZVRlc3QoKVxyXG4gICAgbGV0IGlzbztcclxuICAgIHJ1bklzb3RvcGUoKTtcclxuICAgIC8vIGlmICh0aGlzLmNoZWNrTW9iaWxlKCkpIHtcclxuICAgIC8vICAgcnVuSW1hZ2VUZXN0KCk7XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICAkKFwiLmdyaWRcIikuY3NzKFwiZGlzcGxheVwiLCBcImdyaWRcIik7XHJcbiAgICAvLyAgICQoXCIubGRzLWJsb2NrXCIpLmhpZGUoKTtcclxuICAgIC8vICAgcnVuSXNvdG9wZSgpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHJ1bkltYWdlVGVzdCgpO1xyXG5cclxuICAgIC8vIGl0IHdpbGwgY2FsbCBydW5Jc290b3BlKCkgaWYgYWxsIGltYWdlcyBhcmUgbG9hZGVkXHJcbiAgICBmdW5jdGlvbiBydW5JbWFnZVRlc3QoKSB7XHJcbiAgICAgIC8vICAgJChcIi5ncmlkXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJncmlkXCIpO1xyXG4gICAgICAvLyAgICQoXCIubGRzLWJsb2NrXCIpLmhpZGUoKTtcclxuXHJcbiAgICAgIGxldCBpbWdMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgbGV0IHRlc3RJbWdJbnQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgdmFyIGNhcmRJbWdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgICAgIFwiI2dyaWQtYWxsLXByb2R1Y3QgLmNhcmQtaW1hZ2VcIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGNhcmRJbWdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FyZEltZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vblplcm8gPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoY2FyZEltZ3NbaV0ub2Zmc2V0SGVpZ2h0IDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgaW1nTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgbm9uWmVybyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub25aZXJvKSB7XHJcbiAgICAgICAgICAgICAgaW1nTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpbWdMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbWdMb2FkZWQpIHtcclxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGVzdEltZ0ludCk7XHJcbiAgICAgICAgICBydW5Jc290b3BlKCk7XHJcbiAgICAgICAgICAvLyBib2R5LmNvbmZpZ3VyZUlzb3RvcGVGb3JBbGwoKTtcclxuICAgICAgICAgIC8vIGJvZHkuc3RhcnRHbG9iYWwoKTtcclxuICAgICAgICAgIC8vICQoXCIubGRzLWJsb2NrXCIpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJ1bklzb3RvcGUoKSB7XHJcbiAgICAgIC8vICQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBpc28gPSBuZXcgSXNvdG9wZShncmlkLCB7XHJcbiAgICAgICAgLy8gb3B0aW9ucy4uLlxyXG4gICAgICAgIGl0ZW1TZWxlY3RvcjogXCIucHJvZHVjdFwiLFxyXG4gICAgICAgIGxheW91dE1vZGU6IFwiZml0Um93c1wiLFxyXG5cclxuICAgICAgICBnZXRTb3J0RGF0YToge1xyXG4gICAgICAgICAgbmFtZTogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLW5hbWVcIik7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJpY2U6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvZHVjdC1wcmljZVwiKSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmV2aWV3OiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1FbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtcmF0aW5nXCIpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJlc3Rfc2VsbGluZzogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1iZXN0LXNlbGxpbmdcIikpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG5ld2VzdDogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRhdGUtY3JlYXRlZFwiKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjdXN0b21fc29ydF9vcmRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoaXRlbUVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1jdXN0b20tc29ydFwiKSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY3VzdG9tX3NvcnRfbnVtOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIE51bWJlcihpdGVtRWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWN1c3RvbS1udW1cIikpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIC8vIH0sIDApO1xyXG5cclxuICAgICAgJChcIiNhbGwtc29ydC1zZWxlY3QsICNhbGwtc29ydC1zZWxlY3QtbW9iaWxlXCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gJCh0aGlzKS52YWwoKS5zcGxpdChcIi1cIik7XHJcblxyXG4gICAgICAgIGlmICh2YWxbMF0gPT09IFwicmV2aWV3XCIpIHtcclxuICAgICAgICAgIGlzby5hcnJhbmdlKHtcclxuICAgICAgICAgICAgc29ydEJ5OiBbdmFsWzBdXSxcclxuICAgICAgICAgICAgc29ydEFzY2VuZGluZzoge1xyXG4gICAgICAgICAgICAgIHJldmlldzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgLy8gcmF0aW5nX2NvdW50OiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpc28uYXJyYW5nZSh7XHJcbiAgICAgICAgICAgIHNvcnRCeTogdmFsWzBdLFxyXG4gICAgICAgICAgICBzb3J0QXNjZW5kaW5nOiB2YWxbMV0gPT09IFwiYXNjXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJChcIiNhbGwtc29ydC1zZWxlY3QsICNhbGwtc29ydC1zZWxlY3QtbW9iaWxlXCIpLnByb3AoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoYm9keS5jb250ZXh0LnN1YmNhdGVnb3JpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBpc28uYXJyYW5nZSh7XHJcbiAgICAgICAgICAgIHNvcnRCeTogXCJjdXN0b21fc29ydF9vcmRlclwiLFxyXG4gICAgICAgICAgICBzb3J0QXNjZW5kaW5nOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlzby5hcnJhbmdlKHtcclxuICAgICAgICAgICAgc29ydEJ5OiBcImN1c3RvbV9zb3J0X251bVwiLFxyXG4gICAgICAgICAgICBzb3J0QXNjZW5kaW5nOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAzKTtcclxuXHJcbiAgICAgIGxldCByZXNpemVMYXlvdXQgPSBmYWxzZTtcclxuXHJcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgcmVzaXplTGF5b3V0ID0gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgICAgIGlzby5vbihcImxheW91dENvbXBsZXRlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAocmVzaXplTGF5b3V0KSB7XHJcbiAgICAgICAgICByZXNpemVMYXlvdXQgPSBmYWxzZTtcclxuICAgICAgICAgIGlzby5hcnJhbmdlKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xyXG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XHJcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XHJcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcclxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XHJcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xyXG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XHJcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcclxuXHJcbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcclxuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxufTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSVRTQ2F0ZWdvcnkge1xyXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWZ0ZXJGYWNldFVwZGF0ZSgpIHtcclxuXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xyXG5pbXBvcnQgdXJsVXRpbHMgZnJvbSAnLi4vY29tbW9uL3V0aWxzL3VybC11dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGVDYXRlZ29yeUxpc3RpbmdWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFZpZXdUeXBlID0gdGhpcy5jb250ZXh0LmRlZmF1bHRWaWV3VHlwZTtcclxuICAgICAgICB0aGlzLm9wcG9zaXRlVmlld1R5cGUgPSB0aGlzLmRlZmF1bHRWaWV3VHlwZSAhPT0gJ2dyaWQnID8gJ2dyaWQnIDogJ2xpc3QnO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xyXG4gICAgICAgIHRoaXMubG9hZGluZ092ZXJsYXkgPSAkKCcubG9hZGluZ092ZXJsYXkubG9hZGluZ092ZXJsYXktLXByb2R1Y3QtbGlzdGluZycpO1xyXG5cclxuICAgICAgICAkKCdib2R5Jykub24oJ2ZhY2V0ZWRTZWFyY2hSZWZyZXNoJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFRvZ2dsZUV2ZW50cygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdG9yZWRWaWV3VHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnY2F0ZWdvcnktdmlldy10eXBlJykgfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXF1ZXN0VGVtcGxhdGVUeXBlKHR5cGUpIHtcclxuICAgICAgICBjb25zdCBwYWdlVHlwZSA9IHRoaXMuZ2V0U3RvcmVkVmlld1R5cGUoKTtcclxuICAgICAgICByZXR1cm4gIXBhZ2VUeXBlID8gYCR7dHlwZX0vcHJvZHVjdC1saXN0aW5nYCA6IGBjdXN0b20vY2F0ZWdvcnktJHtwYWdlVHlwZX0tdmlld2A7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcmVWaWV3VHlwZSh0eXBlKSB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnY2F0ZWdvcnktdmlldy10eXBlJywgdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2F0ZWdvcnlQYWdlKHBhZ2VUeXBlKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBjb25maWc6IHtcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogdGhpcy5wcm9kdWN0c1BlclBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgY3VzdG9tL2NhdGVnb3J5LSR7cGFnZVR5cGV9LXZpZXdgLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZ092ZXJsYXkuc2hvdygpO1xyXG5cclxuICAgICAgICBhcGkuZ2V0UGFnZSh1cmxVdGlscy5nZXRVcmwoKSwgY29uZmlnLCAoZXJyLCBjb250ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpLmh0bWwoY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdPdmVybGF5LmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmVWaWV3VHlwZShwYWdlVHlwZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFRvZ2dsZUV2ZW50cygpO1xyXG5cclxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdwcm9kdWN0Vmlld01vZGVDaGFuZ2VkJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9nZ2xlRXZlbnRzKCkge1xyXG4gICAgICAgICQoJy5qcy1jYXRlZ29yeV9fdG9nZ2xlLXZpZXcnKS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3ZpZXctdHlwZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCQoZS5jdXJyZW50VGFyZ2V0KS5oYXNDbGFzcygnYWN0aXZlLWNhdGVnb3J5LXZpZXcnKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yeVBhZ2UodHlwZSwgdGhpcy5hZGRUb2dnbGVFdmVudHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmVkVmlld1R5cGUgPSB0aGlzLmdldFN0b3JlZFZpZXdUeXBlKCk7XHJcblxyXG4gICAgICAgIGlmIChzdG9yZWRWaWV3VHlwZSA9PT0gdGhpcy5kZWZhdWx0Vmlld1R5cGUgfHwgIXN0b3JlZFZpZXdUeXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFRvZ2dsZUV2ZW50cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRDYXRlZ29yeVBhZ2UodGhpcy5vcHBvc2l0ZVZpZXdUeXBlKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9