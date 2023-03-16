(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");
/* harmony import */ var _custom_custom_cart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./custom/custom-cart */ "./assets/js/theme/custom/custom-cart.js");
/* harmony import */ var _custom_cart_page_upsell__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./custom/cart-page-upsell */ "./assets/js/theme/custom/cart-page-upsell.js");


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);
  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }
  var _proto = Cart.prototype;
  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = $('[data-cart]');
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.customCart = this.context.itsConfig.custom_cart;
    if (this.customCart) {
      Object(_custom_custom_cart__WEBPACK_IMPORTED_MODULE_10__["floatingCheckoutButton"])();
    }
    this.cartPageUpsell = new _custom_cart_page_upsell__WEBPACK_IMPORTED_MODULE_11__["default"](this.context);
    this.setApplePaySupport();
    this.bindEvents();
  };
  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };
  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;
    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;
    if (preVal === void 0) {
      preVal = null;
    }
    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry;

    // Does not quality for min/max quantity
    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry),
        icon: 'error'
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;
    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
    if (this.$modal === null) {
      this.$modal = $('#modal');
    }
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };
      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__["ModalEvents"].opened, optionChangeHandler);
      }
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_9__["default"](_this4.$modal, context);
      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};
        if (err) {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            text: err,
            icon: 'error'
          });
          return false;
        }
        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }
        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };
  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;
    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: this.customCart ? 'custom/cart/content' : 'cart/content',
        totals: this.customCart ? 'custom/cart/totals' : 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
        additionalCheckoutButtons: 'cart/additional-checkout-buttons'
      }
    };
    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);
      _this5.$cartTotals.html(response.totals);
      _this5.$cartMessages.html(response.statusMessages);
      _this5.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);
      $cartPageTitle.replaceWith(response.pageTitle);
      _this5.bindEvents();
      _this5.$overlay.hide();
      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };
  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;
    var debounceTimeout = 400;
    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);
    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);
    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);
    var preVal;

    // cart update
    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdate($target);
    });

    // cart qty manually updates
    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: string,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: _this6.context.cancelButtonText
      }).then(function (result) {
        if (result.value) {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault();
      // edit item in cart
      _this6.cartEditOptions(itemId, productId);
    });
  };
  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;
    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault();

      // Empty code
      if (!code) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: $codeInput.data('error'),
          icon: 'error'
        });
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            html: response.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };
  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;
    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();
      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(_this8.context);
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: validationDictionary.invalid_gift_certificate,
          icon: 'error'
        });
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            html: resp.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };
  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["defaultModal"])();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);
        _this9.bindGiftWrappingForm();
      });
    });
  };
  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');
      if (!id) {
        return;
      }
      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();
      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');
    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');
      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }
    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };
  _proto.bindEvents = function bindEvents() {
    var _this10 = this;
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();

    // initiate shipping estimator module
    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"]($('[data-shipping-estimator]'), shippingErrorMessages);

    // reload cart content when a Cart Page Upsell item is added to the cart
    $(document).on('cpu-refresh-cart-content', function () {
      return _this10.refreshContent(false);
    });
  };
  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");






var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }
  var _proto = ShippingEstimator.prototype;
  _proto.initFormValidation = function initFormValidation() {
    var _this = this;
    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["announceInputErrorMessage"]
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }
      shippingEstimatorAlert.attr('role', 'alert');
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }
      if (_this.shippingValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };
  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };
  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;
    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");
        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }

  /**
   * Toggle between default shipping and ups shipping rates
   */;
  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };
  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;
    var $last;

    // Requests the states for a country with AJAX
    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__["default"].fire({
          text: err,
          icon: 'error'
        });
        throw new Error(err);
      }
      var $field = $(field);
      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }
      if ($last) {
        _this3.shippingValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["Validators"].cleanUpStateValidation(field);
      }

      // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us
      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };
  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };
    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }
    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };
  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content);

        // bind the select button
        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };
  return ShippingEstimator;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartItemDetails; });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);
  function CartItemDetails($scope, context, productAttributesData) {
    var _this;
    if (productAttributesData === void 0) {
      productAttributesData = {};
    }
    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__["optionChangeDecorator"].call(_assertThisInitialized(_this), hasDefaultOptions);

    // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view
    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }
    return _this;
  }
  var _proto = CartItemDetails.prototype;
  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');
      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');
        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = Object(_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["convertIntoArray"])(value.children);
            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };
            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }
          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');
    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;
      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);
    this.$scope.find('.modal-content').removeClass('hide-content');
  };
  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
});

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");







/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    Object(_utils_form_utils__WEBPACK_IMPORTED_MODULE_4__["insertStateHiddenField"])($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()($selectElement)) {
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(statesArray.states, function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
/* harmony default export */ __webpack_exports__["default"] = (function (stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }

  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        Object(_global_modal__WEBPACK_IMPORTED_MODULE_5__["showAlertModal"])(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
});
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

/***/ "./assets/js/theme/custom/cart-page-upsell-product-details.js":
/*!********************************************************************!*\
  !*** ./assets/js/theme/custom/cart-page-upsell-product-details.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartPageUpsellProduct; });
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isObject */ "./node_modules/lodash/isObject.js");
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _make_options_unique__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./make-options-unique */ "./assets/js/theme/custom/make-options-unique.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.min.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);




var CartPageUpsellProduct = /*#__PURE__*/function () {
  function CartPageUpsellProduct($scope) {
    this.$scope = $scope;
    this.$scope.addClass('hasOptions--wired');
    this.initRadioAttributes();
    this.$form = $('form', this.$scope);
    this.$productId = $('[name="product_id"]', this.$form).val();
    this.key = 'cpu'; // unique indentifier for this customization

    this.$productOptionsElement = $("[data-" + this.key + "-option-change]", this.$form); // ie <div class="options" data-cpu-option-change>

    this.updateOptionView();
    // utils.api.productAttributes.optionChange(this.$productId, this.$form.serialize(), 'products/bulk-discount-rates', (err, response) => {
    //     const attributesData = response.data || {};
    //     const attributesContent = response.content || {};
    //     this.updateProductAttributes(attributesData);
    //     // if (hasDefaultOptions) {
    //         this.updateView(attributesData, attributesContent);
    //     // } else {
    //     //     this.updateDefaultAttributesForOOS(attributesData);
    //     // }
    // });

    this.bindEvents();
  }

  /**
   * add "isRequired" to options that are required
   */
  var _proto = CartPageUpsellProduct.prototype;
  _proto.addRequiredClasstoOptions = function addRequiredClasstoOptions() {
    $('.form-field', this.$productOptionsElement).toArray().forEach(function (option) {
      if ($(option).find('small:contains("Required")').length) {
        $(option).addClass('isRequired');
      }
    });
  }

  /**
   * Handle product options changes
   */;
  _proto.productOptionsChanged = function productOptionsChanged(event) {
    var $changedOption = $(event.target);
    var optionRow = $(event.target).parents('.form-field');

    // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
    if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
      // do nothing
    } else {
      this.updateOptionView();
    }

    // was an option with a value selected?
    if ($changedOption.val() !== '') {
      if ($changedOption.is('input')) {
        var type = $changedOption.attr('type');
        switch (type) {
          case 'radio':
            $changedOption.attr('checked', true);
            $changedOption.siblings('input').attr('checked', false);
            optionRow.addClass('isSelected');
            break;
          case 'checkbox':
            if ($changedOption.prop('checked')) {
              optionRow.addClass('isSelected');
              $changedOption.attr('checked', true);
            } else {
              optionRow.removeClass('isSelected');
              $changedOption.attr('checked', false);
            }
            break;
          case 'text':
          case 'number':
            $changedOption.val().length !== 0 ? optionRow.addClass('isSelected') : optionRow.removeClass('isSelected');
            $changedOption.attr('value', $changedOption.val());
            break;
        }
      } else if ($changedOption.is('select')) {
        var $selectedOption = $changedOption.find("option[value=\"" + $changedOption.val() + "\"]");
        $selectedOption.attr('selected', true);
        $selectedOption.siblings('option').attr('selected', false);
        // if it's a date select, make sure all 3 selects are filled in before saying it's filled in
        if ($changedOption.attr('name').indexOf('month') !== -1 || $changedOption.attr('name').indexOf('day') !== -1 || $changedOption.attr('name').indexOf('year') !== -1) {
          // count the other date fields (if changed month, see if day and year are filled out)
          var otherSelectedDateFields = $changedOption.siblings('select').toArray().reduce(function (count, select) {
            return $(select).val() === '' ? count : count + 1;
          }, 0);
          // if all fields are filled in
          if (otherSelectedDateFields === 2) {
            optionRow.addClass('isSelected');
          }
        } else {
          optionRow.addClass('isSelected'); // it's not a date select, just mark the option as selected
        }
      } else if ($changedOption.is('textarea')) {
        $changedOption.val().length !== 0 ? optionRow.addClass('isSelected') : optionRow.removeClass('isSelected');
        $changedOption.text($changedOption.val());
      }
    } else {
      // else remove class (there was no value for this option)
      optionRow.removeClass('isSelected');
    }
    this.checkOptionsSelected();
  }

  /**
   *  Make API call on option change to update availability
   */;
  _proto.updateOptionView = function updateOptionView() {
    var _this = this;
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(this.$productId, this.$form.serialize(), 'products/bulk-discount-rates', function (err, response) {
      var productAttributesData = response.data || {};
      _this.updateProductAttributes(productAttributesData);
      _this.updateView(productAttributesData);
      // stock stuff (should wire up image change as well later)
      // if (productAttributesData.stock !== undefined) {
      //     $('.currentStock', $scope).text(productAttributesData.stock);
      // } else {
      //     $('.currentStock', $scope).text('');
      // }
    });
  }

  /**
   *  Check whether all required options are selected
   */;
  _proto.checkOptionsSelected = function checkOptionsSelected() {
    /*
    ## see if all options are selected
    */
    var numberRequiredOptions = this.$scope.find('.form-field.isRequired').length;
    var numberSelectedOptions = this.$scope.find('.form-field.isRequired.isSelected').length;
    // const $addToCartButton = $form.find('.card-actions .button');
    // $addToCartButton.removeClass('button--success');
    if (numberRequiredOptions === 0 || numberRequiredOptions <= numberSelectedOptions) {
      this.$scope.addClass('hasOptions--selected'); // add class to product for easy adding to cart
      $('.cpu__modal').addClass('hasOptions--selected'); // update text for user as well
    } else {
      this.$scope.removeClass('hasOptions--selected'); // remove class since not all options filled in
      $('.cpu__modal').removeClass('hasOptions--selected'); // update text for user as well
    }
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   *
   */;
  _proto.updatePriceView = function updatePriceView(price) {
    if (price.without_tax) {
      $("[data-product-price-without-tax]", this.$scope).html(price.without_tax.formatted);
    }
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   */;
  _proto.updateView = function updateView(data) {
    // update price
    // const viewModel = this.getViewModel(this.$scope);
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(data.price)) {
      this.updatePriceView(data.price);
    }
    // update image
    var imageEl = $(".cpu__item-img", this.$scope);
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(data.image)) {
      var imageSrc = data.image.data.replace('{:size}', '300x300');
      imageEl.attr('src', imageSrc);
    } else {
      imageEl.attr('src', imageEl.data('src'));
    }
    // update message if there is one
    var optionMessage = data.stock_message || data.purchasing_message;
    if (optionMessage !== null) {
      sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
        text: optionMessage,
        icon: 'error'
      });
      this.$scope.addClass('hasOptions--error');
    } else {
      this.$scope.removeClass('hasOptions--error');
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    var _this2 = this;
    var behavior = data.out_of_stock_behavior;
    var inStockIds = data.in_stock_attributes;
    var outOfStockMessage = " (" + data.out_of_stock_message + ")";
    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }
    $('[data-product-attribute-value]', this.$scope.add('.cpu__modal')).each(function (i, attribute) {
      var $attribute = $(attribute);
      var attrId = parseInt($attribute.data('product-attribute-value'), 10);
      if (inStockIds.indexOf(attrId) !== -1) {
        _this2.enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        _this2.disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  };
  _proto.disableAttribute = function disableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.hide();
    } else {
      $attribute.addClass('unavailable').prev('input').attr('disabled', true);
    }
  };
  _proto.disableSelectOptionAttribute = function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    var $select = $attribute.parent();
    if (behavior === 'hide_option') {
      $attribute.toggleOption(false);
      // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
      if ($attribute.parent().val() === $attribute.attr('value')) {
        $select[0].selectedIndex = 0;
      }
    } else {
      $attribute.attr('disabled', 'disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
    }
  };
  _proto.enableAttribute = function enableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.show();
    } else {
      $attribute.removeClass('unavailable').prev('input').attr('disabled', false);
    }
  };
  _proto.enableSelectOptionAttribute = function enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(true);
    } else {
      $attribute.removeAttr('disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
  };
  _proto.getAttributeType = function getAttributeType($attribute) {
    var $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('product-attribute') : null;
  }

  /**
   * Allow radio buttons to get deselected
   */;
  _proto.initRadioAttributes = function initRadioAttributes() {
    var _this3 = this;
    $('[data-product-attribute] input[type="radio"]', this.$scope).each(function (i, radio) {
      var $radio = $(radio);

      // Only bind to click once
      if ($radio.attr('data-state') !== undefined) {
        $radio.click(function () {
          if ($radio.data('state') === true) {
            $radio.prop('checked', false);
            $radio.data('state', false);
            $radio.change();
          } else {
            $radio.data('state', true);
          }
          _this3.initRadioAttributes();
        });
      }
      $radio.attr('data-state', $radio.prop('checked'));
    });
  }

  /**
   * bind events
   */;
  _proto.bindEvents = function bindEvents() {
    var _this4 = this;
    Object(_make_options_unique__WEBPACK_IMPORTED_MODULE_2__["default"])(this.$scope, this.$productId, this.key); // make options unique so there aer no conflicts when selecting options

    this.addRequiredClasstoOptions(); // add "isRequired" to required options
    this.checkOptionsSelected();

    // listen for option changes
    this.$productOptionsElement.change(function (event) {
      _this4.productOptionsChanged(event, event.target);
    });
    this.$productOptionsElement.show();

    // update options selected on load
    this.$productOptionsElement.find('input[type="checkbox"]').trigger('change'); // trigger selected checkbox options to update starting checkbox values
    this.$productOptionsElement.find('input[type="radio"]:checked').trigger('change'); // trigger selected radio options to update starting radio buttons values
    this.$productOptionsElement.find('input[type="text"]').trigger('change'); // trigger update on input text to catch any default values
    this.$productOptionsElement.find('input[type="number"]').trigger('change'); // trigger update on input numbers to catch any default values
    this.$productOptionsElement.find('textarea').trigger('change'); // trigger update on textarea tp catch any default values
    this.$productOptionsElement.find('option:selected').parent().trigger('change'); // trigger selected options to update starting select box values
  };
  return CartPageUpsellProduct;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/custom/cart-page-upsell.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/custom/cart-page-upsell.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartPageUpsell; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.min.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cart_page_upsell_product_details__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart-page-upsell-product-details */ "./assets/js/theme/custom/cart-page-upsell-product-details.js");
/* harmony import */ var _make_options_unique__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./make-options-unique */ "./assets/js/theme/custom/make-options-unique.js");
/* harmony import */ var _common_carousel_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/carousel/index */ "./assets/js/theme/common/carousel/index.js");
/* harmony import */ var _upsell_array_cart_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./upsell-array-cart-page */ "./assets/js/theme/custom/upsell-array-cart-page.js");
/* harmony import */ var _common_media_query_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/media-query-list */ "./assets/js/theme/common/media-query-list.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








//  Apr 2019: updated version includes ITS Upsell Suite
var VERSION = '2.0';
var CartPageUpsell = /*#__PURE__*/function () {
  function CartPageUpsell(context) {
    console.log('IntuitSolutions.net - Cart Page Upsell', VERSION);
    this.context = context;

    /**
     * options = 'related', 'similar', 'custom fields'
     * errorDefault = backup mode; only necessary with Upsell Suite
     * -- related = automatically loads related products from a random item in the cart
     * -- similar = automatically loads similar by view products from a random item in the cart
     * -- custom fields = will load the products specified by the cart item's custom fields
     * -- upsell suite = will load products specified by Upsell Suite CSVs
     */
    this.mode = 'upsell suite';
    this.errorDefault = 'related';
    this.showMobileInCarousel = true;
    this.productLimit = 3;
    this.loading = $('#cpu .loadingOverlay');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById.bind(_bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product); // required to keep scope of utils to the utils
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage.bind(_bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api); // required to keep scope of utils to the utils

    this.bindEvents();
  }

  /**
   * remove duplicate items from array
   *
   * pulled from stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
   * @param {array} upsellTargets - array of items we want to strip out any duplicate items from
   */
  var _proto = CartPageUpsell.prototype;
  _proto.removeDuplicateTargets = function removeDuplicateTargets(upsellTargets) {
    return Array.from(new Set(upsellTargets));
  }

  /**
   * get cart items URLs and Product Ids so we don't try to upsell an item that's already in the cart
   * @param {array} upsellTargets - array of items we want to strip out any cart item matches from
   */;
  _proto.removeCartItemTargets = function removeCartItemTargets(upsellTargets) {
    // get all data from the cart items
    var cartItemData = [];
    $('[data-upsell]').toArray().forEach(function (cartItem) {
      var producturl = $(cartItem).data('product-url').replace(window.location.origin, '') || '';
      var productId = $(cartItem).data('product-id').toString() || '';
      cartItemData.push(producturl, productId);
    });
    // only keep upsell items that aren't within our cartItemData array
    var result = upsellTargets.reduce(function (upsellItems, upsellitem) {
      if (cartItemData.indexOf(upsellitem) === -1) {
        upsellItems.push(upsellitem);
      }
      return upsellItems;
    }, []);
    // return result
    return result;
  }

  /**
   * get random int given a max
   */;
  _proto.getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /**
   * automatically load products from the cart item's either related products or similar by view items
   * @param {string} type - "related" or "similar"
   */;
  _proto.loadAutoTargets = function loadAutoTargets(type) {
    var _this = this;
    var itemIndex = this.getRandomInt($('.cart-item').length); // get random item index (pick random item)
    var itemId = $('.cart-item').eq(itemIndex || 0).data('product-id'); // get product id of that random item
    if (itemId == undefined) {
      return $('#cpu').hide();
    }
    // see if we already ajax'd for these upsell items
    var storedData = JSON.parse(localStorage.getItem("cpu__items" + itemId)) || [];
    if (storedData.length) {
      // if already ajaxed and stored upsell items
      storedData = this.removeDuplicateTargets(storedData); // remove duplicate upsell targets
      storedData = this.removeCartItemTargets(storedData); // remove any upsell targets that match an item already in the cart
      this.loadUpsellTargets(storedData); // load those stored upsell items
    } else {
      // otherwise
      var opts = {
        template: "custom/cart-page-upsell-targets--" + type,
        config: {
          product: {
            related_products: {
              limit: 70
            },
            similar_by_views: {
              limit: 70
            }
          }
        }
      };
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById(itemId, opts, function (err, res) {
        // ajax for the first item's upsell items (suggested products)
        if (err) {
          return $('#cpu').hide();
        }
        var targets = JSON.parse(res) || [];
        targets = _this.removeDuplicateTargets(targets); // remove duplicate upsell targets
        targets = _this.removeCartItemTargets(targets); // remove any upsell targets that match an item already in the cart
        localStorage.setItem("cpu__items" + itemId, JSON.stringify(targets));
        _this.loadUpsellTargets(targets);
      });
    }
  }

  /**
   * returns array of upsell product URLs and/or IDs
   */;
  _proto.loadCustomFieldTargets = function loadCustomFieldTargets() {
    var targets = [];
    $('[data-upsell]').toArray().forEach(function (cartItem) {
      var upsellItems = $(cartItem).data('upsell');
      if (upsellItems.length) {
        upsellItems.split(',').forEach(function (upsellItem) {
          if (upsellItem.length) {
            targets.push(upsellItem);
          }
        });
      }
    });
    // if mode is set to custom fields but no items have custom fields applied, default to using related products
    if (targets.length === 0) {
      return this.loadAutoTargets('related');
    }
    targets = this.removeDuplicateTargets(targets); // remove duplicate upsell targets
    targets = this.removeCartItemTargets(targets); // remove any upsell targets that match an item already in the cart
    return this.loadUpsellTargets(targets);
  };
  _proto.loadCSVTargets = /*#__PURE__*/function () {
    var _loadCSVTargets = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var cpuHTMLtext, cpuHTML, remainingSlots, targets;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            //  get the previously AJAXed products from sessionStorage
            cpuHTMLtext = sessionStorage.getItem("cpuCards");
            cpuHTML = _upsell_array_cart_page__WEBPACK_IMPORTED_MODULE_5__["default"].parseArrayFromString(cpuHTMLtext); //  if nothing has been downloaded,
            //  revert to backup mode
            if (cpuHTML.length) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", this.loadAutoTargets(this.errorDefault));
          case 4:
            //  display the previouly downloaded products
            cpuHTML.forEach(function (card) {
              return $('#cpu .cpu__list--customfields').append(card.html);
            });

            //  if there is room for more products,
            //  fill the rest of the add-on by
            //  adding products from the CSVs
            //  of products already in the CPU
            remainingSlots = this.productLimit - cpuHTML.length;
            if (!remainingSlots) {
              _context.next = 17;
              break;
            }
            _context.prev = 7;
            _context.next = 10;
            return _upsell_array_cart_page__WEBPACK_IMPORTED_MODULE_5__["default"].getAdditionalProducts(cpuHTML.map(function (product) {
              return product.product_id;
            }), remainingSlots);
          case 10:
            targets = _context.sent;
            return _context.abrupt("return", this.loadUpsellTargets(targets));
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](7);
            console.error("CPU parse error: ", _context.t0);
          case 17:
            this.applyUpsellHandlers();
            return _context.abrupt("return", this.loading.hide());
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[7, 14]]);
    }));
    function loadCSVTargets() {
      return _loadCSVTargets.apply(this, arguments);
    }
    return loadCSVTargets;
  }()
  /**
   * handle adding items to cart
   */
  ;
  _proto.addToCart = function addToCart(event) {
    var _this2 = this;
    var product = $(event.currentTarget).parents('.cpu__item');
    product.removeClass('hasError'); // remove any error highlighting
    // make sure all options are selected
    if (product.hasClass('hasOptions') && !product.hasClass('hasOptions--selected')) {
      product.hasClass('hasOptions--wired') ? $('.qaatx__options', product).slideDown() // if options loaded, just show them
      : this.toggleOptions(event); // options aren't loaded, load them + show them
      product.addClass('hasError');
      $('.cpu__item.isBeingAdded').removeClass('isBeingAdded');
      return sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        text: 'Please make sure all required options have been selected',
        type: 'error'
      });
    }
    // actually add to cart
    this.loading.show();
    var form = $('.cpu__item-form', product);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.itemAdd(new FormData(form[0]), function (err, response) {
      var errorMessage = err || response.data.error; // take note of errors
      if (errorMessage) {
        // Guard statement
        // Strip the HTML from the error message
        var tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;
        _this2.loading.hide();
        product.addClass('hasError'); // highlgihht error item
        var errorOffset = product.offset().top;
        $('html, body').animate({
          scrollTop: errorOffset - 20
        }, 700); // scroll user to the error product
        // remove class from our 'qued" items
        $('.cpu__item.isBeingAdded').removeClass('isBeingAdded');
        // alert user of error
        return sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
          text: tmp.textContent || tmp.innerText,
          icon: 'error'
        });
      }
      _this2.loading.hide();
      // product.addClass('wasAdded');
      // $('.cpu__item-button', product).text('Added to Cart');
      $(document).trigger('cpu-refresh-cart-content');
      // if (product.hasClass('isBeingAdded')) {
      //     product.removeClass('isBeingAdded');
      //     ($('.cpu__item.isBeingAdded') && $('.cpu__item.isBeingAdded').length)
      //         ? $('.cpu__item.isBeingAdded').eq(0).find('.qaatc__addtocart').trigger('click') // trigger submitting next product to the cart
      //         : window.location = '/cart.php';
      // }
    });
  }

  /**
   * when modal option changed we need to sync the "real" form. Sync options selected in scope1 with scope2
   * @param {object} event
   * @param {string} productId
   */;
  _proto.syncFormOption = function syncFormOption(event, productId) {
    var opt = $(event.target).parents('.form-field');
    var type = $(opt).data('product-attribute');
    var target = null;
    var targetId = null;
    var value = null;
    switch (type) {
      case 'input-checkbox':
      case 'set-rectangle':
      case 'set-radio':
      case 'product-list':
      case 'swatch':
        target = $('input:checked', opt);
        if (target && target.length) {
          targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
          $("#" + targetId).prop('checked', true);
          $("#" + targetId).siblings('input').prop('checked', false);
        } else {
          targetId = $(event.target).prop('id').replace("_" + productId, '').replace('modal_', '');
        }
        break;
      case 'set-select':
        target = $('.form-select', opt);
        targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
        value = target.val();
        $("#" + targetId).val(value);
        break;
      case 'input-text':
      case 'textarea':
        target = $('.form-input', opt);
        targetId = target.prop('id').replace("_" + productId, '').replace('modal_', '');
        value = target.val();
        $("#" + targetId).val(value);
        break;
    }
    // force update on the "real" form
    $("#" + targetId).trigger('change');
  }

  /**
   * Add to cart from modal
   */;
  _proto.addToCartFromModal = function addToCartFromModal(modalContent, product) {
    var modal = modalContent.parents('.cpu__modal');
    if (!modal.hasClass('hasOptions--selected')) {
      return sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        text: 'Please make sure all required options have been selected',
        icon: 'error',
        onClose: function onClose() {
          $('.cpu__item-button--options', product).trigger('click'); // show options again if tried adding to cart before selecting all options
        }
      });
    }

    $('.cpu__item-button--addtocart', product).trigger('click'); // trigger add to cart button click on main product
    sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.close(); // close modal
  }

  /**
   * show and load if needed this product's options
   */;
  _proto.showOptions = function showOptions(e) {
    var _this3 = this;
    var product = $(e.currentTarget).parents('.cpu__item');
    var name = $('.cpu__item-name', product).text();
    var optionMarkup = $('.cpu__item-options', product).html();
    var productId = $('[name="product_id"]', product).val();
    sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
      title: "Options for " + name,
      html: optionMarkup,
      customClass: 'cpu__modal',
      showCloseButton: true,
      showConfirmButton: false,
      onOpen: function onOpen() {
        // since the moda lHTML is cloned it doesn't have any handlers applied to it. This handles the "fake" cloned options to update the "real" options
        var modalContent = $(sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.getContent());
        Object(_make_options_unique__WEBPACK_IMPORTED_MODULE_3__["default"])(modalContent, productId, 'modal');
        $('[data-cpu-option-change]', modalContent).change(function (event) {
          _this3.syncFormOption(event, productId);
        });
        // trigger default selected options unless there's an error.. then we'll get stuck in a loop
        if (!product.hasClass('hasOptions--error')) {
          $('[data-cpu-option-change]', modalContent).find('input[type="checkbox"]').trigger('change'); // trigger selected checkbox options to update starting checkbox values
          $('[data-cpu-option-change]', modalContent).find('input[type="radio"]:checked').trigger('change'); // trigger selected radio options to update starting radio buttons values
          $('[data-cpu-option-change]', modalContent).find('input[type="text"]').trigger('change'); // trigger update on input text to catch any default values
          $('[data-cpu-option-change]', modalContent).find('input[type="number"]').trigger('change'); // trigger update on input numbers to catch any default values
          $('[data-cpu-option-change]', modalContent).find('textarea').trigger('change'); // trigger update on textarea tp catch any default values
          $('[data-cpu-option-change]', modalContent).find('option:selected').parent().trigger('change'); // trigger selected options to update starting select box values
        }

        // this.optionHandlers[productId].updateOptionView();
        _this3.optionHandlers[productId].checkOptionsSelected(modalContent);

        // handle adding to cart from modal
        $('.cpu__item-button--modaladdtocart', modalContent).on('click', function () {
          return _this3.addToCartFromModal(modalContent, product);
        });
      }
    });
  }

  /**
   * apply upsell handlers
   */;
  _proto.applyUpsellHandlers = function applyUpsellHandlers() {
    var _this4 = this;
    this.optionHandlers = {};
    $('.cpu__item.hasOptions').toArray().forEach(function (product) {
      var thisID = $(product).find('input[name="product_id"]').val();
      _this4.optionHandlers[thisID] = new _cart_page_upsell_product_details__WEBPACK_IMPORTED_MODULE_2__["default"]($(product));
    }); // handle options for all products w/ options
    console.log(this.optionHandlers);
    $('.cpu__item-button--addtocart').on('click', function (e) {
      return _this4.addToCart(e);
    }); // manage adding to cart

    $('.cpu__item-button--options').on('click', function (e) {
      return _this4.showOptions(e);
    }); // manage adding to cart

    this.displayInCarousel();
  }

  /**
   * AJAX the upsell URLs and/or IDs and append where needed
   * @param {array} targets - targets to upsell
   */;
  _proto.loadUpsellTargets = function loadUpsellTargets(targets) {
    var _this5 = this;
    if (targets.length) {
      targets = targets.slice(0, this.productLimit || targets.length);
      var runQueueInOrder = function runQueueInOrder() {
        if (targets.length === 0) {
          // when done all products
          _this5.applyUpsellHandlers();
          return _this5.loading.hide();
        }
        var target = targets.shift();
        var requestMethod = target.toString().match(/^[0-9]+$/) ? _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById : _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage;
        requestMethod(target, {
          template: 'custom/cart-page-upsell-item'
        }, function (err, response) {
          if (err) {
            return;
          } // if error
          $('#cpu .cpu__list--customfields').append(response); // no error, append markup
          runQueueInOrder(); // run next item
        });
      };

      runQueueInOrder(); // start the loop
    } else {
      $('#cpu').hide();
    }
  }

  /**
   * Add Slick options to product display after loading products,
   * then fire Slick
   */;
  _proto.displayInCarousel = function displayInCarousel() {
    if (!this.showMobileInCarousel) return;

    //  Add CSS to product cards before firing Slick
    $('.cpu__list').addClass('cpu__list-slick');
    $('.cpu__item').addClass('cpu__item-slick');
    $('.cpu__list').attr('data-slick', "{\n            \"infinite\": true,\n            \"dots\": false,\n            \"arrows\": true,\n            \"mobileFirst\": true,\n            \"rows\": 1,\n            \"slidesToShow\": 1,\n            \"slidesToScroll\": 1,\n            \"responsive\": [\n                {\n                    \"breakpoint\": 1025,\n                    \"settings\": \"unslick\"\n                }\n            ]\n        }");
    Object(_common_carousel_index__WEBPACK_IMPORTED_MODULE_4__["default"])(this.context);
    var mediaMatch = Object(_common_media_query_list__WEBPACK_IMPORTED_MODULE_6__["default"])('medium');
    $(mediaMatch).on('change', function (e) {
      var bindToWindow = !e.target.matches;
      if (bindToWindow) {
        $('.cpu__list').slick('reinit');
      }
    });
  }

  /**
   * bind events
   */;
  _proto.bindEvents = function bindEvents() {
    this.loading.show();
    switch (this.mode) {
      case 'related':
        return this.loadAutoTargets('related');
      case 'similar':
        return this.loadAutoTargets('similar');
      case 'custom fields':
        return this.loadCustomFieldTargets();
      case 'upsell suite':
        return this.loadCSVTargets();
    }
  };
  return CartPageUpsell;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/custom/custom-cart.js":
/*!***********************************************!*\
  !*** ./assets/js/theme/custom/custom-cart.js ***!
  \***********************************************/
/*! exports provided: floatingCheckoutButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floatingCheckoutButton", function() { return floatingCheckoutButton; });
/* harmony import */ var _common_media_query_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/media-query-list */ "./assets/js/theme/common/media-query-list.js");

var floatingCheckoutButton = function floatingCheckoutButton() {
  var $summaryContainer = $('.js-cart__totals');
  var $floatingButton = $('.floating-checkout-button');
  var mq = Object(_common_media_query_list__WEBPACK_IMPORTED_MODULE_0__["default"])('medium');
  function WidthChange(mq) {
    var fadeTiming = 400;
    if (!mq.matches) {
      var initWindowPosition = window.scrollY + window.innerHeight;
      if (initWindowPosition < $summaryContainer.offset().top) {
        $floatingButton.show();
      } else {
        $floatingButton.hide();
      }
      $(window).on('scroll', function () {
        var bottomWindowPosition = window.scrollY + window.innerHeight;
        if (bottomWindowPosition < $summaryContainer.offset().top) {
          $floatingButton.fadeIn(fadeTiming);
        } else {
          $floatingButton.fadeOut(fadeTiming);
        }
      });
    } else {
      $floatingButton.hide();
    }
  }
  mq.addListener(WidthChange);
  WidthChange(mq);
  $floatingButton.on('click', function () {
    var goToCheckout = false; // Set to true if the button should go to checkout instead of scrolling the user down the page
    var totalsOffset = $summaryContainer.offset().top;
    if (goToCheckout) {
      window.location.href = '/checkout.php';
    } else {
      $('html, body').animate({
        scrollTop: totalsOffset - 100
      }, 700); // scroll user to the real checkout button product
    }
  });
};


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/custom/make-options-unique.js":
/*!*******************************************************!*\
  !*** ./assets/js/theme/custom/make-options-unique.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/*
 * put productID on the element's "for" and "id" attrs so multiple cases of same option set won't conflict
 */
var makeOptionIdsUnique = function makeOptionIdsUnique(scope, productId, key) {
  $('input[type="radio"], input[type="checkbox"]', scope).each(function (index, el) {
    var optionId = $(el).attr('id'); // update ID to include product ID
    $(el).attr('id', key + "_" + optionId + "_" + productId); // update option ID to include product ID
    $(el).next().attr('for', key + "_" + optionId + "_" + productId); // update option label to target updated ID
  });
  // add input fields label class and put in here. These options we need to select their sibling label
  var optionsWithLabelAttrs = ['input[type="text"]', 'input[type="number"]', 'input[type="file"]', 'select', 'textarea'];
  var optionsWithLabelAttrsSelectors = optionsWithLabelAttrs.join(',');
  $(optionsWithLabelAttrsSelectors, scope).parents('.form-field').find('label').each(function (index, el) {
    var optionId = $(el).attr('for'); // update ID to include product ID
    $(el).attr('for', key + "_" + optionId + "_" + productId); // update option ID to include product ID
    $(el).next().attr('id', key + "_" + optionId + "_" + productId); // update option label to target updated ID
  });
};

/* harmony default export */ __webpack_exports__["default"] = (makeOptionIdsUnique);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vc3RhdGUtY291bnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwtcHJvZHVjdC1kZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vY2FydC1wYWdlLXVwc2VsbC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2N1c3RvbS1jYXJ0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vbWFrZS1vcHRpb25zLXVuaXF1ZS5qcyJdLCJuYW1lcyI6WyJDYXJ0IiwiX1BhZ2VNYW5hZ2VyIiwiX2luaGVyaXRzTG9vc2UiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCIkbW9kYWwiLCIkY2FydFBhZ2VDb250ZW50IiwiJCIsIiRjYXJ0Q29udGVudCIsIiRjYXJ0TWVzc2FnZXMiLCIkY2FydFRvdGFscyIsIiRjYXJ0QWRkaXRpb25hbENoZWNrb3V0QnRucyIsIiRvdmVybGF5IiwiaGlkZSIsIiRhY3RpdmVDYXJ0SXRlbUlkIiwiJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uIiwiY3VzdG9tQ2FydCIsImNvbnRleHQiLCJpdHNDb25maWciLCJjdXN0b21fY2FydCIsImZsb2F0aW5nQ2hlY2tvdXRCdXR0b24iLCJjYXJ0UGFnZVVwc2VsbCIsIkNhcnRQYWdlVXBzZWxsIiwic2V0QXBwbGVQYXlTdXBwb3J0IiwiYmluZEV2ZW50cyIsIndpbmRvdyIsIkFwcGxlUGF5U2Vzc2lvbiIsImFkZENsYXNzIiwiY2FydFVwZGF0ZSIsIiR0YXJnZXQiLCJfdGhpcyIsIml0ZW1JZCIsImRhdGEiLCIkZWwiLCJvbGRRdHkiLCJwYXJzZUludCIsInZhbCIsIm1heFF0eSIsIm1pblF0eSIsIm1pbkVycm9yIiwibWF4RXJyb3IiLCJuZXdRdHkiLCJzd2FsIiwiZmlyZSIsInRleHQiLCJpY29uIiwic2hvdyIsInV0aWxzIiwiYXBpIiwiY2FydCIsIml0ZW1VcGRhdGUiLCJlcnIiLCJyZXNwb25zZSIsInN0YXR1cyIsInJlbW92ZSIsInJlZnJlc2hDb250ZW50IiwiZXJyb3JzIiwiam9pbiIsImNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlIiwicHJlVmFsIiwiX3RoaXMyIiwiTnVtYmVyIiwiaW52YWxpZEVudHJ5IiwiaW52YWxpZEVudHJ5TWVzc2FnZSIsInJlcGxhY2UiLCJjYXJ0UmVtb3ZlSXRlbSIsIl90aGlzMyIsIml0ZW1SZW1vdmUiLCJjYXJ0RWRpdE9wdGlvbnMiLCJwcm9kdWN0SWQiLCJfdGhpczQiLCJPYmplY3QiLCJhc3NpZ24iLCJwcm9kdWN0Rm9yQ2hhbmdlSWQiLCJtb2RhbCIsImRlZmF1bHRNb2RhbCIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsIm9wZW4iLCJmaW5kIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJjb25maWd1cmVJbkNhcnQiLCJ1cGRhdGVDb250ZW50IiwiY29udGVudCIsIm9wdGlvbkNoYW5nZUhhbmRsZXIiLCIkcHJvZHVjdE9wdGlvbnNDb250YWluZXIiLCJtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCIsIm91dGVySGVpZ2h0IiwibGVuZ3RoIiwiY3NzIiwiaGFzQ2xhc3MiLCJvbmUiLCJNb2RhbEV2ZW50cyIsIm9wZW5lZCIsInByb2R1Y3REZXRhaWxzIiwiQ2FydEl0ZW1EZXRhaWxzIiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJob29rcyIsIm9uIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiJGZvcm0iLCIkc3VibWl0IiwiJG1lc3NhZ2VCb3giLCJvcHRpb25DaGFuZ2UiLCJzZXJpYWxpemUiLCJyZXN1bHQiLCJwdXJjaGFzaW5nX21lc3NhZ2UiLCJwcm9wIiwicHVyY2hhc2FibGUiLCJpbnN0b2NrIiwiX3RoaXM1IiwiJGNhcnRJdGVtc1Jvd3MiLCIkY2FydFBhZ2VUaXRsZSIsInRvdGFscyIsInBhZ2VUaXRsZSIsInN0YXR1c01lc3NhZ2VzIiwiYWRkaXRpb25hbENoZWNrb3V0QnV0dG9ucyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsInF1YW50aXR5IiwidHJpZ2dlciIsImZpbHRlciIsImJpbmRDYXJ0RXZlbnRzIiwiX3RoaXM2IiwiZGVib3VuY2VUaW1lb3V0IiwiX2JpbmQiLCJfZGVib3VuY2UiLCJwcmV2ZW50RGVmYXVsdCIsIm9uUXR5Rm9jdXMiLCJ2YWx1ZSIsImNoYW5nZSIsInN0cmluZyIsInNob3dDYW5jZWxCdXR0b24iLCJjYW5jZWxCdXR0b25UZXh0IiwidGhlbiIsImJpbmRQcm9tb0NvZGVFdmVudHMiLCJfdGhpczciLCIkY291cG9uQ29udGFpbmVyIiwiJGNvdXBvbkZvcm0iLCIkY29kZUlucHV0IiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCJfdGhpczgiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJjaGVja0lzR2lmdENlcnRWYWxpZCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlIiwiYXBwbHlHaWZ0Q2VydGlmaWNhdGUiLCJyZXNwIiwiYmluZEdpZnRXcmFwcGluZ0V2ZW50cyIsIl90aGlzOSIsImdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zIiwiJHNlbGVjdCIsImlkIiwiaW5kZXgiLCJhbGxvd01lc3NhZ2UiLCJ0b2dnbGVWaWV3cyIsIiRzaW5nbGVGb3JtIiwiJG11bHRpRm9ybSIsIl90aGlzMTAiLCJzaGlwcGluZ0Vycm9yTWVzc2FnZXMiLCJjb3VudHJ5Iiwic2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlIiwicHJvdmluY2UiLCJzaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlIiwic2hpcHBpbmdFc3RpbWF0b3IiLCJTaGlwcGluZ0VzdGltYXRvciIsImRvY3VtZW50IiwiUGFnZU1hbmFnZXIiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdFc3RpbWF0b3JBbGVydCIsInNoaXBwaW5nVmFsaWRhdG9yIiwibm9kIiwic3VibWl0IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImF0dHIiLCJyZW1vdmVBdHRyIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiYmluZFZhbGlkYXRpb24iLCJiaW5kU3RhdGVWYWxpZGF0aW9uIiwiYmluZFVQU1JhdGVzIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwiY291bnRyeUlkIiwiaXNOYU4iLCJlcnJvck1lc3NhZ2UiLCIkZWxlIiwiZWxlVmFsIiwiVVBTUmF0ZVRvZ2dsZSIsIiRlc3RpbWF0b3JGb3JtVXBzIiwiJGVzdGltYXRvckZvcm1EZWZhdWx0IiwidG9nZ2xlQ2xhc3MiLCIkbGFzdCIsInN0YXRlQ291bnRyeSIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCJFcnJvciIsIiRmaWVsZCIsImdldFN0YXR1cyIsImlzIiwiVmFsaWRhdG9ycyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSIsInRvZ2dsZUJ1dHRvbiIsImJ1dHRvblNlbGVjdG9yIiwiJHRvZ2dsZUNvbnRhaW5lciIsImNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSIsInNlbGVjdG9yVG9BY3RpdmF0ZSIsIiRlc3RpbWF0b3JDb250YWluZXIiLCIkZXN0aW1hdG9yRm9ybSIsImNvbGxhcHNpYmxlRmFjdG9yeSIsInBhcmFtcyIsImNvdW50cnlfaWQiLCJzdGF0ZV9pZCIsImNpdHkiLCJ6aXBfY29kZSIsImdldFNoaXBwaW5nUXVvdGVzIiwiY2xpY2tFdmVudCIsInF1b3RlSWQiLCJzdWJtaXRTaGlwcGluZ1F1b3RlIiwiX1Byb2R1Y3REZXRhaWxzQmFzZSIsIiRzY29wZSIsInByb2R1Y3RBdHRyaWJ1dGVzRGF0YSIsImNhbGwiLCIkcHJvZHVjdE9wdGlvbnNFbGVtZW50IiwiaGFzT3B0aW9ucyIsInRyaW0iLCJoYXNEZWZhdWx0T3B0aW9ucyIsInNldFByb2R1Y3RWYXJpYW50Iiwib3B0aW9uQ2hhbmdlQ2FsbGJhY2siLCJvcHRpb25DaGFuZ2VEZWNvcmF0b3IiLCJfYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwiX2lzRW1wdHkiLCJ1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyIsInVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMiLCJlYWNoIiwib3B0aW9uTGFiZWwiLCJjaGlsZHJlbiIsImlubmVyVGV4dCIsIm9wdGlvblRpdGxlIiwic3BsaXQiLCJyZXF1aXJlZCIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJ0eXBlIiwiZ2V0QXR0cmlidXRlIiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJpc1NhdGlzZmllZCIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsInNlbGVjdCIsInNlbGVjdGVkSW5kZXgiLCJkYXRlU3RyaW5nIiwibWFwIiwieCIsImNoZWNrZWQiLCJnZXRTZWxlY3RlZE9wdGlvbkxhYmVsIiwicHJvZHVjdFZhcmlhbnRzbGlzdCIsImNvbnZlcnRJbnRvQXJyYXkiLCJtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0IiwiaW5wdCIsImRhdGFzZXQiLCJwcm9kdWN0QXR0cmlidXRlVmFsdWUiLCJsYWJlbCIsImlzQnJvd3NlcklFIiwibGFiZWxzIiwidGl0bGUiLCJwcm9kdWN0VmFyaWFudCIsInNvcnQiLCJ2aWV3IiwicHJvZHVjdE5hbWUiLCJtYXRjaCIsImNhcmQiLCJQcm9kdWN0RGV0YWlsc0Jhc2UiLCJjZXJ0IiwibWFrZVN0YXRlUmVxdWlyZWQiLCJzdGF0ZUVsZW1lbnQiLCJhdHRycyIsIl90cmFuc2Zvcm0iLCJpdGVtIiwicmV0IiwibmFtZSIsInJlcGxhY2VtZW50QXR0cmlidXRlcyIsIiRuZXdFbGVtZW50IiwiJGhpZGRlbklucHV0IiwicHJldiIsImFwcGVuZCIsIm1ha2VTdGF0ZU9wdGlvbmFsIiwiaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCIsImFkZE9wdGlvbnMiLCJzdGF0ZXNBcnJheSIsIiRzZWxlY3RFbGVtZW50IiwiY29udGFpbmVyIiwicHJlZml4IiwiX2VhY2giLCJzdGF0ZXMiLCJzdGF0ZU9iaiIsImNhbGxiYWNrIiwiY291bnRyeU5hbWUiLCJnZXRCeU5hbWUiLCJzaG93QWxlcnRNb2RhbCIsInN0YXRlX2Vycm9yIiwiJGN1cnJlbnRJbnB1dCIsIm5ld0VsZW1lbnQiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsIkpTT04iLCJwYXJzZSIsInVuZGVmaW5lZCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwia2V5IiwicG9wIiwicmVkdWNlIiwiYWNjIiwiQ2FydFBhZ2VVcHNlbGxQcm9kdWN0IiwiaW5pdFJhZGlvQXR0cmlidXRlcyIsIiRwcm9kdWN0SWQiLCJ1cGRhdGVPcHRpb25WaWV3IiwiYWRkUmVxdWlyZWRDbGFzc3RvT3B0aW9ucyIsInRvQXJyYXkiLCJmb3JFYWNoIiwib3B0aW9uIiwicHJvZHVjdE9wdGlvbnNDaGFuZ2VkIiwiJGNoYW5nZWRPcHRpb24iLCJ0YXJnZXQiLCJvcHRpb25Sb3ciLCJwYXJlbnRzIiwiRm9ybURhdGEiLCJzaWJsaW5ncyIsIiRzZWxlY3RlZE9wdGlvbiIsImluZGV4T2YiLCJvdGhlclNlbGVjdGVkRGF0ZUZpZWxkcyIsImNvdW50IiwiY2hlY2tPcHRpb25zU2VsZWN0ZWQiLCJ1cGRhdGVWaWV3IiwibnVtYmVyUmVxdWlyZWRPcHRpb25zIiwibnVtYmVyU2VsZWN0ZWRPcHRpb25zIiwidXBkYXRlUHJpY2VWaWV3IiwicHJpY2UiLCJ3aXRob3V0X3RheCIsImZvcm1hdHRlZCIsIl9pc09iamVjdCIsImltYWdlRWwiLCJpbWFnZSIsImltYWdlU3JjIiwib3B0aW9uTWVzc2FnZSIsInN0b2NrX21lc3NhZ2UiLCJiZWhhdmlvciIsIm91dF9vZl9zdG9ja19iZWhhdmlvciIsImluU3RvY2tJZHMiLCJpbl9zdG9ja19hdHRyaWJ1dGVzIiwib3V0T2ZTdG9ja01lc3NhZ2UiLCJvdXRfb2Zfc3RvY2tfbWVzc2FnZSIsImF0dHJpYnV0ZSIsIiRhdHRyaWJ1dGUiLCJhdHRySWQiLCJlbmFibGVBdHRyaWJ1dGUiLCJkaXNhYmxlQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlVHlwZSIsImRpc2FibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUiLCJwYXJlbnQiLCJ0b2dnbGVPcHRpb24iLCJlbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUiLCIkcGFyZW50IiwiY2xvc2VzdCIsInJhZGlvIiwiJHJhZGlvIiwiY2xpY2siLCJtYWtlT3B0aW9uSWRzVW5pcXVlIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsImV4cG9ydHMiLCJPcCIsImhhc093biIsImhhc093blByb3BlcnR5IiwiZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJkZXNjIiwiJFN5bWJvbCIsIlN5bWJvbCIsIml0ZXJhdG9yU3ltYm9sIiwiaXRlcmF0b3IiLCJhc3luY0l0ZXJhdG9yU3ltYm9sIiwiYXN5bmNJdGVyYXRvciIsInRvU3RyaW5nVGFnU3ltYm9sIiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiaW5uZXJGbiIsIm91dGVyRm4iLCJzZWxmIiwidHJ5TG9jc0xpc3QiLCJwcm90b0dlbmVyYXRvciIsIkdlbmVyYXRvciIsImdlbmVyYXRvciIsImNyZWF0ZSIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJmbiIsImFyZyIsIkNvbnRpbnVlU2VudGluZWwiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiSXRlcmF0b3JQcm90b3R5cGUiLCJnZXRQcm90byIsImdldFByb3RvdHlwZU9mIiwiTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUiLCJHcCIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsIm1ldGhvZCIsIl9pbnZva2UiLCJBc3luY0l0ZXJhdG9yIiwiUHJvbWlzZUltcGwiLCJpbnZva2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVjb3JkIiwiX19hd2FpdCIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJzdGF0ZSIsImRvbmVSZXN1bHQiLCJkZWxlZ2F0ZSIsImRlbGVnYXRlUmVzdWx0IiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiZG9uZSIsIm1ldGhvZE5hbWUiLCJUeXBlRXJyb3IiLCJpbmZvIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwibG9jcyIsImVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsIml0ZXJhYmxlIiwiaXRlcmF0b3JNZXRob2QiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwiY29uc3RydWN0b3IiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsImFzeW5jIiwiUHJvbWlzZSIsIml0ZXIiLCJvYmplY3QiLCJyZXZlcnNlIiwic2tpcFRlbXBSZXNldCIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJvb3RSZWNvcmQiLCJydmFsIiwiZXhjZXB0aW9uIiwiaGFuZGxlIiwibG9jIiwiY2F1Z2h0IiwiaGFzQ2F0Y2giLCJoYXNGaW5hbGx5IiwiZmluYWxseUVudHJ5IiwiY29tcGxldGUiLCJmaW5pc2giLCJfY2F0Y2giLCJ0aHJvd24iLCJkZWxlZ2F0ZVlpZWxkIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiZ2VuIiwiX25leHQiLCJfdGhyb3ciLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3MiLCJWRVJTSU9OIiwiY29uc29sZSIsImxvZyIsIm1vZGUiLCJlcnJvckRlZmF1bHQiLCJzaG93TW9iaWxlSW5DYXJvdXNlbCIsInByb2R1Y3RMaW1pdCIsImxvYWRpbmciLCJwcm9kdWN0IiwiZ2V0QnlJZCIsImJpbmQiLCJnZXRQYWdlIiwicmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyIsInVwc2VsbFRhcmdldHMiLCJTZXQiLCJyZW1vdmVDYXJ0SXRlbVRhcmdldHMiLCJjYXJ0SXRlbURhdGEiLCJjYXJ0SXRlbSIsInByb2R1Y3R1cmwiLCJvcmlnaW4iLCJ0b1N0cmluZyIsInVwc2VsbEl0ZW1zIiwidXBzZWxsaXRlbSIsImdldFJhbmRvbUludCIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxvYWRBdXRvVGFyZ2V0cyIsIml0ZW1JbmRleCIsImVxIiwic3RvcmVkRGF0YSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2FkVXBzZWxsVGFyZ2V0cyIsIm9wdHMiLCJjb25maWciLCJyZWxhdGVkX3Byb2R1Y3RzIiwibGltaXQiLCJzaW1pbGFyX2J5X3ZpZXdzIiwicmVzIiwidGFyZ2V0cyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJsb2FkQ3VzdG9tRmllbGRUYXJnZXRzIiwidXBzZWxsSXRlbSIsImxvYWRDU1ZUYXJnZXRzIiwiX2xvYWRDU1ZUYXJnZXRzIiwiX2NhbGxlZSIsImNwdUhUTUx0ZXh0IiwiY3B1SFRNTCIsInJlbWFpbmluZ1Nsb3RzIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInNlc3Npb25TdG9yYWdlIiwidXBzZWxsU3VpdGVDUFUiLCJwYXJzZUFycmF5RnJvbVN0cmluZyIsImdldEFkZGl0aW9uYWxQcm9kdWN0cyIsInByb2R1Y3RfaWQiLCJ0MCIsImFwcGx5VXBzZWxsSGFuZGxlcnMiLCJhZGRUb0NhcnQiLCJzbGlkZURvd24iLCJ0b2dnbGVPcHRpb25zIiwiZm9ybSIsIml0ZW1BZGQiLCJ0bXAiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiZXJyb3JPZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidGV4dENvbnRlbnQiLCJzeW5jRm9ybU9wdGlvbiIsIm9wdCIsInRhcmdldElkIiwiYWRkVG9DYXJ0RnJvbU1vZGFsIiwibW9kYWxDb250ZW50Iiwib25DbG9zZSIsImNsb3NlIiwic2hvd09wdGlvbnMiLCJlIiwib3B0aW9uTWFya3VwIiwiY3VzdG9tQ2xhc3MiLCJzaG93Q2xvc2VCdXR0b24iLCJzaG93Q29uZmlybUJ1dHRvbiIsIm9uT3BlbiIsIm9wdGlvbkhhbmRsZXJzIiwidGhpc0lEIiwiZGlzcGxheUluQ2Fyb3VzZWwiLCJydW5RdWV1ZUluT3JkZXIiLCJzaGlmdCIsInJlcXVlc3RNZXRob2QiLCJmb3JtYXRDYXJvdXNlbCIsIm1lZGlhTWF0Y2giLCJtZWRpYVF1ZXJ5TGlzdEZhY3RvcnkiLCJiaW5kVG9XaW5kb3ciLCJtYXRjaGVzIiwic2xpY2siLCIkc3VtbWFyeUNvbnRhaW5lciIsIiRmbG9hdGluZ0J1dHRvbiIsIm1xIiwiV2lkdGhDaGFuZ2UiLCJmYWRlVGltaW5nIiwiaW5pdFdpbmRvd1Bvc2l0aW9uIiwic2Nyb2xsWSIsImlubmVySGVpZ2h0IiwiYm90dG9tV2luZG93UG9zaXRpb24iLCJmYWRlSW4iLCJmYWRlT3V0IiwiYWRkTGlzdGVuZXIiLCJnb1RvQ2hlY2tvdXQiLCJ0b3RhbHNPZmZzZXQiLCJocmVmIiwic2NvcGUiLCJlbCIsIm9wdGlvbklkIiwib3B0aW9uc1dpdGhMYWJlbEF0dHJzIiwib3B0aW9uc1dpdGhMYWJlbEF0dHJzU2VsZWN0b3JzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUM7QUFFOEI7QUFDUztBQUNqQztBQUNXO0FBQ0M7QUFDbkI7QUFDaUI7QUFFSztBQUNQO0FBQUEsSUFFbENBLElBQUksMEJBQUFDLFlBQUE7RUFBQUMsY0FBQSxDQUFBRixJQUFBLEVBQUFDLFlBQUE7RUFBQSxTQUFBRCxLQUFBO0lBQUEsT0FBQUMsWUFBQSxDQUFBRSxLQUFBLE9BQUFDLFNBQUE7RUFBQTtFQUFBLElBQUFDLE1BQUEsR0FBQUwsSUFBQSxDQUFBTSxTQUFBO0VBQUFELE1BQUEsQ0FDckJFLE9BQU8sR0FBUCxTQUFBQSxRQUFBLEVBQVU7SUFDTixJQUFJLENBQUNDLE1BQU0sR0FBRyxJQUFJO0lBQ2xCLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUdDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDeEMsSUFBSSxDQUFDQyxZQUFZLEdBQUdELENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztJQUM1QyxJQUFJLENBQUNFLGFBQWEsR0FBR0YsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0lBQzVDLElBQUksQ0FBQ0csV0FBVyxHQUFHSCxDQUFDLENBQUMsb0JBQW9CLENBQUM7SUFDMUMsSUFBSSxDQUFDSSwyQkFBMkIsR0FBR0osQ0FBQyxDQUFDLHlDQUF5QyxDQUFDO0lBQy9FLElBQUksQ0FBQ0ssUUFBUSxHQUFHTCxDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FDM0NNLElBQUksRUFBRSxDQUFDLENBQUM7SUFDYixJQUFJLENBQUNDLGlCQUFpQixHQUFHLElBQUk7SUFDN0IsSUFBSSxDQUFDQyx3QkFBd0IsR0FBRyxJQUFJO0lBRXBDLElBQUksQ0FBQ0MsVUFBVSxHQUFHLElBQUksQ0FBQ0MsT0FBTyxDQUFDQyxTQUFTLENBQUNDLFdBQVc7SUFFcEQsSUFBSSxJQUFJLENBQUNILFVBQVUsRUFBRTtNQUNqQkksbUZBQXNCLEVBQUU7SUFDNUI7SUFFQSxJQUFJLENBQUNDLGNBQWMsR0FBRyxJQUFJQyxpRUFBYyxDQUFDLElBQUksQ0FBQ0wsT0FBTyxDQUFDO0lBRXRELElBQUksQ0FBQ00sa0JBQWtCLEVBQUU7SUFDekIsSUFBSSxDQUFDQyxVQUFVLEVBQUU7RUFDckIsQ0FBQztFQUFBdEIsTUFBQSxDQUVEcUIsa0JBQWtCLEdBQWxCLFNBQUFBLG1CQUFBLEVBQXFCO0lBQ2pCLElBQUlFLE1BQU0sQ0FBQ0MsZUFBZSxFQUFFO01BQ3hCLElBQUksQ0FBQ3BCLGdCQUFnQixDQUFDcUIsUUFBUSxDQUFDLHFCQUFxQixDQUFDO0lBQ3pEO0VBQ0osQ0FBQztFQUFBekIsTUFBQSxDQUVEMEIsVUFBVSxHQUFWLFNBQUFBLFdBQVdDLE9BQU8sRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDaEIsSUFBTUMsTUFBTSxHQUFHRixPQUFPLENBQUNHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDekMsSUFBSSxDQUFDbEIsaUJBQWlCLEdBQUdpQixNQUFNO0lBQy9CLElBQUksQ0FBQ2hCLHdCQUF3QixHQUFHYyxPQUFPLENBQUNHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFFdEQsSUFBTUMsR0FBRyxHQUFHMUIsQ0FBQyxXQUFTd0IsTUFBTSxDQUFHO0lBQy9CLElBQU1HLE1BQU0sR0FBR0MsUUFBUSxDQUFDRixHQUFHLENBQUNHLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN0QyxJQUFNQyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0YsR0FBRyxDQUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3BELElBQU1NLE1BQU0sR0FBR0gsUUFBUSxDQUFDRixHQUFHLENBQUNELElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDcEQsSUFBTU8sUUFBUSxHQUFHTixHQUFHLENBQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUM3QyxJQUFNUSxRQUFRLEdBQUdQLEdBQUcsQ0FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQzdDLElBQU1TLE1BQU0sR0FBR1osT0FBTyxDQUFDRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxHQUFHRSxNQUFNLEdBQUcsQ0FBQyxHQUFHQSxNQUFNLEdBQUcsQ0FBQztJQUN6RTtJQUNBLElBQUlPLE1BQU0sR0FBR0gsTUFBTSxFQUFFO01BQ2pCLE9BQU9JLDJEQUFJLENBQUNDLElBQUksQ0FBQztRQUNiQyxJQUFJLEVBQUVMLFFBQVE7UUFDZE0sSUFBSSxFQUFFO01BQ1YsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxNQUFNLElBQUlSLE1BQU0sR0FBRyxDQUFDLElBQUlJLE1BQU0sR0FBR0osTUFBTSxFQUFFO01BQ3RDLE9BQU9LLDJEQUFJLENBQUNDLElBQUksQ0FBQztRQUNiQyxJQUFJLEVBQUVKLFFBQVE7UUFDZEssSUFBSSxFQUFFO01BQ1YsQ0FBQyxDQUFDO0lBQ047SUFFQSxJQUFJLENBQUNqQyxRQUFRLENBQUNrQyxJQUFJLEVBQUU7SUFFcEJDLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDQyxVQUFVLENBQUNuQixNQUFNLEVBQUVVLE1BQU0sRUFBRSxVQUFDVSxHQUFHLEVBQUVDLFFBQVEsRUFBSztNQUN6RHRCLEtBQUksQ0FBQ2xCLFFBQVEsQ0FBQ0MsSUFBSSxFQUFFO01BRXBCLElBQUl1QyxRQUFRLENBQUNwQixJQUFJLENBQUNxQixNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3BDO1FBQ0EsSUFBTUMsTUFBTSxHQUFJYixNQUFNLEtBQUssQ0FBRTtRQUU3QlgsS0FBSSxDQUFDeUIsY0FBYyxDQUFDRCxNQUFNLENBQUM7TUFDL0IsQ0FBQyxNQUFNO1FBQ0hyQixHQUFHLENBQUNHLEdBQUcsQ0FBQ0YsTUFBTSxDQUFDO1FBQ2ZRLDJEQUFJLENBQUNDLElBQUksQ0FBQztVQUNOQyxJQUFJLEVBQUVRLFFBQVEsQ0FBQ3BCLElBQUksQ0FBQ3dCLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztVQUNyQ1osSUFBSSxFQUFFO1FBQ1YsQ0FBQyxDQUFDO01BQ047SUFDSixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEzQyxNQUFBLENBRUR3RCx1QkFBdUIsR0FBdkIsU0FBQUEsd0JBQXdCN0IsT0FBTyxFQUFFOEIsTUFBTSxFQUFTO0lBQUEsSUFBQUMsTUFBQTtJQUFBLElBQWZELE1BQU07TUFBTkEsTUFBTSxHQUFHLElBQUk7SUFBQTtJQUMxQyxJQUFNNUIsTUFBTSxHQUFHRixPQUFPLENBQUNHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDekMsSUFBTUMsR0FBRyxHQUFHMUIsQ0FBQyxXQUFTd0IsTUFBTSxDQUFHO0lBQy9CLElBQU1NLE1BQU0sR0FBR0YsUUFBUSxDQUFDRixHQUFHLENBQUNELElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDcEQsSUFBTU0sTUFBTSxHQUFHSCxRQUFRLENBQUNGLEdBQUcsQ0FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNwRCxJQUFNRSxNQUFNLEdBQUd5QixNQUFNLEtBQUssSUFBSSxHQUFHQSxNQUFNLEdBQUdyQixNQUFNO0lBQ2hELElBQU1DLFFBQVEsR0FBR04sR0FBRyxDQUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDN0MsSUFBTVEsUUFBUSxHQUFHUCxHQUFHLENBQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUM3QyxJQUFNUyxNQUFNLEdBQUdOLFFBQVEsQ0FBQzBCLE1BQU0sQ0FBQzVCLEdBQUcsQ0FBQ0csR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDOUMsSUFBSTBCLFlBQVk7O0lBRWhCO0lBQ0EsSUFBSSxDQUFDckIsTUFBTSxFQUFFO01BQ1RxQixZQUFZLEdBQUc3QixHQUFHLENBQUNHLEdBQUcsRUFBRTtNQUN4QkgsR0FBRyxDQUFDRyxHQUFHLENBQUNGLE1BQU0sQ0FBQztNQUNmLE9BQU9RLDJEQUFJLENBQUNDLElBQUksQ0FBQztRQUNiQyxJQUFJLEVBQUUsSUFBSSxDQUFDM0IsT0FBTyxDQUFDOEMsbUJBQW1CLENBQUNDLE9BQU8sQ0FBQyxTQUFTLEVBQUVGLFlBQVksQ0FBQztRQUN2RWpCLElBQUksRUFBRTtNQUNWLENBQUMsQ0FBQztJQUNOLENBQUMsTUFBTSxJQUFJSixNQUFNLEdBQUdILE1BQU0sRUFBRTtNQUN4QkwsR0FBRyxDQUFDRyxHQUFHLENBQUNGLE1BQU0sQ0FBQztNQUNmLE9BQU9RLDJEQUFJLENBQUNDLElBQUksQ0FBQztRQUNiQyxJQUFJLEVBQUVMLFFBQVE7UUFDZE0sSUFBSSxFQUFFO01BQ1YsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxNQUFNLElBQUlSLE1BQU0sR0FBRyxDQUFDLElBQUlJLE1BQU0sR0FBR0osTUFBTSxFQUFFO01BQ3RDSixHQUFHLENBQUNHLEdBQUcsQ0FBQ0YsTUFBTSxDQUFDO01BQ2YsT0FBT1EsMkRBQUksQ0FBQ0MsSUFBSSxDQUFDO1FBQ2JDLElBQUksRUFBRUosUUFBUTtRQUNkSyxJQUFJLEVBQUU7TUFDVixDQUFDLENBQUM7SUFDTjtJQUVBLElBQUksQ0FBQ2pDLFFBQVEsQ0FBQ2tDLElBQUksRUFBRTtJQUNwQkMsa0VBQUssQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUNDLFVBQVUsQ0FBQ25CLE1BQU0sRUFBRVUsTUFBTSxFQUFFLFVBQUNVLEdBQUcsRUFBRUMsUUFBUSxFQUFLO01BQ3pEUSxNQUFJLENBQUNoRCxRQUFRLENBQUNDLElBQUksRUFBRTtNQUVwQixJQUFJdUMsUUFBUSxDQUFDcEIsSUFBSSxDQUFDcUIsTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUNwQztRQUNBLElBQU1DLE1BQU0sR0FBSWIsTUFBTSxLQUFLLENBQUU7UUFFN0JtQixNQUFJLENBQUNMLGNBQWMsQ0FBQ0QsTUFBTSxDQUFDO01BQy9CLENBQUMsTUFBTTtRQUNIckIsR0FBRyxDQUFDRyxHQUFHLENBQUNGLE1BQU0sQ0FBQztRQUNmUSwyREFBSSxDQUFDQyxJQUFJLENBQUM7VUFDTkMsSUFBSSxFQUFFUSxRQUFRLENBQUNwQixJQUFJLENBQUN3QixNQUFNLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7VUFDckNaLElBQUksRUFBRTtRQUNWLENBQUMsQ0FBQztNQUNOO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBM0MsTUFBQSxDQUVEK0QsY0FBYyxHQUFkLFNBQUFBLGVBQWVsQyxNQUFNLEVBQUU7SUFBQSxJQUFBbUMsTUFBQTtJQUNuQixJQUFJLENBQUN0RCxRQUFRLENBQUNrQyxJQUFJLEVBQUU7SUFDcEJDLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDa0IsVUFBVSxDQUFDcEMsTUFBTSxFQUFFLFVBQUNvQixHQUFHLEVBQUVDLFFBQVEsRUFBSztNQUNqRCxJQUFJQSxRQUFRLENBQUNwQixJQUFJLENBQUNxQixNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3BDYSxNQUFJLENBQUNYLGNBQWMsQ0FBQyxJQUFJLENBQUM7TUFDN0IsQ0FBQyxNQUFNO1FBQ0hiLDJEQUFJLENBQUNDLElBQUksQ0FBQztVQUNOQyxJQUFJLEVBQUVRLFFBQVEsQ0FBQ3BCLElBQUksQ0FBQ3dCLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztVQUNyQ1osSUFBSSxFQUFFO1FBQ1YsQ0FBQyxDQUFDO01BQ047SUFDSixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEzQyxNQUFBLENBRURrRSxlQUFlLEdBQWYsU0FBQUEsZ0JBQWdCckMsTUFBTSxFQUFFc0MsU0FBUyxFQUFFO0lBQUEsSUFBQUMsTUFBQTtJQUMvQixJQUFNckQsT0FBTyxHQUFBc0QsTUFBQSxDQUFBQyxNQUFBO01BQUtDLGtCQUFrQixFQUFFSjtJQUFTLEdBQUssSUFBSSxDQUFDcEQsT0FBTyxDQUFFO0lBQ2xFLElBQU15RCxLQUFLLEdBQUdDLGtFQUFZLEVBQUU7SUFFNUIsSUFBSSxJQUFJLENBQUN0RSxNQUFNLEtBQUssSUFBSSxFQUFFO01BQ3RCLElBQUksQ0FBQ0EsTUFBTSxHQUFHRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzdCO0lBRUEsSUFBTXFFLE9BQU8sR0FBRztNQUNaQyxRQUFRLEVBQUU7SUFDZCxDQUFDO0lBRURILEtBQUssQ0FBQ0ksSUFBSSxFQUFFO0lBQ1osSUFBSSxDQUFDekUsTUFBTSxDQUFDMEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUNwRCxRQUFRLENBQUMsY0FBYyxDQUFDO0lBRTNEb0Isa0VBQUssQ0FBQ0MsR0FBRyxDQUFDZ0MsaUJBQWlCLENBQUNDLGVBQWUsQ0FBQ2xELE1BQU0sRUFBRTZDLE9BQU8sRUFBRSxVQUFDekIsR0FBRyxFQUFFQyxRQUFRLEVBQUs7TUFDNUVzQixLQUFLLENBQUNRLGFBQWEsQ0FBQzlCLFFBQVEsQ0FBQytCLE9BQU8sQ0FBQztNQUNyQyxJQUFNQyxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQW1CQSxDQUFBLEVBQVM7UUFDOUIsSUFBTUMsd0JBQXdCLEdBQUc5RSxDQUFDLENBQUMsbUNBQW1DLEVBQUUrRCxNQUFJLENBQUNqRSxNQUFNLENBQUM7UUFDcEYsSUFBTWlGLHVCQUF1QixHQUFHRCx3QkFBd0IsQ0FBQ0UsV0FBVyxFQUFFO1FBRXRFLElBQUlGLHdCQUF3QixDQUFDRyxNQUFNLElBQUlGLHVCQUF1QixFQUFFO1VBQzVERCx3QkFBd0IsQ0FBQ0ksR0FBRyxDQUFDLFFBQVEsRUFBRUgsdUJBQXVCLENBQUM7UUFDbkU7TUFDSixDQUFDO01BRUQsSUFBSWhCLE1BQUksQ0FBQ2pFLE1BQU0sQ0FBQ3FGLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM5Qk4sbUJBQW1CLEVBQUU7TUFDekIsQ0FBQyxNQUFNO1FBQ0hkLE1BQUksQ0FBQ2pFLE1BQU0sQ0FBQ3NGLEdBQUcsQ0FBQ0MseURBQVcsQ0FBQ0MsTUFBTSxFQUFFVCxtQkFBbUIsQ0FBQztNQUM1RDtNQUVBZCxNQUFJLENBQUN3QixjQUFjLEdBQUcsSUFBSUMsaUVBQWUsQ0FBQ3pCLE1BQUksQ0FBQ2pFLE1BQU0sRUFBRVksT0FBTyxDQUFDO01BRS9EcUQsTUFBSSxDQUFDMEIsb0JBQW9CLEVBQUU7SUFDL0IsQ0FBQyxDQUFDO0lBRUZqRCxrRUFBSyxDQUFDa0QsS0FBSyxDQUFDQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsVUFBQ0MsS0FBSyxFQUFFQyxhQUFhLEVBQUs7TUFDOUQsSUFBTUMsS0FBSyxHQUFHOUYsQ0FBQyxDQUFDNkYsYUFBYSxDQUFDLENBQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDO01BQzNDLElBQU11QixPQUFPLEdBQUcvRixDQUFDLENBQUMsY0FBYyxFQUFFOEYsS0FBSyxDQUFDO01BQ3hDLElBQU1FLFdBQVcsR0FBR2hHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztNQUV6Q3dDLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ2dDLGlCQUFpQixDQUFDd0IsWUFBWSxDQUFDbkMsU0FBUyxFQUFFZ0MsS0FBSyxDQUFDSSxTQUFTLEVBQUUsRUFBRSxVQUFDdEQsR0FBRyxFQUFFdUQsTUFBTSxFQUFLO1FBQ3BGLElBQU0xRSxJQUFJLEdBQUcwRSxNQUFNLENBQUMxRSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBRTlCLElBQUltQixHQUFHLEVBQUU7VUFDTFQsMkRBQUksQ0FBQ0MsSUFBSSxDQUFDO1lBQ05DLElBQUksRUFBRU8sR0FBRztZQUNUTixJQUFJLEVBQUU7VUFDVixDQUFDLENBQUM7VUFDRixPQUFPLEtBQUs7UUFDaEI7UUFFQSxJQUFJYixJQUFJLENBQUMyRSxrQkFBa0IsRUFBRTtVQUN6QnBHLENBQUMsQ0FBQyxvQkFBb0IsRUFBRWdHLFdBQVcsQ0FBQyxDQUFDM0QsSUFBSSxDQUFDWixJQUFJLENBQUMyRSxrQkFBa0IsQ0FBQztVQUNsRUwsT0FBTyxDQUFDTSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztVQUM5QkwsV0FBVyxDQUFDekQsSUFBSSxFQUFFO1FBQ3RCLENBQUMsTUFBTTtVQUNId0QsT0FBTyxDQUFDTSxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztVQUMvQkwsV0FBVyxDQUFDMUYsSUFBSSxFQUFFO1FBQ3RCO1FBRUEsSUFBSSxDQUFDbUIsSUFBSSxDQUFDNkUsV0FBVyxJQUFJLENBQUM3RSxJQUFJLENBQUM4RSxPQUFPLEVBQUU7VUFDcENSLE9BQU8sQ0FBQ00sSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7UUFDbEMsQ0FBQyxNQUFNO1VBQ0hOLE9BQU8sQ0FBQ00sSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7UUFDbkM7TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUExRyxNQUFBLENBRURxRCxjQUFjLEdBQWQsU0FBQUEsZUFBZUQsTUFBTSxFQUFFO0lBQUEsSUFBQXlELE1BQUE7SUFDbkIsSUFBTUMsY0FBYyxHQUFHekcsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQ0MsWUFBWSxDQUFDO0lBQzlELElBQU15RyxjQUFjLEdBQUcxRyxDQUFDLENBQUMsd0JBQXdCLENBQUM7SUFFbEQsSUFBTXFFLE9BQU8sR0FBRztNQUNaQyxRQUFRLEVBQUU7UUFDTk0sT0FBTyxFQUFFLElBQUksQ0FBQ25FLFVBQVUsR0FBRyxxQkFBcUIsR0FBRyxjQUFjO1FBQ2pFa0csTUFBTSxFQUFFLElBQUksQ0FBQ2xHLFVBQVUsR0FBRyxvQkFBb0IsR0FBRyxhQUFhO1FBQzlEbUcsU0FBUyxFQUFFLGlCQUFpQjtRQUM1QkMsY0FBYyxFQUFFLHNCQUFzQjtRQUN0Q0MseUJBQXlCLEVBQUU7TUFDL0I7SUFDSixDQUFDO0lBRUQsSUFBSSxDQUFDekcsUUFBUSxDQUFDa0MsSUFBSSxFQUFFOztJQUVwQjtJQUNBLElBQUlRLE1BQU0sSUFBSTBELGNBQWMsQ0FBQ3hCLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDdkMsT0FBTy9ELE1BQU0sQ0FBQzZGLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0lBQ25DO0lBRUF4RSxrRUFBSyxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQ3VFLFVBQVUsQ0FBQzVDLE9BQU8sRUFBRSxVQUFDekIsR0FBRyxFQUFFQyxRQUFRLEVBQUs7TUFDbEQyRCxNQUFJLENBQUN2RyxZQUFZLENBQUNpSCxJQUFJLENBQUNyRSxRQUFRLENBQUMrQixPQUFPLENBQUM7TUFDeEM0QixNQUFJLENBQUNyRyxXQUFXLENBQUMrRyxJQUFJLENBQUNyRSxRQUFRLENBQUM4RCxNQUFNLENBQUM7TUFDdENILE1BQUksQ0FBQ3RHLGFBQWEsQ0FBQ2dILElBQUksQ0FBQ3JFLFFBQVEsQ0FBQ2dFLGNBQWMsQ0FBQztNQUNoREwsTUFBSSxDQUFDcEcsMkJBQTJCLENBQUM4RyxJQUFJLENBQUNyRSxRQUFRLENBQUNpRSx5QkFBeUIsQ0FBQztNQUV6RUosY0FBYyxDQUFDUyxXQUFXLENBQUN0RSxRQUFRLENBQUMrRCxTQUFTLENBQUM7TUFDOUNKLE1BQUksQ0FBQ3ZGLFVBQVUsRUFBRTtNQUNqQnVGLE1BQUksQ0FBQ25HLFFBQVEsQ0FBQ0MsSUFBSSxFQUFFO01BRXBCLElBQU04RyxRQUFRLEdBQUdwSCxDQUFDLENBQUMsc0JBQXNCLEVBQUV3RyxNQUFJLENBQUN2RyxZQUFZLENBQUMsQ0FBQ3dCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO01BRXZGekIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDcUgsT0FBTyxDQUFDLHNCQUFzQixFQUFFRCxRQUFRLENBQUM7TUFFbkRwSCxDQUFDLHlCQUF1QndHLE1BQUksQ0FBQ2pHLGlCQUFpQixTQUFNaUcsTUFBSSxDQUFDdkcsWUFBWSxDQUFDLENBQ2pFcUgsTUFBTSxvQkFBa0JkLE1BQUksQ0FBQ2hHLHdCQUF3QixRQUFLLENBQzFENkcsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUN6QixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUExSCxNQUFBLENBRUQ0SCxjQUFjLEdBQWQsU0FBQUEsZUFBQSxFQUFpQjtJQUFBLElBQUFDLE1BQUE7SUFDYixJQUFNQyxlQUFlLEdBQUcsR0FBRztJQUMzQixJQUFNcEcsVUFBVSxHQUFHcUcsa0RBQUEsQ0FBS0Msc0RBQUEsQ0FBUyxJQUFJLENBQUN0RyxVQUFVLEVBQUVvRyxlQUFlLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDekUsSUFBTXRFLHVCQUF1QixHQUFHdUUsa0RBQUEsQ0FBS0Msc0RBQUEsQ0FBUyxJQUFJLENBQUN4RSx1QkFBdUIsRUFBRXNFLGVBQWUsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNuRyxJQUFNL0QsY0FBYyxHQUFHZ0Usa0RBQUEsQ0FBS0Msc0RBQUEsQ0FBUyxJQUFJLENBQUNqRSxjQUFjLEVBQUUrRCxlQUFlLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDakYsSUFBSXJFLE1BQU07O0lBRVY7SUFDQXBELENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUNDLFlBQVksQ0FBQyxDQUFDMEYsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBQyxLQUFLLEVBQUk7TUFDNUQsSUFBTXRFLE9BQU8sR0FBR3RCLENBQUMsQ0FBQzRGLEtBQUssQ0FBQ0MsYUFBYSxDQUFDO01BRXRDRCxLQUFLLENBQUNnQyxjQUFjLEVBQUU7O01BRXRCO01BQ0F2RyxVQUFVLENBQUNDLE9BQU8sQ0FBQztJQUN2QixDQUFDLENBQUM7O0lBRUY7SUFDQXRCLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUNDLFlBQVksQ0FBQyxDQUFDMEYsRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTa0MsVUFBVUEsQ0FBQSxFQUFHO01BQzNFekUsTUFBTSxHQUFHLElBQUksQ0FBQzBFLEtBQUs7SUFDdkIsQ0FBQyxDQUFDLENBQUNDLE1BQU0sQ0FBQyxVQUFBbkMsS0FBSyxFQUFJO01BQ2YsSUFBTXRFLE9BQU8sR0FBR3RCLENBQUMsQ0FBQzRGLEtBQUssQ0FBQ0MsYUFBYSxDQUFDO01BQ3RDRCxLQUFLLENBQUNnQyxjQUFjLEVBQUU7O01BRXRCO01BQ0F6RSx1QkFBdUIsQ0FBQzdCLE9BQU8sRUFBRThCLE1BQU0sQ0FBQztJQUM1QyxDQUFDLENBQUM7SUFFRnBELENBQUMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDQyxZQUFZLENBQUMsQ0FBQzBGLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQ3RELElBQU1wRSxNQUFNLEdBQUd4QixDQUFDLENBQUM0RixLQUFLLENBQUNDLGFBQWEsQ0FBQyxDQUFDcEUsSUFBSSxDQUFDLFlBQVksQ0FBQztNQUN4RCxJQUFNdUcsTUFBTSxHQUFHaEksQ0FBQyxDQUFDNEYsS0FBSyxDQUFDQyxhQUFhLENBQUMsQ0FBQ3BFLElBQUksQ0FBQyxlQUFlLENBQUM7TUFDM0RVLDJEQUFJLENBQUNDLElBQUksQ0FBQztRQUNOQyxJQUFJLEVBQUUyRixNQUFNO1FBQ1oxRixJQUFJLEVBQUUsU0FBUztRQUNmMkYsZ0JBQWdCLEVBQUUsSUFBSTtRQUN0QkMsZ0JBQWdCLEVBQUVWLE1BQUksQ0FBQzlHLE9BQU8sQ0FBQ3dIO01BQ25DLENBQUMsQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBQ2hDLE1BQU0sRUFBSztRQUNoQixJQUFJQSxNQUFNLENBQUMyQixLQUFLLEVBQUU7VUFDZDtVQUNBcEUsY0FBYyxDQUFDbEMsTUFBTSxDQUFDO1FBQzFCO01BQ0osQ0FBQyxDQUFDO01BQ0ZvRSxLQUFLLENBQUNnQyxjQUFjLEVBQUU7SUFDMUIsQ0FBQyxDQUFDO0lBRUY1SCxDQUFDLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDQyxZQUFZLENBQUMsQ0FBQzBGLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQzFELElBQU1wRSxNQUFNLEdBQUd4QixDQUFDLENBQUM0RixLQUFLLENBQUNDLGFBQWEsQ0FBQyxDQUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQztNQUN0RCxJQUFNcUMsU0FBUyxHQUFHOUQsQ0FBQyxDQUFDNEYsS0FBSyxDQUFDQyxhQUFhLENBQUMsQ0FBQ3BFLElBQUksQ0FBQyxXQUFXLENBQUM7TUFDMURtRSxLQUFLLENBQUNnQyxjQUFjLEVBQUU7TUFDdEI7TUFDQUosTUFBSSxDQUFDM0QsZUFBZSxDQUFDckMsTUFBTSxFQUFFc0MsU0FBUyxDQUFDO0lBQzNDLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQW5FLE1BQUEsQ0FFRHlJLG1CQUFtQixHQUFuQixTQUFBQSxvQkFBQSxFQUFzQjtJQUFBLElBQUFDLE1BQUE7SUFDbEIsSUFBTUMsZ0JBQWdCLEdBQUd0SSxDQUFDLENBQUMsY0FBYyxDQUFDO0lBQzFDLElBQU11SSxXQUFXLEdBQUd2SSxDQUFDLENBQUMsY0FBYyxDQUFDO0lBQ3JDLElBQU13SSxVQUFVLEdBQUd4SSxDQUFDLENBQUMscUJBQXFCLEVBQUV1SSxXQUFXLENBQUM7SUFFeER2SSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQzJGLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQ3ZDQSxLQUFLLENBQUNnQyxjQUFjLEVBQUU7TUFFdEI1SCxDQUFDLENBQUM0RixLQUFLLENBQUNDLGFBQWEsQ0FBQyxDQUFDdkYsSUFBSSxFQUFFO01BQzdCZ0ksZ0JBQWdCLENBQUMvRixJQUFJLEVBQUU7TUFDdkJ2QyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQ3VDLElBQUksRUFBRTtNQUMvQmlHLFVBQVUsQ0FBQ25CLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUZySCxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQzJGLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQzFDQSxLQUFLLENBQUNnQyxjQUFjLEVBQUU7TUFFdEJVLGdCQUFnQixDQUFDaEksSUFBSSxFQUFFO01BQ3ZCTixDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQ00sSUFBSSxFQUFFO01BQy9CTixDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQ3VDLElBQUksRUFBRTtJQUNoQyxDQUFDLENBQUM7SUFFRmdHLFdBQVcsQ0FBQzVDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQzlCLElBQU02QyxJQUFJLEdBQUdELFVBQVUsQ0FBQzNHLEdBQUcsRUFBRTtNQUU3QitELEtBQUssQ0FBQ2dDLGNBQWMsRUFBRTs7TUFFdEI7TUFDQSxJQUFJLENBQUNhLElBQUksRUFBRTtRQUNQLE9BQU90RywyREFBSSxDQUFDQyxJQUFJLENBQUM7VUFDYkMsSUFBSSxFQUFFbUcsVUFBVSxDQUFDL0csSUFBSSxDQUFDLE9BQU8sQ0FBQztVQUM5QmEsSUFBSSxFQUFFO1FBQ1YsQ0FBQyxDQUFDO01BQ047TUFFQUUsa0VBQUssQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUNnRyxTQUFTLENBQUNELElBQUksRUFBRSxVQUFDN0YsR0FBRyxFQUFFQyxRQUFRLEVBQUs7UUFDOUMsSUFBSUEsUUFBUSxDQUFDcEIsSUFBSSxDQUFDcUIsTUFBTSxLQUFLLFNBQVMsRUFBRTtVQUNwQ3VGLE1BQUksQ0FBQ3JGLGNBQWMsRUFBRTtRQUN6QixDQUFDLE1BQU07VUFDSGIsMkRBQUksQ0FBQ0MsSUFBSSxDQUFDO1lBQ044RSxJQUFJLEVBQUVyRSxRQUFRLENBQUNwQixJQUFJLENBQUN3QixNQUFNLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckNaLElBQUksRUFBRTtVQUNWLENBQUMsQ0FBQztRQUNOO01BQ0osQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBM0MsTUFBQSxDQUVEZ0oseUJBQXlCLEdBQXpCLFNBQUFBLDBCQUFBLEVBQTRCO0lBQUEsSUFBQUMsTUFBQTtJQUN4QixJQUFNQyxjQUFjLEdBQUc3SSxDQUFDLENBQUMsd0JBQXdCLENBQUM7SUFDbEQsSUFBTThJLFNBQVMsR0FBRzlJLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQztJQUNsRCxJQUFNK0ksVUFBVSxHQUFHL0ksQ0FBQyxDQUFDLG1CQUFtQixFQUFFOEksU0FBUyxDQUFDO0lBRXBEOUksQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMyRixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUFDLEtBQUssRUFBSTtNQUM1Q0EsS0FBSyxDQUFDZ0MsY0FBYyxFQUFFO01BQ3RCNUgsQ0FBQyxDQUFDNEYsS0FBSyxDQUFDQyxhQUFhLENBQUMsQ0FBQ21ELE1BQU0sRUFBRTtNQUMvQkgsY0FBYyxDQUFDRyxNQUFNLEVBQUU7TUFDdkJoSixDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQ2dKLE1BQU0sRUFBRTtJQUMxQyxDQUFDLENBQUM7SUFFRmhKLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDMkYsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBQyxLQUFLLEVBQUk7TUFDL0NBLEtBQUssQ0FBQ2dDLGNBQWMsRUFBRTtNQUN0QmlCLGNBQWMsQ0FBQ0csTUFBTSxFQUFFO01BQ3ZCaEosQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUNnSixNQUFNLEVBQUU7TUFDbkNoSixDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQ2dKLE1BQU0sRUFBRTtJQUMxQyxDQUFDLENBQUM7SUFFRkYsU0FBUyxDQUFDbkQsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFBQyxLQUFLLEVBQUk7TUFDNUIsSUFBTTZDLElBQUksR0FBR00sVUFBVSxDQUFDbEgsR0FBRyxFQUFFO01BRTdCK0QsS0FBSyxDQUFDZ0MsY0FBYyxFQUFFO01BRXRCLElBQUksQ0FBQ3FCLGtGQUFvQixDQUFDUixJQUFJLENBQUMsRUFBRTtRQUM3QixJQUFNUyxvQkFBb0IsR0FBR0Msb0dBQTJCLENBQUNQLE1BQUksQ0FBQ2xJLE9BQU8sQ0FBQztRQUN0RSxPQUFPeUIsMkRBQUksQ0FBQ0MsSUFBSSxDQUFDO1VBQ2JDLElBQUksRUFBRTZHLG9CQUFvQixDQUFDRSx3QkFBd0I7VUFDbkQ5RyxJQUFJLEVBQUU7UUFDVixDQUFDLENBQUM7TUFDTjtNQUVBRSxrRUFBSyxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQzJHLG9CQUFvQixDQUFDWixJQUFJLEVBQUUsVUFBQzdGLEdBQUcsRUFBRTBHLElBQUksRUFBSztRQUNyRCxJQUFJQSxJQUFJLENBQUM3SCxJQUFJLENBQUNxQixNQUFNLEtBQUssU0FBUyxFQUFFO1VBQ2hDOEYsTUFBSSxDQUFDNUYsY0FBYyxFQUFFO1FBQ3pCLENBQUMsTUFBTTtVQUNIYiwyREFBSSxDQUFDQyxJQUFJLENBQUM7WUFDTjhFLElBQUksRUFBRW9DLElBQUksQ0FBQzdILElBQUksQ0FBQ3dCLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNqQ1osSUFBSSxFQUFFO1VBQ1YsQ0FBQyxDQUFDO1FBQ047TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEzQyxNQUFBLENBRUQ0SixzQkFBc0IsR0FBdEIsU0FBQUEsdUJBQUEsRUFBeUI7SUFBQSxJQUFBQyxNQUFBO0lBQ3JCLElBQU1yRixLQUFLLEdBQUdDLGtFQUFZLEVBQUU7SUFFNUJwRSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQzJGLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQzNDLElBQU1wRSxNQUFNLEdBQUd4QixDQUFDLENBQUM0RixLQUFLLENBQUNDLGFBQWEsQ0FBQyxDQUFDcEUsSUFBSSxDQUFDLGNBQWMsQ0FBQztNQUMxRCxJQUFNNEMsT0FBTyxHQUFHO1FBQ1pDLFFBQVEsRUFBRTtNQUNkLENBQUM7TUFFRHNCLEtBQUssQ0FBQ2dDLGNBQWMsRUFBRTtNQUV0QnpELEtBQUssQ0FBQ0ksSUFBSSxFQUFFO01BRVovQixrRUFBSyxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQytHLDBCQUEwQixDQUFDakksTUFBTSxFQUFFNkMsT0FBTyxFQUFFLFVBQUN6QixHQUFHLEVBQUVDLFFBQVEsRUFBSztRQUMxRXNCLEtBQUssQ0FBQ1EsYUFBYSxDQUFDOUIsUUFBUSxDQUFDK0IsT0FBTyxDQUFDO1FBRXJDNEUsTUFBSSxDQUFDL0Qsb0JBQW9CLEVBQUU7TUFDL0IsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBOUYsTUFBQSxDQUVEOEYsb0JBQW9CLEdBQXBCLFNBQUFBLHFCQUFBLEVBQXVCO0lBQ25CekYsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMyRixFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUFDLEtBQUssRUFBSTtNQUM1QyxJQUFNOEQsT0FBTyxHQUFHMUosQ0FBQyxDQUFDNEYsS0FBSyxDQUFDQyxhQUFhLENBQUM7TUFDdEMsSUFBTThELEVBQUUsR0FBR0QsT0FBTyxDQUFDN0gsR0FBRyxFQUFFO01BQ3hCLElBQU0rSCxLQUFLLEdBQUdGLE9BQU8sQ0FBQ2pJLElBQUksQ0FBQyxPQUFPLENBQUM7TUFFbkMsSUFBSSxDQUFDa0ksRUFBRSxFQUFFO1FBQ0w7TUFDSjtNQUVBLElBQU1FLFlBQVksR0FBR0gsT0FBTyxDQUFDbEYsSUFBSSxtQkFBaUJtRixFQUFFLE9BQUksQ0FBQ2xJLElBQUksQ0FBQyxjQUFjLENBQUM7TUFFN0V6QixDQUFDLDBCQUF3QjRKLEtBQUssQ0FBRyxDQUFDdEosSUFBSSxFQUFFO01BQ3hDTixDQUFDLDBCQUF3QjRKLEtBQUssU0FBSUQsRUFBRSxDQUFHLENBQUNwSCxJQUFJLEVBQUU7TUFFOUMsSUFBSXNILFlBQVksRUFBRTtRQUNkN0osQ0FBQyw0QkFBMEI0SixLQUFLLENBQUcsQ0FBQ3JILElBQUksRUFBRTtNQUM5QyxDQUFDLE1BQU07UUFDSHZDLENBQUMsNEJBQTBCNEosS0FBSyxDQUFHLENBQUN0SixJQUFJLEVBQUU7TUFDOUM7SUFDSixDQUFDLENBQUM7SUFFRk4sQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUNxSCxPQUFPLENBQUMsUUFBUSxDQUFDO0lBRTNDLFNBQVN5QyxXQUFXQSxDQUFBLEVBQUc7TUFDbkIsSUFBTWhDLEtBQUssR0FBRzlILENBQUMsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDNkIsR0FBRyxFQUFFO01BQ2xFLElBQU1rSSxXQUFXLEdBQUcvSixDQUFDLENBQUMsc0JBQXNCLENBQUM7TUFDN0MsSUFBTWdLLFVBQVUsR0FBR2hLLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztNQUU5QyxJQUFJOEgsS0FBSyxLQUFLLE1BQU0sRUFBRTtRQUNsQmlDLFdBQVcsQ0FBQ3hILElBQUksRUFBRTtRQUNsQnlILFVBQVUsQ0FBQzFKLElBQUksRUFBRTtNQUNyQixDQUFDLE1BQU07UUFDSHlKLFdBQVcsQ0FBQ3pKLElBQUksRUFBRTtRQUNsQjBKLFVBQVUsQ0FBQ3pILElBQUksRUFBRTtNQUNyQjtJQUNKO0lBRUF2QyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQzJGLEVBQUUsQ0FBQyxPQUFPLEVBQUVtRSxXQUFXLENBQUM7SUFFbkRBLFdBQVcsRUFBRTtFQUNqQixDQUFDO0VBQUFuSyxNQUFBLENBRURzQixVQUFVLEdBQVYsU0FBQUEsV0FBQSxFQUFhO0lBQUEsSUFBQWdKLE9BQUE7SUFDVCxJQUFJLENBQUMxQyxjQUFjLEVBQUU7SUFDckIsSUFBSSxDQUFDYSxtQkFBbUIsRUFBRTtJQUMxQixJQUFJLENBQUNtQixzQkFBc0IsRUFBRTtJQUM3QixJQUFJLENBQUNaLHlCQUF5QixFQUFFOztJQUVoQztJQUNBLElBQU11QixxQkFBcUIsR0FBRztNQUMxQkMsT0FBTyxFQUFFLElBQUksQ0FBQ3pKLE9BQU8sQ0FBQzBKLDJCQUEyQjtNQUNqREMsUUFBUSxFQUFFLElBQUksQ0FBQzNKLE9BQU8sQ0FBQzRKO0lBQzNCLENBQUM7SUFDRCxJQUFJLENBQUNDLGlCQUFpQixHQUFHLElBQUlDLGdFQUFpQixDQUFDeEssQ0FBQyxDQUFDLDJCQUEyQixDQUFDLEVBQUVrSyxxQkFBcUIsQ0FBQzs7SUFFckc7SUFDQWxLLENBQUMsQ0FBQ3lLLFFBQVEsQ0FBQyxDQUFDOUUsRUFBRSxDQUFDLDBCQUEwQixFQUFFO01BQUEsT0FBTXNFLE9BQUksQ0FBQ2pILGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFBQSxFQUFDO0VBRWhGLENBQUM7RUFBQSxPQUFBMUQsSUFBQTtBQUFBLEVBamU2Qm9MLHFEQUFXOzs7Ozs7Ozs7Ozs7OztBQ2I3QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW1EO0FBQ25CO0FBQ2U7QUFDb0M7QUFDNUI7QUFDZDtBQUFBLElBRXBCRixpQkFBaUI7RUFDbEMsU0FBQUEsa0JBQVlHLFFBQVEsRUFBRVQscUJBQXFCLEVBQUU7SUFDekMsSUFBSSxDQUFDUyxRQUFRLEdBQUdBLFFBQVE7SUFFeEIsSUFBSSxDQUFDQyxNQUFNLEdBQUc1SyxDQUFDLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDMkssUUFBUSxDQUFDO0lBQzNELElBQUksQ0FBQ0UscUJBQXFCLEdBQUcsS0FBSztJQUNsQyxJQUFJLENBQUNYLHFCQUFxQixHQUFHQSxxQkFBcUI7SUFDbEQsSUFBSSxDQUFDWSxrQkFBa0IsRUFBRTtJQUN6QixJQUFJLENBQUNDLHNCQUFzQixFQUFFO0lBQzdCLElBQUksQ0FBQ0MsbUJBQW1CLEVBQUU7RUFDOUI7RUFBQyxJQUFBckwsTUFBQSxHQUFBNkssaUJBQUEsQ0FBQTVLLFNBQUE7RUFBQUQsTUFBQSxDQUVEbUwsa0JBQWtCLEdBQWxCLFNBQUFBLG1CQUFBLEVBQXFCO0lBQUEsSUFBQXZKLEtBQUE7SUFDakIsSUFBTTBKLHNCQUFzQixHQUFHakwsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0lBRXBELElBQUksQ0FBQ3VLLGlCQUFpQixHQUFHLCtCQUErQjtJQUN4RCxJQUFJLENBQUNXLGlCQUFpQixHQUFHQywyREFBRyxDQUFDO01BQ3pCQyxNQUFNLEVBQUssSUFBSSxDQUFDYixpQkFBaUIsK0JBQTRCO01BQzdEYyxHQUFHLEVBQUVDLGtGQUF5QkE7SUFDbEMsQ0FBQyxDQUFDO0lBRUZ0TCxDQUFDLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDMkssUUFBUSxDQUFDLENBQUNoRixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUFDLEtBQUssRUFBSTtNQUMvRDtNQUNBO01BQ0E7TUFDQSxJQUFJcUYsc0JBQXNCLENBQUNNLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyQ04sc0JBQXNCLENBQUNPLFVBQVUsQ0FBQyxNQUFNLENBQUM7TUFDN0M7TUFFQVAsc0JBQXNCLENBQUNNLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO01BQzVDO01BQ0E7TUFDQTtNQUNBLElBQUl2TCxDQUFDLENBQUl1QixLQUFJLENBQUNnSixpQkFBaUIsd0NBQW1DLENBQUMxSSxHQUFHLEVBQUUsRUFBRTtRQUN0RU4sS0FBSSxDQUFDMkosaUJBQWlCLENBQUNPLFlBQVksRUFBRTtNQUN6QztNQUVBLElBQUlsSyxLQUFJLENBQUMySixpQkFBaUIsQ0FBQ1EsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hDO01BQ0o7TUFFQTlGLEtBQUssQ0FBQ2dDLGNBQWMsRUFBRTtJQUMxQixDQUFDLENBQUM7SUFFRixJQUFJLENBQUMrRCxjQUFjLEVBQUU7SUFDckIsSUFBSSxDQUFDQyxtQkFBbUIsRUFBRTtJQUMxQixJQUFJLENBQUNDLFlBQVksRUFBRTtFQUN2QixDQUFDO0VBQUFsTSxNQUFBLENBRURnTSxjQUFjLEdBQWQsU0FBQUEsZUFBQSxFQUFpQjtJQUNiLElBQUksQ0FBQ1QsaUJBQWlCLENBQUNZLEdBQUcsQ0FBQyxDQUN2QjtNQUNJQyxRQUFRLEVBQUssSUFBSSxDQUFDeEIsaUJBQWlCLHVDQUFrQztNQUNyRXlCLFFBQVEsRUFBRSxTQUFBQSxTQUFDQyxFQUFFLEVBQUVwSyxHQUFHLEVBQUs7UUFDbkIsSUFBTXFLLFNBQVMsR0FBRzVJLE1BQU0sQ0FBQ3pCLEdBQUcsQ0FBQztRQUM3QixJQUFNc0UsTUFBTSxHQUFHK0YsU0FBUyxLQUFLLENBQUMsSUFBSSxDQUFDNUksTUFBTSxDQUFDNkksS0FBSyxDQUFDRCxTQUFTLENBQUM7UUFFMURELEVBQUUsQ0FBQzlGLE1BQU0sQ0FBQztNQUNkLENBQUM7TUFDRGlHLFlBQVksRUFBRSxJQUFJLENBQUNsQyxxQkFBcUIsQ0FBQ0M7SUFDN0MsQ0FBQyxDQUNKLENBQUM7RUFDTixDQUFDO0VBQUF4SyxNQUFBLENBRURpTSxtQkFBbUIsR0FBbkIsU0FBQUEsb0JBQUEsRUFBc0I7SUFBQSxJQUFBdkksTUFBQTtJQUNsQixJQUFJLENBQUM2SCxpQkFBaUIsQ0FBQ1ksR0FBRyxDQUFDLENBQ3ZCO01BQ0lDLFFBQVEsRUFBRS9MLENBQUMsQ0FBSSxJQUFJLENBQUN1SyxpQkFBaUIsc0NBQWlDO01BQ3RFeUIsUUFBUSxFQUFFLFNBQUFBLFNBQUNDLEVBQUUsRUFBSztRQUNkLElBQUk5RixNQUFNO1FBRVYsSUFBTWtHLElBQUksR0FBR3JNLENBQUMsQ0FBSXFELE1BQUksQ0FBQ2tILGlCQUFpQixzQ0FBaUM7UUFFekUsSUFBSThCLElBQUksQ0FBQ3BILE1BQU0sRUFBRTtVQUNiLElBQU1xSCxNQUFNLEdBQUdELElBQUksQ0FBQ3hLLEdBQUcsRUFBRTtVQUV6QnNFLE1BQU0sR0FBR21HLE1BQU0sSUFBSUEsTUFBTSxDQUFDckgsTUFBTSxJQUFJcUgsTUFBTSxLQUFLLGdCQUFnQjtRQUNuRTtRQUVBTCxFQUFFLENBQUM5RixNQUFNLENBQUM7TUFDZCxDQUFDO01BQ0RpRyxZQUFZLEVBQUUsSUFBSSxDQUFDbEMscUJBQXFCLENBQUNHO0lBQzdDLENBQUMsQ0FDSixDQUFDO0VBQ047O0VBRUE7QUFDSjtBQUNBLEtBRkk7RUFBQTFLLE1BQUEsQ0FHQWtNLFlBQVksR0FBWixTQUFBQSxhQUFBLEVBQWU7SUFDWCxJQUFNVSxhQUFhLEdBQUcsK0JBQStCO0lBRXJEdk0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDMkYsRUFBRSxDQUFDLE9BQU8sRUFBRTRHLGFBQWEsRUFBRSxVQUFDM0csS0FBSyxFQUFLO01BQzVDLElBQU00RyxpQkFBaUIsR0FBR3hNLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztNQUNuRCxJQUFNeU0scUJBQXFCLEdBQUd6TSxDQUFDLENBQUMsMEJBQTBCLENBQUM7TUFFM0Q0RixLQUFLLENBQUNnQyxjQUFjLEVBQUU7TUFFdEI0RSxpQkFBaUIsQ0FBQ0UsV0FBVyxDQUFDLGtCQUFrQixDQUFDO01BQ2pERCxxQkFBcUIsQ0FBQ0MsV0FBVyxDQUFDLGtCQUFrQixDQUFDO0lBQ3pELENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQS9NLE1BQUEsQ0FFRG9MLHNCQUFzQixHQUF0QixTQUFBQSx1QkFBQSxFQUF5QjtJQUFBLElBQUFwSCxNQUFBO0lBQ3JCLElBQUlnSixLQUFLOztJQUVUO0lBQ0FDLHFFQUFZLENBQUMsSUFBSSxDQUFDaEMsTUFBTSxFQUFFLElBQUksQ0FBQ2xLLE9BQU8sRUFBRTtNQUFFbU0sY0FBYyxFQUFFO0lBQUssQ0FBQyxFQUFFLFVBQUNqSyxHQUFHLEVBQUVrSyxLQUFLLEVBQUs7TUFDOUUsSUFBSWxLLEdBQUcsRUFBRTtRQUNMVCwyREFBSSxDQUFDQyxJQUFJLENBQUM7VUFDTkMsSUFBSSxFQUFFTyxHQUFHO1VBQ1ROLElBQUksRUFBRTtRQUNWLENBQUMsQ0FBQztRQUVGLE1BQU0sSUFBSXlLLEtBQUssQ0FBQ25LLEdBQUcsQ0FBQztNQUN4QjtNQUVBLElBQU1vSyxNQUFNLEdBQUdoTixDQUFDLENBQUM4TSxLQUFLLENBQUM7TUFFdkIsSUFBSW5KLE1BQUksQ0FBQ3VILGlCQUFpQixDQUFDK0IsU0FBUyxDQUFDdEosTUFBSSxDQUFDaUgsTUFBTSxDQUFDLEtBQUssV0FBVyxFQUFFO1FBQy9EakgsTUFBSSxDQUFDdUgsaUJBQWlCLENBQUNuSSxNQUFNLENBQUNZLE1BQUksQ0FBQ2lILE1BQU0sQ0FBQztNQUM5QztNQUVBLElBQUkrQixLQUFLLEVBQUU7UUFDUGhKLE1BQUksQ0FBQ3VILGlCQUFpQixDQUFDbkksTUFBTSxDQUFDNEosS0FBSyxDQUFDO01BQ3hDO01BRUEsSUFBSUssTUFBTSxDQUFDRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDckJQLEtBQUssR0FBR0csS0FBSztRQUNibkosTUFBSSxDQUFDaUksbUJBQW1CLEVBQUU7TUFDOUIsQ0FBQyxNQUFNO1FBQ0hvQixNQUFNLENBQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDO1FBQzVDNEIsbUVBQVUsQ0FBQ0Msc0JBQXNCLENBQUNOLEtBQUssQ0FBQztNQUM1Qzs7TUFFQTtNQUNBO01BQ0E7TUFDQTlNLENBQUMsQ0FBQzJELE1BQUksQ0FBQzRHLGlCQUFpQixDQUFDLENBQUMvRixJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQzZJLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQztJQUM3RixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUExTixNQUFBLENBRUQyTix3QkFBd0IsR0FBeEIsU0FBQUEseUJBQXlCQyxZQUFZLEVBQUVDLGNBQWMsRUFBRUMsZ0JBQWdCLEVBQUU7SUFDckUsSUFBTUMsd0JBQXdCLEdBQUcsU0FBM0JBLHdCQUF3QkEsQ0FBSUMsa0JBQWtCLEVBQUs7TUFDckQzTixDQUFDLENBQUN1TixZQUFZLENBQUMsQ0FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsRUFBRW9DLGtCQUFrQixDQUFDO01BQzNEM04sQ0FBQyxDQUFDd04sY0FBYyxDQUFDLENBQUNuTCxJQUFJLENBQUNyQyxDQUFDLE9BQUsyTixrQkFBa0IsQ0FBRyxDQUFDdEwsSUFBSSxFQUFFLENBQUM7SUFDOUQsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFJLENBQUN3SSxxQkFBcUIsRUFBRTtNQUM3QjZDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDO01BQzNDRCxnQkFBZ0IsQ0FBQ0osV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUM1QyxDQUFDLE1BQU07TUFDSEssd0JBQXdCLENBQUMsZUFBZSxDQUFDO01BQ3pDRCxnQkFBZ0IsQ0FBQ3JNLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDekM7SUFDQSxJQUFJLENBQUN5SixxQkFBcUIsR0FBRyxDQUFDLElBQUksQ0FBQ0EscUJBQXFCO0VBQzVELENBQUM7RUFBQWxMLE1BQUEsQ0FFRHFMLG1CQUFtQixHQUFuQixTQUFBQSxvQkFBQSxFQUFzQjtJQUFBLElBQUFqSCxNQUFBO0lBQ2xCLElBQU02SixtQkFBbUIsR0FBRzVOLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxJQUFNNk4sY0FBYyxHQUFHN04sQ0FBQyxDQUFDLGlCQUFpQixDQUFDO0lBQzNDOE4sbUVBQWtCLEVBQUU7SUFDcEJELGNBQWMsQ0FBQ2xJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQ2pDLElBQU1tSSxNQUFNLEdBQUc7UUFDWEMsVUFBVSxFQUFFaE8sQ0FBQyxDQUFDLDJCQUEyQixFQUFFNk4sY0FBYyxDQUFDLENBQUNoTSxHQUFHLEVBQUU7UUFDaEVvTSxRQUFRLEVBQUVqTyxDQUFDLENBQUMseUJBQXlCLEVBQUU2TixjQUFjLENBQUMsQ0FBQ2hNLEdBQUcsRUFBRTtRQUM1RHFNLElBQUksRUFBRWxPLENBQUMsQ0FBQyx3QkFBd0IsRUFBRTZOLGNBQWMsQ0FBQyxDQUFDaE0sR0FBRyxFQUFFO1FBQ3ZEc00sUUFBUSxFQUFFbk8sQ0FBQyxDQUFDLHVCQUF1QixFQUFFNk4sY0FBYyxDQUFDLENBQUNoTSxHQUFHO01BQzVELENBQUM7TUFFRCtELEtBQUssQ0FBQ2dDLGNBQWMsRUFBRTtNQUV0QnBGLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDMEwsaUJBQWlCLENBQUNMLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxVQUFDbkwsR0FBRyxFQUFFQyxRQUFRLEVBQUs7UUFDaEY3QyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQ2tILElBQUksQ0FBQ3JFLFFBQVEsQ0FBQytCLE9BQU8sQ0FBQzs7UUFFNUM7UUFDQTVFLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDMkYsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBMEksVUFBVSxFQUFJO1VBQ2xELElBQU1DLE9BQU8sR0FBR3RPLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDNkIsR0FBRyxFQUFFO1VBRWxEd00sVUFBVSxDQUFDekcsY0FBYyxFQUFFO1VBRTNCcEYsa0VBQUssQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUM2TCxtQkFBbUIsQ0FBQ0QsT0FBTyxFQUFFLFlBQU07WUFDOUNwTixNQUFNLENBQUM2RixRQUFRLENBQUNDLE1BQU0sRUFBRTtVQUM1QixDQUFDLENBQUM7UUFDTixDQUFDLENBQUM7TUFDTixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7SUFFRmhILENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDMkYsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBQyxLQUFLLEVBQUk7TUFDOUNBLEtBQUssQ0FBQ2dDLGNBQWMsRUFBRTtNQUN0QjdELE1BQUksQ0FBQ3VKLHdCQUF3QixDQUFDMUgsS0FBSyxDQUFDQyxhQUFhLEVBQUUsbUNBQW1DLEVBQUUrSCxtQkFBbUIsQ0FBQztJQUNoSCxDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEsT0FBQXBELGlCQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2TTBDO0FBQ29DO0FBRWhCO0FBQUEsSUFFOUNoRixlQUFlLDBCQUFBZ0osbUJBQUE7RUFBQWhQLGNBQUEsQ0FBQWdHLGVBQUEsRUFBQWdKLG1CQUFBO0VBQ2hDLFNBQUFoSixnQkFBWWlKLE1BQU0sRUFBRS9OLE9BQU8sRUFBRWdPLHFCQUFxQixFQUFPO0lBQUEsSUFBQW5OLEtBQUE7SUFBQSxJQUE1Qm1OLHFCQUFxQjtNQUFyQkEscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO0lBQUE7SUFDbkRuTixLQUFBLEdBQUFpTixtQkFBQSxDQUFBRyxJQUFBLE9BQU1GLE1BQU0sRUFBRS9OLE9BQU8sQ0FBQztJQUV0QixJQUFNb0YsS0FBSyxHQUFHOUYsQ0FBQyxDQUFDLDRCQUE0QixFQUFFdUIsS0FBQSxDQUFLa04sTUFBTSxDQUFDO0lBQzFELElBQU1HLHNCQUFzQixHQUFHNU8sQ0FBQyxDQUFDLG1DQUFtQyxFQUFFOEYsS0FBSyxDQUFDO0lBQzVFLElBQU0rSSxVQUFVLEdBQUdELHNCQUFzQixDQUFDMUgsSUFBSSxFQUFFLENBQUM0SCxJQUFJLEVBQUUsQ0FBQzdKLE1BQU07SUFDOUQsSUFBTThKLGlCQUFpQixHQUFHSCxzQkFBc0IsQ0FBQ3BLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDUyxNQUFNO0lBRTlFMkosc0JBQXNCLENBQUNqSixFQUFFLENBQUMsUUFBUSxFQUFFLFlBQU07TUFDdENwRSxLQUFBLENBQUt5TixpQkFBaUIsRUFBRTtJQUM1QixDQUFDLENBQUM7SUFFRixJQUFNQyxvQkFBb0IsR0FBR0MsMkVBQXFCLENBQUNQLElBQUksQ0FBQVEsc0JBQUEsQ0FBQTVOLEtBQUEsR0FBT3dOLGlCQUFpQixDQUFDOztJQUVoRjtJQUNBO0lBQ0EsSUFBSSxDQUFDSyxxREFBQSxDQUFRVixxQkFBcUIsQ0FBQyxJQUFJSyxpQkFBaUIsS0FBS0YsVUFBVSxFQUFFO01BQ3JFLElBQU0vSyxTQUFTLEdBQUd2QyxLQUFBLENBQUtiLE9BQU8sQ0FBQ3dELGtCQUFrQjtNQUVqRDFCLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ2dDLGlCQUFpQixDQUFDd0IsWUFBWSxDQUFDbkMsU0FBUyxFQUFFZ0MsS0FBSyxDQUFDSSxTQUFTLEVBQUUsRUFBRSw4QkFBOEIsRUFBRStJLG9CQUFvQixDQUFDO0lBQ2hJLENBQUMsTUFBTTtNQUNIMU4sS0FBQSxDQUFLOE4sdUJBQXVCLENBQUNYLHFCQUFxQixDQUFDO0lBQ3ZEO0lBQUMsT0FBQW5OLEtBQUE7RUFDTDtFQUFDLElBQUE1QixNQUFBLEdBQUE2RixlQUFBLENBQUE1RixTQUFBO0VBQUFELE1BQUEsQ0FFRHFQLGlCQUFpQixHQUFqQixTQUFBQSxrQkFBQSxFQUFvQjtJQUNoQixJQUFNTSx5QkFBeUIsR0FBRyxFQUFFO0lBQ3BDLElBQU1qTCxPQUFPLEdBQUcsRUFBRTtJQUVsQnJFLENBQUMsQ0FBQ3VQLElBQUksQ0FBQ3ZQLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLFVBQUM0SixLQUFLLEVBQUU5QixLQUFLLEVBQUs7TUFDcEQsSUFBTTBILFdBQVcsR0FBRzFILEtBQUssQ0FBQzJILFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsU0FBUztNQUMvQyxJQUFNQyxXQUFXLEdBQUdILFdBQVcsQ0FBQ0ksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDZCxJQUFJLEVBQUU7TUFDcEQsSUFBTWUsUUFBUSxHQUFHTCxXQUFXLENBQUNNLFdBQVcsRUFBRSxDQUFDQyxRQUFRLENBQUMsVUFBVSxDQUFDO01BQy9ELElBQU1DLElBQUksR0FBR2xJLEtBQUssQ0FBQ21JLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQztNQUV6RCxJQUFJLENBQUNELElBQUksS0FBSyxZQUFZLElBQUlBLElBQUksS0FBSyxZQUFZLElBQUlBLElBQUksS0FBSyxjQUFjLEtBQUtsSSxLQUFLLENBQUNvSSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUNwSSxLQUFLLEtBQUssRUFBRSxJQUFJK0gsUUFBUSxFQUFFO1FBQ3RJUCx5QkFBeUIsQ0FBQ2EsSUFBSSxDQUFDckksS0FBSyxDQUFDO01BQ3pDO01BRUEsSUFBSWtJLElBQUksS0FBSyxVQUFVLElBQUlsSSxLQUFLLENBQUNvSSxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUNwSSxLQUFLLEtBQUssRUFBRSxJQUFJK0gsUUFBUSxFQUFFO1FBQ2pGUCx5QkFBeUIsQ0FBQ2EsSUFBSSxDQUFDckksS0FBSyxDQUFDO01BQ3pDO01BRUEsSUFBSWtJLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDakIsSUFBTUksV0FBVyxHQUFHQyxLQUFLLENBQUNDLElBQUksQ0FBQ3hJLEtBQUssQ0FBQ3lJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQyxVQUFDQyxNQUFNO1VBQUEsT0FBS0EsTUFBTSxDQUFDQyxhQUFhLEtBQUssQ0FBQztRQUFBLEVBQUM7UUFFOUcsSUFBSU4sV0FBVyxFQUFFO1VBQ2IsSUFBTU8sVUFBVSxHQUFHTixLQUFLLENBQUNDLElBQUksQ0FBQ3hJLEtBQUssQ0FBQ3lJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUNLLEdBQUcsQ0FBQyxVQUFDQyxDQUFDO1lBQUEsT0FBS0EsQ0FBQyxDQUFDL0ksS0FBSztVQUFBLEVBQUMsQ0FBQzVFLElBQUksQ0FBQyxHQUFHLENBQUM7VUFDN0ZtQixPQUFPLENBQUM4TCxJQUFJLENBQUlSLFdBQVcsU0FBSWdCLFVBQVUsQ0FBRztVQUU1QztRQUNKO1FBRUEsSUFBSWQsUUFBUSxFQUFFO1VBQ1ZQLHlCQUF5QixDQUFDYSxJQUFJLENBQUNySSxLQUFLLENBQUM7UUFDekM7TUFDSjtNQUVBLElBQUlrSSxJQUFJLEtBQUssWUFBWSxFQUFFO1FBQ3ZCLElBQU1TLE1BQU0sR0FBRzNJLEtBQUssQ0FBQ29JLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDNUMsSUFBTVEsYUFBYSxHQUFHRCxNQUFNLENBQUNDLGFBQWE7UUFFMUMsSUFBSUEsYUFBYSxLQUFLLENBQUMsRUFBRTtVQUNyQnJNLE9BQU8sQ0FBQzhMLElBQUksQ0FBSVIsV0FBVyxTQUFJYyxNQUFNLENBQUNwTSxPQUFPLENBQUNxTSxhQUFhLENBQUMsQ0FBQ2hCLFNBQVMsQ0FBRztVQUV6RTtRQUNKO1FBRUEsSUFBSUcsUUFBUSxFQUFFO1VBQ1ZQLHlCQUF5QixDQUFDYSxJQUFJLENBQUNySSxLQUFLLENBQUM7UUFDekM7TUFDSjtNQUVBLElBQUlrSSxJQUFJLEtBQUssZUFBZSxJQUFJQSxJQUFJLEtBQUssV0FBVyxJQUFJQSxJQUFJLEtBQUssUUFBUSxJQUFJQSxJQUFJLEtBQUssZ0JBQWdCLElBQUlBLElBQUksS0FBSyxjQUFjLEVBQUU7UUFDL0gsSUFBTWMsT0FBTyxHQUFHaEosS0FBSyxDQUFDb0ksYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUMvQyxJQUFJWSxPQUFPLEVBQUU7VUFDVCxJQUFNQyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXNCQSxDQUFBLEVBQVM7WUFDakMsSUFBTUMsbUJBQW1CLEdBQUdDLDBFQUFnQixDQUFDbkosS0FBSyxDQUFDMkgsUUFBUSxDQUFDO1lBQzVELElBQU15Qix5QkFBeUIsR0FBRyxTQUE1QkEseUJBQXlCQSxDQUFHQyxJQUFJO2NBQUEsT0FBSUEsSUFBSSxDQUFDQyxPQUFPLENBQUNDLHFCQUFxQixLQUFLUCxPQUFPLENBQUNoSixLQUFLO1lBQUE7WUFDOUYsT0FBT2tKLG1CQUFtQixDQUFDMUosTUFBTSxDQUFDNEoseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFDbkUsQ0FBQztVQUNELElBQUlsQixJQUFJLEtBQUssZUFBZSxJQUFJQSxJQUFJLEtBQUssV0FBVyxJQUFJQSxJQUFJLEtBQUssY0FBYyxFQUFFO1lBQzdFLElBQU1zQixLQUFLLEdBQUdDLDZEQUFXLEdBQUdSLHNCQUFzQixFQUFFLENBQUNyQixTQUFTLENBQUNaLElBQUksRUFBRSxHQUFHZ0MsT0FBTyxDQUFDVSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM5QixTQUFTO1lBQ25HLElBQUk0QixLQUFLLEVBQUU7Y0FDUGpOLE9BQU8sQ0FBQzhMLElBQUksQ0FBSVIsV0FBVyxTQUFJMkIsS0FBSyxDQUFHO1lBQzNDO1VBQ0o7VUFFQSxJQUFJdEIsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNuQixJQUFNc0IsTUFBSyxHQUFHQyw2REFBVyxHQUFHUixzQkFBc0IsRUFBRSxDQUFDdEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHcUIsT0FBTyxDQUFDVSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMvQixRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLElBQUk2QixNQUFLLEVBQUU7Y0FDUGpOLE9BQU8sQ0FBQzhMLElBQUksQ0FBSVIsV0FBVyxTQUFJMkIsTUFBSyxDQUFDRyxLQUFLLENBQUc7WUFDakQ7VUFDSjtVQUVBLElBQUl6QixJQUFJLEtBQUssZ0JBQWdCLEVBQUU7WUFDM0IzTCxPQUFPLENBQUM4TCxJQUFJLENBQUlSLFdBQVcsVUFBTztVQUN0QztVQUVBO1FBQ0o7UUFFQSxJQUFJSyxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7VUFDM0IzTCxPQUFPLENBQUM4TCxJQUFJLENBQUlSLFdBQVcsU0FBTTtRQUNyQztRQUVBLElBQUlFLFFBQVEsRUFBRTtVQUNWUCx5QkFBeUIsQ0FBQ2EsSUFBSSxDQUFDckksS0FBSyxDQUFDO1FBQ3pDO01BQ0o7SUFDSixDQUFDLENBQUM7SUFFRixJQUFJNEosY0FBYyxHQUFHcEMseUJBQXlCLENBQUNySyxNQUFNLEtBQUssQ0FBQyxHQUFHWixPQUFPLENBQUNzTixJQUFJLEVBQUUsQ0FBQ3pPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhO0lBQ3ZHLElBQU0wTyxJQUFJLEdBQUc1UixDQUFDLENBQUMscUJBQXFCLENBQUM7SUFFckMsSUFBSTBSLGNBQWMsRUFBRTtNQUNoQkEsY0FBYyxHQUFHQSxjQUFjLEtBQUssYUFBYSxHQUFHLEVBQUUsR0FBR0EsY0FBYztNQUN2RSxJQUFJRSxJQUFJLENBQUNyRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUM5QnFHLElBQUksQ0FBQ3JHLElBQUksQ0FBQyxzQkFBc0IsRUFBRW1HLGNBQWMsQ0FBQztNQUNyRCxDQUFDLE1BQU07UUFDSCxJQUFNRyxXQUFXLEdBQUdELElBQUksQ0FBQzFLLElBQUksRUFBRSxDQUFDNEssS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFNQyxJQUFJLEdBQUcvUixDQUFDLG1CQUFnQjZSLFdBQVcsU0FBSztRQUM5Q0UsSUFBSSxDQUFDeEcsSUFBSSxDQUFDLHNCQUFzQixFQUFFbUcsY0FBYyxDQUFDO01BQ3JEO0lBQ0o7RUFDSjs7RUFFQTtBQUNKO0FBQ0E7QUFDQSxLQUhJO0VBQUEvUixNQUFBLENBSUEwUCx1QkFBdUIsR0FBdkIsU0FBQUEsd0JBQXdCNU4sSUFBSSxFQUFFO0lBQzFCK00sbUJBQUEsQ0FBQTVPLFNBQUEsQ0FBTXlQLHVCQUF1QixDQUFBVixJQUFBLE9BQUNsTixJQUFJO0lBRWxDLElBQUksQ0FBQ2dOLE1BQU0sQ0FBQ2pLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDNkksV0FBVyxDQUFDLGNBQWMsQ0FBQztFQUNsRSxDQUFDO0VBQUEsT0FBQTdILGVBQUE7QUFBQSxFQXhJd0N3TSw2REFBa0I7Ozs7Ozs7Ozs7Ozs7O0FDTC9EO0FBQWUseUVBQVVDLElBQUksRUFBRTtFQUMzQixJQUFJLE9BQU9BLElBQUksS0FBSyxRQUFRLElBQUlBLElBQUksQ0FBQ2hOLE1BQU0sS0FBSyxDQUFDLEVBQUU7SUFDL0MsT0FBTyxLQUFLO0VBQ2hCOztFQUVBO0VBQ0EsT0FBTyxJQUFJO0FBQ2YsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ArQztBQUVhO0FBQ1g7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU2lOLGlCQUFpQkEsQ0FBQ0MsWUFBWSxFQUFFelIsT0FBTyxFQUFFO0VBQzlDLElBQU0wUixLQUFLLEdBQUdDLHVEQUFBLENBQVlGLFlBQVksQ0FBQzlMLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxVQUFDRixNQUFNLEVBQUVtTSxJQUFJLEVBQUs7SUFDekUsSUFBTUMsR0FBRyxHQUFHcE0sTUFBTTtJQUNsQm9NLEdBQUcsQ0FBQ0QsSUFBSSxDQUFDRSxJQUFJLENBQUMsR0FBR0YsSUFBSSxDQUFDeEssS0FBSztJQUMzQixPQUFPeUssR0FBRztFQUNkLENBQUMsQ0FBQztFQUVGLElBQU1FLHFCQUFxQixHQUFHO0lBQzFCOUksRUFBRSxFQUFFeUksS0FBSyxDQUFDekksRUFBRTtJQUNaLFlBQVksRUFBRXlJLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDakMsU0FBTyxhQUFhO0lBQ3BCSSxJQUFJLEVBQUVKLEtBQUssQ0FBQ0ksSUFBSTtJQUNoQixpQkFBaUIsRUFBRUosS0FBSyxDQUFDLGlCQUFpQjtFQUM5QyxDQUFDO0VBRURELFlBQVksQ0FBQ2hMLFdBQVcsQ0FBQ25ILENBQUMsQ0FBQyxtQkFBbUIsRUFBRXlTLHFCQUFxQixDQUFDLENBQUM7RUFFdkUsSUFBTUMsV0FBVyxHQUFHMVMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDO0VBQ2xELElBQU0yUyxZQUFZLEdBQUczUyxDQUFDLENBQUMsMkJBQTJCLENBQUM7RUFFbkQsSUFBSTJTLFlBQVksQ0FBQzFOLE1BQU0sS0FBSyxDQUFDLEVBQUU7SUFDM0IwTixZQUFZLENBQUM1UCxNQUFNLEVBQUU7RUFDekI7RUFFQSxJQUFJMlAsV0FBVyxDQUFDRSxJQUFJLEVBQUUsQ0FBQ3BPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQ1MsTUFBTSxLQUFLLENBQUMsRUFBRTtJQUMvQztJQUNBeU4sV0FBVyxDQUFDRSxJQUFJLEVBQUUsQ0FBQ0MsTUFBTSxhQUFXblMsT0FBTyxDQUFDbVAsUUFBUSxjQUFXO0VBQ25FLENBQUMsTUFBTTtJQUNINkMsV0FBVyxDQUFDRSxJQUFJLEVBQUUsQ0FBQ3BPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQ2pDLElBQUksRUFBRTtFQUMzQztFQUVBLE9BQU9tUSxXQUFXO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0ksaUJBQWlCQSxDQUFDWCxZQUFZLEVBQUU7RUFDckMsSUFBTUMsS0FBSyxHQUFHQyx1REFBQSxDQUFZRixZQUFZLENBQUM5TCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsVUFBQ0YsTUFBTSxFQUFFbU0sSUFBSSxFQUFLO0lBQ3pFLElBQU1DLEdBQUcsR0FBR3BNLE1BQU07SUFDbEJvTSxHQUFHLENBQUNELElBQUksQ0FBQ0UsSUFBSSxDQUFDLEdBQUdGLElBQUksQ0FBQ3hLLEtBQUs7SUFFM0IsT0FBT3lLLEdBQUc7RUFDZCxDQUFDLENBQUM7RUFFRixJQUFNRSxxQkFBcUIsR0FBRztJQUMxQnpDLElBQUksRUFBRSxNQUFNO0lBQ1pyRyxFQUFFLEVBQUV5SSxLQUFLLENBQUN6SSxFQUFFO0lBQ1osWUFBWSxFQUFFeUksS0FBSyxDQUFDLFlBQVksQ0FBQztJQUNqQyxTQUFPLFlBQVk7SUFDbkJJLElBQUksRUFBRUosS0FBSyxDQUFDSSxJQUFJO0lBQ2hCLGlCQUFpQixFQUFFSixLQUFLLENBQUMsaUJBQWlCO0VBQzlDLENBQUM7RUFFREQsWUFBWSxDQUFDaEwsV0FBVyxDQUFDbkgsQ0FBQyxDQUFDLFdBQVcsRUFBRXlTLHFCQUFxQixDQUFDLENBQUM7RUFFL0QsSUFBTUMsV0FBVyxHQUFHMVMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDO0VBRWxELElBQUkwUyxXQUFXLENBQUN6TixNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQzFCOE4sZ0ZBQXNCLENBQUNMLFdBQVcsQ0FBQztJQUNuQ0EsV0FBVyxDQUFDRSxJQUFJLEVBQUUsQ0FBQ3BPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQ2xFLElBQUksRUFBRTtFQUMzQztFQUVBLE9BQU9vUyxXQUFXO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNNLFVBQVVBLENBQUNDLFdBQVcsRUFBRUMsY0FBYyxFQUFFN08sT0FBTyxFQUFFO0VBQ3RELElBQU04TyxTQUFTLEdBQUcsRUFBRTtFQUVwQkEsU0FBUyxDQUFDaEQsSUFBSSx5QkFBcUI4QyxXQUFXLENBQUNHLE1BQU0sZUFBWTtFQUVqRSxJQUFJLENBQUNoRSxxREFBQSxDQUFVOEQsY0FBYyxDQUFDLEVBQUU7SUFDNUJHLGtEQUFBLENBQU9KLFdBQVcsQ0FBQ0ssTUFBTSxFQUFFLFVBQUNDLFFBQVEsRUFBSztNQUNyQyxJQUFJbFAsT0FBTyxDQUFDd0ksY0FBYyxFQUFFO1FBQ3hCc0csU0FBUyxDQUFDaEQsSUFBSSxzQkFBbUJvRCxRQUFRLENBQUM1SixFQUFFLFdBQUs0SixRQUFRLENBQUNmLElBQUksZUFBWTtNQUM5RSxDQUFDLE1BQU07UUFDSFcsU0FBUyxDQUFDaEQsSUFBSSxzQkFBbUJvRCxRQUFRLENBQUNmLElBQUksWUFBS2UsUUFBUSxDQUFDakMsS0FBSyxHQUFHaUMsUUFBUSxDQUFDakMsS0FBSyxHQUFHaUMsUUFBUSxDQUFDZixJQUFJLGdCQUFZO01BQ2xIO0lBQ0osQ0FBQyxDQUFDO0lBRUZVLGNBQWMsQ0FBQ2hNLElBQUksQ0FBQ2lNLFNBQVMsQ0FBQ2pRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUM1QztBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2UseUVBQVVpUCxZQUFZLEVBQUV6UixPQUFPLEVBQU8yRCxPQUFPLEVBQUVtUCxRQUFRLEVBQUU7RUFBQSxJQUFqQzlTLE9BQU87SUFBUEEsT0FBTyxHQUFHLENBQUMsQ0FBQztFQUFBO0VBQy9DO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0ksSUFBSSxPQUFPMkQsT0FBTyxLQUFLLFVBQVUsRUFBRTtJQUMvQjtJQUNBbVAsUUFBUSxHQUFHblAsT0FBTztJQUNsQkEsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNaO0VBQ0o7O0VBRUFyRSxDQUFDLENBQUMsbUNBQW1DLENBQUMsQ0FBQzJGLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQUMsS0FBSyxFQUFJO0lBQ3pELElBQU02TixXQUFXLEdBQUd6VCxDQUFDLENBQUM0RixLQUFLLENBQUNDLGFBQWEsQ0FBQyxDQUFDaEUsR0FBRyxFQUFFO0lBRWhELElBQUk0UixXQUFXLEtBQUssRUFBRSxFQUFFO01BQ3BCO0lBQ0o7SUFFQWpSLGtFQUFLLENBQUNDLEdBQUcsQ0FBQzBILE9BQU8sQ0FBQ3VKLFNBQVMsQ0FBQ0QsV0FBVyxFQUFFLFVBQUM3USxHQUFHLEVBQUVDLFFBQVEsRUFBSztNQUN4RCxJQUFJRCxHQUFHLEVBQUU7UUFDTCtRLG9FQUFjLENBQUNqVCxPQUFPLENBQUNrVCxXQUFXLENBQUM7UUFDbkMsT0FBT0osUUFBUSxDQUFDNVEsR0FBRyxDQUFDO01BQ3hCO01BRUEsSUFBTWlSLGFBQWEsR0FBRzdULENBQUMsQ0FBQywyQkFBMkIsQ0FBQztNQUVwRCxJQUFJLENBQUNvUCxxREFBQSxDQUFVdk0sUUFBUSxDQUFDcEIsSUFBSSxDQUFDNlIsTUFBTSxDQUFDLEVBQUU7UUFDbEM7UUFDQSxJQUFNSixjQUFjLEdBQUdoQixpQkFBaUIsQ0FBQzJCLGFBQWEsRUFBRW5ULE9BQU8sQ0FBQztRQUVoRXNTLFVBQVUsQ0FBQ25RLFFBQVEsQ0FBQ3BCLElBQUksRUFBRXlSLGNBQWMsRUFBRTdPLE9BQU8sQ0FBQztRQUNsRG1QLFFBQVEsQ0FBQyxJQUFJLEVBQUVOLGNBQWMsQ0FBQztNQUNsQyxDQUFDLE1BQU07UUFDSCxJQUFNWSxVQUFVLEdBQUdoQixpQkFBaUIsQ0FBQ2UsYUFBYSxFQUFFblQsT0FBTyxDQUFDO1FBRTVEOFMsUUFBUSxDQUFDLElBQUksRUFBRU0sVUFBVSxDQUFDO01BQzlCO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0FBQ04sQzs7Ozs7Ozs7Ozs7OztBQ3RKQTtBQUFBO0FBQUEsSUFBTUMsWUFBWSxHQUFHLGNBQWM7QUFDbkMsSUFBTUMsK0JBQStCLEdBQUcsU0FBbENBLCtCQUErQkEsQ0FBSUMsVUFBVTtFQUFBLE9BQUssQ0FBQyxDQUFDalEsTUFBTSxDQUFDa1EsSUFBSSxDQUFDRCxVQUFVLENBQUNGLFlBQVksQ0FBQyxDQUFDLENBQUM5TyxNQUFNO0FBQUE7QUFDdEcsSUFBTWtQLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUEsRUFBOEI7RUFDdEQsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcxVSxTQUFBLENBQW1CdUYsTUFBTSxFQUFFbVAsQ0FBQyxFQUFFLEVBQUU7SUFDaEQsSUFBTUgsVUFBVSxHQUFHSSxJQUFJLENBQUNDLEtBQUssQ0FBb0JGLENBQUMsUUFBQTFVLFNBQUEsQ0FBQXVGLE1BQUEsSUFBRG1QLENBQUMsR0FBQUcsU0FBQSxHQUFBN1UsU0FBQSxDQUFEMFUsQ0FBQyxFQUFFO0lBQ3BELElBQUlKLCtCQUErQixDQUFDQyxVQUFVLENBQUMsRUFBRTtNQUM3QyxPQUFPQSxVQUFVO0lBQ3JCO0VBQ0o7QUFDSixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQU05SywyQkFBMkIsR0FBRyxTQUE5QkEsMkJBQTJCQSxDQUFJekksT0FBTyxFQUFLO0VBQ3BELElBQVE4VCx3QkFBd0IsR0FBd0U5VCxPQUFPLENBQXZHOFQsd0JBQXdCO0lBQUVDLGdDQUFnQyxHQUFzQy9ULE9BQU8sQ0FBN0UrVCxnQ0FBZ0M7SUFBRUMsK0JBQStCLEdBQUtoVSxPQUFPLENBQTNDZ1UsK0JBQStCO0VBQ25HLElBQU1DLGdCQUFnQixHQUFHUixzQkFBc0IsQ0FBQ0ssd0JBQXdCLEVBQUVDLGdDQUFnQyxFQUFFQywrQkFBK0IsQ0FBQztFQUM1SSxJQUFNRSxhQUFhLEdBQUc1USxNQUFNLENBQUM2USxNQUFNLENBQUNGLGdCQUFnQixDQUFDWixZQUFZLENBQUMsQ0FBQztFQUNuRSxJQUFNZSxlQUFlLEdBQUc5USxNQUFNLENBQUNrUSxJQUFJLENBQUNTLGdCQUFnQixDQUFDWixZQUFZLENBQUMsQ0FBQyxDQUFDbkQsR0FBRyxDQUFDLFVBQUFtRSxHQUFHO0lBQUEsT0FBSUEsR0FBRyxDQUFDbkYsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDb0YsR0FBRyxFQUFFO0VBQUEsRUFBQztFQUVwRyxPQUFPRixlQUFlLENBQUNHLE1BQU0sQ0FBQyxVQUFDQyxHQUFHLEVBQUVILEdBQUcsRUFBRVgsQ0FBQyxFQUFLO0lBQzNDYyxHQUFHLENBQUNILEdBQUcsQ0FBQyxHQUFHSCxhQUFhLENBQUNSLENBQUMsQ0FBQztJQUMzQixPQUFPYyxHQUFHO0VBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ1YsQ0FBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQjhDO0FBQ1M7QUFFekI7QUFBQSxJQUVWQyxxQkFBcUI7RUFDdEMsU0FBQUEsc0JBQVkxRyxNQUFNLEVBQUU7SUFDaEIsSUFBSSxDQUFDQSxNQUFNLEdBQUdBLE1BQU07SUFFcEIsSUFBSSxDQUFDQSxNQUFNLENBQUNyTixRQUFRLENBQUMsbUJBQW1CLENBQUM7SUFFekMsSUFBSSxDQUFDZ1UsbUJBQW1CLEVBQUU7SUFFMUIsSUFBSSxDQUFDdFAsS0FBSyxHQUFHOUYsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUN5TyxNQUFNLENBQUM7SUFDbkMsSUFBSSxDQUFDNEcsVUFBVSxHQUFHclYsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQzhGLEtBQUssQ0FBQyxDQUFDakUsR0FBRyxFQUFFO0lBRTVELElBQUksQ0FBQ2tULEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQzs7SUFFbEIsSUFBSSxDQUFDbkcsc0JBQXNCLEdBQUc1TyxDQUFDLFlBQVUsSUFBSSxDQUFDK1UsR0FBRyxzQkFBbUIsSUFBSSxDQUFDalAsS0FBSyxDQUFDLENBQUMsQ0FBQzs7SUFFakYsSUFBSSxDQUFDd1AsZ0JBQWdCLEVBQUU7SUFDdkI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7O0lBR0EsSUFBSSxDQUFDclUsVUFBVSxFQUFFO0VBQ3JCOztFQUVBO0FBQ0o7QUFDQTtFQUZJLElBQUF0QixNQUFBLEdBQUF3VixxQkFBQSxDQUFBdlYsU0FBQTtFQUFBRCxNQUFBLENBR0E0Vix5QkFBeUIsR0FBekIsU0FBQUEsMEJBQUEsRUFBNEI7SUFDeEJ2VixDQUFDLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQzRPLHNCQUFzQixDQUFDLENBQUM0RyxPQUFPLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDLFVBQUFDLE1BQU0sRUFBSTtNQUN0RSxJQUFJMVYsQ0FBQyxDQUFDMFYsTUFBTSxDQUFDLENBQUNsUixJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQ1MsTUFBTSxFQUFFO1FBQ3JEakYsQ0FBQyxDQUFDMFYsTUFBTSxDQUFDLENBQUN0VSxRQUFRLENBQUMsWUFBWSxDQUFDO01BQ3BDO0lBQ0osQ0FBQyxDQUFDO0VBQ047O0VBRUE7QUFDSjtBQUNBLEtBRkk7RUFBQXpCLE1BQUEsQ0FHQWdXLHFCQUFxQixHQUFyQixTQUFBQSxzQkFBc0IvUCxLQUFLLEVBQUU7SUFDekIsSUFBTWdRLGNBQWMsR0FBRzVWLENBQUMsQ0FBQzRGLEtBQUssQ0FBQ2lRLE1BQU0sQ0FBQztJQUN0QyxJQUFNQyxTQUFTLEdBQUc5VixDQUFDLENBQUM0RixLQUFLLENBQUNpUSxNQUFNLENBQUMsQ0FBQ0UsT0FBTyxDQUFDLGFBQWEsQ0FBQzs7SUFFeEQ7SUFDQSxJQUFJSCxjQUFjLENBQUNySyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssTUFBTSxJQUFJckssTUFBTSxDQUFDOFUsUUFBUSxLQUFLekIsU0FBUyxFQUFFO01BQ3pFO0lBQUEsQ0FDSCxNQUFNO01BQ0gsSUFBSSxDQUFDZSxnQkFBZ0IsRUFBRTtJQUMzQjs7SUFFQTtJQUNBLElBQUlNLGNBQWMsQ0FBQy9ULEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtNQUM3QixJQUFJK1QsY0FBYyxDQUFDMUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzVCLElBQU04QyxJQUFJLEdBQUc0RixjQUFjLENBQUNySyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3hDLFFBQVF5RSxJQUFJO1VBQ1IsS0FBSyxPQUFPO1lBQ1I0RixjQUFjLENBQUNySyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztZQUNwQ3FLLGNBQWMsQ0FBQ0ssUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDMUssSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7WUFDdkR1SyxTQUFTLENBQUMxVSxRQUFRLENBQUMsWUFBWSxDQUFDO1lBQ2hDO1VBQ0osS0FBSyxVQUFVO1lBQ1gsSUFBSXdVLGNBQWMsQ0FBQ3ZQLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtjQUNoQ3lQLFNBQVMsQ0FBQzFVLFFBQVEsQ0FBQyxZQUFZLENBQUM7Y0FDaEN3VSxjQUFjLENBQUNySyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztZQUN4QyxDQUFDLE1BQU07Y0FDSHVLLFNBQVMsQ0FBQ3pJLFdBQVcsQ0FBQyxZQUFZLENBQUM7Y0FDbkN1SSxjQUFjLENBQUNySyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztZQUN6QztZQUNBO1VBQ0osS0FBSyxNQUFNO1VBQ1gsS0FBSyxRQUFRO1lBQ1RxSyxjQUFjLENBQUMvVCxHQUFHLEVBQUUsQ0FBQ29ELE1BQU0sS0FBSyxDQUFDLEdBQzNCNlEsU0FBUyxDQUFDMVUsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUNoQzBVLFNBQVMsQ0FBQ3pJLFdBQVcsQ0FBQyxZQUFZLENBQUM7WUFDekN1SSxjQUFjLENBQUNySyxJQUFJLENBQUMsT0FBTyxFQUFFcUssY0FBYyxDQUFDL1QsR0FBRyxFQUFFLENBQUM7WUFDbEQ7UUFBTTtNQUVsQixDQUFDLE1BQU0sSUFBSStULGNBQWMsQ0FBQzFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNwQyxJQUFNZ0osZUFBZSxHQUFHTixjQUFjLENBQUNwUixJQUFJLHFCQUFrQm9SLGNBQWMsQ0FBQy9ULEdBQUcsRUFBRSxTQUFLO1FBQ3RGcVUsZUFBZSxDQUFDM0ssSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7UUFDdEMySyxlQUFlLENBQUNELFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzFLLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDO1FBQzFEO1FBQ0EsSUFDSXFLLGNBQWMsQ0FBQ3JLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzRLLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFDbkRQLGNBQWMsQ0FBQ3JLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzRLLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFDakRQLGNBQWMsQ0FBQ3JLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzRLLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDcEQ7VUFDRTtVQUNBLElBQU1DLHVCQUF1QixHQUFHUixjQUFjLENBQUNLLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQ1QsT0FBTyxFQUFFLENBQUNQLE1BQU0sQ0FBQyxVQUFDb0IsS0FBSyxFQUFFNUYsTUFBTSxFQUFLO1lBQ2xHLE9BQU96USxDQUFDLENBQUN5USxNQUFNLENBQUMsQ0FBQzVPLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FDdkJ3VSxLQUFLLEdBQ0xBLEtBQUssR0FBRyxDQUFDO1VBQ25CLENBQUMsRUFBRSxDQUFDLENBQUM7VUFDTDtVQUNBLElBQUlELHVCQUF1QixLQUFLLENBQUMsRUFBRTtZQUMvQk4sU0FBUyxDQUFDMVUsUUFBUSxDQUFDLFlBQVksQ0FBQztVQUNwQztRQUNKLENBQUMsTUFBTTtVQUNIMFUsU0FBUyxDQUFDMVUsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDdEM7TUFDSixDQUFDLE1BQU0sSUFBSXdVLGNBQWMsQ0FBQzFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN0QzBJLGNBQWMsQ0FBQy9ULEdBQUcsRUFBRSxDQUFDb0QsTUFBTSxLQUFLLENBQUMsR0FDM0I2USxTQUFTLENBQUMxVSxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQ2hDMFUsU0FBUyxDQUFDekksV0FBVyxDQUFDLFlBQVksQ0FBQztRQUN6Q3VJLGNBQWMsQ0FBQ3ZULElBQUksQ0FBQ3VULGNBQWMsQ0FBQy9ULEdBQUcsRUFBRSxDQUFDO01BQzdDO0lBQ0osQ0FBQyxNQUFNO01BQ0g7TUFDQWlVLFNBQVMsQ0FBQ3pJLFdBQVcsQ0FBQyxZQUFZLENBQUM7SUFDdkM7SUFFQSxJQUFJLENBQUNpSixvQkFBb0IsRUFBRTtFQUMvQjs7RUFFQTtBQUNKO0FBQ0EsS0FGSTtFQUFBM1csTUFBQSxDQUdBMlYsZ0JBQWdCLEdBQWhCLFNBQUFBLGlCQUFBLEVBQW9CO0lBQUEsSUFBQS9ULEtBQUE7SUFDaEJpQixrRUFBSyxDQUFDQyxHQUFHLENBQUNnQyxpQkFBaUIsQ0FBQ3dCLFlBQVksQ0FBQyxJQUFJLENBQUNvUCxVQUFVLEVBQUUsSUFBSSxDQUFDdlAsS0FBSyxDQUFDSSxTQUFTLEVBQUUsRUFBRSw4QkFBOEIsRUFBRSxVQUFDdEQsR0FBRyxFQUFFQyxRQUFRLEVBQUs7TUFDakksSUFBTTZMLHFCQUFxQixHQUFHN0wsUUFBUSxDQUFDcEIsSUFBSSxJQUFJLENBQUMsQ0FBQztNQUNqREYsS0FBSSxDQUFDOE4sdUJBQXVCLENBQUNYLHFCQUFxQixDQUFDO01BQ25Ebk4sS0FBSSxDQUFDZ1YsVUFBVSxDQUFDN0gscUJBQXFCLENBQUM7TUFDdEM7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO0lBQ0osQ0FBQyxDQUFDO0VBQ047O0VBRUE7QUFDSjtBQUNBLEtBRkk7RUFBQS9PLE1BQUEsQ0FHQTJXLG9CQUFvQixHQUFwQixTQUFBQSxxQkFBQSxFQUF3QjtJQUNwQjtBQUNSO0FBQ0E7SUFDUSxJQUFNRSxxQkFBcUIsR0FBRyxJQUFJLENBQUMvSCxNQUFNLENBQUNqSyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQ1MsTUFBTTtJQUMvRSxJQUFNd1IscUJBQXFCLEdBQUcsSUFBSSxDQUFDaEksTUFBTSxDQUFDakssSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUNTLE1BQU07SUFDMUY7SUFDQTtJQUNBLElBQUl1UixxQkFBcUIsS0FBSyxDQUFDLElBQUlBLHFCQUFxQixJQUFJQyxxQkFBcUIsRUFBRTtNQUMvRSxJQUFJLENBQUNoSSxNQUFNLENBQUNyTixRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO01BQzlDcEIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDb0IsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDLE1BQU07TUFDSCxJQUFJLENBQUNxTixNQUFNLENBQUNwQixXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO01BQ2pEck4sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDcU4sV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztJQUMxRDtFQUVKOztFQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsS0FKSTtFQUFBMU4sTUFBQSxDQUtBK1csZUFBZSxHQUFmLFNBQUFBLGdCQUFnQkMsS0FBSyxFQUFFO0lBQ25CLElBQUlBLEtBQUssQ0FBQ0MsV0FBVyxFQUFFO01BQ25CNVcsQ0FBQyxxQ0FBcUMsSUFBSSxDQUFDeU8sTUFBTSxDQUFDLENBQUN2SCxJQUFJLENBQUN5UCxLQUFLLENBQUNDLFdBQVcsQ0FBQ0MsU0FBUyxDQUFDO0lBQ3hGO0VBQ0o7O0VBRUE7QUFDSjtBQUNBO0FBQ0EsS0FISTtFQUFBbFgsTUFBQSxDQUlBNFcsVUFBVSxHQUFWLFNBQUFBLFdBQVc5VSxJQUFJLEVBQUU7SUFDYjtJQUNBO0lBQ0EsSUFBSXFWLHNEQUFBLENBQVdyVixJQUFJLENBQUNrVixLQUFLLENBQUMsRUFBRTtNQUN4QixJQUFJLENBQUNELGVBQWUsQ0FBQ2pWLElBQUksQ0FBQ2tWLEtBQUssQ0FBQztJQUNwQztJQUNBO0lBQ0EsSUFBTUksT0FBTyxHQUFHL1csQ0FBQyxtQkFBbUIsSUFBSSxDQUFDeU8sTUFBTSxDQUFDO0lBQ2hELElBQUlxSSxzREFBQSxDQUFXclYsSUFBSSxDQUFDdVYsS0FBSyxDQUFDLEVBQUU7TUFDeEIsSUFBTUMsUUFBUSxHQUFHeFYsSUFBSSxDQUFDdVYsS0FBSyxDQUFDdlYsSUFBSSxDQUFDZ0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7TUFDOURzVCxPQUFPLENBQUN4TCxJQUFJLENBQUMsS0FBSyxFQUFFMEwsUUFBUSxDQUFDO0lBQ2pDLENBQUMsTUFBTTtNQUNIRixPQUFPLENBQUN4TCxJQUFJLENBQUMsS0FBSyxFQUFFd0wsT0FBTyxDQUFDdFYsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDO0lBQ0E7SUFDQSxJQUFNeVYsYUFBYSxHQUFHelYsSUFBSSxDQUFDMFYsYUFBYSxJQUFJMVYsSUFBSSxDQUFDMkUsa0JBQWtCO0lBQ25FLElBQUk4USxhQUFhLEtBQUssSUFBSSxFQUFFO01BQ3hCL1Usa0RBQUksQ0FBQ0MsSUFBSSxDQUFDO1FBQ05DLElBQUksRUFBRTZVLGFBQWE7UUFDbkI1VSxJQUFJLEVBQUU7TUFDVixDQUFDLENBQUM7TUFDRixJQUFJLENBQUNtTSxNQUFNLENBQUNyTixRQUFRLENBQUMsbUJBQW1CLENBQUM7SUFDN0MsQ0FBQyxNQUFNO01BQ0gsSUFBSSxDQUFDcU4sTUFBTSxDQUFDcEIsV0FBVyxDQUFDLG1CQUFtQixDQUFDO0lBQ2hEO0VBQ0o7O0VBRUE7QUFDSjtBQUNBO0FBQ0EsS0FISTtFQUFBMU4sTUFBQSxDQUlBMFAsdUJBQXVCLEdBQXZCLFNBQUFBLHdCQUF3QjVOLElBQUksRUFBRTtJQUFBLElBQUE0QixNQUFBO0lBQzFCLElBQU0rVCxRQUFRLEdBQUczVixJQUFJLENBQUM0VixxQkFBcUI7SUFDM0MsSUFBTUMsVUFBVSxHQUFHN1YsSUFBSSxDQUFDOFYsbUJBQW1CO0lBQzNDLElBQU1DLGlCQUFpQixVQUFRL1YsSUFBSSxDQUFDZ1csb0JBQW9CLE1BQUc7SUFFM0QsSUFBSUwsUUFBUSxLQUFLLGFBQWEsSUFBSUEsUUFBUSxLQUFLLGNBQWMsRUFBRTtNQUMzRDtJQUNKO0lBRUFwWCxDQUFDLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDeU8sTUFBTSxDQUFDM0MsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUN5RCxJQUFJLENBQUMsVUFBQzZFLENBQUMsRUFBRXNELFNBQVMsRUFBSztNQUN2RixJQUFNQyxVQUFVLEdBQUczWCxDQUFDLENBQUMwWCxTQUFTLENBQUM7TUFDL0IsSUFBTUUsTUFBTSxHQUFHaFcsUUFBUSxDQUFDK1YsVUFBVSxDQUFDbFcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEVBQUUsRUFBRSxDQUFDO01BRXZFLElBQUk2VixVQUFVLENBQUNuQixPQUFPLENBQUN5QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNuQ3ZVLE1BQUksQ0FBQ3dVLGVBQWUsQ0FBQ0YsVUFBVSxFQUFFUCxRQUFRLEVBQUVJLGlCQUFpQixDQUFDO01BQ2pFLENBQUMsTUFBTTtRQUNIblUsTUFBSSxDQUFDeVUsZ0JBQWdCLENBQUNILFVBQVUsRUFBRVAsUUFBUSxFQUFFSSxpQkFBaUIsQ0FBQztNQUNsRTtJQUNKLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQTdYLE1BQUEsQ0FFRG1ZLGdCQUFnQixHQUFoQixTQUFBQSxpQkFBaUJILFVBQVUsRUFBRVAsUUFBUSxFQUFFSSxpQkFBaUIsRUFBRTtJQUN0RCxJQUFJLElBQUksQ0FBQ08sZ0JBQWdCLENBQUNKLFVBQVUsQ0FBQyxLQUFLLFlBQVksRUFBRTtNQUNwRCxPQUFPLElBQUksQ0FBQ0ssNEJBQTRCLENBQUNMLFVBQVUsRUFBRVAsUUFBUSxFQUFFSSxpQkFBaUIsQ0FBQztJQUNyRjtJQUNBLElBQUlKLFFBQVEsS0FBSyxhQUFhLEVBQUU7TUFDNUJPLFVBQVUsQ0FBQ3JYLElBQUksRUFBRTtJQUNyQixDQUFDLE1BQU07TUFDSHFYLFVBQVUsQ0FDTHZXLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FDdkJ3UixJQUFJLENBQUMsT0FBTyxDQUFDLENBQ2JySCxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztJQUMvQjtFQUNKLENBQUM7RUFBQTVMLE1BQUEsQ0FFRHFZLDRCQUE0QixHQUE1QixTQUFBQSw2QkFBNkJMLFVBQVUsRUFBRVAsUUFBUSxFQUFFSSxpQkFBaUIsRUFBRTtJQUNsRSxJQUFNOU4sT0FBTyxHQUFHaU8sVUFBVSxDQUFDTSxNQUFNLEVBQUU7SUFFbkMsSUFBSWIsUUFBUSxLQUFLLGFBQWEsRUFBRTtNQUM1Qk8sVUFBVSxDQUFDTyxZQUFZLENBQUMsS0FBSyxDQUFDO01BQzlCO01BQ0EsSUFBSVAsVUFBVSxDQUFDTSxNQUFNLEVBQUUsQ0FBQ3BXLEdBQUcsRUFBRSxLQUFLOFYsVUFBVSxDQUFDcE0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hEN0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDZ0gsYUFBYSxHQUFHLENBQUM7TUFDaEM7SUFDSixDQUFDLE1BQU07TUFDSGlILFVBQVUsQ0FBQ3BNLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO01BQ3ZDb00sVUFBVSxDQUFDelEsSUFBSSxDQUFDeVEsVUFBVSxDQUFDelEsSUFBSSxFQUFFLENBQUN6RCxPQUFPLENBQUMrVCxpQkFBaUIsRUFBRSxFQUFFLENBQUMsR0FBR0EsaUJBQWlCLENBQUM7SUFDekY7RUFDSixDQUFDO0VBQUE3WCxNQUFBLENBRURrWSxlQUFlLEdBQWYsU0FBQUEsZ0JBQWdCRixVQUFVLEVBQUVQLFFBQVEsRUFBRUksaUJBQWlCLEVBQUU7SUFDckQsSUFBSSxJQUFJLENBQUNPLGdCQUFnQixDQUFDSixVQUFVLENBQUMsS0FBSyxZQUFZLEVBQUU7TUFDcEQsT0FBTyxJQUFJLENBQUNRLDJCQUEyQixDQUFDUixVQUFVLEVBQUVQLFFBQVEsRUFBRUksaUJBQWlCLENBQUM7SUFDcEY7SUFFQSxJQUFJSixRQUFRLEtBQUssYUFBYSxFQUFFO01BQzVCTyxVQUFVLENBQUNwVixJQUFJLEVBQUU7SUFDckIsQ0FBQyxNQUFNO01BQ0hvVixVQUFVLENBQ0x0SyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQzFCdUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUNickgsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7SUFDaEM7RUFDSixDQUFDO0VBQUE1TCxNQUFBLENBRUR3WSwyQkFBMkIsR0FBM0IsU0FBQUEsNEJBQTRCUixVQUFVLEVBQUVQLFFBQVEsRUFBRUksaUJBQWlCLEVBQUU7SUFDakUsSUFBSUosUUFBUSxLQUFLLGFBQWEsRUFBRTtNQUM1Qk8sVUFBVSxDQUFDTyxZQUFZLENBQUMsSUFBSSxDQUFDO0lBQ2pDLENBQUMsTUFBTTtNQUNIUCxVQUFVLENBQUNuTSxVQUFVLENBQUMsVUFBVSxDQUFDO01BQ2pDbU0sVUFBVSxDQUFDelEsSUFBSSxDQUFDeVEsVUFBVSxDQUFDelEsSUFBSSxFQUFFLENBQUN6RCxPQUFPLENBQUMrVCxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyRTtFQUNKLENBQUM7RUFBQTdYLE1BQUEsQ0FFRG9ZLGdCQUFnQixHQUFoQixTQUFBQSxpQkFBaUJKLFVBQVUsRUFBRTtJQUN6QixJQUFNUyxPQUFPLEdBQUdULFVBQVUsQ0FBQ1UsT0FBTyxDQUFDLDBCQUEwQixDQUFDO0lBQzlELE9BQU9ELE9BQU8sR0FBR0EsT0FBTyxDQUFDM1csSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsSUFBSTtFQUM3RDs7RUFFQTtBQUNKO0FBQ0EsS0FGSTtFQUFBOUIsTUFBQSxDQUdBeVYsbUJBQW1CLEdBQW5CLFNBQUFBLG9CQUFBLEVBQXNCO0lBQUEsSUFBQXpSLE1BQUE7SUFDbEIzRCxDQUFDLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDeU8sTUFBTSxDQUFDLENBQUNjLElBQUksQ0FBQyxVQUFDNkUsQ0FBQyxFQUFFa0UsS0FBSyxFQUFLO01BQzlFLElBQU1DLE1BQU0sR0FBR3ZZLENBQUMsQ0FBQ3NZLEtBQUssQ0FBQzs7TUFFdkI7TUFDQSxJQUFJQyxNQUFNLENBQUNoTixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUtnSixTQUFTLEVBQUU7UUFDekNnRSxNQUFNLENBQUNDLEtBQUssQ0FBQyxZQUFNO1VBQ2YsSUFBSUQsTUFBTSxDQUFDOVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRTtZQUMvQjhXLE1BQU0sQ0FBQ2xTLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO1lBQzdCa1MsTUFBTSxDQUFDOVcsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7WUFFM0I4VyxNQUFNLENBQUN4USxNQUFNLEVBQUU7VUFDbkIsQ0FBQyxNQUFNO1lBQ0h3USxNQUFNLENBQUM5VyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztVQUM5QjtVQUVBa0MsTUFBSSxDQUFDeVIsbUJBQW1CLEVBQUU7UUFDOUIsQ0FBQyxDQUFDO01BQ047TUFFQW1ELE1BQU0sQ0FBQ2hOLElBQUksQ0FBQyxZQUFZLEVBQUVnTixNQUFNLENBQUNsUyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDO0VBQ047O0VBRUE7QUFDSjtBQUNBLEtBRkk7RUFBQTFHLE1BQUEsQ0FHQXNCLFVBQVUsR0FBVixTQUFBQSxXQUFBLEVBQWE7SUFBQSxJQUFBOEMsTUFBQTtJQUNUMFUsb0VBQW1CLENBQUMsSUFBSSxDQUFDaEssTUFBTSxFQUFFLElBQUksQ0FBQzRHLFVBQVUsRUFBRSxJQUFJLENBQUNOLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0lBRTdELElBQUksQ0FBQ1EseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLElBQUksQ0FBQ2Usb0JBQW9CLEVBQUU7O0lBRTNCO0lBQ0EsSUFBSSxDQUFDMUgsc0JBQXNCLENBQUM3RyxNQUFNLENBQUMsVUFBQW5DLEtBQUssRUFBSTtNQUN4QzdCLE1BQUksQ0FBQzRSLHFCQUFxQixDQUFDL1AsS0FBSyxFQUFFQSxLQUFLLENBQUNpUSxNQUFNLENBQUM7SUFDbkQsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxDQUFDakgsc0JBQXNCLENBQUNyTSxJQUFJLEVBQUU7O0lBRWxDO0lBQ0EsSUFBSSxDQUFDcU0sc0JBQXNCLENBQUNwSyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQzZDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzlFLElBQUksQ0FBQ3VILHNCQUFzQixDQUFDcEssSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM2QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuRixJQUFJLENBQUN1SCxzQkFBc0IsQ0FBQ3BLLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDNkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDMUUsSUFBSSxDQUFDdUgsc0JBQXNCLENBQUNwSyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQzZDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzVFLElBQUksQ0FBQ3VILHNCQUFzQixDQUFDcEssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDNkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDaEUsSUFBSSxDQUFDdUgsc0JBQXNCLENBQUNwSyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQ3lULE1BQU0sRUFBRSxDQUFDNVEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDcEYsQ0FBQztFQUFBLE9BQUE4TixxQkFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0NDaFZMLHFKQUFBdUQsbUJBQUEsWUFBQUEsb0JBQUEsV0FBQUMsT0FBQSxTQUFBQSxPQUFBLE9BQUFDLEVBQUEsR0FBQTVVLE1BQUEsQ0FBQXBFLFNBQUEsRUFBQWlaLE1BQUEsR0FBQUQsRUFBQSxDQUFBRSxjQUFBLEVBQUFDLGNBQUEsR0FBQS9VLE1BQUEsQ0FBQStVLGNBQUEsY0FBQUMsR0FBQSxFQUFBakUsR0FBQSxFQUFBa0UsSUFBQSxJQUFBRCxHQUFBLENBQUFqRSxHQUFBLElBQUFrRSxJQUFBLENBQUFuUixLQUFBLEtBQUFvUixPQUFBLHdCQUFBQyxNQUFBLEdBQUFBLE1BQUEsT0FBQUMsY0FBQSxHQUFBRixPQUFBLENBQUFHLFFBQUEsa0JBQUFDLG1CQUFBLEdBQUFKLE9BQUEsQ0FBQUssYUFBQSx1QkFBQUMsaUJBQUEsR0FBQU4sT0FBQSxDQUFBTyxXQUFBLDhCQUFBQyxPQUFBVixHQUFBLEVBQUFqRSxHQUFBLEVBQUFqTixLQUFBLFdBQUE5RCxNQUFBLENBQUErVSxjQUFBLENBQUFDLEdBQUEsRUFBQWpFLEdBQUEsSUFBQWpOLEtBQUEsRUFBQUEsS0FBQSxFQUFBNlIsVUFBQSxNQUFBQyxZQUFBLE1BQUFDLFFBQUEsU0FBQWIsR0FBQSxDQUFBakUsR0FBQSxXQUFBMkUsTUFBQSxtQkFBQTlXLEdBQUEsSUFBQThXLE1BQUEsWUFBQUEsT0FBQVYsR0FBQSxFQUFBakUsR0FBQSxFQUFBak4sS0FBQSxXQUFBa1IsR0FBQSxDQUFBakUsR0FBQSxJQUFBak4sS0FBQSxnQkFBQWdTLEtBQUFDLE9BQUEsRUFBQUMsT0FBQSxFQUFBQyxJQUFBLEVBQUFDLFdBQUEsUUFBQUMsY0FBQSxHQUFBSCxPQUFBLElBQUFBLE9BQUEsQ0FBQXBhLFNBQUEsWUFBQXdhLFNBQUEsR0FBQUosT0FBQSxHQUFBSSxTQUFBLEVBQUFDLFNBQUEsR0FBQXJXLE1BQUEsQ0FBQXNXLE1BQUEsQ0FBQUgsY0FBQSxDQUFBdmEsU0FBQSxHQUFBYyxPQUFBLE9BQUE2WixPQUFBLENBQUFMLFdBQUEsZ0JBQUFuQixjQUFBLENBQUFzQixTQUFBLGVBQUF2UyxLQUFBLEVBQUEwUyxnQkFBQSxDQUFBVCxPQUFBLEVBQUFFLElBQUEsRUFBQXZaLE9BQUEsTUFBQTJaLFNBQUEsYUFBQUksU0FBQUMsRUFBQSxFQUFBMUIsR0FBQSxFQUFBMkIsR0FBQSxtQkFBQTNLLElBQUEsWUFBQTJLLEdBQUEsRUFBQUQsRUFBQSxDQUFBL0wsSUFBQSxDQUFBcUssR0FBQSxFQUFBMkIsR0FBQSxjQUFBL1gsR0FBQSxhQUFBb04sSUFBQSxXQUFBMkssR0FBQSxFQUFBL1gsR0FBQSxRQUFBK1YsT0FBQSxDQUFBbUIsSUFBQSxHQUFBQSxJQUFBLE1BQUFjLGdCQUFBLGdCQUFBUixVQUFBLGNBQUFTLGtCQUFBLGNBQUFDLDJCQUFBLFNBQUFDLGlCQUFBLE9BQUFyQixNQUFBLENBQUFxQixpQkFBQSxFQUFBM0IsY0FBQSxxQ0FBQTRCLFFBQUEsR0FBQWhYLE1BQUEsQ0FBQWlYLGNBQUEsRUFBQUMsdUJBQUEsR0FBQUYsUUFBQSxJQUFBQSxRQUFBLENBQUFBLFFBQUEsQ0FBQW5HLE1BQUEsUUFBQXFHLHVCQUFBLElBQUFBLHVCQUFBLEtBQUF0QyxFQUFBLElBQUFDLE1BQUEsQ0FBQWxLLElBQUEsQ0FBQXVNLHVCQUFBLEVBQUE5QixjQUFBLE1BQUEyQixpQkFBQSxHQUFBRyx1QkFBQSxPQUFBQyxFQUFBLEdBQUFMLDBCQUFBLENBQUFsYixTQUFBLEdBQUF3YSxTQUFBLENBQUF4YSxTQUFBLEdBQUFvRSxNQUFBLENBQUFzVyxNQUFBLENBQUFTLGlCQUFBLFlBQUFLLHNCQUFBeGIsU0FBQSxnQ0FBQTZWLE9BQUEsV0FBQTRGLE1BQUEsSUFBQTNCLE1BQUEsQ0FBQTlaLFNBQUEsRUFBQXliLE1BQUEsWUFBQVYsR0FBQSxnQkFBQVcsT0FBQSxDQUFBRCxNQUFBLEVBQUFWLEdBQUEsc0JBQUFZLGNBQUFsQixTQUFBLEVBQUFtQixXQUFBLGFBQUFDLE9BQUFKLE1BQUEsRUFBQVYsR0FBQSxFQUFBZSxPQUFBLEVBQUFDLE1BQUEsUUFBQUMsTUFBQSxHQUFBbkIsUUFBQSxDQUFBSixTQUFBLENBQUFnQixNQUFBLEdBQUFoQixTQUFBLEVBQUFNLEdBQUEsbUJBQUFpQixNQUFBLENBQUE1TCxJQUFBLFFBQUE3SixNQUFBLEdBQUF5VixNQUFBLENBQUFqQixHQUFBLEVBQUE3UyxLQUFBLEdBQUEzQixNQUFBLENBQUEyQixLQUFBLFNBQUFBLEtBQUEsdUJBQUFBLEtBQUEsSUFBQStRLE1BQUEsQ0FBQWxLLElBQUEsQ0FBQTdHLEtBQUEsZUFBQTBULFdBQUEsQ0FBQUUsT0FBQSxDQUFBNVQsS0FBQSxDQUFBK1QsT0FBQSxFQUFBMVQsSUFBQSxXQUFBTCxLQUFBLElBQUEyVCxNQUFBLFNBQUEzVCxLQUFBLEVBQUE0VCxPQUFBLEVBQUFDLE1BQUEsZ0JBQUEvWSxHQUFBLElBQUE2WSxNQUFBLFVBQUE3WSxHQUFBLEVBQUE4WSxPQUFBLEVBQUFDLE1BQUEsUUFBQUgsV0FBQSxDQUFBRSxPQUFBLENBQUE1VCxLQUFBLEVBQUFLLElBQUEsV0FBQTJULFNBQUEsSUFBQTNWLE1BQUEsQ0FBQTJCLEtBQUEsR0FBQWdVLFNBQUEsRUFBQUosT0FBQSxDQUFBdlYsTUFBQSxnQkFBQTRWLEtBQUEsV0FBQU4sTUFBQSxVQUFBTSxLQUFBLEVBQUFMLE9BQUEsRUFBQUMsTUFBQSxTQUFBQSxNQUFBLENBQUFDLE1BQUEsQ0FBQWpCLEdBQUEsU0FBQXFCLGVBQUEsRUFBQWpELGNBQUEsb0JBQUFqUixLQUFBLFdBQUFBLE1BQUF1VCxNQUFBLEVBQUFWLEdBQUEsYUFBQXNCLDJCQUFBLGVBQUFULFdBQUEsV0FBQUUsT0FBQSxFQUFBQyxNQUFBLElBQUFGLE1BQUEsQ0FBQUosTUFBQSxFQUFBVixHQUFBLEVBQUFlLE9BQUEsRUFBQUMsTUFBQSxnQkFBQUssZUFBQSxHQUFBQSxlQUFBLEdBQUFBLGVBQUEsQ0FBQTdULElBQUEsQ0FBQThULDBCQUFBLEVBQUFBLDBCQUFBLElBQUFBLDBCQUFBLHFCQUFBekIsaUJBQUFULE9BQUEsRUFBQUUsSUFBQSxFQUFBdlosT0FBQSxRQUFBd2IsS0FBQSxzQ0FBQWIsTUFBQSxFQUFBVixHQUFBLHdCQUFBdUIsS0FBQSxZQUFBblAsS0FBQSxzREFBQW1QLEtBQUEsb0JBQUFiLE1BQUEsUUFBQVYsR0FBQSxTQUFBd0IsVUFBQSxXQUFBemIsT0FBQSxDQUFBMmEsTUFBQSxHQUFBQSxNQUFBLEVBQUEzYSxPQUFBLENBQUFpYSxHQUFBLEdBQUFBLEdBQUEsVUFBQXlCLFFBQUEsR0FBQTFiLE9BQUEsQ0FBQTBiLFFBQUEsTUFBQUEsUUFBQSxRQUFBQyxjQUFBLEdBQUFDLG1CQUFBLENBQUFGLFFBQUEsRUFBQTFiLE9BQUEsT0FBQTJiLGNBQUEsUUFBQUEsY0FBQSxLQUFBekIsZ0JBQUEsbUJBQUF5QixjQUFBLHFCQUFBM2IsT0FBQSxDQUFBMmEsTUFBQSxFQUFBM2EsT0FBQSxDQUFBNmIsSUFBQSxHQUFBN2IsT0FBQSxDQUFBOGIsS0FBQSxHQUFBOWIsT0FBQSxDQUFBaWEsR0FBQSxzQkFBQWphLE9BQUEsQ0FBQTJhLE1BQUEsNkJBQUFhLEtBQUEsUUFBQUEsS0FBQSxnQkFBQXhiLE9BQUEsQ0FBQWlhLEdBQUEsRUFBQWphLE9BQUEsQ0FBQStiLGlCQUFBLENBQUEvYixPQUFBLENBQUFpYSxHQUFBLHVCQUFBamEsT0FBQSxDQUFBMmEsTUFBQSxJQUFBM2EsT0FBQSxDQUFBZ2MsTUFBQSxXQUFBaGMsT0FBQSxDQUFBaWEsR0FBQSxHQUFBdUIsS0FBQSxvQkFBQU4sTUFBQSxHQUFBbkIsUUFBQSxDQUFBVixPQUFBLEVBQUFFLElBQUEsRUFBQXZaLE9BQUEsb0JBQUFrYixNQUFBLENBQUE1TCxJQUFBLFFBQUFrTSxLQUFBLEdBQUF4YixPQUFBLENBQUFpYyxJQUFBLG1DQUFBZixNQUFBLENBQUFqQixHQUFBLEtBQUFDLGdCQUFBLHFCQUFBOVMsS0FBQSxFQUFBOFQsTUFBQSxDQUFBakIsR0FBQSxFQUFBZ0MsSUFBQSxFQUFBamMsT0FBQSxDQUFBaWMsSUFBQSxrQkFBQWYsTUFBQSxDQUFBNUwsSUFBQSxLQUFBa00sS0FBQSxnQkFBQXhiLE9BQUEsQ0FBQTJhLE1BQUEsWUFBQTNhLE9BQUEsQ0FBQWlhLEdBQUEsR0FBQWlCLE1BQUEsQ0FBQWpCLEdBQUEsbUJBQUEyQixvQkFBQUYsUUFBQSxFQUFBMWIsT0FBQSxRQUFBa2MsVUFBQSxHQUFBbGMsT0FBQSxDQUFBMmEsTUFBQSxFQUFBQSxNQUFBLEdBQUFlLFFBQUEsQ0FBQS9DLFFBQUEsQ0FBQXVELFVBQUEsT0FBQXJJLFNBQUEsS0FBQThHLE1BQUEsU0FBQTNhLE9BQUEsQ0FBQTBiLFFBQUEscUJBQUFRLFVBQUEsSUFBQVIsUUFBQSxDQUFBL0MsUUFBQSxlQUFBM1ksT0FBQSxDQUFBMmEsTUFBQSxhQUFBM2EsT0FBQSxDQUFBaWEsR0FBQSxHQUFBcEcsU0FBQSxFQUFBK0gsbUJBQUEsQ0FBQUYsUUFBQSxFQUFBMWIsT0FBQSxlQUFBQSxPQUFBLENBQUEyYSxNQUFBLGtCQUFBdUIsVUFBQSxLQUFBbGMsT0FBQSxDQUFBMmEsTUFBQSxZQUFBM2EsT0FBQSxDQUFBaWEsR0FBQSxPQUFBa0MsU0FBQSx1Q0FBQUQsVUFBQSxpQkFBQWhDLGdCQUFBLE1BQUFnQixNQUFBLEdBQUFuQixRQUFBLENBQUFZLE1BQUEsRUFBQWUsUUFBQSxDQUFBL0MsUUFBQSxFQUFBM1ksT0FBQSxDQUFBaWEsR0FBQSxtQkFBQWlCLE1BQUEsQ0FBQTVMLElBQUEsU0FBQXRQLE9BQUEsQ0FBQTJhLE1BQUEsWUFBQTNhLE9BQUEsQ0FBQWlhLEdBQUEsR0FBQWlCLE1BQUEsQ0FBQWpCLEdBQUEsRUFBQWphLE9BQUEsQ0FBQTBiLFFBQUEsU0FBQXhCLGdCQUFBLE1BQUFrQyxJQUFBLEdBQUFsQixNQUFBLENBQUFqQixHQUFBLFNBQUFtQyxJQUFBLEdBQUFBLElBQUEsQ0FBQUgsSUFBQSxJQUFBamMsT0FBQSxDQUFBMGIsUUFBQSxDQUFBVyxVQUFBLElBQUFELElBQUEsQ0FBQWhWLEtBQUEsRUFBQXBILE9BQUEsQ0FBQXNjLElBQUEsR0FBQVosUUFBQSxDQUFBYSxPQUFBLGVBQUF2YyxPQUFBLENBQUEyYSxNQUFBLEtBQUEzYSxPQUFBLENBQUEyYSxNQUFBLFdBQUEzYSxPQUFBLENBQUFpYSxHQUFBLEdBQUFwRyxTQUFBLEdBQUE3VCxPQUFBLENBQUEwYixRQUFBLFNBQUF4QixnQkFBQSxJQUFBa0MsSUFBQSxJQUFBcGMsT0FBQSxDQUFBMmEsTUFBQSxZQUFBM2EsT0FBQSxDQUFBaWEsR0FBQSxPQUFBa0MsU0FBQSxzQ0FBQW5jLE9BQUEsQ0FBQTBiLFFBQUEsU0FBQXhCLGdCQUFBLGNBQUFzQyxhQUFBQyxJQUFBLFFBQUFDLEtBQUEsS0FBQUMsTUFBQSxFQUFBRixJQUFBLFlBQUFBLElBQUEsS0FBQUMsS0FBQSxDQUFBRSxRQUFBLEdBQUFILElBQUEsV0FBQUEsSUFBQSxLQUFBQyxLQUFBLENBQUFHLFVBQUEsR0FBQUosSUFBQSxLQUFBQyxLQUFBLENBQUFJLFFBQUEsR0FBQUwsSUFBQSxXQUFBTSxVQUFBLENBQUF0TixJQUFBLENBQUFpTixLQUFBLGNBQUFNLGNBQUFOLEtBQUEsUUFBQXhCLE1BQUEsR0FBQXdCLEtBQUEsQ0FBQU8sVUFBQSxRQUFBL0IsTUFBQSxDQUFBNUwsSUFBQSxvQkFBQTRMLE1BQUEsQ0FBQWpCLEdBQUEsRUFBQXlDLEtBQUEsQ0FBQU8sVUFBQSxHQUFBL0IsTUFBQSxhQUFBckIsUUFBQUwsV0FBQSxTQUFBdUQsVUFBQSxNQUFBSixNQUFBLGFBQUFuRCxXQUFBLENBQUF6RSxPQUFBLENBQUF5SCxZQUFBLGNBQUFVLEtBQUEsaUJBQUEvSSxPQUFBZ0osUUFBQSxRQUFBQSxRQUFBLFFBQUFDLGNBQUEsR0FBQUQsUUFBQSxDQUFBekUsY0FBQSxPQUFBMEUsY0FBQSxTQUFBQSxjQUFBLENBQUFuUCxJQUFBLENBQUFrUCxRQUFBLDRCQUFBQSxRQUFBLENBQUFiLElBQUEsU0FBQWEsUUFBQSxPQUFBMVIsS0FBQSxDQUFBMFIsUUFBQSxDQUFBNVksTUFBQSxTQUFBbVAsQ0FBQSxPQUFBNEksSUFBQSxZQUFBQSxLQUFBLGFBQUE1SSxDQUFBLEdBQUF5SixRQUFBLENBQUE1WSxNQUFBLE9BQUE0VCxNQUFBLENBQUFsSyxJQUFBLENBQUFrUCxRQUFBLEVBQUF6SixDQUFBLFVBQUE0SSxJQUFBLENBQUFsVixLQUFBLEdBQUErVixRQUFBLENBQUF6SixDQUFBLEdBQUE0SSxJQUFBLENBQUFMLElBQUEsT0FBQUssSUFBQSxTQUFBQSxJQUFBLENBQUFsVixLQUFBLEdBQUF5TSxTQUFBLEVBQUF5SSxJQUFBLENBQUFMLElBQUEsT0FBQUssSUFBQSxZQUFBQSxJQUFBLENBQUFBLElBQUEsR0FBQUEsSUFBQSxlQUFBQSxJQUFBLEVBQUFiLFVBQUEsZUFBQUEsV0FBQSxhQUFBclUsS0FBQSxFQUFBeU0sU0FBQSxFQUFBb0ksSUFBQSxpQkFBQTlCLGlCQUFBLENBQUFqYixTQUFBLEdBQUFrYiwwQkFBQSxFQUFBL0IsY0FBQSxDQUFBb0MsRUFBQSxtQkFBQXJULEtBQUEsRUFBQWdULDBCQUFBLEVBQUFsQixZQUFBLFNBQUFiLGNBQUEsQ0FBQStCLDBCQUFBLG1CQUFBaFQsS0FBQSxFQUFBK1MsaUJBQUEsRUFBQWpCLFlBQUEsU0FBQWlCLGlCQUFBLENBQUFrRCxXQUFBLEdBQUFyRSxNQUFBLENBQUFvQiwwQkFBQSxFQUFBdEIsaUJBQUEsd0JBQUFiLE9BQUEsQ0FBQXFGLG1CQUFBLGFBQUFDLE1BQUEsUUFBQUMsSUFBQSx3QkFBQUQsTUFBQSxJQUFBQSxNQUFBLENBQUFFLFdBQUEsV0FBQUQsSUFBQSxLQUFBQSxJQUFBLEtBQUFyRCxpQkFBQSw2QkFBQXFELElBQUEsQ0FBQUgsV0FBQSxJQUFBRyxJQUFBLENBQUExTCxJQUFBLE9BQUFtRyxPQUFBLENBQUF5RixJQUFBLGFBQUFILE1BQUEsV0FBQWphLE1BQUEsQ0FBQXFhLGNBQUEsR0FBQXJhLE1BQUEsQ0FBQXFhLGNBQUEsQ0FBQUosTUFBQSxFQUFBbkQsMEJBQUEsS0FBQW1ELE1BQUEsQ0FBQUssU0FBQSxHQUFBeEQsMEJBQUEsRUFBQXBCLE1BQUEsQ0FBQXVFLE1BQUEsRUFBQXpFLGlCQUFBLHlCQUFBeUUsTUFBQSxDQUFBcmUsU0FBQSxHQUFBb0UsTUFBQSxDQUFBc1csTUFBQSxDQUFBYSxFQUFBLEdBQUE4QyxNQUFBLEtBQUF0RixPQUFBLENBQUE0RixLQUFBLGFBQUE1RCxHQUFBLGFBQUFrQixPQUFBLEVBQUFsQixHQUFBLE9BQUFTLHFCQUFBLENBQUFHLGFBQUEsQ0FBQTNiLFNBQUEsR0FBQThaLE1BQUEsQ0FBQTZCLGFBQUEsQ0FBQTNiLFNBQUEsRUFBQTBaLG1CQUFBLGlDQUFBWCxPQUFBLENBQUE0QyxhQUFBLEdBQUFBLGFBQUEsRUFBQTVDLE9BQUEsQ0FBQTZGLEtBQUEsYUFBQXpFLE9BQUEsRUFBQUMsT0FBQSxFQUFBQyxJQUFBLEVBQUFDLFdBQUEsRUFBQXNCLFdBQUEsZUFBQUEsV0FBQSxLQUFBQSxXQUFBLEdBQUFpRCxPQUFBLE9BQUFDLElBQUEsT0FBQW5ELGFBQUEsQ0FBQXpCLElBQUEsQ0FBQUMsT0FBQSxFQUFBQyxPQUFBLEVBQUFDLElBQUEsRUFBQUMsV0FBQSxHQUFBc0IsV0FBQSxVQUFBN0MsT0FBQSxDQUFBcUYsbUJBQUEsQ0FBQWhFLE9BQUEsSUFBQTBFLElBQUEsR0FBQUEsSUFBQSxDQUFBMUIsSUFBQSxHQUFBN1UsSUFBQSxXQUFBaEMsTUFBQSxXQUFBQSxNQUFBLENBQUF3VyxJQUFBLEdBQUF4VyxNQUFBLENBQUEyQixLQUFBLEdBQUE0VyxJQUFBLENBQUExQixJQUFBLFdBQUE1QixxQkFBQSxDQUFBRCxFQUFBLEdBQUF6QixNQUFBLENBQUF5QixFQUFBLEVBQUEzQixpQkFBQSxnQkFBQUUsTUFBQSxDQUFBeUIsRUFBQSxFQUFBL0IsY0FBQSxpQ0FBQU0sTUFBQSxDQUFBeUIsRUFBQSw2REFBQXhDLE9BQUEsQ0FBQXpFLElBQUEsYUFBQXJTLEdBQUEsUUFBQThjLE1BQUEsR0FBQTNhLE1BQUEsQ0FBQW5DLEdBQUEsR0FBQXFTLElBQUEsZ0JBQUFhLEdBQUEsSUFBQTRKLE1BQUEsRUFBQXpLLElBQUEsQ0FBQS9ELElBQUEsQ0FBQTRFLEdBQUEsVUFBQWIsSUFBQSxDQUFBMEssT0FBQSxhQUFBNUIsS0FBQSxXQUFBOUksSUFBQSxDQUFBalAsTUFBQSxTQUFBOFAsR0FBQSxHQUFBYixJQUFBLENBQUFjLEdBQUEsUUFBQUQsR0FBQSxJQUFBNEosTUFBQSxTQUFBM0IsSUFBQSxDQUFBbFYsS0FBQSxHQUFBaU4sR0FBQSxFQUFBaUksSUFBQSxDQUFBTCxJQUFBLE9BQUFLLElBQUEsV0FBQUEsSUFBQSxDQUFBTCxJQUFBLE9BQUFLLElBQUEsUUFBQXJFLE9BQUEsQ0FBQTlELE1BQUEsR0FBQUEsTUFBQSxFQUFBMEYsT0FBQSxDQUFBM2EsU0FBQSxLQUFBdWUsV0FBQSxFQUFBNUQsT0FBQSxFQUFBcUQsS0FBQSxXQUFBQSxNQUFBaUIsYUFBQSxhQUFBak0sSUFBQSxXQUFBb0ssSUFBQSxXQUFBVCxJQUFBLFFBQUFDLEtBQUEsR0FBQWpJLFNBQUEsT0FBQW9JLElBQUEsWUFBQVAsUUFBQSxjQUFBZixNQUFBLGdCQUFBVixHQUFBLEdBQUFwRyxTQUFBLE9BQUFrSixVQUFBLENBQUFoSSxPQUFBLENBQUFpSSxhQUFBLElBQUFtQixhQUFBLFdBQUFyTSxJQUFBLGtCQUFBQSxJQUFBLENBQUFzTSxNQUFBLE9BQUFqRyxNQUFBLENBQUFsSyxJQUFBLE9BQUE2RCxJQUFBLE1BQUFyRyxLQUFBLEVBQUFxRyxJQUFBLENBQUF1TSxLQUFBLGNBQUF2TSxJQUFBLElBQUErQixTQUFBLE1BQUF5SyxJQUFBLFdBQUFBLEtBQUEsU0FBQXJDLElBQUEsV0FBQXNDLFVBQUEsUUFBQXhCLFVBQUEsSUFBQUUsVUFBQSxrQkFBQXNCLFVBQUEsQ0FBQWpQLElBQUEsUUFBQWlQLFVBQUEsQ0FBQXRFLEdBQUEsY0FBQXVFLElBQUEsS0FBQXpDLGlCQUFBLFdBQUFBLGtCQUFBMEMsU0FBQSxhQUFBeEMsSUFBQSxRQUFBd0MsU0FBQSxNQUFBemUsT0FBQSxrQkFBQTBlLE9BQUFDLEdBQUEsRUFBQUMsTUFBQSxXQUFBMUQsTUFBQSxDQUFBNUwsSUFBQSxZQUFBNEwsTUFBQSxDQUFBakIsR0FBQSxHQUFBd0UsU0FBQSxFQUFBemUsT0FBQSxDQUFBc2MsSUFBQSxHQUFBcUMsR0FBQSxFQUFBQyxNQUFBLEtBQUE1ZSxPQUFBLENBQUEyYSxNQUFBLFdBQUEzYSxPQUFBLENBQUFpYSxHQUFBLEdBQUFwRyxTQUFBLEtBQUErSyxNQUFBLGFBQUFsTCxDQUFBLFFBQUFxSixVQUFBLENBQUF4WSxNQUFBLE1BQUFtUCxDQUFBLFNBQUFBLENBQUEsUUFBQWdKLEtBQUEsUUFBQUssVUFBQSxDQUFBckosQ0FBQSxHQUFBd0gsTUFBQSxHQUFBd0IsS0FBQSxDQUFBTyxVQUFBLGlCQUFBUCxLQUFBLENBQUFDLE1BQUEsU0FBQStCLE1BQUEsYUFBQWhDLEtBQUEsQ0FBQUMsTUFBQSxTQUFBekssSUFBQSxRQUFBMk0sUUFBQSxHQUFBMUcsTUFBQSxDQUFBbEssSUFBQSxDQUFBeU8sS0FBQSxlQUFBb0MsVUFBQSxHQUFBM0csTUFBQSxDQUFBbEssSUFBQSxDQUFBeU8sS0FBQSxxQkFBQW1DLFFBQUEsSUFBQUMsVUFBQSxhQUFBNU0sSUFBQSxHQUFBd0ssS0FBQSxDQUFBRSxRQUFBLFNBQUE4QixNQUFBLENBQUFoQyxLQUFBLENBQUFFLFFBQUEsZ0JBQUExSyxJQUFBLEdBQUF3SyxLQUFBLENBQUFHLFVBQUEsU0FBQTZCLE1BQUEsQ0FBQWhDLEtBQUEsQ0FBQUcsVUFBQSxjQUFBZ0MsUUFBQSxhQUFBM00sSUFBQSxHQUFBd0ssS0FBQSxDQUFBRSxRQUFBLFNBQUE4QixNQUFBLENBQUFoQyxLQUFBLENBQUFFLFFBQUEscUJBQUFrQyxVQUFBLFlBQUF6UyxLQUFBLHFEQUFBNkYsSUFBQSxHQUFBd0ssS0FBQSxDQUFBRyxVQUFBLFNBQUE2QixNQUFBLENBQUFoQyxLQUFBLENBQUFHLFVBQUEsWUFBQWIsTUFBQSxXQUFBQSxPQUFBMU0sSUFBQSxFQUFBMkssR0FBQSxhQUFBdkcsQ0FBQSxRQUFBcUosVUFBQSxDQUFBeFksTUFBQSxNQUFBbVAsQ0FBQSxTQUFBQSxDQUFBLFFBQUFnSixLQUFBLFFBQUFLLFVBQUEsQ0FBQXJKLENBQUEsT0FBQWdKLEtBQUEsQ0FBQUMsTUFBQSxTQUFBekssSUFBQSxJQUFBaUcsTUFBQSxDQUFBbEssSUFBQSxDQUFBeU8sS0FBQSx3QkFBQXhLLElBQUEsR0FBQXdLLEtBQUEsQ0FBQUcsVUFBQSxRQUFBa0MsWUFBQSxHQUFBckMsS0FBQSxhQUFBcUMsWUFBQSxpQkFBQXpQLElBQUEsbUJBQUFBLElBQUEsS0FBQXlQLFlBQUEsQ0FBQXBDLE1BQUEsSUFBQTFDLEdBQUEsSUFBQUEsR0FBQSxJQUFBOEUsWUFBQSxDQUFBbEMsVUFBQSxLQUFBa0MsWUFBQSxjQUFBN0QsTUFBQSxHQUFBNkQsWUFBQSxHQUFBQSxZQUFBLENBQUE5QixVQUFBLGNBQUEvQixNQUFBLENBQUE1TCxJQUFBLEdBQUFBLElBQUEsRUFBQTRMLE1BQUEsQ0FBQWpCLEdBQUEsR0FBQUEsR0FBQSxFQUFBOEUsWUFBQSxTQUFBcEUsTUFBQSxnQkFBQTJCLElBQUEsR0FBQXlDLFlBQUEsQ0FBQWxDLFVBQUEsRUFBQTNDLGdCQUFBLFNBQUE4RSxRQUFBLENBQUE5RCxNQUFBLE1BQUE4RCxRQUFBLFdBQUFBLFNBQUE5RCxNQUFBLEVBQUE0QixRQUFBLG9CQUFBNUIsTUFBQSxDQUFBNUwsSUFBQSxRQUFBNEwsTUFBQSxDQUFBakIsR0FBQSxxQkFBQWlCLE1BQUEsQ0FBQTVMLElBQUEsbUJBQUE0TCxNQUFBLENBQUE1TCxJQUFBLFFBQUFnTixJQUFBLEdBQUFwQixNQUFBLENBQUFqQixHQUFBLGdCQUFBaUIsTUFBQSxDQUFBNUwsSUFBQSxTQUFBa1AsSUFBQSxRQUFBdkUsR0FBQSxHQUFBaUIsTUFBQSxDQUFBakIsR0FBQSxPQUFBVSxNQUFBLGtCQUFBMkIsSUFBQSx5QkFBQXBCLE1BQUEsQ0FBQTVMLElBQUEsSUFBQXdOLFFBQUEsVUFBQVIsSUFBQSxHQUFBUSxRQUFBLEdBQUE1QyxnQkFBQSxLQUFBK0UsTUFBQSxXQUFBQSxPQUFBcEMsVUFBQSxhQUFBbkosQ0FBQSxRQUFBcUosVUFBQSxDQUFBeFksTUFBQSxNQUFBbVAsQ0FBQSxTQUFBQSxDQUFBLFFBQUFnSixLQUFBLFFBQUFLLFVBQUEsQ0FBQXJKLENBQUEsT0FBQWdKLEtBQUEsQ0FBQUcsVUFBQSxLQUFBQSxVQUFBLGNBQUFtQyxRQUFBLENBQUF0QyxLQUFBLENBQUFPLFVBQUEsRUFBQVAsS0FBQSxDQUFBSSxRQUFBLEdBQUFFLGFBQUEsQ0FBQU4sS0FBQSxHQUFBeEMsZ0JBQUEseUJBQUFnRixPQUFBdkMsTUFBQSxhQUFBakosQ0FBQSxRQUFBcUosVUFBQSxDQUFBeFksTUFBQSxNQUFBbVAsQ0FBQSxTQUFBQSxDQUFBLFFBQUFnSixLQUFBLFFBQUFLLFVBQUEsQ0FBQXJKLENBQUEsT0FBQWdKLEtBQUEsQ0FBQUMsTUFBQSxLQUFBQSxNQUFBLFFBQUF6QixNQUFBLEdBQUF3QixLQUFBLENBQUFPLFVBQUEsa0JBQUEvQixNQUFBLENBQUE1TCxJQUFBLFFBQUE2UCxNQUFBLEdBQUFqRSxNQUFBLENBQUFqQixHQUFBLEVBQUErQyxhQUFBLENBQUFOLEtBQUEsWUFBQXlDLE1BQUEsZ0JBQUE5UyxLQUFBLDhCQUFBK1MsYUFBQSxXQUFBQSxjQUFBakMsUUFBQSxFQUFBZCxVQUFBLEVBQUFFLE9BQUEsZ0JBQUFiLFFBQUEsS0FBQS9DLFFBQUEsRUFBQXhFLE1BQUEsQ0FBQWdKLFFBQUEsR0FBQWQsVUFBQSxFQUFBQSxVQUFBLEVBQUFFLE9BQUEsRUFBQUEsT0FBQSxvQkFBQTVCLE1BQUEsVUFBQVYsR0FBQSxHQUFBcEcsU0FBQSxHQUFBcUcsZ0JBQUEsT0FBQWpDLE9BQUE7QUFBQSxTQUFBb0gsbUJBQUFDLEdBQUEsRUFBQXRFLE9BQUEsRUFBQUMsTUFBQSxFQUFBc0UsS0FBQSxFQUFBQyxNQUFBLEVBQUFuTCxHQUFBLEVBQUE0RixHQUFBLGNBQUFtQyxJQUFBLEdBQUFrRCxHQUFBLENBQUFqTCxHQUFBLEVBQUE0RixHQUFBLE9BQUE3UyxLQUFBLEdBQUFnVixJQUFBLENBQUFoVixLQUFBLFdBQUFpVSxLQUFBLElBQUFKLE1BQUEsQ0FBQUksS0FBQSxpQkFBQWUsSUFBQSxDQUFBSCxJQUFBLElBQUFqQixPQUFBLENBQUE1VCxLQUFBLFlBQUEyVyxPQUFBLENBQUEvQyxPQUFBLENBQUE1VCxLQUFBLEVBQUFLLElBQUEsQ0FBQThYLEtBQUEsRUFBQUMsTUFBQTtBQUFBLFNBQUFDLGtCQUFBekYsRUFBQSw2QkFBQVQsSUFBQSxTQUFBbUcsSUFBQSxHQUFBMWdCLFNBQUEsYUFBQStlLE9BQUEsV0FBQS9DLE9BQUEsRUFBQUMsTUFBQSxRQUFBcUUsR0FBQSxHQUFBdEYsRUFBQSxDQUFBamIsS0FBQSxDQUFBd2EsSUFBQSxFQUFBbUcsSUFBQSxZQUFBSCxNQUFBblksS0FBQSxJQUFBaVksa0JBQUEsQ0FBQUMsR0FBQSxFQUFBdEUsT0FBQSxFQUFBQyxNQUFBLEVBQUFzRSxLQUFBLEVBQUFDLE1BQUEsVUFBQXBZLEtBQUEsY0FBQW9ZLE9BQUF0ZCxHQUFBLElBQUFtZCxrQkFBQSxDQUFBQyxHQUFBLEVBQUF0RSxPQUFBLEVBQUFDLE1BQUEsRUFBQXNFLEtBQUEsRUFBQUMsTUFBQSxXQUFBdGQsR0FBQSxLQUFBcWQsS0FBQSxDQUFBMUwsU0FBQTtBQUQrQztBQUNoQjtBQUN3QztBQUNmO0FBQ0Y7QUFDQTtBQUVTOztBQUUvRDtBQUNBLElBQU04TCxPQUFPLEdBQUcsS0FBSztBQUFDLElBRUR0ZixjQUFjO0VBQy9CLFNBQUFBLGVBQVlMLE9BQU8sRUFBRTtJQUNqQjRmLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHdDQUF3QyxFQUFFRixPQUFPLENBQUM7SUFDOUQsSUFBSSxDQUFDM2YsT0FBTyxHQUFHQSxPQUFPOztJQUV0QjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBQ1EsSUFBSSxDQUFDOGYsSUFBSSxHQUFHLGNBQWM7SUFDMUIsSUFBSSxDQUFDQyxZQUFZLEdBQUcsU0FBUztJQUM3QixJQUFJLENBQUNDLG9CQUFvQixHQUFHLElBQUk7SUFDaEMsSUFBSSxDQUFDQyxZQUFZLEdBQUcsQ0FBQztJQUVyQixJQUFJLENBQUNDLE9BQU8sR0FBRzVnQixDQUFDLENBQUMsc0JBQXNCLENBQUM7SUFFeEN3QyxrRUFBSyxDQUFDQyxHQUFHLENBQUNvZSxPQUFPLENBQUNDLE9BQU8sR0FBR3RlLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ29lLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDQyxJQUFJLENBQUN2ZSxrRUFBSyxDQUFDQyxHQUFHLENBQUNvZSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9FcmUsa0VBQUssQ0FBQ0MsR0FBRyxDQUFDdWUsT0FBTyxHQUFHeGUsa0VBQUssQ0FBQ0MsR0FBRyxDQUFDdWUsT0FBTyxDQUFDRCxJQUFJLENBQUN2ZSxrRUFBSyxDQUFDQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztJQUV2RCxJQUFJLENBQUN4QixVQUFVLEVBQUU7RUFDckI7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTEksSUFBQXRCLE1BQUEsR0FBQW9CLGNBQUEsQ0FBQW5CLFNBQUE7RUFBQUQsTUFBQSxDQU1Bc2hCLHNCQUFzQixHQUF0QixTQUFBQSx1QkFBdUJDLGFBQWEsRUFBRTtJQUNsQyxPQUFPN1EsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSTZRLEdBQUcsQ0FBQ0QsYUFBYSxDQUFDLENBQUM7RUFDN0M7O0VBRUE7QUFDSjtBQUNBO0FBQ0EsS0FISTtFQUFBdmhCLE1BQUEsQ0FJQXloQixxQkFBcUIsR0FBckIsU0FBQUEsc0JBQXNCRixhQUFhLEVBQUU7SUFDakM7SUFDQSxJQUFNRyxZQUFZLEdBQUcsRUFBRTtJQUN2QnJoQixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUN3VixPQUFPLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDLFVBQUE2TCxRQUFRLEVBQUk7TUFDN0MsSUFBTUMsVUFBVSxHQUFHdmhCLENBQUMsQ0FBQ3NoQixRQUFRLENBQUMsQ0FBQzdmLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQ2dDLE9BQU8sQ0FBQ3ZDLE1BQU0sQ0FBQzZGLFFBQVEsQ0FBQ3lhLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFO01BQzVGLElBQU0xZCxTQUFTLEdBQUc5RCxDQUFDLENBQUNzaEIsUUFBUSxDQUFDLENBQUM3ZixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUNnZ0IsUUFBUSxFQUFFLElBQUksRUFBRTtNQUNqRUosWUFBWSxDQUFDbFIsSUFBSSxDQUFDb1IsVUFBVSxFQUFFemQsU0FBUyxDQUFDO0lBQzVDLENBQUMsQ0FBQztJQUNGO0lBQ0EsSUFBTXFDLE1BQU0sR0FBRythLGFBQWEsQ0FBQ2pNLE1BQU0sQ0FBQyxVQUFDeU0sV0FBVyxFQUFFQyxVQUFVLEVBQUs7TUFDN0QsSUFBSU4sWUFBWSxDQUFDbEwsT0FBTyxDQUFDd0wsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekNELFdBQVcsQ0FBQ3ZSLElBQUksQ0FBQ3dSLFVBQVUsQ0FBQztNQUNoQztNQUNBLE9BQU9ELFdBQVc7SUFDdEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNOO0lBQ0EsT0FBT3ZiLE1BQU07RUFDakI7O0VBRUE7QUFDSjtBQUNBLEtBRkk7RUFBQXhHLE1BQUEsQ0FHQWlpQixZQUFZLEdBQVosU0FBQUEsYUFBYUMsR0FBRyxFQUFFO0lBQ2QsT0FBT0MsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxFQUFFLEdBQUdGLElBQUksQ0FBQ0MsS0FBSyxDQUFDRixHQUFHLENBQUMsQ0FBQztFQUN0RDs7RUFFQTtBQUNKO0FBQ0E7QUFDQSxLQUhJO0VBQUFsaUIsTUFBQSxDQUlBc2lCLGVBQWUsR0FBZixTQUFBQSxnQkFBZ0JqUyxJQUFJLEVBQUU7SUFBQSxJQUFBek8sS0FBQTtJQUNsQixJQUFNMmdCLFNBQVMsR0FBRyxJQUFJLENBQUNOLFlBQVksQ0FBQzVoQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUNpRixNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELElBQU16RCxNQUFNLEdBQUd4QixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUNtaUIsRUFBRSxDQUFDRCxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUN6Z0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDdEUsSUFBSUQsTUFBTSxJQUFJK1MsU0FBUyxFQUFFO01BQ3JCLE9BQU92VSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNNLElBQUksRUFBRTtJQUMzQjtJQUNBO0lBQ0EsSUFBSThoQixVQUFVLEdBQUcvTixJQUFJLENBQUNDLEtBQUssQ0FBQytOLFlBQVksQ0FBQ0MsT0FBTyxnQkFBYzlnQixNQUFNLENBQUcsQ0FBQyxJQUFJLEVBQUU7SUFDOUUsSUFBSTRnQixVQUFVLENBQUNuZCxNQUFNLEVBQUU7TUFBRTtNQUNyQm1kLFVBQVUsR0FBRyxJQUFJLENBQUNuQixzQkFBc0IsQ0FBQ21CLFVBQVUsQ0FBQyxDQUFDLENBQUM7TUFDdERBLFVBQVUsR0FBRyxJQUFJLENBQUNoQixxQkFBcUIsQ0FBQ2dCLFVBQVUsQ0FBQyxDQUFDLENBQUM7TUFDckQsSUFBSSxDQUFDRyxpQkFBaUIsQ0FBQ0gsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDLE1BQU07TUFBRTtNQUNMLElBQU1JLElBQUksR0FBRztRQUNUbGUsUUFBUSx3Q0FBc0MwTCxJQUFNO1FBQ3BEeVMsTUFBTSxFQUFFO1VBQ0o1QixPQUFPLEVBQUU7WUFDTDZCLGdCQUFnQixFQUFFO2NBQUVDLEtBQUssRUFBRTtZQUFJLENBQUM7WUFDaENDLGdCQUFnQixFQUFFO2NBQUVELEtBQUssRUFBRTtZQUFJO1VBQ25DO1FBQ0o7TUFDSixDQUFDO01BQ0RuZ0Isa0VBQUssQ0FBQ0MsR0FBRyxDQUFDb2UsT0FBTyxDQUFDQyxPQUFPLENBQUN0ZixNQUFNLEVBQUVnaEIsSUFBSSxFQUFFLFVBQUM1ZixHQUFHLEVBQUVpZ0IsR0FBRyxFQUFLO1FBQUU7UUFDcEQsSUFBSWpnQixHQUFHLEVBQUU7VUFDTCxPQUFPNUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDTSxJQUFJLEVBQUU7UUFDM0I7UUFDQSxJQUFJd2lCLE9BQU8sR0FBR3pPLElBQUksQ0FBQ0MsS0FBSyxDQUFDdU8sR0FBRyxDQUFDLElBQUksRUFBRTtRQUNuQ0MsT0FBTyxHQUFHdmhCLEtBQUksQ0FBQzBmLHNCQUFzQixDQUFDNkIsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoREEsT0FBTyxHQUFHdmhCLEtBQUksQ0FBQzZmLHFCQUFxQixDQUFDMEIsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMvQ1QsWUFBWSxDQUFDVSxPQUFPLGdCQUFjdmhCLE1BQU0sRUFBSTZTLElBQUksQ0FBQzJPLFNBQVMsQ0FBQ0YsT0FBTyxDQUFDLENBQUM7UUFDcEV2aEIsS0FBSSxDQUFDZ2hCLGlCQUFpQixDQUFDTyxPQUFPLENBQUM7TUFDbkMsQ0FBQyxDQUFDO0lBQ047RUFDSjs7RUFFQTtBQUNKO0FBQ0EsS0FGSTtFQUFBbmpCLE1BQUEsQ0FHQXNqQixzQkFBc0IsR0FBdEIsU0FBQUEsdUJBQUEsRUFBeUI7SUFDckIsSUFBSUgsT0FBTyxHQUFHLEVBQUU7SUFDaEI5aUIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDd1YsT0FBTyxFQUFFLENBQUNDLE9BQU8sQ0FBQyxVQUFBNkwsUUFBUSxFQUFJO01BQzdDLElBQU1JLFdBQVcsR0FBRzFoQixDQUFDLENBQUNzaEIsUUFBUSxDQUFDLENBQUM3ZixJQUFJLENBQUMsUUFBUSxDQUFDO01BQzlDLElBQUlpZ0IsV0FBVyxDQUFDemMsTUFBTSxFQUFFO1FBQ3BCeWMsV0FBVyxDQUNOOVIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNWNkYsT0FBTyxDQUFDLFVBQUF5TixVQUFVLEVBQUk7VUFDbkIsSUFBSUEsVUFBVSxDQUFDamUsTUFBTSxFQUFFO1lBQ25CNmQsT0FBTyxDQUFDM1MsSUFBSSxDQUFDK1MsVUFBVSxDQUFDO1VBQzVCO1FBQ0osQ0FBQyxDQUFDO01BQ1Y7SUFDSixDQUFDLENBQUM7SUFDRjtJQUNBLElBQUlKLE9BQU8sQ0FBQzdkLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDdEIsT0FBTyxJQUFJLENBQUNnZCxlQUFlLENBQUMsU0FBUyxDQUFDO0lBQzFDO0lBQ0FhLE9BQU8sR0FBRyxJQUFJLENBQUM3QixzQkFBc0IsQ0FBQzZCLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDaERBLE9BQU8sR0FBRyxJQUFJLENBQUMxQixxQkFBcUIsQ0FBQzBCLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDL0MsT0FBTyxJQUFJLENBQUNQLGlCQUFpQixDQUFDTyxPQUFPLENBQUM7RUFDMUMsQ0FBQztFQUFBbmpCLE1BQUEsQ0FFS3dqQixjQUFjO0lBQUEsSUFBQUMsZUFBQSxHQUFBakQsaUJBQUEsZUFBQXpILG1CQUFBLEdBQUEwRixJQUFBLENBQXBCLFNBQUFpRixRQUFBO01BQUEsSUFBQUMsV0FBQSxFQUFBQyxPQUFBLEVBQUFDLGNBQUEsRUFBQVYsT0FBQTtNQUFBLE9BQUFwSyxtQkFBQSxHQUFBb0IsSUFBQSxVQUFBMkosU0FBQUMsUUFBQTtRQUFBLGtCQUFBQSxRQUFBLENBQUE5USxJQUFBLEdBQUE4USxRQUFBLENBQUExRyxJQUFBO1VBQUE7WUFDSTtZQUNNc0csV0FBVyxHQUFHSyxjQUFjLENBQUNyQixPQUFPLENBQUMsVUFBVSxDQUFDO1lBQ2hEaUIsT0FBTyxHQUFHSywrREFBYyxDQUFDQyxvQkFBb0IsQ0FBQ1AsV0FBVyxDQUFDLEVBRWhFO1lBQ0E7WUFBQSxJQUNLQyxPQUFPLENBQUN0ZSxNQUFNO2NBQUF5ZSxRQUFBLENBQUExRyxJQUFBO2NBQUE7WUFBQTtZQUFBLE9BQUEwRyxRQUFBLENBQUFoSCxNQUFBLFdBQVMsSUFBSSxDQUFDdUYsZUFBZSxDQUFDLElBQUksQ0FBQ3hCLFlBQVksQ0FBQztVQUFBO1lBRW5FO1lBQ0E4QyxPQUFPLENBQUM5TixPQUFPLENBQUMsVUFBQTFELElBQUk7Y0FBQSxPQUFJL1IsQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUM2UyxNQUFNLENBQUNkLElBQUksQ0FBQzdLLElBQUksQ0FBQztZQUFBLEVBQUM7O1lBRTdFO1lBQ0E7WUFDQTtZQUNBO1lBQ0lzYyxjQUFjLEdBQUcsSUFBSSxDQUFDN0MsWUFBWSxHQUFHNEMsT0FBTyxDQUFDdGUsTUFBTTtZQUFBLEtBQ25EdWUsY0FBYztjQUFBRSxRQUFBLENBQUExRyxJQUFBO2NBQUE7WUFBQTtZQUFBMEcsUUFBQSxDQUFBOVEsSUFBQTtZQUFBOFEsUUFBQSxDQUFBMUcsSUFBQTtZQUFBLE9BRVU0RywrREFBYyxDQUFDRSxxQkFBcUIsQ0FBQ1AsT0FBTyxDQUFDM1MsR0FBRyxDQUFDLFVBQUFpUSxPQUFPO2NBQUEsT0FBSUEsT0FBTyxDQUFDa0QsVUFBVTtZQUFBLEVBQUMsRUFBRVAsY0FBYyxDQUFDO1VBQUE7WUFBaEhWLE9BQU8sR0FBQVksUUFBQSxDQUFBbkgsSUFBQTtZQUFBLE9BQUFtSCxRQUFBLENBQUFoSCxNQUFBLFdBQ0osSUFBSSxDQUFDNkYsaUJBQWlCLENBQUNPLE9BQU8sQ0FBQztVQUFBO1lBQUFZLFFBQUEsQ0FBQTlRLElBQUE7WUFBQThRLFFBQUEsQ0FBQU0sRUFBQSxHQUFBTixRQUFBO1lBRXRDcEQsT0FBTyxDQUFDdkUsS0FBSyxDQUFDLG1CQUFtQixFQUFBMkgsUUFBQSxDQUFBTSxFQUFBLENBQU07VUFBQztZQUloRCxJQUFJLENBQUNDLG1CQUFtQixFQUFFO1lBQUMsT0FBQVAsUUFBQSxDQUFBaEgsTUFBQSxXQUNwQixJQUFJLENBQUNrRSxPQUFPLENBQUN0Z0IsSUFBSSxFQUFFO1VBQUE7VUFBQTtZQUFBLE9BQUFvakIsUUFBQSxDQUFBMUUsSUFBQTtRQUFBO01BQUEsR0FBQXFFLE9BQUE7SUFBQSxDQUM3QjtJQUFBLFNBQUFGLGVBQUE7TUFBQSxPQUFBQyxlQUFBLENBQUEzakIsS0FBQSxPQUFBQyxTQUFBO0lBQUE7SUFBQSxPQUFBeWpCLGNBQUE7RUFBQTtFQUVEO0FBQ0o7QUFDQTtFQUZJO0VBQUF4akIsTUFBQSxDQUdBdWtCLFNBQVMsR0FBVCxTQUFBQSxVQUFVdGUsS0FBSyxFQUFFO0lBQUEsSUFBQXZDLE1BQUE7SUFDYixJQUFNd2QsT0FBTyxHQUFHN2dCLENBQUMsQ0FBQzRGLEtBQUssQ0FBQ0MsYUFBYSxDQUFDLENBQUNrUSxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQzVEOEssT0FBTyxDQUFDeFQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDakM7SUFDQSxJQUFJd1QsT0FBTyxDQUFDMWIsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMwYixPQUFPLENBQUMxYixRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtNQUM3RTBiLE9BQU8sQ0FBQzFiLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUMvQm5GLENBQUMsQ0FBQyxpQkFBaUIsRUFBRTZnQixPQUFPLENBQUMsQ0FBQ3NELFNBQVMsRUFBRSxDQUFDO01BQUEsRUFDMUMsSUFBSSxDQUFDQyxhQUFhLENBQUN4ZSxLQUFLLENBQUMsQ0FBQyxDQUFDO01BQ2pDaWIsT0FBTyxDQUFDemYsUUFBUSxDQUFDLFVBQVUsQ0FBQztNQUM1QnBCLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDcU4sV0FBVyxDQUFDLGNBQWMsQ0FBQztNQUN4RCxPQUFPbEwsa0RBQUksQ0FBQ0MsSUFBSSxDQUFDO1FBQ2JDLElBQUksRUFBRSwwREFBMEQ7UUFDaEUyTixJQUFJLEVBQUU7TUFDVixDQUFDLENBQUM7SUFDTjtJQUNBO0lBQ0EsSUFBSSxDQUFDNFEsT0FBTyxDQUFDcmUsSUFBSSxFQUFFO0lBQ25CLElBQU04aEIsSUFBSSxHQUFHcmtCLENBQUMsQ0FBQyxpQkFBaUIsRUFBRTZnQixPQUFPLENBQUM7SUFDMUNyZSxrRUFBSyxDQUFDQyxHQUFHLENBQUNDLElBQUksQ0FBQzRoQixPQUFPLENBQUMsSUFBSXRPLFFBQVEsQ0FBQ3FPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQUN6aEIsR0FBRyxFQUFFQyxRQUFRLEVBQUs7TUFDN0QsSUFBTXVKLFlBQVksR0FBR3hKLEdBQUcsSUFBSUMsUUFBUSxDQUFDcEIsSUFBSSxDQUFDc2EsS0FBSyxDQUFDLENBQUM7TUFDakQsSUFBSTNQLFlBQVksRUFBRTtRQUFFO1FBQ2hCO1FBQ0EsSUFBTW1ZLEdBQUcsR0FBRzlaLFFBQVEsQ0FBQytaLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDekNELEdBQUcsQ0FBQ0UsU0FBUyxHQUFHclksWUFBWTtRQUM1Qi9JLE1BQUksQ0FBQ3VkLE9BQU8sQ0FBQ3RnQixJQUFJLEVBQUU7UUFDbkJ1Z0IsT0FBTyxDQUFDemYsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBTXNqQixXQUFXLEdBQUc3RCxPQUFPLENBQUM4RCxNQUFNLEVBQUUsQ0FBQ0MsR0FBRztRQUN4QzVrQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM2a0IsT0FBTyxDQUFDO1VBQUVDLFNBQVMsRUFBR0osV0FBVyxHQUFHO1FBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakU7UUFDQTFrQixDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQ3FOLFdBQVcsQ0FBQyxjQUFjLENBQUM7UUFDeEQ7UUFDQSxPQUFPbEwsa0RBQUksQ0FBQ0MsSUFBSSxDQUFDO1VBQ2JDLElBQUksRUFBRWtpQixHQUFHLENBQUNRLFdBQVcsSUFBSVIsR0FBRyxDQUFDN1UsU0FBUztVQUN0Q3BOLElBQUksRUFBRTtRQUNWLENBQUMsQ0FBQztNQUNOO01BQ0FlLE1BQUksQ0FBQ3VkLE9BQU8sQ0FBQ3RnQixJQUFJLEVBQUU7TUFDbkI7TUFDQTtNQUNBTixDQUFDLENBQUN5SyxRQUFRLENBQUMsQ0FBQ3BELE9BQU8sQ0FBQywwQkFBMEIsQ0FBQztNQUMvQztNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7SUFDSixDQUFDLENBQUM7RUFDTjs7RUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBSkk7RUFBQTFILE1BQUEsQ0FLQXFsQixjQUFjLEdBQWQsU0FBQUEsZUFBZXBmLEtBQUssRUFBRTlCLFNBQVMsRUFBRTtJQUM3QixJQUFNbWhCLEdBQUcsR0FBR2psQixDQUFDLENBQUM0RixLQUFLLENBQUNpUSxNQUFNLENBQUMsQ0FBQ0UsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUNsRCxJQUFNL0YsSUFBSSxHQUFHaFEsQ0FBQyxDQUFDaWxCLEdBQUcsQ0FBQyxDQUFDeGpCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUM3QyxJQUFJb1UsTUFBTSxHQUFHLElBQUk7SUFDakIsSUFBSXFQLFFBQVEsR0FBRyxJQUFJO0lBQ25CLElBQUlwZCxLQUFLLEdBQUcsSUFBSTtJQUNoQixRQUFRa0ksSUFBSTtNQUNSLEtBQUssZ0JBQWdCO01BQ3JCLEtBQUssZUFBZTtNQUNwQixLQUFLLFdBQVc7TUFDaEIsS0FBSyxjQUFjO01BQ25CLEtBQUssUUFBUTtRQUNUNkYsTUFBTSxHQUFHN1YsQ0FBQyxDQUFDLGVBQWUsRUFBRWlsQixHQUFHLENBQUM7UUFDaEMsSUFBSXBQLE1BQU0sSUFBSUEsTUFBTSxDQUFDNVEsTUFBTSxFQUFFO1VBQ3pCaWdCLFFBQVEsR0FBR3JQLE1BQU0sQ0FBQ3hQLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzVDLE9BQU8sT0FBS0ssU0FBUyxFQUFJLEVBQUUsQ0FBQyxDQUFDTCxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztVQUMvRXpELENBQUMsT0FBS2tsQixRQUFRLENBQUcsQ0FBQzdlLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1VBQ3ZDckcsQ0FBQyxPQUFLa2xCLFFBQVEsQ0FBRyxDQUFDalAsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDNVAsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7UUFDOUQsQ0FBQyxNQUFNO1VBQ0g2ZSxRQUFRLEdBQUdsbEIsQ0FBQyxDQUFDNEYsS0FBSyxDQUFDaVEsTUFBTSxDQUFDLENBQUN4UCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM1QyxPQUFPLE9BQUtLLFNBQVMsRUFBSSxFQUFFLENBQUMsQ0FBQ0wsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7UUFDNUY7UUFDQTtNQUNKLEtBQUssWUFBWTtRQUNib1MsTUFBTSxHQUFHN1YsQ0FBQyxDQUFDLGNBQWMsRUFBRWlsQixHQUFHLENBQUM7UUFDL0JDLFFBQVEsR0FBR3JQLE1BQU0sQ0FBQ3hQLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzVDLE9BQU8sT0FBS0ssU0FBUyxFQUFJLEVBQUUsQ0FBQyxDQUFDTCxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztRQUMvRXFFLEtBQUssR0FBRytOLE1BQU0sQ0FBQ2hVLEdBQUcsRUFBRTtRQUNwQjdCLENBQUMsT0FBS2tsQixRQUFRLENBQUcsQ0FBQ3JqQixHQUFHLENBQUNpRyxLQUFLLENBQUM7UUFDNUI7TUFDSixLQUFLLFlBQVk7TUFDakIsS0FBSyxVQUFVO1FBQ1grTixNQUFNLEdBQUc3VixDQUFDLENBQUMsYUFBYSxFQUFFaWxCLEdBQUcsQ0FBQztRQUM5QkMsUUFBUSxHQUFHclAsTUFBTSxDQUFDeFAsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDNUMsT0FBTyxPQUFLSyxTQUFTLEVBQUksRUFBRSxDQUFDLENBQUNMLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQy9FcUUsS0FBSyxHQUFHK04sTUFBTSxDQUFDaFUsR0FBRyxFQUFFO1FBQ3BCN0IsQ0FBQyxPQUFLa2xCLFFBQVEsQ0FBRyxDQUFDcmpCLEdBQUcsQ0FBQ2lHLEtBQUssQ0FBQztRQUM1QjtJQUFNO0lBRWQ7SUFDQTlILENBQUMsT0FBS2tsQixRQUFRLENBQUcsQ0FBQzdkLE9BQU8sQ0FBQyxRQUFRLENBQUM7RUFDdkM7O0VBRUE7QUFDSjtBQUNBLEtBRkk7RUFBQTFILE1BQUEsQ0FHQXdsQixrQkFBa0IsR0FBbEIsU0FBQUEsbUJBQW1CQyxZQUFZLEVBQUV2RSxPQUFPLEVBQUU7SUFDdEMsSUFBTTFjLEtBQUssR0FBR2loQixZQUFZLENBQUNyUCxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ2pELElBQUksQ0FBQzVSLEtBQUssQ0FBQ2dCLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO01BQ3pDLE9BQU9oRCxrREFBSSxDQUFDQyxJQUFJLENBQUM7UUFDYkMsSUFBSSxFQUFFLDBEQUEwRDtRQUNoRUMsSUFBSSxFQUFFLE9BQU87UUFDYitpQixPQUFPLEVBQUUsU0FBQUEsUUFBQSxFQUFNO1VBQ1hybEIsQ0FBQyxDQUFDLDRCQUE0QixFQUFFNmdCLE9BQU8sQ0FBQyxDQUFDeFosT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDL0Q7TUFDSixDQUFDLENBQUM7SUFDTjs7SUFDQXJILENBQUMsQ0FBQyw4QkFBOEIsRUFBRTZnQixPQUFPLENBQUMsQ0FBQ3haLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzdEbEYsa0RBQUksQ0FBQ21qQixLQUFLLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCOztFQUVBO0FBQ0o7QUFDQSxLQUZJO0VBQUEzbEIsTUFBQSxDQUdBNGxCLFdBQVcsR0FBWCxTQUFBQSxZQUFZQyxDQUFDLEVBQUU7SUFBQSxJQUFBN2hCLE1BQUE7SUFDWCxJQUFNa2QsT0FBTyxHQUFHN2dCLENBQUMsQ0FBQ3dsQixDQUFDLENBQUMzZixhQUFhLENBQUMsQ0FBQ2tRLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDeEQsSUFBTXZELElBQUksR0FBR3hTLENBQUMsQ0FBQyxpQkFBaUIsRUFBRTZnQixPQUFPLENBQUMsQ0FBQ3hlLElBQUksRUFBRTtJQUNqRCxJQUFNb2pCLFlBQVksR0FBR3psQixDQUFDLENBQUMsb0JBQW9CLEVBQUU2Z0IsT0FBTyxDQUFDLENBQUMzWixJQUFJLEVBQUU7SUFDNUQsSUFBTXBELFNBQVMsR0FBRzlELENBQUMsQ0FBQyxxQkFBcUIsRUFBRTZnQixPQUFPLENBQUMsQ0FBQ2hmLEdBQUcsRUFBRTtJQUV6RE0sa0RBQUksQ0FBQ0MsSUFBSSxDQUFDO01BQ05xUCxLQUFLLG1CQUFpQmUsSUFBTTtNQUM1QnRMLElBQUksRUFBRXVlLFlBQVk7TUFDbEJDLFdBQVcsRUFBRSxZQUFZO01BQ3pCQyxlQUFlLEVBQUUsSUFBSTtNQUNyQkMsaUJBQWlCLEVBQUUsS0FBSztNQUN4QkMsTUFBTSxFQUFFLFNBQUFBLE9BQUEsRUFBTTtRQUNWO1FBQ0EsSUFBTVQsWUFBWSxHQUFHcGxCLENBQUMsQ0FBQ21DLGtEQUFJLENBQUM4RSxVQUFVLEVBQUUsQ0FBQztRQUN6Q3dSLG9FQUFtQixDQUFDMk0sWUFBWSxFQUFFdGhCLFNBQVMsRUFBRSxPQUFPLENBQUM7UUFDckQ5RCxDQUFDLENBQUMsMEJBQTBCLEVBQUVvbEIsWUFBWSxDQUFDLENBQUNyZCxNQUFNLENBQUMsVUFBQW5DLEtBQUssRUFBSTtVQUN4RGpDLE1BQUksQ0FBQ3FoQixjQUFjLENBQUNwZixLQUFLLEVBQUU5QixTQUFTLENBQUM7UUFDekMsQ0FBQyxDQUFDO1FBQ0Y7UUFDQSxJQUFJLENBQUMrYyxPQUFPLENBQUMxYixRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtVQUN4Q25GLENBQUMsQ0FBQywwQkFBMEIsRUFBRW9sQixZQUFZLENBQUMsQ0FBQzVnQixJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQzZDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1VBQzlGckgsQ0FBQyxDQUFDLDBCQUEwQixFQUFFb2xCLFlBQVksQ0FBQyxDQUFDNWdCLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDNkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7VUFDbkdySCxDQUFDLENBQUMsMEJBQTBCLEVBQUVvbEIsWUFBWSxDQUFDLENBQUM1Z0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM2QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztVQUMxRnJILENBQUMsQ0FBQywwQkFBMEIsRUFBRW9sQixZQUFZLENBQUMsQ0FBQzVnQixJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQzZDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1VBQzVGckgsQ0FBQyxDQUFDLDBCQUEwQixFQUFFb2xCLFlBQVksQ0FBQyxDQUFDNWdCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzZDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1VBQ2hGckgsQ0FBQyxDQUFDLDBCQUEwQixFQUFFb2xCLFlBQVksQ0FBQyxDQUFDNWdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDeVQsTUFBTSxFQUFFLENBQUM1USxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwRzs7UUFFQTtRQUNBMUQsTUFBSSxDQUFDbWlCLGNBQWMsQ0FBQ2hpQixTQUFTLENBQUMsQ0FBQ3dTLG9CQUFvQixDQUFDOE8sWUFBWSxDQUFDOztRQUU3RDtRQUNKcGxCLENBQUMsQ0FBQyxtQ0FBbUMsRUFBRW9sQixZQUFZLENBQUMsQ0FBQ3pmLEVBQUUsQ0FBQyxPQUFPLEVBQUU7VUFBQSxPQUFNaEMsTUFBSSxDQUFDd2hCLGtCQUFrQixDQUFDQyxZQUFZLEVBQUV2RSxPQUFPLENBQUM7UUFBQSxFQUFDO01BQzFIO0lBQ0osQ0FBQyxDQUFDO0VBQ047O0VBRUE7QUFDSjtBQUNBLEtBRkk7RUFBQWxoQixNQUFBLENBR0Fza0IsbUJBQW1CLEdBQW5CLFNBQUFBLG9CQUFBLEVBQXNCO0lBQUEsSUFBQWxnQixNQUFBO0lBQ2xCLElBQUksQ0FBQytoQixjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCOWxCLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDd1YsT0FBTyxFQUFFLENBQUNDLE9BQU8sQ0FBQyxVQUFBb0wsT0FBTyxFQUFJO01BQ3BELElBQUlrRixNQUFNLEdBQUcvbEIsQ0FBQyxDQUFDNmdCLE9BQU8sQ0FBQyxDQUFDcmMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMzQyxHQUFHLEVBQUU7TUFDOURrQyxNQUFJLENBQUMraEIsY0FBYyxDQUFDQyxNQUFNLENBQUMsR0FBRyxJQUFJNVEseUVBQXFCLENBQUNuVixDQUFDLENBQUM2Z0IsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNKUCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUN1RixjQUFjLENBQUM7SUFDaEM5bEIsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLENBQUMyRixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUE2ZixDQUFDO01BQUEsT0FBSXpoQixNQUFJLENBQUNtZ0IsU0FBUyxDQUFDc0IsQ0FBQyxDQUFDO0lBQUEsRUFBQyxDQUFDLENBQUM7O0lBRXZFeGxCLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDMkYsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBNmYsQ0FBQztNQUFBLE9BQUl6aEIsTUFBSSxDQUFDd2hCLFdBQVcsQ0FBQ0MsQ0FBQyxDQUFDO0lBQUEsRUFBQyxDQUFDLENBQUM7O0lBRXZFLElBQUksQ0FBQ1EsaUJBQWlCLEVBQUU7RUFDNUI7O0VBRUE7QUFDSjtBQUNBO0FBQ0EsS0FISTtFQUFBcm1CLE1BQUEsQ0FJQTRpQixpQkFBaUIsR0FBakIsU0FBQUEsa0JBQWtCTyxPQUFPLEVBQUU7SUFBQSxJQUFBdGMsTUFBQTtJQUN2QixJQUFJc2MsT0FBTyxDQUFDN2QsTUFBTSxFQUFFO01BQ2hCNmQsT0FBTyxHQUFHQSxPQUFPLENBQUMvRCxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQzRCLFlBQVksSUFBSW1DLE9BQU8sQ0FBQzdkLE1BQU0sQ0FBQztNQUMvRCxJQUFNZ2hCLGVBQWUsR0FBRyxTQUFsQkEsZUFBZUEsQ0FBQSxFQUFTO1FBQzFCLElBQUluRCxPQUFPLENBQUM3ZCxNQUFNLEtBQUssQ0FBQyxFQUFFO1VBQUU7VUFDeEJ1QixNQUFJLENBQUN5ZCxtQkFBbUIsRUFBRTtVQUMxQixPQUFPemQsTUFBSSxDQUFDb2EsT0FBTyxDQUFDdGdCLElBQUksRUFBRTtRQUM5QjtRQUNBLElBQU11VixNQUFNLEdBQUdpTixPQUFPLENBQUNvRCxLQUFLLEVBQUU7UUFDOUIsSUFBTUMsYUFBYSxHQUFHdFEsTUFBTSxDQUFDNEwsUUFBUSxFQUFFLENBQUMzUCxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUd0UCxrRUFBSyxDQUFDQyxHQUFHLENBQUNvZSxPQUFPLENBQUNDLE9BQU8sR0FBR3RlLGtFQUFLLENBQUNDLEdBQUcsQ0FBQ3VlLE9BQU87UUFDekdtRixhQUFhLENBQUN0USxNQUFNLEVBQUU7VUFBRXZSLFFBQVEsRUFBRTtRQUErQixDQUFDLEVBQUUsVUFBQzFCLEdBQUcsRUFBRUMsUUFBUSxFQUFLO1VBQ25GLElBQUlELEdBQUcsRUFBRTtZQUFFO1VBQVEsQ0FBQyxDQUFDO1VBQ3JCNUMsQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUM2UyxNQUFNLENBQUNoUSxRQUFRLENBQUMsQ0FBQyxDQUFDO1VBQ3JEb2pCLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDO01BQ04sQ0FBQzs7TUFDREEsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDLE1BQU07TUFDSGptQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNNLElBQUksRUFBRTtJQUNwQjtFQUNKOztFQUVBO0FBQ0o7QUFDQTtBQUNBLEtBSEk7RUFBQVgsTUFBQSxDQUlBcW1CLGlCQUFpQixHQUFqQixTQUFBQSxrQkFBQSxFQUFvQjtJQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDdEYsb0JBQW9CLEVBQUU7O0lBRWhDO0lBQ0ExZ0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDb0IsUUFBUSxDQUFDLGlCQUFpQixDQUFDO0lBQzNDcEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDb0IsUUFBUSxDQUFDLGlCQUFpQixDQUFDO0lBRTNDcEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDdUwsSUFBSSxDQUFDLFlBQVksaWFBYzlCO0lBRUg2YSxzRUFBYyxDQUFDLElBQUksQ0FBQzFsQixPQUFPLENBQUM7SUFFNUIsSUFBTTJsQixVQUFVLEdBQUdDLHdFQUFxQixDQUFDLFFBQVEsQ0FBQztJQUVsRHRtQixDQUFDLENBQUNxbUIsVUFBVSxDQUFDLENBQUMxZ0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFBNmYsQ0FBQyxFQUFJO01BQzVCLElBQUllLFlBQVksR0FBRyxDQUFDZixDQUFDLENBQUMzUCxNQUFNLENBQUMyUSxPQUFPO01BRXBDLElBQUlELFlBQVksRUFBRTtRQUNkdm1CLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQ3ltQixLQUFLLENBQUMsUUFBUSxDQUFDO01BQ25DO0lBQ0osQ0FBQyxDQUFDO0VBQ047O0VBRUE7QUFDSjtBQUNBLEtBRkk7RUFBQTltQixNQUFBLENBR0FzQixVQUFVLEdBQVYsU0FBQUEsV0FBQSxFQUFhO0lBQ1QsSUFBSSxDQUFDMmYsT0FBTyxDQUFDcmUsSUFBSSxFQUFFO0lBRW5CLFFBQVEsSUFBSSxDQUFDaWUsSUFBSTtNQUNiLEtBQUssU0FBUztRQUNWLE9BQU8sSUFBSSxDQUFDeUIsZUFBZSxDQUFDLFNBQVMsQ0FBQztNQUMxQyxLQUFLLFNBQVM7UUFDVixPQUFPLElBQUksQ0FBQ0EsZUFBZSxDQUFDLFNBQVMsQ0FBQztNQUMxQyxLQUFLLGVBQWU7UUFDaEIsT0FBTyxJQUFJLENBQUNnQixzQkFBc0IsRUFBRTtNQUN4QyxLQUFLLGNBQWM7UUFDZixPQUFPLElBQUksQ0FBQ0UsY0FBYyxFQUFFO0lBQUM7RUFFekMsQ0FBQztFQUFBLE9BQUFwaUIsY0FBQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBQzNhTDtBQUFBO0FBQUE7QUFBK0Q7QUFFL0QsSUFBTUYsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUFzQkEsQ0FBQSxFQUFTO0VBQ2pDLElBQU02bEIsaUJBQWlCLEdBQUcxbUIsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0VBQy9DLElBQU0ybUIsZUFBZSxHQUFHM21CLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztFQUN0RCxJQUFNNG1CLEVBQUUsR0FBR04sd0VBQXFCLENBQUMsUUFBUSxDQUFDO0VBRTFDLFNBQVNPLFdBQVdBLENBQUNELEVBQUUsRUFBRTtJQUNyQixJQUFNRSxVQUFVLEdBQUcsR0FBRztJQUV0QixJQUFJLENBQUNGLEVBQUUsQ0FBQ0osT0FBTyxFQUFFO01BQ2IsSUFBTU8sa0JBQWtCLEdBQUc3bEIsTUFBTSxDQUFDOGxCLE9BQU8sR0FBRzlsQixNQUFNLENBQUMrbEIsV0FBVztNQUU5RCxJQUFJRixrQkFBa0IsR0FBR0wsaUJBQWlCLENBQUMvQixNQUFNLEVBQUUsQ0FBQ0MsR0FBRyxFQUFFO1FBQ3JEK0IsZUFBZSxDQUFDcGtCLElBQUksRUFBRTtNQUMxQixDQUFDLE1BQU07UUFDSG9rQixlQUFlLENBQUNybUIsSUFBSSxFQUFFO01BQzFCO01BRUFOLENBQUMsQ0FBQ2tCLE1BQU0sQ0FBQyxDQUFDeUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFNO1FBQ3pCLElBQU11aEIsb0JBQW9CLEdBQUdobUIsTUFBTSxDQUFDOGxCLE9BQU8sR0FBRzlsQixNQUFNLENBQUMrbEIsV0FBVztRQUVoRSxJQUFJQyxvQkFBb0IsR0FBR1IsaUJBQWlCLENBQUMvQixNQUFNLEVBQUUsQ0FBQ0MsR0FBRyxFQUFFO1VBQ3ZEK0IsZUFBZSxDQUFDUSxNQUFNLENBQUNMLFVBQVUsQ0FBQztRQUN0QyxDQUFDLE1BQU07VUFDSEgsZUFBZSxDQUFDUyxPQUFPLENBQUNOLFVBQVUsQ0FBQztRQUN2QztNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsTUFBTTtNQUNISCxlQUFlLENBQUNybUIsSUFBSSxFQUFFO0lBQzFCO0VBQ0o7RUFFQXNtQixFQUFFLENBQUNTLFdBQVcsQ0FBQ1IsV0FBVyxDQUFDO0VBQzNCQSxXQUFXLENBQUNELEVBQUUsQ0FBQztFQUVmRCxlQUFlLENBQUNoaEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQzlCLElBQU0yaEIsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzVCLElBQU1DLFlBQVksR0FBR2IsaUJBQWlCLENBQUMvQixNQUFNLEVBQUUsQ0FBQ0MsR0FBRztJQUVuRCxJQUFJMEMsWUFBWSxFQUFFO01BQ2RwbUIsTUFBTSxDQUFDNkYsUUFBUSxDQUFDeWdCLElBQUksR0FBRyxlQUFlO0lBQzFDLENBQUMsTUFBTTtNQUNIeG5CLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzZrQixPQUFPLENBQUM7UUFBRUMsU0FBUyxFQUFFeUMsWUFBWSxHQUFHO01BQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckU7RUFDSixDQUFDLENBQUM7QUFDTixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM5Q0Q7QUFBQTtBQUNBO0FBQ0E7QUFDQSxJQUFNOU8sbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFtQkEsQ0FBSWdQLEtBQUssRUFBRTNqQixTQUFTLEVBQUVpUixHQUFHLEVBQUs7RUFDbkQvVSxDQUFDLENBQUMsNkNBQTZDLEVBQUV5bkIsS0FBSyxDQUFDLENBQUNsWSxJQUFJLENBQUMsVUFBQzNGLEtBQUssRUFBRThkLEVBQUUsRUFBSztJQUN4RSxJQUFNQyxRQUFRLEdBQUczbkIsQ0FBQyxDQUFDMG5CLEVBQUUsQ0FBQyxDQUFDbmMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbkN2TCxDQUFDLENBQUMwbkIsRUFBRSxDQUFDLENBQUNuYyxJQUFJLENBQUMsSUFBSSxFQUFLd0osR0FBRyxTQUFJNFMsUUFBUSxTQUFJN2pCLFNBQVMsQ0FBRyxDQUFDLENBQUM7SUFDckQ5RCxDQUFDLENBQUMwbkIsRUFBRSxDQUFDLENBQUMxSyxJQUFJLEVBQUUsQ0FBQ3pSLElBQUksQ0FBQyxLQUFLLEVBQUt3SixHQUFHLFNBQUk0UyxRQUFRLFNBQUk3akIsU0FBUyxDQUFHLENBQUMsQ0FBQztFQUNqRSxDQUFDLENBQUM7RUFDRjtFQUNBLElBQU04akIscUJBQXFCLEdBQUcsQ0FDMUIsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixvQkFBb0IsRUFDcEIsUUFBUSxFQUNSLFVBQVUsQ0FDYjtFQUNELElBQU1DLDhCQUE4QixHQUFHRCxxQkFBcUIsQ0FBQzFrQixJQUFJLENBQUMsR0FBRyxDQUFDO0VBQ3RFbEQsQ0FBQyxDQUFDNm5CLDhCQUE4QixFQUFFSixLQUFLLENBQUMsQ0FBQzFSLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQ3ZSLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQytLLElBQUksQ0FBQyxVQUFDM0YsS0FBSyxFQUFFOGQsRUFBRSxFQUFLO0lBQzlGLElBQU1DLFFBQVEsR0FBRzNuQixDQUFDLENBQUMwbkIsRUFBRSxDQUFDLENBQUNuYyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNwQ3ZMLENBQUMsQ0FBQzBuQixFQUFFLENBQUMsQ0FBQ25jLElBQUksQ0FBQyxLQUFLLEVBQUt3SixHQUFHLFNBQUk0UyxRQUFRLFNBQUk3akIsU0FBUyxDQUFHLENBQUMsQ0FBQztJQUN0RDlELENBQUMsQ0FBQzBuQixFQUFFLENBQUMsQ0FBQzFLLElBQUksRUFBRSxDQUFDelIsSUFBSSxDQUFDLElBQUksRUFBS3dKLEdBQUcsU0FBSTRTLFFBQVEsU0FBSTdqQixTQUFTLENBQUcsQ0FBQyxDQUFDO0VBQ2hFLENBQUMsQ0FBQztBQUNOLENBQUM7O0FBRWMyVSxrRkFBbUIsRSIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuOS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgeyBiaW5kLCBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgY2hlY2tJc0dpZnRDZXJ0VmFsaWQgZnJvbSAnLi9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3InO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgU2hpcHBpbmdFc3RpbWF0b3IgZnJvbSAnLi9jYXJ0L3NoaXBwaW5nLWVzdGltYXRvcic7XG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwsIE1vZGFsRXZlbnRzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xuaW1wb3J0IENhcnRJdGVtRGV0YWlscyBmcm9tICcuL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscyc7XG5cbmltcG9ydCB7IGZsb2F0aW5nQ2hlY2tvdXRCdXR0b24gfSBmcm9tICcuL2N1c3RvbS9jdXN0b20tY2FydCc7XG5pbXBvcnQgQ2FydFBhZ2VVcHNlbGwgZnJvbSAnLi9jdXN0b20vY2FydC1wYWdlLXVwc2VsbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy4kbW9kYWwgPSBudWxsO1xuICAgICAgICB0aGlzLiRjYXJ0UGFnZUNvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0XScpO1xuICAgICAgICB0aGlzLiRjYXJ0Q29udGVudCA9ICQoJ1tkYXRhLWNhcnQtY29udGVudF0nKTtcbiAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzID0gJCgnW2RhdGEtY2FydC1zdGF0dXNdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRUb3RhbHMgPSAkKCdbZGF0YS1jYXJ0LXRvdGFsc10nKTtcbiAgICAgICAgdGhpcy4kY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMgPSAkKCdbZGF0YS1jYXJ0LWFkZGl0aW9uYWwtY2hlY2tvdXQtYnV0dG9uc10nKTtcbiAgICAgICAgdGhpcy4kb3ZlcmxheSA9ICQoJ1tkYXRhLWNhcnRdIC5sb2FkaW5nT3ZlcmxheScpXG4gICAgICAgICAgICAuaGlkZSgpOyAvLyBUT0RPOiB0ZW1wb3JhcnkgdW50aWwgcm9wZXIgcHVsbHMgaW4gaGlzIGNhcnQgY29tcG9uZW50c1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gbnVsbDtcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSBudWxsO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tQ2FydCA9IHRoaXMuY29udGV4dC5pdHNDb25maWcuY3VzdG9tX2NhcnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQ2FydCkge1xuICAgICAgICAgICAgZmxvYXRpbmdDaGVja291dEJ1dHRvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYXJ0UGFnZVVwc2VsbCA9IG5ldyBDYXJ0UGFnZVVwc2VsbCh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIHRoaXMuc2V0QXBwbGVQYXlTdXBwb3J0KCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHNldEFwcGxlUGF5U3VwcG9ydCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5BcHBsZVBheVNlc3Npb24pIHtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudC5hZGRDbGFzcygnYXBwbGUtcGF5LXN1cHBvcnRlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FydFVwZGF0ZSgkdGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICR0YXJnZXQuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gaXRlbUlkO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiA9ICR0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XG5cbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcGFyc2VJbnQoJGVsLnZhbCgpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpID09PSAnaW5jJyA/IG9sZFF0eSArIDEgOiBvbGRRdHkgLSAxO1xuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1pbkVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXhRdHkgPiAwICYmIG5ld1F0eSA+IG1heFF0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWF4RXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsID0gbnVsbCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3QgbWF4UXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWF4JyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcHJlVmFsICE9PSBudWxsID8gcHJlVmFsIDogbWluUXR5O1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gcGFyc2VJbnQoTnVtYmVyKCRlbC52YWwoKSksIDEwKTtcbiAgICAgICAgbGV0IGludmFsaWRFbnRyeTtcblxuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmICghbmV3UXR5KSB7XG4gICAgICAgICAgICBpbnZhbGlkRW50cnkgPSAkZWwudmFsKCk7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLmNvbnRleHQuaW52YWxpZEVudHJ5TWVzc2FnZS5yZXBsYWNlKCdbRU5UUlldJywgaW52YWxpZEVudHJ5KSxcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1heEVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1SZW1vdmUoaXRlbUlkLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydEVkaXRPcHRpb25zKGl0ZW1JZCwgcHJvZHVjdElkKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7IHByb2R1Y3RGb3JDaGFuZ2VJZDogcHJvZHVjdElkLCAuLi50aGlzLmNvbnRleHQgfTtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICBpZiAodGhpcy4kbW9kYWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJG1vZGFsID0gJCgnI21vZGFsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9jb25maWd1cmUtcHJvZHVjdCcsXG4gICAgICAgIH07XG5cbiAgICAgICAgbW9kYWwub3BlbigpO1xuICAgICAgICB0aGlzLiRtb2RhbC5maW5kKCcubW9kYWwtY29udGVudCcpLmFkZENsYXNzKCdoaWRlLWNvbnRlbnQnKTtcblxuICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMuY29uZmlndXJlSW5DYXJ0KGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsIHRoaXMuJG1vZGFsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCA9ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5vdXRlckhlaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5sZW5ndGggJiYgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLmNzcygnaGVpZ2h0JywgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLiRtb2RhbC5oYXNDbGFzcygnb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uQ2hhbmdlSGFuZGxlcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRtb2RhbC5vbmUoTW9kYWxFdmVudHMub3BlbmVkLCBvcHRpb25DaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBDYXJ0SXRlbURldGFpbHModGhpcy4kbW9kYWwsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxzLmhvb2tzLm9uKCdwcm9kdWN0LW9wdGlvbi1jaGFuZ2UnLCAoZXZlbnQsIGN1cnJlbnRUYXJnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJChjdXJyZW50VGFyZ2V0KS5maW5kKCdmb3JtJyk7XG4gICAgICAgICAgICBjb25zdCAkc3VibWl0ID0gJCgnaW5wdXQuYnV0dG9uJywgJGZvcm0pO1xuICAgICAgICAgICAgY29uc3QgJG1lc3NhZ2VCb3ggPSAkKCcuYWxlcnRNZXNzYWdlQm94Jyk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZXJyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgncC5hbGVydEJveC1tZXNzYWdlJywgJG1lc3NhZ2VCb3gpLnRleHQoZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnB1cmNoYXNhYmxlIHx8ICFkYXRhLmluc3RvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZnJlc2hDb250ZW50KHJlbW92ZSkge1xuICAgICAgICBjb25zdCAkY2FydEl0ZW1zUm93cyA9ICQoJ1tkYXRhLWl0ZW0tcm93XScsIHRoaXMuJGNhcnRDb250ZW50KTtcbiAgICAgICAgY29uc3QgJGNhcnRQYWdlVGl0bGUgPSAkKCdbZGF0YS1jYXJ0LXBhZ2UtdGl0bGVdJyk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5jdXN0b21DYXJ0ID8gJ2N1c3RvbS9jYXJ0L2NvbnRlbnQnIDogJ2NhcnQvY29udGVudCcsXG4gICAgICAgICAgICAgICAgdG90YWxzOiB0aGlzLmN1c3RvbUNhcnQgPyAnY3VzdG9tL2NhcnQvdG90YWxzJyA6ICdjYXJ0L3RvdGFscycsXG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiAnY2FydC9wYWdlLXRpdGxlJyxcbiAgICAgICAgICAgICAgICBzdGF0dXNNZXNzYWdlczogJ2NhcnQvc3RhdHVzLW1lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zOiAnY2FydC9hZGRpdGlvbmFsLWNoZWNrb3V0LWJ1dHRvbnMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICAvLyBSZW1vdmUgbGFzdCBpdGVtIGZyb20gY2FydD8gUmVsb2FkXG4gICAgICAgIGlmIChyZW1vdmUgJiYgJGNhcnRJdGVtc1Jvd3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0Q29udGVudChvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kY2FydENvbnRlbnQuaHRtbChyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRUb3RhbHMuaHRtbChyZXNwb25zZS50b3RhbHMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzLmh0bWwocmVzcG9uc2Uuc3RhdHVzTWVzc2FnZXMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMuaHRtbChyZXNwb25zZS5hZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zKTtcblxuICAgICAgICAgICAgJGNhcnRQYWdlVGl0bGUucmVwbGFjZVdpdGgocmVzcG9uc2UucGFnZVRpdGxlKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gJCgnW2RhdGEtY2FydC1xdWFudGl0eV0nLCB0aGlzLiRjYXJ0Q29udGVudCkuZGF0YSgnY2FydFF1YW50aXR5JykgfHwgMDtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXIoJ2NhcnQtcXVhbnRpdHktdXBkYXRlJywgcXVhbnRpdHkpO1xuXG4gICAgICAgICAgICAkKGBbZGF0YS1jYXJ0LWl0ZW1pZD0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkfSddYCwgdGhpcy4kY2FydENvbnRlbnQpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihgW2RhdGEtYWN0aW9uPScke3RoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9ufSddYClcbiAgICAgICAgICAgICAgICAudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZENhcnRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IGRlYm91bmNlVGltZW91dCA9IDQwMDtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0UmVtb3ZlSXRlbSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGxldCBwcmVWYWw7XG5cbiAgICAgICAgLy8gY2FydCB1cGRhdGVcbiAgICAgICAgJCgnW2RhdGEtY2FydC11cGRhdGVdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FydCBxdHkgbWFudWFsbHkgdXBkYXRlc1xuICAgICAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbignZm9jdXMnLCBmdW5jdGlvbiBvblF0eUZvY3VzKCkge1xuICAgICAgICAgICAgcHJlVmFsID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSkuY2hhbmdlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jYXJ0LXJlbW92ZScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybURlbGV0ZScpO1xuICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogdGhpcy5jb250ZXh0LmNhbmNlbEJ1dHRvblRleHQsXG4gICAgICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBpdGVtIGZyb20gY2FydFxuICAgICAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnW2RhdGEtaXRlbS1lZGl0XScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1FZGl0Jyk7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3Byb2R1Y3RJZCcpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIGVkaXQgaXRlbSBpbiBjYXJ0XG4gICAgICAgICAgICB0aGlzLmNhcnRFZGl0T3B0aW9ucyhpdGVtSWQsIHByb2R1Y3RJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRQcm9tb0NvZGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Db250YWluZXIgPSAkKCcuY291cG9uLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNvdXBvbkZvcm0gPSAkKCcuY291cG9uLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNvZGVJbnB1dCA9ICQoJ1tuYW1lPVwiY291cG9uY29kZVwiXScsICRjb3Vwb25Gb3JtKTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5oaWRlKCk7XG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5zaG93KCk7XG4gICAgICAgICAgICAkY29kZUlucHV0LnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykuc2hvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY291cG9uRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjb2RlSW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY29kZUlucHV0LmRhdGEoJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5Q29kZShjb2RlLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNlcnRDb250YWluZXIgPSAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0Rm9ybSA9ICQoJy5jYXJ0LWdpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xuICAgICAgICBjb25zdCAkY2VydElucHV0ID0gJCgnW25hbWU9XCJjZXJ0Y29kZVwiXScsICRjZXJ0Rm9ybSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkudG9nZ2xlKCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY2VydEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY2VydElucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoIWNoZWNrSXNHaWZ0Q2VydFZhbGlkKGNvZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkodGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdmFsaWRhdGlvbkRpY3Rpb25hcnkuaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUdpZnRDZXJ0aWZpY2F0ZShjb2RlLCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHJlc3AuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUdpZnR3cmFwJyk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0Jykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2VsZWN0LmRhdGEoJ2luZGV4Jyk7XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFsbG93TWVzc2FnZSA9ICRzZWxlY3QuZmluZChgb3B0aW9uW3ZhbHVlPSR7aWR9XWApLmRhdGEoJ2FsbG93TWVzc2FnZScpO1xuXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fS0ke2lkfWApLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkKCdpbnB1dDpyYWRpb1tuYW1lID1cImdpZnR3cmFwdHlwZVwiXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICBjb25zdCAkc2luZ2xlRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctc2luZ2xlJyk7XG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdzYW1lJykge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnW25hbWU9XCJnaWZ0d3JhcHR5cGVcIl0nKS5vbignY2xpY2snLCB0b2dnbGVWaWV3cyk7XG5cbiAgICAgICAgdG9nZ2xlVmlld3MoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmJpbmRDYXJ0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCk7XG5cbiAgICAgICAgLy8gaW5pdGlhdGUgc2hpcHBpbmcgZXN0aW1hdG9yIG1vZHVsZVxuICAgICAgICBjb25zdCBzaGlwcGluZ0Vycm9yTWVzc2FnZXMgPSB7XG4gICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmNvbnRleHQuc2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgcHJvdmluY2U6IHRoaXMuY29udGV4dC5zaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSwgc2hpcHBpbmdFcnJvck1lc3NhZ2VzKTtcblxuICAgICAgICAvLyByZWxvYWQgY2FydCBjb250ZW50IHdoZW4gYSBDYXJ0IFBhZ2UgVXBzZWxsIGl0ZW0gaXMgYWRkZWQgdG8gdGhlIGNhcnRcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NwdS1yZWZyZXNoLWNhcnQtY29udGVudCcsICgpID0+IHRoaXMucmVmcmVzaENvbnRlbnQoZmFsc2UpKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCBzdGF0ZUNvdW50cnkgZnJvbSAnLi4vY29tbW9uL3N0YXRlLWNvdW50cnknO1xuaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzLCBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHBpbmdFc3RpbWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50LCBzaGlwcGluZ0Vycm9yTWVzc2FnZXMpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuXG4gICAgICAgIHRoaXMuJHN0YXRlID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJywgdGhpcy4kZWxlbWVudCk7XG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0gc2hpcHBpbmdFcnJvck1lc3NhZ2VzO1xuICAgICAgICB0aGlzLmluaXRGb3JtVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5iaW5kRXN0aW1hdG9yRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaW5pdEZvcm1WYWxpZGF0aW9uKCkge1xuICAgICAgICBjb25zdCBzaGlwcGluZ0VzdGltYXRvckFsZXJ0ID0gJCgnLnNoaXBwaW5nLXF1b3RlcycpO1xuXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSAnZm9ybVtkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nO1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gLnNoaXBwaW5nLWVzdGltYXRlLXN1Ym1pdGAsXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXQnLCB0aGlzLiRlbGVtZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAvLyBlc3RpbWF0b3IgZXJyb3IgbWVzc2FnZXMgYXJlIGJlaW5nIGluamVjdGVkIGluIGh0bWwgYXMgYSByZXN1bHRcbiAgICAgICAgICAgIC8vIG9mIHVzZXIgc3VibWl0OyBjbGVhcmluZyBhbmQgYWRkaW5nIHJvbGUgb24gc3VibWl0IHByb3ZpZGVzXG4gICAgICAgICAgICAvLyByZWd1bGFyIGFubm91bmNlbWVudCBvZiB0aGVzZSBlcnJvciBtZXNzYWdlc1xuICAgICAgICAgICAgaWYgKHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQuYXR0cigncm9sZScpKSB7XG4gICAgICAgICAgICAgICAgc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5yZW1vdmVBdHRyKCdyb2xlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQuYXR0cigncm9sZScsICdhbGVydCcpO1xuICAgICAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBjb3VudHJpZXMsIHRoZSBzdGF0ZS9yZWdpb24gaXMgZHluYW1pY1xuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIGEgY2hlY2sgZm9yIGFsbCBmaWVsZHMgd2hlbiBjb3VudHJ5IGhhcyBhIHZhbHVlXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgYXJlQWxsKCd2YWxpZCcpIHdpbGwgY2hlY2sgY291bnRyeSBmb3IgdmFsaWRpdHlcbiAgICAgICAgICAgIGlmICgkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWApLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRVUFNSYXRlcygpO1xuICAgIH1cblxuICAgIGJpbmRWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnlJZCA9IE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudHJ5SWQgIT09IDAgJiYgIU51bWJlci5pc05hTihjb3VudHJ5SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzLmNvdW50cnksXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCAkZWxlID0gJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVWYWwgPSAkZWxlLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBlbGVWYWwgJiYgZWxlVmFsLmxlbmd0aCAmJiBlbGVWYWwgIT09ICdTdGF0ZS9wcm92aW5jZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5wcm92aW5jZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBiZXR3ZWVuIGRlZmF1bHQgc2hpcHBpbmcgYW5kIHVwcyBzaGlwcGluZyByYXRlc1xuICAgICAqL1xuICAgIGJpbmRVUFNSYXRlcygpIHtcbiAgICAgICAgY29uc3QgVVBTUmF0ZVRvZ2dsZSA9ICcuZXN0aW1hdG9yLWZvcm0tdG9nZ2xlVVBTUmF0ZSc7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsIFVQU1JhdGVUb2dnbGUsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1VcHMgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLXVwcycpO1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1EZWZhdWx0ID0gJCgnLmVzdGltYXRvci1mb3JtLS1kZWZhdWx0Jyk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRlc3RpbWF0b3JGb3JtVXBzLnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybURlZmF1bHQudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpIHtcbiAgICAgICAgbGV0ICRsYXN0O1xuXG4gICAgICAgIC8vIFJlcXVlc3RzIHRoZSBzdGF0ZXMgZm9yIGEgY291bnRyeSB3aXRoIEFKQVhcbiAgICAgICAgc3RhdGVDb3VudHJ5KHRoaXMuJHN0YXRlLCB0aGlzLmNvbnRleHQsIHsgdXNlSWRGb3JTdGF0ZXM6IHRydWUgfSwgKGVyciwgZmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBlcnIsXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmdldFN0YXR1cyh0aGlzLiRzdGF0ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUodGhpcy4kc3RhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkZmllbGQuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGZpZWxkLmF0dHIoJ3BsYWNlaG9sZGVyJywgJ1N0YXRlL3Byb3ZpbmNlJyk7XG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2hlbiB5b3UgY2hhbmdlIGEgY291bnRyeSwgeW91IHN3YXAgdGhlIHN0YXRlL3Byb3ZpbmNlIGJldHdlZW4gYW4gaW5wdXQgYW5kIGEgc2VsZWN0IGRyb3Bkb3duXG4gICAgICAgICAgICAvLyBOb3QgYWxsIGNvdW50cmllcyByZXF1aXJlIHRoZSBwcm92aW5jZSB0byBiZSBmaWxsZWRcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVtb3ZlIHRoaXMgY2xhc3Mgd2hlbiB3ZSBzd2FwIHNpbmNlIG5vZCB2YWxpZGF0aW9uIGRvZXNuJ3QgY2xlYW51cCBmb3IgdXNcbiAgICAgICAgICAgICQodGhpcy5zaGlwcGluZ0VzdGltYXRvcikuZmluZCgnLmZvcm0tZmllbGQtLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZm9ybS1maWVsZC0tc3VjY2VzcycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUodG9nZ2xlQnV0dG9uLCBidXR0b25TZWxlY3RvciwgJHRvZ2dsZUNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUgPSAoc2VsZWN0b3JUb0FjdGl2YXRlKSA9PiB7XG4gICAgICAgICAgICAkKHRvZ2dsZUJ1dHRvbikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jywgc2VsZWN0b3JUb0FjdGl2YXRlKTtcbiAgICAgICAgICAgICQoYnV0dG9uU2VsZWN0b3IpLnRleHQoJChgIyR7c2VsZWN0b3JUb0FjdGl2YXRlfWApLnRleHQoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCkge1xuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItY2xvc2UnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1hZGQnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSAhdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQ7XG4gICAgfVxuXG4gICAgYmluZEVzdGltYXRvckV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm0gPSAkKCcuZXN0aW1hdG9yLWZvcm0nKTtcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG4gICAgICAgICRlc3RpbWF0b3JGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY291bnRyeV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHN0YXRlX2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIGNpdHk6ICQoJ1tuYW1lPVwic2hpcHBpbmctY2l0eVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICB6aXBfY29kZTogJCgnW25hbWU9XCJzaGlwcGluZy16aXBcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRTaGlwcGluZ1F1b3RlcyhwYXJhbXMsICdjYXJ0L3NoaXBwaW5nLXF1b3RlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNoaXBwaW5nLXF1b3RlcycpLmh0bWwocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBiaW5kIHRoZSBzZWxlY3QgYnV0dG9uXG4gICAgICAgICAgICAgICAgJCgnLnNlbGVjdC1zaGlwcGluZy1xdW90ZScpLm9uKCdjbGljaycsIGNsaWNrRXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdW90ZUlkID0gJCgnLnNoaXBwaW5nLXF1b3RlOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjbGlja0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuc3VibWl0U2hpcHBpbmdRdW90ZShxdW90ZUlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93Jykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlKGV2ZW50LmN1cnJlbnRUYXJnZXQsICcuc2hpcHBpbmctZXN0aW1hdGUtc2hvd19fYnRuLW5hbWUnLCAkZXN0aW1hdG9yQ29udGFpbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBQcm9kdWN0RGV0YWlsc0Jhc2UsIHsgb3B0aW9uQ2hhbmdlRGVjb3JhdG9yIH0gZnJvbSAnLi9wcm9kdWN0LWRldGFpbHMtYmFzZSc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGlzQnJvd3NlcklFLCBjb252ZXJ0SW50b0FycmF5IH0gZnJvbSAnLi91dGlscy9pZS1oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydEl0ZW1EZXRhaWxzIGV4dGVuZHMgUHJvZHVjdERldGFpbHNCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGNvbnRleHQsIHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCRzY29wZSwgY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgJGZvcm0gPSAkKCcjQ2FydEVkaXRQcm9kdWN0RmllbGRzRm9ybScsIHRoaXMuJHNjb3BlKTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsICRmb3JtKTtcbiAgICAgICAgY29uc3QgaGFzT3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuaHRtbCgpLnRyaW0oKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGhhc0RlZmF1bHRPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdbZGF0YS1kZWZhdWx0XScpLmxlbmd0aDtcblxuICAgICAgICAkcHJvZHVjdE9wdGlvbnNFbGVtZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFByb2R1Y3RWYXJpYW50KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZUNhbGxiYWNrID0gb3B0aW9uQ2hhbmdlRGVjb3JhdG9yLmNhbGwodGhpcywgaGFzRGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBwcm9kdWN0IGF0dHJpYnV0ZXMuIEFsc28gdXBkYXRlIHRoZSBpbml0aWFsIHZpZXcgaW4gY2FzZSBpdGVtcyBhcmUgb29zXG4gICAgICAgIC8vIG9yIGhhdmUgZGVmYXVsdCB2YXJpYW50IHByb3BlcnRpZXMgdGhhdCBjaGFuZ2UgdGhlIHZpZXdcbiAgICAgICAgaWYgKChpc0VtcHR5KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSkgfHwgaGFzRGVmYXVsdE9wdGlvbnMpICYmIGhhc09wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IHRoaXMuY29udGV4dC5wcm9kdWN0Rm9yQ2hhbmdlSWQ7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCBvcHRpb25DaGFuZ2VDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQcm9kdWN0VmFyaWFudCgpIHtcbiAgICAgICAgY29uc3QgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyA9IFtdO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICAgICAgJC5lYWNoKCQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpLCAoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25MYWJlbCA9IHZhbHVlLmNoaWxkcmVuWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvblRpdGxlID0gb3B0aW9uTGFiZWwuc3BsaXQoJzonKVswXS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IG9wdGlvbkxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdmFsdWUuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtYXR0cmlidXRlJyk7XG5cbiAgICAgICAgICAgIGlmICgodHlwZSA9PT0gJ2lucHV0LWZpbGUnIHx8IHR5cGUgPT09ICdpbnB1dC10ZXh0JyB8fCB0eXBlID09PSAnaW5wdXQtbnVtYmVyJykgJiYgdmFsdWUucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3RleHRhcmVhJyAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NhdGlzZmllZCA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLmV2ZXJ5KChzZWxlY3QpID0+IHNlbGVjdC5zZWxlY3RlZEluZGV4ICE9PSAwKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkubWFwKCh4KSA9PiB4LnZhbHVlKS5qb2luKCctJyk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtkYXRlU3RyaW5nfWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3QgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VsZWN0LnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7c2VsZWN0Lm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0fWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3N3YXRjaCcgfHwgdHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94JyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0VmFyaWFudHNsaXN0ID0gY29udmVydEludG9BcnJheSh2YWx1ZS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0ID0gaW5wdCA9PiBpbnB0LmRhdGFzZXQucHJvZHVjdEF0dHJpYnV0ZVZhbHVlID09PSBjaGVja2VkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3RWYXJpYW50c2xpc3QuZmlsdGVyKG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQpWzBdO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmlubmVyVGV4dC50cmltKCkgOiBjaGVja2VkLmxhYmVsc1swXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N3YXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gaXNCcm93c2VySUUgPyBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsKCkuY2hpbGRyZW5bMF0gOiBjaGVja2VkLmxhYmVsc1swXS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbC50aXRsZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9Olllc2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06Tm9gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBwcm9kdWN0VmFyaWFudCA9IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMubGVuZ3RoID09PSAwID8gb3B0aW9ucy5zb3J0KCkuam9pbignLCAnKSA6ICd1bnNhdGlzZmllZCc7XG4gICAgICAgIGNvbnN0IHZpZXcgPSAkKCcubW9kYWwtaGVhZGVyLXRpdGxlJyk7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RWYXJpYW50KSB7XG4gICAgICAgICAgICBwcm9kdWN0VmFyaWFudCA9IHByb2R1Y3RWYXJpYW50ID09PSAndW5zYXRpc2ZpZWQnID8gJycgOiBwcm9kdWN0VmFyaWFudDtcbiAgICAgICAgICAgIGlmICh2aWV3LmF0dHIoJ2RhdGEtZXZlbnQtdHlwZScpKSB7XG4gICAgICAgICAgICAgICAgdmlldy5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdE5hbWUgPSB2aWV3Lmh0bWwoKS5tYXRjaCgvJyguKj8pJy8pWzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSAkKGBbZGF0YS1uYW1lPVwiJHtwcm9kdWN0TmFtZX1cIl1gKTtcbiAgICAgICAgICAgICAgICBjYXJkLmF0dHIoJ2RhdGEtcHJvZHVjdC12YXJpYW50JywgcHJvZHVjdFZhcmlhbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSBvciBtYXJrIGFzIHVuYXZhaWxhYmxlIG91dCBvZiBzdG9jayBhdHRyaWJ1dGVzIGlmIGVuYWJsZWRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgICAqL1xuICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuZmluZCgnLm1vZGFsLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnaGlkZS1jb250ZW50Jyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNlcnQpIHtcbiAgICBpZiAodHlwZW9mIGNlcnQgIT09ICdzdHJpbmcnIHx8IGNlcnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxuICAgIHJldHVybiB0cnVlO1xufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIH0gZnJvbSAnLi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcblxuLyoqXG4gKiBJZiB0aGVyZSBhcmUgbm8gb3B0aW9ucyBmcm9tIGJjYXBwLCBhIHRleHQgZmllbGQgd2lsbCBiZSBzZW50LiBUaGlzIHdpbGwgY3JlYXRlIGEgc2VsZWN0IGVsZW1lbnQgdG8gaG9sZCBvcHRpb25zIGFmdGVyIHRoZSByZW1vdGUgcmVxdWVzdC5cbiAqIEByZXR1cm5zIHtqUXVlcnl8SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZVJlcXVpcmVkKHN0YXRlRWxlbWVudCwgY29udGV4dCkge1xuICAgIGNvbnN0IGF0dHJzID0gXy50cmFuc2Zvcm0oc3RhdGVFbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSByZXN1bHQ7XG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXG4gICAgICAgIGNsYXNzOiAnZm9ybS1zZWxlY3QnLFxuICAgICAgICBuYW1lOiBhdHRycy5uYW1lLFxuICAgICAgICAnZGF0YS1maWVsZC10eXBlJzogYXR0cnNbJ2RhdGEtZmllbGQtdHlwZSddLFxuICAgIH07XG5cbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPHNlbGVjdD48L3NlbGVjdD4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG4gICAgY29uc3QgJGhpZGRlbklucHV0ID0gJCgnW25hbWUqPVwiRm9ybUZpZWxkSXNUZXh0XCJdJyk7XG5cbiAgICBpZiAoJGhpZGRlbklucHV0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAkaGlkZGVuSW5wdXQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKCRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBTdHJpbmcgaXMgaW5qZWN0ZWQgZnJvbSBsb2NhbGl6ZXJcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmFwcGVuZChgPHNtYWxsPiR7Y29udGV4dC5yZXF1aXJlZH08L3NtYWxsPmApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLnNob3coKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogSWYgYSBjb3VudHJ5IHdpdGggc3RhdGVzIGlzIHRoZSBkZWZhdWx0LCBhIHNlbGVjdCB3aWxsIGJlIHNlbnQsXG4gKiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIHN3aXRjaCB0byBhbiBpbnB1dCBmaWVsZCBhbmQgaGlkZSB0aGUgcmVxdWlyZWQgZmllbGRcbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlT3B0aW9uYWwoc3RhdGVFbGVtZW50KSB7XG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IHJlc3VsdDtcbiAgICAgICAgcmV0W2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXG4gICAgICAgIGNsYXNzOiAnZm9ybS1pbnB1dCcsXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXG4gICAgICAgICdkYXRhLWZpZWxkLXR5cGUnOiBhdHRyc1snZGF0YS1maWVsZC10eXBlJ10sXG4gICAgfTtcblxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8aW5wdXQgLz4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICBpZiAoJG5ld0VsZW1lbnQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJG5ld0VsZW1lbnQpO1xuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIEFkZHMgdGhlIGFycmF5IG9mIG9wdGlvbnMgZnJvbSB0aGUgcmVtb3RlIHJlcXVlc3QgdG8gdGhlIG5ld2x5IGNyZWF0ZWQgc2VsZWN0IGJveC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZXNBcnJheVxuICogQHBhcmFtIHtqUXVlcnl9ICRzZWxlY3RFbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBhZGRPcHRpb25zKHN0YXRlc0FycmF5LCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucykge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IFtdO1xuXG4gICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCJcIj4ke3N0YXRlc0FycmF5LnByZWZpeH08L29wdGlvbj5gKTtcblxuICAgIGlmICghXy5pc0VtcHR5KCRzZWxlY3RFbGVtZW50KSkge1xuICAgICAgICBfLmVhY2goc3RhdGVzQXJyYXkuc3RhdGVzLCAoc3RhdGVPYmopID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnVzZUlkRm9yU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLmlkfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLm5hbWV9XCI+JHtzdGF0ZU9iai5sYWJlbCA/IHN0YXRlT2JqLmxhYmVsIDogc3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNlbGVjdEVsZW1lbnQuaHRtbChjb250YWluZXIuam9pbignICcpKTtcbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7alF1ZXJ5fSBzdGF0ZUVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlRWxlbWVudCwgY29udGV4dCA9IHt9LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIC8qKlxuICAgICAqIEJhY2t3YXJkcyBjb21wYXRpYmxlIGZvciB0aHJlZSBwYXJhbWV0ZXJzIGluc3RlYWQgb2YgZm91clxuICAgICAqXG4gICAgICogQXZhaWxhYmxlIG9wdGlvbnM6XG4gICAgICpcbiAgICAgKiB1c2VJZEZvclN0YXRlcyB7Qm9vbH0gLSBHZW5lcmF0ZXMgc3RhdGVzIGRyb3Bkb3duIHVzaW5nIGlkIGZvciB2YWx1ZXMgaW5zdGVhZCBvZiBzdHJpbmdzXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgfVxuXG4gICAgJCgnc2VsZWN0W2RhdGEtZmllbGQtdHlwZT1cIkNvdW50cnlcIl0nKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XG5cbiAgICAgICAgaWYgKGNvdW50cnlOYW1lID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNvdW50cnkuZ2V0QnlOYW1lKGNvdW50cnlOYW1lLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGNvbnRleHQuc3RhdGVfZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkY3VycmVudElucHV0ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KHJlc3BvbnNlLmRhdGEuc3RhdGVzKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBlbGVtZW50IG1heSBoYXZlIGJlZW4gcmVwbGFjZWQgd2l0aCBhIHNlbGVjdCwgcmVzZWxlY3QgaXRcbiAgICAgICAgICAgICAgICBjb25zdCAkc2VsZWN0RWxlbWVudCA9IG1ha2VTdGF0ZVJlcXVpcmVkKCRjdXJyZW50SW5wdXQsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgYWRkT3B0aW9ucyhyZXNwb25zZS5kYXRhLCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgJHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gbWFrZVN0YXRlT3B0aW9uYWwoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBuZXdFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IG1ha2VPcHRpb25JZHNVbmlxdWUgZnJvbSAnLi9tYWtlLW9wdGlvbnMtdW5pcXVlJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgc3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnRQYWdlVXBzZWxsUHJvZHVjdCB7XG4gICAgY29uc3RydWN0b3IoJHNjb3BlKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmFkZENsYXNzKCdoYXNPcHRpb25zLS13aXJlZCcpO1xuXG4gICAgICAgIHRoaXMuaW5pdFJhZGlvQXR0cmlidXRlcygpO1xuXG4gICAgICAgIHRoaXMuJGZvcm0gPSAkKCdmb3JtJywgdGhpcy4kc2NvcGUpO1xuICAgICAgICB0aGlzLiRwcm9kdWN0SWQgPSAkKCdbbmFtZT1cInByb2R1Y3RfaWRcIl0nLCB0aGlzLiRmb3JtKS52YWwoKTtcblxuICAgICAgICB0aGlzLmtleSA9ICdjcHUnOyAvLyB1bmlxdWUgaW5kZW50aWZpZXIgZm9yIHRoaXMgY3VzdG9taXphdGlvblxuXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoYFtkYXRhLSR7dGhpcy5rZXl9LW9wdGlvbi1jaGFuZ2VdYCwgdGhpcy4kZm9ybSk7IC8vIGllIDxkaXYgY2xhc3M9XCJvcHRpb25zXCIgZGF0YS1jcHUtb3B0aW9uLWNoYW5nZT5cblxuICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvblZpZXcoKTtcbiAgICAgICAgLy8gdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZSh0aGlzLiRwcm9kdWN0SWQsIHRoaXMuJGZvcm0uc2VyaWFsaXplKCksICdwcm9kdWN0cy9idWxrLWRpc2NvdW50LXJhdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnN0IGF0dHJpYnV0ZXNEYXRhID0gcmVzcG9uc2UuZGF0YSB8fCB7fTtcbiAgICAgICAgLy8gICAgIGNvbnN0IGF0dHJpYnV0ZXNDb250ZW50ID0gcmVzcG9uc2UuY29udGVudCB8fCB7fTtcbiAgICAgICAgLy8gICAgIHRoaXMudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoYXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAvLyAgICAgLy8gaWYgKGhhc0RlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy51cGRhdGVWaWV3KGF0dHJpYnV0ZXNEYXRhLCBhdHRyaWJ1dGVzQ29udGVudCk7XG4gICAgICAgIC8vICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgLy8gICAgIHRoaXMudXBkYXRlRGVmYXVsdEF0dHJpYnV0ZXNGb3JPT1MoYXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAvLyAgICAgLy8gfVxuICAgICAgICAvLyB9KTtcblxuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCBcImlzUmVxdWlyZWRcIiB0byBvcHRpb25zIHRoYXQgYXJlIHJlcXVpcmVkXG4gICAgICovXG4gICAgYWRkUmVxdWlyZWRDbGFzc3RvT3B0aW9ucygpIHtcbiAgICAgICAgJCgnLmZvcm0tZmllbGQnLCB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQpLnRvQXJyYXkoKS5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoJChvcHRpb24pLmZpbmQoJ3NtYWxsOmNvbnRhaW5zKFwiUmVxdWlyZWRcIiknKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKG9wdGlvbikuYWRkQ2xhc3MoJ2lzUmVxdWlyZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIHByb2R1Y3Qgb3B0aW9ucyBjaGFuZ2VzXG4gICAgICovXG4gICAgcHJvZHVjdE9wdGlvbnNDaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRjaGFuZ2VkT3B0aW9uID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICBjb25zdCBvcHRpb25Sb3cgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50cygnLmZvcm0tZmllbGQnKTtcblxuICAgICAgICAvLyBEbyBub3QgdHJpZ2dlciBhbiBhamF4IHJlcXVlc3QgaWYgaXQncyBhIGZpbGUgb3IgaWYgdGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IEZvcm1EYXRhXG4gICAgICAgIGlmICgkY2hhbmdlZE9wdGlvbi5hdHRyKCd0eXBlJykgPT09ICdmaWxlJyB8fCB3aW5kb3cuRm9ybURhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVPcHRpb25WaWV3KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3YXMgYW4gb3B0aW9uIHdpdGggYSB2YWx1ZSBzZWxlY3RlZD9cbiAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLmlzKCdpbnB1dCcpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9ICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ3R5cGUnKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uc2libGluZ3MoJ2lucHV0JykuYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkY2hhbmdlZE9wdGlvbi5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25Sb3cuYWRkQ2xhc3MoJ2lzU2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uUm93LnJlbW92ZUNsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLnZhbCgpLmxlbmd0aCAhPT0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG9wdGlvblJvdy5yZW1vdmVDbGFzcygnaXNTZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cigndmFsdWUnLCAkY2hhbmdlZE9wdGlvbi52YWwoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCRjaGFuZ2VkT3B0aW9uLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRzZWxlY3RlZE9wdGlvbiA9ICRjaGFuZ2VkT3B0aW9uLmZpbmQoYG9wdGlvblt2YWx1ZT1cIiR7JGNoYW5nZWRPcHRpb24udmFsKCl9XCJdYCk7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGVkT3B0aW9uLmF0dHIoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGVkT3B0aW9uLnNpYmxpbmdzKCdvcHRpb24nKS5hdHRyKCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAvLyBpZiBpdCdzIGEgZGF0ZSBzZWxlY3QsIG1ha2Ugc3VyZSBhbGwgMyBzZWxlY3RzIGFyZSBmaWxsZWQgaW4gYmVmb3JlIHNheWluZyBpdCdzIGZpbGxlZCBpblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignbmFtZScpLmluZGV4T2YoJ21vbnRoJykgIT09IC0xIHx8XG4gICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ25hbWUnKS5pbmRleE9mKCdkYXknKSAhPT0gLTEgfHxcbiAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignbmFtZScpLmluZGV4T2YoJ3llYXInKSAhPT0gLTFcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY291bnQgdGhlIG90aGVyIGRhdGUgZmllbGRzIChpZiBjaGFuZ2VkIG1vbnRoLCBzZWUgaWYgZGF5IGFuZCB5ZWFyIGFyZSBmaWxsZWQgb3V0KVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlclNlbGVjdGVkRGF0ZUZpZWxkcyA9ICRjaGFuZ2VkT3B0aW9uLnNpYmxpbmdzKCdzZWxlY3QnKS50b0FycmF5KCkucmVkdWNlKChjb3VudCwgc2VsZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChzZWxlY3QpLnZhbCgpID09PSAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gY291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNvdW50ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBmaWVsZHMgYXJlIGZpbGxlZCBpblxuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJTZWxlY3RlZERhdGVGaWVsZHMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJyk7IC8vIGl0J3Mgbm90IGEgZGF0ZSBzZWxlY3QsIGp1c3QgbWFyayB0aGUgb3B0aW9uIGFzIHNlbGVjdGVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICgkY2hhbmdlZE9wdGlvbi5pcygndGV4dGFyZWEnKSkge1xuICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLnZhbCgpLmxlbmd0aCAhPT0gMFxuICAgICAgICAgICAgICAgICAgICA/IG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpXG4gICAgICAgICAgICAgICAgICAgIDogb3B0aW9uUm93LnJlbW92ZUNsYXNzKCdpc1NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24udGV4dCgkY2hhbmdlZE9wdGlvbi52YWwoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlbHNlIHJlbW92ZSBjbGFzcyAodGhlcmUgd2FzIG5vIHZhbHVlIGZvciB0aGlzIG9wdGlvbilcbiAgICAgICAgICAgIG9wdGlvblJvdy5yZW1vdmVDbGFzcygnaXNTZWxlY3RlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGVja09wdGlvbnNTZWxlY3RlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBNYWtlIEFQSSBjYWxsIG9uIG9wdGlvbiBjaGFuZ2UgdG8gdXBkYXRlIGF2YWlsYWJpbGl0eVxuICAgICAqL1xuICAgIHVwZGF0ZU9wdGlvblZpZXcoKSAge1xuICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHRoaXMuJHByb2R1Y3RJZCwgdGhpcy4kZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdEF0dHJpYnV0ZXNEYXRhID0gcmVzcG9uc2UuZGF0YSB8fCB7fTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAgICAgLy8gc3RvY2sgc3R1ZmYgKHNob3VsZCB3aXJlIHVwIGltYWdlIGNoYW5nZSBhcyB3ZWxsIGxhdGVyKVxuICAgICAgICAgICAgLy8gaWYgKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YS5zdG9jayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyAgICAgJCgnLmN1cnJlbnRTdG9jaycsICRzY29wZSkudGV4dChwcm9kdWN0QXR0cmlidXRlc0RhdGEuc3RvY2spO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAkKCcuY3VycmVudFN0b2NrJywgJHNjb3BlKS50ZXh0KCcnKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIENoZWNrIHdoZXRoZXIgYWxsIHJlcXVpcmVkIG9wdGlvbnMgYXJlIHNlbGVjdGVkXG4gICAgICovXG4gICAgY2hlY2tPcHRpb25zU2VsZWN0ZWQoKSAge1xuICAgICAgICAvKlxuICAgICAgICAjIyBzZWUgaWYgYWxsIG9wdGlvbnMgYXJlIHNlbGVjdGVkXG4gICAgICAgICovXG4gICAgICAgIGNvbnN0IG51bWJlclJlcXVpcmVkT3B0aW9ucyA9IHRoaXMuJHNjb3BlLmZpbmQoJy5mb3JtLWZpZWxkLmlzUmVxdWlyZWQnKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG51bWJlclNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuJHNjb3BlLmZpbmQoJy5mb3JtLWZpZWxkLmlzUmVxdWlyZWQuaXNTZWxlY3RlZCcpLmxlbmd0aDtcbiAgICAgICAgLy8gY29uc3QgJGFkZFRvQ2FydEJ1dHRvbiA9ICRmb3JtLmZpbmQoJy5jYXJkLWFjdGlvbnMgLmJ1dHRvbicpO1xuICAgICAgICAvLyAkYWRkVG9DYXJ0QnV0dG9uLnJlbW92ZUNsYXNzKCdidXR0b24tLXN1Y2Nlc3MnKTtcbiAgICAgICAgaWYgKG51bWJlclJlcXVpcmVkT3B0aW9ucyA9PT0gMCB8fCBudW1iZXJSZXF1aXJlZE9wdGlvbnMgPD0gbnVtYmVyU2VsZWN0ZWRPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5hZGRDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTsgLy8gYWRkIGNsYXNzIHRvIHByb2R1Y3QgZm9yIGVhc3kgYWRkaW5nIHRvIGNhcnRcbiAgICAgICAgICAgICQoJy5jcHVfX21vZGFsJykuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJyk7IC8vIHVwZGF0ZSB0ZXh0IGZvciB1c2VyIGFzIHdlbGxcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJlbW92ZUNsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpOyAvLyByZW1vdmUgY2xhc3Mgc2luY2Ugbm90IGFsbCBvcHRpb25zIGZpbGxlZCBpblxuICAgICAgICAgICAgJCgnLmNwdV9fbW9kYWwnKS5yZW1vdmVDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTsgLy8gdXBkYXRlIHRleHQgZm9yIHVzZXIgYXMgd2VsbFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHZpZXcgb2YgcHJpY2UsIG1lc3NhZ2VzLCBTS1UgYW5kIHN0b2NrIG9wdGlvbnMgd2hlbiBhIHByb2R1Y3Qgb3B0aW9uIGNoYW5nZXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgICAqXG4gICAgICovXG4gICAgdXBkYXRlUHJpY2VWaWV3KHByaWNlKSB7XG4gICAgICAgIGlmIChwcmljZS53aXRob3V0X3RheCkge1xuICAgICAgICAgICAgJChgW2RhdGEtcHJvZHVjdC1wcmljZS13aXRob3V0LXRheF1gLCB0aGlzLiRzY29wZSkuaHRtbChwcmljZS53aXRob3V0X3RheC5mb3JtYXR0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2aWV3IG9mIHByaWNlLCBtZXNzYWdlcywgU0tVIGFuZCBzdG9jayBvcHRpb25zIHdoZW4gYSBwcm9kdWN0IG9wdGlvbiBjaGFuZ2VzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVWaWV3KGRhdGEpIHtcbiAgICAgICAgLy8gdXBkYXRlIHByaWNlXG4gICAgICAgIC8vIGNvbnN0IHZpZXdNb2RlbCA9IHRoaXMuZ2V0Vmlld01vZGVsKHRoaXMuJHNjb3BlKTtcbiAgICAgICAgaWYgKF8uaXNPYmplY3QoZGF0YS5wcmljZSkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJpY2VWaWV3KGRhdGEucHJpY2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSBpbWFnZVxuICAgICAgICBjb25zdCBpbWFnZUVsID0gJChgLmNwdV9faXRlbS1pbWdgLCB0aGlzLiRzY29wZSk7XG4gICAgICAgIGlmIChfLmlzT2JqZWN0KGRhdGEuaW1hZ2UpKSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZVNyYyA9IGRhdGEuaW1hZ2UuZGF0YS5yZXBsYWNlKCd7OnNpemV9JywgJzMwMHgzMDAnKTtcbiAgICAgICAgICAgIGltYWdlRWwuYXR0cignc3JjJywgaW1hZ2VTcmMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW1hZ2VFbC5hdHRyKCdzcmMnLCBpbWFnZUVsLmRhdGEoJ3NyYycpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgbWVzc2FnZSBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgY29uc3Qgb3B0aW9uTWVzc2FnZSA9IGRhdGEuc3RvY2tfbWVzc2FnZSB8fCBkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZTtcbiAgICAgICAgaWYgKG9wdGlvbk1lc3NhZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogb3B0aW9uTWVzc2FnZSxcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS5hZGRDbGFzcygnaGFzT3B0aW9ucy0tZXJyb3InKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLnJlbW92ZUNsYXNzKCdoYXNPcHRpb25zLS1lcnJvcicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSBvciBtYXJrIGFzIHVuYXZhaWxhYmxlIG91dCBvZiBzdG9jayBhdHRyaWJ1dGVzIGlmIGVuYWJsZWRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgICAqL1xuICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgY29uc3QgYmVoYXZpb3IgPSBkYXRhLm91dF9vZl9zdG9ja19iZWhhdmlvcjtcbiAgICAgICAgY29uc3QgaW5TdG9ja0lkcyA9IGRhdGEuaW5fc3RvY2tfYXR0cmlidXRlcztcbiAgICAgICAgY29uc3Qgb3V0T2ZTdG9ja01lc3NhZ2UgPSBgICgke2RhdGEub3V0X29mX3N0b2NrX21lc3NhZ2V9KWA7XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yICE9PSAnaGlkZV9vcHRpb24nICYmIGJlaGF2aW9yICE9PSAnbGFiZWxfb3B0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGUtdmFsdWVdJywgdGhpcy4kc2NvcGUuYWRkKCcuY3B1X19tb2RhbCcpKS5lYWNoKChpLCBhdHRyaWJ1dGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRhdHRyaWJ1dGUgPSAkKGF0dHJpYnV0ZSk7XG4gICAgICAgICAgICBjb25zdCBhdHRySWQgPSBwYXJzZUludCgkYXR0cmlidXRlLmRhdGEoJ3Byb2R1Y3QtYXR0cmlidXRlLXZhbHVlJyksIDEwKTtcblxuICAgICAgICAgICAgaWYgKGluU3RvY2tJZHMuaW5kZXhPZihhdHRySWQpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNhYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGVUeXBlKCRhdHRyaWJ1dGUpID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmVoYXZpb3IgPT09ICdoaWRlX29wdGlvbicpIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygndW5hdmFpbGFibGUnKVxuICAgICAgICAgICAgICAgIC5wcmV2KCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSkge1xuICAgICAgICBjb25zdCAkc2VsZWN0ID0gJGF0dHJpYnV0ZS5wYXJlbnQoKTtcblxuICAgICAgICBpZiAoYmVoYXZpb3IgPT09ICdoaWRlX29wdGlvbicpIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUudG9nZ2xlT3B0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBhdHRyaWJ1dGUgaXMgdGhlIHNlbGVjdGVkIG9wdGlvbiBpbiBhIHNlbGVjdCBkcm9wZG93biwgc2VsZWN0IHRoZSBmaXJzdCBvcHRpb24gKE1FUkMtNjM5KVxuICAgICAgICAgICAgaWYgKCRhdHRyaWJ1dGUucGFyZW50KCkudmFsKCkgPT09ICRhdHRyaWJ1dGUuYXR0cigndmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICRzZWxlY3RbMF0uc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmh0bWwoJGF0dHJpYnV0ZS5odG1sKCkucmVwbGFjZShvdXRPZlN0b2NrTWVzc2FnZSwgJycpICsgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5hYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGVUeXBlKCRhdHRyaWJ1dGUpID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3VuYXZhaWxhYmxlJylcbiAgICAgICAgICAgICAgICAucHJldignaW5wdXQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnRvZ2dsZU9wdGlvbih0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuaHRtbCgkYXR0cmlidXRlLmh0bWwoKS5yZXBsYWNlKG91dE9mU3RvY2tNZXNzYWdlLCAnJykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSB7XG4gICAgICAgIGNvbnN0ICRwYXJlbnQgPSAkYXR0cmlidXRlLmNsb3Nlc3QoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpO1xuICAgICAgICByZXR1cm4gJHBhcmVudCA/ICRwYXJlbnQuZGF0YSgncHJvZHVjdC1hdHRyaWJ1dGUnKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3cgcmFkaW8gYnV0dG9ucyB0byBnZXQgZGVzZWxlY3RlZFxuICAgICAqL1xuICAgIGluaXRSYWRpb0F0dHJpYnV0ZXMoKSB7XG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXSBpbnB1dFt0eXBlPVwicmFkaW9cIl0nLCB0aGlzLiRzY29wZSkuZWFjaCgoaSwgcmFkaW8pID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRyYWRpbyA9ICQocmFkaW8pO1xuXG4gICAgICAgICAgICAvLyBPbmx5IGJpbmQgdG8gY2xpY2sgb25jZVxuICAgICAgICAgICAgaWYgKCRyYWRpby5hdHRyKCdkYXRhLXN0YXRlJykgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICRyYWRpby5jbGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkcmFkaW8uZGF0YSgnc3RhdGUnKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJhZGlvLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW8uZGF0YSgnc3RhdGUnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpby5jaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpby5kYXRhKCdzdGF0ZScsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UmFkaW9BdHRyaWJ1dGVzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRyYWRpby5hdHRyKCdkYXRhLXN0YXRlJywgJHJhZGlvLnByb3AoJ2NoZWNrZWQnKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJpbmQgZXZlbnRzXG4gICAgICovXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgbWFrZU9wdGlvbklkc1VuaXF1ZSh0aGlzLiRzY29wZSwgdGhpcy4kcHJvZHVjdElkLCB0aGlzLmtleSk7IC8vIG1ha2Ugb3B0aW9ucyB1bmlxdWUgc28gdGhlcmUgYWVyIG5vIGNvbmZsaWN0cyB3aGVuIHNlbGVjdGluZyBvcHRpb25zXG5cbiAgICAgICAgdGhpcy5hZGRSZXF1aXJlZENsYXNzdG9PcHRpb25zKCk7IC8vIGFkZCBcImlzUmVxdWlyZWRcIiB0byByZXF1aXJlZCBvcHRpb25zXG4gICAgICAgIHRoaXMuY2hlY2tPcHRpb25zU2VsZWN0ZWQoKTtcblxuICAgICAgICAvLyBsaXN0ZW4gZm9yIG9wdGlvbiBjaGFuZ2VzXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5jaGFuZ2UoZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0T3B0aW9uc0NoYW5nZWQoZXZlbnQsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuc2hvdygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBvcHRpb25zIHNlbGVjdGVkIG9uIGxvYWRcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHNlbGVjdGVkIGNoZWNrYm94IG9wdGlvbnMgdG8gdXBkYXRlIHN0YXJ0aW5nIGNoZWNrYm94IHZhbHVlc1xuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCByYWRpbyBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyByYWRpbyBidXR0b25zIHZhbHVlc1xuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciB1cGRhdGUgb24gaW5wdXQgdGV4dCB0byBjYXRjaCBhbnkgZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciB1cGRhdGUgb24gaW5wdXQgbnVtYmVycyB0byBjYXRjaCBhbnkgZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ3RleHRhcmVhJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIHRleHRhcmVhIHRwIGNhdGNoIGFueSBkZWZhdWx0IHZhbHVlc1xuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykucGFyZW50KCkudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgc2VsZWN0ZWQgb3B0aW9ucyB0byB1cGRhdGUgc3RhcnRpbmcgc2VsZWN0IGJveCB2YWx1ZXNcbiAgICB9XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHN3YWwgZnJvbSAnc3dlZXRhbGVydDInO1xuaW1wb3J0IENhcnRQYWdlVXBzZWxsUHJvZHVjdCBmcm9tICcuL2NhcnQtcGFnZS11cHNlbGwtcHJvZHVjdC1kZXRhaWxzJztcbmltcG9ydCBtYWtlT3B0aW9uSWRzVW5pcXVlIGZyb20gJy4vbWFrZS1vcHRpb25zLXVuaXF1ZSc7XG5pbXBvcnQgZm9ybWF0Q2Fyb3VzZWwgZnJvbSAnLi4vY29tbW9uL2Nhcm91c2VsL2luZGV4JztcbmltcG9ydCB1cHNlbGxTdWl0ZUNQVSBmcm9tICcuL3Vwc2VsbC1hcnJheS1jYXJ0LXBhZ2UnO1xuXG5pbXBvcnQgbWVkaWFRdWVyeUxpc3RGYWN0b3J5IGZyb20gJy4uL2NvbW1vbi9tZWRpYS1xdWVyeS1saXN0JztcblxuLy8gIEFwciAyMDE5OiB1cGRhdGVkIHZlcnNpb24gaW5jbHVkZXMgSVRTIFVwc2VsbCBTdWl0ZVxuY29uc3QgVkVSU0lPTiA9ICcyLjAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0UGFnZVVwc2VsbCB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBjb25zb2xlLmxvZygnSW50dWl0U29sdXRpb25zLm5ldCAtIENhcnQgUGFnZSBVcHNlbGwnLCBWRVJTSU9OKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogb3B0aW9ucyA9ICdyZWxhdGVkJywgJ3NpbWlsYXInLCAnY3VzdG9tIGZpZWxkcydcbiAgICAgICAgICogZXJyb3JEZWZhdWx0ID0gYmFja3VwIG1vZGU7IG9ubHkgbmVjZXNzYXJ5IHdpdGggVXBzZWxsIFN1aXRlXG4gICAgICAgICAqIC0tIHJlbGF0ZWQgPSBhdXRvbWF0aWNhbGx5IGxvYWRzIHJlbGF0ZWQgcHJvZHVjdHMgZnJvbSBhIHJhbmRvbSBpdGVtIGluIHRoZSBjYXJ0XG4gICAgICAgICAqIC0tIHNpbWlsYXIgPSBhdXRvbWF0aWNhbGx5IGxvYWRzIHNpbWlsYXIgYnkgdmlldyBwcm9kdWN0cyBmcm9tIGEgcmFuZG9tIGl0ZW0gaW4gdGhlIGNhcnRcbiAgICAgICAgICogLS0gY3VzdG9tIGZpZWxkcyA9IHdpbGwgbG9hZCB0aGUgcHJvZHVjdHMgc3BlY2lmaWVkIGJ5IHRoZSBjYXJ0IGl0ZW0ncyBjdXN0b20gZmllbGRzXG4gICAgICAgICAqIC0tIHVwc2VsbCBzdWl0ZSA9IHdpbGwgbG9hZCBwcm9kdWN0cyBzcGVjaWZpZWQgYnkgVXBzZWxsIFN1aXRlIENTVnNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW9kZSA9ICd1cHNlbGwgc3VpdGUnO1xuICAgICAgICB0aGlzLmVycm9yRGVmYXVsdCA9ICdyZWxhdGVkJztcbiAgICAgICAgdGhpcy5zaG93TW9iaWxlSW5DYXJvdXNlbCA9IHRydWU7XG4gICAgICAgIHRoaXMucHJvZHVjdExpbWl0ID0gMztcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSAkKCcjY3B1IC5sb2FkaW5nT3ZlcmxheScpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQgPSB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkLmJpbmQodXRpbHMuYXBpLnByb2R1Y3QpOyAvLyByZXF1aXJlZCB0byBrZWVwIHNjb3BlIG9mIHV0aWxzIHRvIHRoZSB1dGlsc1xuICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSA9IHV0aWxzLmFwaS5nZXRQYWdlLmJpbmQodXRpbHMuYXBpKTsgLy8gcmVxdWlyZWQgdG8ga2VlcCBzY29wZSBvZiB1dGlscyB0byB0aGUgdXRpbHNcblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgZHVwbGljYXRlIGl0ZW1zIGZyb20gYXJyYXlcbiAgICAgKlxuICAgICAqIHB1bGxlZCBmcm9tIHN0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MjI5NjQ1L3JlbW92ZS1kdXBsaWNhdGUtdmFsdWVzLWZyb20tanMtYXJyYXlcbiAgICAgKiBAcGFyYW0ge2FycmF5fSB1cHNlbGxUYXJnZXRzIC0gYXJyYXkgb2YgaXRlbXMgd2Ugd2FudCB0byBzdHJpcCBvdXQgYW55IGR1cGxpY2F0ZSBpdGVtcyBmcm9tXG4gICAgICovXG4gICAgcmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyh1cHNlbGxUYXJnZXRzKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQodXBzZWxsVGFyZ2V0cykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCBjYXJ0IGl0ZW1zIFVSTHMgYW5kIFByb2R1Y3QgSWRzIHNvIHdlIGRvbid0IHRyeSB0byB1cHNlbGwgYW4gaXRlbSB0aGF0J3MgYWxyZWFkeSBpbiB0aGUgY2FydFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHVwc2VsbFRhcmdldHMgLSBhcnJheSBvZiBpdGVtcyB3ZSB3YW50IHRvIHN0cmlwIG91dCBhbnkgY2FydCBpdGVtIG1hdGNoZXMgZnJvbVxuICAgICAqL1xuICAgIHJlbW92ZUNhcnRJdGVtVGFyZ2V0cyh1cHNlbGxUYXJnZXRzKSB7XG4gICAgICAgIC8vIGdldCBhbGwgZGF0YSBmcm9tIHRoZSBjYXJ0IGl0ZW1zXG4gICAgICAgIGNvbnN0IGNhcnRJdGVtRGF0YSA9IFtdO1xuICAgICAgICAkKCdbZGF0YS11cHNlbGxdJykudG9BcnJheSgpLmZvckVhY2goY2FydEl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdHVybCA9ICQoY2FydEl0ZW0pLmRhdGEoJ3Byb2R1Y3QtdXJsJykucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ub3JpZ2luLCAnJykgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKGNhcnRJdGVtKS5kYXRhKCdwcm9kdWN0LWlkJykudG9TdHJpbmcoKSB8fCAnJztcbiAgICAgICAgICAgIGNhcnRJdGVtRGF0YS5wdXNoKHByb2R1Y3R1cmwsIHByb2R1Y3RJZCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBvbmx5IGtlZXAgdXBzZWxsIGl0ZW1zIHRoYXQgYXJlbid0IHdpdGhpbiBvdXIgY2FydEl0ZW1EYXRhIGFycmF5XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHVwc2VsbFRhcmdldHMucmVkdWNlKCh1cHNlbGxJdGVtcywgdXBzZWxsaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhcnRJdGVtRGF0YS5pbmRleE9mKHVwc2VsbGl0ZW0pID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwc2VsbEl0ZW1zLnB1c2godXBzZWxsaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXBzZWxsSXRlbXM7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgLy8gcmV0dXJuIHJlc3VsdFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCByYW5kb20gaW50IGdpdmVuIGEgbWF4XG4gICAgICovXG4gICAgZ2V0UmFuZG9tSW50KG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcihtYXgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhdXRvbWF0aWNhbGx5IGxvYWQgcHJvZHVjdHMgZnJvbSB0aGUgY2FydCBpdGVtJ3MgZWl0aGVyIHJlbGF0ZWQgcHJvZHVjdHMgb3Igc2ltaWxhciBieSB2aWV3IGl0ZW1zXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBcInJlbGF0ZWRcIiBvciBcInNpbWlsYXJcIlxuICAgICAqL1xuICAgIGxvYWRBdXRvVGFyZ2V0cyh0eXBlKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMuZ2V0UmFuZG9tSW50KCQoJy5jYXJ0LWl0ZW0nKS5sZW5ndGgpOyAvLyBnZXQgcmFuZG9tIGl0ZW0gaW5kZXggKHBpY2sgcmFuZG9tIGl0ZW0pXG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoJy5jYXJ0LWl0ZW0nKS5lcShpdGVtSW5kZXggfHwgMCkuZGF0YSgncHJvZHVjdC1pZCcpOyAvLyBnZXQgcHJvZHVjdCBpZCBvZiB0aGF0IHJhbmRvbSBpdGVtXG4gICAgICAgIGlmIChpdGVtSWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gJCgnI2NwdScpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZWUgaWYgd2UgYWxyZWFkeSBhamF4J2QgZm9yIHRoZXNlIHVwc2VsbCBpdGVtc1xuICAgICAgICBsZXQgc3RvcmVkRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGNwdV9faXRlbXMke2l0ZW1JZH1gKSkgfHwgW107XG4gICAgICAgIGlmIChzdG9yZWREYXRhLmxlbmd0aCkgeyAvLyBpZiBhbHJlYWR5IGFqYXhlZCBhbmQgc3RvcmVkIHVwc2VsbCBpdGVtc1xuICAgICAgICAgICAgc3RvcmVkRGF0YSA9IHRoaXMucmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyhzdG9yZWREYXRhKTsgLy8gcmVtb3ZlIGR1cGxpY2F0ZSB1cHNlbGwgdGFyZ2V0c1xuICAgICAgICAgICAgc3RvcmVkRGF0YSA9IHRoaXMucmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHN0b3JlZERhdGEpOyAvLyByZW1vdmUgYW55IHVwc2VsbCB0YXJnZXRzIHRoYXQgbWF0Y2ggYW4gaXRlbSBhbHJlYWR5IGluIHRoZSBjYXJ0XG4gICAgICAgICAgICB0aGlzLmxvYWRVcHNlbGxUYXJnZXRzKHN0b3JlZERhdGEpOyAvLyBsb2FkIHRob3NlIHN0b3JlZCB1cHNlbGwgaXRlbXNcbiAgICAgICAgfSBlbHNlIHsgLy8gb3RoZXJ3aXNlXG4gICAgICAgICAgICBjb25zdCBvcHRzID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwtdGFyZ2V0cy0tJHt0eXBlfWAsXG4gICAgICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRfcHJvZHVjdHM6IHsgbGltaXQ6IDcwLCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2ltaWxhcl9ieV92aWV3czogeyBsaW1pdDogNzAsIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQoaXRlbUlkLCBvcHRzLCAoZXJyLCByZXMpID0+IHsgLy8gYWpheCBmb3IgdGhlIGZpcnN0IGl0ZW0ncyB1cHNlbGwgaXRlbXMgKHN1Z2dlc3RlZCBwcm9kdWN0cylcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKCcjY3B1JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IEpTT04ucGFyc2UocmVzKSB8fCBbXTtcbiAgICAgICAgICAgICAgICB0YXJnZXRzID0gdGhpcy5yZW1vdmVEdXBsaWNhdGVUYXJnZXRzKHRhcmdldHMpOyAvLyByZW1vdmUgZHVwbGljYXRlIHVwc2VsbCB0YXJnZXRzXG4gICAgICAgICAgICAgICAgdGFyZ2V0cyA9IHRoaXMucmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHRhcmdldHMpOyAvLyByZW1vdmUgYW55IHVwc2VsbCB0YXJnZXRzIHRoYXQgbWF0Y2ggYW4gaXRlbSBhbHJlYWR5IGluIHRoZSBjYXJ0XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGNwdV9faXRlbXMke2l0ZW1JZH1gLCBKU09OLnN0cmluZ2lmeSh0YXJnZXRzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkVXBzZWxsVGFyZ2V0cyh0YXJnZXRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhcnJheSBvZiB1cHNlbGwgcHJvZHVjdCBVUkxzIGFuZC9vciBJRHNcbiAgICAgKi9cbiAgICBsb2FkQ3VzdG9tRmllbGRUYXJnZXRzKCkge1xuICAgICAgICBsZXQgdGFyZ2V0cyA9IFtdO1xuICAgICAgICAkKCdbZGF0YS11cHNlbGxdJykudG9BcnJheSgpLmZvckVhY2goY2FydEl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgdXBzZWxsSXRlbXMgPSAkKGNhcnRJdGVtKS5kYXRhKCd1cHNlbGwnKTtcbiAgICAgICAgICAgIGlmICh1cHNlbGxJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB1cHNlbGxJdGVtc1xuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJywnKVxuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaCh1cHNlbGxJdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cHNlbGxJdGVtLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHMucHVzaCh1cHNlbGxJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBpZiBtb2RlIGlzIHNldCB0byBjdXN0b20gZmllbGRzIGJ1dCBubyBpdGVtcyBoYXZlIGN1c3RvbSBmaWVsZHMgYXBwbGllZCwgZGVmYXVsdCB0byB1c2luZyByZWxhdGVkIHByb2R1Y3RzXG4gICAgICAgIGlmICh0YXJnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZEF1dG9UYXJnZXRzKCdyZWxhdGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0cyA9IHRoaXMucmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyh0YXJnZXRzKTsgLy8gcmVtb3ZlIGR1cGxpY2F0ZSB1cHNlbGwgdGFyZ2V0c1xuICAgICAgICB0YXJnZXRzID0gdGhpcy5yZW1vdmVDYXJ0SXRlbVRhcmdldHModGFyZ2V0cyk7IC8vIHJlbW92ZSBhbnkgdXBzZWxsIHRhcmdldHMgdGhhdCBtYXRjaCBhbiBpdGVtIGFscmVhZHkgaW4gdGhlIGNhcnRcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZFVwc2VsbFRhcmdldHModGFyZ2V0cyk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZENTVlRhcmdldHMgKCkgICAge1xuICAgICAgICAvLyAgZ2V0IHRoZSBwcmV2aW91c2x5IEFKQVhlZCBwcm9kdWN0cyBmcm9tIHNlc3Npb25TdG9yYWdlXG4gICAgICAgIGNvbnN0IGNwdUhUTUx0ZXh0ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImNwdUNhcmRzXCIpO1xuICAgICAgICBjb25zdCBjcHVIVE1MID0gdXBzZWxsU3VpdGVDUFUucGFyc2VBcnJheUZyb21TdHJpbmcoY3B1SFRNTHRleHQpO1xuXG4gICAgICAgIC8vICBpZiBub3RoaW5nIGhhcyBiZWVuIGRvd25sb2FkZWQsXG4gICAgICAgIC8vICByZXZlcnQgdG8gYmFja3VwIG1vZGVcbiAgICAgICAgaWYgKCFjcHVIVE1MLmxlbmd0aCkgcmV0dXJuIHRoaXMubG9hZEF1dG9UYXJnZXRzKHRoaXMuZXJyb3JEZWZhdWx0KTtcblxuICAgICAgICAvLyAgZGlzcGxheSB0aGUgcHJldmlvdWx5IGRvd25sb2FkZWQgcHJvZHVjdHNcbiAgICAgICAgY3B1SFRNTC5mb3JFYWNoKGNhcmQgPT4gJCgnI2NwdSAuY3B1X19saXN0LS1jdXN0b21maWVsZHMnKS5hcHBlbmQoY2FyZC5odG1sKSlcblxuICAgICAgICAvLyAgaWYgdGhlcmUgaXMgcm9vbSBmb3IgbW9yZSBwcm9kdWN0cyxcbiAgICAgICAgLy8gIGZpbGwgdGhlIHJlc3Qgb2YgdGhlIGFkZC1vbiBieVxuICAgICAgICAvLyAgYWRkaW5nIHByb2R1Y3RzIGZyb20gdGhlIENTVnNcbiAgICAgICAgLy8gIG9mIHByb2R1Y3RzIGFscmVhZHkgaW4gdGhlIENQVVxuICAgICAgICBsZXQgcmVtYWluaW5nU2xvdHMgPSB0aGlzLnByb2R1Y3RMaW1pdCAtIGNwdUhUTUwubGVuZ3RoO1xuICAgICAgICBpZiAocmVtYWluaW5nU2xvdHMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldHMgPSBhd2FpdCB1cHNlbGxTdWl0ZUNQVS5nZXRBZGRpdGlvbmFsUHJvZHVjdHMoY3B1SFRNTC5tYXAocHJvZHVjdCA9PiBwcm9kdWN0LnByb2R1Y3RfaWQpLCByZW1haW5pbmdTbG90cyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZFVwc2VsbFRhcmdldHModGFyZ2V0cyk7XG4gICAgICAgICAgICB9ICAgY2F0Y2goZXJyKSAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDUFUgcGFyc2UgZXJyb3I6IFwiLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseVVwc2VsbEhhbmRsZXJzKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmcuaGlkZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGhhbmRsZSBhZGRpbmcgaXRlbXMgdG8gY2FydFxuICAgICAqL1xuICAgIGFkZFRvQ2FydChldmVudCkge1xuICAgICAgICBjb25zdCBwcm9kdWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCcuY3B1X19pdGVtJyk7XG4gICAgICAgIHByb2R1Y3QucmVtb3ZlQ2xhc3MoJ2hhc0Vycm9yJyk7IC8vIHJlbW92ZSBhbnkgZXJyb3IgaGlnaGxpZ2h0aW5nXG4gICAgICAgIC8vIG1ha2Ugc3VyZSBhbGwgb3B0aW9ucyBhcmUgc2VsZWN0ZWRcbiAgICAgICAgaWYgKHByb2R1Y3QuaGFzQ2xhc3MoJ2hhc09wdGlvbnMnKSAmJiAhcHJvZHVjdC5oYXNDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgcHJvZHVjdC5oYXNDbGFzcygnaGFzT3B0aW9ucy0td2lyZWQnKVxuICAgICAgICAgICAgICAgID8gJCgnLnFhYXR4X19vcHRpb25zJywgcHJvZHVjdCkuc2xpZGVEb3duKCkgLy8gaWYgb3B0aW9ucyBsb2FkZWQsIGp1c3Qgc2hvdyB0aGVtXG4gICAgICAgICAgICAgICAgOiB0aGlzLnRvZ2dsZU9wdGlvbnMoZXZlbnQpOyAvLyBvcHRpb25zIGFyZW4ndCBsb2FkZWQsIGxvYWQgdGhlbSArIHNob3cgdGhlbVxuICAgICAgICAgICAgcHJvZHVjdC5hZGRDbGFzcygnaGFzRXJyb3InKTtcbiAgICAgICAgICAgICQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykucmVtb3ZlQ2xhc3MoJ2lzQmVpbmdBZGRlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1BsZWFzZSBtYWtlIHN1cmUgYWxsIHJlcXVpcmVkIG9wdGlvbnMgaGF2ZSBiZWVuIHNlbGVjdGVkJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWN0dWFsbHkgYWRkIHRvIGNhcnRcbiAgICAgICAgdGhpcy5sb2FkaW5nLnNob3coKTtcbiAgICAgICAgY29uc3QgZm9ybSA9ICQoJy5jcHVfX2l0ZW0tZm9ybScsIHByb2R1Y3QpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtQWRkKG5ldyBGb3JtRGF0YShmb3JtWzBdKSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVyciB8fCByZXNwb25zZS5kYXRhLmVycm9yOyAvLyB0YWtlIG5vdGUgb2YgZXJyb3JzXG4gICAgICAgICAgICBpZiAoZXJyb3JNZXNzYWdlKSB7IC8vIEd1YXJkIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIC8vIFN0cmlwIHRoZSBIVE1MIGZyb20gdGhlIGVycm9yIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgICAgICAgICB0bXAuaW5uZXJIVE1MID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgcHJvZHVjdC5hZGRDbGFzcygnaGFzRXJyb3InKTsgLy8gaGlnaGxnaWhodCBlcnJvciBpdGVtXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JPZmZzZXQgPSBwcm9kdWN0Lm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogKGVycm9yT2Zmc2V0IC0gMjApIH0sIDcwMCk7IC8vIHNjcm9sbCB1c2VyIHRvIHRoZSBlcnJvciBwcm9kdWN0XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGNsYXNzIGZyb20gb3VyICdxdWVkXCIgaXRlbXNcbiAgICAgICAgICAgICAgICAkKCcuY3B1X19pdGVtLmlzQmVpbmdBZGRlZCcpLnJlbW92ZUNsYXNzKCdpc0JlaW5nQWRkZWQnKTtcbiAgICAgICAgICAgICAgICAvLyBhbGVydCB1c2VyIG9mIGVycm9yXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0LFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgICAgIC8vIHByb2R1Y3QuYWRkQ2xhc3MoJ3dhc0FkZGVkJyk7XG4gICAgICAgICAgICAvLyAkKCcuY3B1X19pdGVtLWJ1dHRvbicsIHByb2R1Y3QpLnRleHQoJ0FkZGVkIHRvIENhcnQnKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2NwdS1yZWZyZXNoLWNhcnQtY29udGVudCcpO1xuICAgICAgICAgICAgLy8gaWYgKHByb2R1Y3QuaGFzQ2xhc3MoJ2lzQmVpbmdBZGRlZCcpKSB7XG4gICAgICAgICAgICAvLyAgICAgcHJvZHVjdC5yZW1vdmVDbGFzcygnaXNCZWluZ0FkZGVkJyk7XG4gICAgICAgICAgICAvLyAgICAgKCQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykgJiYgJCgnLmNwdV9faXRlbS5pc0JlaW5nQWRkZWQnKS5sZW5ndGgpXG4gICAgICAgICAgICAvLyAgICAgICAgID8gJCgnLmNwdV9faXRlbS5pc0JlaW5nQWRkZWQnKS5lcSgwKS5maW5kKCcucWFhdGNfX2FkZHRvY2FydCcpLnRyaWdnZXIoJ2NsaWNrJykgLy8gdHJpZ2dlciBzdWJtaXR0aW5nIG5leHQgcHJvZHVjdCB0byB0aGUgY2FydFxuICAgICAgICAgICAgLy8gICAgICAgICA6IHdpbmRvdy5sb2NhdGlvbiA9ICcvY2FydC5waHAnO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB3aGVuIG1vZGFsIG9wdGlvbiBjaGFuZ2VkIHdlIG5lZWQgdG8gc3luYyB0aGUgXCJyZWFsXCIgZm9ybS4gU3luYyBvcHRpb25zIHNlbGVjdGVkIGluIHNjb3BlMSB3aXRoIHNjb3BlMlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9kdWN0SWRcbiAgICAgKi9cbiAgICBzeW5jRm9ybU9wdGlvbihldmVudCwgcHJvZHVjdElkKSB7XG4gICAgICAgIGNvbnN0IG9wdCA9ICQoZXZlbnQudGFyZ2V0KS5wYXJlbnRzKCcuZm9ybS1maWVsZCcpO1xuICAgICAgICBjb25zdCB0eXBlID0gJChvcHQpLmRhdGEoJ3Byb2R1Y3QtYXR0cmlidXRlJyk7XG4gICAgICAgIGxldCB0YXJnZXQgPSBudWxsO1xuICAgICAgICBsZXQgdGFyZ2V0SWQgPSBudWxsO1xuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2lucHV0LWNoZWNrYm94JzpcbiAgICAgICAgICAgIGNhc2UgJ3NldC1yZWN0YW5nbGUnOlxuICAgICAgICAgICAgY2FzZSAnc2V0LXJhZGlvJzpcbiAgICAgICAgICAgIGNhc2UgJ3Byb2R1Y3QtbGlzdCc6XG4gICAgICAgICAgICBjYXNlICdzd2F0Y2gnOlxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICQoJ2lucHV0OmNoZWNrZWQnLCBvcHQpO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IHRhcmdldC5wcm9wKCdpZCcpLnJlcGxhY2UoYF8ke3Byb2R1Y3RJZH1gLCAnJykucmVwbGFjZSgnbW9kYWxfJywgJycpO1xuICAgICAgICAgICAgICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICQoYCMke3RhcmdldElkfWApLnNpYmxpbmdzKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSAkKGV2ZW50LnRhcmdldCkucHJvcCgnaWQnKS5yZXBsYWNlKGBfJHtwcm9kdWN0SWR9YCwgJycpLnJlcGxhY2UoJ21vZGFsXycsICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzZXQtc2VsZWN0JzpcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAkKCcuZm9ybS1zZWxlY3QnLCBvcHQpO1xuICAgICAgICAgICAgICAgIHRhcmdldElkID0gdGFyZ2V0LnByb3AoJ2lkJykucmVwbGFjZShgXyR7cHJvZHVjdElkfWAsICcnKS5yZXBsYWNlKCdtb2RhbF8nLCAnJyk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0YXJnZXQudmFsKCk7XG4gICAgICAgICAgICAgICAgJChgIyR7dGFyZ2V0SWR9YCkudmFsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2lucHV0LXRleHQnOlxuICAgICAgICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICQoJy5mb3JtLWlucHV0Jywgb3B0KTtcbiAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IHRhcmdldC5wcm9wKCdpZCcpLnJlcGxhY2UoYF8ke3Byb2R1Y3RJZH1gLCAnJykucmVwbGFjZSgnbW9kYWxfJywgJycpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGFyZ2V0LnZhbCgpO1xuICAgICAgICAgICAgICAgICQoYCMke3RhcmdldElkfWApLnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9yY2UgdXBkYXRlIG9uIHRoZSBcInJlYWxcIiBmb3JtXG4gICAgICAgICQoYCMke3RhcmdldElkfWApLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCB0byBjYXJ0IGZyb20gbW9kYWxcbiAgICAgKi9cbiAgICBhZGRUb0NhcnRGcm9tTW9kYWwobW9kYWxDb250ZW50LCBwcm9kdWN0KSB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gbW9kYWxDb250ZW50LnBhcmVudHMoJy5jcHVfX21vZGFsJyk7XG4gICAgICAgIGlmICghbW9kYWwuaGFzQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJykpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6ICdQbGVhc2UgbWFrZSBzdXJlIGFsbCByZXF1aXJlZCBvcHRpb25zIGhhdmUgYmVlbiBzZWxlY3RlZCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1vcHRpb25zJywgcHJvZHVjdCkudHJpZ2dlcignY2xpY2snKTsgLy8gc2hvdyBvcHRpb25zIGFnYWluIGlmIHRyaWVkIGFkZGluZyB0byBjYXJ0IGJlZm9yZSBzZWxlY3RpbmcgYWxsIG9wdGlvbnNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24tLWFkZHRvY2FydCcsIHByb2R1Y3QpLnRyaWdnZXIoJ2NsaWNrJyk7IC8vIHRyaWdnZXIgYWRkIHRvIGNhcnQgYnV0dG9uIGNsaWNrIG9uIG1haW4gcHJvZHVjdFxuICAgICAgICBzd2FsLmNsb3NlKCk7IC8vIGNsb3NlIG1vZGFsXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2hvdyBhbmQgbG9hZCBpZiBuZWVkZWQgdGhpcyBwcm9kdWN0J3Mgb3B0aW9uc1xuICAgICAqL1xuICAgIHNob3dPcHRpb25zKGUpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9ICQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCcuY3B1X19pdGVtJyk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAkKCcuY3B1X19pdGVtLW5hbWUnLCBwcm9kdWN0KS50ZXh0KCk7XG4gICAgICAgIGNvbnN0IG9wdGlvbk1hcmt1cCA9ICQoJy5jcHVfX2l0ZW0tb3B0aW9ucycsIHByb2R1Y3QpLmh0bWwoKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgcHJvZHVjdCkudmFsKCk7XG5cbiAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgIHRpdGxlOiBgT3B0aW9ucyBmb3IgJHtuYW1lfWAsXG4gICAgICAgICAgICBodG1sOiBvcHRpb25NYXJrdXAsXG4gICAgICAgICAgICBjdXN0b21DbGFzczogJ2NwdV9fbW9kYWwnLFxuICAgICAgICAgICAgc2hvd0Nsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgb25PcGVuOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gc2luY2UgdGhlIG1vZGEgbEhUTUwgaXMgY2xvbmVkIGl0IGRvZXNuJ3QgaGF2ZSBhbnkgaGFuZGxlcnMgYXBwbGllZCB0byBpdC4gVGhpcyBoYW5kbGVzIHRoZSBcImZha2VcIiBjbG9uZWQgb3B0aW9ucyB0byB1cGRhdGUgdGhlIFwicmVhbFwiIG9wdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbENvbnRlbnQgPSAkKHN3YWwuZ2V0Q29udGVudCgpKTtcbiAgICAgICAgICAgICAgICBtYWtlT3B0aW9uSWRzVW5pcXVlKG1vZGFsQ29udGVudCwgcHJvZHVjdElkLCAnbW9kYWwnKTtcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmNoYW5nZShldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY0Zvcm1PcHRpb24oZXZlbnQsIHByb2R1Y3RJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBkZWZhdWx0IHNlbGVjdGVkIG9wdGlvbnMgdW5sZXNzIHRoZXJlJ3MgYW4gZXJyb3IuLiB0aGVuIHdlJ2xsIGdldCBzdHVjayBpbiBhIGxvb3BcbiAgICAgICAgICAgICAgICBpZiAoIXByb2R1Y3QuaGFzQ2xhc3MoJ2hhc09wdGlvbnMtLWVycm9yJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCBjaGVja2JveCBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyBjaGVja2JveCB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl06Y2hlY2tlZCcpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHNlbGVjdGVkIHJhZGlvIG9wdGlvbnMgdG8gdXBkYXRlIHN0YXJ0aW5nIHJhZGlvIGJ1dHRvbnMgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciB1cGRhdGUgb24gaW5wdXQgdGV4dCB0byBjYXRjaCBhbnkgZGVmYXVsdCB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5maW5kKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IG51bWJlcnMgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgndGV4dGFyZWEnKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciB1cGRhdGUgb24gdGV4dGFyZWEgdHAgY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykucGFyZW50KCkudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgc2VsZWN0ZWQgb3B0aW9ucyB0byB1cGRhdGUgc3RhcnRpbmcgc2VsZWN0IGJveCB2YWx1ZXNcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLm9wdGlvbkhhbmRsZXJzW3Byb2R1Y3RJZF0udXBkYXRlT3B0aW9uVmlldygpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uSGFuZGxlcnNbcHJvZHVjdElkXS5jaGVja09wdGlvbnNTZWxlY3RlZChtb2RhbENvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBhZGRpbmcgdG8gY2FydCBmcm9tIG1vZGFsXG4gICAgICAgICAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24tLW1vZGFsYWRkdG9jYXJ0JywgbW9kYWxDb250ZW50KS5vbignY2xpY2snLCAoKSA9PiB0aGlzLmFkZFRvQ2FydEZyb21Nb2RhbChtb2RhbENvbnRlbnQsIHByb2R1Y3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYXBwbHkgdXBzZWxsIGhhbmRsZXJzXG4gICAgICovXG4gICAgYXBwbHlVcHNlbGxIYW5kbGVycygpIHtcbiAgICAgICAgdGhpcy5vcHRpb25IYW5kbGVycyA9IHt9O1xuICAgICAgICAkKCcuY3B1X19pdGVtLmhhc09wdGlvbnMnKS50b0FycmF5KCkuZm9yRWFjaChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgIGxldCB0aGlzSUQgPSAkKHByb2R1Y3QpLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0X2lkXCJdJykudmFsKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkhhbmRsZXJzW3RoaXNJRF0gPSBuZXcgQ2FydFBhZ2VVcHNlbGxQcm9kdWN0KCQocHJvZHVjdCkpXG4gICAgICAgIH0pOyAvLyBoYW5kbGUgb3B0aW9ucyBmb3IgYWxsIHByb2R1Y3RzIHcvIG9wdGlvbnNcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5vcHRpb25IYW5kbGVycyk7XG4gICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1hZGR0b2NhcnQnKS5vbignY2xpY2snLCBlID0+IHRoaXMuYWRkVG9DYXJ0KGUpKTsgLy8gbWFuYWdlIGFkZGluZyB0byBjYXJ0XG5cbiAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24tLW9wdGlvbnMnKS5vbignY2xpY2snLCBlID0+IHRoaXMuc2hvd09wdGlvbnMoZSkpOyAvLyBtYW5hZ2UgYWRkaW5nIHRvIGNhcnRcblxuICAgICAgICB0aGlzLmRpc3BsYXlJbkNhcm91c2VsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQUpBWCB0aGUgdXBzZWxsIFVSTHMgYW5kL29yIElEcyBhbmQgYXBwZW5kIHdoZXJlIG5lZWRlZFxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHRhcmdldHMgLSB0YXJnZXRzIHRvIHVwc2VsbFxuICAgICAqL1xuICAgIGxvYWRVcHNlbGxUYXJnZXRzKHRhcmdldHMpIHtcbiAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0YXJnZXRzID0gdGFyZ2V0cy5zbGljZSgwLCB0aGlzLnByb2R1Y3RMaW1pdCB8fCB0YXJnZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBydW5RdWV1ZUluT3JkZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSB7IC8vIHdoZW4gZG9uZSBhbGwgcHJvZHVjdHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseVVwc2VsbEhhbmRsZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmcuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0YXJnZXRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdE1ldGhvZCA9IHRhcmdldC50b1N0cmluZygpLm1hdGNoKC9eWzAtOV0rJC8pID8gdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZCA6IHV0aWxzLmFwaS5nZXRQYWdlO1xuICAgICAgICAgICAgICAgIHJlcXVlc3RNZXRob2QodGFyZ2V0LCB7IHRlbXBsYXRlOiAnY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwtaXRlbScgfSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgeyByZXR1cm47IH0gLy8gaWYgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NwdSAuY3B1X19saXN0LS1jdXN0b21maWVsZHMnKS5hcHBlbmQocmVzcG9uc2UpOyAvLyBubyBlcnJvciwgYXBwZW5kIG1hcmt1cFxuICAgICAgICAgICAgICAgICAgICBydW5RdWV1ZUluT3JkZXIoKTsgLy8gcnVuIG5leHQgaXRlbVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJ1blF1ZXVlSW5PcmRlcigpOyAvLyBzdGFydCB0aGUgbG9vcFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnI2NwdScpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBTbGljayBvcHRpb25zIHRvIHByb2R1Y3QgZGlzcGxheSBhZnRlciBsb2FkaW5nIHByb2R1Y3RzLFxuICAgICAqIHRoZW4gZmlyZSBTbGlja1xuICAgICAqL1xuICAgIGRpc3BsYXlJbkNhcm91c2VsKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2hvd01vYmlsZUluQ2Fyb3VzZWwpIHJldHVybjtcblxuICAgICAgICAvLyAgQWRkIENTUyB0byBwcm9kdWN0IGNhcmRzIGJlZm9yZSBmaXJpbmcgU2xpY2tcbiAgICAgICAgJCgnLmNwdV9fbGlzdCcpLmFkZENsYXNzKCdjcHVfX2xpc3Qtc2xpY2snKVxuICAgICAgICAkKCcuY3B1X19pdGVtJykuYWRkQ2xhc3MoJ2NwdV9faXRlbS1zbGljaycpXG5cbiAgICAgICAgJCgnLmNwdV9fbGlzdCcpLmF0dHIoJ2RhdGEtc2xpY2snLCBge1xuICAgICAgICAgICAgXCJpbmZpbml0ZVwiOiB0cnVlLFxuICAgICAgICAgICAgXCJkb3RzXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJhcnJvd3NcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwibW9iaWxlRmlyc3RcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwicm93c1wiOiAxLFxuICAgICAgICAgICAgXCJzbGlkZXNUb1Nob3dcIjogMSxcbiAgICAgICAgICAgIFwic2xpZGVzVG9TY3JvbGxcIjogMSxcbiAgICAgICAgICAgIFwicmVzcG9uc2l2ZVwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcImJyZWFrcG9pbnRcIjogMTAyNSxcbiAgICAgICAgICAgICAgICAgICAgXCJzZXR0aW5nc1wiOiBcInVuc2xpY2tcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfWApO1xuXG4gICAgICAgIGZvcm1hdENhcm91c2VsKHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgbWVkaWFNYXRjaCA9IG1lZGlhUXVlcnlMaXN0RmFjdG9yeSgnbWVkaXVtJyk7XG5cbiAgICAgICAgJChtZWRpYU1hdGNoKS5vbignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgICAgICBsZXQgYmluZFRvV2luZG93ID0gIWUudGFyZ2V0Lm1hdGNoZXNcblxuICAgICAgICAgICAgaWYgKGJpbmRUb1dpbmRvdykge1xuICAgICAgICAgICAgICAgICQoJy5jcHVfX2xpc3QnKS5zbGljaygncmVpbml0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYmluZCBldmVudHNcbiAgICAgKi9cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcuc2hvdygpO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdyZWxhdGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQXV0b1RhcmdldHMoJ3JlbGF0ZWQnKTtcbiAgICAgICAgICAgIGNhc2UgJ3NpbWlsYXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRBdXRvVGFyZ2V0cygnc2ltaWxhcicpO1xuICAgICAgICAgICAgY2FzZSAnY3VzdG9tIGZpZWxkcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZEN1c3RvbUZpZWxkVGFyZ2V0cygpO1xuICAgICAgICAgICAgY2FzZSAndXBzZWxsIHN1aXRlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQ1NWVGFyZ2V0cygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IG1lZGlhUXVlcnlMaXN0RmFjdG9yeSBmcm9tICcuLi9jb21tb24vbWVkaWEtcXVlcnktbGlzdCc7XG5cbmNvbnN0IGZsb2F0aW5nQ2hlY2tvdXRCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgJHN1bW1hcnlDb250YWluZXIgPSAkKCcuanMtY2FydF9fdG90YWxzJyk7XG4gICAgY29uc3QgJGZsb2F0aW5nQnV0dG9uID0gJCgnLmZsb2F0aW5nLWNoZWNrb3V0LWJ1dHRvbicpO1xuICAgIGNvbnN0IG1xID0gbWVkaWFRdWVyeUxpc3RGYWN0b3J5KCdtZWRpdW0nKTtcblxuICAgIGZ1bmN0aW9uIFdpZHRoQ2hhbmdlKG1xKSB7XG4gICAgICAgIGNvbnN0IGZhZGVUaW1pbmcgPSA0MDA7XG5cbiAgICAgICAgaWYgKCFtcS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBpbml0V2luZG93UG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWSArIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICAgICAgaWYgKGluaXRXaW5kb3dQb3NpdGlvbiA8ICRzdW1tYXJ5Q29udGFpbmVyLm9mZnNldCgpLnRvcCkge1xuICAgICAgICAgICAgICAgICRmbG9hdGluZ0J1dHRvbi5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRmbG9hdGluZ0J1dHRvbi5oaWRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVdpbmRvd1Bvc2l0aW9uID0gd2luZG93LnNjcm9sbFkgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoYm90dG9tV2luZG93UG9zaXRpb24gPCAkc3VtbWFyeUNvbnRhaW5lci5vZmZzZXQoKS50b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgJGZsb2F0aW5nQnV0dG9uLmZhZGVJbihmYWRlVGltaW5nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkZmxvYXRpbmdCdXR0b24uZmFkZU91dChmYWRlVGltaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRmbG9hdGluZ0J1dHRvbi5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtcS5hZGRMaXN0ZW5lcihXaWR0aENoYW5nZSk7XG4gICAgV2lkdGhDaGFuZ2UobXEpO1xuXG4gICAgJGZsb2F0aW5nQnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgZ29Ub0NoZWNrb3V0ID0gZmFsc2U7IC8vIFNldCB0byB0cnVlIGlmIHRoZSBidXR0b24gc2hvdWxkIGdvIHRvIGNoZWNrb3V0IGluc3RlYWQgb2Ygc2Nyb2xsaW5nIHRoZSB1c2VyIGRvd24gdGhlIHBhZ2VcbiAgICAgICAgY29uc3QgdG90YWxzT2Zmc2V0ID0gJHN1bW1hcnlDb250YWluZXIub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgIGlmIChnb1RvQ2hlY2tvdXQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9jaGVja291dC5waHAnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHRvdGFsc09mZnNldCAtIDEwMCB9LCA3MDApOyAvLyBzY3JvbGwgdXNlciB0byB0aGUgcmVhbCBjaGVja291dCBidXR0b24gcHJvZHVjdFxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgeyBmbG9hdGluZ0NoZWNrb3V0QnV0dG9uIH07XG4iLCIvKlxuICogcHV0IHByb2R1Y3RJRCBvbiB0aGUgZWxlbWVudCdzIFwiZm9yXCIgYW5kIFwiaWRcIiBhdHRycyBzbyBtdWx0aXBsZSBjYXNlcyBvZiBzYW1lIG9wdGlvbiBzZXQgd29uJ3QgY29uZmxpY3RcbiAqL1xuY29uc3QgbWFrZU9wdGlvbklkc1VuaXF1ZSA9IChzY29wZSwgcHJvZHVjdElkLCBrZXkpID0+IHtcbiAgICAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScsIHNjb3BlKS5lYWNoKChpbmRleCwgZWwpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uSWQgPSAkKGVsKS5hdHRyKCdpZCcpOyAvLyB1cGRhdGUgSUQgdG8gaW5jbHVkZSBwcm9kdWN0IElEXG4gICAgICAgICQoZWwpLmF0dHIoJ2lkJywgYCR7a2V5fV8ke29wdGlvbklkfV8ke3Byb2R1Y3RJZH1gKTsgLy8gdXBkYXRlIG9wdGlvbiBJRCB0byBpbmNsdWRlIHByb2R1Y3QgSURcbiAgICAgICAgJChlbCkubmV4dCgpLmF0dHIoJ2ZvcicsIGAke2tleX1fJHtvcHRpb25JZH1fJHtwcm9kdWN0SWR9YCk7IC8vIHVwZGF0ZSBvcHRpb24gbGFiZWwgdG8gdGFyZ2V0IHVwZGF0ZWQgSURcbiAgICB9KTtcbiAgICAvLyBhZGQgaW5wdXQgZmllbGRzIGxhYmVsIGNsYXNzIGFuZCBwdXQgaW4gaGVyZS4gVGhlc2Ugb3B0aW9ucyB3ZSBuZWVkIHRvIHNlbGVjdCB0aGVpciBzaWJsaW5nIGxhYmVsXG4gICAgY29uc3Qgb3B0aW9uc1dpdGhMYWJlbEF0dHJzID0gW1xuICAgICAgICAnaW5wdXRbdHlwZT1cInRleHRcIl0nLFxuICAgICAgICAnaW5wdXRbdHlwZT1cIm51bWJlclwiXScsXG4gICAgICAgICdpbnB1dFt0eXBlPVwiZmlsZVwiXScsXG4gICAgICAgICdzZWxlY3QnLFxuICAgICAgICAndGV4dGFyZWEnLFxuICAgIF1cbiAgICBjb25zdCBvcHRpb25zV2l0aExhYmVsQXR0cnNTZWxlY3RvcnMgPSBvcHRpb25zV2l0aExhYmVsQXR0cnMuam9pbignLCcpO1xuICAgICQob3B0aW9uc1dpdGhMYWJlbEF0dHJzU2VsZWN0b3JzLCBzY29wZSkucGFyZW50cygnLmZvcm0tZmllbGQnKS5maW5kKCdsYWJlbCcpLmVhY2goKGluZGV4LCBlbCkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25JZCA9ICQoZWwpLmF0dHIoJ2ZvcicpOyAvLyB1cGRhdGUgSUQgdG8gaW5jbHVkZSBwcm9kdWN0IElEXG4gICAgICAgICQoZWwpLmF0dHIoJ2ZvcicsIGAke2tleX1fJHtvcHRpb25JZH1fJHtwcm9kdWN0SWR9YCk7IC8vIHVwZGF0ZSBvcHRpb24gSUQgdG8gaW5jbHVkZSBwcm9kdWN0IElEXG4gICAgICAgICQoZWwpLm5leHQoKS5hdHRyKCdpZCcsIGAke2tleX1fJHtvcHRpb25JZH1fJHtwcm9kdWN0SWR9YCk7IC8vIHVwZGF0ZSBvcHRpb24gbGFiZWwgdG8gdGFyZ2V0IHVwZGF0ZWQgSURcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFrZU9wdGlvbklkc1VuaXF1ZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=