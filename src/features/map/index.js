import React from "react";
import { connect } from "react-redux";
import { SPRITE_SIZE } from "../../features/constants/constants";
import "./styles.css";

function getTileSprite(type) {
  const refObj = {
    0: "toxic",
    1: "tree",
    2: "trophy",
    3: "axe",
    4: "chest1",
    5: "noEntry",
    6: "rock",
    7: "tree",
    8: "chest",
    9: "brick",
    10: "grass1",
    11: "grass",
    12: "tree1",
    13: "chest1",
    14: "rock1",
    15: "pick",
    16: "brick1",
    17: "snorkle",
    18: "drink",
    19: "rope",
    20: "quicksand",
    21: "axe",
    22: "key",
    23: "chest1"
  };
  return refObj[type];
}

function MapTile(props) {
  return (
    <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE
      }}
    ></div>
  );
}

function MapRow(props) {
  return props.tiles.map(tile => <MapTile tile={tile} />);
}

function Map(props) {
  return (
    <>
      <div
        style={{
          height: "600px",
          width: "800px",
          margin: "20px auto"
        }}
      >
        {props.tiles.map(row => (
          <MapRow tiles={row} />
        ))}
      </div>
      <div className="inventory">
        Backpack
        <img
          className={props.tiles[11][8] === 11 ? "keyIn" : "hidden"}
          alt="key png"
          src={require("../../data/tiles/key.png")}
        />
        <img
          className={props.tiles[0][18] === 11 ? "axeIn" : "hidden"}
          alt="axe png"
          src={require("../../data/tiles/axe.png")}
        />
        <img
          className={props.tiles[4][4] === 11 ? "pickIn" : "hidden"}
          alt="icepick png"
          src={require("../../data/tiles/pick.png")}
        />
        <img
          className={props.tiles[13][19] === 11 ? "snorkleIn" : "hidden"}
          alt="snorkle png"
          src={require("../../data/tiles/snorkle.png")}
        />
        <img
          className={props.tiles[13][2] === 11 ? "ropeIn" : "hidden"}
          alt="rope png"
          src={require("../../data/tiles/rope.png")}
        />
      </div>
      <p>{props.tiles[0][10] === 2 ? "Congratulations Winner" : null}</p>
    </>
  );
}

function mapStateToProps(state) {
  return {
    tiles: state.map.tiles
  };
}

export default connect(mapStateToProps)(Map);