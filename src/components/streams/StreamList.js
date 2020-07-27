import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderSpecialPermissions(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
        </div>
      );
    }
    return null;
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderSpecialPermissions(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="title">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreateButton() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            New Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>List of Streams:</h2>
        <div className="ui celled list">{this.renderList()}</div>
        <div>{this.renderCreateButton()}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.googleAuth.userId,
    isSignedIn: state.googleAuth.isSignedIn,
  };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
