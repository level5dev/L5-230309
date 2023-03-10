(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./assets/js/theme/auth.js":
/*!*********************************!*\
  !*** ./assets/js/theme/auth.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Auth; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_form_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/form-validation */ "./assets/js/theme/common/form-validation.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Auth = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Auth, _PageManager);
  function Auth(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_6__["createTranslationDictionary"])(context);
    _this.formCreateSelector = 'form[data-create-account-form]';
    _this.recaptcha = $('.g-recaptcha iframe[src]');
    return _this;
  }
  var _proto = Auth.prototype;
  _proto.registerLoginValidation = function registerLoginValidation($loginForm) {
    var _this2 = this;
    var loginModel = _common_models_forms__WEBPACK_IMPORTED_MODULE_4__["default"];
    this.loginValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: '.login-form input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });
    this.loginValidator.add([{
      selector: '.login-form input[name="login_email"]',
      validate: function validate(cb, val) {
        var result = loginModel.email(val);
        cb(result);
      },
      errorMessage: this.context.useValidEmail
    }, {
      selector: '.login-form input[name="login_pass"]',
      validate: function validate(cb, val) {
        var result = loginModel.password(val);
        cb(result);
      },
      errorMessage: this.context.enterPass
    }]);
    $loginForm.on('submit', function (event) {
      _this2.loginValidator.performCheck();
      if (_this2.loginValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.registerForgotPasswordValidation = function registerForgotPasswordValidation($forgotPasswordForm) {
    var _this3 = this;
    this.forgotPasswordValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: '.forgot-password-form input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });
    this.forgotPasswordValidator.add([{
      selector: '.forgot-password-form input[name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_4__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.useValidEmail
    }]);
    $forgotPasswordForm.on('submit', function (event) {
      _this3.forgotPasswordValidator.performCheck();
      if (_this3.forgotPasswordValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.registerNewPasswordValidation = function registerNewPasswordValidation() {
    var _this$validationDicti = this.validationDictionary,
      enterPassword = _this$validationDicti.password,
      matchPassword = _this$validationDicti.password_match,
      invalidPassword = _this$validationDicti.invalid_password;
    var newPasswordForm = '.new-password-form';
    var newPasswordValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: $(newPasswordForm + " input[type=\"submit\"]"),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });
    var passwordSelector = $(newPasswordForm + " input[name=\"password\"]");
    var password2Selector = $(newPasswordForm + " input[name=\"password_confirm\"]");
    var errorTextMessages = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["createPasswordValidationErrorTextObject"])(enterPassword, enterPassword, matchPassword, invalidPassword);
    _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setPasswordValidation(newPasswordValidator, passwordSelector, password2Selector, this.passwordRequirements, errorTextMessages);
  };
  _proto.registerCreateAccountValidator = function registerCreateAccountValidator($createAccountForm) {
    var _this4 = this;
    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_3__["default"])($createAccountForm, this.context);
    var createAccountValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: this.formCreateSelector + " input[type='submit']",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });
    var $stateElement = $('[data-field-type="State"]');
    var emailSelector = this.formCreateSelector + " [data-field-type='EmailAddress']";
    var $emailElement = $(emailSelector);
    var passwordSelector = this.formCreateSelector + " [data-field-type='Password']";
    var $passwordElement = $(passwordSelector);
    var password2Selector = this.formCreateSelector + " [data-field-type='ConfirmPassword']";
    var $password2Element = $(password2Selector);
    createAccountValidator.add(validationModel);
    if ($stateElement) {
      var $last;

      // Requests the states for a country with AJAX
      Object(_common_state_country__WEBPACK_IMPORTED_MODULE_1__["default"])($stateElement, this.context, function (err, field) {
        if (err) {
          throw new Error(err);
        }
        var $field = $(field);
        if (createAccountValidator.getStatus($stateElement) !== 'undefined') {
          createAccountValidator.remove($stateElement);
        }
        if ($last) {
          createAccountValidator.remove($last);
        }
        if ($field.is('select')) {
          $last = field;
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setStateCountryValidation(createAccountValidator, field, _this4.validationDictionary.field_not_blank);
        } else {
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].cleanUpStateValidation(field);
        }
      });
    }
    if ($emailElement) {
      createAccountValidator.remove(emailSelector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setEmailValidation(createAccountValidator, emailSelector, this.validationDictionary.valid_email);
    }
    if ($passwordElement && $password2Element) {
      var _this$validationDicti2 = this.validationDictionary,
        enterPassword = _this$validationDicti2.password,
        matchPassword = _this$validationDicti2.password_match,
        invalidPassword = _this$validationDicti2.invalid_password;
      createAccountValidator.remove(passwordSelector);
      createAccountValidator.remove(password2Selector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setPasswordValidation(createAccountValidator, passwordSelector, password2Selector, this.passwordRequirements, Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["createPasswordValidationErrorTextObject"])(enterPassword, enterPassword, matchPassword, invalidPassword));
    }
    $createAccountForm.on('submit', function (event) {
      createAccountValidator.performCheck();
      if (createAccountValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  }

  /**
   * Request is made in this function to the remote endpoint and pulls back the states for country.
   */;
  _proto.onReady = function onReady() {
    if (!this.recaptcha.attr('title')) {
      this.recaptcha.attr('title', this.context.recaptchaTitle);
    }
    var $createAccountForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])(this.formCreateSelector);
    var $loginForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.login-form');
    var $forgotPasswordForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.forgot-password-form');
    var $newPasswordForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.new-password-form'); // reset password

    // Injected via auth.html
    this.passwordRequirements = this.context.passwordRequirements;
    if ($loginForm.length) {
      this.registerLoginValidation($loginForm);
    }
    if ($newPasswordForm.length) {
      this.registerNewPasswordValidation();
    }
    if ($forgotPasswordForm.length) {
      this.registerForgotPasswordValidation($forgotPasswordForm);
    }
    if ($createAccountForm.length) {
      this.registerCreateAccountValidator($createAccountForm);
    }
  };
  return Auth;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ "./node_modules/lodash/_createBaseFor.js");

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),

/***/ "./node_modules/lodash/_baseForOwn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseForOwn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(/*! ./_baseFor */ "./node_modules/lodash/_baseFor.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),

/***/ "./node_modules/lodash/_baseIteratee.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIteratee.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),

/***/ "./node_modules/lodash/each.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/each.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "./node_modules/lodash/transform.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/transform.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayEach = __webpack_require__(/*! ./_arrayEach */ "./node_modules/lodash/_arrayEach.js"),
    baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/lodash/_baseCreate.js"),
    baseForOwn = __webpack_require__(/*! ./_baseForOwn */ "./node_modules/lodash/_baseForOwn.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/**
 * An alternative to `_.reduce`; this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable string keyed properties thru `iteratee`, with each invocation
 * potentially mutating the `accumulator` object. If `accumulator` is not
 * provided, a new object with the same `[[Prototype]]` will be used. The
 * iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 1.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * _.transform([2, 3, 4], function(result, n) {
 *   result.push(n *= n);
 *   return n % 2 == 0;
 * }, []);
 * // => [4, 9]
 *
 * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */
function transform(object, iteratee, accumulator) {
  var isArr = isArray(object),
      isArrLike = isArr || isBuffer(object) || isTypedArray(object);

  iteratee = baseIteratee(iteratee, 4);
  if (accumulator == null) {
    var Ctor = object && object.constructor;
    if (isArrLike) {
      accumulator = isArr ? new Ctor : [];
    }
    else if (isObject(object)) {
      accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
    }
    else {
      accumulator = {};
    }
  }
  (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
    return iteratee(accumulator, value, index, object);
  });
  return accumulator;
}

module.exports = transform;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUVhY2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VGb3JPd24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUl0ZXJhdGVlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NyZWF0ZUJhc2VGb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9lYWNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL3RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6WyJBdXRoIiwiX1BhZ2VNYW5hZ2VyIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJmb3JtQ3JlYXRlU2VsZWN0b3IiLCJyZWNhcHRjaGEiLCIkIiwiX3Byb3RvIiwicHJvdG90eXBlIiwicmVnaXN0ZXJMb2dpblZhbGlkYXRpb24iLCIkbG9naW5Gb3JtIiwiX3RoaXMyIiwibG9naW5Nb2RlbCIsImZvcm1zIiwibG9naW5WYWxpZGF0b3IiLCJub2QiLCJzdWJtaXQiLCJ0YXAiLCJhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwidmFsIiwicmVzdWx0IiwiZW1haWwiLCJlcnJvck1lc3NhZ2UiLCJ1c2VWYWxpZEVtYWlsIiwicGFzc3dvcmQiLCJlbnRlclBhc3MiLCJvbiIsImV2ZW50IiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwicHJldmVudERlZmF1bHQiLCJyZWdpc3RlckZvcmdvdFBhc3N3b3JkVmFsaWRhdGlvbiIsIiRmb3Jnb3RQYXNzd29yZEZvcm0iLCJfdGhpczMiLCJmb3Jnb3RQYXNzd29yZFZhbGlkYXRvciIsInJlZ2lzdGVyTmV3UGFzc3dvcmRWYWxpZGF0aW9uIiwiX3RoaXMkdmFsaWRhdGlvbkRpY3RpIiwiZW50ZXJQYXNzd29yZCIsIm1hdGNoUGFzc3dvcmQiLCJwYXNzd29yZF9tYXRjaCIsImludmFsaWRQYXNzd29yZCIsImludmFsaWRfcGFzc3dvcmQiLCJuZXdQYXNzd29yZEZvcm0iLCJuZXdQYXNzd29yZFZhbGlkYXRvciIsInBhc3N3b3JkU2VsZWN0b3IiLCJwYXNzd29yZDJTZWxlY3RvciIsImVycm9yVGV4dE1lc3NhZ2VzIiwiY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0IiwiVmFsaWRhdG9ycyIsInNldFBhc3N3b3JkVmFsaWRhdGlvbiIsInBhc3N3b3JkUmVxdWlyZW1lbnRzIiwicmVnaXN0ZXJDcmVhdGVBY2NvdW50VmFsaWRhdG9yIiwiJGNyZWF0ZUFjY291bnRGb3JtIiwiX3RoaXM0IiwidmFsaWRhdGlvbk1vZGVsIiwidmFsaWRhdGlvbiIsImNyZWF0ZUFjY291bnRWYWxpZGF0b3IiLCIkc3RhdGVFbGVtZW50IiwiZW1haWxTZWxlY3RvciIsIiRlbWFpbEVsZW1lbnQiLCIkcGFzc3dvcmRFbGVtZW50IiwiJHBhc3N3b3JkMkVsZW1lbnQiLCIkbGFzdCIsInN0YXRlQ291bnRyeSIsImVyciIsImZpZWxkIiwiRXJyb3IiLCIkZmllbGQiLCJnZXRTdGF0dXMiLCJyZW1vdmUiLCJpcyIsInNldFN0YXRlQ291bnRyeVZhbGlkYXRpb24iLCJmaWVsZF9ub3RfYmxhbmsiLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwic2V0RW1haWxWYWxpZGF0aW9uIiwidmFsaWRfZW1haWwiLCJfdGhpcyR2YWxpZGF0aW9uRGljdGkyIiwib25SZWFkeSIsImF0dHIiLCJyZWNhcHRjaGFUaXRsZSIsImNsYXNzaWZ5Rm9ybSIsIiRuZXdQYXNzd29yZEZvcm0iLCJsZW5ndGgiLCJQYWdlTWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBQ1M7QUFDbkI7QUFDbUI7QUFDUjtBQU1QO0FBQzZDO0FBQUEsSUFFM0RBLElBQUksMEJBQUFDLFlBQUE7RUFBQUMsY0FBQSxDQUFBRixJQUFBLEVBQUFDLFlBQUE7RUFDckIsU0FBQUQsS0FBWUcsT0FBTyxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUNqQkEsS0FBQSxHQUFBSCxZQUFBLENBQUFJLElBQUEsT0FBTUYsT0FBTyxDQUFDO0lBQ2RDLEtBQUEsQ0FBS0Usb0JBQW9CLEdBQUdDLG9HQUEyQixDQUFDSixPQUFPLENBQUM7SUFDaEVDLEtBQUEsQ0FBS0ksa0JBQWtCLEdBQUcsZ0NBQWdDO0lBQzFESixLQUFBLENBQUtLLFNBQVMsR0FBR0MsQ0FBQyxDQUFDLDBCQUEwQixDQUFDO0lBQUMsT0FBQU4sS0FBQTtFQUNuRDtFQUFDLElBQUFPLE1BQUEsR0FBQVgsSUFBQSxDQUFBWSxTQUFBO0VBQUFELE1BQUEsQ0FFREUsdUJBQXVCLEdBQXZCLFNBQUFBLHdCQUF3QkMsVUFBVSxFQUFFO0lBQUEsSUFBQUMsTUFBQTtJQUNoQyxJQUFNQyxVQUFVLEdBQUdDLDREQUFLO0lBRXhCLElBQUksQ0FBQ0MsY0FBYyxHQUFHQywyREFBRyxDQUFDO01BQ3RCQyxNQUFNLEVBQUUsa0NBQWtDO01BQzFDQyxHQUFHLEVBQUVDLGtGQUF5QkE7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDSixjQUFjLENBQUNLLEdBQUcsQ0FBQyxDQUNwQjtNQUNJQyxRQUFRLEVBQUUsdUNBQXVDO01BQ2pEQyxRQUFRLEVBQUUsU0FBQUEsU0FBQ0MsRUFBRSxFQUFFQyxHQUFHLEVBQUs7UUFDbkIsSUFBTUMsTUFBTSxHQUFHWixV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QWM7QUFDdkMsZUFBZSxtQkFBTyxDQUFDLHFEQUFZO0FBQ25DLG1CQUFtQixtQkFBTyxDQUFDLDZEQUFnQjs7QUFFM0M7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxFQUFFO0FBQ2IsYUFBYSxFQUFFO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsZ0JBQWdCLHlCQUF5QjtBQUN6QztBQUNBLElBQUksSUFBSTtBQUNSLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuOC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XHJcbmltcG9ydCBzdGF0ZUNvdW50cnkgZnJvbSAnLi9jb21tb24vc3RhdGUtY291bnRyeSc7XHJcbmltcG9ydCBub2QgZnJvbSAnLi9jb21tb24vbm9kJztcclxuaW1wb3J0IHZhbGlkYXRpb24gZnJvbSAnLi9jb21tb24vZm9ybS12YWxpZGF0aW9uJztcclxuaW1wb3J0IGZvcm1zIGZyb20gJy4vY29tbW9uL21vZGVscy9mb3Jtcyc7XHJcbmltcG9ydCB7XHJcbiAgICBjbGFzc2lmeUZvcm0sXHJcbiAgICBWYWxpZGF0b3JzLFxyXG4gICAgY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0LFxyXG4gICAgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcclxufSBmcm9tICcuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcclxuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dGggZXh0ZW5kcyBQYWdlTWFuYWdlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGVTZWxlY3RvciA9ICdmb3JtW2RhdGEtY3JlYXRlLWFjY291bnQtZm9ybV0nO1xyXG4gICAgICAgIHRoaXMucmVjYXB0Y2hhID0gJCgnLmctcmVjYXB0Y2hhIGlmcmFtZVtzcmNdJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJMb2dpblZhbGlkYXRpb24oJGxvZ2luRm9ybSkge1xyXG4gICAgICAgIGNvbnN0IGxvZ2luTW9kZWwgPSBmb3JtcztcclxuXHJcbiAgICAgICAgdGhpcy5sb2dpblZhbGlkYXRvciA9IG5vZCh7XHJcbiAgICAgICAgICAgIHN1Ym1pdDogJy5sb2dpbi1mb3JtIGlucHV0W3R5cGU9XCJzdWJtaXRcIl0nLFxyXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9naW5WYWxpZGF0b3IuYWRkKFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcubG9naW4tZm9ybSBpbnB1dFtuYW1lPVwibG9naW5fZW1haWxcIl0nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbG9naW5Nb2RlbC5lbWFpbCh2YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnVzZVZhbGlkRW1haWwsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnLmxvZ2luLWZvcm0gaW5wdXRbbmFtZT1cImxvZ2luX3Bhc3NcIl0nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbG9naW5Nb2RlbC5wYXNzd29yZCh2YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmVudGVyUGFzcyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgJGxvZ2luRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubG9naW5WYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJGb3Jnb3RQYXNzd29yZFZhbGlkYXRpb24oJGZvcmdvdFBhc3N3b3JkRm9ybSkge1xyXG4gICAgICAgIHRoaXMuZm9yZ290UGFzc3dvcmRWYWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6ICcuZm9yZ290LXBhc3N3b3JkLWZvcm0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXHJcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3Jnb3RQYXNzd29yZFZhbGlkYXRvci5hZGQoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJy5mb3Jnb3QtcGFzc3dvcmQtZm9ybSBpbnB1dFtuYW1lPVwiZW1haWxcIl0nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm9ybXMuZW1haWwodmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC51c2VWYWxpZEVtYWlsLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICAkZm9yZ290UGFzc3dvcmRGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yZ290UGFzc3dvcmRWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5mb3Jnb3RQYXNzd29yZFZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck5ld1Bhc3N3b3JkVmFsaWRhdGlvbigpIHtcclxuICAgICAgICBjb25zdCB7IHBhc3N3b3JkOiBlbnRlclBhc3N3b3JkLCBwYXNzd29yZF9tYXRjaDogbWF0Y2hQYXNzd29yZCwgaW52YWxpZF9wYXNzd29yZDogaW52YWxpZFBhc3N3b3JkIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xyXG4gICAgICAgIGNvbnN0IG5ld1Bhc3N3b3JkRm9ybSA9ICcubmV3LXBhc3N3b3JkLWZvcm0nO1xyXG4gICAgICAgIGNvbnN0IG5ld1Bhc3N3b3JkVmFsaWRhdG9yID0gbm9kKHtcclxuICAgICAgICAgICAgc3VibWl0OiAkKGAke25ld1Bhc3N3b3JkRm9ybX0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXWApLFxyXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcGFzc3dvcmRTZWxlY3RvciA9ICQoYCR7bmV3UGFzc3dvcmRGb3JtfSBpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl1gKTtcclxuICAgICAgICBjb25zdCBwYXNzd29yZDJTZWxlY3RvciA9ICQoYCR7bmV3UGFzc3dvcmRGb3JtfSBpbnB1dFtuYW1lPVwicGFzc3dvcmRfY29uZmlybVwiXWApO1xyXG4gICAgICAgIGNvbnN0IGVycm9yVGV4dE1lc3NhZ2VzID0gY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0KGVudGVyUGFzc3dvcmQsIGVudGVyUGFzc3dvcmQsIG1hdGNoUGFzc3dvcmQsIGludmFsaWRQYXNzd29yZCk7XHJcbiAgICAgICAgVmFsaWRhdG9ycy5zZXRQYXNzd29yZFZhbGlkYXRpb24oXHJcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkVmFsaWRhdG9yLFxyXG4gICAgICAgICAgICBwYXNzd29yZFNlbGVjdG9yLFxyXG4gICAgICAgICAgICBwYXNzd29yZDJTZWxlY3RvcixcclxuICAgICAgICAgICAgdGhpcy5wYXNzd29yZFJlcXVpcmVtZW50cyxcclxuICAgICAgICAgICAgZXJyb3JUZXh0TWVzc2FnZXMsXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RlckNyZWF0ZUFjY291bnRWYWxpZGF0b3IoJGNyZWF0ZUFjY291bnRGb3JtKSB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbk1vZGVsID0gdmFsaWRhdGlvbigkY3JlYXRlQWNjb3VudEZvcm0sIHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgY29uc3QgY3JlYXRlQWNjb3VudFZhbGlkYXRvciA9IG5vZCh7XHJcbiAgICAgICAgICAgIHN1Ym1pdDogYCR7dGhpcy5mb3JtQ3JlYXRlU2VsZWN0b3J9IGlucHV0W3R5cGU9J3N1Ym1pdCddYCxcclxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0ICRzdGF0ZUVsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcclxuICAgICAgICBjb25zdCBlbWFpbFNlbGVjdG9yID0gYCR7dGhpcy5mb3JtQ3JlYXRlU2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9J0VtYWlsQWRkcmVzcyddYDtcclxuICAgICAgICBjb25zdCAkZW1haWxFbGVtZW50ID0gJChlbWFpbFNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCBwYXNzd29yZFNlbGVjdG9yID0gYCR7dGhpcy5mb3JtQ3JlYXRlU2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9J1Bhc3N3b3JkJ11gO1xyXG4gICAgICAgIGNvbnN0ICRwYXNzd29yZEVsZW1lbnQgPSAkKHBhc3N3b3JkU2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IHBhc3N3b3JkMlNlbGVjdG9yID0gYCR7dGhpcy5mb3JtQ3JlYXRlU2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9J0NvbmZpcm1QYXNzd29yZCddYDtcclxuICAgICAgICBjb25zdCAkcGFzc3dvcmQyRWxlbWVudCA9ICQocGFzc3dvcmQyU2VsZWN0b3IpO1xyXG5cclxuICAgICAgICBjcmVhdGVBY2NvdW50VmFsaWRhdG9yLmFkZCh2YWxpZGF0aW9uTW9kZWwpO1xyXG5cclxuICAgICAgICBpZiAoJHN0YXRlRWxlbWVudCkge1xyXG4gICAgICAgICAgICBsZXQgJGxhc3Q7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXHJcbiAgICAgICAgICAgIHN0YXRlQ291bnRyeSgkc3RhdGVFbGVtZW50LCB0aGlzLmNvbnRleHQsIChlcnIsIGZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNyZWF0ZUFjY291bnRWYWxpZGF0b3IuZ2V0U3RhdHVzKCRzdGF0ZUVsZW1lbnQpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUFjY291bnRWYWxpZGF0b3IucmVtb3ZlKCRzdGF0ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkbGFzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUFjY291bnRWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uKGNyZWF0ZUFjY291bnRWYWxpZGF0b3IsIGZpZWxkLCB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmZpZWxkX25vdF9ibGFuayk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY2xlYW5VcFN0YXRlVmFsaWRhdGlvbihmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRlbWFpbEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY3JlYXRlQWNjb3VudFZhbGlkYXRvci5yZW1vdmUoZW1haWxTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMuc2V0RW1haWxWYWxpZGF0aW9uKGNyZWF0ZUFjY291bnRWYWxpZGF0b3IsIGVtYWlsU2VsZWN0b3IsIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkudmFsaWRfZW1haWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRwYXNzd29yZEVsZW1lbnQgJiYgJHBhc3N3b3JkMkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBwYXNzd29yZDogZW50ZXJQYXNzd29yZCwgcGFzc3dvcmRfbWF0Y2g6IG1hdGNoUGFzc3dvcmQsIGludmFsaWRfcGFzc3dvcmQ6IGludmFsaWRQYXNzd29yZCB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZUFjY291bnRWYWxpZGF0b3IucmVtb3ZlKHBhc3N3b3JkU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBjcmVhdGVBY2NvdW50VmFsaWRhdG9yLnJlbW92ZShwYXNzd29yZDJTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMuc2V0UGFzc3dvcmRWYWxpZGF0aW9uKFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWNjb3VudFZhbGlkYXRvcixcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkU2VsZWN0b3IsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDJTZWxlY3RvcixcclxuICAgICAgICAgICAgICAgIHRoaXMucGFzc3dvcmRSZXF1aXJlbWVudHMsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQYXNzd29yZFZhbGlkYXRpb25FcnJvclRleHRPYmplY3QoZW50ZXJQYXNzd29yZCwgZW50ZXJQYXNzd29yZCwgbWF0Y2hQYXNzd29yZCwgaW52YWxpZFBhc3N3b3JkKSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRjcmVhdGVBY2NvdW50Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjcmVhdGVBY2NvdW50VmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNyZWF0ZUFjY291bnRWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXF1ZXN0IGlzIG1hZGUgaW4gdGhpcyBmdW5jdGlvbiB0byB0aGUgcmVtb3RlIGVuZHBvaW50IGFuZCBwdWxscyBiYWNrIHRoZSBzdGF0ZXMgZm9yIGNvdW50cnkuXHJcbiAgICAgKi9cclxuICAgIG9uUmVhZHkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlY2FwdGNoYS5hdHRyKCd0aXRsZScpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjYXB0Y2hhLmF0dHIoJ3RpdGxlJywgdGhpcy5jb250ZXh0LnJlY2FwdGNoYVRpdGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0ICRjcmVhdGVBY2NvdW50Rm9ybSA9IGNsYXNzaWZ5Rm9ybSh0aGlzLmZvcm1DcmVhdGVTZWxlY3Rvcik7XHJcbiAgICAgICAgY29uc3QgJGxvZ2luRm9ybSA9IGNsYXNzaWZ5Rm9ybSgnLmxvZ2luLWZvcm0nKTtcclxuICAgICAgICBjb25zdCAkZm9yZ290UGFzc3dvcmRGb3JtID0gY2xhc3NpZnlGb3JtKCcuZm9yZ290LXBhc3N3b3JkLWZvcm0nKTtcclxuICAgICAgICBjb25zdCAkbmV3UGFzc3dvcmRGb3JtID0gY2xhc3NpZnlGb3JtKCcubmV3LXBhc3N3b3JkLWZvcm0nKTsgLy8gcmVzZXQgcGFzc3dvcmRcclxuXHJcbiAgICAgICAgLy8gSW5qZWN0ZWQgdmlhIGF1dGguaHRtbFxyXG4gICAgICAgIHRoaXMucGFzc3dvcmRSZXF1aXJlbWVudHMgPSB0aGlzLmNvbnRleHQucGFzc3dvcmRSZXF1aXJlbWVudHM7XHJcblxyXG4gICAgICAgIGlmICgkbG9naW5Gb3JtLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTG9naW5WYWxpZGF0aW9uKCRsb2dpbkZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRuZXdQYXNzd29yZEZvcm0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJOZXdQYXNzd29yZFZhbGlkYXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkZm9yZ290UGFzc3dvcmRGb3JtLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRm9yZ290UGFzc3dvcmRWYWxpZGF0aW9uKCRmb3Jnb3RQYXNzd29yZEZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRjcmVhdGVBY2NvdW50Rm9ybS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNyZWF0ZUFjY291bnRWYWxpZGF0b3IoJGNyZWF0ZUFjY291bnRGb3JtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5RWFjaDtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jcmVhdGVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXNzaWduaW5nXG4gKiBwcm9wZXJ0aWVzIHRvIHRoZSBjcmVhdGVkIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xudmFyIGJhc2VDcmVhdGUgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIG9iamVjdCgpIHt9XG4gIHJldHVybiBmdW5jdGlvbihwcm90bykge1xuICAgIGlmICghaXNPYmplY3QocHJvdG8pKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGlmIChvYmplY3RDcmVhdGUpIHtcbiAgICAgIHJldHVybiBvYmplY3RDcmVhdGUocHJvdG8pO1xuICAgIH1cbiAgICBvYmplY3QucHJvdG90eXBlID0gcHJvdG87XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBvYmplY3Q7XG4gICAgb2JqZWN0LnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ3JlYXRlO1xuIiwidmFyIGNyZWF0ZUJhc2VGb3IgPSByZXF1aXJlKCcuL19jcmVhdGVCYXNlRm9yJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzIG92ZXIgYG9iamVjdGBcbiAqIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIHByb3BlcnR5LlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9yO1xuIiwidmFyIGJhc2VGb3IgPSByZXF1aXJlKCcuL19iYXNlRm9yJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvck93bjtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gIGFuZCBgXy5mb3JPd25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVCYXNlRm9yO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5RWFjaDtcbiIsInZhciBvdmVyQXJnID0gcmVxdWlyZSgnLi9fb3ZlckFyZycpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlS2V5cztcbiIsInZhciBhcnJheUVhY2ggPSByZXF1aXJlKCcuL19hcnJheUVhY2gnKSxcbiAgICBiYXNlQ3JlYXRlID0gcmVxdWlyZSgnLi9fYmFzZUNyZWF0ZScpLFxuICAgIGJhc2VGb3JPd24gPSByZXF1aXJlKCcuL19iYXNlRm9yT3duJyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnLi9pc0J1ZmZlcicpLFxuICAgIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpO1xuXG4vKipcbiAqIEFuIGFsdGVybmF0aXZlIHRvIGBfLnJlZHVjZWA7IHRoaXMgbWV0aG9kIHRyYW5zZm9ybXMgYG9iamVjdGAgdG8gYSBuZXdcbiAqIGBhY2N1bXVsYXRvcmAgb2JqZWN0IHdoaWNoIGlzIHRoZSByZXN1bHQgb2YgcnVubmluZyBlYWNoIG9mIGl0cyBvd25cbiAqIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgdGhydSBgaXRlcmF0ZWVgLCB3aXRoIGVhY2ggaW52b2NhdGlvblxuICogcG90ZW50aWFsbHkgbXV0YXRpbmcgdGhlIGBhY2N1bXVsYXRvcmAgb2JqZWN0LiBJZiBgYWNjdW11bGF0b3JgIGlzIG5vdFxuICogcHJvdmlkZWQsIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBzYW1lIGBbW1Byb3RvdHlwZV1dYCB3aWxsIGJlIHVzZWQuIFRoZVxuICogaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIGZvdXIgYXJndW1lbnRzOiAoYWNjdW11bGF0b3IsIHZhbHVlLCBrZXksIG9iamVjdCkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAxLjMuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbYWNjdW11bGF0b3JdIFRoZSBjdXN0b20gYWNjdW11bGF0b3IgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udHJhbnNmb3JtKFsyLCAzLCA0XSwgZnVuY3Rpb24ocmVzdWx0LCBuKSB7XG4gKiAgIHJlc3VsdC5wdXNoKG4gKj0gbik7XG4gKiAgIHJldHVybiBuICUgMiA9PSAwO1xuICogfSwgW10pO1xuICogLy8gPT4gWzQsIDldXG4gKlxuICogXy50cmFuc2Zvcm0oeyAnYSc6IDEsICdiJzogMiwgJ2MnOiAxIH0sIGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICogICAocmVzdWx0W3ZhbHVlXSB8fCAocmVzdWx0W3ZhbHVlXSA9IFtdKSkucHVzaChrZXkpO1xuICogfSwge30pO1xuICogLy8gPT4geyAnMSc6IFsnYScsICdjJ10sICcyJzogWydiJ10gfVxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm0ob2JqZWN0LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgaXNBcnJMaWtlID0gaXNBcnIgfHwgaXNCdWZmZXIob2JqZWN0KSB8fCBpc1R5cGVkQXJyYXkob2JqZWN0KTtcblxuICBpdGVyYXRlZSA9IGJhc2VJdGVyYXRlZShpdGVyYXRlZSwgNCk7XG4gIGlmIChhY2N1bXVsYXRvciA9PSBudWxsKSB7XG4gICAgdmFyIEN0b3IgPSBvYmplY3QgJiYgb2JqZWN0LmNvbnN0cnVjdG9yO1xuICAgIGlmIChpc0Fyckxpa2UpIHtcbiAgICAgIGFjY3VtdWxhdG9yID0gaXNBcnIgPyBuZXcgQ3RvciA6IFtdO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09iamVjdChvYmplY3QpKSB7XG4gICAgICBhY2N1bXVsYXRvciA9IGlzRnVuY3Rpb24oQ3RvcikgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKSA6IHt9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGFjY3VtdWxhdG9yID0ge307XG4gICAgfVxuICB9XG4gIChpc0Fyckxpa2UgPyBhcnJheUVhY2ggOiBiYXNlRm9yT3duKShvYmplY3QsIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gICAgcmV0dXJuIGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIG9iamVjdCk7XG4gIH0pO1xuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJhbnNmb3JtO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==