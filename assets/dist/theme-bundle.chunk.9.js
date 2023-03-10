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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vc3RhdGUtY291bnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwtcHJvZHVjdC1kZXRhaWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vY2FydC1wYWdlLXVwc2VsbC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY3VzdG9tL2N1c3RvbS1jYXJ0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jdXN0b20vbWFrZS1vcHRpb25zLXVuaXF1ZS5qcyJdLCJuYW1lcyI6WyJDYXJ0IiwiX1BhZ2VNYW5hZ2VyIiwiX2luaGVyaXRzTG9vc2UiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCIkbW9kYWwiLCIkY2FydFBhZ2VDb250ZW50IiwiJCIsIiRjYXJ0Q29udGVudCIsIiRjYXJ0TWVzc2FnZXMiLCIkY2FydFRvdGFscyIsIiRjYXJ0QWRkaXRpb25hbENoZWNrb3V0QnRucyIsIiRvdmVybGF5IiwiaGlkZSIsIiRhY3RpdmVDYXJ0SXRlbUlkIiwiJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uIiwiY3VzdG9tQ2FydCIsImNvbnRleHQiLCJpdHNDb25maWciLCJjdXN0b21fY2FydCIsImZsb2F0aW5nQ2hlY2tvdXRCdXR0b24iLCJjYXJ0UGFnZVVwc2VsbCIsIkNhcnRQYWdlVXBzZWxsIiwic2V0QXBwbGVQYXlTdXBwb3J0IiwiYmluZEV2ZW50cyIsIndpbmRvdyIsIkFwcGxlUGF5U2Vzc2lvbiIsImFkZENsYXNzIiwiY2FydFVwZGF0ZSIsIiR0YXJnZXQiLCJfdGhpcyIsIml0ZW1JZCIsImRhdGEiLCIkZWwiLCJvbGRRdHkiLCJwYXJzZUludCIsInZhbCIsIm1heFF0eSIsIm1pblF0eSIsIm1pbkVycm9yIiwibWF4RXJyb3IiLCJuZXdRdHkiLCJzd2FsIiwiZmlyZSIsInRleHQiLCJpY29uIiwic2hvdyIsInV0aWxzIiwiYXBpIiwiY2FydCIsIml0ZW1VcGRhdGUiLCJlcnIiLCJyZXNwb25zZSIsInN0YXR1cyIsInJlbW92ZSIsInJlZnJlc2hDb250ZW50IiwiZXJyb3JzIiwiam9pbiIsImNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlIiwicHJlVmFsIiwiX3RoaXMyIiwiTnVtYmVyIiwiaW52YWxpZEVudHJ5IiwiaW52YWxpZEVudHJ5TWVzc2FnZSIsInJlcGxhY2UiLCJjYXJ0UmVtb3ZlSXRlbSIsIl90aGlzMyIsIml0ZW1SZW1vdmUiLCJjYXJ0RWRpdE9wdGlvbnMiLCJwcm9kdWN0SWQiLCJfdGhpczQiLCJPYmplY3QiLCJhc3NpZ24iLCJwcm9kdWN0Rm9yQ2hhbmdlSWQiLCJtb2RhbCIsImRlZmF1bHRNb2RhbCIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsIm9wZW4iLCJmaW5kIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJjb25maWd1cmVJbkNhcnQiLCJ1cGRhdGVDb250ZW50IiwiY29udGVudCIsIm9wdGlvbkNoYW5nZUhhbmRsZXIiLCIkcHJvZHVjdE9wdGlvbnNDb250YWluZXIiLCJtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCIsIm91dGVySGVpZ2h0IiwibGVuZ3RoIiwiY3NzIiwiaGFzQ2xhc3MiLCJvbmUiLCJNb2RhbEV2ZW50cyIsIm9wZW5lZCIsInByb2R1Y3REZXRhaWxzIiwiQ2FydEl0ZW1EZXRhaWxzIiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJob29rcyIsIm9uIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiJGZvcm0iLCIkc3VibWl0IiwiJG1lc3NhZ2VCb3giLCJvcHRpb25DaGFuZ2UiLCJzZXJpYWxpemUiLCJyZXN1bHQiLCJwdXJjaGFzaW5nX21lc3NhZ2UiLCJwcm9wIiwicHVyY2hhc2FibGUiLCJpbnN0b2NrIiwiX3RoaXM1IiwiJGNhcnRJdGVtc1Jvd3MiLCIkY2FydFBhZ2VUaXRsZSIsInRvdGFscyIsInBhZ2VUaXRsZSIsInN0YXR1c01lc3NhZ2VzIiwiYWRkaXRpb25hbENoZWNrb3V0QnV0dG9ucyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsInF1YW50aXR5IiwidHJpZ2dlciIsImZpbHRlciIsImJpbmRDYXJ0RXZlbnRzIiwiX3RoaXM2IiwiZGVib3VuY2VUaW1lb3V0IiwiX2JpbmQiLCJfZGVib3VuY2UiLCJwcmV2ZW50RGVmYXVsdCIsIm9uUXR5Rm9jdXMiLCJ2YWx1ZSIsImNoYW5nZSIsInN0cmluZyIsInNob3dDYW5jZWxCdXR0b24iLCJjYW5jZWxCdXR0b25UZXh0IiwidGhlbiIsImJpbmRQcm9tb0NvZGVFdmVudHMiLCJfdGhpczciLCIkY291cG9uQ29udGFpbmVyIiwiJGNvdXBvbkZvcm0iLCIkY29kZUlucHV0IiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCJfdGhpczgiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJjaGVja0lzR2lmdENlcnRWYWxpZCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlIiwiYXBwbHlHaWZ0Q2VydGlmaWNhdGUiLCJyZXNwIiwiYmluZEdpZnRXcmFwcGluZ0V2ZW50cyIsIl90aGlzOSIsImdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zIiwiJHNlbGVjdCIsImlkIiwiaW5kZXgiLCJhbGxvd01lc3NhZ2UiLCJ0b2dnbGVWaWV3cyIsIiRzaW5nbGVGb3JtIiwiJG11bHRpRm9ybSIsIl90aGlzMTAiLCJzaGlwcGluZ0Vycm9yTWVzc2FnZXMiLCJjb3VudHJ5Iiwic2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlIiwicHJvdmluY2UiLCJzaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlIiwic2hpcHBpbmdFc3RpbWF0b3IiLCJTaGlwcGluZ0VzdGltYXRvciIsImRvY3VtZW50IiwiUGFnZU1hbmFnZXIiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdFc3RpbWF0b3JBbGVydCIsInNoaXBwaW5nVmFsaWRhdG9yIiwibm9kIiwic3VibWl0IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImF0dHIiLCJyZW1vdmVBdHRyIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiYmluZFZhbGlkYXRpb24iLCJiaW5kU3RhdGVWYWxpZGF0aW9uIiwiYmluZFVQU1JhdGVzIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwiY291bnRyeUlkIiwiaXNOYU4iLCJlcnJvck1lc3NhZ2UiLCIkZWxlIiwiZWxlVmFsIiwiVVBTUmF0ZVRvZ2dsZSIsIiRlc3RpbWF0b3JGb3JtVXBzIiwiJGVzdGltYXRvckZvcm1EZWZhdWx0IiwidG9nZ2xlQ2xhc3MiLCIkbGFzdCIsInN0YXRlQ291bnRyeSIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCJFcnJvciIsIiRmaWVsZCIsImdldFN0YXR1cyIsImlzIiwiVmFsaWRhdG9ycyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSIsInRvZ2dsZUJ1dHRvbiIsImJ1dHRvblNlbGVjdG9yIiwiJHRvZ2dsZUNvbnRhaW5lciIsImNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSIsInNlbGVjdG9yVG9BY3RpdmF0ZSIsIiRlc3RpbWF0b3JDb250YWluZXIiLCIkZXN0aW1hdG9yRm9ybSIsImNvbGxhcHNpYmxlRmFjdG9yeSIsInBhcmFtcyIsImNvdW50cnlfaWQiLCJzdGF0ZV9pZCIsImNpdHkiLCJ6aXBfY29kZSIsImdldFNoaXBwaW5nUXVvdGVzIiwiY2xpY2tFdmVudCIsInF1b3RlSWQiLCJzdWJtaXRTaGlwcGluZ1F1b3RlIiwiX1Byb2R1Y3REZXRhaWxzQmFzZSIsIiRzY29wZSIsInByb2R1Y3RBdHRyaWJ1dGVzRGF0YSIsImNhbGwiLCIkcHJvZHVjdE9wdGlvbnNFbGVtZW50IiwiaGFzT3B0aW9ucyIsInRyaW0iLCJoYXNEZWZhdWx0T3B0aW9ucyIsInNldFByb2R1Y3RWYXJpYW50Iiwib3B0aW9uQ2hhbmdlQ2FsbGJhY2siLCJvcHRpb25DaGFuZ2VEZWNvcmF0b3IiLCJfYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwiX2lzRW1wdHkiLCJ1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyIsInVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMiLCJlYWNoIiwib3B0aW9uTGFiZWwiLCJjaGlsZHJlbiIsImlubmVyVGV4dCIsIm9wdGlvblRpdGxlIiwic3BsaXQiLCJyZXF1aXJlZCIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJ0eXBlIiwiZ2V0QXR0cmlidXRlIiwicXVlcnlTZWxlY3RvciIsInB1c2giLCJpc1NhdGlzZmllZCIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsInNlbGVjdCIsInNlbGVjdGVkSW5kZXgiLCJkYXRlU3RyaW5nIiwibWFwIiwieCIsImNoZWNrZWQiLCJnZXRTZWxlY3RlZE9wdGlvbkxhYmVsIiwicHJvZHVjdFZhcmlhbnRzbGlzdCIsImNvbnZlcnRJbnRvQXJyYXkiLCJtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0IiwiaW5wdCIsImRhdGFzZXQiLCJwcm9kdWN0QXR0cmlidXRlVmFsdWUiLCJsYWJlbCIsImlzQnJvd3NlcklFIiwibGFiZWxzIiwidGl0bGUiLCJwcm9kdWN0VmFyaWFudCIsInNvcnQiLCJ2aWV3IiwicHJvZHVjdE5hbWUiLCJtYXRjaCIsImNhcmQiLCJQcm9kdWN0RGV0YWlsc0Jhc2UiLCJjZXJ0IiwibWFrZVN0YXRlUmVxdWlyZWQiLCJzdGF0ZUVsZW1lbnQiLCJhdHRycyIsIl90cmFuc2Zvcm0iLCJpdGVtIiwicmV0IiwibmFtZSIsInJlcGxhY2VtZW50QXR0cmlidXRlcyIsIiRuZXdFbGVtZW50IiwiJGhpZGRlbklucHV0IiwicHJldiIsImFwcGVuZCIsIm1ha2VTdGF0ZU9wdGlvbmFsIiwiaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCIsImFkZE9wdGlvbnMiLCJzdGF0ZXNBcnJheSIsIiRzZWxlY3RFbGVtZW50IiwiY29udGFpbmVyIiwicHJlZml4IiwiX2VhY2giLCJzdGF0ZXMiLCJzdGF0ZU9iaiIsImNhbGxiYWNrIiwiY291bnRyeU5hbWUiLCJnZXRCeU5hbWUiLCJzaG93QWxlcnRNb2RhbCIsInN0YXRlX2Vycm9yIiwiJGN1cnJlbnRJbnB1dCIsIm5ld0VsZW1lbnQiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsIkpTT04iLCJwYXJzZSIsInVuZGVmaW5lZCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwia2V5IiwicG9wIiwicmVkdWNlIiwiYWNjIiwiQ2FydFBhZ2VVcHNlbGxQcm9kdWN0IiwiaW5pdFJhZGlvQXR0cmlidXRlcyIsIiRwcm9kdWN0SWQiLCJ1cGRhdGVPcHRpb25WaWV3IiwiYWRkUmVxdWlyZWRDbGFzc3RvT3B0aW9ucyIsInRvQXJyYXkiLCJmb3JFYWNoIiwib3B0aW9uIiwicHJvZHVjdE9wdGlvbnNDaGFuZ2VkIiwiJGNoYW5nZWRPcHRpb24iLCJ0YXJnZXQiLCJvcHRpb25Sb3ciLCJwYXJlbnRzIiwiRm9ybURhdGEiLCJzaWJsaW5ncyIsIiRzZWxlY3RlZE9wdGlvbiIsImluZGV4T2YiLCJvdGhlclNlbGVjdGVkRGF0ZUZpZWxkcyIsImNvdW50IiwiY2hlY2tPcHRpb25zU2VsZWN0ZWQiLCJ1cGRhdGVWaWV3IiwibnVtYmVyUmVxdWlyZWRPcHRpb25zIiwibnVtYmVyU2VsZWN0ZWRPcHRpb25zIiwidXBkYXRlUHJpY2VWaWV3IiwicHJpY2UiLCJ3aXRob3V0X3RheCIsImZvcm1hdHRlZCIsIl9pc09iamVjdCIsImltYWdlRWwiLCJpbWFnZSIsImltYWdlU3JjIiwib3B0aW9uTWVzc2FnZSIsInN0b2NrX21lc3NhZ2UiLCJiZWhhdmlvciIsIm91dF9vZl9zdG9ja19iZWhhdmlvciIsImluU3RvY2tJZHMiLCJpbl9zdG9ja19hdHRyaWJ1dGVzIiwib3V0T2ZTdG9ja01lc3NhZ2UiLCJvdXRfb2Zfc3RvY2tfbWVzc2FnZSIsImF0dHJpYnV0ZSIsIiRhdHRyaWJ1dGUiLCJhdHRySWQiLCJlbmFibGVBdHRyaWJ1dGUiLCJkaXNhYmxlQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlVHlwZSIsImRpc2FibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUiLCJwYXJlbnQiLCJ0b2dnbGVPcHRpb24iLCJlbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUiLCIkcGFyZW50IiwiY2xvc2VzdCIsInJhZGlvIiwiJHJhZGlvIiwiY2xpY2siLCJtYWtlT3B0aW9uSWRzVW5pcXVlIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsImV4cG9ydHMiLCJPcCIsImhhc093biIsImhhc093blByb3BlcnR5IiwiZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJkZXNjIiwiJFN5bWJvbCIsIlN5bWJvbCIsIml0ZXJhdG9yU3ltYm9sIiwiaXRlcmF0b3IiLCJhc3luY0l0ZXJhdG9yU3ltYm9sIiwiYXN5bmNJdGVyYXRvciIsInRvU3RyaW5nVGFnU3ltYm9sIiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiaW5uZXJGbiIsIm91dGVyRm4iLCJzZWxmIiwidHJ5TG9jc0xpc3QiLCJwcm90b0dlbmVyYXRvciIsIkdlbmVyYXRvciIsImdlbmVyYXRvciIsImNyZWF0ZSIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJmbiIsImFyZyIsIkNvbnRpbnVlU2VudGluZWwiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiSXRlcmF0b3JQcm90b3R5cGUiLCJnZXRQcm90byIsImdldFByb3RvdHlwZU9mIiwiTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUiLCJHcCIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsIm1ldGhvZCIsIl9pbnZva2UiLCJBc3luY0l0ZXJhdG9yIiwiUHJvbWlzZUltcGwiLCJpbnZva2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVjb3JkIiwiX19hd2FpdCIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJzdGF0ZSIsImRvbmVSZXN1bHQiLCJkZWxlZ2F0ZSIsImRlbGVnYXRlUmVzdWx0IiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiZG9uZSIsIm1ldGhvZE5hbWUiLCJUeXBlRXJyb3IiLCJpbmZvIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwibG9jcyIsImVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsIml0ZXJhYmxlIiwiaXRlcmF0b3JNZXRob2QiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwiY29uc3RydWN0b3IiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsImFzeW5jIiwiUHJvbWlzZSIsIml0ZXIiLCJvYmplY3QiLCJyZXZlcnNlIiwic2tpcFRlbXBSZXNldCIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJvb3RSZWNvcmQiLCJydmFsIiwiZXhjZXB0aW9uIiwiaGFuZGxlIiwibG9jIiwiY2F1Z2h0IiwiaGFzQ2F0Y2giLCJoYXNGaW5hbGx5IiwiZmluYWxseUVudHJ5IiwiY29tcGxldGUiLCJmaW5pc2giLCJfY2F0Y2giLCJ0aHJvd24iLCJkZWxlZ2F0ZVlpZWxkIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiZ2VuIiwiX25leHQiLCJfdGhyb3ciLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3MiLCJWRVJTSU9OIiwiY29uc29sZSIsImxvZyIsIm1vZGUiLCJlcnJvckRlZmF1bHQiLCJzaG93TW9iaWxlSW5DYXJvdXNlbCIsInByb2R1Y3RMaW1pdCIsImxvYWRpbmciLCJwcm9kdWN0IiwiZ2V0QnlJZCIsImJpbmQiLCJnZXRQYWdlIiwicmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyIsInVwc2VsbFRhcmdldHMiLCJTZXQiLCJyZW1vdmVDYXJ0SXRlbVRhcmdldHMiLCJjYXJ0SXRlbURhdGEiLCJjYXJ0SXRlbSIsInByb2R1Y3R1cmwiLCJvcmlnaW4iLCJ0b1N0cmluZyIsInVwc2VsbEl0ZW1zIiwidXBzZWxsaXRlbSIsImdldFJhbmRvbUludCIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxvYWRBdXRvVGFyZ2V0cyIsIml0ZW1JbmRleCIsImVxIiwic3RvcmVkRGF0YSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2FkVXBzZWxsVGFyZ2V0cyIsIm9wdHMiLCJjb25maWciLCJyZWxhdGVkX3Byb2R1Y3RzIiwibGltaXQiLCJzaW1pbGFyX2J5X3ZpZXdzIiwicmVzIiwidGFyZ2V0cyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJsb2FkQ3VzdG9tRmllbGRUYXJnZXRzIiwidXBzZWxsSXRlbSIsImxvYWRDU1ZUYXJnZXRzIiwiX2xvYWRDU1ZUYXJnZXRzIiwiX2NhbGxlZSIsImNwdUhUTUx0ZXh0IiwiY3B1SFRNTCIsInJlbWFpbmluZ1Nsb3RzIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInNlc3Npb25TdG9yYWdlIiwidXBzZWxsU3VpdGVDUFUiLCJwYXJzZUFycmF5RnJvbVN0cmluZyIsImdldEFkZGl0aW9uYWxQcm9kdWN0cyIsInByb2R1Y3RfaWQiLCJ0MCIsImFwcGx5VXBzZWxsSGFuZGxlcnMiLCJhZGRUb0NhcnQiLCJzbGlkZURvd24iLCJ0b2dnbGVPcHRpb25zIiwiZm9ybSIsIml0ZW1BZGQiLCJ0bXAiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiZXJyb3JPZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidGV4dENvbnRlbnQiLCJzeW5jRm9ybU9wdGlvbiIsIm9wdCIsInRhcmdldElkIiwiYWRkVG9DYXJ0RnJvbU1vZGFsIiwibW9kYWxDb250ZW50Iiwib25DbG9zZSIsImNsb3NlIiwic2hvd09wdGlvbnMiLCJlIiwib3B0aW9uTWFya3VwIiwiY3VzdG9tQ2xhc3MiLCJzaG93Q2xvc2VCdXR0b24iLCJzaG93Q29uZmlybUJ1dHRvbiIsIm9uT3BlbiIsIm9wdGlvbkhhbmRsZXJzIiwidGhpc0lEIiwiZGlzcGxheUluQ2Fyb3VzZWwiLCJydW5RdWV1ZUluT3JkZXIiLCJzaGlmdCIsInJlcXVlc3RNZXRob2QiLCJmb3JtYXRDYXJvdXNlbCIsIm1lZGlhTWF0Y2giLCJtZWRpYVF1ZXJ5TGlzdEZhY3RvcnkiLCJiaW5kVG9XaW5kb3ciLCJtYXRjaGVzIiwic2xpY2siLCIkc3VtbWFyeUNvbnRhaW5lciIsIiRmbG9hdGluZ0J1dHRvbiIsIm1xIiwiV2lkdGhDaGFuZ2UiLCJmYWRlVGltaW5nIiwiaW5pdFdpbmRvd1Bvc2l0aW9uIiwic2Nyb2xsWSIsImlubmVySGVpZ2h0IiwiYm90dG9tV2luZG93UG9zaXRpb24iLCJmYWRlSW4iLCJmYWRlT3V0IiwiYWRkTGlzdGVuZXIiLCJnb1RvQ2hlY2tvdXQiLCJ0b3RhbHNPZmZzZXQiLCJocmVmIiwic2NvcGUiLCJlbCIsIm9wdGlvbklkIiwib3B0aW9uc1dpdGhMYWJlbEF0dHJzIiwib3B0aW9uc1dpdGhMYWJlbEF0dHJzU2VsZWN0b3JzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUM7QUFFOEI7QUFDUztBQUNqQztBQUNXO0FBQ0M7QUFDbkI7QUFDaUI7QUFFSztBQUNQO0FBQUEsSUFFbENBLElBQUksMEJBQUFDLFlBQUE7RUFBQUMsY0FBQSxDQUFBRixJQUFBLEVBQUFDLFlBQUE7RUFBQSxTQUFBRCxLQUFBO0lBQUEsT0FBQUMsWUFBQSxDQUFBRSxLQUFBLE9BQUFDLFNBQUE7RUFBQTtFQUFBLElBQUFDLE1BQUEsR0FBQUwsSUFBQSxDQUFBTSxTQUFBO0VBQUFELE1BQUEsQ0FDckJFLE9BQU8sR0FBUCxTQUFBQSxRQUFBLEVBQVU7SUFDTixJQUFJLENBQUNDLE1BQU0sR0FBRyxJQUFJO0lBQ2xCLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUdDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDeEMsSUFBSSxDQUFDQyxZQUFZLEdBQUdELENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztJQUM1QyxJQUFJLENBQUNFLGFBQWEsR0FBR0YsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0lBQzVDLElBQUksQ0FBQ0csV0FBVyxHQUFHSCxDQUFDLENBQUMsb0JBQW9CLENBQUM7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QkFBb0IsRUFDcEIsUUFBUSxFQUNSLFVBQVUsQ0FDYjtFQUNELElBQU1DLDhCQUE4QixHQUFHRCxxQkFBcUIsQ0FBQzFrQixJQUFJLENBQUMsR0FBRyxDQUFDO0VBQ3RFbEQsQ0FBQyxDQUFDNm5CLDhCQUE4QixFQUFFSixLQUFLLENBQUMsQ0FBQzFSLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQ3ZSLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQytLLElBQUksQ0FBQyxVQUFDM0YsS0FBSyxFQUFFOGQsRUFBRSxFQUFLO0lBQzlGLElBQU1DLFFBQVEsR0FBRzNuQixDQUFDLENBQUMwbkIsRUFBRSxDQUFDLENBQUNuYyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNwQ3ZMLENBQUMsQ0FBQzBuQixFQUFFLENBQUMsQ0FBQ25jLElBQUksQ0FBQyxLQUFLLEVBQUt3SixHQUFHLFNBQUk0UyxRQUFRLFNBQUk3akIsU0FBUyxDQUFHLENBQUMsQ0FBQztJQUN0RDlELENBQUMsQ0FBQzBuQixFQUFFLENBQUMsQ0FBQzFLLElBQUksRUFBRSxDQUFDelIsSUFBSSxDQUFDLElBQUksRUFBS3dKLEdBQUcsU0FBSTRTLFFBQVEsU0FBSTdqQixTQUFTLENBQUcsQ0FBQyxDQUFDO0VBQ2hFLENBQUMsQ0FBQztBQUNOLENBQUM7O0FBRWMyVSxrRkFBbUIsRSIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuOS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XHJcbmltcG9ydCB7IGJpbmQsIGRlYm91bmNlIH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IGNoZWNrSXNHaWZ0Q2VydFZhbGlkIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcclxuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcclxuaW1wb3J0IFNoaXBwaW5nRXN0aW1hdG9yIGZyb20gJy4vY2FydC9zaGlwcGluZy1lc3RpbWF0b3InO1xyXG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwsIE1vZGFsRXZlbnRzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xyXG5pbXBvcnQgc3dhbCBmcm9tICcuL2dsb2JhbC9zd2VldC1hbGVydCc7XHJcbmltcG9ydCBDYXJ0SXRlbURldGFpbHMgZnJvbSAnLi9jb21tb24vY2FydC1pdGVtLWRldGFpbHMnO1xyXG5cclxuaW1wb3J0IHsgZmxvYXRpbmdDaGVja291dEJ1dHRvbiB9IGZyb20gJy4vY3VzdG9tL2N1c3RvbS1jYXJ0JztcclxuaW1wb3J0IENhcnRQYWdlVXBzZWxsIGZyb20gJy4vY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIG9uUmVhZHkoKSB7XHJcbiAgICAgICAgdGhpcy4kbW9kYWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudCA9ICQoJ1tkYXRhLWNhcnRdJyk7XHJcbiAgICAgICAgdGhpcy4kY2FydENvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0LWNvbnRlbnRdJyk7XHJcbiAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzID0gJCgnW2RhdGEtY2FydC1zdGF0dXNdJyk7XHJcbiAgICAgICAgdGhpcy4kY2FydFRvdGFscyA9ICQoJ1tkYXRhLWNhcnQtdG90YWxzXScpO1xyXG4gICAgICAgIHRoaXMuJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zID0gJCgnW2RhdGEtY2FydC1hZGRpdGlvbmFsLWNoZWNrb3V0LWJ1dHRvbnNdJyk7XHJcbiAgICAgICAgdGhpcy4kb3ZlcmxheSA9ICQoJ1tkYXRhLWNhcnRdIC5sb2FkaW5nT3ZlcmxheScpXHJcbiAgICAgICAgICAgIC5oaWRlKCk7IC8vIFRPRE86IHRlbXBvcmFyeSB1bnRpbCByb3BlciBwdWxscyBpbiBoaXMgY2FydCBjb21wb25lbnRzXHJcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1JZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLmN1c3RvbUNhcnQgPSB0aGlzLmNvbnRleHQuaXRzQ29uZmlnLmN1c3RvbV9jYXJ0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXN0b21DYXJ0KSB7XHJcbiAgICAgICAgICAgIGZsb2F0aW5nQ2hlY2tvdXRCdXR0b24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2FydFBhZ2VVcHNlbGwgPSBuZXcgQ2FydFBhZ2VVcHNlbGwodGhpcy5jb250ZXh0KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRBcHBsZVBheVN1cHBvcnQoKTtcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBcHBsZVBheVN1cHBvcnQoKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5BcHBsZVBheVNlc3Npb24pIHtcclxuICAgICAgICAgICAgdGhpcy4kY2FydFBhZ2VDb250ZW50LmFkZENsYXNzKCdhcHBsZS1wYXktc3VwcG9ydGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhcnRVcGRhdGUoJHRhcmdldCkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICR0YXJnZXQuZGF0YSgnY2FydEl0ZW1pZCcpO1xyXG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtSWQgPSBpdGVtSWQ7XHJcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xyXG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHBhcnNlSW50KCRlbC52YWwoKSwgMTApO1xyXG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XHJcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcclxuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XHJcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xyXG4gICAgICAgIGNvbnN0IG5ld1F0eSA9ICR0YXJnZXQuZGF0YSgnYWN0aW9uJykgPT09ICdpbmMnID8gb2xkUXR5ICsgMSA6IG9sZFF0eSAtIDE7XHJcbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxyXG4gICAgICAgIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXhFcnJvcixcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XHJcblxyXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XHJcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCA9IG51bGwpIHtcclxuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcclxuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xyXG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XHJcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcclxuICAgICAgICBjb25zdCBvbGRRdHkgPSBwcmVWYWwgIT09IG51bGwgPyBwcmVWYWwgOiBtaW5RdHk7XHJcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xyXG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcclxuICAgICAgICBjb25zdCBuZXdRdHkgPSBwYXJzZUludChOdW1iZXIoJGVsLnZhbCgpKSwgMTApO1xyXG4gICAgICAgIGxldCBpbnZhbGlkRW50cnk7XHJcblxyXG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcclxuICAgICAgICBpZiAoIW5ld1F0eSkge1xyXG4gICAgICAgICAgICBpbnZhbGlkRW50cnkgPSAkZWwudmFsKCk7XHJcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLmNvbnRleHQuaW52YWxpZEVudHJ5TWVzc2FnZS5yZXBsYWNlKCdbRU5UUlldJywgaW52YWxpZEVudHJ5KSxcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobmV3UXR5IDwgbWluUXR5KSB7XHJcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcclxuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IG1heEVycm9yLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcclxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xyXG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpIHtcclxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcclxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhcnRFZGl0T3B0aW9ucyhpdGVtSWQsIHByb2R1Y3RJZCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7IHByb2R1Y3RGb3JDaGFuZ2VJZDogcHJvZHVjdElkLCAuLi50aGlzLmNvbnRleHQgfTtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy4kbW9kYWwgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy4kbW9kYWwgPSAkKCcjbW9kYWwnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvY29uZmlndXJlLXByb2R1Y3QnLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1vZGFsLm9wZW4oKTtcclxuICAgICAgICB0aGlzLiRtb2RhbC5maW5kKCcubW9kYWwtY29udGVudCcpLmFkZENsYXNzKCdoaWRlLWNvbnRlbnQnKTtcclxuXHJcbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLmNvbmZpZ3VyZUluQ2FydChpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIgPSAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZXMtd3JhcHBlcl0nLCB0aGlzLiRtb2RhbCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCA9ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkcHJvZHVjdE9wdGlvbnNDb250YWluZXIubGVuZ3RoICYmIG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLmNzcygnaGVpZ2h0JywgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuJG1vZGFsLmhhc0NsYXNzKCdvcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbkNoYW5nZUhhbmRsZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJG1vZGFsLm9uZShNb2RhbEV2ZW50cy5vcGVuZWQsIG9wdGlvbkNoYW5nZUhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzID0gbmV3IENhcnRJdGVtRGV0YWlscyh0aGlzLiRtb2RhbCwgY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHV0aWxzLmhvb2tzLm9uKCdwcm9kdWN0LW9wdGlvbi1jaGFuZ2UnLCAoZXZlbnQsIGN1cnJlbnRUYXJnZXQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJGZvcm0gPSAkKGN1cnJlbnRUYXJnZXQpLmZpbmQoJ2Zvcm0nKTtcclxuICAgICAgICAgICAgY29uc3QgJHN1Ym1pdCA9ICQoJ2lucHV0LmJ1dHRvbicsICRmb3JtKTtcclxuICAgICAgICAgICAgY29uc3QgJG1lc3NhZ2VCb3ggPSAkKCcuYWxlcnRNZXNzYWdlQm94Jyk7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksIChlcnIsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBlcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ3AuYWxlcnRCb3gtbWVzc2FnZScsICRtZXNzYWdlQm94KS50ZXh0KGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEucHVyY2hhc2FibGUgfHwgIWRhdGEuaW5zdG9jaykge1xyXG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaENvbnRlbnQocmVtb3ZlKSB7XHJcbiAgICAgICAgY29uc3QgJGNhcnRJdGVtc1Jvd3MgPSAkKCdbZGF0YS1pdGVtLXJvd10nLCB0aGlzLiRjYXJ0Q29udGVudCk7XHJcbiAgICAgICAgY29uc3QgJGNhcnRQYWdlVGl0bGUgPSAkKCdbZGF0YS1jYXJ0LXBhZ2UtdGl0bGVdJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLmN1c3RvbUNhcnQgPyAnY3VzdG9tL2NhcnQvY29udGVudCcgOiAnY2FydC9jb250ZW50JyxcclxuICAgICAgICAgICAgICAgIHRvdGFsczogdGhpcy5jdXN0b21DYXJ0ID8gJ2N1c3RvbS9jYXJ0L3RvdGFscycgOiAnY2FydC90b3RhbHMnLFxyXG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiAnY2FydC9wYWdlLXRpdGxlJyxcclxuICAgICAgICAgICAgICAgIHN0YXR1c01lc3NhZ2VzOiAnY2FydC9zdGF0dXMtbWVzc2FnZXMnLFxyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbENoZWNrb3V0QnV0dG9uczogJ2NhcnQvYWRkaXRpb25hbC1jaGVja291dC1idXR0b25zJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGxhc3QgaXRlbSBmcm9tIGNhcnQ/IFJlbG9hZFxyXG4gICAgICAgIGlmIChyZW1vdmUgJiYgJGNhcnRJdGVtc1Jvd3MubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDb250ZW50KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJGNhcnRDb250ZW50Lmh0bWwocmVzcG9uc2UuY29udGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNhcnRUb3RhbHMuaHRtbChyZXNwb25zZS50b3RhbHMpO1xyXG4gICAgICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMuaHRtbChyZXNwb25zZS5zdGF0dXNNZXNzYWdlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zLmh0bWwocmVzcG9uc2UuYWRkaXRpb25hbENoZWNrb3V0QnV0dG9ucyk7XHJcblxyXG4gICAgICAgICAgICAkY2FydFBhZ2VUaXRsZS5yZXBsYWNlV2l0aChyZXNwb25zZS5wYWdlVGl0bGUpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9ICQoJ1tkYXRhLWNhcnQtcXVhbnRpdHldJywgdGhpcy4kY2FydENvbnRlbnQpLmRhdGEoJ2NhcnRRdWFudGl0eScpIHx8IDA7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XHJcblxyXG4gICAgICAgICAgICAkKGBbZGF0YS1jYXJ0LWl0ZW1pZD0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkfSddYCwgdGhpcy4kY2FydENvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGBbZGF0YS1hY3Rpb249JyR7dGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb259J11gKVxyXG4gICAgICAgICAgICAgICAgLnRyaWdnZXIoJ2ZvY3VzJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZENhcnRFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgZGVib3VuY2VUaW1lb3V0ID0gNDAwO1xyXG4gICAgICAgIGNvbnN0IGNhcnRVcGRhdGUgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XHJcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGNhcnRSZW1vdmVJdGVtID0gYmluZChkZWJvdW5jZSh0aGlzLmNhcnRSZW1vdmVJdGVtLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcclxuICAgICAgICBsZXQgcHJlVmFsO1xyXG5cclxuICAgICAgICAvLyBjYXJ0IHVwZGF0ZVxyXG4gICAgICAgICQoJ1tkYXRhLWNhcnQtdXBkYXRlXScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XHJcbiAgICAgICAgICAgIGNhcnRVcGRhdGUoJHRhcmdldCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGNhcnQgcXR5IG1hbnVhbGx5IHVwZGF0ZXNcclxuICAgICAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbignZm9jdXMnLCBmdW5jdGlvbiBvblF0eUZvY3VzKCkge1xyXG4gICAgICAgICAgICBwcmVWYWwgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pLmNoYW5nZShldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcclxuICAgICAgICAgICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmNhcnQtcmVtb3ZlJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjYXJ0SXRlbWlkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybURlbGV0ZScpO1xyXG4gICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IHRoaXMuY29udGV4dC5jYW5jZWxCdXR0b25UZXh0LFxyXG4gICAgICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaXRlbSBmcm9tIGNhcnRcclxuICAgICAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnW2RhdGEtaXRlbS1lZGl0XScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUVkaXQnKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcm9kdWN0SWQnKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy8gZWRpdCBpdGVtIGluIGNhcnRcclxuICAgICAgICAgICAgdGhpcy5jYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRQcm9tb0NvZGVFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgJGNvdXBvbkNvbnRhaW5lciA9ICQoJy5jb3Vwb24tY29kZScpO1xyXG4gICAgICAgIGNvbnN0ICRjb3Vwb25Gb3JtID0gJCgnLmNvdXBvbi1mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgJGNvZGVJbnB1dCA9ICQoJ1tuYW1lPVwiY291cG9uY29kZVwiXScsICRjb3Vwb25Gb3JtKTtcclxuXHJcbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLnNob3coKTtcclxuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLnNob3coKTtcclxuICAgICAgICAgICAgJGNvZGVJbnB1dC50cmlnZ2VyKCdmb2N1cycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRjb3Vwb25Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY29kZUlucHV0LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcclxuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY29kZUlucHV0LmRhdGEoJ2Vycm9yJyksXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUNvZGUoY29kZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpIHtcclxuICAgICAgICBjb25zdCAkY2VydENvbnRhaW5lciA9ICQoJy5naWZ0LWNlcnRpZmljYXRlLWNvZGUnKTtcclxuICAgICAgICBjb25zdCAkY2VydEZvcm0gPSAkKCcuY2FydC1naWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcclxuICAgICAgICBjb25zdCAkY2VydElucHV0ID0gJCgnW25hbWU9XCJjZXJ0Y29kZVwiXScsICRjZXJ0Rm9ybSk7XHJcblxyXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS50b2dnbGUoKTtcclxuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS50b2dnbGUoKTtcclxuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRjZXJ0Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNlcnRJbnB1dC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNoZWNrSXNHaWZ0Q2VydFZhbGlkKGNvZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSh0aGlzLmNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdmFsaWRhdGlvbkRpY3Rpb25hcnkuaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlHaWZ0Q2VydGlmaWNhdGUoY29kZSwgKGVyciwgcmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogcmVzcC5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xyXG5cclxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdpdGVtR2lmdHdyYXAnKTtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyhpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XHJcbiAgICAgICAgJCgnLmdpZnRXcmFwcGluZy1zZWxlY3QnKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkc2VsZWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICRzZWxlY3QuZGF0YSgnaW5kZXgnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYWxsb3dNZXNzYWdlID0gJHNlbGVjdC5maW5kKGBvcHRpb25bdmFsdWU9JHtpZH1dYCkuZGF0YSgnYWxsb3dNZXNzYWdlJyk7XHJcblxyXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9LSR7aWR9YCkuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0JykudHJpZ2dlcignY2hhbmdlJyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICQoJ2lucHV0OnJhZGlvW25hbWUgPVwiZ2lmdHdyYXB0eXBlXCJdOmNoZWNrZWQnKS52YWwoKTtcclxuICAgICAgICAgICAgY29uc3QgJHNpbmdsZUZvcm0gPSAkKCcuZ2lmdFdyYXBwaW5nLXNpbmdsZScpO1xyXG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnc2FtZScpIHtcclxuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcclxuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uaGlkZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJG11bHRpRm9ybS5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJ1tuYW1lPVwiZ2lmdHdyYXB0eXBlXCJdJykub24oJ2NsaWNrJywgdG9nZ2xlVmlld3MpO1xyXG5cclxuICAgICAgICB0b2dnbGVWaWV3cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5iaW5kQ2FydEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBpbml0aWF0ZSBzaGlwcGluZyBlc3RpbWF0b3IgbW9kdWxlXHJcbiAgICAgICAgY29uc3Qgc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0ge1xyXG4gICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmNvbnRleHQuc2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlLFxyXG4gICAgICAgICAgICBwcm92aW5jZTogdGhpcy5jb250ZXh0LnNoaXBwaW5nUHJvdmluY2VFcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSwgc2hpcHBpbmdFcnJvck1lc3NhZ2VzKTtcclxuXHJcbiAgICAgICAgLy8gcmVsb2FkIGNhcnQgY29udGVudCB3aGVuIGEgQ2FydCBQYWdlIFVwc2VsbCBpdGVtIGlzIGFkZGVkIHRvIHRoZSBjYXJ0XHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NwdS1yZWZyZXNoLWNhcnQtY29udGVudCcsICgpID0+IHRoaXMucmVmcmVzaENvbnRlbnQoZmFsc2UpKTtcclxuXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHN0YXRlQ291bnRyeSBmcm9tICcuLi9jb21tb24vc3RhdGUtY291bnRyeSc7XHJcbmltcG9ydCBub2QgZnJvbSAnLi4vY29tbW9uL25vZCc7XHJcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvcnMsIGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XHJcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi4vY29tbW9uL2NvbGxhcHNpYmxlJztcclxuaW1wb3J0IHN3YWwgZnJvbSAnLi4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXBwaW5nRXN0aW1hdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50LCBzaGlwcGluZ0Vycm9yTWVzc2FnZXMpIHtcclxuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuJHN0YXRlID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJywgdGhpcy4kZWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcyA9IHNoaXBwaW5nRXJyb3JNZXNzYWdlcztcclxuICAgICAgICB0aGlzLmluaXRGb3JtVmFsaWRhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuYmluZEVzdGltYXRvckV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRGb3JtVmFsaWRhdGlvbigpIHtcclxuICAgICAgICBjb25zdCBzaGlwcGluZ0VzdGltYXRvckFsZXJ0ID0gJCgnLnNoaXBwaW5nLXF1b3RlcycpO1xyXG5cclxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gJ2Zvcm1bZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJztcclxuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yID0gbm9kKHtcclxuICAgICAgICAgICAgc3VibWl0OiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSAuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0YCxcclxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0JywgdGhpcy4kZWxlbWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAvLyBlc3RpbWF0b3IgZXJyb3IgbWVzc2FnZXMgYXJlIGJlaW5nIGluamVjdGVkIGluIGh0bWwgYXMgYSByZXN1bHRcclxuICAgICAgICAgICAgLy8gb2YgdXNlciBzdWJtaXQ7IGNsZWFyaW5nIGFuZCBhZGRpbmcgcm9sZSBvbiBzdWJtaXQgcHJvdmlkZXNcclxuICAgICAgICAgICAgLy8gcmVndWxhciBhbm5vdW5jZW1lbnQgb2YgdGhlc2UgZXJyb3IgbWVzc2FnZXNcclxuICAgICAgICAgICAgaWYgKHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQuYXR0cigncm9sZScpKSB7XHJcbiAgICAgICAgICAgICAgICBzaGlwcGluZ0VzdGltYXRvckFsZXJ0LnJlbW92ZUF0dHIoJ3JvbGUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5hdHRyKCdyb2xlJywgJ2FsZXJ0Jyk7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gc3dpdGNoaW5nIGJldHdlZW4gY291bnRyaWVzLCB0aGUgc3RhdGUvcmVnaW9uIGlzIGR5bmFtaWNcclxuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIGEgY2hlY2sgZm9yIGFsbCBmaWVsZHMgd2hlbiBjb3VudHJ5IGhhcyBhIHZhbHVlXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBhcmVBbGwoJ3ZhbGlkJykgd2lsbCBjaGVjayBjb3VudHJ5IGZvciB2YWxpZGl0eVxyXG4gICAgICAgICAgICBpZiAoJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gKS52YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuYmluZFZhbGlkYXRpb24oKTtcclxuICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcclxuICAgICAgICB0aGlzLmJpbmRVUFNSYXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRWYWxpZGF0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWAsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudHJ5SWQgPSBOdW1iZXIodmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudHJ5SWQgIT09IDAgJiYgIU51bWJlci5pc05hTihjb3VudHJ5SWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5zaGlwcGluZ0Vycm9yTWVzc2FnZXMuY291bnRyeSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kU3RhdGVWYWxpZGF0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRlbGUgPSAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZVZhbCA9ICRlbGUudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBlbGVWYWwgJiYgZWxlVmFsLmxlbmd0aCAmJiBlbGVWYWwgIT09ICdTdGF0ZS9wcm92aW5jZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5zaGlwcGluZ0Vycm9yTWVzc2FnZXMucHJvdmluY2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGUgYmV0d2VlbiBkZWZhdWx0IHNoaXBwaW5nIGFuZCB1cHMgc2hpcHBpbmcgcmF0ZXNcclxuICAgICAqL1xyXG4gICAgYmluZFVQU1JhdGVzKCkge1xyXG4gICAgICAgIGNvbnN0IFVQU1JhdGVUb2dnbGUgPSAnLmVzdGltYXRvci1mb3JtLXRvZ2dsZVVQU1JhdGUnO1xyXG5cclxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgVVBTUmF0ZVRvZ2dsZSwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtVXBzID0gJCgnLmVzdGltYXRvci1mb3JtLS11cHMnKTtcclxuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1EZWZhdWx0ID0gJCgnLmVzdGltYXRvci1mb3JtLS1kZWZhdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1VcHMudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcclxuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1EZWZhdWx0LnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpIHtcclxuICAgICAgICBsZXQgJGxhc3Q7XHJcblxyXG4gICAgICAgIC8vIFJlcXVlc3RzIHRoZSBzdGF0ZXMgZm9yIGEgY291bnRyeSB3aXRoIEFKQVhcclxuICAgICAgICBzdGF0ZUNvdW50cnkodGhpcy4kc3RhdGUsIHRoaXMuY29udGV4dCwgeyB1c2VJZEZvclN0YXRlczogdHJ1ZSB9LCAoZXJyLCBmaWVsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGVycixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRmaWVsZCA9ICQoZmllbGQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuZ2V0U3RhdHVzKHRoaXMuJHN0YXRlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKHRoaXMuJHN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCRsYXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkZmllbGQuaXMoJ3NlbGVjdCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkbGFzdCA9IGZpZWxkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU3RhdGVWYWxpZGF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkZmllbGQuYXR0cigncGxhY2Vob2xkZXInLCAnU3RhdGUvcHJvdmluY2UnKTtcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY2xlYW5VcFN0YXRlVmFsaWRhdGlvbihmaWVsZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFdoZW4geW91IGNoYW5nZSBhIGNvdW50cnksIHlvdSBzd2FwIHRoZSBzdGF0ZS9wcm92aW5jZSBiZXR3ZWVuIGFuIGlucHV0IGFuZCBhIHNlbGVjdCBkcm9wZG93blxyXG4gICAgICAgICAgICAvLyBOb3QgYWxsIGNvdW50cmllcyByZXF1aXJlIHRoZSBwcm92aW5jZSB0byBiZSBmaWxsZWRcclxuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byByZW1vdmUgdGhpcyBjbGFzcyB3aGVuIHdlIHN3YXAgc2luY2Ugbm9kIHZhbGlkYXRpb24gZG9lc24ndCBjbGVhbnVwIGZvciB1c1xyXG4gICAgICAgICAgICAkKHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IpLmZpbmQoJy5mb3JtLWZpZWxkLS1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2Zvcm0tZmllbGQtLXN1Y2Nlc3MnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUodG9nZ2xlQnV0dG9uLCBidXR0b25TZWxlY3RvciwgJHRvZ2dsZUNvbnRhaW5lcikge1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSA9IChzZWxlY3RvclRvQWN0aXZhdGUpID0+IHtcclxuICAgICAgICAgICAgJCh0b2dnbGVCdXR0b24pLmF0dHIoJ2FyaWEtbGFiZWxsZWRieScsIHNlbGVjdG9yVG9BY3RpdmF0ZSk7XHJcbiAgICAgICAgICAgICQoYnV0dG9uU2VsZWN0b3IpLnRleHQoJChgIyR7c2VsZWN0b3JUb0FjdGl2YXRlfWApLnRleHQoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCkge1xyXG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1jbG9zZScpO1xyXG4gICAgICAgICAgICAkdG9nZ2xlQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlbicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSgnZXN0aW1hdG9yLWFkZCcpO1xyXG4gICAgICAgICAgICAkdG9nZ2xlQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9ICF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXN0aW1hdG9yRXZlbnRzKCkge1xyXG4gICAgICAgIGNvbnN0ICRlc3RpbWF0b3JDb250YWluZXIgPSAkKCcuc2hpcHBpbmctZXN0aW1hdG9yJyk7XHJcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm0gPSAkKCcuZXN0aW1hdG9yLWZvcm0nKTtcclxuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcclxuICAgICAgICAkZXN0aW1hdG9yRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudHJ5X2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXHJcbiAgICAgICAgICAgICAgICBzdGF0ZV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcclxuICAgICAgICAgICAgICAgIGNpdHk6ICQoJ1tuYW1lPVwic2hpcHBpbmctY2l0eVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcclxuICAgICAgICAgICAgICAgIHppcF9jb2RlOiAkKCdbbmFtZT1cInNoaXBwaW5nLXppcFwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRTaGlwcGluZ1F1b3RlcyhwYXJhbXMsICdjYXJ0L3NoaXBwaW5nLXF1b3RlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKCcuc2hpcHBpbmctcXVvdGVzJykuaHRtbChyZXNwb25zZS5jb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBiaW5kIHRoZSBzZWxlY3QgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAkKCcuc2VsZWN0LXNoaXBwaW5nLXF1b3RlJykub24oJ2NsaWNrJywgY2xpY2tFdmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVvdGVJZCA9ICQoJy5zaGlwcGluZy1xdW90ZTpjaGVja2VkJykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuc3VibWl0U2hpcHBpbmdRdW90ZShxdW90ZUlkLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXNob3cnKS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlKGV2ZW50LmN1cnJlbnRUYXJnZXQsICcuc2hpcHBpbmctZXN0aW1hdGUtc2hvd19fYnRuLW5hbWUnLCAkZXN0aW1hdG9yQ29udGFpbmVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xyXG5pbXBvcnQgUHJvZHVjdERldGFpbHNCYXNlLCB7IG9wdGlvbkNoYW5nZURlY29yYXRvciB9IGZyb20gJy4vcHJvZHVjdC1kZXRhaWxzLWJhc2UnO1xyXG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgaXNCcm93c2VySUUsIGNvbnZlcnRJbnRvQXJyYXkgfSBmcm9tICcuL3V0aWxzL2llLWhlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydEl0ZW1EZXRhaWxzIGV4dGVuZHMgUHJvZHVjdERldGFpbHNCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgY29udGV4dCwgcHJvZHVjdEF0dHJpYnV0ZXNEYXRhID0ge30pIHtcclxuICAgICAgICBzdXBlcigkc2NvcGUsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICBjb25zdCAkZm9ybSA9ICQoJyNDYXJ0RWRpdFByb2R1Y3RGaWVsZHNGb3JtJywgdGhpcy4kc2NvcGUpO1xyXG4gICAgICAgIGNvbnN0ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQgPSAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZXMtd3JhcHBlcl0nLCAkZm9ybSk7XHJcbiAgICAgICAgY29uc3QgaGFzT3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuaHRtbCgpLnRyaW0oKS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgaGFzRGVmYXVsdE9wdGlvbnMgPSAkcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ1tkYXRhLWRlZmF1bHRdJykubGVuZ3RoO1xyXG5cclxuICAgICAgICAkcHJvZHVjdE9wdGlvbnNFbGVtZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb3B0aW9uQ2hhbmdlQ2FsbGJhY2sgPSBvcHRpb25DaGFuZ2VEZWNvcmF0b3IuY2FsbCh0aGlzLCBoYXNEZWZhdWx0T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBwcm9kdWN0IGF0dHJpYnV0ZXMuIEFsc28gdXBkYXRlIHRoZSBpbml0aWFsIHZpZXcgaW4gY2FzZSBpdGVtcyBhcmUgb29zXHJcbiAgICAgICAgLy8gb3IgaGF2ZSBkZWZhdWx0IHZhcmlhbnQgcHJvcGVydGllcyB0aGF0IGNoYW5nZSB0aGUgdmlld1xyXG4gICAgICAgIGlmICgoaXNFbXB0eShwcm9kdWN0QXR0cmlidXRlc0RhdGEpIHx8IGhhc0RlZmF1bHRPcHRpb25zKSAmJiBoYXNPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IHRoaXMuY29udGV4dC5wcm9kdWN0Rm9yQ2hhbmdlSWQ7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksICdwcm9kdWN0cy9idWxrLWRpc2NvdW50LXJhdGVzJywgb3B0aW9uQ2hhbmdlQ2FsbGJhY2spO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UHJvZHVjdFZhcmlhbnQoKSB7XHJcbiAgICAgICAgY29uc3QgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgJC5lYWNoKCQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpLCAoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gdmFsdWUuY2hpbGRyZW5bMF0uaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25UaXRsZSA9IG9wdGlvbkxhYmVsLnNwbGl0KCc6JylbMF0udHJpbSgpO1xyXG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IG9wdGlvbkxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3JlcXVpcmVkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB2YWx1ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgodHlwZSA9PT0gJ2lucHV0LWZpbGUnIHx8IHR5cGUgPT09ICdpbnB1dC10ZXh0JyB8fCB0eXBlID09PSAnaW5wdXQtbnVtYmVyJykgJiYgdmFsdWUucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAndGV4dGFyZWEnICYmIHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJykudmFsdWUgPT09ICcnICYmIHJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NhdGlzZmllZCA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLmV2ZXJ5KChzZWxlY3QpID0+IHNlbGVjdC5zZWxlY3RlZEluZGV4ICE9PSAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTYXRpc2ZpZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkubWFwKCh4KSA9PiB4LnZhbHVlKS5qb2luKCctJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2RhdGVTdHJpbmd9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1zZWxlY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3QgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSBzZWxlY3Quc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtzZWxlY3Qub3B0aW9uc1tzZWxlY3RlZEluZGV4XS5pbm5lclRleHR9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdzd2F0Y2gnIHx8IHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcgfHwgdHlwZSA9PT0gJ3Byb2R1Y3QtbGlzdCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0VmFyaWFudHNsaXN0ID0gY29udmVydEludG9BcnJheSh2YWx1ZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQgPSBpbnB0ID0+IGlucHQuZGF0YXNldC5wcm9kdWN0QXR0cmlidXRlVmFsdWUgPT09IGNoZWNrZWQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9kdWN0VmFyaWFudHNsaXN0LmZpbHRlcihtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0KVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3Byb2R1Y3QtbGlzdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpc0Jyb3dzZXJJRSA/IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwoKS5pbm5lclRleHQudHJpbSgpIDogY2hlY2tlZC5sYWJlbHNbMF0uaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzd2F0Y2gnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gaXNCcm93c2VySUUgPyBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsKCkuY2hpbGRyZW5bMF0gOiBjaGVja2VkLmxhYmVsc1swXS5jaGlsZHJlblswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWwudGl0bGV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06WWVzYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9Ok5vYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcHJvZHVjdFZhcmlhbnQgPSB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLmxlbmd0aCA9PT0gMCA/IG9wdGlvbnMuc29ydCgpLmpvaW4oJywgJykgOiAndW5zYXRpc2ZpZWQnO1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSAkKCcubW9kYWwtaGVhZGVyLXRpdGxlJyk7XHJcblxyXG4gICAgICAgIGlmIChwcm9kdWN0VmFyaWFudCkge1xyXG4gICAgICAgICAgICBwcm9kdWN0VmFyaWFudCA9IHByb2R1Y3RWYXJpYW50ID09PSAndW5zYXRpc2ZpZWQnID8gJycgOiBwcm9kdWN0VmFyaWFudDtcclxuICAgICAgICAgICAgaWYgKHZpZXcuYXR0cignZGF0YS1ldmVudC10eXBlJykpIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuYXR0cignZGF0YS1wcm9kdWN0LXZhcmlhbnQnLCBwcm9kdWN0VmFyaWFudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0TmFtZSA9IHZpZXcuaHRtbCgpLm1hdGNoKC8nKC4qPyknLylbMV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkID0gJChgW2RhdGEtbmFtZT1cIiR7cHJvZHVjdE5hbWV9XCJdYCk7XHJcbiAgICAgICAgICAgICAgICBjYXJkLmF0dHIoJ2RhdGEtcHJvZHVjdC12YXJpYW50JywgcHJvZHVjdFZhcmlhbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZSBvciBtYXJrIGFzIHVuYXZhaWxhYmxlIG91dCBvZiBzdG9jayBhdHRyaWJ1dGVzIGlmIGVuYWJsZWRcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBQcm9kdWN0IGF0dHJpYnV0ZSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpIHtcclxuICAgICAgICBzdXBlci51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuZmluZCgnLm1vZGFsLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnaGlkZS1jb250ZW50Jyk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNlcnQpIHtcclxuICAgIGlmICh0eXBlb2YgY2VydCAhPT0gJ3N0cmluZycgfHwgY2VydC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIGFueSBjdXN0b20gZ2lmdCBjZXJ0aWZpY2F0ZSB2YWxpZGF0aW9uIGxvZ2ljIGhlcmVcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IGluc2VydFN0YXRlSGlkZGVuRmllbGQgfSBmcm9tICcuL3V0aWxzL2Zvcm0tdXRpbHMnO1xyXG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XHJcblxyXG4vKipcclxuICogSWYgdGhlcmUgYXJlIG5vIG9wdGlvbnMgZnJvbSBiY2FwcCwgYSB0ZXh0IGZpZWxkIHdpbGwgYmUgc2VudC4gVGhpcyB3aWxsIGNyZWF0ZSBhIHNlbGVjdCBlbGVtZW50IHRvIGhvbGQgb3B0aW9ucyBhZnRlciB0aGUgcmVtb3RlIHJlcXVlc3QuXHJcbiAqIEByZXR1cm5zIHtqUXVlcnl8SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5mdW5jdGlvbiBtYWtlU3RhdGVSZXF1aXJlZChzdGF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcclxuICAgIGNvbnN0IGF0dHJzID0gXy50cmFuc2Zvcm0oc3RhdGVFbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHJlc3VsdDtcclxuICAgICAgICByZXRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcclxuICAgICAgICBpZDogYXR0cnMuaWQsXHJcbiAgICAgICAgJ2RhdGEtbGFiZWwnOiBhdHRyc1snZGF0YS1sYWJlbCddLFxyXG4gICAgICAgIGNsYXNzOiAnZm9ybS1zZWxlY3QnLFxyXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXHJcbiAgICAgICAgJ2RhdGEtZmllbGQtdHlwZSc6IGF0dHJzWydkYXRhLWZpZWxkLXR5cGUnXSxcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxzZWxlY3Q+PC9zZWxlY3Q+JywgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzKSk7XHJcblxyXG4gICAgY29uc3QgJG5ld0VsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcclxuICAgIGNvbnN0ICRoaWRkZW5JbnB1dCA9ICQoJ1tuYW1lKj1cIkZvcm1GaWVsZElzVGV4dFwiXScpO1xyXG5cclxuICAgIGlmICgkaGlkZGVuSW5wdXQubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgJGhpZGRlbklucHV0LnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAvLyBTdHJpbmcgaXMgaW5qZWN0ZWQgZnJvbSBsb2NhbGl6ZXJcclxuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuYXBwZW5kKGA8c21hbGw+JHtjb250ZXh0LnJlcXVpcmVkfTwvc21hbGw+YCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJZiBhIGNvdW50cnkgd2l0aCBzdGF0ZXMgaXMgdGhlIGRlZmF1bHQsIGEgc2VsZWN0IHdpbGwgYmUgc2VudCxcclxuICogSW4gdGhpcyBjYXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBzd2l0Y2ggdG8gYW4gaW5wdXQgZmllbGQgYW5kIGhpZGUgdGhlIHJlcXVpcmVkIGZpZWxkXHJcbiAqL1xyXG5mdW5jdGlvbiBtYWtlU3RhdGVPcHRpb25hbChzdGF0ZUVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGF0dHJzID0gXy50cmFuc2Zvcm0oc3RhdGVFbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHJlc3VsdDtcclxuICAgICAgICByZXRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgIGlkOiBhdHRycy5pZCxcclxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXHJcbiAgICAgICAgY2xhc3M6ICdmb3JtLWlucHV0JyxcclxuICAgICAgICBuYW1lOiBhdHRycy5uYW1lLFxyXG4gICAgICAgICdkYXRhLWZpZWxkLXR5cGUnOiBhdHRyc1snZGF0YS1maWVsZC10eXBlJ10sXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8aW5wdXQgLz4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcclxuXHJcbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xyXG5cclxuICAgIGlmICgkbmV3RWxlbWVudC5sZW5ndGggIT09IDApIHtcclxuICAgICAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKCRuZXdFbGVtZW50KTtcclxuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICRuZXdFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogQWRkcyB0aGUgYXJyYXkgb2Ygb3B0aW9ucyBmcm9tIHRoZSByZW1vdGUgcmVxdWVzdCB0byB0aGUgbmV3bHkgY3JlYXRlZCBzZWxlY3QgYm94LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVzQXJyYXlcclxuICogQHBhcmFtIHtqUXVlcnl9ICRzZWxlY3RFbGVtZW50XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAqL1xyXG5mdW5jdGlvbiBhZGRPcHRpb25zKHN0YXRlc0FycmF5LCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gW107XHJcblxyXG4gICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCJcIj4ke3N0YXRlc0FycmF5LnByZWZpeH08L29wdGlvbj5gKTtcclxuXHJcbiAgICBpZiAoIV8uaXNFbXB0eSgkc2VsZWN0RWxlbWVudCkpIHtcclxuICAgICAgICBfLmVhY2goc3RhdGVzQXJyYXkuc3RhdGVzLCAoc3RhdGVPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudXNlSWRGb3JTdGF0ZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiJHtzdGF0ZU9iai5pZH1cIj4ke3N0YXRlT2JqLm5hbWV9PC9vcHRpb24+YCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIiR7c3RhdGVPYmoubmFtZX1cIj4ke3N0YXRlT2JqLmxhYmVsID8gc3RhdGVPYmoubGFiZWwgOiBzdGF0ZU9iai5uYW1lfTwvb3B0aW9uPmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRzZWxlY3RFbGVtZW50Lmh0bWwoY29udGFpbmVyLmpvaW4oJyAnKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge2pRdWVyeX0gc3RhdGVFbGVtZW50XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGVFbGVtZW50LCBjb250ZXh0ID0ge30sIG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcbiAgICAvKipcclxuICAgICAqIEJhY2t3YXJkcyBjb21wYXRpYmxlIGZvciB0aHJlZSBwYXJhbWV0ZXJzIGluc3RlYWQgb2YgZm91clxyXG4gICAgICpcclxuICAgICAqIEF2YWlsYWJsZSBvcHRpb25zOlxyXG4gICAgICpcclxuICAgICAqIHVzZUlkRm9yU3RhdGVzIHtCb29sfSAtIEdlbmVyYXRlcyBzdGF0ZXMgZHJvcGRvd24gdXNpbmcgaWQgZm9yIHZhbHVlcyBpbnN0ZWFkIG9mIHN0cmluZ3NcclxuICAgICAqL1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cclxuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XHJcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cclxuICAgIH1cclxuXHJcbiAgICAkKCdzZWxlY3RbZGF0YS1maWVsZC10eXBlPVwiQ291bnRyeVwiXScpLm9uKCdjaGFuZ2UnLCBldmVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgY291bnRyeU5hbWUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xyXG5cclxuICAgICAgICBpZiAoY291bnRyeU5hbWUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHV0aWxzLmFwaS5jb3VudHJ5LmdldEJ5TmFtZShjb3VudHJ5TmFtZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoY29udGV4dC5zdGF0ZV9lcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgJGN1cnJlbnRJbnB1dCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkocmVzcG9uc2UuZGF0YS5zdGF0ZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZWxlbWVudCBtYXkgaGF2ZSBiZWVuIHJlcGxhY2VkIHdpdGggYSBzZWxlY3QsIHJlc2VsZWN0IGl0XHJcbiAgICAgICAgICAgICAgICBjb25zdCAkc2VsZWN0RWxlbWVudCA9IG1ha2VTdGF0ZVJlcXVpcmVkKCRjdXJyZW50SW5wdXQsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFkZE9wdGlvbnMocmVzcG9uc2UuZGF0YSwgJHNlbGVjdEVsZW1lbnQsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgJHNlbGVjdEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IG1ha2VTdGF0ZU9wdGlvbmFsKCRjdXJyZW50SW5wdXQsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIG5ld0VsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcclxuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xyXG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xyXG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXHJcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxyXG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcclxuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcclxuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xyXG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XHJcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbn07XHJcbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBtYWtlT3B0aW9uSWRzVW5pcXVlIGZyb20gJy4vbWFrZS1vcHRpb25zLXVuaXF1ZSc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnRQYWdlVXBzZWxsUHJvZHVjdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUpIHtcclxuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcclxuXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLXdpcmVkJyk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFJhZGlvQXR0cmlidXRlcygpO1xyXG5cclxuICAgICAgICB0aGlzLiRmb3JtID0gJCgnZm9ybScsIHRoaXMuJHNjb3BlKTtcclxuICAgICAgICB0aGlzLiRwcm9kdWN0SWQgPSAkKCdbbmFtZT1cInByb2R1Y3RfaWRcIl0nLCB0aGlzLiRmb3JtKS52YWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy5rZXkgPSAnY3B1JzsgLy8gdW5pcXVlIGluZGVudGlmaWVyIGZvciB0aGlzIGN1c3RvbWl6YXRpb25cclxuXHJcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50ID0gJChgW2RhdGEtJHt0aGlzLmtleX0tb3B0aW9uLWNoYW5nZV1gLCB0aGlzLiRmb3JtKTsgLy8gaWUgPGRpdiBjbGFzcz1cIm9wdGlvbnNcIiBkYXRhLWNwdS1vcHRpb24tY2hhbmdlPlxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvblZpZXcoKTtcclxuICAgICAgICAvLyB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHRoaXMuJHByb2R1Y3RJZCwgdGhpcy4kZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBjb25zdCBhdHRyaWJ1dGVzRGF0YSA9IHJlc3BvbnNlLmRhdGEgfHwge307XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGF0dHJpYnV0ZXNDb250ZW50ID0gcmVzcG9uc2UuY29udGVudCB8fCB7fTtcclxuICAgICAgICAvLyAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhhdHRyaWJ1dGVzRGF0YSk7XHJcbiAgICAgICAgLy8gICAgIC8vIGlmIChoYXNEZWZhdWx0T3B0aW9ucykge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy51cGRhdGVWaWV3KGF0dHJpYnV0ZXNEYXRhLCBhdHRyaWJ1dGVzQ29udGVudCk7XHJcbiAgICAgICAgLy8gICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICB0aGlzLnVwZGF0ZURlZmF1bHRBdHRyaWJ1dGVzRm9yT09TKGF0dHJpYnV0ZXNEYXRhKTtcclxuICAgICAgICAvLyAgICAgLy8gfVxyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgXCJpc1JlcXVpcmVkXCIgdG8gb3B0aW9ucyB0aGF0IGFyZSByZXF1aXJlZFxyXG4gICAgICovXHJcbiAgICBhZGRSZXF1aXJlZENsYXNzdG9PcHRpb25zKCkge1xyXG4gICAgICAgICQoJy5mb3JtLWZpZWxkJywgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50KS50b0FycmF5KCkuZm9yRWFjaChvcHRpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAoJChvcHRpb24pLmZpbmQoJ3NtYWxsOmNvbnRhaW5zKFwiUmVxdWlyZWRcIiknKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQob3B0aW9uKS5hZGRDbGFzcygnaXNSZXF1aXJlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgcHJvZHVjdCBvcHRpb25zIGNoYW5nZXNcclxuICAgICAqL1xyXG4gICAgcHJvZHVjdE9wdGlvbnNDaGFuZ2VkKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgJGNoYW5nZWRPcHRpb24gPSAkKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uUm93ID0gJChldmVudC50YXJnZXQpLnBhcmVudHMoJy5mb3JtLWZpZWxkJyk7XHJcblxyXG4gICAgICAgIC8vIERvIG5vdCB0cmlnZ2VyIGFuIGFqYXggcmVxdWVzdCBpZiBpdCdzIGEgZmlsZSBvciBpZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgRm9ybURhdGFcclxuICAgICAgICBpZiAoJGNoYW5nZWRPcHRpb24uYXR0cigndHlwZScpID09PSAnZmlsZScgfHwgd2luZG93LkZvcm1EYXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlT3B0aW9uVmlldygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gd2FzIGFuIG9wdGlvbiB3aXRoIGEgdmFsdWUgc2VsZWN0ZWQ/XHJcbiAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLnZhbCgpICE9PSAnJykge1xyXG4gICAgICAgICAgICBpZiAoJGNoYW5nZWRPcHRpb24uaXMoJ2lucHV0JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSAkY2hhbmdlZE9wdGlvbi5hdHRyKCd0eXBlJyk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyYWRpbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uc2libGluZ3MoJ2lucHV0JykuYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLnByb3AoJ2NoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvblJvdy5yZW1vdmVDbGFzcygnaXNTZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNoYW5nZWRPcHRpb24uYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi52YWwoKS5sZW5ndGggIT09IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gb3B0aW9uUm93LmFkZENsYXNzKCdpc1NlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogb3B0aW9uUm93LnJlbW92ZUNsYXNzKCdpc1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ3ZhbHVlJywgJGNoYW5nZWRPcHRpb24udmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICgkY2hhbmdlZE9wdGlvbi5pcygnc2VsZWN0JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICRzZWxlY3RlZE9wdGlvbiA9ICRjaGFuZ2VkT3B0aW9uLmZpbmQoYG9wdGlvblt2YWx1ZT1cIiR7JGNoYW5nZWRPcHRpb24udmFsKCl9XCJdYCk7XHJcbiAgICAgICAgICAgICAgICAkc2VsZWN0ZWRPcHRpb24uYXR0cignc2VsZWN0ZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICRzZWxlY3RlZE9wdGlvbi5zaWJsaW5ncygnb3B0aW9uJykuYXR0cignc2VsZWN0ZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBpdCdzIGEgZGF0ZSBzZWxlY3QsIG1ha2Ugc3VyZSBhbGwgMyBzZWxlY3RzIGFyZSBmaWxsZWQgaW4gYmVmb3JlIHNheWluZyBpdCdzIGZpbGxlZCBpblxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ25hbWUnKS5pbmRleE9mKCdtb250aCcpICE9PSAtMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLmF0dHIoJ25hbWUnKS5pbmRleE9mKCdkYXknKSAhPT0gLTEgfHxcclxuICAgICAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi5hdHRyKCduYW1lJykuaW5kZXhPZigneWVhcicpICE9PSAtMVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY291bnQgdGhlIG90aGVyIGRhdGUgZmllbGRzIChpZiBjaGFuZ2VkIG1vbnRoLCBzZWUgaWYgZGF5IGFuZCB5ZWFyIGFyZSBmaWxsZWQgb3V0KVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyU2VsZWN0ZWREYXRlRmllbGRzID0gJGNoYW5nZWRPcHRpb24uc2libGluZ3MoJ3NlbGVjdCcpLnRvQXJyYXkoKS5yZWR1Y2UoKGNvdW50LCBzZWxlY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoc2VsZWN0KS52YWwoKSA9PT0gJydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gY291bnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY291bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBmaWVsZHMgYXJlIGZpbGxlZCBpblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlclNlbGVjdGVkRGF0ZUZpZWxkcyA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25Sb3cuYWRkQ2xhc3MoJ2lzU2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpOyAvLyBpdCdzIG5vdCBhIGRhdGUgc2VsZWN0LCBqdXN0IG1hcmsgdGhlIG9wdGlvbiBhcyBzZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCRjaGFuZ2VkT3B0aW9uLmlzKCd0ZXh0YXJlYScpKSB7XHJcbiAgICAgICAgICAgICAgICAkY2hhbmdlZE9wdGlvbi52YWwoKS5sZW5ndGggIT09IDBcclxuICAgICAgICAgICAgICAgICAgICA/IG9wdGlvblJvdy5hZGRDbGFzcygnaXNTZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25Sb3cucmVtb3ZlQ2xhc3MoJ2lzU2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICRjaGFuZ2VkT3B0aW9uLnRleHQoJGNoYW5nZWRPcHRpb24udmFsKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZWxzZSByZW1vdmUgY2xhc3MgKHRoZXJlIHdhcyBubyB2YWx1ZSBmb3IgdGhpcyBvcHRpb24pXHJcbiAgICAgICAgICAgIG9wdGlvblJvdy5yZW1vdmVDbGFzcygnaXNTZWxlY3RlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jaGVja09wdGlvbnNTZWxlY3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIE1ha2UgQVBJIGNhbGwgb24gb3B0aW9uIGNoYW5nZSB0byB1cGRhdGUgYXZhaWxhYmlsaXR5XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZU9wdGlvblZpZXcoKSAge1xyXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UodGhpcy4kcHJvZHVjdElkLCB0aGlzLiRmb3JtLnNlcmlhbGl6ZSgpLCAncHJvZHVjdHMvYnVsay1kaXNjb3VudC1yYXRlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSA9IHJlc3BvbnNlLmRhdGEgfHwge307XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHN0b2NrIHN0dWZmIChzaG91bGQgd2lyZSB1cCBpbWFnZSBjaGFuZ2UgYXMgd2VsbCBsYXRlcilcclxuICAgICAgICAgICAgLy8gaWYgKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YS5zdG9jayAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAkKCcuY3VycmVudFN0b2NrJywgJHNjb3BlKS50ZXh0KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YS5zdG9jayk7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAkKCcuY3VycmVudFN0b2NrJywgJHNjb3BlKS50ZXh0KCcnKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIENoZWNrIHdoZXRoZXIgYWxsIHJlcXVpcmVkIG9wdGlvbnMgYXJlIHNlbGVjdGVkXHJcbiAgICAgKi9cclxuICAgIGNoZWNrT3B0aW9uc1NlbGVjdGVkKCkgIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICMjIHNlZSBpZiBhbGwgb3B0aW9ucyBhcmUgc2VsZWN0ZWRcclxuICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0IG51bWJlclJlcXVpcmVkT3B0aW9ucyA9IHRoaXMuJHNjb3BlLmZpbmQoJy5mb3JtLWZpZWxkLmlzUmVxdWlyZWQnKS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyU2VsZWN0ZWRPcHRpb25zID0gdGhpcy4kc2NvcGUuZmluZCgnLmZvcm0tZmllbGQuaXNSZXF1aXJlZC5pc1NlbGVjdGVkJykubGVuZ3RoO1xyXG4gICAgICAgIC8vIGNvbnN0ICRhZGRUb0NhcnRCdXR0b24gPSAkZm9ybS5maW5kKCcuY2FyZC1hY3Rpb25zIC5idXR0b24nKTtcclxuICAgICAgICAvLyAkYWRkVG9DYXJ0QnV0dG9uLnJlbW92ZUNsYXNzKCdidXR0b24tLXN1Y2Nlc3MnKTtcclxuICAgICAgICBpZiAobnVtYmVyUmVxdWlyZWRPcHRpb25zID09PSAwIHx8IG51bWJlclJlcXVpcmVkT3B0aW9ucyA8PSBudW1iZXJTZWxlY3RlZE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJyk7IC8vIGFkZCBjbGFzcyB0byBwcm9kdWN0IGZvciBlYXN5IGFkZGluZyB0byBjYXJ0XHJcbiAgICAgICAgICAgICQoJy5jcHVfX21vZGFsJykuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJyk7IC8vIHVwZGF0ZSB0ZXh0IGZvciB1c2VyIGFzIHdlbGxcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5yZW1vdmVDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTsgLy8gcmVtb3ZlIGNsYXNzIHNpbmNlIG5vdCBhbGwgb3B0aW9ucyBmaWxsZWQgaW5cclxuICAgICAgICAgICAgJCgnLmNwdV9fbW9kYWwnKS5yZW1vdmVDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTsgLy8gdXBkYXRlIHRleHQgZm9yIHVzZXIgYXMgd2VsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgdGhlIHZpZXcgb2YgcHJpY2UsIG1lc3NhZ2VzLCBTS1UgYW5kIHN0b2NrIG9wdGlvbnMgd2hlbiBhIHByb2R1Y3Qgb3B0aW9uIGNoYW5nZXNcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBQcm9kdWN0IGF0dHJpYnV0ZSBkYXRhXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVQcmljZVZpZXcocHJpY2UpIHtcclxuICAgICAgICBpZiAocHJpY2Uud2l0aG91dF90YXgpIHtcclxuICAgICAgICAgICAgJChgW2RhdGEtcHJvZHVjdC1wcmljZS13aXRob3V0LXRheF1gLCB0aGlzLiRzY29wZSkuaHRtbChwcmljZS53aXRob3V0X3RheC5mb3JtYXR0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgdmlldyBvZiBwcmljZSwgbWVzc2FnZXMsIFNLVSBhbmQgc3RvY2sgb3B0aW9ucyB3aGVuIGEgcHJvZHVjdCBvcHRpb24gY2hhbmdlc1xyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcclxuICAgICAqL1xyXG4gICAgdXBkYXRlVmlldyhkYXRhKSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIHByaWNlXHJcbiAgICAgICAgLy8gY29uc3Qgdmlld01vZGVsID0gdGhpcy5nZXRWaWV3TW9kZWwodGhpcy4kc2NvcGUpO1xyXG4gICAgICAgIGlmIChfLmlzT2JqZWN0KGRhdGEucHJpY2UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJpY2VWaWV3KGRhdGEucHJpY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB1cGRhdGUgaW1hZ2VcclxuICAgICAgICBjb25zdCBpbWFnZUVsID0gJChgLmNwdV9faXRlbS1pbWdgLCB0aGlzLiRzY29wZSk7XHJcbiAgICAgICAgaWYgKF8uaXNPYmplY3QoZGF0YS5pbWFnZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgaW1hZ2VTcmMgPSBkYXRhLmltYWdlLmRhdGEucmVwbGFjZSgnezpzaXplfScsICczMDB4MzAwJyk7XHJcbiAgICAgICAgICAgIGltYWdlRWwuYXR0cignc3JjJywgaW1hZ2VTcmMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGltYWdlRWwuYXR0cignc3JjJywgaW1hZ2VFbC5kYXRhKCdzcmMnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHVwZGF0ZSBtZXNzYWdlIGlmIHRoZXJlIGlzIG9uZVxyXG4gICAgICAgIGNvbnN0IG9wdGlvbk1lc3NhZ2UgPSBkYXRhLnN0b2NrX21lc3NhZ2UgfHwgZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2U7XHJcbiAgICAgICAgaWYgKG9wdGlvbk1lc3NhZ2UgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IG9wdGlvbk1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLWVycm9yJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUucmVtb3ZlQ2xhc3MoJ2hhc09wdGlvbnMtLWVycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZSBvciBtYXJrIGFzIHVuYXZhaWxhYmxlIG91dCBvZiBzdG9jayBhdHRyaWJ1dGVzIGlmIGVuYWJsZWRcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBQcm9kdWN0IGF0dHJpYnV0ZSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpIHtcclxuICAgICAgICBjb25zdCBiZWhhdmlvciA9IGRhdGEub3V0X29mX3N0b2NrX2JlaGF2aW9yO1xyXG4gICAgICAgIGNvbnN0IGluU3RvY2tJZHMgPSBkYXRhLmluX3N0b2NrX2F0dHJpYnV0ZXM7XHJcbiAgICAgICAgY29uc3Qgb3V0T2ZTdG9ja01lc3NhZ2UgPSBgICgke2RhdGEub3V0X29mX3N0b2NrX21lc3NhZ2V9KWA7XHJcblxyXG4gICAgICAgIGlmIChiZWhhdmlvciAhPT0gJ2hpZGVfb3B0aW9uJyAmJiBiZWhhdmlvciAhPT0gJ2xhYmVsX29wdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGUtdmFsdWVdJywgdGhpcy4kc2NvcGUuYWRkKCcuY3B1X19tb2RhbCcpKS5lYWNoKChpLCBhdHRyaWJ1dGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJGF0dHJpYnV0ZSA9ICQoYXR0cmlidXRlKTtcclxuICAgICAgICAgICAgY29uc3QgYXR0cklkID0gcGFyc2VJbnQoJGF0dHJpYnV0ZS5kYXRhKCdwcm9kdWN0LWF0dHJpYnV0ZS12YWx1ZScpLCAxMCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5TdG9ja0lkcy5pbmRleE9mKGF0dHJJZCkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZVR5cGUoJGF0dHJpYnV0ZSkgPT09ICdzZXQtc2VsZWN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xyXG4gICAgICAgICAgICAkYXR0cmlidXRlLmhpZGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkYXR0cmlidXRlXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3VuYXZhaWxhYmxlJylcclxuICAgICAgICAgICAgICAgIC5wcmV2KCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcclxuICAgICAgICBjb25zdCAkc2VsZWN0ID0gJGF0dHJpYnV0ZS5wYXJlbnQoKTtcclxuXHJcbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XHJcbiAgICAgICAgICAgICRhdHRyaWJ1dGUudG9nZ2xlT3B0aW9uKGZhbHNlKTtcclxuICAgICAgICAgICAgLy8gSWYgdGhlIGF0dHJpYnV0ZSBpcyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGluIGEgc2VsZWN0IGRyb3Bkb3duLCBzZWxlY3QgdGhlIGZpcnN0IG9wdGlvbiAoTUVSQy02MzkpXHJcbiAgICAgICAgICAgIGlmICgkYXR0cmlidXRlLnBhcmVudCgpLnZhbCgpID09PSAkYXR0cmlidXRlLmF0dHIoJ3ZhbHVlJykpIHtcclxuICAgICAgICAgICAgICAgICRzZWxlY3RbMF0uc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkYXR0cmlidXRlLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuaHRtbCgkYXR0cmlidXRlLmh0bWwoKS5yZXBsYWNlKG91dE9mU3RvY2tNZXNzYWdlLCAnJykgKyBvdXRPZlN0b2NrTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGVUeXBlKCRhdHRyaWJ1dGUpID09PSAnc2V0LXNlbGVjdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmVoYXZpb3IgPT09ICdoaWRlX29wdGlvbicpIHtcclxuICAgICAgICAgICAgJGF0dHJpYnV0ZS5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd1bmF2YWlsYWJsZScpXHJcbiAgICAgICAgICAgICAgICAucHJldignaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XHJcbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XHJcbiAgICAgICAgICAgICRhdHRyaWJ1dGUudG9nZ2xlT3B0aW9uKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRhdHRyaWJ1dGUucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgJGF0dHJpYnV0ZS5odG1sKCRhdHRyaWJ1dGUuaHRtbCgpLnJlcGxhY2Uob3V0T2ZTdG9ja01lc3NhZ2UsICcnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEF0dHJpYnV0ZVR5cGUoJGF0dHJpYnV0ZSkge1xyXG4gICAgICAgIGNvbnN0ICRwYXJlbnQgPSAkYXR0cmlidXRlLmNsb3Nlc3QoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpO1xyXG4gICAgICAgIHJldHVybiAkcGFyZW50ID8gJHBhcmVudC5kYXRhKCdwcm9kdWN0LWF0dHJpYnV0ZScpIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbG93IHJhZGlvIGJ1dHRvbnMgdG8gZ2V0IGRlc2VsZWN0ZWRcclxuICAgICAqL1xyXG4gICAgaW5pdFJhZGlvQXR0cmlidXRlcygpIHtcclxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0gaW5wdXRbdHlwZT1cInJhZGlvXCJdJywgdGhpcy4kc2NvcGUpLmVhY2goKGksIHJhZGlvKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRyYWRpbyA9ICQocmFkaW8pO1xyXG5cclxuICAgICAgICAgICAgLy8gT25seSBiaW5kIHRvIGNsaWNrIG9uY2VcclxuICAgICAgICAgICAgaWYgKCRyYWRpby5hdHRyKCdkYXRhLXN0YXRlJykgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgJHJhZGlvLmNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHJhZGlvLmRhdGEoJ3N0YXRlJykgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJhZGlvLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpby5kYXRhKCdzdGF0ZScsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpby5jaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW8uZGF0YSgnc3RhdGUnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFJhZGlvQXR0cmlidXRlcygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRyYWRpby5hdHRyKCdkYXRhLXN0YXRlJywgJHJhZGlvLnByb3AoJ2NoZWNrZWQnKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBiaW5kIGV2ZW50c1xyXG4gICAgICovXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIG1ha2VPcHRpb25JZHNVbmlxdWUodGhpcy4kc2NvcGUsIHRoaXMuJHByb2R1Y3RJZCwgdGhpcy5rZXkpOyAvLyBtYWtlIG9wdGlvbnMgdW5pcXVlIHNvIHRoZXJlIGFlciBubyBjb25mbGljdHMgd2hlbiBzZWxlY3Rpbmcgb3B0aW9uc1xyXG5cclxuICAgICAgICB0aGlzLmFkZFJlcXVpcmVkQ2xhc3N0b09wdGlvbnMoKTsgLy8gYWRkIFwiaXNSZXF1aXJlZFwiIHRvIHJlcXVpcmVkIG9wdGlvbnNcclxuICAgICAgICB0aGlzLmNoZWNrT3B0aW9uc1NlbGVjdGVkKCk7XHJcblxyXG4gICAgICAgIC8vIGxpc3RlbiBmb3Igb3B0aW9uIGNoYW5nZXNcclxuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuY2hhbmdlKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0T3B0aW9uc0NoYW5nZWQoZXZlbnQsIGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LnNob3coKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIG9wdGlvbnMgc2VsZWN0ZWQgb24gbG9hZFxyXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCBjaGVja2JveCBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyBjaGVja2JveCB2YWx1ZXNcclxuICAgICAgICB0aGlzLiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCByYWRpbyBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyByYWRpbyBidXR0b25zIHZhbHVlc1xyXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHVwZGF0ZSBvbiBpbnB1dCB0ZXh0IHRvIGNhdGNoIGFueSBkZWZhdWx0IHZhbHVlc1xyXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IG51bWJlcnMgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXHJcbiAgICAgICAgdGhpcy4kcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ3RleHRhcmVhJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIHRleHRhcmVhIHRwIGNhdGNoIGFueSBkZWZhdWx0IHZhbHVlc1xyXG4gICAgICAgIHRoaXMuJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5wYXJlbnQoKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyBzZWxlY3QgYm94IHZhbHVlc1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQyJztcclxuaW1wb3J0IENhcnRQYWdlVXBzZWxsUHJvZHVjdCBmcm9tICcuL2NhcnQtcGFnZS11cHNlbGwtcHJvZHVjdC1kZXRhaWxzJztcclxuaW1wb3J0IG1ha2VPcHRpb25JZHNVbmlxdWUgZnJvbSAnLi9tYWtlLW9wdGlvbnMtdW5pcXVlJztcclxuaW1wb3J0IGZvcm1hdENhcm91c2VsIGZyb20gJy4uL2NvbW1vbi9jYXJvdXNlbC9pbmRleCc7XHJcbmltcG9ydCB1cHNlbGxTdWl0ZUNQVSBmcm9tICcuL3Vwc2VsbC1hcnJheS1jYXJ0LXBhZ2UnO1xyXG5cclxuaW1wb3J0IG1lZGlhUXVlcnlMaXN0RmFjdG9yeSBmcm9tICcuLi9jb21tb24vbWVkaWEtcXVlcnktbGlzdCc7XHJcblxyXG4vLyAgQXByIDIwMTk6IHVwZGF0ZWQgdmVyc2lvbiBpbmNsdWRlcyBJVFMgVXBzZWxsIFN1aXRlXHJcbmNvbnN0IFZFUlNJT04gPSAnMi4wJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnRQYWdlVXBzZWxsIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnSW50dWl0U29sdXRpb25zLm5ldCAtIENhcnQgUGFnZSBVcHNlbGwnLCBWRVJTSU9OKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvcHRpb25zID0gJ3JlbGF0ZWQnLCAnc2ltaWxhcicsICdjdXN0b20gZmllbGRzJ1xyXG4gICAgICAgICAqIGVycm9yRGVmYXVsdCA9IGJhY2t1cCBtb2RlOyBvbmx5IG5lY2Vzc2FyeSB3aXRoIFVwc2VsbCBTdWl0ZVxyXG4gICAgICAgICAqIC0tIHJlbGF0ZWQgPSBhdXRvbWF0aWNhbGx5IGxvYWRzIHJlbGF0ZWQgcHJvZHVjdHMgZnJvbSBhIHJhbmRvbSBpdGVtIGluIHRoZSBjYXJ0XHJcbiAgICAgICAgICogLS0gc2ltaWxhciA9IGF1dG9tYXRpY2FsbHkgbG9hZHMgc2ltaWxhciBieSB2aWV3IHByb2R1Y3RzIGZyb20gYSByYW5kb20gaXRlbSBpbiB0aGUgY2FydFxyXG4gICAgICAgICAqIC0tIGN1c3RvbSBmaWVsZHMgPSB3aWxsIGxvYWQgdGhlIHByb2R1Y3RzIHNwZWNpZmllZCBieSB0aGUgY2FydCBpdGVtJ3MgY3VzdG9tIGZpZWxkc1xyXG4gICAgICAgICAqIC0tIHVwc2VsbCBzdWl0ZSA9IHdpbGwgbG9hZCBwcm9kdWN0cyBzcGVjaWZpZWQgYnkgVXBzZWxsIFN1aXRlIENTVnNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm1vZGUgPSAndXBzZWxsIHN1aXRlJztcclxuICAgICAgICB0aGlzLmVycm9yRGVmYXVsdCA9ICdyZWxhdGVkJztcclxuICAgICAgICB0aGlzLnNob3dNb2JpbGVJbkNhcm91c2VsID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RMaW1pdCA9IDM7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZyA9ICQoJyNjcHUgLmxvYWRpbmdPdmVybGF5Jyk7XHJcblxyXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQgPSB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkLmJpbmQodXRpbHMuYXBpLnByb2R1Y3QpOyAvLyByZXF1aXJlZCB0byBrZWVwIHNjb3BlIG9mIHV0aWxzIHRvIHRoZSB1dGlsc1xyXG4gICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlID0gdXRpbHMuYXBpLmdldFBhZ2UuYmluZCh1dGlscy5hcGkpOyAvLyByZXF1aXJlZCB0byBrZWVwIHNjb3BlIG9mIHV0aWxzIHRvIHRoZSB1dGlsc1xyXG5cclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBkdXBsaWNhdGUgaXRlbXMgZnJvbSBhcnJheVxyXG4gICAgICpcclxuICAgICAqIHB1bGxlZCBmcm9tIHN0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MjI5NjQ1L3JlbW92ZS1kdXBsaWNhdGUtdmFsdWVzLWZyb20tanMtYXJyYXlcclxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHVwc2VsbFRhcmdldHMgLSBhcnJheSBvZiBpdGVtcyB3ZSB3YW50IHRvIHN0cmlwIG91dCBhbnkgZHVwbGljYXRlIGl0ZW1zIGZyb21cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyh1cHNlbGxUYXJnZXRzKSB7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldCh1cHNlbGxUYXJnZXRzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXQgY2FydCBpdGVtcyBVUkxzIGFuZCBQcm9kdWN0IElkcyBzbyB3ZSBkb24ndCB0cnkgdG8gdXBzZWxsIGFuIGl0ZW0gdGhhdCdzIGFscmVhZHkgaW4gdGhlIGNhcnRcclxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHVwc2VsbFRhcmdldHMgLSBhcnJheSBvZiBpdGVtcyB3ZSB3YW50IHRvIHN0cmlwIG91dCBhbnkgY2FydCBpdGVtIG1hdGNoZXMgZnJvbVxyXG4gICAgICovXHJcbiAgICByZW1vdmVDYXJ0SXRlbVRhcmdldHModXBzZWxsVGFyZ2V0cykge1xyXG4gICAgICAgIC8vIGdldCBhbGwgZGF0YSBmcm9tIHRoZSBjYXJ0IGl0ZW1zXHJcbiAgICAgICAgY29uc3QgY2FydEl0ZW1EYXRhID0gW107XHJcbiAgICAgICAgJCgnW2RhdGEtdXBzZWxsXScpLnRvQXJyYXkoKS5mb3JFYWNoKGNhcnRJdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdHVybCA9ICQoY2FydEl0ZW0pLmRhdGEoJ3Byb2R1Y3QtdXJsJykucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ub3JpZ2luLCAnJykgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9ICQoY2FydEl0ZW0pLmRhdGEoJ3Byb2R1Y3QtaWQnKS50b1N0cmluZygpIHx8ICcnO1xyXG4gICAgICAgICAgICBjYXJ0SXRlbURhdGEucHVzaChwcm9kdWN0dXJsLCBwcm9kdWN0SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIG9ubHkga2VlcCB1cHNlbGwgaXRlbXMgdGhhdCBhcmVuJ3Qgd2l0aGluIG91ciBjYXJ0SXRlbURhdGEgYXJyYXlcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB1cHNlbGxUYXJnZXRzLnJlZHVjZSgodXBzZWxsSXRlbXMsIHVwc2VsbGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhcnRJdGVtRGF0YS5pbmRleE9mKHVwc2VsbGl0ZW0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdXBzZWxsSXRlbXMucHVzaCh1cHNlbGxpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdXBzZWxsSXRlbXM7XHJcbiAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIC8vIHJldHVybiByZXN1bHRcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHJhbmRvbSBpbnQgZ2l2ZW4gYSBtYXhcclxuICAgICAqL1xyXG4gICAgZ2V0UmFuZG9tSW50KG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYXV0b21hdGljYWxseSBsb2FkIHByb2R1Y3RzIGZyb20gdGhlIGNhcnQgaXRlbSdzIGVpdGhlciByZWxhdGVkIHByb2R1Y3RzIG9yIHNpbWlsYXIgYnkgdmlldyBpdGVtc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBcInJlbGF0ZWRcIiBvciBcInNpbWlsYXJcIlxyXG4gICAgICovXHJcbiAgICBsb2FkQXV0b1RhcmdldHModHlwZSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMuZ2V0UmFuZG9tSW50KCQoJy5jYXJ0LWl0ZW0nKS5sZW5ndGgpOyAvLyBnZXQgcmFuZG9tIGl0ZW0gaW5kZXggKHBpY2sgcmFuZG9tIGl0ZW0pXHJcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJCgnLmNhcnQtaXRlbScpLmVxKGl0ZW1JbmRleCB8fCAwKS5kYXRhKCdwcm9kdWN0LWlkJyk7IC8vIGdldCBwcm9kdWN0IGlkIG9mIHRoYXQgcmFuZG9tIGl0ZW1cclxuICAgICAgICBpZiAoaXRlbUlkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJCgnI2NwdScpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2VlIGlmIHdlIGFscmVhZHkgYWpheCdkIGZvciB0aGVzZSB1cHNlbGwgaXRlbXNcclxuICAgICAgICBsZXQgc3RvcmVkRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYGNwdV9faXRlbXMke2l0ZW1JZH1gKSkgfHwgW107XHJcbiAgICAgICAgaWYgKHN0b3JlZERhdGEubGVuZ3RoKSB7IC8vIGlmIGFscmVhZHkgYWpheGVkIGFuZCBzdG9yZWQgdXBzZWxsIGl0ZW1zXHJcbiAgICAgICAgICAgIHN0b3JlZERhdGEgPSB0aGlzLnJlbW92ZUR1cGxpY2F0ZVRhcmdldHMoc3RvcmVkRGF0YSk7IC8vIHJlbW92ZSBkdXBsaWNhdGUgdXBzZWxsIHRhcmdldHNcclxuICAgICAgICAgICAgc3RvcmVkRGF0YSA9IHRoaXMucmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHN0b3JlZERhdGEpOyAvLyByZW1vdmUgYW55IHVwc2VsbCB0YXJnZXRzIHRoYXQgbWF0Y2ggYW4gaXRlbSBhbHJlYWR5IGluIHRoZSBjYXJ0XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFVwc2VsbFRhcmdldHMoc3RvcmVkRGF0YSk7IC8vIGxvYWQgdGhvc2Ugc3RvcmVkIHVwc2VsbCBpdGVtc1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIG90aGVyd2lzZVxyXG4gICAgICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IGBjdXN0b20vY2FydC1wYWdlLXVwc2VsbC10YXJnZXRzLS0ke3R5cGV9YCxcclxuICAgICAgICAgICAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZF9wcm9kdWN0czogeyBsaW1pdDogNzAsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbWlsYXJfYnlfdmlld3M6IHsgbGltaXQ6IDcwLCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQoaXRlbUlkLCBvcHRzLCAoZXJyLCByZXMpID0+IHsgLy8gYWpheCBmb3IgdGhlIGZpcnN0IGl0ZW0ncyB1cHNlbGwgaXRlbXMgKHN1Z2dlc3RlZCBwcm9kdWN0cylcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnI2NwdScpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRzID0gSlNPTi5wYXJzZShyZXMpIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0cyA9IHRoaXMucmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyh0YXJnZXRzKTsgLy8gcmVtb3ZlIGR1cGxpY2F0ZSB1cHNlbGwgdGFyZ2V0c1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0cyA9IHRoaXMucmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHRhcmdldHMpOyAvLyByZW1vdmUgYW55IHVwc2VsbCB0YXJnZXRzIHRoYXQgbWF0Y2ggYW4gaXRlbSBhbHJlYWR5IGluIHRoZSBjYXJ0XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgY3B1X19pdGVtcyR7aXRlbUlkfWAsIEpTT04uc3RyaW5naWZ5KHRhcmdldHMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFVwc2VsbFRhcmdldHModGFyZ2V0cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgYXJyYXkgb2YgdXBzZWxsIHByb2R1Y3QgVVJMcyBhbmQvb3IgSURzXHJcbiAgICAgKi9cclxuICAgIGxvYWRDdXN0b21GaWVsZFRhcmdldHMoKSB7XHJcbiAgICAgICAgbGV0IHRhcmdldHMgPSBbXTtcclxuICAgICAgICAkKCdbZGF0YS11cHNlbGxdJykudG9BcnJheSgpLmZvckVhY2goY2FydEl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB1cHNlbGxJdGVtcyA9ICQoY2FydEl0ZW0pLmRhdGEoJ3Vwc2VsbCcpO1xyXG4gICAgICAgICAgICBpZiAodXBzZWxsSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB1cHNlbGxJdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2godXBzZWxsSXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cHNlbGxJdGVtLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKHVwc2VsbEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBpZiBtb2RlIGlzIHNldCB0byBjdXN0b20gZmllbGRzIGJ1dCBubyBpdGVtcyBoYXZlIGN1c3RvbSBmaWVsZHMgYXBwbGllZCwgZGVmYXVsdCB0byB1c2luZyByZWxhdGVkIHByb2R1Y3RzXHJcbiAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRBdXRvVGFyZ2V0cygncmVsYXRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXRzID0gdGhpcy5yZW1vdmVEdXBsaWNhdGVUYXJnZXRzKHRhcmdldHMpOyAvLyByZW1vdmUgZHVwbGljYXRlIHVwc2VsbCB0YXJnZXRzXHJcbiAgICAgICAgdGFyZ2V0cyA9IHRoaXMucmVtb3ZlQ2FydEl0ZW1UYXJnZXRzKHRhcmdldHMpOyAvLyByZW1vdmUgYW55IHVwc2VsbCB0YXJnZXRzIHRoYXQgbWF0Y2ggYW4gaXRlbSBhbHJlYWR5IGluIHRoZSBjYXJ0XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZFVwc2VsbFRhcmdldHModGFyZ2V0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZENTVlRhcmdldHMgKCkgICAge1xyXG4gICAgICAgIC8vICBnZXQgdGhlIHByZXZpb3VzbHkgQUpBWGVkIHByb2R1Y3RzIGZyb20gc2Vzc2lvblN0b3JhZ2VcclxuICAgICAgICBjb25zdCBjcHVIVE1MdGV4dCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjcHVDYXJkc1wiKTtcclxuICAgICAgICBjb25zdCBjcHVIVE1MID0gdXBzZWxsU3VpdGVDUFUucGFyc2VBcnJheUZyb21TdHJpbmcoY3B1SFRNTHRleHQpO1xyXG5cclxuICAgICAgICAvLyAgaWYgbm90aGluZyBoYXMgYmVlbiBkb3dubG9hZGVkLFxyXG4gICAgICAgIC8vICByZXZlcnQgdG8gYmFja3VwIG1vZGVcclxuICAgICAgICBpZiAoIWNwdUhUTUwubGVuZ3RoKSByZXR1cm4gdGhpcy5sb2FkQXV0b1RhcmdldHModGhpcy5lcnJvckRlZmF1bHQpO1xyXG5cclxuICAgICAgICAvLyAgZGlzcGxheSB0aGUgcHJldmlvdWx5IGRvd25sb2FkZWQgcHJvZHVjdHNcclxuICAgICAgICBjcHVIVE1MLmZvckVhY2goY2FyZCA9PiAkKCcjY3B1IC5jcHVfX2xpc3QtLWN1c3RvbWZpZWxkcycpLmFwcGVuZChjYXJkLmh0bWwpKVxyXG5cclxuICAgICAgICAvLyAgaWYgdGhlcmUgaXMgcm9vbSBmb3IgbW9yZSBwcm9kdWN0cyxcclxuICAgICAgICAvLyAgZmlsbCB0aGUgcmVzdCBvZiB0aGUgYWRkLW9uIGJ5XHJcbiAgICAgICAgLy8gIGFkZGluZyBwcm9kdWN0cyBmcm9tIHRoZSBDU1ZzXHJcbiAgICAgICAgLy8gIG9mIHByb2R1Y3RzIGFscmVhZHkgaW4gdGhlIENQVVxyXG4gICAgICAgIGxldCByZW1haW5pbmdTbG90cyA9IHRoaXMucHJvZHVjdExpbWl0IC0gY3B1SFRNTC5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHJlbWFpbmluZ1Nsb3RzKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IGF3YWl0IHVwc2VsbFN1aXRlQ1BVLmdldEFkZGl0aW9uYWxQcm9kdWN0cyhjcHVIVE1MLm1hcChwcm9kdWN0ID0+IHByb2R1Y3QucHJvZHVjdF9pZCksIHJlbWFpbmluZ1Nsb3RzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRVcHNlbGxUYXJnZXRzKHRhcmdldHMpO1xyXG4gICAgICAgICAgICB9ICAgY2F0Y2goZXJyKSAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNQVSBwYXJzZSBlcnJvcjogXCIsIGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYXBwbHlVcHNlbGxIYW5kbGVycygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmcuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaGFuZGxlIGFkZGluZyBpdGVtcyB0byBjYXJ0XHJcbiAgICAgKi9cclxuICAgIGFkZFRvQ2FydChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5jcHVfX2l0ZW0nKTtcclxuICAgICAgICBwcm9kdWN0LnJlbW92ZUNsYXNzKCdoYXNFcnJvcicpOyAvLyByZW1vdmUgYW55IGVycm9yIGhpZ2hsaWdodGluZ1xyXG4gICAgICAgIC8vIG1ha2Ugc3VyZSBhbGwgb3B0aW9ucyBhcmUgc2VsZWN0ZWRcclxuICAgICAgICBpZiAocHJvZHVjdC5oYXNDbGFzcygnaGFzT3B0aW9ucycpICYmICFwcm9kdWN0Lmhhc0NsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpKSB7XHJcbiAgICAgICAgICAgIHByb2R1Y3QuaGFzQ2xhc3MoJ2hhc09wdGlvbnMtLXdpcmVkJylcclxuICAgICAgICAgICAgICAgID8gJCgnLnFhYXR4X19vcHRpb25zJywgcHJvZHVjdCkuc2xpZGVEb3duKCkgLy8gaWYgb3B0aW9ucyBsb2FkZWQsIGp1c3Qgc2hvdyB0aGVtXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMudG9nZ2xlT3B0aW9ucyhldmVudCk7IC8vIG9wdGlvbnMgYXJlbid0IGxvYWRlZCwgbG9hZCB0aGVtICsgc2hvdyB0aGVtXHJcbiAgICAgICAgICAgIHByb2R1Y3QuYWRkQ2xhc3MoJ2hhc0Vycm9yJyk7XHJcbiAgICAgICAgICAgICQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykucmVtb3ZlQ2xhc3MoJ2lzQmVpbmdBZGRlZCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICdQbGVhc2UgbWFrZSBzdXJlIGFsbCByZXF1aXJlZCBvcHRpb25zIGhhdmUgYmVlbiBzZWxlY3RlZCcsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYWN0dWFsbHkgYWRkIHRvIGNhcnRcclxuICAgICAgICB0aGlzLmxvYWRpbmcuc2hvdygpO1xyXG4gICAgICAgIGNvbnN0IGZvcm0gPSAkKCcuY3B1X19pdGVtLWZvcm0nLCBwcm9kdWN0KTtcclxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtQWRkKG5ldyBGb3JtRGF0YShmb3JtWzBdKSwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyIHx8IHJlc3BvbnNlLmRhdGEuZXJyb3I7IC8vIHRha2Ugbm90ZSBvZiBlcnJvcnNcclxuICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkgeyAvLyBHdWFyZCBzdGF0ZW1lbnRcclxuICAgICAgICAgICAgICAgIC8vIFN0cmlwIHRoZSBIVE1MIGZyb20gdGhlIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG4gICAgICAgICAgICAgICAgdG1wLmlubmVySFRNTCA9IGVycm9yTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0LmFkZENsYXNzKCdoYXNFcnJvcicpOyAvLyBoaWdobGdpaGh0IGVycm9yIGl0ZW1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yT2Zmc2V0ID0gcHJvZHVjdC5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogKGVycm9yT2Zmc2V0IC0gMjApIH0sIDcwMCk7IC8vIHNjcm9sbCB1c2VyIHRvIHRoZSBlcnJvciBwcm9kdWN0XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgY2xhc3MgZnJvbSBvdXIgJ3F1ZWRcIiBpdGVtc1xyXG4gICAgICAgICAgICAgICAgJCgnLmNwdV9faXRlbS5pc0JlaW5nQWRkZWQnKS5yZW1vdmVDbGFzcygnaXNCZWluZ0FkZGVkJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBhbGVydCB1c2VyIG9mIGVycm9yXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0bXAudGV4dENvbnRlbnQgfHwgdG1wLmlubmVyVGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nLmhpZGUoKTtcclxuICAgICAgICAgICAgLy8gcHJvZHVjdC5hZGRDbGFzcygnd2FzQWRkZWQnKTtcclxuICAgICAgICAgICAgLy8gJCgnLmNwdV9faXRlbS1idXR0b24nLCBwcm9kdWN0KS50ZXh0KCdBZGRlZCB0byBDYXJ0Jyk7XHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2NwdS1yZWZyZXNoLWNhcnQtY29udGVudCcpO1xyXG4gICAgICAgICAgICAvLyBpZiAocHJvZHVjdC5oYXNDbGFzcygnaXNCZWluZ0FkZGVkJykpIHtcclxuICAgICAgICAgICAgLy8gICAgIHByb2R1Y3QucmVtb3ZlQ2xhc3MoJ2lzQmVpbmdBZGRlZCcpO1xyXG4gICAgICAgICAgICAvLyAgICAgKCQoJy5jcHVfX2l0ZW0uaXNCZWluZ0FkZGVkJykgJiYgJCgnLmNwdV9faXRlbS5pc0JlaW5nQWRkZWQnKS5sZW5ndGgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgPyAkKCcuY3B1X19pdGVtLmlzQmVpbmdBZGRlZCcpLmVxKDApLmZpbmQoJy5xYWF0Y19fYWRkdG9jYXJ0JykudHJpZ2dlcignY2xpY2snKSAvLyB0cmlnZ2VyIHN1Ym1pdHRpbmcgbmV4dCBwcm9kdWN0IHRvIHRoZSBjYXJ0XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgOiB3aW5kb3cubG9jYXRpb24gPSAnL2NhcnQucGhwJztcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogd2hlbiBtb2RhbCBvcHRpb24gY2hhbmdlZCB3ZSBuZWVkIHRvIHN5bmMgdGhlIFwicmVhbFwiIGZvcm0uIFN5bmMgb3B0aW9ucyBzZWxlY3RlZCBpbiBzY29wZTEgd2l0aCBzY29wZTJcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2R1Y3RJZFxyXG4gICAgICovXHJcbiAgICBzeW5jRm9ybU9wdGlvbihldmVudCwgcHJvZHVjdElkKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0ID0gJChldmVudC50YXJnZXQpLnBhcmVudHMoJy5mb3JtLWZpZWxkJyk7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9ICQob3B0KS5kYXRhKCdwcm9kdWN0LWF0dHJpYnV0ZScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBudWxsO1xyXG4gICAgICAgIGxldCB0YXJnZXRJZCA9IG51bGw7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnaW5wdXQtY2hlY2tib3gnOlxyXG4gICAgICAgICAgICBjYXNlICdzZXQtcmVjdGFuZ2xlJzpcclxuICAgICAgICAgICAgY2FzZSAnc2V0LXJhZGlvJzpcclxuICAgICAgICAgICAgY2FzZSAncHJvZHVjdC1saXN0JzpcclxuICAgICAgICAgICAgY2FzZSAnc3dhdGNoJzpcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICQoJ2lucHV0OmNoZWNrZWQnLCBvcHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSB0YXJnZXQucHJvcCgnaWQnKS5yZXBsYWNlKGBfJHtwcm9kdWN0SWR9YCwgJycpLnJlcGxhY2UoJ21vZGFsXycsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChgIyR7dGFyZ2V0SWR9YCkuc2libGluZ3MoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSAkKGV2ZW50LnRhcmdldCkucHJvcCgnaWQnKS5yZXBsYWNlKGBfJHtwcm9kdWN0SWR9YCwgJycpLnJlcGxhY2UoJ21vZGFsXycsICcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZXQtc2VsZWN0JzpcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICQoJy5mb3JtLXNlbGVjdCcsIG9wdCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IHRhcmdldC5wcm9wKCdpZCcpLnJlcGxhY2UoYF8ke3Byb2R1Y3RJZH1gLCAnJykucmVwbGFjZSgnbW9kYWxfJywgJycpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0YXJnZXQudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS52YWwodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2lucHV0LXRleHQnOlxyXG4gICAgICAgICAgICBjYXNlICd0ZXh0YXJlYSc6XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAkKCcuZm9ybS1pbnB1dCcsIG9wdCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IHRhcmdldC5wcm9wKCdpZCcpLnJlcGxhY2UoYF8ke3Byb2R1Y3RJZH1gLCAnJykucmVwbGFjZSgnbW9kYWxfJywgJycpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0YXJnZXQudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAkKGAjJHt0YXJnZXRJZH1gKS52YWwodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZvcmNlIHVwZGF0ZSBvbiB0aGUgXCJyZWFsXCIgZm9ybVxyXG4gICAgICAgICQoYCMke3RhcmdldElkfWApLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRvIGNhcnQgZnJvbSBtb2RhbFxyXG4gICAgICovXHJcbiAgICBhZGRUb0NhcnRGcm9tTW9kYWwobW9kYWxDb250ZW50LCBwcm9kdWN0KSB7XHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBtb2RhbENvbnRlbnQucGFyZW50cygnLmNwdV9fbW9kYWwnKTtcclxuICAgICAgICBpZiAoIW1vZGFsLmhhc0NsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ1BsZWFzZSBtYWtlIHN1cmUgYWxsIHJlcXVpcmVkIG9wdGlvbnMgaGF2ZSBiZWVuIHNlbGVjdGVkJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24tLW9wdGlvbnMnLCBwcm9kdWN0KS50cmlnZ2VyKCdjbGljaycpOyAvLyBzaG93IG9wdGlvbnMgYWdhaW4gaWYgdHJpZWQgYWRkaW5nIHRvIGNhcnQgYmVmb3JlIHNlbGVjdGluZyBhbGwgb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1hZGR0b2NhcnQnLCBwcm9kdWN0KS50cmlnZ2VyKCdjbGljaycpOyAvLyB0cmlnZ2VyIGFkZCB0byBjYXJ0IGJ1dHRvbiBjbGljayBvbiBtYWluIHByb2R1Y3RcclxuICAgICAgICBzd2FsLmNsb3NlKCk7IC8vIGNsb3NlIG1vZGFsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzaG93IGFuZCBsb2FkIGlmIG5lZWRlZCB0aGlzIHByb2R1Y3QncyBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIHNob3dPcHRpb25zKGUpIHtcclxuICAgICAgICBjb25zdCBwcm9kdWN0ID0gJChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5jcHVfX2l0ZW0nKTtcclxuICAgICAgICBjb25zdCBuYW1lID0gJCgnLmNwdV9faXRlbS1uYW1lJywgcHJvZHVjdCkudGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbk1hcmt1cCA9ICQoJy5jcHVfX2l0ZW0tb3B0aW9ucycsIHByb2R1Y3QpLmh0bWwoKTtcclxuICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKCdbbmFtZT1cInByb2R1Y3RfaWRcIl0nLCBwcm9kdWN0KS52YWwoKTtcclxuXHJcbiAgICAgICAgc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgdGl0bGU6IGBPcHRpb25zIGZvciAke25hbWV9YCxcclxuICAgICAgICAgICAgaHRtbDogb3B0aW9uTWFya3VwLFxyXG4gICAgICAgICAgICBjdXN0b21DbGFzczogJ2NwdV9fbW9kYWwnLFxyXG4gICAgICAgICAgICBzaG93Q2xvc2VCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgb25PcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBzaW5jZSB0aGUgbW9kYSBsSFRNTCBpcyBjbG9uZWQgaXQgZG9lc24ndCBoYXZlIGFueSBoYW5kbGVycyBhcHBsaWVkIHRvIGl0LiBUaGlzIGhhbmRsZXMgdGhlIFwiZmFrZVwiIGNsb25lZCBvcHRpb25zIHRvIHVwZGF0ZSB0aGUgXCJyZWFsXCIgb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWxDb250ZW50ID0gJChzd2FsLmdldENvbnRlbnQoKSk7XHJcbiAgICAgICAgICAgICAgICBtYWtlT3B0aW9uSWRzVW5pcXVlKG1vZGFsQ29udGVudCwgcHJvZHVjdElkLCAnbW9kYWwnKTtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWNwdS1vcHRpb24tY2hhbmdlXScsIG1vZGFsQ29udGVudCkuY2hhbmdlKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNGb3JtT3B0aW9uKGV2ZW50LCBwcm9kdWN0SWQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIGRlZmF1bHQgc2VsZWN0ZWQgb3B0aW9ucyB1bmxlc3MgdGhlcmUncyBhbiBlcnJvci4uIHRoZW4gd2UnbGwgZ2V0IHN0dWNrIGluIGEgbG9vcFxyXG4gICAgICAgICAgICAgICAgaWYgKCFwcm9kdWN0Lmhhc0NsYXNzKCdoYXNPcHRpb25zLS1lcnJvcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS50cmlnZ2VyKCdjaGFuZ2UnKTsgLy8gdHJpZ2dlciBzZWxlY3RlZCBjaGVja2JveCBvcHRpb25zIHRvIHVwZGF0ZSBzdGFydGluZyBjaGVja2JveCB2YWx1ZXNcclxuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgc2VsZWN0ZWQgcmFkaW8gb3B0aW9ucyB0byB1cGRhdGUgc3RhcnRpbmcgcmFkaW8gYnV0dG9ucyB2YWx1ZXNcclxuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IHRleHQgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5maW5kKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJykudHJpZ2dlcignY2hhbmdlJyk7IC8vIHRyaWdnZXIgdXBkYXRlIG9uIGlucHV0IG51bWJlcnMgdG8gY2F0Y2ggYW55IGRlZmF1bHQgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnW2RhdGEtY3B1LW9wdGlvbi1jaGFuZ2VdJywgbW9kYWxDb250ZW50KS5maW5kKCd0ZXh0YXJlYScpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHVwZGF0ZSBvbiB0ZXh0YXJlYSB0cCBjYXRjaCBhbnkgZGVmYXVsdCB2YWx1ZXNcclxuICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1jcHUtb3B0aW9uLWNoYW5nZV0nLCBtb2RhbENvbnRlbnQpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnBhcmVudCgpLnRyaWdnZXIoJ2NoYW5nZScpOyAvLyB0cmlnZ2VyIHNlbGVjdGVkIG9wdGlvbnMgdG8gdXBkYXRlIHN0YXJ0aW5nIHNlbGVjdCBib3ggdmFsdWVzXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vcHRpb25IYW5kbGVyc1twcm9kdWN0SWRdLnVwZGF0ZU9wdGlvblZpZXcoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uSGFuZGxlcnNbcHJvZHVjdElkXS5jaGVja09wdGlvbnNTZWxlY3RlZChtb2RhbENvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgYWRkaW5nIHRvIGNhcnQgZnJvbSBtb2RhbFxyXG4gICAgICAgICAgICAgICAgJCgnLmNwdV9faXRlbS1idXR0b24tLW1vZGFsYWRkdG9jYXJ0JywgbW9kYWxDb250ZW50KS5vbignY2xpY2snLCAoKSA9PiB0aGlzLmFkZFRvQ2FydEZyb21Nb2RhbChtb2RhbENvbnRlbnQsIHByb2R1Y3QpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYXBwbHkgdXBzZWxsIGhhbmRsZXJzXHJcbiAgICAgKi9cclxuICAgIGFwcGx5VXBzZWxsSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25IYW5kbGVycyA9IHt9O1xyXG4gICAgICAgICQoJy5jcHVfX2l0ZW0uaGFzT3B0aW9ucycpLnRvQXJyYXkoKS5mb3JFYWNoKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhpc0lEID0gJChwcm9kdWN0KS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdF9pZFwiXScpLnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkhhbmRsZXJzW3RoaXNJRF0gPSBuZXcgQ2FydFBhZ2VVcHNlbGxQcm9kdWN0KCQocHJvZHVjdCkpXHJcbiAgICAgICAgfSk7IC8vIGhhbmRsZSBvcHRpb25zIGZvciBhbGwgcHJvZHVjdHMgdy8gb3B0aW9uc1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3B0aW9uSGFuZGxlcnMpO1xyXG4gICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1hZGR0b2NhcnQnKS5vbignY2xpY2snLCBlID0+IHRoaXMuYWRkVG9DYXJ0KGUpKTsgLy8gbWFuYWdlIGFkZGluZyB0byBjYXJ0XHJcblxyXG4gICAgICAgICQoJy5jcHVfX2l0ZW0tYnV0dG9uLS1vcHRpb25zJykub24oJ2NsaWNrJywgZSA9PiB0aGlzLnNob3dPcHRpb25zKGUpKTsgLy8gbWFuYWdlIGFkZGluZyB0byBjYXJ0XHJcblxyXG4gICAgICAgIHRoaXMuZGlzcGxheUluQ2Fyb3VzZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFKQVggdGhlIHVwc2VsbCBVUkxzIGFuZC9vciBJRHMgYW5kIGFwcGVuZCB3aGVyZSBuZWVkZWRcclxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHRhcmdldHMgLSB0YXJnZXRzIHRvIHVwc2VsbFxyXG4gICAgICovXHJcbiAgICBsb2FkVXBzZWxsVGFyZ2V0cyh0YXJnZXRzKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRhcmdldHMgPSB0YXJnZXRzLnNsaWNlKDAsIHRoaXMucHJvZHVjdExpbWl0IHx8IHRhcmdldHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc3QgcnVuUXVldWVJbk9yZGVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSB7IC8vIHdoZW4gZG9uZSBhbGwgcHJvZHVjdHNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5VXBzZWxsSGFuZGxlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldHMuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RNZXRob2QgPSB0YXJnZXQudG9TdHJpbmcoKS5tYXRjaCgvXlswLTldKyQvKSA/IHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQgOiB1dGlscy5hcGkuZ2V0UGFnZTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RNZXRob2QodGFyZ2V0LCB7IHRlbXBsYXRlOiAnY3VzdG9tL2NhcnQtcGFnZS11cHNlbGwtaXRlbScgfSwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7IHJldHVybjsgfSAvLyBpZiBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgICQoJyNjcHUgLmNwdV9fbGlzdC0tY3VzdG9tZmllbGRzJykuYXBwZW5kKHJlc3BvbnNlKTsgLy8gbm8gZXJyb3IsIGFwcGVuZCBtYXJrdXBcclxuICAgICAgICAgICAgICAgICAgICBydW5RdWV1ZUluT3JkZXIoKTsgLy8gcnVuIG5leHQgaXRlbVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJ1blF1ZXVlSW5PcmRlcigpOyAvLyBzdGFydCB0aGUgbG9vcFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNjcHUnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIFNsaWNrIG9wdGlvbnMgdG8gcHJvZHVjdCBkaXNwbGF5IGFmdGVyIGxvYWRpbmcgcHJvZHVjdHMsXHJcbiAgICAgKiB0aGVuIGZpcmUgU2xpY2tcclxuICAgICAqL1xyXG4gICAgZGlzcGxheUluQ2Fyb3VzZWwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNob3dNb2JpbGVJbkNhcm91c2VsKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vICBBZGQgQ1NTIHRvIHByb2R1Y3QgY2FyZHMgYmVmb3JlIGZpcmluZyBTbGlja1xyXG4gICAgICAgICQoJy5jcHVfX2xpc3QnKS5hZGRDbGFzcygnY3B1X19saXN0LXNsaWNrJylcclxuICAgICAgICAkKCcuY3B1X19pdGVtJykuYWRkQ2xhc3MoJ2NwdV9faXRlbS1zbGljaycpXHJcblxyXG4gICAgICAgICQoJy5jcHVfX2xpc3QnKS5hdHRyKCdkYXRhLXNsaWNrJywgYHtcclxuICAgICAgICAgICAgXCJpbmZpbml0ZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImRvdHNcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiYXJyb3dzXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwibW9iaWxlRmlyc3RcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJyb3dzXCI6IDEsXHJcbiAgICAgICAgICAgIFwic2xpZGVzVG9TaG93XCI6IDEsXHJcbiAgICAgICAgICAgIFwic2xpZGVzVG9TY3JvbGxcIjogMSxcclxuICAgICAgICAgICAgXCJyZXNwb25zaXZlXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImJyZWFrcG9pbnRcIjogMTAyNSxcclxuICAgICAgICAgICAgICAgICAgICBcInNldHRpbmdzXCI6IFwidW5zbGlja1wiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9YCk7XHJcblxyXG4gICAgICAgIGZvcm1hdENhcm91c2VsKHRoaXMuY29udGV4dCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1lZGlhTWF0Y2ggPSBtZWRpYVF1ZXJ5TGlzdEZhY3RvcnkoJ21lZGl1bScpO1xyXG5cclxuICAgICAgICAkKG1lZGlhTWF0Y2gpLm9uKCdjaGFuZ2UnLCBlID0+IHtcclxuICAgICAgICAgICAgbGV0IGJpbmRUb1dpbmRvdyA9ICFlLnRhcmdldC5tYXRjaGVzXHJcblxyXG4gICAgICAgICAgICBpZiAoYmluZFRvV2luZG93KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY3B1X19saXN0Jykuc2xpY2soJ3JlaW5pdCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJpbmQgZXZlbnRzXHJcbiAgICAgKi9cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nLnNob3coKTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncmVsYXRlZCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQXV0b1RhcmdldHMoJ3JlbGF0ZWQnKTtcclxuICAgICAgICAgICAgY2FzZSAnc2ltaWxhcic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQXV0b1RhcmdldHMoJ3NpbWlsYXInKTtcclxuICAgICAgICAgICAgY2FzZSAnY3VzdG9tIGZpZWxkcyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQ3VzdG9tRmllbGRUYXJnZXRzKCk7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Vwc2VsbCBzdWl0ZSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQ1NWVGFyZ2V0cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgbWVkaWFRdWVyeUxpc3RGYWN0b3J5IGZyb20gJy4uL2NvbW1vbi9tZWRpYS1xdWVyeS1saXN0JztcclxuXHJcbmNvbnN0IGZsb2F0aW5nQ2hlY2tvdXRCdXR0b24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCAkc3VtbWFyeUNvbnRhaW5lciA9ICQoJy5qcy1jYXJ0X190b3RhbHMnKTtcclxuICAgIGNvbnN0ICRmbG9hdGluZ0J1dHRvbiA9ICQoJy5mbG9hdGluZy1jaGVja291dC1idXR0b24nKTtcclxuICAgIGNvbnN0IG1xID0gbWVkaWFRdWVyeUxpc3RGYWN0b3J5KCdtZWRpdW0nKTtcclxuXHJcbiAgICBmdW5jdGlvbiBXaWR0aENoYW5nZShtcSkge1xyXG4gICAgICAgIGNvbnN0IGZhZGVUaW1pbmcgPSA0MDA7XHJcblxyXG4gICAgICAgIGlmICghbXEubWF0Y2hlcykge1xyXG4gICAgICAgICAgICBjb25zdCBpbml0V2luZG93UG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWSArIHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbml0V2luZG93UG9zaXRpb24gPCAkc3VtbWFyeUNvbnRhaW5lci5vZmZzZXQoKS50b3ApIHtcclxuICAgICAgICAgICAgICAgICRmbG9hdGluZ0J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkZmxvYXRpbmdCdXR0b24uaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVdpbmRvd1Bvc2l0aW9uID0gd2luZG93LnNjcm9sbFkgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJvdHRvbVdpbmRvd1Bvc2l0aW9uIDwgJHN1bW1hcnlDb250YWluZXIub2Zmc2V0KCkudG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGZsb2F0aW5nQnV0dG9uLmZhZGVJbihmYWRlVGltaW5nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGZsb2F0aW5nQnV0dG9uLmZhZGVPdXQoZmFkZVRpbWluZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRmbG9hdGluZ0J1dHRvbi5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1xLmFkZExpc3RlbmVyKFdpZHRoQ2hhbmdlKTtcclxuICAgIFdpZHRoQ2hhbmdlKG1xKTtcclxuXHJcbiAgICAkZmxvYXRpbmdCdXR0b24ub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdvVG9DaGVja291dCA9IGZhbHNlOyAvLyBTZXQgdG8gdHJ1ZSBpZiB0aGUgYnV0dG9uIHNob3VsZCBnbyB0byBjaGVja291dCBpbnN0ZWFkIG9mIHNjcm9sbGluZyB0aGUgdXNlciBkb3duIHRoZSBwYWdlXHJcbiAgICAgICAgY29uc3QgdG90YWxzT2Zmc2V0ID0gJHN1bW1hcnlDb250YWluZXIub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICBpZiAoZ29Ub0NoZWNrb3V0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9jaGVja291dC5waHAnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0b3RhbHNPZmZzZXQgLSAxMDAgfSwgNzAwKTsgLy8gc2Nyb2xsIHVzZXIgdG8gdGhlIHJlYWwgY2hlY2tvdXQgYnV0dG9uIHByb2R1Y3RcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGZsb2F0aW5nQ2hlY2tvdXRCdXR0b24gfTtcclxuIiwiLypcclxuICogcHV0IHByb2R1Y3RJRCBvbiB0aGUgZWxlbWVudCdzIFwiZm9yXCIgYW5kIFwiaWRcIiBhdHRycyBzbyBtdWx0aXBsZSBjYXNlcyBvZiBzYW1lIG9wdGlvbiBzZXQgd29uJ3QgY29uZmxpY3RcclxuICovXHJcbmNvbnN0IG1ha2VPcHRpb25JZHNVbmlxdWUgPSAoc2NvcGUsIHByb2R1Y3RJZCwga2V5KSA9PiB7XHJcbiAgICAkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScsIHNjb3BlKS5lYWNoKChpbmRleCwgZWwpID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb25JZCA9ICQoZWwpLmF0dHIoJ2lkJyk7IC8vIHVwZGF0ZSBJRCB0byBpbmNsdWRlIHByb2R1Y3QgSURcclxuICAgICAgICAkKGVsKS5hdHRyKCdpZCcsIGAke2tleX1fJHtvcHRpb25JZH1fJHtwcm9kdWN0SWR9YCk7IC8vIHVwZGF0ZSBvcHRpb24gSUQgdG8gaW5jbHVkZSBwcm9kdWN0IElEXHJcbiAgICAgICAgJChlbCkubmV4dCgpLmF0dHIoJ2ZvcicsIGAke2tleX1fJHtvcHRpb25JZH1fJHtwcm9kdWN0SWR9YCk7IC8vIHVwZGF0ZSBvcHRpb24gbGFiZWwgdG8gdGFyZ2V0IHVwZGF0ZWQgSURcclxuICAgIH0pO1xyXG4gICAgLy8gYWRkIGlucHV0IGZpZWxkcyBsYWJlbCBjbGFzcyBhbmQgcHV0IGluIGhlcmUuIFRoZXNlIG9wdGlvbnMgd2UgbmVlZCB0byBzZWxlY3QgdGhlaXIgc2libGluZyBsYWJlbFxyXG4gICAgY29uc3Qgb3B0aW9uc1dpdGhMYWJlbEF0dHJzID0gW1xyXG4gICAgICAgICdpbnB1dFt0eXBlPVwidGV4dFwiXScsXHJcbiAgICAgICAgJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nLFxyXG4gICAgICAgICdpbnB1dFt0eXBlPVwiZmlsZVwiXScsXHJcbiAgICAgICAgJ3NlbGVjdCcsXHJcbiAgICAgICAgJ3RleHRhcmVhJyxcclxuICAgIF1cclxuICAgIGNvbnN0IG9wdGlvbnNXaXRoTGFiZWxBdHRyc1NlbGVjdG9ycyA9IG9wdGlvbnNXaXRoTGFiZWxBdHRycy5qb2luKCcsJyk7XHJcbiAgICAkKG9wdGlvbnNXaXRoTGFiZWxBdHRyc1NlbGVjdG9ycywgc2NvcGUpLnBhcmVudHMoJy5mb3JtLWZpZWxkJykuZmluZCgnbGFiZWwnKS5lYWNoKChpbmRleCwgZWwpID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb25JZCA9ICQoZWwpLmF0dHIoJ2ZvcicpOyAvLyB1cGRhdGUgSUQgdG8gaW5jbHVkZSBwcm9kdWN0IElEXHJcbiAgICAgICAgJChlbCkuYXR0cignZm9yJywgYCR7a2V5fV8ke29wdGlvbklkfV8ke3Byb2R1Y3RJZH1gKTsgLy8gdXBkYXRlIG9wdGlvbiBJRCB0byBpbmNsdWRlIHByb2R1Y3QgSURcclxuICAgICAgICAkKGVsKS5uZXh0KCkuYXR0cignaWQnLCBgJHtrZXl9XyR7b3B0aW9uSWR9XyR7cHJvZHVjdElkfWApOyAvLyB1cGRhdGUgb3B0aW9uIGxhYmVsIHRvIHRhcmdldCB1cGRhdGVkIElEXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZU9wdGlvbklkc1VuaXF1ZTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==