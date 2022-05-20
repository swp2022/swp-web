import { createSlice } from "@reduxjs/toolkit";
import { storageState } from "../util/storage";

const boardInitialState = [];

const boardSlice = createSlice({
    name: "board",
    initialState: storageState("board", boardInitialState),
    reducers: {
      setBoardInfo(state, action) {
        action.payload.map(board=>{
          state.push(board);
        });
      },
      eraseBoardInfo(state){
        state =[];
      }
    },
  });

  export const { setBoardInfo ,eraseBoardInfo } = boardSlice.actions;
  export const boardReducer = boardSlice.reducer;