export const CartData = [
    {
        _id: 1,
        name: "Premium Tomato Seeds",
        description: "Experience the joy of growing your own juicy, vine-ripened tomatoes with our Premium Tomato Seeds. These high-quality seeds are carefully selected to ensure a bountiful harvest of delicious tomatoes. Whether you're a seasoned gardener or just starting, these seeds will help you create a thriving tomato garden.",
        price: 5.99,
        quantity: 12,
        category: "Seeds and Seedlings",
        rating: 4.5,
        farmer: {
          id: 1,
          name: "John Doe",
          location: "Farmville, USA",
          image: require("../assets/farmer/1.jpg"),
        },
        image: require("../assets/new/tomato_seed.jpg"),
      },
      {
        _id: 2,
        name: "Organic Fruit Fertilizer",
        description: "Boost the health and productivity of your fruit trees and plants with our Organic Fruit Fertilizer. Our nutrient-rich organic formula enhances soil fertility, resulting in tastier and healthier fruits. It's time to transform your orchard into a thriving, organic paradise.",
        price: 12.49,
        quantity: 50,
        category: "Fertilizers and Soil Amendments",
        rating: 4.8,
        farmer: {
          id: 2,
          name: "Alice Green",
          location: "Green Farms, Canada",
          image: require("../assets/farmer/1.jpg"),
        },
        image: require("../assets/new/organic-fertilizer.jpg"),
      },
]