import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { Login, Signup, UserHome } from "./components";
import SingleInquiry from "./components/single-inquiry";
import SingleReply from "./components/single-reply";
import LandingPage from "./components/landing";
import HomePage from "./components/home";
import { me } from "./store";
import InquiryForm from "./components/request-form";
import AllInquiries from "./components/all-inquiries";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route
          path="/login"
          component={Login}
          render={routeProps => <Login {...routeProps} {...this.props} />}
        />
        <Route
          path="/signup"
          render={routeProps => <Signup {...routeProps} {...this.props} />}
        />
        <Route
          path="/home"
          render={routeProps => <HomePage {...routeProps} {...this.props} />}
        />
        <Route exact path="/" component={LandingPage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/inquiries/:inquiryId" component={SingleInquiry} />
            <Route
              path="/replies/:replyId"
              render={routeProps => (
                <SingleReply {...routeProps} {...this.props} />
              )}
            />
            <Route exact path="/inquiries" component={AllInquiries} />
            <Route exact path="/user" component={UserHome} />
            <Route exact path="/post" component={InquiryForm} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
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

export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
