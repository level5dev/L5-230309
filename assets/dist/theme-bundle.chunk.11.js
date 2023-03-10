(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/theme/account.js":
/*!************************************!*\
  !*** ./assets/js/theme/account.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Account; });
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/reduce */ "./node_modules/lodash/reduce.js");
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_reduce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wishlist */ "./assets/js/theme/wishlist.js");
/* harmony import */ var _common_form_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/form-validation */ "./assets/js/theme/common/form-validation.js");
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_payment_method__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/payment-method */ "./assets/js/theme/common/payment-method.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var Account = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Account, _PageManager);
  function Account(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_8__["createTranslationDictionary"])(context);
    _this.$state = $('[data-field-type="State"]');
    _this.$body = $('body');
    return _this;
  }
  var _proto = Account.prototype;
  _proto.onReady = function onReady() {
    var $editAccountForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-edit-account-form]');
    var $addressForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-address-form]');
    var $inboxForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-inbox-form]');
    var $accountReturnForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('[data-account-return-form]');
    var $paymentMethodForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('form[data-payment-method-form]');
    var $reorderForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["classifyForm"])('[data-account-reorder-form]');
    var $invoiceButton = $('[data-print-invoice]');
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_11__["default"])(this.context);

    // Injected via template
    this.passwordRequirements = this.context.passwordRequirements;

    // Instantiates wish list JS
    _wishlist__WEBPACK_IMPORTED_MODULE_4__["default"].load(this.context);
    if ($editAccountForm.length) {
      this.registerEditAccountValidation($editAccountForm);
      if (this.$state.is('input')) {
        Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["insertStateHiddenField"])(this.$state);
      }
    }
    if ($invoiceButton.length) {
      $invoiceButton.on('click', function () {
        var left = window.screen.availWidth / 2 - 450;
        var top = window.screen.availHeight / 2 - 320;
        var url = $invoiceButton.data('printInvoice');
        window.open(url, 'orderInvoice', "width=900,height=650,left=" + left + ",top=" + top + ",scrollbars=1");
      });
    }
    if ($addressForm.length) {
      this.initAddressFormValidation($addressForm);
      if (this.$state.is('input')) {
        Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["insertStateHiddenField"])(this.$state);
      }
    }
    if ($inboxForm.length) {
      this.registerInboxValidation($inboxForm);
    }
    if ($accountReturnForm.length) {
      this.initAccountReturnFormValidation($accountReturnForm);
    }
    if ($paymentMethodForm.length) {
      this.initPaymentMethodFormValidation($paymentMethodForm);
    }
    if ($reorderForm.length) {
      this.initReorderForm($reorderForm);
    }
    this.bindDeleteAddress();
    this.bindDeletePaymentMethod();
  }

  /**
   * Binds a submit hook to ensure the customer receives a confirmation dialog before deleting an address
   */;
  _proto.bindDeleteAddress = function bindDeleteAddress() {
    $('[data-delete-address]').on('submit', function (event) {
      var message = $(event.currentTarget).data('deleteAddress');
      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  };
  _proto.bindDeletePaymentMethod = function bindDeletePaymentMethod() {
    $('[data-delete-payment-method]').on('submit', function (event) {
      var message = $(event.currentTarget).data('deletePaymentMethod');
      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  };
  _proto.initReorderForm = function initReorderForm($reorderForm) {
    var _this2 = this;
    $reorderForm.on('submit', function (event) {
      var $productReorderCheckboxes = $('.account-listItem .form-checkbox:checked');
      var submitForm = false;
      $reorderForm.find('[name^="reorderitem"]').remove();
      $productReorderCheckboxes.each(function (index, productCheckbox) {
        var productId = $(productCheckbox).val();
        var $input = $('<input>', {
          type: 'hidden',
          name: "reorderitem[" + productId + "]",
          value: '1'
        });
        submitForm = true;
        $reorderForm.append($input);
      });
      if (!submitForm) {
        event.preventDefault();
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: _this2.context.selectItem,
          icon: 'error'
        });
      }
    });
  };
  _proto.initAddressFormValidation = function initAddressFormValidation($addressForm) {
    var _this3 = this;
    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($addressForm, this.context);
    var stateSelector = 'form[data-address-form] [data-field-type="State"]';
    var $stateElement = $(stateSelector);
    var addressValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: 'form[data-address-form] input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["announceInputErrorMessage"]
    });
    addressValidator.add(validationModel);
    if ($stateElement) {
      var $last;

      // Requests the states for a country with AJAX
      Object(_common_state_country__WEBPACK_IMPORTED_MODULE_6__["default"])($stateElement, this.context, function (err, field) {
        if (err) {
          throw new Error(err);
        }
        var $field = $(field);
        if (addressValidator.getStatus($stateElement) !== 'undefined') {
          addressValidator.remove($stateElement);
        }
        if ($last) {
          addressValidator.remove($last);
        }
        if ($field.is('select')) {
          $last = field;
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setStateCountryValidation(addressValidator, field, _this3.validationDictionary.field_not_blank);
        } else {
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].cleanUpStateValidation(field);
        }
      });
    }
    $addressForm.on('submit', function (event) {
      addressValidator.performCheck();
      if (addressValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.initAccountReturnFormValidation = function initAccountReturnFormValidation($accountReturnForm) {
    var errorMessage = $accountReturnForm.data('accountReturnFormError');
    $accountReturnForm.on('submit', function (event) {
      var formSubmit = false;

      // Iterate until we find a non-zero value in the dropdown for quantity
      $('[name^="return_qty"]', $accountReturnForm).each(function (i, ele) {
        if (parseInt($(ele).val(), 10) !== 0) {
          formSubmit = true;

          // Exit out of loop if we found at least one return
          return true;
        }
      });
      if (formSubmit) {
        return true;
      }
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: errorMessage,
        icon: 'error'
      });
      return event.preventDefault();
    });
  };
  _proto.initPaymentMethodFormValidation = function initPaymentMethodFormValidation($paymentMethodForm) {
    var _this4 = this;
    // Inject validations into form fields before validation runs
    $paymentMethodForm.find('#first_name.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.firstNameLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#last_name.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.lastNameLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#company.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.companyLabel + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#phone.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.phoneLabel + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#address1.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.address1Label + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#address2.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.address2Label + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#city.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.cityLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#country.form-field').attr('data-validation', "{ \"type\": \"singleselect\", \"label\": \"" + this.context.countryLabel + "\", \"required\": true, prefix: \"" + this.context.chooseCountryLabel + "\" }");
    $paymentMethodForm.find('#state.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.stateLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#postal_code.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.postalCodeLabel + "\", \"required\": true, \"maxlength\": 0 }");
    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($paymentMethodForm, this.context);
    var paymentMethodSelector = 'form[data-payment-method-form]';
    var paymentMethodValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: paymentMethodSelector + " input[type=\"submit\"]",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["announceInputErrorMessage"]
    });
    var $stateElement = $(paymentMethodSelector + " [data-field-type=\"State\"]");
    var $last;
    // Requests the states for a country with AJAX
    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_6__["default"])($stateElement, this.context, function (err, field) {
      if (err) {
        throw new Error(err);
      }
      var $field = $(field);
      if (paymentMethodValidator.getStatus($stateElement) !== 'undefined') {
        paymentMethodValidator.remove($stateElement);
      }
      if ($last) {
        paymentMethodValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setStateCountryValidation(paymentMethodValidator, field, _this4.validationDictionary.field_not_blank);
      } else {
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].cleanUpStateValidation(field);
      }
    });

    // Use credit card number input listener to highlight credit card type
    var cardType;
    $(paymentMethodSelector + " input[name=\"credit_card_number\"]").on('keyup', function (_ref) {
      var target = _ref.target;
      cardType = Object(_common_payment_method__WEBPACK_IMPORTED_MODULE_9__["creditCardType"])(target.value);
      if (cardType) {
        $(paymentMethodSelector + " img[alt=\"" + cardType + "\"]").siblings().css('opacity', '.2');
      } else {
        $(paymentMethodSelector + " img").css('opacity', '1');
      }
    });

    // Set of credit card validation
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setCreditCardNumberValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"credit_card_number\"]", this.context.creditCardNumber);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setExpirationValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"expiration\"]", this.context.expiration);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setNameOnCardValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"name_on_card\"]", this.context.nameOnCard);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Validators"].setCvvValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"cvv\"]", this.context.cvv, function () {
      return cardType;
    });

    // Set of credit card format
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Formatters"].setCreditCardNumberFormat(paymentMethodSelector + " input[name=\"credit_card_number\"]");
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__["Formatters"].setExpirationFormat(paymentMethodSelector + " input[name=\"expiration\"]");

    // Billing address validation
    paymentMethodValidator.add(validationModel);
    $paymentMethodForm.on('submit', function (event) {
      event.preventDefault();
      // Perform final form validation
      paymentMethodValidator.performCheck();
      if (paymentMethodValidator.areAll('valid')) {
        // Serialize form data and reduce it to object
        var data = lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default()($paymentMethodForm.serializeArray(), function (obj, item) {
          var refObj = obj;
          refObj[item.name] = item.value;
          return refObj;
        }, {});

        // Assign country and state code
        var country = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(_this4.context.countries, function (_ref2) {
          var value = _ref2.value;
          return value === data.country;
        });
        var state = country && lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(country.states, function (_ref3) {
          var value = _ref3.value;
          return value === data.state;
        });
        data.country_code = country ? country.code : data.country;
        data.state_or_province_code = state ? state.code : data.state;

        // Default Instrument
        data.default_instrument = !!data.default_instrument;

        // Store credit card
        Object(_common_payment_method__WEBPACK_IMPORTED_MODULE_9__["storeInstrument"])(_this4.context, data, function () {
          window.location.href = _this4.context.paymentMethodsUrl;
        }, function () {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
            text: _this4.context.generic_error,
            icon: 'error'
          });
        });
      }
    });
  };
  _proto.registerEditAccountValidation = function registerEditAccountValidation($editAccountForm) {
    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($editAccountForm, this.context);
    var formEditSelector = 'form[data-edit-account-form]';
    var editValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: '${formEditSelector} input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["announceInputErrorMessage"]
    });
    var emailSelector = formEditSelector + " [data-field-type=\"EmailAddress\"]";
    var $emailElement = $(emailSelector);
    var passwordSelector = formEditSelector + " [data-field-type=\"Password\"]";
    var $passwordElement = $(passwordSelector);
    var password2Selector = formEditSelector + " [data-field-type=\"ConfirmPassword\"]";
    var $password2Element = $(password2Selector);
    var currentPasswordSelector = formEditSelector + " [data-field-type=\"CurrentPassword\"]";
    var $currentPassword = $(currentPasswordSelector);

    // This only handles the custom fields, standard fields are added below
    editValidator.add(validationModel);
    if ($emailElement) {
      editValidator.remove(emailSelector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setEmailValidation(editValidator, emailSelector, this.validationDictionary.valid_email);
    }
    if ($passwordElement && $password2Element) {
      var _this$validationDicti = this.validationDictionary,
        enterPassword = _this$validationDicti.password,
        matchPassword = _this$validationDicti.password_match,
        invalidPassword = _this$validationDicti.invalid_password;
      editValidator.remove(passwordSelector);
      editValidator.remove(password2Selector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["Validators"].setPasswordValidation(editValidator, passwordSelector, password2Selector, this.passwordRequirements, Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["createPasswordValidationErrorTextObject"])(enterPassword, enterPassword, matchPassword, invalidPassword), true);
    }
    if ($currentPassword) {
      editValidator.add({
        selector: currentPasswordSelector,
        validate: function validate(cb, val) {
          var result = true;
          if (val === '' && $passwordElement.val() !== '') {
            result = false;
          }
          cb(result);
        },
        errorMessage: this.context.currentPassword
      });
    }
    editValidator.add([{
      selector: formEditSelector + " input[name='account_firstname']",
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.firstName
    }, {
      selector: formEditSelector + " input[name='account_lastname']",
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.lastName
    }]);
    $editAccountForm.on('submit', function (event) {
      editValidator.performCheck();
      if (editValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.registerInboxValidation = function registerInboxValidation($inboxForm) {
    var inboxValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: 'form[data-inbox-form] input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__["announceInputErrorMessage"]
    });
    inboxValidator.add([{
      selector: 'form[data-inbox-form] select[name="message_order_id"]',
      validate: function validate(cb, val) {
        var result = Number(val) !== 0;
        cb(result);
      },
      errorMessage: this.context.enterOrderNum
    }, {
      selector: 'form[data-inbox-form] input[name="message_subject"]',
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.enterSubject
    }, {
      selector: 'form[data-inbox-form] textarea[name="message_content"]',
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.enterMessage
    }]);
    $inboxForm.on('submit', function (event) {
      inboxValidator.performCheck();
      if (inboxValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  return Account;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/payment-method.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/payment-method.js ***!
  \**************************************************/
/*! exports provided: creditCardType, storeInstrument, Formatters, Validators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "creditCardType", function() { return creditCardType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeInstrument", function() { return storeInstrument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Formatters", function() { return Formatters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return Validators; });
/* harmony import */ var creditcards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! creditcards */ "./node_modules/creditcards/index.js");
/* harmony import */ var creditcards__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(creditcards__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Omit null or empty string properties of object
 * @param {Object} object
 * @returns {Object}
 */
var omitNullString = function omitNullString(obj) {
  var refObj = obj;
  $.each(refObj, function (key, value) {
    if (value === null || value === '') {
      delete refObj[key];
    }
  });
  return refObj;
};

/**
 * Get credit card type from credit card number
 * @param {string} value
 */
var creditCardType = function creditCardType(value) {
  return creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.type(creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.parse(value), true);
};

/**
 * Wrapper for ajax request to store a new instrument in bigpay
 * @param {object} Representing the data needed for the header
 * @param {object} Representing the data needed for the body
 * @param {function} done Function to execute on a successful response
 * @param {function} fail Function to execute on a unsuccessful response
 */
var storeInstrument = function storeInstrument(_ref, _ref2, done, fail) {
  var paymentsUrl = _ref.paymentsUrl,
    shopperId = _ref.shopperId,
    storeHash = _ref.storeHash,
    vaultToken = _ref.vaultToken;
  var provider_id = _ref2.provider_id,
    currency_code = _ref2.currency_code,
    credit_card_number = _ref2.credit_card_number,
    expiration = _ref2.expiration,
    name_on_card = _ref2.name_on_card,
    cvv = _ref2.cvv,
    default_instrument = _ref2.default_instrument,
    address1 = _ref2.address1,
    address2 = _ref2.address2,
    city = _ref2.city,
    postal_code = _ref2.postal_code,
    state_or_province_code = _ref2.state_or_province_code,
    country_code = _ref2.country_code,
    company = _ref2.company,
    first_name = _ref2.first_name,
    last_name = _ref2.last_name,
    email = _ref2.email,
    phone = _ref2.phone;
  var expiry = expiration.split('/');
  $.ajax({
    url: paymentsUrl + "/stores/" + storeHash + "/customers/" + shopperId + "/stored_instruments",
    dataType: 'json',
    method: 'POST',
    cache: false,
    headers: {
      Authorization: vaultToken,
      Accept: 'application/vnd.bc.v1+json',
      'Content-Type': 'application/vnd.bc.v1+json'
    },
    data: JSON.stringify({
      instrument: {
        type: 'card',
        cardholder_name: name_on_card,
        number: creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.parse(credit_card_number),
        expiry_month: creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.expiration.month.parse(expiry[0]),
        expiry_year: creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.expiration.year.parse(expiry[1], true),
        verification_value: cvv
      },
      billing_address: omitNullString({
        address1: address1,
        address2: address2,
        city: city,
        postal_code: postal_code,
        state_or_province_code: state_or_province_code,
        country_code: country_code,
        company: company,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone
      }),
      provider_id: provider_id,
      default_instrument: default_instrument,
      currency_code: currency_code
    })
  }).done(done).fail(fail);
};
var Formatters = {
  /**
   * Sets up a format for credit card number
   * @param field
   */
  setCreditCardNumberFormat: function setCreditCardNumberFormat(field) {
    if (field) {
      $(field).on('keyup', function (_ref3) {
        var target = _ref3.target;
        var refTarget = target;
        refTarget.value = creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.format(creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.parse(target.value));
      });
    }
  },
  /**
   * Sets up a format for expiration date
   * @param field
   */
  setExpirationFormat: function setExpirationFormat(field) {
    if (field) {
      $(field).on('keyup', function (_ref4) {
        var target = _ref4.target,
          which = _ref4.which;
        var refTarget = target;
        if (which === 8 && /.*(\/)$/.test(target.value)) {
          refTarget.value = target.value.slice(0, -1);
        } else if (target.value.length > 4) {
          refTarget.value = target.value.slice(0, 5);
        } else if (which !== 8) {
          refTarget.value = target.value.replace(/^([1-9]\/|[2-9])$/g, '0$1/').replace(/^(0[1-9]|1[0-2])$/g, '$1/').replace(/^([0-1])([3-9])$/g, '0$1/$2').replace(/^(0[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2').replace(/^([0]+)\/|[0]+$/g, '0').replace(/[^\d\/]|^[\/]*$/g, '').replace(/\/\//g, '/');
        }
      });
    }
  }
};
var Validators = {
  /**
   * Sets up a validation for credit card number
   * @param validator
   * @param field
   * @param errorMessage
   */
  setCreditCardNumberValidation: function setCreditCardNumberValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = val.length && creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.isValid(creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.card.parse(val));
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },
  /**
   * Sets up a validation for expiration date
   * @param validator
   * @param field
   * @param errorMessage
   */
  setExpirationValidation: function setExpirationValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var expiry = val.split('/');
          var result = val.length && /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(val);
          result = result && !creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.expiration.isPast(creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.expiration.month.parse(expiry[0]), creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.expiration.year.parse(expiry[1], true));
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },
  /**
   * Sets up a validation for name on card
   * @param validator
   * @param field
   * @param errorMessage
   */
  setNameOnCardValidation: function setNameOnCardValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = !!val.length;
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },
  /**
   * Sets up a validation for cvv
   * @param validator
   * @param field
   * @param errorMessage
   * @param {any} cardType The credit card number type
   */
  setCvvValidation: function setCvvValidation(validator, field, errorMessage, cardType) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var type = typeof cardType === 'function' ? cardType() : cardType;
          var result = val.length && creditcards__WEBPACK_IMPORTED_MODULE_0___default.a.cvc.isValid(val, type);
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");

function decrementCounter(counter, item) {
  var index = counter.indexOf(item);
  if (index > -1) {
    counter.splice(index, 1);
  }
}
function incrementCounter(counter, item) {
  counter.push(item);
}
function updateCounterNav(counter, $link, urls) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }
    $link.attr('href', urls.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}
/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var noCompareMessage = _ref.noCompareMessage,
    urls = _ref.urls;
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urls);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');
    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }
    updateCounterNav(compareCounter, $clickedCompareLink, urls);
  });
  $('body').on('submit', '[data-product-compare]', function (event) {
    var $this = $(event.currentTarget);
    var productsToCompare = $this.find('input[name="products\[\]"]:checked');
    if (productsToCompare.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])(noCompareMessage);
      event.preventDefault();
    }
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');
    if ($clickedCheckedInput.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])(noCompareMessage);
      return false;
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYWNjb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3BheW1lbnQtbWV0aG9kLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cy5qcyJdLCJuYW1lcyI6WyJBY2NvdW50IiwiX1BhZ2VNYW5hZ2VyIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCIkc3RhdGUiLCIkIiwiJGJvZHkiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwiJGVkaXRBY2NvdW50Rm9ybSIsImNsYXNzaWZ5Rm9ybSIsIiRhZGRyZXNzRm9ybSIsIiRpbmJveEZvcm0iLCIkYWNjb3VudFJldHVybkZvcm0iLCIkcGF5bWVudE1ldGhvZEZvcm0iLCIkcmVvcmRlckZvcm0iLCIkaW52b2ljZUJ1dHRvbiIsImNvbXBhcmVQcm9kdWN0cyIsInBhc3N3b3JkUmVxdWlyZW1lbnRzIiwiV2lzaGxpc3QiLCJsb2FkIiwibGVuZ3RoIiwicmVnaXN0ZXJFZGl0QWNjb3VudFZhbGlkYXRpb24iLCJpcyIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJvbiIsImxlZnQiLCJ3aW5kb3ciLCJzY3JlZW4iLCJhdmFpbFdpZHRoIiwidG9wIiwiYXZhaWxIZWlnaHQiLCJ1cmwiLCJkYXRhIiwib3BlbiIsImluaXRBZGRyZXNzRm9ybVZhbGlkYXRpb24iLCJyZWdpc3RlckluYm94VmFsaWRhdGlvbiIsImluaXRBY2NvdW50UmV0dXJuRm9ybVZhbGlkYXRpb24iLCJpbml0UGF5bWVudE1ldGhvZEZvcm1WYWxpZGF0aW9uIiwiaW5pdFJlb3JkZXJGb3JtIiwiYmluZERlbGV0ZUFkZHJlc3MiLCJiaW5kRGVsZXRlUGF5bWVudE1ldGhvZCIsImV2ZW50IiwibWVzc2FnZSIsImN1cnJlbnRUYXJnZXQiLCJjb25maXJtIiwicHJldmVudERlZmF1bHQiLCJfdGhpczIiLCIkcHJvZHVjdFJlb3JkZXJDaGVja2JveGVzIiwic3VibWl0Rm9ybSIsImZpbmQiLCJyZW1vdmUiLCJlYWNoIiwiaW5kZXgiLCJwcm9kdWN0Q2hlY2tib3giLCJwcm9kdWN0SWQiLCJ2YWwiLCIkaW5wdXQiLCJ0eXBlIiwibmFtZSIsInZhbHVlIiwiYXBwZW5kIiwic3dhbCIsImZpcmUiLCJ0ZXh0Iiwic2VsZWN0SXRlbSIsImljb24iLCJfdGhpczMiLCJ2YWxpZGF0aW9uTW9kZWwiLCJ2YWxpZGF0aW9uIiwic3RhdGVTZWxlY3RvciIsIiRzdGF0ZUVsZW1lbnQiLCJhZGRyZXNzVmFsaWRhdG9yIiwibm9kIiwic3VibWl0IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImFkZCIsIiRsYXN0Iiwic3RhdGVDb3VudHJ5IiwiZXJyIiwiZmllbGQiLCJFcnJvciIsIiRmaWVsZCIsImdldFN0YXR1cyIsIlZhbGlkYXRvcnMiLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiZmllbGRfbm90X2JsYW5rIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImVycm9yTWVzc2FnZSIsImZvcm1TdWJtaXQiLCJpIiwiZWxlIiwicGFyc2VJbnQiLCJfdGhpczQiLCJhdHRyIiwiZmlyc3ROYW1lTGFiZWwiLCJsYXN0TmFtZUxhYmVsIiwiY29tcGFueUxhYmVsIiwicGhvbmVMYWJlbCIsImFkZHJlc3MxTGFiZWwiLCJhZGRyZXNzMkxhYmVsIiwiY2l0eUxhYmVsIiwiY291bnRyeUxhYmVsIiwiY2hvb3NlQ291bnRyeUxhYmVsIiwic3RhdGVMYWJlbCIsInBvc3RhbENvZGVMYWJlbCIsInBheW1lbnRNZXRob2RTZWxlY3RvciIsInBheW1lbnRNZXRob2RWYWxpZGF0b3IiLCJjYXJkVHlwZSIsIl9yZWYiLCJ0YXJnZXQiLCJjcmVkaXRDYXJkVHlwZSIsInNpYmxpbmdzIiwiY3NzIiwiQ0NWYWxpZGF0b3JzIiwic2V0Q3JlZGl0Q2FyZE51bWJlclZhbGlkYXRpb24iLCJjcmVkaXRDYXJkTnVtYmVyIiwic2V0RXhwaXJhdGlvblZhbGlkYXRpb24iLCJleHBpcmF0aW9uIiwic2V0TmFtZU9uQ2FyZFZhbGlkYXRpb24iLCJuYW1lT25DYXJkIiwic2V0Q3Z2VmFsaWRhdGlvbiIsImN2diIsIkNDRm9ybWF0dGVycyIsInNldENyZWRpdENhcmROdW1iZXJGb3JtYXQiLCJzZXRFeHBpcmF0aW9uRm9ybWF0IiwiX3JlZHVjZSIsInNlcmlhbGl6ZUFycmF5Iiwib2JqIiwiaXRlbSIsInJlZk9iaiIsImNvdW50cnkiLCJfZmluZCIsImNvdW50cmllcyIsIl9yZWYyIiwic3RhdGUiLCJzdGF0ZXMiLCJfcmVmMyIsImNvdW50cnlfY29kZSIsImNvZGUiLCJzdGF0ZV9vcl9wcm92aW5jZV9jb2RlIiwiZGVmYXVsdF9pbnN0cnVtZW50Iiwic3RvcmVJbnN0cnVtZW50IiwibG9jYXRpb24iLCJocmVmIiwicGF5bWVudE1ldGhvZHNVcmwiLCJnZW5lcmljX2Vycm9yIiwiZm9ybUVkaXRTZWxlY3RvciIsImVkaXRWYWxpZGF0b3IiLCJlbWFpbFNlbGVjdG9yIiwiJGVtYWlsRWxlbWVudCIsInBhc3N3b3JkU2VsZWN0b3IiLCIkcGFzc3dvcmRFbGVtZW50IiwicGFzc3dvcmQyU2VsZWN0b3IiLCIkcGFzc3dvcmQyRWxlbWVudCIsImN1cnJlbnRQYXNzd29yZFNlbGVjdG9yIiwiJGN1cnJlbnRQYXNzd29yZCIsInNldEVtYWlsVmFsaWRhdGlvbiIsInZhbGlkX2VtYWlsIiwiX3RoaXMkdmFsaWRhdGlvbkRpY3RpIiwiZW50ZXJQYXNzd29yZCIsInBhc3N3b3JkIiwibWF0Y2hQYXNzd29yZCIsInBhc3N3b3JkX21hdGNoIiwiaW52YWxpZFBhc3N3b3JkIiwiaW52YWxpZF9wYXNzd29yZCIsInNldFBhc3N3b3JkVmFsaWRhdGlvbiIsImNyZWF0ZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yVGV4dE9iamVjdCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsInJlc3VsdCIsImN1cnJlbnRQYXNzd29yZCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiaW5ib3hWYWxpZGF0b3IiLCJOdW1iZXIiLCJlbnRlck9yZGVyTnVtIiwiZW50ZXJTdWJqZWN0IiwiZW50ZXJNZXNzYWdlIiwiUGFnZU1hbmFnZXIiLCJvbWl0TnVsbFN0cmluZyIsImtleSIsImNyZWRpdGNhcmRzIiwiY2FyZCIsInBhcnNlIiwiZG9uZSIsImZhaWwiLCJwYXltZW50c1VybCIsInNob3BwZXJJZCIsInN0b3JlSGFzaCIsInZhdWx0VG9rZW4iLCJwcm92aWRlcl9pZCIsImN1cnJlbmN5X2NvZGUiLCJjcmVkaXRfY2FyZF9udW1iZXIiLCJuYW1lX29uX2NhcmQiLCJhZGRyZXNzMSIsImFkZHJlc3MyIiwiY2l0eSIsInBvc3RhbF9jb2RlIiwiY29tcGFueSIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJlbWFpbCIsInBob25lIiwiZXhwaXJ5Iiwic3BsaXQiLCJhamF4IiwiZGF0YVR5cGUiLCJtZXRob2QiLCJjYWNoZSIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiQWNjZXB0IiwiSlNPTiIsInN0cmluZ2lmeSIsImluc3RydW1lbnQiLCJjYXJkaG9sZGVyX25hbWUiLCJudW1iZXIiLCJleHBpcnlfbW9udGgiLCJtb250aCIsImV4cGlyeV95ZWFyIiwieWVhciIsInZlcmlmaWNhdGlvbl92YWx1ZSIsImJpbGxpbmdfYWRkcmVzcyIsIkZvcm1hdHRlcnMiLCJyZWZUYXJnZXQiLCJmb3JtYXQiLCJfcmVmNCIsIndoaWNoIiwidGVzdCIsInNsaWNlIiwicmVwbGFjZSIsInZhbGlkYXRvciIsImlzVmFsaWQiLCJpc1Bhc3QiLCJjdmMiLCJkZWNyZW1lbnRDb3VudGVyIiwiY291bnRlciIsImluZGV4T2YiLCJzcGxpY2UiLCJpbmNyZW1lbnRDb3VudGVyIiwicHVzaCIsInVwZGF0ZUNvdW50ZXJOYXYiLCIkbGluayIsInVybHMiLCJhZGRDbGFzcyIsImNvbXBhcmUiLCJqb2luIiwiaHRtbCIsInJlbW92ZUNsYXNzIiwibm9Db21wYXJlTWVzc2FnZSIsImNvbXBhcmVDb3VudGVyIiwiJGNvbXBhcmVMaW5rIiwiJGNoZWNrZWQiLCJtYXAiLCJlbGVtZW50IiwiZ2V0IiwidHJpZ2dlckhhbmRsZXIiLCJwcm9kdWN0IiwiJGNsaWNrZWRDb21wYXJlTGluayIsImNoZWNrZWQiLCIkdGhpcyIsInByb2R1Y3RzVG9Db21wYXJlIiwic2hvd0FsZXJ0TW9kYWwiLCIkY2xpY2tlZENoZWNrZWRJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBRVY7QUFDRztBQUNnQjtBQUNBO0FBT2Y7QUFDNkM7QUFDa0Q7QUFDMUY7QUFDZ0I7QUFBQSxJQUVuQ0EsT0FBTywwQkFBQUMsWUFBQTtFQUFBQyxjQUFBLENBQUFGLE9BQUEsRUFBQUMsWUFBQTtFQUN4QixTQUFBRCxRQUFZRyxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2pCQSxLQUFBLEdBQUFILFlBQUEsQ0FBQUksSUFBQSxPQUFNRixPQUFPLENBQUM7SUFDZEMsS0FBQSxDQUFLRSxvQkFBb0IsR0FBR0Msb0dBQTJCLENBQUNKLE9BQU8sQ0FBQztJQUNoRUMsS0FBQSxDQUFLSSxNQUFNLEdBQUdDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztJQUM1Q0wsS0FBQSxDQUFLTSxLQUFLLEdBQUdELENBQUMsQ0FBQyxNQUFNLENBQUM7SUFBQyxPQUFBTCxLQUFBO0VBQzNCO0VBQUMsSUFBQU8sTUFBQSxHQUFBWCxPQUFBLENBQUFZLFNBQUE7RUFBQUQsTUFBQSxDQUVERSxPQUFPLEdBQVAsU0FBQUEsUUFBQSxFQUFVO0lBQ04sSUFBTUMsZ0JBQWdCLEdBQUdDLDZFQUFZLENBQUMsOEJBQThCLENBQUM7SUFDckUsSUFBTUMsWUFBWSxHQUFHRCw2RUFBWSxDQUFDLHlCQUF5QixDQUFDO0lBQzVELElBQU1FLFVBQVUsR0FBR0YsNkVB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REFBYyxDQUFDYixnQkFBZ0IsQ0FBQztNQUNoQ3BOLEtBQUssQ0FBQ0ksY0FBYyxFQUFFO0lBQzFCO0VBQ0osQ0FBQyxDQUFDO0VBRUYxQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNxQixFQUFFLENBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFlBQU07SUFDL0MsSUFBTW1QLG9CQUFvQixHQUFHeFEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOEMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDO0lBRWpGLElBQUkwTixvQkFBb0IsQ0FBQ3ZQLE1BQU0sSUFBSSxDQUFDLEVBQUU7TUFDbENzUCw2REFBYyxDQUFDYixnQkFBZ0IsQ0FBQztNQUNoQyxPQUFPLEtBQUs7SUFDaEI7RUFDSixDQUFDLENBQUM7QUFDTixDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBub2QgZnJvbSAnLi9jb21tb24vbm9kJztcclxuaW1wb3J0IFdpc2hsaXN0IGZyb20gJy4vd2lzaGxpc3QnO1xyXG5pbXBvcnQgdmFsaWRhdGlvbiBmcm9tICcuL2NvbW1vbi9mb3JtLXZhbGlkYXRpb24nO1xyXG5pbXBvcnQgc3RhdGVDb3VudHJ5IGZyb20gJy4vY29tbW9uL3N0YXRlLWNvdW50cnknO1xyXG5pbXBvcnQge1xyXG4gICAgY2xhc3NpZnlGb3JtLFxyXG4gICAgVmFsaWRhdG9ycyxcclxuICAgIGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXHJcbiAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkLFxyXG4gICAgY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0LFxyXG59IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xyXG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xyXG5pbXBvcnQgeyBjcmVkaXRDYXJkVHlwZSwgc3RvcmVJbnN0cnVtZW50LCBWYWxpZGF0b3JzIGFzIENDVmFsaWRhdG9ycywgRm9ybWF0dGVycyBhcyBDQ0Zvcm1hdHRlcnMgfSBmcm9tICcuL2NvbW1vbi9wYXltZW50LW1ldGhvZCc7XHJcbmltcG9ydCBzd2FsIGZyb20gJy4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcclxuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY291bnQgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcclxuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xyXG4gICAgICAgIHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgICBjb25zdCAkZWRpdEFjY291bnRGb3JtID0gY2xhc3NpZnlGb3JtKCdmb3JtW2RhdGEtZWRpdC1hY2NvdW50LWZvcm1dJyk7XHJcbiAgICAgICAgY29uc3QgJGFkZHJlc3NGb3JtID0gY2xhc3NpZnlGb3JtKCdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXScpO1xyXG4gICAgICAgIGNvbnN0ICRpbmJveEZvcm0gPSBjbGFzc2lmeUZvcm0oJ2Zvcm1bZGF0YS1pbmJveC1mb3JtXScpO1xyXG4gICAgICAgIGNvbnN0ICRhY2NvdW50UmV0dXJuRm9ybSA9IGNsYXNzaWZ5Rm9ybSgnW2RhdGEtYWNjb3VudC1yZXR1cm4tZm9ybV0nKTtcclxuICAgICAgICBjb25zdCAkcGF5bWVudE1ldGhvZEZvcm0gPSBjbGFzc2lmeUZvcm0oJ2Zvcm1bZGF0YS1wYXltZW50LW1ldGhvZC1mb3JtXScpO1xyXG4gICAgICAgIGNvbnN0ICRyZW9yZGVyRm9ybSA9IGNsYXNzaWZ5Rm9ybSgnW2RhdGEtYWNjb3VudC1yZW9yZGVyLWZvcm1dJyk7XHJcbiAgICAgICAgY29uc3QgJGludm9pY2VCdXR0b24gPSAkKCdbZGF0YS1wcmludC1pbnZvaWNlXScpO1xyXG5cclxuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcclxuXHJcbiAgICAgICAgLy8gSW5qZWN0ZWQgdmlhIHRlbXBsYXRlXHJcbiAgICAgICAgdGhpcy5wYXNzd29yZFJlcXVpcmVtZW50cyA9IHRoaXMuY29udGV4dC5wYXNzd29yZFJlcXVpcmVtZW50cztcclxuXHJcbiAgICAgICAgLy8gSW5zdGFudGlhdGVzIHdpc2ggbGlzdCBKU1xyXG4gICAgICAgIFdpc2hsaXN0LmxvYWQodGhpcy5jb250ZXh0KTtcclxuXHJcbiAgICAgICAgaWYgKCRlZGl0QWNjb3VudEZvcm0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFZGl0QWNjb3VudFZhbGlkYXRpb24oJGVkaXRBY2NvdW50Rm9ybSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzdGF0ZS5pcygnaW5wdXQnKSkge1xyXG4gICAgICAgICAgICAgICAgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCh0aGlzLiRzdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkaW52b2ljZUJ1dHRvbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJGludm9pY2VCdXR0b24ub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdCA9IHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCAvIDIgLSA0NTA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b3AgPSB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0IC8gMiAtIDMyMDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9ICRpbnZvaWNlQnV0dG9uLmRhdGEoJ3ByaW50SW52b2ljZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCwgJ29yZGVySW52b2ljZScsIGB3aWR0aD05MDAsaGVpZ2h0PTY1MCxsZWZ0PSR7bGVmdH0sdG9wPSR7dG9wfSxzY3JvbGxiYXJzPTFgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJGFkZHJlc3NGb3JtLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRBZGRyZXNzRm9ybVZhbGlkYXRpb24oJGFkZHJlc3NGb3JtKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzdGF0ZS5pcygnaW5wdXQnKSkge1xyXG4gICAgICAgICAgICAgICAgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCh0aGlzLiRzdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkaW5ib3hGb3JtLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVySW5ib3hWYWxpZGF0aW9uKCRpbmJveEZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRhY2NvdW50UmV0dXJuRm9ybS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0QWNjb3VudFJldHVybkZvcm1WYWxpZGF0aW9uKCRhY2NvdW50UmV0dXJuRm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJHBheW1lbnRNZXRob2RGb3JtLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRQYXltZW50TWV0aG9kRm9ybVZhbGlkYXRpb24oJHBheW1lbnRNZXRob2RGb3JtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkcmVvcmRlckZvcm0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFJlb3JkZXJGb3JtKCRyZW9yZGVyRm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJpbmREZWxldGVBZGRyZXNzKCk7XHJcbiAgICAgICAgdGhpcy5iaW5kRGVsZXRlUGF5bWVudE1ldGhvZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgYSBzdWJtaXQgaG9vayB0byBlbnN1cmUgdGhlIGN1c3RvbWVyIHJlY2VpdmVzIGEgY29uZmlybWF0aW9uIGRpYWxvZyBiZWZvcmUgZGVsZXRpbmcgYW4gYWRkcmVzc1xyXG4gICAgICovXHJcbiAgICBiaW5kRGVsZXRlQWRkcmVzcygpIHtcclxuICAgICAgICAkKCdbZGF0YS1kZWxldGUtYWRkcmVzc10nKS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdkZWxldGVBZGRyZXNzJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZERlbGV0ZVBheW1lbnRNZXRob2QoKSB7XHJcbiAgICAgICAgJCgnW2RhdGEtZGVsZXRlLXBheW1lbnQtbWV0aG9kXScpLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2RlbGV0ZVBheW1lbnRNZXRob2QnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghd2luZG93LmNvbmZpcm0obWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0UmVvcmRlckZvcm0oJHJlb3JkZXJGb3JtKSB7XHJcbiAgICAgICAgJHJlb3JkZXJGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0UmVvcmRlckNoZWNrYm94ZXMgPSAkKCcuYWNjb3VudC1saXN0SXRlbSAuZm9ybS1jaGVja2JveDpjaGVja2VkJyk7XHJcbiAgICAgICAgICAgIGxldCBzdWJtaXRGb3JtID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAkcmVvcmRlckZvcm0uZmluZCgnW25hbWVePVwicmVvcmRlcml0ZW1cIl0nKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICRwcm9kdWN0UmVvcmRlckNoZWNrYm94ZXMuZWFjaCgoaW5kZXgsIHByb2R1Y3RDaGVja2JveCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJChwcm9kdWN0Q2hlY2tib3gpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgJGlucHV0ID0gJCgnPGlucHV0PicsIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgcmVvcmRlcml0ZW1bJHtwcm9kdWN0SWR9XWAsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcxJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHN1Ym1pdEZvcm0gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRyZW9yZGVyRm9ybS5hcHBlbmQoJGlucHV0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXN1Ym1pdEZvcm0pIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuY29udGV4dC5zZWxlY3RJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRBZGRyZXNzRm9ybVZhbGlkYXRpb24oJGFkZHJlc3NGb3JtKSB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbk1vZGVsID0gdmFsaWRhdGlvbigkYWRkcmVzc0Zvcm0sIHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9ICdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXSBbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nO1xyXG4gICAgICAgIGNvbnN0ICRzdGF0ZUVsZW1lbnQgPSAkKHN0YXRlU2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IGFkZHJlc3NWYWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6ICdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcclxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhZGRyZXNzVmFsaWRhdG9yLmFkZCh2YWxpZGF0aW9uTW9kZWwpO1xyXG5cclxuICAgICAgICBpZiAoJHN0YXRlRWxlbWVudCkge1xyXG4gICAgICAgICAgICBsZXQgJGxhc3Q7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXHJcbiAgICAgICAgICAgIHN0YXRlQ291bnRyeSgkc3RhdGVFbGVtZW50LCB0aGlzLmNvbnRleHQsIChlcnIsIGZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFkZHJlc3NWYWxpZGF0b3IuZ2V0U3RhdHVzKCRzdGF0ZUVsZW1lbnQpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3NWYWxpZGF0b3IucmVtb3ZlKCRzdGF0ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkbGFzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3NWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uKGFkZHJlc3NWYWxpZGF0b3IsIGZpZWxkLCB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmZpZWxkX25vdF9ibGFuayk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY2xlYW5VcFN0YXRlVmFsaWRhdGlvbihmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGFkZHJlc3NGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGFkZHJlc3NWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYWRkcmVzc1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0QWNjb3VudFJldHVybkZvcm1WYWxpZGF0aW9uKCRhY2NvdW50UmV0dXJuRm9ybSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICRhY2NvdW50UmV0dXJuRm9ybS5kYXRhKCdhY2NvdW50UmV0dXJuRm9ybUVycm9yJyk7XHJcblxyXG4gICAgICAgICRhY2NvdW50UmV0dXJuRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZm9ybVN1Ym1pdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gSXRlcmF0ZSB1bnRpbCB3ZSBmaW5kIGEgbm9uLXplcm8gdmFsdWUgaW4gdGhlIGRyb3Bkb3duIGZvciBxdWFudGl0eVxyXG4gICAgICAgICAgICAkKCdbbmFtZV49XCJyZXR1cm5fcXR5XCJdJywgJGFjY291bnRSZXR1cm5Gb3JtKS5lYWNoKChpLCBlbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludCgkKGVsZSkudmFsKCksIDEwKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1TdWJtaXQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBFeGl0IG91dCBvZiBsb29wIGlmIHdlIGZvdW5kIGF0IGxlYXN0IG9uZSByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZm9ybVN1Ym1pdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBlcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRQYXltZW50TWV0aG9kRm9ybVZhbGlkYXRpb24oJHBheW1lbnRNZXRob2RGb3JtKSB7XHJcbiAgICAgICAgLy8gSW5qZWN0IHZhbGlkYXRpb25zIGludG8gZm9ybSBmaWVsZHMgYmVmb3JlIHZhbGlkYXRpb24gcnVuc1xyXG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjZmlyc3RfbmFtZS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuZmlyc3ROYW1lTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XHJcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNsYXN0X25hbWUuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0Lmxhc3ROYW1lTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XHJcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNjb21wYW55LmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5jb21wYW55TGFiZWx9XCIsIFwicmVxdWlyZWRcIjogZmFsc2UsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xyXG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjcGhvbmUuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LnBob25lTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogZmFsc2UsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xyXG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjYWRkcmVzczEuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LmFkZHJlc3MxTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XHJcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNhZGRyZXNzMi5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuYWRkcmVzczJMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiBmYWxzZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XHJcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNjaXR5LmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5jaXR5TGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XHJcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNjb3VudHJ5LmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVzZWxlY3RcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LmNvdW50cnlMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBwcmVmaXg6IFwiJHt0aGlzLmNvbnRleHQuY2hvb3NlQ291bnRyeUxhYmVsfVwiIH1gKTtcclxuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI3N0YXRlLmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5zdGF0ZUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IHRydWUsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xyXG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjcG9zdGFsX2NvZGUuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LnBvc3RhbENvZGVMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcclxuXHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbk1vZGVsID0gdmFsaWRhdGlvbigkcGF5bWVudE1ldGhvZEZvcm0sIHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgY29uc3QgcGF5bWVudE1ldGhvZFNlbGVjdG9yID0gJ2Zvcm1bZGF0YS1wYXltZW50LW1ldGhvZC1mb3JtXSc7XHJcbiAgICAgICAgY29uc3QgcGF5bWVudE1ldGhvZFZhbGlkYXRvciA9IG5vZCh7XHJcbiAgICAgICAgICAgIHN1Ym1pdDogYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFt0eXBlPVwic3VibWl0XCJdYCxcclxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0ICRzdGF0ZUVsZW1lbnQgPSAkKGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdYCk7XHJcblxyXG4gICAgICAgIGxldCAkbGFzdDtcclxuICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXHJcbiAgICAgICAgc3RhdGVDb3VudHJ5KCRzdGF0ZUVsZW1lbnQsIHRoaXMuY29udGV4dCwgKGVyciwgZmllbGQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRmaWVsZCA9ICQoZmllbGQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBheW1lbnRNZXRob2RWYWxpZGF0b3IuZ2V0U3RhdHVzKCRzdGF0ZUVsZW1lbnQpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgcGF5bWVudE1ldGhvZFZhbGlkYXRvci5yZW1vdmUoJHN0YXRlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkbGFzdCkge1xyXG4gICAgICAgICAgICAgICAgcGF5bWVudE1ldGhvZFZhbGlkYXRvci5yZW1vdmUoJGxhc3QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xyXG4gICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuc2V0U3RhdGVDb3VudHJ5VmFsaWRhdGlvbihwYXltZW50TWV0aG9kVmFsaWRhdG9yLCBmaWVsZCwgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS5maWVsZF9ub3RfYmxhbmspO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBVc2UgY3JlZGl0IGNhcmQgbnVtYmVyIGlucHV0IGxpc3RlbmVyIHRvIGhpZ2hsaWdodCBjcmVkaXQgY2FyZCB0eXBlXHJcbiAgICAgICAgbGV0IGNhcmRUeXBlO1xyXG4gICAgICAgICQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiY3JlZGl0X2NhcmRfbnVtYmVyXCJdYCkub24oJ2tleXVwJywgKHsgdGFyZ2V0IH0pID0+IHtcclxuICAgICAgICAgICAgY2FyZFR5cGUgPSBjcmVkaXRDYXJkVHlwZSh0YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoY2FyZFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbWdbYWx0PVwiJHtjYXJkVHlwZX1cIl1gKS5zaWJsaW5ncygpLmNzcygnb3BhY2l0eScsICcuMicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGltZ2ApLmNzcygnb3BhY2l0eScsICcxJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU2V0IG9mIGNyZWRpdCBjYXJkIHZhbGlkYXRpb25cclxuICAgICAgICBDQ1ZhbGlkYXRvcnMuc2V0Q3JlZGl0Q2FyZE51bWJlclZhbGlkYXRpb24ocGF5bWVudE1ldGhvZFZhbGlkYXRvciwgYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiY3JlZGl0X2NhcmRfbnVtYmVyXCJdYCwgdGhpcy5jb250ZXh0LmNyZWRpdENhcmROdW1iZXIpO1xyXG4gICAgICAgIENDVmFsaWRhdG9ycy5zZXRFeHBpcmF0aW9uVmFsaWRhdGlvbihwYXltZW50TWV0aG9kVmFsaWRhdG9yLCBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJleHBpcmF0aW9uXCJdYCwgdGhpcy5jb250ZXh0LmV4cGlyYXRpb24pO1xyXG4gICAgICAgIENDVmFsaWRhdG9ycy5zZXROYW1lT25DYXJkVmFsaWRhdGlvbihwYXltZW50TWV0aG9kVmFsaWRhdG9yLCBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJuYW1lX29uX2NhcmRcIl1gLCB0aGlzLmNvbnRleHQubmFtZU9uQ2FyZCk7XHJcbiAgICAgICAgQ0NWYWxpZGF0b3JzLnNldEN2dlZhbGlkYXRpb24ocGF5bWVudE1ldGhvZFZhbGlkYXRvciwgYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiY3Z2XCJdYCwgdGhpcy5jb250ZXh0LmN2diwgKCkgPT4gY2FyZFR5cGUpO1xyXG5cclxuICAgICAgICAvLyBTZXQgb2YgY3JlZGl0IGNhcmQgZm9ybWF0XHJcbiAgICAgICAgQ0NGb3JtYXR0ZXJzLnNldENyZWRpdENhcmROdW1iZXJGb3JtYXQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiY3JlZGl0X2NhcmRfbnVtYmVyXCJdYCk7XHJcbiAgICAgICAgQ0NGb3JtYXR0ZXJzLnNldEV4cGlyYXRpb25Gb3JtYXQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiZXhwaXJhdGlvblwiXWApO1xyXG5cclxuICAgICAgICAvLyBCaWxsaW5nIGFkZHJlc3MgdmFsaWRhdGlvblxyXG4gICAgICAgIHBheW1lbnRNZXRob2RWYWxpZGF0b3IuYWRkKHZhbGlkYXRpb25Nb2RlbCk7XHJcblxyXG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvLyBQZXJmb3JtIGZpbmFsIGZvcm0gdmFsaWRhdGlvblxyXG4gICAgICAgICAgICBwYXltZW50TWV0aG9kVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xyXG4gICAgICAgICAgICBpZiAocGF5bWVudE1ldGhvZFZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNlcmlhbGl6ZSBmb3JtIGRhdGEgYW5kIHJlZHVjZSBpdCB0byBvYmplY3RcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBfLnJlZHVjZSgkcGF5bWVudE1ldGhvZEZvcm0uc2VyaWFsaXplQXJyYXkoKSwgKG9iaiwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZk9iaiA9IG9iajtcclxuICAgICAgICAgICAgICAgICAgICByZWZPYmpbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZk9iajtcclxuICAgICAgICAgICAgICAgIH0sIHt9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBc3NpZ24gY291bnRyeSBhbmQgc3RhdGUgY29kZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnRyeSA9IF8uZmluZCh0aGlzLmNvbnRleHQuY291bnRyaWVzLCAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSA9PT0gZGF0YS5jb3VudHJ5KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gY291bnRyeSAmJiBfLmZpbmQoY291bnRyeS5zdGF0ZXMsICh7IHZhbHVlIH0pID0+IHZhbHVlID09PSBkYXRhLnN0YXRlKTtcclxuICAgICAgICAgICAgICAgIGRhdGEuY291bnRyeV9jb2RlID0gY291bnRyeSA/IGNvdW50cnkuY29kZSA6IGRhdGEuY291bnRyeTtcclxuICAgICAgICAgICAgICAgIGRhdGEuc3RhdGVfb3JfcHJvdmluY2VfY29kZSA9IHN0YXRlID8gc3RhdGUuY29kZSA6IGRhdGEuc3RhdGU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVmYXVsdCBJbnN0cnVtZW50XHJcbiAgICAgICAgICAgICAgICBkYXRhLmRlZmF1bHRfaW5zdHJ1bWVudCA9ICEhZGF0YS5kZWZhdWx0X2luc3RydW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3RvcmUgY3JlZGl0IGNhcmRcclxuICAgICAgICAgICAgICAgIHN0b3JlSW5zdHJ1bWVudCh0aGlzLmNvbnRleHQsIGRhdGEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuY29udGV4dC5wYXltZW50TWV0aG9kc1VybDtcclxuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLmNvbnRleHQuZ2VuZXJpY19lcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJFZGl0QWNjb3VudFZhbGlkYXRpb24oJGVkaXRBY2NvdW50Rm9ybSkge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25Nb2RlbCA9IHZhbGlkYXRpb24oJGVkaXRBY2NvdW50Rm9ybSwgdGhpcy5jb250ZXh0KTtcclxuICAgICAgICBjb25zdCBmb3JtRWRpdFNlbGVjdG9yID0gJ2Zvcm1bZGF0YS1lZGl0LWFjY291bnQtZm9ybV0nO1xyXG4gICAgICAgIGNvbnN0IGVkaXRWYWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6ICcke2Zvcm1FZGl0U2VsZWN0b3J9IGlucHV0W3R5cGU9XCJzdWJtaXRcIl0nLFxyXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgZW1haWxTZWxlY3RvciA9IGAke2Zvcm1FZGl0U2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJFbWFpbEFkZHJlc3NcIl1gO1xyXG4gICAgICAgIGNvbnN0ICRlbWFpbEVsZW1lbnQgPSAkKGVtYWlsU2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IHBhc3N3b3JkU2VsZWN0b3IgPSBgJHtmb3JtRWRpdFNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPVwiUGFzc3dvcmRcIl1gO1xyXG4gICAgICAgIGNvbnN0ICRwYXNzd29yZEVsZW1lbnQgPSAkKHBhc3N3b3JkU2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IHBhc3N3b3JkMlNlbGVjdG9yID0gYCR7Zm9ybUVkaXRTZWxlY3Rvcn0gW2RhdGEtZmllbGQtdHlwZT1cIkNvbmZpcm1QYXNzd29yZFwiXWA7XHJcbiAgICAgICAgY29uc3QgJHBhc3N3b3JkMkVsZW1lbnQgPSAkKHBhc3N3b3JkMlNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50UGFzc3dvcmRTZWxlY3RvciA9IGAke2Zvcm1FZGl0U2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJDdXJyZW50UGFzc3dvcmRcIl1gO1xyXG4gICAgICAgIGNvbnN0ICRjdXJyZW50UGFzc3dvcmQgPSAkKGN1cnJlbnRQYXNzd29yZFNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBvbmx5IGhhbmRsZXMgdGhlIGN1c3RvbSBmaWVsZHMsIHN0YW5kYXJkIGZpZWxkcyBhcmUgYWRkZWQgYmVsb3dcclxuICAgICAgICBlZGl0VmFsaWRhdG9yLmFkZCh2YWxpZGF0aW9uTW9kZWwpO1xyXG5cclxuICAgICAgICBpZiAoJGVtYWlsRWxlbWVudCkge1xyXG4gICAgICAgICAgICBlZGl0VmFsaWRhdG9yLnJlbW92ZShlbWFpbFNlbGVjdG9yKTtcclxuICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRFbWFpbFZhbGlkYXRpb24oZWRpdFZhbGlkYXRvciwgZW1haWxTZWxlY3RvciwgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS52YWxpZF9lbWFpbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJHBhc3N3b3JkRWxlbWVudCAmJiAkcGFzc3dvcmQyRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IHBhc3N3b3JkOiBlbnRlclBhc3N3b3JkLCBwYXNzd29yZF9tYXRjaDogbWF0Y2hQYXNzd29yZCwgaW52YWxpZF9wYXNzd29yZDogaW52YWxpZFBhc3N3b3JkIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xyXG4gICAgICAgICAgICBlZGl0VmFsaWRhdG9yLnJlbW92ZShwYXNzd29yZFNlbGVjdG9yKTtcclxuICAgICAgICAgICAgZWRpdFZhbGlkYXRvci5yZW1vdmUocGFzc3dvcmQyU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnNldFBhc3N3b3JkVmFsaWRhdGlvbihcclxuICAgICAgICAgICAgICAgIGVkaXRWYWxpZGF0b3IsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZFNlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQyU2VsZWN0b3IsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3N3b3JkUmVxdWlyZW1lbnRzLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0KGVudGVyUGFzc3dvcmQsIGVudGVyUGFzc3dvcmQsIG1hdGNoUGFzc3dvcmQsIGludmFsaWRQYXNzd29yZCksXHJcbiAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRjdXJyZW50UGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgZWRpdFZhbGlkYXRvci5hZGQoe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGN1cnJlbnRQYXNzd29yZFNlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT09ICcnICYmICRwYXNzd29yZEVsZW1lbnQudmFsKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5jdXJyZW50UGFzc3dvcmQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWRpdFZhbGlkYXRvci5hZGQoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7Zm9ybUVkaXRTZWxlY3Rvcn0gaW5wdXRbbmFtZT0nYWNjb3VudF9maXJzdG5hbWUnXWAsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmZpcnN0TmFtZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke2Zvcm1FZGl0U2VsZWN0b3J9IGlucHV0W25hbWU9J2FjY291bnRfbGFzdG5hbWUnXWAsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0Lmxhc3ROYW1lLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICAkZWRpdEFjY291bnRGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGVkaXRWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZWRpdFZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RlckluYm94VmFsaWRhdGlvbigkaW5ib3hGb3JtKSB7XHJcbiAgICAgICAgY29uc3QgaW5ib3hWYWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6ICdmb3JtW2RhdGEtaW5ib3gtZm9ybV0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXHJcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW5ib3hWYWxpZGF0b3IuYWRkKFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdmb3JtW2RhdGEtaW5ib3gtZm9ybV0gc2VsZWN0W25hbWU9XCJtZXNzYWdlX29yZGVyX2lkXCJdJyxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IE51bWJlcih2YWwpICE9PSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmVudGVyT3JkZXJOdW0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnZm9ybVtkYXRhLWluYm94LWZvcm1dIGlucHV0W25hbWU9XCJtZXNzYWdlX3N1YmplY3RcIl0nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5lbnRlclN1YmplY3QsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnZm9ybVtkYXRhLWluYm94LWZvcm1dIHRleHRhcmVhW25hbWU9XCJtZXNzYWdlX2NvbnRlbnRcIl0nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5lbnRlck1lc3NhZ2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICRpbmJveEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgaW5ib3hWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5ib3hWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IGNyZWRpdGNhcmRzIGZyb20gJ2NyZWRpdGNhcmRzJztcclxuXHJcbi8qKlxyXG4gKiBPbWl0IG51bGwgb3IgZW1wdHkgc3RyaW5nIHByb3BlcnRpZXMgb2Ygb2JqZWN0XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbmNvbnN0IG9taXROdWxsU3RyaW5nID0gb2JqID0+IHtcclxuICAgIGNvbnN0IHJlZk9iaiA9IG9iajtcclxuXHJcbiAgICAkLmVhY2gocmVmT2JqLCAoa2V5LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHJlZk9ialtrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZWZPYmo7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IGNyZWRpdCBjYXJkIHR5cGUgZnJvbSBjcmVkaXQgY2FyZCBudW1iZXJcclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY3JlZGl0Q2FyZFR5cGUgPSB2YWx1ZSA9PiBjcmVkaXRjYXJkcy5jYXJkLnR5cGUoY3JlZGl0Y2FyZHMuY2FyZC5wYXJzZSh2YWx1ZSksIHRydWUpO1xyXG5cclxuLyoqXHJcbiAqIFdyYXBwZXIgZm9yIGFqYXggcmVxdWVzdCB0byBzdG9yZSBhIG5ldyBpbnN0cnVtZW50IGluIGJpZ3BheVxyXG4gKiBAcGFyYW0ge29iamVjdH0gUmVwcmVzZW50aW5nIHRoZSBkYXRhIG5lZWRlZCBmb3IgdGhlIGhlYWRlclxyXG4gKiBAcGFyYW0ge29iamVjdH0gUmVwcmVzZW50aW5nIHRoZSBkYXRhIG5lZWRlZCBmb3IgdGhlIGJvZHlcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZG9uZSBGdW5jdGlvbiB0byBleGVjdXRlIG9uIGEgc3VjY2Vzc2Z1bCByZXNwb25zZVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmYWlsIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gYSB1bnN1Y2Nlc3NmdWwgcmVzcG9uc2VcclxuICovXHJcbmV4cG9ydCBjb25zdCBzdG9yZUluc3RydW1lbnQgPSAoe1xyXG4gICAgLy8gSG9zdG5hbWUsIElkcyAmIFRva2VuXHJcbiAgICBwYXltZW50c1VybCxcclxuICAgIHNob3BwZXJJZCxcclxuICAgIHN0b3JlSGFzaCxcclxuICAgIHZhdWx0VG9rZW4sXHJcbn0sIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlICovXHJcbiAgICAvLyBQcm92aWRlciBJbmZvXHJcbiAgICBwcm92aWRlcl9pZCxcclxuICAgIGN1cnJlbmN5X2NvZGUsXHJcblxyXG4gICAgLy8gSW5zdHJ1bWVudCBEZXRhaWxzXHJcbiAgICBjcmVkaXRfY2FyZF9udW1iZXIsXHJcbiAgICBleHBpcmF0aW9uLFxyXG4gICAgbmFtZV9vbl9jYXJkLFxyXG4gICAgY3Z2LFxyXG4gICAgZGVmYXVsdF9pbnN0cnVtZW50LFxyXG5cclxuICAgIC8vIEJpbGxpbmcgQWRkcmVzc1xyXG4gICAgYWRkcmVzczEsXHJcbiAgICBhZGRyZXNzMixcclxuICAgIGNpdHksXHJcbiAgICBwb3N0YWxfY29kZSxcclxuICAgIHN0YXRlX29yX3Byb3ZpbmNlX2NvZGUsXHJcbiAgICBjb3VudHJ5X2NvZGUsXHJcbiAgICBjb21wYW55LFxyXG4gICAgZmlyc3RfbmFtZSxcclxuICAgIGxhc3RfbmFtZSxcclxuICAgIGVtYWlsLFxyXG4gICAgcGhvbmUsXHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXHJcbn0sIGRvbmUsIGZhaWwpID0+IHtcclxuICAgIGNvbnN0IGV4cGlyeSA9IGV4cGlyYXRpb24uc3BsaXQoJy8nKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogYCR7cGF5bWVudHNVcmx9L3N0b3Jlcy8ke3N0b3JlSGFzaH0vY3VzdG9tZXJzLyR7c2hvcHBlcklkfS9zdG9yZWRfaW5zdHJ1bWVudHNgLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogdmF1bHRUb2tlbixcclxuICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vdm5kLmJjLnYxK2pzb24nLFxyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3ZuZC5iYy52MStqc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgaW5zdHJ1bWVudDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NhcmQnLFxyXG4gICAgICAgICAgICAgICAgY2FyZGhvbGRlcl9uYW1lOiBuYW1lX29uX2NhcmQsXHJcbiAgICAgICAgICAgICAgICBudW1iZXI6IGNyZWRpdGNhcmRzLmNhcmQucGFyc2UoY3JlZGl0X2NhcmRfbnVtYmVyKSxcclxuICAgICAgICAgICAgICAgIGV4cGlyeV9tb250aDogY3JlZGl0Y2FyZHMuZXhwaXJhdGlvbi5tb250aC5wYXJzZShleHBpcnlbMF0pLFxyXG4gICAgICAgICAgICAgICAgZXhwaXJ5X3llYXI6IGNyZWRpdGNhcmRzLmV4cGlyYXRpb24ueWVhci5wYXJzZShleHBpcnlbMV0sIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgdmVyaWZpY2F0aW9uX3ZhbHVlOiBjdnYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJpbGxpbmdfYWRkcmVzczogb21pdE51bGxTdHJpbmcoe1xyXG4gICAgICAgICAgICAgICAgYWRkcmVzczEsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzMixcclxuICAgICAgICAgICAgICAgIGNpdHksXHJcbiAgICAgICAgICAgICAgICBwb3N0YWxfY29kZSxcclxuICAgICAgICAgICAgICAgIHN0YXRlX29yX3Byb3ZpbmNlX2NvZGUsXHJcbiAgICAgICAgICAgICAgICBjb3VudHJ5X2NvZGUsXHJcbiAgICAgICAgICAgICAgICBjb21wYW55LFxyXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZSxcclxuICAgICAgICAgICAgICAgIGxhc3RfbmFtZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsLFxyXG4gICAgICAgICAgICAgICAgcGhvbmUsXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBwcm92aWRlcl9pZCxcclxuICAgICAgICAgICAgZGVmYXVsdF9pbnN0cnVtZW50LFxyXG4gICAgICAgICAgICBjdXJyZW5jeV9jb2RlLFxyXG4gICAgICAgIH0pLFxyXG4gICAgfSlcclxuICAgICAgICAuZG9uZShkb25lKVxyXG4gICAgICAgIC5mYWlsKGZhaWwpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEZvcm1hdHRlcnMgPSB7XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdXAgYSBmb3JtYXQgZm9yIGNyZWRpdCBjYXJkIG51bWJlclxyXG4gICAgICogQHBhcmFtIGZpZWxkXHJcbiAgICAgKi9cclxuICAgIHNldENyZWRpdENhcmROdW1iZXJGb3JtYXQ6IGZpZWxkID0+IHtcclxuICAgICAgICBpZiAoZmllbGQpIHtcclxuICAgICAgICAgICAgJChmaWVsZCkub24oJ2tleXVwJywgKHsgdGFyZ2V0IH0pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZlRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgIHJlZlRhcmdldC52YWx1ZSA9IGNyZWRpdGNhcmRzLmNhcmQuZm9ybWF0KGNyZWRpdGNhcmRzLmNhcmQucGFyc2UodGFyZ2V0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHVwIGEgZm9ybWF0IGZvciBleHBpcmF0aW9uIGRhdGVcclxuICAgICAqIEBwYXJhbSBmaWVsZFxyXG4gICAgICovXHJcbiAgICBzZXRFeHBpcmF0aW9uRm9ybWF0OiBmaWVsZCA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkKSB7XHJcbiAgICAgICAgICAgICQoZmllbGQpLm9uKCdrZXl1cCcsICh7IHRhcmdldCwgd2hpY2ggfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmVGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHdoaWNoID09PSA4ICYmIC8uKihcXC8pJC8udGVzdCh0YXJnZXQudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmVGFyZ2V0LnZhbHVlID0gdGFyZ2V0LnZhbHVlLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWZUYXJnZXQudmFsdWUgPSB0YXJnZXQudmFsdWUuc2xpY2UoMCwgNSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdoaWNoICE9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmVGFyZ2V0LnZhbHVlID0gdGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFsxLTldXFwvfFsyLTldKSQvZywgJzAkMS8nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXigwWzEtOV18MVswLTJdKSQvZywgJyQxLycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFswLTFdKShbMy05XSkkL2csICcwJDEvJDInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXigwWzEtOV18MVswLTJdKShbMC05XXsyfSkkL2csICckMS8kMicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFswXSspXFwvfFswXSskL2csICcwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1teXFxkXFwvXXxeW1xcL10qJC9nLCAnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcLy9nLCAnLycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFZhbGlkYXRvcnMgPSB7XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdXAgYSB2YWxpZGF0aW9uIGZvciBjcmVkaXQgY2FyZCBudW1iZXJcclxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcclxuICAgICAqIEBwYXJhbSBmaWVsZFxyXG4gICAgICogQHBhcmFtIGVycm9yTWVzc2FnZVxyXG4gICAgICovXHJcbiAgICBzZXRDcmVkaXRDYXJkTnVtYmVyVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgZmllbGQsIGVycm9yTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGlmIChmaWVsZCkge1xyXG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5sZW5ndGggJiYgY3JlZGl0Y2FyZHMuY2FyZC5pc1ZhbGlkKGNyZWRpdGNhcmRzLmNhcmQucGFyc2UodmFsKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCBhIHZhbGlkYXRpb24gZm9yIGV4cGlyYXRpb24gZGF0ZVxyXG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxyXG4gICAgICogQHBhcmFtIGZpZWxkXHJcbiAgICAgKiBAcGFyYW0gZXJyb3JNZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIHNldEV4cGlyYXRpb25WYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkKSB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwaXJ5ID0gdmFsLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbC5sZW5ndGggJiYgL14oMFsxLTldfDFbMC0yXSlcXC8oWzAtOV17Mn0pJC8udGVzdCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCAmJiAhY3JlZGl0Y2FyZHMuZXhwaXJhdGlvbi5pc1Bhc3QoY3JlZGl0Y2FyZHMuZXhwaXJhdGlvbi5tb250aC5wYXJzZShleHBpcnlbMF0pLCBjcmVkaXRjYXJkcy5leHBpcmF0aW9uLnllYXIucGFyc2UoZXhwaXJ5WzFdLCB0cnVlKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCBhIHZhbGlkYXRpb24gZm9yIG5hbWUgb24gY2FyZFxyXG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxyXG4gICAgICogQHBhcmFtIGZpZWxkXHJcbiAgICAgKiBAcGFyYW0gZXJyb3JNZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIHNldE5hbWVPbkNhcmRWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkKSB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gISF2YWwubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdXAgYSB2YWxpZGF0aW9uIGZvciBjdnZcclxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcclxuICAgICAqIEBwYXJhbSBmaWVsZFxyXG4gICAgICogQHBhcmFtIGVycm9yTWVzc2FnZVxyXG4gICAgICogQHBhcmFtIHthbnl9IGNhcmRUeXBlIFRoZSBjcmVkaXQgY2FyZCBudW1iZXIgdHlwZVxyXG4gICAgICovXHJcbiAgICBzZXRDdnZWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JNZXNzYWdlLCBjYXJkVHlwZSkgPT4ge1xyXG4gICAgICAgIGlmIChmaWVsZCkge1xyXG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgY2FyZFR5cGUgPT09ICdmdW5jdGlvbicgPyBjYXJkVHlwZSgpIDogY2FyZFR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aCAmJiBjcmVkaXRjYXJkcy5jdmMuaXNWYWxpZCh2YWwsIHR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufTtcclxuIiwiaW1wb3J0IHsgc2hvd0FsZXJ0TW9kYWwgfSBmcm9tICcuL21vZGFsJztcclxuXHJcbmZ1bmN0aW9uIGRlY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xyXG4gICAgY29uc3QgaW5kZXggPSBjb3VudGVyLmluZGV4T2YoaXRlbSk7XHJcblxyXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICBjb3VudGVyLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xyXG4gICAgY291bnRlci5wdXNoKGl0ZW0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVDb3VudGVyTmF2KGNvdW50ZXIsICRsaW5rLCB1cmxzKSB7XHJcbiAgICBpZiAoY291bnRlci5sZW5ndGggIT09IDApIHtcclxuICAgICAgICBpZiAoISRsaW5rLmlzKCd2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgJGxpbmsuYWRkQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGxpbmsuYXR0cignaHJlZicsIGAke3VybHMuY29tcGFyZX0vJHtjb3VudGVyLmpvaW4oJy8nKX1gKTtcclxuICAgICAgICAkbGluay5maW5kKCdzcGFuLmNvdW50UGlsbCcpLmh0bWwoY291bnRlci5sZW5ndGgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkbGluay5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyBub0NvbXBhcmVNZXNzYWdlLCB1cmxzIH0pIHtcclxuICAgIGxldCBjb21wYXJlQ291bnRlciA9IFtdO1xyXG5cclxuICAgIGNvbnN0ICRjb21wYXJlTGluayA9ICQoJ2FbZGF0YS1jb21wYXJlLW5hdl0nKTtcclxuXHJcbiAgICAkKCdib2R5Jykub24oJ2NvbXBhcmVSZXNldCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCAkY2hlY2tlZCA9ICQoJ2JvZHknKS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdHNcXFtcXF1cIl06Y2hlY2tlZCcpO1xyXG5cclxuICAgICAgICBjb21wYXJlQ291bnRlciA9ICRjaGVja2VkLmxlbmd0aCA/ICRjaGVja2VkLm1hcCgoaW5kZXgsIGVsZW1lbnQpID0+IGVsZW1lbnQudmFsdWUpLmdldCgpIDogW107XHJcbiAgICAgICAgdXBkYXRlQ291bnRlck5hdihjb21wYXJlQ291bnRlciwgJGNvbXBhcmVMaW5rLCB1cmxzKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJlLWlkXScsIGV2ZW50ID0+IHtcclxuICAgICAgICBjb25zdCBwcm9kdWN0ID0gZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZTtcclxuICAgICAgICBjb25zdCAkY2xpY2tlZENvbXBhcmVMaW5rID0gJCgnYVtkYXRhLWNvbXBhcmUtbmF2XScpO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIGluY3JlbWVudENvdW50ZXIoY29tcGFyZUNvdW50ZXIsIHByb2R1Y3QpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlY3JlbWVudENvdW50ZXIoY29tcGFyZUNvdW50ZXIsIHByb2R1Y3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlQ291bnRlck5hdihjb21wYXJlQ291bnRlciwgJGNsaWNrZWRDb21wYXJlTGluaywgdXJscyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5Jykub24oJ3N1Ym1pdCcsICdbZGF0YS1wcm9kdWN0LWNvbXBhcmVdJywgZXZlbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0ICR0aGlzID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBjb25zdCBwcm9kdWN0c1RvQ29tcGFyZSA9ICR0aGlzLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0c1xcW1xcXVwiXTpjaGVja2VkJyk7XHJcblxyXG4gICAgICAgIGlmIChwcm9kdWN0c1RvQ29tcGFyZS5sZW5ndGggPD0gMSkge1xyXG4gICAgICAgICAgICBzaG93QWxlcnRNb2RhbChub0NvbXBhcmVNZXNzYWdlKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ2FbZGF0YS1jb21wYXJlLW5hdl0nLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJGNsaWNrZWRDaGVja2VkSW5wdXQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgaWYgKCRjbGlja2VkQ2hlY2tlZElucHV0Lmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKG5vQ29tcGFyZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==