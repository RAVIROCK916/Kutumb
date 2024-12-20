import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { quotesUrl } from "./constants/url";
import { handleLogout } from "./lib/utils";
import { useNavigate } from "react-router";
import { Button } from "./components/ui/button";

type Quote = {
	id: string;
	text: string;
	mediaUrl: string;
};

function App() {
	const [quotes, setQuotes] = useState<Quote[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("isLoggedIn");
		if (!isLoggedIn) {
			localStorage.setItem("isLoggedIn", "false");
			navigate("/login");
		} else {
			fetchQuotes();
		}
	}, []);

	async function fetchQuotes() {
		try {
			const response = await axios.get(quotesUrl, {
				params: {
					limit: 30,
					offset: 0,
				},
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			});
			console.log(response.data.data);
			setQuotes(response.data.data);
		} catch (error) {
			console.error(error);
			handleLogout();
		}
	}

	return (
		<div className="space-y-4">
			<h1 className="text-6xl font-bold">Kutumb</h1>
			<div className="flex">
				<Button onClick={() => navigate("/create")}>Create quote</Button>
			</div>
			<div className="flex flex-wrap gap-8">
				{quotes.map((quote) => (
					<div key={quote.id} className="flex flex-col gap-2">
						<p className="line-clamp-1 max-w-full">{quote.text}</p>
						<figure className="size-60">
							<img
								src={quote.mediaUrl}
								alt=""
								className="object-cover size-full"
							/>
						</figure>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
