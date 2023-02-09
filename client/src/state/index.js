//import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";

// this data will be accessible throughout entire application and can be grabebd whenever we want.
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
  };

  export const authSlice = createSlice({
    name: "auth",
    initialState,
    // actions or functions involve modifying the global state
    reducers: {
        setMode: (state) => {
          state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
        },
        setLogout: (state) => {
          state.user = null;
          state.token = null;
        },
        setFriends: (state, action) => {
          if (state.user) {
            state.user.friends = action.payload.friends;
          } else {
            console.error("user friends non-existent :(");
          }
        },
        setPosts: (state, action) => {
          state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
          const updatedPosts = state.posts.map((post) => {
            if (post._id === action.payload.post._id) return action.payload.post;
            return post;
          });
          state.posts = updatedPosts;
        },
      },
    });
    
    export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
      authSlice.actions;
// reducers are pure functions that contain the logic and calculation that needed to be performed on the state
export default authSlice.reducer;