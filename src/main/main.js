import Inferno   from 'inferno';
import App       from './app';
import * as data from 'data'; 

Inferno.render(<App {...data} />, document.getElementById('app'));