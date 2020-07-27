import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAuthState, logIn, logOut } from "../actions";

class LoginButton extends Component {
  componentDidMount = () => {
    window.gapi.load("client:auth2", () => {
      this.props.fetchAuthState();
    });
  };

  renderLoginButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else {
      if (this.props.isSignedIn) {
        return (
          <button
            className="ui red google button"
            onClick={this.onSignOutClick}
          >
            <i className="google icon" />
            Log out
          </button>
        );
      } else {
        return (
          <button className="ui red google button" onClick={this.onSignInClick}>
            <i className="google icon" />
            Sign in with Google
          </button>
        );
      }
    }
  }

  onSignInClick = () => {
    this.props.logIn();
  };

  onSignOutClick = () => {
    this.props.logOut();
  };

  render() {
    return <div>{this.renderLoginButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.googleAuth.isSignedIn,
  };
};
export default connect(mapStateToProps, {
  fetchAuthState,
  logIn,
  logOut,
})(LoginButton);
