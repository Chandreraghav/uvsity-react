export const initialState = {
  user: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
};
const reducer = (state, action) => {
  // console.log(
  //   "Reducer: Setting the incoming api data into the data layer context"
  // );
  // console.log(action);

  //action has 2 types-> type, [payload]
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default reducer;
