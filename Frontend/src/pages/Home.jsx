import HomePageOverview from "./HomePageOverview";

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-center py-4 rounded-lg shadow-lg mb-6">
                <h1 className="text-2xl font-bold">Welcome to Social Media App</h1>
                <p className="mt-2 text-lg">Connect, Share, and Explore with Friends!</p>
            </div>

            {/* Posts Overview Component */}
            <HomePageOverview />
        </div>
    );
}
