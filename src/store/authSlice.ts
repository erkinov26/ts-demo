// src/redux/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userType {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	image: string;
	token: string;
	refreshToken: string;
}

export interface AuthState {
	authenticated: boolean;
	user: null | userType;
	error: string | null;
	pending: boolean;
}

const initialState: AuthState = {
	authenticated: false,
	user: null,
	error: null,
	pending: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginRequest(state, action: PayloadAction<boolean>) {
			state.pending = action.payload;
			state.error = null;
		},
		loginSuccess(state, action: PayloadAction<userType>) {
			state.authenticated = true;
			state.user = action.payload;
			state.error = null;
			state.pending = false;
		},
		loginFailure(state, action: PayloadAction<string>) {
			state.authenticated = false;
			state.user = null;
			state.error = action.payload;
			state.pending = false;
		},
		notAuth(state, action: PayloadAction<boolean>) {
			state.authenticated = action.payload;
			state.user = null;
			state.error = null;
			state.pending = false;
		},
	},
});

export const { loginRequest, loginSuccess, loginFailure, notAuth } =
	authSlice.actions;

export const authReducer = authSlice.reducer;
