import Image from "next/image";

const Banner = () => {
  return (
    <>
      <div className="relative h-[1000px]   ">
        {" "}
        {/* Adjust the height as needed */}
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
          <Image
            src={"/first-banner.png"}
            alt="banner image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative z-10 flex justify-between items-center p-10 space-y-4">
          <div>
            <h1 className="font-bold text-[#282b4a] text-[51.87px]">
              Find Your Favourite
            </h1>
            <h6 className="font-bold text-[#ff4153] text-[41.23px]">
              Job Immediate
            </h6>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut non{" "}
              <br />
              facere architecto, atque, voluptate error libero animi aliquam{" "}
              <br />
              pariatur vero quia placeat commodi veniam necessitatibus. Delectus{" "}
              <br />
              provident repellendus fuga saepe.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-stretch items-center p-10 space-y-4 mt-10">
        <div>
          <Image
            src={"/women.png"}
            height={500}
            width={500}
            alt="women png is loading"
          />
        </div>
        <div className="space-y-4">
          <h1 className="font-bold text-[#282b4a] text-[51.87px]">
            Find Million Of Jobs And
          </h1>
          <h6 className="font-bold text-[#ff4153] text-[41.23px]">
            Achieve Success
          </h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            <br />
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis{" "}
            <br />
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas{" "}
            <br />
            commodo viverra maecenas accumsan lacus vel facilisis.
          </p>
        </div>
      </div>
      {/* process  */}
      <div className="p-10 space-y-4">
        <h2 className="text-center font-bold text-[#ff4153] text-[51.23px]">
          Our Job Process
        </h2>

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <div className="card hover:bg-base-100 hover:shadow-lg   shadow-sm">
              <div className="card-body">
                <h2 className=" font-bold text-2xl text-[#ff4153] text-center">
                  Create Account
                </h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="card hover:bg-base-100 hover:shadow-lg   shadow-sm">
              <div className="card-body">
                <h2 className="font-bold text-2xl text-[#ff4153] text-center ">
                  Search Job
                </h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="card hover:bg-base-100 hover:shadow-lg   shadow-sm">
              <div className="card-body">
                <h2 className="font-bold text-2xl text-[#ff4153] text-center ">
                  Upload Resume
                </h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tursted company */}
      <div className="flex justify-between items-center p-10 space-y-4">
        <div>
          <h1 className="font-bold text-[#282b4a] text-[51.87px]">
            We are Trusted by Popular
          </h1>
          <h6 className="font-bold text-[#ff4153] text-[41.23px]">
            800+ Company
          </h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            <br />
            eiusmod labore tempor incididunt ut labore et dolore magna aliqua.{" "}
            <br />
            Quis ipsum suspendisse ultrices gravida. Risus commodo viverra{" "}
            <br />
            maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,{" "}
            <br />
            consectetur adipiscing elit, sed do eiusmod tempor suspendisse{" "}
            <br />
            ultrices incididunt ut labore et dolor magna aliqua. accumsan tempor{" "}
            <br />
            Quis ipsum Quis ipsum labore suspendisse ultrices gravida . sed do{" "}
            <br />
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <Image
              src={"/brand1.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
          <div>
            <Image
              src={"/brand2.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
          <div>
            <Image
              src={"/brand3.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
          <div>
            <Image
              src={"/brand4.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
          <div>
            <Image
              src={"/brand5.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
          <div>
            <Image
              src={"/brand6.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
          <div>
            <Image
              src={"/brand7.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
          <div>
            <Image
              src={"/brand8.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
          <div>
            <Image
              src={"/brand9.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
          <div>
            <Image
              src={"/brand10.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
          <div>
            <Image
              src={"/brand11.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
          <div>
            <Image
              src={"/brand12.png"}
              height={100}
              width={100}
              alt="brand image is loadig"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
