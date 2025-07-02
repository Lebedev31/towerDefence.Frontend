import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  toggle: boolean;
  isOpen: boolean;
  idUser: string;
  hasNewNotifications: boolean;
  hasNewFriendRequests: boolean;
}

const initialState: InitialState = {
  toggle: true,
  isOpen: false,
  idUser: "",
  hasNewNotifications: false,
  hasNewFriendRequests: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setToggle: (state, actions: PayloadAction<boolean>) => {
      state.toggle = actions.payload;
    },

    setOpenModal: (state, actions: PayloadAction<boolean>) => {
      state.isOpen = actions.payload;
    },

    setIdUser: (state, actions: PayloadAction<string>) => {
      state.idUser = actions.payload;
    },

    setHasNewNotifications: (state, actions: PayloadAction<boolean>) => {
      state.hasNewNotifications = actions.payload;
    },

    setHasNewFriendRequests: (state, actions: PayloadAction<boolean>) => {
      state.hasNewFriendRequests = actions.payload;
    },
  },
});

export const { setToggle, setOpenModal, setIdUser, setHasNewNotifications,
  setHasNewFriendRequests } = mainSlice.actions;
export default mainSlice.reducer;
