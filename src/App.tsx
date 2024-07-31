import { Navigate, Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Home } from "./pages/Home";
import Navbar from "./components/Navbar";
import { TodoForm } from "./components/CreateForm";
import { RootState } from "./store/store";

function App() {
	const authenticated = useSelector((state: RootState) => state.auth.authenticated);

	return (
		<>
			{authenticated && <Navbar />}
			<Routes>
				<Route path="/" element={authenticated ? <Navigate to="/home" /> : <LoginPage />} />
				<Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
				<Route path="/create" element={<ProtectedRoute><TodoForm /></ProtectedRoute>} />
				<Route path="/create/:todoId" element={<ProtectedRoute><TodoForm /></ProtectedRoute>} />
			</Routes>
		</>
	);
}

export default App;
