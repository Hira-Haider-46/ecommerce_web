import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer : React.FC = () => {
  return (
    <footer className="mx-5 md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[4fr_2fr_2fr] gap-14 my-10 mt-25 sm:mt-30 text-sm text-center sm:text-left">
            <div className="mx-auto sm:mx-0">
                <Link to='/'><img src={assets.logo} alt="logo" className="mb-5 w-32 cursor-pointer mx-auto sm:mx-0"/></Link>
                <p className="w-full md:w-[90%] text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores nesciunt eaque esse dolor alias incidunt nostrum voluptatem animi fugiat nihil dolores non, aut voluptas illum sed quod praesentium earum excepturi.</p>
            </div>
            <div className="mx-auto sm:mx-0">
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="mx-auto sm:mx-0">
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>+1234567890</li>
                    <li>example@example.com</li>
                </ul>
            </div>
        </div>
        <div className="border-t border-gray-400">
            <p className="py-5 text-sm text-center text-gray-500">Copyright 2025@ forever.com - All Rights Reserved.</p>
        </div>
    </footer>
  );
}

export default Footer;