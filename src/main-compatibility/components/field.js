var helper = require('../support/element'),
    utils  = require('../support/utils');

function Field (props) {
    if (typeof props != 'object') { props = {}; }

    /* ====================================== **
    ** Region: internal variable declaration  **
    ** ====================================== */
    
    var els, hasError, scope;

    /* ====================================== **
    ** Region: internal functions               **
    ** ====================================== */

    function onKeyUp (e) {

        if (e.which == 13 && typeof props.onEnter === 'function') {

            props.onEnter(els.input.value);
        }
        else if (hasError) { scope.isValid(); }
    }

    function showError (msg) {

        if (!String.isNullOrEmpty(msg)) {

            helper.setText (els.popover, msg);
            helper.addClass(els.popover, 'show');
            helper.addClass(els.input,   'has-error');

            hasError = true;
        }
    }

    function clearError () {

        helper.removeClass(els.popover, 'show');
        helper.removeClass(els.input,   'has-error');

        hasError = false;
    }

    /* ====================================== **
    ** Region: external functions               **
    ** ====================================== */

    this.name = props.name;

    /* ====================================== **
    ** Region: external functions               **
    ** ====================================== */

    this.setValue = function (val) { els.input.value = val;         };
    this.getValue = function ()    { return els.input.value.trim(); };

    this.isValid = function () {
        var err = utils.first(props.validation, function (validation) {

            if (typeof validation      == 'object' && 
                typeof validation.func == 'function' &&
                !validation.func(scope.getValue())) {

                showError(validation.msg);
                return true;
            }
        });

        if (!err) { clearError(); }

        return !err;
    };

    this.focus = function () { els.input.focus(); };
    this.reset = function () { clearError();      };

    this.showError = function (msg) { showError(msg); };

    this.dispose = function () {

        helper.removeListener(els.input, 'keyup', onKeyUp);
        //helper.removeListener(el, 'blur',  onBlur);
    };

    /* ====================================== **
    ** Region: internal setup                   **
    ** ====================================== */

    scope    = this;
    hasError = false;
    els      = {
        input:   helper.getElement(props.name + '-input'),
        popover: helper.getElement(props.name + '-popover')
    };

    helper.addListener(els.input, 'keyup', onKeyUp);
}

module.exports = Field;