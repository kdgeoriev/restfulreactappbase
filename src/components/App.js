import React from "react";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Navigation from "./Navigation";

const App = () => {
  /* this <Route path="/" exact component={PageOne} /> equals this
          <Route path="/" exact = {true} component={PageOne} /> */
  return (
    <div>
      <Navigation />
    </div>
  );
};

export default App;
