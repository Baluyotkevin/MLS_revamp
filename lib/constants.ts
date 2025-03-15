export const plansMap = [
        {
            id: 'basic',
            name: 'Basic',
            description: 'Get started with LoveStory!',
            price: "10.00",
            items: ["3 Blog Posts", "3 Transcription"],
            paymentLink: "https://buy.stripe.com/test_9AQdTvgaya8y6lO3cc",
            priceId: process.env.NODE_ENV === 'development' ? 'price_1Qz3CVJonCI5zLzg5ic2JZFv' : "",
        },
        {
            id: 'pro',
            name: 'Pro',
            description: 'All Blog Posts!',
            price: "19.99",
            items: ["Unlimited Blog Posts", "Unlimited Transcription"],
            paymentLink: "https://buy.stripe.com/test_14kg1D9Ma3KafWodQR",
            priceId: process.env.NODE_ENV === 'development' ? 'price_1Qz3DpJonCI5zLzgtenF3ryH' : "",
        },
];