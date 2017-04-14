var helper = require('../support/element'),
	utils  = require('../support/utils');


function Device (props) {

	/* ====================================== **
	** Region: internal variable declaration  **
	** ====================================== */

	var els, name, id;

	/* ====================================== **
	** Region: internal functions 			  **
	** ====================================== */

	function onInit() {

		var deviceBounds = helper.getBounds(els.device),
		    parentBounds = helper.getBounds(els.device.parentElement);
	}

	function onClick() {

	}

	/* ====================================== **
	** Region: external functions 			  **
	** ====================================== */


	/* ====================================== **
	** Region: internal setup 			      **
	** ====================================== */

	id   = props.id;
	name = utils.removeDashes(id);
	els  = {
		device: helper.getElement(id + '-device'),
		image : helper.getElement(id + '-device-image')
	};

	helper.addListener(els.device, 'click', onClick);


}

module.exports = Device;