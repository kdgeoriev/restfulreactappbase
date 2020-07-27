import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      // Initialize the gapi.client object, which app uses to make API requests.
      // Get API key and client ID from API Console.
      // 'scope' field specifies space-delimited list of access scopes.
      window.gapi.client
        .init({
          clientId:
            "633585212457-j008mg9gpn3fbbllcip703gdnagrsp33.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.googleAuth = window.gapi.auth2.getAuthInstance();
          //TODO: refactor
          this.setState({ isSignedIn: this.googleAuth.isSignedIn.get() });
          this.googleAuth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    this.renderLoginButton();
  };
  renderLoginButton() {
    if (this.state.isSignedIn === null) return null;
    else {
      if (this.state.isSignedIn) {
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
    this.googleAuth.signIn();
  };

  onSignOutClick = () => {
    this.googleAuth.signOut();
  };

  render() {
    return <div>{this.renderLoginButton()}</div>;
  }

  componentWillUnmount() {
    this.state.googleAuth.disconnect();
  }
}

export default GoogleAuth;
