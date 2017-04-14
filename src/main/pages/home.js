import Inferno                   from 'inferno';
import Component                 from 'inferno-component';
import { Page, Title, SubTitle } from '../components/page';

export default class HomePage extends Component {

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<Page name="home">
				<Title>{this.props.title}</Title>
				<SubTitle>{this.props.subtitle}</SubTitle>
			</Page>
		);
	}
}