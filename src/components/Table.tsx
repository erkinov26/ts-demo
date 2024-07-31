import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Todo } from "@/store/usersSlice";
import { Button } from "@/components/ui/button";
import { deleteItem, resetDeleteState } from "@/store/deleteSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/store/store";

export function Table() {
	const { todos, loading } = useSelector((state: RootState) => state.todos);
	const deleteState = useSelector((state: RootState) => state.deleteTodo);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		if (deleteState.success) {
			dispatch(resetDeleteState());
		}
	}, [deleteState.success, dispatch]);

	return (
		<div className="flex justify-center ">
			<table className="rounded-md border">
				<TableHeader>
					<TableRow>
						<TableHead>Id</TableHead>
						<TableHead>Todo</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{loading || todos === null ? (
						<TableRow>
							<TableCell
								colSpan={3}
								className="text-center">
								Loading...
							</TableCell>
						</TableRow>
					) : todos.length > 0 ? (
						todos.map((todo: Todo) => (
							<TableRow key={todo.id}>
								<TableCell>{todo.id}</TableCell>
								<TableCell>{todo.todo}</TableCell>
								<TableCell>
									<Button
										variant="outline"
										onClick={() =>
											navigate(`/create/${todo.id}`, { state: { todo } })
										}>
										Edit
									</Button>
									<Button
										onClick={() => {
											dispatch(deleteItem(todo.id));
										}}
										variant="destructive">
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={3}
								className="text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</table>
		</div>
	);
}
