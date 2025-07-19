import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export default function Login({setToken}: { setToken: (token: string) => void }) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const response = await axios.post(`${backendUrl}/api/user/admin`, {email, password});
            if(response.data.success) {
                setToken(response.data.token);
            }
            else {
                toast.error(response.data.message || "Login failed");
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-center text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmit}>
            <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="email" placeholder="abc@gmail.com" required />
            </div>

            <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none" type="password" placeholder="Enter your password" required />
            </div>

            <button className="mt-2 w-full cursor-pointer py-2 px-4 rounded-md text-white bg-black" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}