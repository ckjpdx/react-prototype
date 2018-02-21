import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';

const store = createStore(rootReducer);

let unsubscribe = store.subscribe(()=>
console.log(store.getState())
);

// render > creates a component-type const named "render" that acts as entry point for "App"
// ReactDOM.render akes arguments as: (what, where)
// AppContainer equired by React-Hot-Loader for loading and error logs
// Component = what to render
// document.getElementById() = where to render

const render = (Component) => {
  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <Component/>
      </Provider>
    </HashRouter>,
    document.getElementById('react-app-root')
  );
};

render(App);

/*eslint-disable */
if (module.hot) {
  module.hot.accept('./components/App', () => render(App));
}
/*eslint-enable */
