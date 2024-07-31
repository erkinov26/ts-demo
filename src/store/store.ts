// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { userReducer } from "./usersSlice";
import { deleteReducer } from "./deleteSlice";
import { addTodoReducer } from "./createSlice";
import { editTodoReducer } from "./editSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		todos: userReducer,
		createTodo: addTodoReducer,
		deleteTodo: deleteReducer,
		editTodo: editTodoReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
