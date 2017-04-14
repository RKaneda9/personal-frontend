import Inferno                      from 'inferno';
import Component                    from 'inferno-component';
import { Popup, Button            } from '../components/previewer';
import { IPhone, IPad, MacbookPro } from '../containers/devices';
import constants 					from '../helpers/constants';

const devices = Object.keys(constants.devices);

export default class Previewer extends Component {

	constructor(props) {
		super(props);

		this.onPrev 		 = this.onPrev 		   .bind(this);
		this.onNext 		 = this.onNext 		   .bind(this);
		this.onResize        = this.onResize       .bind(this);
		this.checkResize 	 = this.checkResize    .bind(this);
		this.setElement      = this.setElement     .bind(this);
		this.setActiveDevice = this.setActiveDevice.bind(this);
		this.getDevice       = this.getDevice      .bind(this);

		let index          = 0;
		let activeImageSet = props.imageSets[index];
		let activeDevice   = Object.keys(activeImageSet)[0];

		this.state = {
			index        : index,
			imageSet     : activeImageSet,
			activeDevice : activeDevice,
			activeProps  : { stage: 0 },
			inactiveProps: { stage: 0 }
		};
	}

	componentDidMount () {

		this.onResize();

		window.addEventListener('resize', this.checkResize);
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.checkResize);
	}

	onChange (index) {
		var set    =  this.props.imageSets[index];
		var device =  this.state.activeDevice;

		if (!set[device]) { device = Object.keys(set)[0]; }

		this.setState({ 

			index       : index,
			imageSet    : set,
			activeDevice: device
		});
	}

	onPrev () { this.onChange((this.state.index || this.props.imageSets.length) - 1); }
	onNext () { this.onChange((this.state.index + 1) % this.props.imageSets.length);  }

	checkResize () {
		if (this.resizeTimeout) { clearTimeout(this.resizeTimeout); }
		this.resizeTimeout = setTimeout(this.onResize, constants.previewer.resizeTimeout);
	}

	onResize () {

		// TODO: log error
		if (!this.element) { return; }

		let width, height, activeProps, inactiveProps, hPad, vPad;

		hPad   = 50;
		vPad   = 25;
		width  = this.element.clientWidth  - hPad - hPad;
		height = this.element.clientHeight - vPad - vPad;

		inactiveProps = {
			fullWidth: width,
			maxWidth : width / Object.keys(this.state.imageSet).length,
			maxHeight: height * 0.25,
			bottom   : height + vPad,
			stage    : ++this.state.inactiveProps.stage
		};

		activeProps = {
			maxWidth : width,
			maxHeight: height * 0.75 - vPad,
			top      : vPad,
			stage    : ++this.state.inactiveProps.stage
		};

		this.setState({ 
			activeProps  : activeProps, 
			inactiveProps: inactiveProps
		});
	}

	setActiveDevice (name) {
		this.setState({ activeDevice: name });
	}

	getDevice (name, index, nameArray) {

		let props = {

			index        : index,
			deviceCount  : nameArray.length,
			image        : this.state.imageSet[name],
			active       : this.state.activeDevice === name,
			activeProps  : this.state.activeProps,
			inactiveProps: this.state.inactiveProps,
			onActivate   : () => { this.setActiveDevice(name); }
		};

		switch (name.toLowerCase()) {
			case IPhone    .type.toLowerCase(): return (<IPhone     {...props} />);
			case IPad      .type.toLowerCase(): return (<IPad       {...props} />);
			case MacbookPro.type.toLowerCase(): return (<MacbookPro {...props} />);
		}

		return null;
	}

	setElement (el) {
		this.element = el;
	}

	render () {

		let buttons = [];

		if (this.props.imageSets.length > 1) {

			buttons.push(
				(<Button anim={true} name="next"  icon="angle-right" text="Next"     onClick={this.onNext} />),
				(<Button anim={true} name="prev"  icon="angle-left"  text="Previous" onClick={this.onPrev} />)
			);
		}
		
		return (
			<Popup onLoad={this.setElement}>

				{devices.map(this.getDevice)}

				<Button anim={true} name="close" icon="close" text="Close" onClick={this.props.onClose} />

				{buttons}

			</Popup>
		);
	}
}