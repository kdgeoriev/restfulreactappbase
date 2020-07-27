import React from "react";
import { connect } from "react-redux";
import { editStream, fetchStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (this.props.stream) {
      return (
        <div>
          <h3>Edit Stream</h3>
          <StreamForm
            onSubmit={this.onSubmit}
            initialValues={_.pick(this.props.stream, "title", "description")}
          />
        </div>
      );
    } else return <div>Loading..</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const streamId = ownProps.match.params.id;
  return {
    stream: state.streams[streamId],
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
