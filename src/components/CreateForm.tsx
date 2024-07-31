import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { editTodo } from "@/store/editSlice";
import { AppDispatch } from "@/store/store";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { addTodo } from "@/store/createSlice";

const formSchema = z.object({
	todo: z.string().min(2, {
		message: "Todo must be at least 2 characters.",
	}),
});

export function TodoForm() {
	const { todoId } = useParams<{ todoId: string }>();
	const location = useLocation();
	const initialTodo = location.state?.todo.todo || "";
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			todo: initialTodo,
		},
	});
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		if (todoId) {
			form.setValue("todo", initialTodo);
		}
	}, [todoId, initialTodo, form]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		const todoItem = {
			todo: values.todo,
			completed: false,
			userId: 5,
		};
		if (todoId) {
			dispatch(editTodo({ id: Number(todoId), updatedTodo: todoItem }));
		} else {
			dispatch(addTodo(todoItem));
		}
	}

	return (
		<div className="w-[50%] my-4 mx-auto">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8">
					<FormField
						control={form.control}
						name="todo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Todo</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter todo"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">{todoId ? "Update" : "Create"} Todo</Button>
				</form>
			</Form>
		</div>
	);
}
