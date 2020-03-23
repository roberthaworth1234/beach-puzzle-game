import store from "../../config/store";
import { SPRITE_SIZE } from "../constants/constants";

function killGame(newPos, enemyPos, oldPos) {
  const tiles = store.getState().map.tiles;
  const y = oldPos[1] / SPRITE_SIZE;
  const x = oldPos[0] / SPRITE_SIZE;
  // const nextTile = tiles[y][x];
  const deathTiles = tiles.map((row, i) => {
    if (i === y || i === y + 1 || i === y - 1) {
      row[x + 1] === undefined
        ? row.splice(x - 1, 2, 0, 0)
        : row.splice(x - 1, 3, 0, 0, 0);
      return row;
    } else return row;
  });
  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles: deathTiles
    }
  });
}
function spriteDirection(direction) {
  const refObj = {
    right: "-40px 63px",
    left: "0px 62px"
  };
  return refObj[direction];
}

function moveEnemyRight(counter) {
  const enemyPos = store.getState().enemy.position;
  const playerPos = store.getState().player.position;
  if (enemyPos[0] === playerPos[0] && enemyPos[1] === playerPos[1]) {
    killGame(null, enemyPos, playerPos);
  }
  if (counter === 8) {
    return moveEnemyLeft(8);
  }
  setTimeout(() => {
    store.dispatch({
      type: "MOVE_ENEMY",
      payload: {
        position: [enemyPos[0] + SPRITE_SIZE, enemyPos[1]],
        spriteLocation: spriteDirection("right")
      }
    });
    counter++;
    if (counter <= 8) {
      moveEnemyRight(counter);
    } else return null;
  }, 500);
}

function moveEnemyLeft(counter) {
  const enemyPos = store.getState().enemy.position;
  const playerPos = store.getState().player.position;
  if (enemyPos[0] === playerPos[0] && enemyPos[1] === playerPos[1]) {
    killGame(null, enemyPos, playerPos);
  }
  if (counter === 0) {
    return moveEnemyRight(0);
  } else {
    const direction = spriteDirection('left')
    setTimeout(() => {
      store.dispatch({
        type: "MOVE_ENEMY",
        payload: {
          position: [enemyPos[0] - SPRITE_SIZE, enemyPos[1]],
          spriteLocation: direction
        }
      });
      counter--;
      if (counter >= 0) {
        moveEnemyLeft(counter);
      } else return null;
    }, 500);
  }
}

export default function handleMove(enemy) {
  moveEnemyLeft(8);
  return enemy;
}
