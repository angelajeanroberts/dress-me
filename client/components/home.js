import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { me } from "../store";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stackId: null,
      // dataKey: null
    };
  }

  getTxStatus = () => {
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackId];
    if (!txHash) return null;
    console.log('txHash', transactions[txHash])
    // console.log("tx events", transactions[txHash].receipt.events.Authenticated.returnValues.userId);
  };

  getUsersStruct = async () => {
    const { drizzle, drizzleState } = this.props;
    const mainContract = drizzle.contracts.Main;
    const { Main } = drizzleState.contracts
    const dataKey = await mainContract.methods["userTracker"].cacheCall();
    const users = await Main.userTracker[dataKey]
    console.log("userTracker", users);
  };

  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    console.log("drizzle", drizzle);
    const mainContract = drizzle.contracts.Main;
    const stackId = await mainContract.methods["auth"].cacheSend({
      from: drizzleState.accounts[0]
    });
    // const dataKey = await mainContract.methods["users"].cacheCall({
    //   from: drizzleState.accounts[0]
    // });
    console.log("stackId", stackId);
    // console.log("dataKey", dataKey);
    this.props.loadInitialData();
    this.setState({ stackId });
  }

  render() {
    const { isLoggedIn } = this.props;
    this.getTxStatus();
    this.getUsersStruct();
    return isLoggedIn ? (
      <div className="window">
        <div className="center-display">
          <h2>what are you looking to do?</h2>
          <div className="home-options">
            <Link to="/post">
              <button className="home-button" type="button">
                Post A Request
              </button>
            </Link>
            <Link to="/inquiries">
              <button className="home-button" type="button">
                Search Open Requests
              </button>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div className="window">
        <div className="center-display">
          <h2>log in or sign up to enter</h2>
          <div className="home-options">
            <Link to="/login">
              <button className="home-button" type="button">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="home-button" type="button">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default connect(mapState, mapDispatch)(HomePage);
