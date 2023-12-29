
const SubscriptionBanner = () => {
    return (
        <div className="bg-blue-500 p-8 text-white text-center">
            <h2 className="text-3xl font-extrabold mb-4">Subscribe Now for Exclusive Content!</h2>
            <p className="text-lg mb-6">Unlock premium articles, insights, and more by subscribing to NewsIn.</p>
            <button className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 hover:text-blue-700 focus:outline-none">
                Subscribe Now
            </button>
        </div>
    );
};

export default SubscriptionBanner;