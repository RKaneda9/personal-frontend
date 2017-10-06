import                  './helpers/polyfill';
import Inferno     from 'inferno';
import Component   from 'inferno-component';
import Container   from './components/app';
import Home        from './pages/home';
import About       from './pages/about';
import Experiences from './pages/experiences';
import Skills      from './pages/skills';
import Portfolio   from './pages/portfolio';
import Contact     from './pages/contact';

export default class App extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Container>
                <Home        {...this.props.home}        />
                <About       {...this.props.about}       />
                <Experiences {...this.props.experiences} />
                <Skills      {...this.props.skills}      />
                <Portfolio   {...this.props.portfolio}   />
                <Contact     {...this.props.contact}     />
            </Container>
        )
    }
}
