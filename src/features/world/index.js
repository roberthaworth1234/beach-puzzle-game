import React from "react";
import Player from "../player/index";
import Map from "../map/index";
import { tiles } from "../../data/maps/1";
import store from "../../config/store";

export default function World() {
  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles
    }
  });
  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "600px",
        margin: "20px auto"
      }}
    >
      <Map tiles={tiles} />
      <Player />
    </div>
  );
}
