import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { uploadImageUrl } from "@/constants/url";
import { Label } from "./ui/label";
import { createQuoteUrl } from "../constants/url";
import { useNavigate } from "react-router";

const CreateQuote = () => {
	const [quote, setQuote] = useState("");
	const [file, setFile] = useState<File | undefined>();

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitted");
		console.log(file);

		const formData = new FormData();
		formData.append("file", file as Blob);
		try {
			const response = await axios.post(uploadImageUrl, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			await axios.post(
				createQuoteUrl,
				{
					text: quote,
					mediaUrl: response.data[0].url,
				},
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);

			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="max-w-96 space-y-4">
			<h1 className="text-4xl">Create Quote</h1>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div className="space-y-1">
					<Label>Quote</Label>
					<Input
						type="quote"
						placeholder="Quote"
						value={quote}
						onChange={(e) => setQuote(e.target.value)}
					/>
				</div>
				<div className="space-y-1">
					<Label>Upload Image</Label>
					<Input
						type="file"
						placeholder="Media"
						onChange={(e) => setFile(e.target.files?.[0])}
					/>
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
};
export default CreateQuote;
