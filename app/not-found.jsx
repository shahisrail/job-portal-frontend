import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Image 
        src={"/vector.png"} 
        width={200} 
        height={200} 
        alt="vector image"
        className="mb-6"
      />
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Not Found</h2>
      <p className="text-gray-600 mb-6">Could not find the requested resource.</p>
      <div className="flex gap-4">
        <Link href="/">
          <button 
            className="px-6 py-3 bg-[#FF374A] text-white font-semibold rounded-lg hover:bg-[#e62e40] transition">
            Back to Home page
          </button>
        </Link>
      </div>
    </div>
  );
}
