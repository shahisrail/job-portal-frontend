import Secondbanner from "@/public/Second-banner.png";
import Image from "next/image";
import { FaBuilding, FaChartPie, FaPen, FaUser } from "react-icons/fa";
import "./about.css";
const About = () => {
  return (
    <div>
      {/*  brandcome */}
      <div className="flex justify-between items-center p-5">
        <div>
          <h1 className="font-bold text-[#282b4a] text-[45.87px]">
            Find Your Job And
          </h1>
          <h6 className="font-bold text-[#ff4153] text-[35.23px]">
            Make Sure Goal
          </h6>
        </div>
        <div>
          <Image
            src="/about.png"
            alt="Signup illustration"
            width={700}
            height={500}
          />
        </div>
      </div>
      {/*  brandcome */}
      <div className="flex justify-between gap-10 items-start p-5">
        <div className="flex-1">
          <Image
            src={Secondbanner}
            alt="Signup illustration"
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 mt-10">
          <h1 className="font-bold text-[#282b4a] text-[45.87px]">
            Company <span className="text-[#ff4153]">Overview</span>
          </h1>
          <h6 className="space-y-5 mt-20 text-[#7e7373] font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, Donec vitae
            dui eget tellus gravida venenatis. Integer fringilla congue eros non
            fermentum. Maecenas nisl est, Donec vitae dui eget tellus gravida
            venenatis. Integer fringilla congue eros non fermentum ultrices nec
            congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
            aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim
            ac. In at libero sed nunc sed do tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </h6>
          <h6 className="space-y-5 mt-10 text-[#7e7373] font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, Donec vitae
            dui eget tellus gravida venenatis. Integer fringilla congue eros non
            fermentum Donec vitae dui eget tellus gravida venenatis. vitae dui
            eget tellus gravida venenatis.Nunc sagittis dictum nisi, sed
            ullamcorper ipsum dignissim ac. In at libero sed nunc sed
          </h6>
        </div>
      </div>
      {/* why choose us */}
      <div>
        <h2 className="font-bold text-[#282b4a] text-[45.87px] text-center mt-10">
          Why Choose <span className="text-[#ff4153]">Us?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 p-10">
          <div className="card group hover:bg-[#ff4153] hover:shadow-2xl hover:text-white rounded-3xl p-10">
            <div className="daimond-bg ">
              <FaUser className="text-4xl mb-4 text-white p-2 daimond-bg1 group-hover:bg-white group-hover:text-[#ff4153]  " />
            </div>
            {/* Icon added here */}
            <div className="card-body">
              <h2 className="text-center text-[#ff4153] hover:text-white font-bold text-[21.28px] my-10 mt-0 mb-[25px] group-hover:text-white">
                Trusted Quality
              </h2>
              <p className="group-hover:text-white text-center">
                A card component has a figure, a body part, and inside the body,
                there are title and actions parts.
              </p>
            </div>
          </div>
          <div className="card group hover:bg-[#ff4153] hover:shadow-2xl hover:text-white rounded-3xl p-10">
            <div className="daimond-bg ">
              <FaBuilding className="text-4xl mb-4 text-white p-2 daimond-bg1 group-hover:bg-white group-hover:text-[#ff4153]  " />
            </div>
            {/* Icon added here */}
            <div className="card-body">
              <h2 className="text-center text-[#ff4153] hover:text-white font-bold text-[21.28px] my-10 mt-0 mb-[25px] group-hover:text-white">
                Trusted Quality
              </h2>
              <p className="group-hover:text-white text-center">
                A card component has a figure, a body part, and inside the body,
                there are title and actions parts.
              </p>
            </div>
          </div>
          <div className="card group hover:bg-[#ff4153] hover:shadow-2xl hover:text-white rounded-3xl p-10">
            <div className="daimond-bg ">
              <FaChartPie className="text-4xl mb-4 text-white p-2 daimond-bg1 group-hover:bg-white group-hover:text-[#ff4153]  " />
            </div>
            {/* Icon added here */}
            <div className="card-body">
              <h2 className="text-center text-[#ff4153] hover:text-white font-bold text-[21.28px] my-10 mt-0 mb-[25px] group-hover:text-white">
                Trusted Quality
              </h2>
              <p className="group-hover:text-white text-center">
                A card component has a figure, a body part, and inside the body,
                there are title and actions parts.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* overviwe */}
      <div className="relative">
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 p-10">
          <div className="card shadow-2xl rounded-3xl p-5 flex flex-col items-center justify-center">
            <div className="bg-[#282b4a] rounded-full p-4 pb-4 flex items-center justify-center mb-4">
              {" "}
              {/* Centering icon */}
              <FaUser className="text-4xl text-white group-hover:text-[#ff4153]" />
            </div>
            {/* Icon added here */}
            <div className="card-body text-center">
              {" "}
              {/* Centering text */}
              <h2 className="text-[#ff4153] font-bold text-[31.28px]   group-hover:text-white">
                19K +
              </h2>
              <p className="text-black group-hover:text-white">Job Available</p>
            </div>
          </div>
          <div className="card shadow-2xl rounded-3xl p-5 flex flex-col items-center justify-center">
            <div className="bg-[#282b4a] rounded-full p-4 pb-4 flex items-center justify-center mb-4">
              {" "}
              {/* Centering icon */}
              <FaPen className="text-4xl text-white group-hover:text-[#ff4153]" />
            </div>
            {/* Icon added here */}
            <div className="card-body text-center">
              {" "}
              {/* Centering text */}
              <h2 className="text-[#ff4153] font-bold text-[31.28px]   group-hover:text-white">
                15K +
              </h2>
              <p className="text-black group-hover:text-white">CV Submited</p>
            </div>
          </div>
          <div className="card shadow-2xl rounded-3xl p-5 flex flex-col items-center justify-center">
            <div className="bg-[#282b4a] rounded-full p-4 pb-4 flex items-center justify-center mb-4">
              {" "}
              {/* Centering icon */}
              <FaBuilding className="text-4xl text-white group-hover:text-[#ff4153]" />
            </div>
            {/* Icon added here */}
            <div className="card-body text-center">
              {" "}
              {/* Centering text */}
              <h2 className="text-[#ff4153] font-bold text-[31.28px]   group-hover:text-white">
                11K +
              </h2>
              <p className="text-black group-hover:text-white">Companies</p>
            </div>
          </div>
          <div className="card shadow-2xl rounded-3xl p-5 flex flex-col items-center justify-center">
            <div className="bg-[#282b4a] rounded-full p-4 pb-4 flex items-center justify-center mb-4">
              {" "}
              {/* Centering icon */}
              <FaUser className="text-4xl text-white group-hover:text-[#ff4153]" />
            </div>
            {/* Icon added here */}
            <div className="card-body text-center">
              {" "}
              {/* Centering text */}
              <h2 className="text-[#ff4153] font-bold text-[31.28px]   group-hover:text-white">
                35 +
              </h2>
              <p className="text-black group-hover:text-white">
                Appointed To Job
              </p>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  );
};

export default About;
