import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white">
      <footer className="relative">
        <svg viewBox="0 0 1440 250" className="w-full">
          <path fill="#fff" fillOpacity="1" d="M0,96L120,122.7C240,149,480,203,720,202.7C960,203,1200,149,1320,122.7L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
        </svg>
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <a href="home.html">
                <img src="jobLogo-footer.png" alt="Logo" title="Logo" className="mb-4" />
              </a>
              <p className="text-gray-400 w-4/5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore accumsan lacus vel facilisis.
              </p>
            </div>
            <div className="col-span-1">
              <h5 className="text-lg font-semibold mb-4">Useful Links</h5>
              <ul className="space-y-2">
                <li><a href="about-us.html" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="contact-us.html" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="javascript:void(0);" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="javascript:void(0);" className="text-gray-400 hover:text-white">News &amp; Blog</a></li>
                <li><a href="javascript:void(0);" className="text-gray-400 hover:text-white">Our features</a></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <p className="text-gray-400">456, tredy Road, New York, USA, MD 210093</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <p className="text-gray-400">hr@gmail.com</p>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-2" />
                  <p className="text-gray-400">+61-5869259325</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <h5 className="text-lg font-semibold mb-4">Get In Touch</h5>
              <form className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <input
                    type="email"
                    name="email"
                    className="form-input w-full px-4 py-2 rounded-l-md text-gray-800"
                    placeholder="E-mail Address"
                    required
                  />
                 
                </div>
              </form>
              <ul className="flex space-x-4 mt-4">
                <li><a href="javascript:void(0);" className="text-gray-400 hover:text-white"><FaFacebook /></a></li>
                <li><a href="javascript:void(0);" className="text-gray-400 hover:text-white"><FaTwitter /></a></li>
                <li><a href="javascript:void(0);" className="text-gray-400 hover:text-white"><FaInstagram /></a></li>
                <li><a href="javascript:void(0);" className="text-gray-400 hover:text-white"><FaYoutube /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
