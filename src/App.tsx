import { useEffect } from "react";
import "./App.css";

function App() {
	useEffect(() => {
		const isLoggedIn = localStorage.getItem("isLoggedIn");
		if (!isLoggedIn) {
			window.location.href = "/login";
		}
	}, []);

	return (
		<>
			<h1 className="underline">Kutumb</h1>
		</>
	);
}

export default App;
