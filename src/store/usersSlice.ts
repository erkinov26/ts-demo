import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Todo {
	id: number;
	todo: string;
	completed: boolean;
	userId: number;
}

export interface TodosState {
	todos: Todo[] | null;
	loading: boolean;
	error: string;
}
const initialState: TodosState = {
	todos: [],
	loading: false,
	error: "",
};

export const getUsers = createAsyncThunk("todos", async () => {
	return fetch("https://dummyjson.com/todos")
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			return data.todos;
		});
});

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				console.log(action.payload, "awdaw");

				state.loading = false;
				state.todos = action.payload;
				state.error = "";
			})
			.addCase(getUsers.rejected, (state) => {
				state.loading = false;
				state.todos = null;
				state.error = "Something went wrong";
			});
	},
});

export const userReducer = userSlice.reducer;
