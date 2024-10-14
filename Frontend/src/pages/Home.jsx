import HomePageOverview from "./HomePageOverview";

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Welcome Banner */}
            <div className="text-gray-200 text-center py-4">
                <h1 className="text-2xl font-bold">Welcome to Social Hub</h1>
                <p className="text-sm text-gray-500">Connect, Share, and Explore with Friends!</p>
            </div>

            {/* Posts Overview Component */}
            <HomePageOverview />
        </div>
    );
}
