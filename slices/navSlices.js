import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  number: null,
  user: {
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    name: null,
    home_address: null,
  },
  token: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {
  setDestination,
  setOrigin,
  setTravelTimeInformation,
  setNumber,
  setUser,
  setToken
} = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectNumber = (state) => state.nav.number;
export const selectUser = (state) => state.nav.user;
export const selectToken = (state) => state.nav.token;

export default navSlice.reducer;
