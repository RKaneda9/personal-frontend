import Inferno    from 'inferno';
import Component  from 'inferno-component';
import constants  from '../helpers/constants';
import { Loader } from '../components/form';
import { 

    IPhone     as IPhoneEl, 
    IPad       as IPadEl, 
    MacbookPro as MacbookProEl,
    Display,
    Image,
    ImageCover

} from '../components/devices';

class Device extends Component {

    constructor(props, naturalState) {
        super(props);

        this.scroll       = this.scroll      .bind(this);
        this.onClick      = this.onClick     .bind(this);
        this.onLoaderRef  = this.onLoaderRef .bind(this);
        this.onImageRef   = this.onImageRef  .bind(this);
        this.onImageError = this.onImageError.bind(this);
        this.onDrag       = this.onDrag      .bind(this);
        this.onDragStart  = this.onDragStart .bind(this);
        this.onDragEnd    = this.onDragEnd   .bind(this);

        this.states    = { natural: naturalState };
        this.dx        = (2 * this.props.index + 1) - this.props.deviceCount;
        this.dxp       = this.dx / (2 * this.props.deviceCount);
        this.imgBounds = {};

        this.state = {
            ready     : false,
            x         : 0,
            y         : 0,
            scale     : 0,
            offsetY   : 0,
            disabled  : false,
            manualDrag: false
        };
    }

    componentWillReceiveProps (nextProps) {

        this.setActiveProps   (nextProps.  activeProps);
        this.setInactiveProps (nextProps.inactiveProps);
        
        let state = this.getTransformProps(nextProps);

        if (state) {
            if (nextProps.image != this.props.image) {
                if (this.imageEl && this.loaderEl) {
                    this.loaderEl.style.zIndex =  3;
                    this. imageEl.style.zIndex = -1;
                }
            }

            if (this.state.disabled && nextProps.image != this.props.image) {
                state.disabled = false;
            }

            this.clearScrollTimeout();

            if (nextProps.active) {
                 this.scrollTimeout = setTimeout(this.scroll, constants.previewer.scrollTimeout);
            }

            this.setState(state);
        }
    }

    clearScrollTimeout () {
        if (this.scrollTimeout) { clearTimeout(this.scrollTimeout); }
        this.scrollTimeout = null;
    }

    onLoaderRef (el) {
        if (el) { this.loaderEl = el; }
    }

    onImageRef (el) {

        if (el) {

            this.imageEl = el;

            el.addEventListener('load', () => {
                
                el.style.zIndex = 0;

                if (this.loaderEl) { this.loaderEl.style.zIndex = -1; }

                this.imgBounds = {
                    width : el.naturalWidth,
                    height: el.naturalHeight
                };

                if (this.imgBounds.width === 0 && this.imgBounds.height === 0) {
                    debugger;
                }
            })
        }
        else { this.imgBounds = {}; }
    }

    onImageError () {
        this.imgBounds = {};

        this.setState({ disabled: true });
    }

    getTransformProps (props) {

        let state = props.active ? this.states.active : this.states.inactive;

        if (!state) { return null; }

        if (state.x     !== this.state.x     ||
            state.y     !== this.state.y     ||
            state.scale !== this.state.scale ||
           !this.state.ready) {

            return {
                ready  : true,
                x      : state.x    .toFixed(2),
                y      : state.y    .toFixed(2),
                scale  : state.scale.toFixed(2),
                offsetY: 0
            };
        }

        return null;
    }

    setActiveProps (props) {

        if (props.stage === this.props.activeProps.stage) { return; }

        let state = {};

        state.scale = Math.min(props.maxWidth  / this.states.natural.width,
                               props.maxHeight / this.states.natural.height);

        state.x = 0;
        state.y = props.top + (props.maxHeight - this.states.natural.height) / 2;

        this.states.active = state;
    }

    setInactiveProps (props) {

        if (props.stage === this.props.inactiveProps.stage) { return; }

        let state = {};

        state.scale = Math.min(props.maxWidth  / this.states.natural.width,
                               props.maxHeight / this.states.natural.height);

        state.x = props.fullWidth * this.dxp;
        state.y = props.bottom 
                + (0.5 * (this.states.natural.height - this.states.natural.height * state.scale))
                - this.states.natural.height;

        this.states.inactive = state;
    }

    scroll () {
        let offset, imgHeight, display;

        imgHeight = this.imgBounds.height * this.states.natural.displayWidth / this.imgBounds.width;
        display   = this.states.natural.displayHeight;
        offset    = this.state.offsetY + display;

        // should scroll
        if (imgHeight && imgHeight > offset) {

            // check maximum scroll height
            if (offset < imgHeight - display) {

                // we can still scroll
                this.scrollTimeout = setTimeout(this.scroll, constants.previewer.scrollTimeout);
            }
            else {

                // ensure we don't passed the image.
                offset = imgHeight - display;
            }

            this.setState({ offsetY: offset, manualDrag: false });
        }
    }

    onClick (e) {
        if (!this.props.active && 
            !String.isNullOrEmpty(this.props.image) && 
            typeof this.props.onActivate === 'function') {

            this.props.onActivate();
        }
    }

    onDrag (e) {
        if (e.x &&
            e.y &&
            this.props.active && 
            this.dragEvent    && 
            this.state.scale > 0) {

            let dy     = (this.dragEvent.y - e.y) * 2 / this.state.scale;
            let offset =  this.state.offsetY + dy;

            if (offset !== this.state.offsetY &&
                offset >= 0                   &&
                offset <= this.dragEvent.maxOffset) {

                this.setState({ offsetY: offset, manualDrag: true });
            }

            this.dragEvent.x = e.x;
            this.dragEvent.y = e.y;
        }
    }

    onDragStart (e) { 
        if (this.props    .active &&
            this.imgBounds.width  &&
            this.imgBounds.height) {

            this.dragEvent = { 
                maxOffset: this.imgBounds.height * this.states.natural.displayWidth / this.imgBounds.width - this.states.natural.displayHeight,
                x        : e.x, 
                y        : e.y 
            };

            this.clearScrollTimeout();
        }
    }

    onDragEnd (e) {

        this.dragEvent     = null;
        this.scrollTimeout = setTimeout(this.scroll, constants.previewer.scrollTimeout);
    }

    getDeviceElProps () {
        return {
            onClick     : this.onClick,
            disabled    : this.state.disabled || String.isNullOrEmpty(this.props.image),
            active      : this.props.active,
            scale       : this.state.scale,
            x           : this.state.x,
            y           : this.state.y
        };
    }

    getElChildren () {
        return (
            <Display>
                <Image 
                    manualDrag={this.state.manualDrag}
                    onError={this.onImageError}
                    onRef={this.onImageRef}
                    url={this.props.image}
                    y={this.state.offsetY.toFixed(2)} />

                <ImageCover
                    onDrag={this.onDrag}
                    onDragStart={this.onDragStart}
                    onDragEnd={this.onDragEnd} />

                <Loader 
                    onRef={this.onLoaderRef}
                    active="true"></Loader>

            </Display>
        );
    }
}

export class IPhone extends Device {

    static type = "iphone";

    constructor(props) {
        super(props, constants.devices.iphone);
    }

    render () {
        if (!this.state.ready) { return null; }

        return (
            <IPhoneEl {...this.getDeviceElProps()}>
                {this.getElChildren()}
            </IPhoneEl>
        );
    }
}

export class IPad extends Device {

    static type = "ipad";

    constructor(props) {
        super(props, constants.devices.ipad);
    }

    render () {
        if (!this.state.ready) { return null; }

        return (
            <IPadEl {...this.getDeviceElProps()}>
                {this.getElChildren()}
            </IPadEl>
        );
    }
}

export class MacbookPro extends Device {

    static type = "macbookPro";

    constructor(props) {
        super(props, constants.devices.macbookPro);
    }

    render () {
        if (!this.state.ready) { return null; }

        return (
            <MacbookProEl {...this.getDeviceElProps()}>
                {this.getElChildren()}
            </MacbookProEl>
        );
    }
}