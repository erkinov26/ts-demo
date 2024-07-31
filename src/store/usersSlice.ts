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

export const getUsers = createAsyncThunk<Todo[], void, { rejectValue: string }>(
	"todos",
	async (_, { rejectWithValue }) => {
		const response = await fetch("https://dummyjson.com/todos");
		if (!response.ok) {
			const error = await response.text();
			return rejectWithValue(error);
		}
		const data = await response.json();
		return data.todos;
	},
);

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.todos = action.payload;
				state.error = "";
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.loading = false;
				state.todos = null;
				state.error = action.payload || "Something went wrong";
			});
	},
});

export const userReducer = userSlice.reducer;
