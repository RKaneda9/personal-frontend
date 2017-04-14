import Inferno   from 'inferno';
import Component from 'inferno-component';

export class Input extends Component {

	constructor (props) {
		super(props);

		this.keyPress = this.keyPress.bind(this);
		this.blur     = this.blur    .bind(this);
	}

	componentDidMount () {

		if (this.props.autofocus) { this.focus(); }
	}

	componentDidUpdate () {

		if (this.props.autofocus       &&
			this.props.focusAfterClear &&
		   !this.props.value) {

			this.focus();
		}
	}

	componentWillReceiveProps (nextProps) {

		if (this.input) { this.input.value = nextProps.value; }
	}

	focus () {

		if (this.input) {

			// the timeout is here isnce the component may not be rendered yet
			// like in the case of componentDidMount
			setTimeout(() => this.input.focus());
		}
	}

	blur (e) {

		if (e.target.value != this.props.value && typeof this.props.onChange === 'function') {

			this.props.onChange(e.target.value);
		}
	}

	keyPress (e) {

		if (e.which == 13 && typeof this.props.onEnter === 'function') {

			this.blur(e);
			this.props.onEnter(e.target.value);
		}
		else if (e.target.value != this.props.value && typeof this.props.onKeyPress === 'function') {

			this.props.onKeyPress(e.target.value);
		}
	}

	render () {
		return (
			<input 
				ref={(input) => { this.input = input; }}
				type="text"
				tabindex={Number.isInteger(this.props.index) ? this.props.index : 0}
				placeholder={this.props.placeholder}
				className={`input${this.props.hasError ? " has-error" : ""}`}
				maxlength={this.props.maxlength || 999}
				onBlur={this.blur}
				onKeyUp={this.keyPress} />
		);
	}
}

export class Textarea extends Input {
	render () {
		return (
			<textarea 
				ref={(input) => { this.input = input; }}
				tabindex={Number.isInteger(this.props.index) ? this.props.index : 0}
				placeholder={this.props.placeholder}
				className={`input${this.props.hasError ? " has-error" : ""}`}
				maxlength={this.props.maxlength || 999}
				onBlur={this.blur}
				onKeyUp={this.keyPress} />
		);
	}
}