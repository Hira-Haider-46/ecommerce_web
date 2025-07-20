import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [currState, setCurrState] = useState<string>("Login");
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("Login must be used within a ShopProvider");
  }

  const { token, setToken, navigate, backendUrl } = context;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (currState === "Sign Up") {

        const res = await axios.post(backendUrl + "/api/user/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(backendUrl + "/api/user/login", {
          email: formData.email,
          password: formData.password,
        });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  useEffect(() => {
    if(token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="border-t border-gray-300">
      <form
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-8 gap-5 sm:gap-8 text-gray-800"
        onSubmit={onSubmitHandler}
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currState === "Sign Up" && (
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-400 rounded-md outline-none"
            placeholder="Name"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
        )}
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-400 rounded-md outline-none"
          placeholder="Email"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-400 rounded-md outline-none"
          placeholder="Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer hover:underline text-xs md:text-base my-2">
            Forgot password?
          </p>
          {currState === "Login" ? (
            <p className="my-2 text-gray-600 text-xs md:text-base">
              Don't have an account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="cursor-pointer text-gray-800 hover:underline"
              >
                Create Account
              </span>
            </p>
          ) : (
            <p
              className="my-2 text-gray-600 text-xs md:text-base"
              onClick={() => setCurrState("Login")}
            >
              Already have an account?{" "}
              <span className="cursor-pointer text-gray-800 hover:underline">
                Login
              </span>
            </p>
          )}
        </div>
        <button className="mt-2 w-1/2 bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded-sm cursor-pointer hover:bg-white border border-black hover:text-black transition-all duration-400">
          {currState}
        </button>
      </form>
    </div>
  );
};

export default Login;