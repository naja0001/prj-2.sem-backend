import React from "react";

class HTMLViewer extends React.Component {
  render() {
    return (
      <iframe
        title="Embedded HTML"
        src={`${process.env.PUBLIC_URL}/elever.html`}
        style={{ width: "100%", height: "500px" }}
      />
    );
  }
}

export default HTMLViewer;
