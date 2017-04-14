String.isNullOrEmpty = function (val) {
	return typeof val !== 'string' || !val.trim().length;
};

String.isValidEmailAddress = function (val) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return val !== undefined && re.test(val)
};

String.isValidPhoneNumber = function (val) {
    var re = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
    return val !== undefined && re.test(val);
};
