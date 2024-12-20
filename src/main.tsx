import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import "./index.css";
import Login from "./components/Login.tsx";
import CreateQuote from "./components/CreateQuote.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<div className="prose">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/login" element={<Login />} />
					<Route path="/create" element={<CreateQuote />} />
				</Routes>
			</BrowserRouter>
		</div>
	</React.StrictMode>
);
