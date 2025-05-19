import { assets } from "../assets/frontend_assets/assets";

const Hero: React.FC = () => {
  return (
    <div className="border-t border-gray-400 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center py-10 sm:py-0 text-[#414141]">
        <div className="py-10 md:py-0">
          <div className="items-center gap-2 flex">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BEST SELLERS</p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="items-center gap-2 flex">
            <p className="font-medium text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      <img src={assets.hero_img} alt="hero_img" className="w-full sm:w-2/3 md:w-1/2 m-auto" />
    </div>
  );
};

export default Hero;