var helper = require('../support/element'),
	utils  = require('../support/utils');

function Button (props) {
	if (typeof props != 'object') { props = {}; }

	/* ====================================== **
	** Region: internal variable declaration  **
	** ====================================== */
	
	var els, state, scope;

	/* ====================================== **
	** Region: internal functions 			  **
	** ====================================== */

	function onClick (e) { 
		if (state == scope.states.ready && typeof props.onClick == 'function') {
			props.onClick();
		}
	}

	function showLoader () {
		helper.addClass(els.loader, 'show');
	}

	function hideLoader () {
		helper.removeClass(els.loader, 'show');
	}

	function showButton () {
		helper.removeClass(els.btn, 'loading');
	}

	function hideButton () {
		helper.addClass(els.btn, 'loading');
	}

	function showPopover (msg) {
		if (!String.isNullOrEmpty(msg)) {
		
			helper.setText (els.popover, msg);
			helper.addClass(els.popover, 'show');
		}
	}

	function hidePopover () {
		helper.removeClass(els.popover, 'show');
	}

	function showCover (error) {

		if (error) {
			helper.addClass(els.coverError, 'show');
		}
		else {
			helper.addClass(els.coverSuccess, 'show');
		}
	}

	function hideCover () {
		helper.removeClass(els.coverError,   'show');
		helper.removeClass(els.coverSuccess, 'show');
	}

	/* ====================================== **
	** Region: external variables 			  **
	** ====================================== */

	this.states = {
		ready:           0,
		loading:         1,
		responseSuccess: 2,
		responseError:   3
	};

	/* ====================================== **
	** Region: external functions 			  **
	** ====================================== */

	this.setState = function (state, msg) {

		switch (state) {
			case scope.states.ready: 
				hidePopover();
				hideLoader ();
				hideCover  ();

				showButton();
				break;
			case scope.states.loading:
				hideButton ();
				hideCover  ();
				hidePopover();

				showLoader();
				break;

			case scope.states.responseSuccess:
				hideLoader ();
				hidePopover(msg);

				showButton ();
				showCover  (false);
				break;
			case scope.states.responseError:
				hideLoader();

				showButton ();
				showPopover(msg);
				showCover  (true);
				break;
		}
	};

	/* ====================================== **
	** Region: internal setup 			      **
	** ====================================== */

	scope = this;
	state = this.states.ready;
	els   = {
		btn:          helper.getElement(props.name + '-btn'),
		popover:      helper.getElement(props.name + '-popover'),
		loader:       helper.getElement(props.name + '-loader'),
		coverSuccess: helper.getElement(props.name + '-btn-cover-success'),
		coverError:   helper.getElement(props.name + '-btn-cover-error')
	};
	
	helper.addListener(els.btn, 'click', onClick);
}

module.exports = Button;