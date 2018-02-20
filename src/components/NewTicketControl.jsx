// Whenever a component's primary responsibility is managing or syncing a specific interaction it's common practice to include the suffix Control in its name. These are also sometimes known as container components.

import React from 'react';
import ConfirmationQuestions from './ConfirmationQuestions';
import NewTicketForm from './NewTicketForm';

class NewTicketControl extends React.Component {

  constructor(props) {
    super(props); // access a parent class's constructor
    this.state = {
      formVisibleOnPage: false
    };
    this.handleTroubleshootingConfirmation = this.handleTroubleshootingConfirmation.bind(this); // This line redefines the default unbound handleTroubleshootingConfirmation() method as its manually-bound equivalent. binds the method to an instance of the component. This ensures the this in handleTroubleshootingConfirmation() matches the value of this from within constructor().
  }

  handleTroubleshootingConfirmation(){
    this.setState({formVisibleOnPage: true});
  }

  render(){
    let currentlyVisibleContent = null;
    if (this.state.formVisibleOnPage){
      currentlyVisibleContent = <NewTicketForm />;
    } else {
      currentlyVisibleContent = <ConfirmationQuestions onTroubleshootingConfirmation={this.handleTroubleshootingConfirmation}/>;
    }
    // YA GOTTA WRAP THE RETURN IN A DIV, YOU JUST GOTTA
    return (
      <div>
        {currentlyVisibleContent}
      </div>
    );
  }
}

export default NewTicketControl;
