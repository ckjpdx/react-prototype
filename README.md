# React Prototype
## Setup
### Terminal Installation
Atom: (in case of React errors):
* apm i react@0.16.2

Node:
* npm init  
* npm i react@15.5.4 react-dom@15.5.4 --save  
* npm i webpack@3.4.0 --save-dev  
* npm i webpack@3.4.0 -g  
* npm i babel-core@6.24.1 babel-loader@7.0.0 babel-preset-es2015@6.24.1 babel-preset-react@6.24.1 --save-dev
* npm i prop-types@15.5.10 --save
* npm i webpack-dev-server@2.5.0 -g
* npm i webpack-dev-server@2.5.0 --save-dev
* npm i react-hot-loader@3.0.0-beta.7 --save-dev
* npm i html-webpack-plugin@2.29.0 --save-dev
* npm i eslint -g
* npm i eslint-plugin-react -g
* eslint --init
* npm i eslint-loader --save-dev
* npm i --save styled-jsx
* npm i react-router-dom@4.0.0 --save
* npm i url-loader@0.6.2 --sav-dev
* npm i file-loader@1.1.6 --sav-dev
* npm i uuid@3.2.1
* npm i moment@2.18.1

### .gitignore
```
.DS_STORE  
node_modules  
build
```

### webpack.config.js
```
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {

  entry: [
    resolve(__dirname, "src") + "/index.jsx"
  ],

  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, 'build'),
  },

  resolve: {
    extensions: [ '.js', '.jsx' ]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "es2015",
            "react"
          ]
        }
      },
    ],
  }
};
```
### index.html
```
<!DOCTYPE html>
<html>
  <head>
    <title>My First React Project</title>
  </head>
  <body>
    <div id="react-app-root">
    </div>
  </body>
  <script src="build/app.bundle.js"></script>
</html>
```
# React Notes
## Functional Programming
React relies on __functional programming__, not object oriented programming.
Object-oriented programming organizes logic around the things an application manages, whereas functional programming organizes an application around the actions it performs.

### Pure Functions
React functions (components) accept arguments (props) and return a value (React elements). React is pretty flexible but it has a single strict rule: All React components must act like pure functions with respect to their props. There are two things that differentiate pure functions from normal old functions:
* Pure functions' return values are determined using only provided input values.
* Pure functions do not ever alter external state or application data.

## Components
Basic building blocks of React apps. Everything in React is a component.
* Always import React from the "react" npm package at the top of the file.
* The component is a function! React relies on functional programming; most components are actually functions.
* The component function name always begins with a capital letter and matches the filename.
* The function returns the JSX this component will render in the browser.
* Components reside in their own file, and are exported as a module so other areas of the application may import it.

### Single Responsibility Principle
A component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.

### Defining Components
There are two ways to define a component:
1. by defining a function that returns JSX. These are called stateless functional components.
1. by defining a component class. These are called class components or class-based components.

*Besides being defined with different syntax, these two types of components work differently too: Functional components cannot have state. Components that require state must be defined as a class!*

#### Functional vs Class-Based:
* Props can only be accessed by calling this.props.propName instead of props.propName.
* Class-based components must include a render() method. The JSX returned by this method is what will be displayed in the browser.
* The class must always extend from the built-in React.Component class to inherit component functionality from the React library.

##### Functional Component (Stateless) Boilerplate:
```
import React from 'react';

function ExampleFunctionalComponent(props){
  return (
    <div>
      <h1>I am a standard functional component!</h1>
      <p>Here are props I receive from my parent:</p>
      <ul>
        <li>{props.examplePropOne}</li>
        <li>{props.examplePropTwo}</li>
      </ul>
    </div>
  );
}

export default ExampleFunctionalComponent;
```
##### Class Component (Stateful) Boilerplate:
```
import React from 'react';

class ExampleClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.methodName = this.methodName.bind(this);
  }

  methodName() {}

  render() {
    return (
      <div>
        <h1>I am a stateful, class-based component!</h1>
        <p>These are props sent by my parent component:</p>
        <ul>
          <li>{this.props.examplePropOne}</li>
          <li>{this.props.examplePropTwo}</li>
       </ul>
     </div>
    );
  }
}

export default ExampleClassComponent;
```
* super(props); is called to access a parent class's constructor. Because the component class inherits the built in React.Component class, super accesses the React.Component constructor. This ensures our component is instantiated with all necessary React.Component functionality, plus our state data.
* this.state = {}; is standard convention for declaring state in ES6 React classes.

### When to Use Class-Based Components
Only define a component as a class if it absolutely requires state. If a component does not require state, it should always be a stateless functional component. Avoiding unnecessary use of state is an important rule in React. Always begin React projects using only stateless functional components. Then refactor select components into class-based components as it becomes necessary.

__React functions cannot alter their props!__ React components can only take their arguments (props), compose them together into a portion of the UI, and return the JSX results to be rendered.

### Refactoring Functional Components into Class-Based Components
1. Create an ES6 class with the same name that extends React.Component.
1. Add a single empty method to it called render().
1. Move the body of the function into the render() method.
1. Replace any calls to props with this.props in the render() body. (And, calls to any event handlers should change from eventHandlerName to this.eventHandlerName).
1. Delete the remaining empty function declaration.


### Unidirectional Data Flow
Commonly called a "top-down" or "unidirectional" data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree. React is all about one-way data flow down the component hierarchy, from the lowest common parent component. If you can’t find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.

### Inverse Data Flow
The passing of information from a form component to the nearest parent component with shared state. Callbacks fire whenever the state should be updated. onChange event on inputs will be notified of changes. The callbacks passed will call setState(), and the app will be updated.

1. Define a callback function in the parent component where state or data should end up in.
1. The parent component passes this function into the child component as a prop.
1. The child component can access this method through its props, and calls it at a relevant time.
1. When the child executes the callback method from its props, the method in the parent component is invoked. Because the method resides in the parent class it has access to update the parent's state.

### Props
Passed to child component:

via Nested Element Component:
```
<ComponentName propName={value} />
```
via Routed Element Component:
```
<Route path='/component' render={() => <ComponentName propName={this.state.property} />} />
```

### State
In React, state refers to the current condition and/or circumstance of a component or other relevant data. State is data in an application that is dynamic. If a component needs to alter data, that data must be stored in something called state, never a prop; Props are read-only! States are fluid and ever-changing, props are not. Components should only update their own state. To make your UI interactive, you need to be able to trigger changes to your underlying data model.

*Not all components are capable of possessing state!*

State is not:
* static
* passed in from a parent via props
* computed based on any other state or props in your component.

State is:
* user input
* info from APIs

#### Local State
State is only ever used in the control components. It never leaves the file, nor is it referenced elsewhere. This kind of self-contained state is called local state. State to hide/show content is a common example of local state.

#### Application State
Unlike local state, application state is shared and used throughout multiple components. Application state is usually (but not always) the main "type" of data an application is responsible for working with. Application state must be stored in a location where it can be passed down to all components that use it.

### Lifting State
When we work with state that affects multiple components, we must find the components' closest common parent, and pass the data up to that parent. This is called lifting state. The parent then passes the data down to any children that require it. Instead of always placing data at the very top of the component tree, we only place it as "high" as necessary. That is, the closest common ancestor of all components that need the application state data. This keeps React applications performant by ensuring data is only loaded in the areas that absolutely require it.

### Altering State with setState()
State cannot be altered directly. We can only alter state using setState(), which only takes a key value pair.

## Unique IDs (UUID) & Mapped Component Lists
When multiple instances of the same component in the same spot occurs, unique keys are very important, because they allow React to differentiate between these similar components, and hone in on any that may need to be updated individually, instead of re-rendering them all.

## Input
### Refs
Identifier used to reference DOM elements, to collect information users place in form fields. Refs are added as input properties:
```
<input ref={(input) => {_names = input;}} />
```

## Entry Point
In webpack.config.js, we declared index.jsx as our entry point responsible for loading our application. It does this by loading our parent component. The parent component, in turn, loads child components, which then load their child components, so on, and so forth. This entry point is a special type of file. It is not a component. (Notice its filename is not capitalized, either.) Its sole job is loading the parent component and only the parent component.

## Passing Data
React components accept properties (known as props) passed down from a parent. Because React components are functions, these props are a special type of argument.

## PropTypes
While declaring PropTypes is technically optional, it's considered best practice. As React applications grow in size, restricting props' types can be hugely beneficial in preventing errors and bugs. Always declare PropTypes for all component properties in your applications.

### PropTypes List:
```
MyExampleComponent.propTypes = {
  exampleArray: PropTypes.array,
  exampleBoolean: PropTypes.bool,
  exampleFunction: PropTypes.func,
  exampleNumber: PropTypes.number,
  exampleObject: PropTypes.object,
  exampleString: PropTypes.string,
  exampleSymbol: PropTypes.symbol,
  exampleReactElement: PropTypes.element,
}
```
* isRequired
 * `exampleString: PropTypes.string.isRequired`
* arrayOf:
 * `exampleArrayOfStrings: PropTypes.arrayOf(PropTypes.string)`
* instanceOf:
 * `exampleClassTypeProp: PropTypes.instanceOf(ExampleClassName)`
* Enum: restricts variables to one value from a predefined set of constants:
 * `optionalEnum: PropTypes.oneOf(['ExampleClass', 'AnotherExampleClass'])`

## Vocabulary
* Reconciliation
