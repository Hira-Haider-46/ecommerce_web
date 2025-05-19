const NewsLetterBox: React.FC = () => {
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="text-center mb-5 mx-5">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now and get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
        dolorum.
      </p>
      <form
        className="w-full sm:w-2/3 md:w-1/2 flex flex-col sm:flex-row items-stretch gap-4 mx-auto my-8 px-4 sm:px-0"
        onSubmit={onSubmitHandler}
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full sm:w-3/4 border border-gray-300 p-3 rounded-md transition duration-200 outline-none text-sm"
          required
        />
        <button
          type="submit"
          className="w-1/2 sm:w-1/4 bg-black text-white text-sm font-medium px-6 py-3 rounded-md transition duration-200 hover:bg-white hover:text-black border border-black cursor-pointer mx-auto sm:mx-0"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;