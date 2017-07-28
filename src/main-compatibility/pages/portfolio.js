var Previewer = require('../components/previewer'),
    helper    = require('../support/element'),
    utils     = require('../support/utils');

function Portfolio(props) {

    var previewer, els;

    /* ====================================== **
    ** Region: internal variable declaration  **
    ** ====================================== */

    /* ====================================== **
    ** Region: internal functions               **
    ** ====================================== */


    /* ====================================== **
    ** Region: external functions               **
    ** ====================================== */


    /* ====================================== **
    ** Region: internal setup                   **
    ** ====================================== */

    previewer = new Previewer();
    els       = utils.map(props.items, function (params) {

        var el = document.getElementById('portfolio-item-' + params.name);

        helper.addListener(el, 'click', function (e) {
            previewer.show(params.images);
        });

        return el;
    });
}

module.exports = Portfolio;