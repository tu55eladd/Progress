import ComponentRenderer from './components/ComponentRenderer';
//import state from './components/state';
import Root from './components/Root';
import StateChanger from './components/StateChanger';
import 'whatwg-fetch';

const componentRenderer = new ComponentRenderer(Root, document.getElementById('root'));
componentRenderer.setProps({}, undefined);
StateChanger.setRenderer(componentRenderer);

var user:User = {
    name: "Sigurd",
    email: "groneng93@gmail.com",
    _id: "0naBL6Ctp1SA7p9N"
};

