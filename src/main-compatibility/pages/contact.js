var utils     = require('../support/utils'),
    constants = require('../support/constants'),
    http      = require('../support/http'),
    Button    = require('../components/button'),
    Field       = require('../components/field');

function ContactForm(props) {

    /* ====================================== **
    ** Region: internal variable declaration  **
    ** ====================================== */

    var fields, button;

    /* ====================================== **
    ** Region: internal functions               **
    ** ====================================== */

    function onSubmitSuccess (res) {
        button.setState(button.states.responseSuccess);

        utils.foreach(fields, function (field) { field.setValue(''); });
    }

    function onSubmitError (res) { 
        var message, found;

        found   = false;
        message = 'Uh oh! There was a problem sending your message. Please try again!';

        if (typeof res == 'object' && !String.isNullOrEmpty(res.message)) {

            message = res.message;

            if (!String.isNullOrEmpty(res.target)) {
                found = utils.first(fields, function (field) {
                    
                    if (field.name === res.target) {
                        field.showError(res.message);
                        return true;
                    }
                });
            }
        }

        if (found) { message = null; }

        button.setState(button.states.responseError, message);
    }

    /* ====================================== **
    ** Region: external functions               **
    ** ====================================== */

    this.submit = function () {
        var data, invalid;

        data = {};

        utils.foreach(fields, function (field) { field.reset(); });
        
        invalid = utils.first(fields, function (field) {
            if (!field.isValid()) { 

                field.focus();
                return true; 
            }

            data[field.name] = field.getValue();
        });

        if (invalid) { return; }

        button.setState(button.states.loading);

        http.post(props.urls.sendMessage, data, onSubmitSuccess, onSubmitError);
    };

    /* ====================================== **
    ** Region: internal setup                   **
    ** ====================================== */

    button = new Button({ name: 'form-send', onClick: this.submit });
    fields = [
        new Field({ 
            name:       'firstname', 
            display:    'First Name',
            onEnter:    this.submit,
            validation: [
                {
                    func: String.isNotNullOrEmpty,
                    msg:  'Please enter a first name.'
                }
            ]
        }),
        new Field({ 
            name:       'lastname', 
            display:    'Last Name',
            onEnter:    this.submit,
            validation: [
                {
                    func: String.isNotNullOrEmpty,
                    msg:  'Please enter a last name.'
                }
            ]
        }),
        new Field({ 
            name:       'email', 
            display:    'Email Address',
            onEnter:    this.submit,
            validation: [
                {
                    func: String.isNotNullOrEmpty,
                    msg:  'Please enter an email address.'
                },
                {
                    func: String.isValidEmailAddress,
                    msg:  'Please enter a valid email address.'
                }
            ]
        }),
        new Field({ 
            name:    'message',
            display: 'Message' 
        })
    ];
}

module.exports = ContactForm;