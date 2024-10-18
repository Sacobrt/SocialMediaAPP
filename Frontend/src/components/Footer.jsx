export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-6 border-t-2 border-gray-700">
            <div className="container mx-auto px-4 flex flex-col items-center">
                {/* Logo Section */}
                <div className="mb-4">
                    <a href="/">
                        <img alt="Social Media Logo" src="/logo.png" className="h-10 w-auto hover:scale-110 transition-all duration-1000 ease-in-out" />
                    </a>
                </div>

                {/* Text Section */}
                <p className="text-xs text-center mb-4">Connecting people, empowering voices, and shaping the future of social.</p>

                <hr className="border-gray-700 w-full mb-4" />

                {/* Copyright Section */}
                <p className="text-xs text-center">&copy; {new Date().getFullYear()} Social Media App. All rights reserved.</p>
            </div>
        </footer>
    );
}
