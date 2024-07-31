import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { notAuth } from "@/store/authSlice";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<div className="flex items-center gap-8 p-5">
			<div
				onClick={() => {
					navigate("/home");
				}}>
				Home
			</div>
			<div
				onClick={() => {
					navigate("/create");
				}}>
				Create
			</div>
			<div
				onClick={() => {
					navigate("/");
					Cookies.remove("token");
					dispatch(notAuth(false));
					console.log("logged");
				}}>
				Log Out
			</div>
		</div>
	);
};

export default Navbar;
