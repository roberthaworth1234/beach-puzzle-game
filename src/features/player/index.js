import React from "react";
import walkSprite from "./walkingPlayer.png";
import {connect } from 'react-redux'
import handleMovement from './movement'

function Player(props) {
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

function mapStoreToProps(state) {
  return {
    ...state.player,
  }
}

export default connect(mapStoreToProps)(handleMovement(Player))