import React from "react";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import history from "../../history";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    return (
      //same as below <React.Fragment>
      <>
        <button
          onClick={() => {
            this.props.deleteStream(this.props.match.params.id);
          }}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  }

  renderStreamName() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete ${this.props.stream.title}`;
  }

  render() {
    return (
      <Modal
        redirect="/"
        title="Delete stream"
        confirmationText={this.renderStreamName()}
        actions={this.renderActions()}
        onDismiss={() => {
          history.push("/");
        }}
      ></Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const streamId = ownProps.match.params.id;
  return { stream: state.streams[streamId] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
