import store from "../../config/store";
import { SPRITE_SIZE, Map_Width, Map_Height } from "../constants/constants";

function getNewPosition(oldPos, direction) {
  const refObj = {
    WEST: [oldPos[0] - SPRITE_SIZE, oldPos[1]],
    EAST: [oldPos[0] + SPRITE_SIZE, oldPos[1]],
    NORTH: [oldPos[0], oldPos[1] - SPRITE_SIZE],
    SOUTH: [oldPos[0], oldPos[1] + SPRITE_SIZE]
  };
  return refObj[direction];
}

function getWalkIndex() {
  const walkIndex = store.getState().player.walkIndex;
  return walkIndex >= 4 ? 0 : walkIndex + 36;
}

function getSpriteLocation(direction, walkIndex) {
  const refObj = {
    EAST: `${walkIndex}px ${SPRITE_SIZE}px`,
    SOUTH: `${walkIndex}px ${SPRITE_SIZE * 2 + 10}px`,
    NORTH: `${walkIndex}px 0px`,
    WEST: `${walkIndex}px ${SPRITE_SIZE * 3 + 20}px`
  };
  return refObj[direction];
}

function observedBoundaries(oldPos, newPos) {
  return (
    newPos[0] >= 0 &&
    newPos[0] <= Map_Width - SPRITE_SIZE &&
    newPos[1] >= 0 &&
    newPos[1] <= Map_Height - SPRITE_SIZE
  );
}

function fellableTrees(tiles) {
  const newTiles = tiles.map((row, i) => {
    if (i === 0) {
      row.splice(5, 3, 12, 12, 12);
      return row;
    } else return row;
  });
  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles: newTiles
    }
  });
}

function openChest(tiles) {
  const newTiles = tiles.map((row, i) => {
    if (i === 0) {
      row.splice(4, 1, 13);
      return row;
    } else return row;
  });
  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles: newTiles
    }
  });
}

function brokenRocks(tiles) {
  const newTiles = tiles.map((row, i) => {
    if (i === 12) {
      row.splice(3, 1, 14);
      return row;
    } else return row;
  });
  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles: newTiles
    }
  });
}
function climbWalls(tiles) {
  const newTiles = tiles.map((row, i) => {
    if (i === 11 || i === 12) {
      row.splice(19, 1, 16);
      return row;
    } else return row;
  });
  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles: newTiles
    }
  });
}

function trophy(tiles) {
  const newTiles = tiles.map((row, i) => {
    if (i === 0) {
      row.splice(10, 1, 2);
      return row;
    } else return row;
  });
  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles: newTiles
    }
  });
}

function handlePickup(tiles, y, x, nextTile) {
  if (nextTile === 21) {
    fellableTrees(tiles);
  }
  if (nextTile === 22) {
    openChest(tiles);
  }
  if (nextTile === 15) {
    brokenRocks(tiles);
  }
  if (nextTile === 19) {
    climbWalls(tiles);
  }
  const pickItems = tiles.map((row, i) => {
    if (i === y) {
      row.splice(x, 1, 11);
      return row;
    } else return row;
  });
  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles: pickItems
    }
  });
}

function handlePoison(tiles, y, x, nextTile) {
  const poisonedTiles = tiles.map((row, i) => {
    if (i === y || i === y + 1 || i === y - 1) {
      row.splice(x - 1, 3, 0, 0, 0);
      return row;
    } else return row;
  });
  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles: poisonedTiles
    }
  });
}

function handleSand(tiles, y, x, nextTile) {
  if(tiles[13][19] === 17 ) {

    const quickSandTiles = tiles.map((row, i) => {
      if (i === y || i === y + 1 || i === y - 1) {
        row.splice(x - 1, 3, 5, 0, 5);
        return row;
      } else return row;
    });
    store.dispatch({
      type: "ADD_TILES",
      payload: {
        tiles: quickSandTiles
      }
    });
  }
  }


function observeBlock(oldPos, newPos) {
  const tiles = store.getState().map.tiles;
  const y = newPos[1] / SPRITE_SIZE;
  const x = newPos[0] / SPRITE_SIZE;
  const nextTile = tiles[y][x];
  if (nextTile === 13) {
    trophy(tiles, y, x, nextTile);
  }
  if (
    nextTile === 15 ||
    nextTile === 19 ||
    nextTile === 17 ||
    nextTile === 21 ||
    nextTile === 22
  ) {
    handlePickup(tiles, y, x, nextTile);
  }
  if (nextTile === 18) {
    handlePoison(tiles, y, x, nextTile);
  }
  if (nextTile === 20) {
    handleSand(tiles, y, x, nextTile);
  }
  return nextTile > 10;
}

function directionMove(direction, newPos) {
  const walkIndex = getWalkIndex();
  store.dispatch({
    type: "MOVE_PLAYER",
    payload: {
      position: newPos,
      direction,
      walkIndex,
      spriteLocation: getSpriteLocation(direction, walkIndex)
    }
  });
}

function attemptMove(direction) {
  const oldPos = store.getState().player.position;
  const newPos = getNewPosition(oldPos, direction);
  if (observedBoundaries(oldPos, newPos) && observeBlock(oldPos, newPos)) {
    directionMove(direction, newPos);
  }
}

export default function handleMovement(player) {
  function handleKeydown(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        attemptMove("WEST");
        break;
      case 38:
        attemptMove("NORTH");
        break;
      case 39:
        attemptMove("EAST");
        break;
      case 40:
        attemptMove("SOUTH");
        break;
      default:
    }
  }

  window.addEventListener("keydown", e => {
    handleKeydown(e);
  });
  return player;
}
