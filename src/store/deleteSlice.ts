import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface DeleteState {
	pending: boolean;
	success: boolean;
	error: string | null;
}

const initialState: DeleteState = {
	pending: false,
	success: false,
	error: null,
};

export const deleteItem = createAsyncThunk<string, number>(
	"delete",
	async (id) => {
		const response = await fetch(`https://dummyjson.com/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			const error = await response.text();
			throw new Error(error);
		}
		const data = await response.json();
		return data;
	},
);

const deleteSlice = createSlice({
	name: "delete",
	initialState,
	reducers: {
		resetDeleteState(state) {
			state.pending = false;
			state.success = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(deleteItem.pending, (state) => {
				state.pending = true;
				state.success = false;
				state.error = null;
			})
			.addCase(deleteItem.fulfilled, (state) => {
				state.pending = false;
				state.success = true;
				state.error = null;
			})
			.addCase(deleteItem.rejected, (state, action) => {
				state.pending = false;
				state.success = false;
				state.error = action.payload as string;
			});
	},
});

export const { resetDeleteState } = deleteSlice.actions;
export const deleteReducer = deleteSlice.reducer;
