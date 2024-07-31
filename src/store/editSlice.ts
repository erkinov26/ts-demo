import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface EditTodoType {
	todo: string;
	completed: boolean;
	userId: number;
}

interface EditTodoState {
	pending: boolean;
	success: boolean;
	error: string | null;
	editedTodo: EditTodoType | null;
}

const initialState: EditTodoState = {
	pending: false,
	success: false,
	error: null,
	editedTodo: null,
};

export const editTodo = createAsyncThunk<
	EditTodoType,
	{ id: number; updatedTodo: EditTodoType }
>("editTodo", async ({ id, updatedTodo }) => {
	const response = await fetch(`https://dummyjson.com/todos/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updatedTodo),
	});
	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}
	const data = await response.json();
	return data;
});

const editTodoSlice = createSlice({
	name: "editTodo",
	initialState,
	reducers: {
		resetEditTodoState(state) {
			state.pending = false;
			state.success = false;
			state.error = null;
			state.editedTodo = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(editTodo.pending, (state) => {
				state.pending = true;
				state.success = false;
				state.error = null;
			})
			.addCase(editTodo.fulfilled, (state, action) => {
				state.pending = false;
				state.success = true;
				state.error = null;
				state.editedTodo = action.payload;
			})
			.addCase(editTodo.rejected, (state, action) => {
				state.pending = false;
				state.success = false;
				state.error = action.payload as string;
			});
	},
});
export const { resetEditTodoState } = editTodoSlice.actions;
export const editTodoReducer = editTodoSlice.reducer;
