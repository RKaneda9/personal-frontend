import Inferno                                 from 'inferno';
import Component                               from 'inferno-component';
import { Page, Header, Title, Quote          } from '../components/page';
import { Content                             } from '../components/content';
import { Image, Details, Detail, Description } from '../components/about';
import constants                               from '../helpers/constants';

export default class AboutPage extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Page name="about">
                <Header>
                    <Title>{this.props.title}</Title>
                    <Quote {...this.props.quote}></Quote>
                </Header>

                <Content>
                    <Image src={this.props.image}></Image>
                    <Details>{this.props.details.map(props => (<Detail {...props} />))}</Details>
                    <Description>{this.props.description}</Description>
                </Content>
            </Page>
        );
    }
}
