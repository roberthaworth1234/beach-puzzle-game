import React, { Component } from "react";
import walkSprite from "./enemySprite.png";
import { connect } from "react-redux";
import handleMove from "./movement";

class Enemy extends Component {
  // componentDidMount() {
  //  handleMove();
  // }
  render() {
    const props = this.props
    return (
      <div
        style={{
          position: "absolute",
          top: props.position[1],
          left: props.position[0],
          backgroundImage: `url(${walkSprite})`,
          backgroundPosition: props.spriteLocation,
          width: "40px",
          height: "40px"
        }}
      />
    );
  }
}


function mapStoreToProps(state) {
  return {
    ...state.enemy
  };
}

export default connect(mapStoreToProps)(handleMove(Enemy));
