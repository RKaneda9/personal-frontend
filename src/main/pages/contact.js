import Inferno                      		  from 'inferno';
import Component                    		  from 'inferno-component';
import { Page, Header, Title, Quote 		} from '../components/page';
import { Content                    		} from '../components/content';
import { Row, Col, Button, Popover, Loader  } from '../components/form';
import { SocialList, SocialLink     		} from '../components/social';
import { Textarea, Input            		} from '../containers/form';
import http 								  from '../helpers/http';
import constants 							  from '../helpers/constants';
import enums 								  from '../helpers/enums';

const fields = {
	firstname: 'firstname',
	lastname : 'lastname',
	email    : 'email',
	message  : 'message'
};

const errors = {
	firstnameEmpty: 'Please enter a first name.',
	lastnameEmpty:  'Please enter a last name.',
	emailEmpty:     'Please enter an email address.', 
	emailInvalid:   'Please enter a valid email address.',
	messageEmpty:   'Please enter a message.',
	generic:        'Uh oh! There was a problem sending your message. Please try again!'
}

export default class ContactPage extends Component {

	constructor (props) {
		super(props);

		this.checkFirstname  = this.checkFirstname .bind(this);
		this.checkLastname   = this.checkLastname  .bind(this);
		this.checkEmail      = this.checkEmail     .bind(this);
		this.checkMessage    = this.checkMessage   .bind(this);
		this.updateFirstname = this.updateFirstname.bind(this);
		this.updateLastname  = this.updateLastname .bind(this);
		this.updateEmail     = this.updateEmail    .bind(this);
		this.updateMessage   = this.updateMessage  .bind(this);
		this.sendForm 		 = this.sendForm       .bind(this);

		this.state = {
			loading     : false,
			errorTarget : null,
			errorMessage: '',
			firstname   : '',
			lastname    : '',
			email       : '',
			message     : '',
			lastRes     : null
		};
	}

	checkFirstname (val) {
		if (this.state.errorTarget === fields.firstname &&
			!String.isNullOrEmpty(val)) {

			return this.setState({
				errorTarget : fields.none,
				errorMessage: '',
				firstname   : val,
				lastRes     : null
			});
		}
	}

	checkLastname (val) {
		if (this.state.errorTarget === fields.lastname &&
			!String.isNullOrEmpty(val)) {

			return this.setState({
				errorTarget : fields.none,
				errorMessage: '',
				lastname    : val,
				lastRes     : null
			});
		}
	}

	checkEmail (val) {
		if (this.state.errorTarget !== fields.email) { return; }

		if (String.isNullOrEmpty(val)) {
			if (this.errorMessage !== errors.emailEmpty) {
				return this.setState({
					errorMessage: errors.emailEmpty,
					email       : val,
					lastRes     : null
				});
			}

			return;
		}
		
		if (!String.isValidEmailAddress(val)) {
			if (this.errorMessage !== errors.emailInvalid) {
				return this.setState({
					errorMessage: errors.emailInvalid,
					email       : val,
					lastRes     : null
				});
			}

			return;
		}

		return this.setState({
			errorTarget : fields.none,
			errorMessage: '',
			email       : val,
			lastRes     : null
		});
	}

	checkMessage (val) {
		if (this.state.errorTarget === fields.message &&
			!String.isNullOrEmpty(val)) {

			return this.setState({
				errorTarget : fields.none,
				errorMessage: '',
				message     : val,
				lastRes     : null
			});
		}
	}

	updateFirstname (val) { this.setState({ firstname: val }); }
	updateLastname  (val) { this.setState({ lastname : val }); }
	updateEmail     (val) { this.setState({ email    : val }); }
	updateMessage   (val) { this.setState({ message  : val }); }

	sendForm () {

		if (this.state.loading) { return; }

		if (String.isNullOrEmpty(this.state.firstname)) {
			return this.setState({
				errorTarget : fields.firstname,
				errorMessage: errors.firstnameEmpty,
				lastRes     : null
			});
		}

		if (String.isNullOrEmpty(this.state.lastname)) {
			return this.setState({
				errorTarget : fields.lastname,
				errorMessage: errors.lastnameEmpty,
				lastRes     : null
			});
		}

		if (String.isNullOrEmpty(this.state.email)) {
			return this.setState({
				errorTarget : fields.email,
				errorMessage: errors.emailEmpty,
				lastRes     : null
			});
		}

		if (!String.isValidEmailAddress(this.state.email)) {
			return this.setState({
				errorTarget : fields.email,
				errorMessage: errors.emailInvalid,
				lastRes     : null
			});
		}

		if (String.isNullOrEmpty(this.state.message)) {
			return this.setState({
				errorTarget : fields.message,
				errorMessage: errors.messageEmpty,
				lastRes     : null
			});
		}

		this.setState({
			errorTarget : fields.none,
			errorMessage: '',
			loading     : true,
			lastRes     : null
		});

		let data = {

			firstname: this.state.firstname,
			lastname : this.state.lastname,
			email    : this.state.email,
			message  : this.state.message
		};
		
		http.post(this.props.urls.sendMessage, data)
			.done((response) => {

				this.setState({
					loading     : false,
					lastRes     : enums.level.success,
					errorMessage: '',
					firstname   : '',
					lastname    : '',
					email       : '',
					message     : '',
				});
			})
			.fail(() => {
				this.setState({ 
					errorTarget : fields.none,
					errorMessage: errors.generic,
					loading     : false,
					lastRes     : enums.level.error
				});
			});
	}

	render () {
		return (
			<Page name="contact">
				<Header>
					<Title>{this.props.title}</Title>
					<Quote {...this.props.quote}></Quote>
				</Header>

				<Content>
					<Row>
						<Col>
							<Input 
								placeholder="First Name"
								hasError={this.state.errorTarget === fields.firstname}
								maxlength={100}
								value={this.state.firstname}
								onChange={this.updateFirstname}
								onKeyPress={this.checkFirstname}
								onEnter={this.sendForm} />

							<Popover 
								display={this.state.errorTarget === fields.firstname}
								message={this.state.errorMessage}
								arrow={true} />
						</Col>

						<Col>
							<Input 
								placeholder="Last Name"
								hasError={this.state.errorTarget === fields.lastname}
								maxlength={100}
								value={this.state.lastname}
								onChange={this.updateLastname}
								onKeyPress={this.checkLastname}
								onEnter={this.sendForm} />

							<Popover 
								display={this.state.errorTarget === fields.lastname}
								message={this.state.errorMessage}
								arrow={true} />
						</Col>
					</Row>

					<Row>
						<Col>
							<Input 
								placeholder="Email Address"
								hasError={this.state.errorTarget === fields.email}
								maxlength={100}
								value={this.state.email}
								onChange={this.updateEmail}
								onKeyPress={this.checkEmail}
								onEnter={this.sendForm} />

							<Popover 
								display={this.state.errorTarget === fields.email}
								message={this.state.errorMessage} 
								arrow={true} />
						</Col>
					</Row>

					<Row>
						<Col>
							<Textarea 
								placeholder="Type Your Message Here..."
								hasError={this.state.errorTarget === fields.message}
								maxlength={5000}
								value={this.state.message}
								onChange={this.updateMessage}
								onKeyPress={this.checkMessage} />

							<Popover 
								display={this.state.errorTarget === fields.message}
								message={this.state.errorMessage}
								arrow={true} />
						</Col>
					</Row>

					<Row>
						<Button 
							anim={true}
							text="Send"
							icon="paper-plane-o"
							loading={this.state.loading}
							cover={this.state.lastRes}
							onClick={this.sendForm} />

						<Popover 
							display={this.state.errorTarget === fields.none}
							message={this.state.errorMessage} />

						<Loader active={this.state.loading} />
					</Row>
				</Content>

				<Content>
					<SocialList>
						{this.props.sociallinks.map(props => (<SocialLink {...props} />))}
					</SocialList>
				</Content>
			</Page>
		);
	}
}