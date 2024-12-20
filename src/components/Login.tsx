import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { useNavigate } from "react-router";
import { loginUrl } from "@/constants/url";
import axios from "axios";
import { Label } from "./ui/label";

const Login = () => {
	const [username, setUsername] = useState("");
	const [otp, setOTP] = useState("");

	const [validation, setValidation] = useState<{
		username: boolean | null;
		otp: boolean | null;
	}>({
		username: null,
		otp: null,
	});

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let isValid = true;

		// validate username (should be 3 characters long and contain at least one uppercase letter and one lowercase letter)
		if (username.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{3,}$/)) {
			setValidation((prevValidation) => ({
				...prevValidation,
				username: true,
			}));
		} else {
			isValid = false;
			setValidation((prevValidation) => ({
				...prevValidation,
				username: false,
			}));
		}
		if (otp === "1234") {
			setValidation((prevValidation) => ({ ...prevValidation, otp: true }));
		} else {
			isValid = false;
			setValidation((prevValidation) => ({ ...prevValidation, otp: false }));
		}

		if (!isValid) {
			return;
		}
		console.log("asdasdas");

		const response = await axios.post(loginUrl, {
			username,
			otp,
		});

		localStorage.setItem("token", response.data.token);
		localStorage.setItem("isLoggedIn", "true");

		navigate("/");
	};

	return (
		<div className="flex justify-center items-center h-dvh">
			<div className="w-96 space-y-4">
				<h1 className="text-3xl font-semibold">Login</h1>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-1">
						<Label className="text-base">Username</Label>
						<Input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						{
							// if username is invalid, display an error message
							validation.username == false && (
								<p className="text-red-500">
									Username must be at least 3 characters long and contain at
									least one uppercase letter and one lowercase letter.
								</p>
							)
						}
					</div>
					<div className="space-y-1">
						<Label className="text-base">OTP</Label>
						<InputOTP
							maxLength={4}
							value={otp}
							onChange={(value) => setOTP(value)}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
							</InputOTPGroup>
						</InputOTP>
						{validation.otp == false && (
							<p className="text-red-500">Invalid OTP.</p>
						)}
					</div>
					<Button>Submit</Button>
				</form>
			</div>
		</div>
	);
};
export default Login;
