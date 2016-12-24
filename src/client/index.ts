import ComponentRenderer from './components/ComponentRenderer';
import state from './components/state';
import Root from './components/Root';
import StateChanger from './components/StateChanger';


const componentRenderer = new ComponentRenderer(Root, document.getElementById('root'));
componentRenderer.setProps(state, undefined);
StateChanger.setRenderer(componentRenderer);
