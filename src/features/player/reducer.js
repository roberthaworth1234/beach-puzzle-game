const initialState = {
  position: [0, 0],
  spriteLocation: "0px 40px",
  direction: "EAST",
  walkIndex: 0,
  gameRules: "Use the arrow keys to maneuver around the board"
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVE_PLAYER":
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
export default playerReducer;
