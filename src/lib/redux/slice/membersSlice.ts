import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
  endCursor: [],
  hasNextPage: true,
  filter: {},
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      return {
        ...state,
        members: action.payload,
      };
    },
    nextEndCursor: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.endCursor.push(action?.payload);
    },
    prevEndCursor: (state) => {
      state.endCursor.pop();
    },
    setFilter: (state, action) => {
      return {
        ...state,
        filter: action.payload,
      };
    },
    setHasNextPage: (state, action) => {
      return {
        ...state,
        hasNextPage: action.payload,
      };
    },
  },
});

export const { setMembers, nextEndCursor, prevEndCursor, setFilter, setHasNextPage } =
  membersSlice.actions;
export default membersSlice.reducer;
