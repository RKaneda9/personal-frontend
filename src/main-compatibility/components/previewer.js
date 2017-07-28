var helper = require('../support/element'),
    utils  = require('../support/utils');

function Previewer (props) {

    /* ====================================== **
    ** Region: internal variable declaration  **
    ** ====================================== */

    var els, images, index, device

    /* ====================================== **
    ** Region: internal functions               **
    ** ====================================== */

    function selectDeviceMobile () { selectImage(device = 'iphone');     }
    function selectDeviceTablet () { selectImage(device = 'ipad');       }
    function selectDeviceDesktop() { selectImage(device = 'macbookPro'); }

    function onClose () { helper.removeClass(els.container, 'show'); }
    function onPrev  () { selectImage(--index); }
    function onNext  () { selectImage(++index); }

    function selectImage() {

        if (index >= images.length) { index = 0;                 }
        if (index <  0)                { index = images.length - 1; }

        var image = images[index];

        helper.setClass(els.mobileBtn,  !image.iphone,     'disabled');
        helper.setClass(els.tabletBtn,  !image.ipad,       'disabled');
        helper.setClass(els.desktopBtn, !image.macbookPro, 'disabled');

        if (!device || !image[device]) {
                 if (image.iphone)     { device = "iphone";     }
            else if (image.macbookPro) { device = "macbookPro"; }
            else if (image.ipad)       { device = "ipad";       }
        }

        if (device && image[device]) { els.display.src = image[device]; }

        helper.setClass(els.mobileBtn,  device == 'iphone',     'active');
        helper.setClass(els.tabletBtn,  device == 'ipad',       'active');
        helper.setClass(els.desktopBtn, device == 'macbookPro', 'active');
        helper.setText (els.indexSpan, index + 1);
    }

    /* ====================================== **
    ** Region: external functions               **
    ** ====================================== */

    this.show = function (_images) {
        images = _images;
        index  = 0;

        selectImage();

        helper.setText (els.countSpan, _images.length);
        helper.addClass(els.container, 'show');
    };

    /* ====================================== **
    ** Region: internal setup                   **
    ** ====================================== */

    index = 0;

    els = {
        container : helper.getElement('previewer'),
        display   : helper.getElement('previewer-display'),
        closeBtn  : helper.getElement('previewer-close-btn'),
        prevBtn   : helper.getElement('previewer-prev-btn'),
        nextBtn   : helper.getElement('previewer-next-btn'),
        mobileBtn : helper.getElement('previewer-mobile-btn'),
        tabletBtn : helper.getElement('previewer-tablet-btn'),
        desktopBtn: helper.getElement('previewer-desktop-btn'),
        indexSpan : helper.getElement('previewer-image-index'),
        countSpan : helper.getElement('previewer-image-count')
    };

    helper.addListener(els.  closeBtn, 'click', onClose);
    helper.addListener(els.   prevBtn, 'click', onPrev);
    helper.addListener(els.   nextBtn, 'click', onNext);
    helper.addListener(els. mobileBtn, 'click', selectDeviceMobile);
    helper.addListener(els. tabletBtn, 'click', selectDeviceTablet);
    helper.addListener(els.desktopBtn, 'click', selectDeviceDesktop);
}

module.exports = Previewer;