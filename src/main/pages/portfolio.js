import Inferno                        from 'inferno';
import Component                      from 'inferno-component';
import { Page, Header, Title, Quote } from '../components/page';
import { Content                    } from '../components/content';
import { List, Item                 } from '../components/portfolio';
import Previewer 					  from '../containers/previewer';
import constants					  from '../helpers/constants';

export default class PortfolioPage extends Component {

	constructor (props) {
		super(props);

		this. showPreview = this. showPreview.bind(this);
		this.closePreview = this.closePreview.bind(this);

		this.state = {
			previewIsShowing: null,
			previewImages: []
		};
	}

	closePreview () {
		this.setState({ previewIsShowing: false, previewImages: [] });
	}

	showPreview (item) {
		this.setState({ previewIsShowing: true, previewImages: item.images });
	}

	render () {

		let preview = this.showPreview;

		return (
			<Page name="portfolio">
				<Header>
					<Title>{this.props.title}</Title>
					<Quote {...this.props.quote}></Quote>
				</Header>

				<Content>
					<List>
						{this.props.items.map(props => (
							<Item 
								onClick={() => (preview(props))}
								{...props} />
						))}
					</List>
				</Content>

				{
					this.state.previewIsShowing

					? (<Previewer onClose={this.closePreview} imageSets={this.state.previewImages}></Previewer>)

					: null
				 }
			</Page>
		);
	}
}