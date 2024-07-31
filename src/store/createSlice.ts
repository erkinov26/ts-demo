// createSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface newTodoType {
	todo: string;
	completed: boolean;
	userId?: number;
}

interface AddTodoState {
	pending: boolean;
	success: boolean;
	error: string | null;
	newTodo: newTodoType | null;
}

const initialState: AddTodoState = {
	pending: false,
	success: false,
	error: null,
	newTodo: null,
};

export const addTodo = createAsyncThunk<
	newTodoType,
	newTodoType,
	{ rejectValue: string }
>("addTodo", async (newTodo: newTodoType, { rejectWithValue }) => {
	const response = await fetch("https://dummyjson.com/todos/add", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newTodo),
	});
	if (!response.ok) {
		const error = await response.text();
		return rejectWithValue(error);
	}
	const data = await response.json();
	return data;
});

const addTodoSlice = createSlice({
	name: "addTodo",
	initialState,
	reducers: {
		resetAddTodoState(state) {
			state.pending = false;
			state.success = false;
			state.error = null;
			state.newTodo = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addTodo.pending, (state) => {
				state.pending = true;
				state.success = false;
				state.error = null;
			})
			.addCase(
				addTodo.fulfilled,
				(state, action: PayloadAction<newTodoType>) => {
					state.pending = false;
					state.success = true;
					state.error = null;
					state.newTodo = action.payload;
				},
			)
			.addCase(
				addTodo.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.pending = false;
					state.success = false;
					state.error = action.payload || "Failed to add todo";
				},
			);
	},
});

export const { resetAddTodoState } = addTodoSlice.actions;
export const addTodoReducer = addTodoSlice.reducer;
