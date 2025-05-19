import { useState } from "react";

const Login: React.FC = () => {
  const [currState, setCurrState] = useState<string>("Login");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
          />
        )}
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-400 rounded-md outline-none"
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-400 rounded-md outline-none"
          placeholder="Password"
          required
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer hover:underline">Forgot password?</p>
          {currState === "Login" ? (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="cursor-pointer text-gray-800 hover:underline"
              >
                Create Account
              </span>
            </p>
          ) : (
            <p className="text-gray-600" onClick={() => setCurrState("Login")}>
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