const initialState = {
  position: [760, 280],
  spriteLocation: "0px 62px",
  direction: "EAST",
  walkIndex: 0
};

const enemyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVE_ENEMY":
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
export default enemyReducer;
