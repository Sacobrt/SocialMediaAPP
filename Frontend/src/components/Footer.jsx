export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-lg font-bold text-center">Social Media</h2>
                        <p className="text-sm">We post so you don’t have to think!</p>
                    </div>
                    <div className="flex justify-center space-x-4 mb-6">
                        <a href="/">
                            <img alt="SocialMediaAPP" src="/logo.svg" className="h-10 w-auto rounded-lg" />
                        </a>
                    </div>
                </div>
                <hr className="border-gray-700 mb-4" />
                <p className="text-center text-sm">&copy; {new Date().getFullYear()} Social Media App. All rights reserved.</p>
            </div>
        </footer>
    );
}
