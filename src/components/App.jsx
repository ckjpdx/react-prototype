import React from 'react'; // always import core React library
import { Switch, Route, withRouter } from 'react-router-dom';
import NewTicketControl from './NewTicketControl';
import Header from './Header';
import List from './List';
import Admin from './Admin';
import Error404 from './Error404';
import reactLogo from '../assets/images/react-logo.svg';
import { connect } from './react-redux';
import PropTypes from 'prop-types';

// import Moment from 'moment';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTicket: null
    };
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
    // let newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    // Object.keys(newMasterTicketList).forEach(ticketId =>
    //   newMasterTicketList[ticketId].formattedWaitTime = newMasterTicketList[ticketId].timeOpen.fromNow(true)
    // );
    // this.setState({masterTicketList: newMasterTicketList});
  }

  handleChangingSelectedTicket(ticketId){
    this.setState({selectedTicket: ticketId});
  }

  render(){
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
            <List ticketList={this.props.masterTicketList} />} />

          <Route path='/newticket' render={() =>
            <NewTicketControl />} />

          <Route path='/admin' render={(props) =>
            <Admin
              ticketList={this.props.masterTicketList}
              currentRouterPath={props.location.pathname}
              onTicketSelection={this.handleChangingSelectedTicket}
              selectedTicket={this.state.selectedTicket}/>} />

          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    masterTicketList: state
  }
}

App.propTypes = {
  masterTicketList: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(App));
