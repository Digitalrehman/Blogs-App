import { createSlice } from "@reduxjs/toolkit";

let intial_state = {
  markitem: [],
};
let BookMark = createSlice({
  name: "bookmark",
  initialState: intial_state,
  reducers: {
    addBookMark: (state, action) => {
      state.markitem.push(action.payload);
    },
  },
});
let { addBookMark } = BookMark.actions;
let { reducer } = BookMark;
export { addBookMark, reducer as bookmarkitems };
