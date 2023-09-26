import React, { Component } from "react";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="dark bg-background min-h-screen text-foreground">
        {this.props.children}
      </div>
    );
  }
}
