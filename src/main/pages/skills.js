import Inferno                              from 'inferno';
import Component                            from 'inferno-component';
import { Page, Header, Title, Quote       } from '../components/page';
import { Content, Header as ContentHeader } from '../components/content';
import { List, Item                       } from '../components/skills';

export default class SkillsPage extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Page name="skills">
                <Header>
                    <Title>{this.props.title}</Title>
                    <Quote {...this.props.quote}></Quote>
                </Header>

                {this.props.sections.map(section => (
                    <Content>
                        <ContentHeader>
                            <Title>{section.title}</Title>
                        </ContentHeader>
                        <List>
                            {section.items.map(props => (
                                <Item {...props} />
                            ))}
                        </List>
                    </Content>
                ))}
            </Page>
        );
    }
}