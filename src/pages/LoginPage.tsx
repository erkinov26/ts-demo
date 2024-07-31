import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { loginFailure, loginRequest, loginSuccess } from "@/store/authSlice";
import { RootState, AppDispatch } from "@/store/store";
import { getUsers } from "@/store/usersSlice";

interface DataType {
	email: string;
	password: string;
}

export default function LoginPage() {
	const { register, handleSubmit } = useForm<DataType>();
	const dispatch = useDispatch<AppDispatch>();
	const { error, pending } = useSelector((state: RootState) => state.auth);

	const onSubmit: SubmitHandler<DataType> = async (data) => {
		dispatch(loginRequest(true));
		try {
			const response = await fetch("https://dummyjson.com/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: data.email,
					password: data.password,
					expiresInMins: 30,
				}),
			});
			const result = await response.json();
			if (response.ok && result.id) {
				Cookies.set("token", result.token);
				dispatch(getUsers());
				dispatch(loginSuccess(result));
			} else {
				dispatch(loginFailure("Invalid email or password"));
			}
		} catch (error) {
			dispatch(loginFailure("An error occurred. Please try again later."));
		} finally {
			dispatch(loginRequest(false));
		}
	};

	return (
		<div className="w-full min-h-screen flex justify-center items-center">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle className="text-center">Log In</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="text"
									placeholder="Please enter your email"
									{...register("email", { required: true })}
								/>
							</div>
							<div className="flex flex-col space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Please enter your password"
									{...register("password", { required: true })}
								/>
							</div>
						</div>
						{error && <p className="text-red-500 mt-2">{error}</p>}
						<Button
							type="submit"
							className="w-full mt-4">
							{pending ? "Loading..." : "Log In"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
