import { FaInstagram, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { MdFacebook } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-lg font-bold">Social Media</h2>
                        <p className="text-sm">We post so you don’t have to think!</p>
                    </div>

                    <div className="flex justify-center space-x-4 mb-6">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition duration-200"
                        >
                            <MdFacebook size={24} />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition duration-200"
                        >
                            <FaSquareXTwitter size={24} />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition duration-200"
                        >
                            <FaInstagram size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition duration-200"
                        >
                            <FaLinkedin size={24} />
                        </a>
                    </div>
                </div>
                <hr className="border-gray-700 mb-4" />
                <p className="text-center text-sm">&copy; {new Date().getFullYear()} Social Media App. All rights reserved.</p>
            </div>
        </footer>
    );
}
