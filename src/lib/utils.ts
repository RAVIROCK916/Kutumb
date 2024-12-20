import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function handleLogout() {
	localStorage.removeItem("isLoggedIn");
	localStorage.removeItem("token");
	window.location.href = "/login";
}
