import React from 'react'; // always import core React library
import { Switch, Route } from 'react-router-dom';
import { v4 } from 'uuid';
import NewTicketControl from './NewTicketControl';
import Header from './Header';
import List from './List';
import Admin from './Admin';
import Error404 from './Error404';
import reactLogo from '../assets/images/react-logo.svg';
// import Moment from 'moment';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    };
    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  }

  componentDidMount(){
    this.waitTimeUpdateTimer = setInterval(()=>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime() {
    let newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    Object.keys(newMasterTicketList).forEach(ticketId =>
      newMasterTicketList[ticketId].formattedWaitTime = newMasterTicketList[ticketId].timeOpen.fromNow(true)
    );
    this.setState({masterTicketList: newMasterTicketList});
  }

  handleAddingNewTicketToList(newTicket){
    let newTicketId = v4();
    let newMasterTicketList = Object.assign({}, this.state.masterTicketList, {
      [newTicketId]: newTicket
    });
    newMasterTicketList[newTicketId].formattedWaitTime = newMasterTicketList[newTicketId].timeOpen.fromNow(true);
    this.setState({masterTicketList: newMasterTicketList});
  }

  handleChangingSelectedTicket(ticketId){
    this.setState({selectedTicket: ticketId});
  }

  render(){
    console.log(this.state.masterTicketList);
    let reactLogoStyle = {
      maxWidth: 300
    };
    return ( // the return is JSX that renders content
      <div>
        <style jsx global>{`
          * {
            text-align: center;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          `}</style>
        <img src={reactLogo} style={reactLogoStyle}/>
        <h1>App Content</h1>
        <Header/>
        <Switch>
          <Route exact path='/' render={() =>
            <List ticketList={this.state.masterTicketList} />} />

          <Route path='/newticket' render={() =>
            <NewTicketControl
              onNewTicketCreation={this.handleAddingNewTicketToList} />} />

          <Route path='/admin' render={(props) =>
            <Admin
              ticketList={this.state.masterTicketList}
              currentRouterPath={props.location.pathname}
              onTicketSelection={this.handleChangingSelectedTicket}
              selectedTicket={this.state.selectedTicket}/>} />

          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

export default App;
