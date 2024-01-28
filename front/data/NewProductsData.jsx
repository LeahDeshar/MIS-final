const newProducts = [
  {
    _id: 1,
    name: "Premium Tomato Seeds",
    description:
      "Experience the joy of growing your own juicy, vine-ripened tomatoes with our Premium Tomato Seeds. These high-quality seeds are carefully selected to ensure a bountiful harvest of delicious tomatoes. Whether you're a seasoned gardener or just starting, these seeds will help you create a thriving tomato garden.",
    price: 5.99,
    quantity: 12,
    category: "Seeds and Seedlings",
    rating: 4.5,
    reviews: [
      {
        id: 1,
        user: {
          userId: "user4",
          username: "GardeningEnthusiast123",
          avatar: require("../assets/farmer/1.jpg"),
        },
        comment:
          "These seeds produced the best tomatoes I've ever grown! Highly recommend.",
        rating: 5,
      },
      {
        id: 2,
        user: {
          userId: "user5",
          username: "FirstTimeGardener",
          avatar: require("../assets/farmer/1.jpg"),
        },
        comment:
          "As a beginner, I found these seeds easy to grow. My tomatoes were delicious!",
        rating: 4,
      },
    ],
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
    description:
      "Boost the health and productivity of your fruit trees and plants with our Organic Fruit Fertilizer. Our nutrient-rich organic formula enhances soil fertility, resulting in tastier and healthier fruits. It's time to transform your orchard into a thriving, organic paradise.",
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
  {
    _id: 3,
    name: "Automatic Drip Irrigation Kit",
    description:
      "Simplify your gardening with our Automatic Drip Irrigation Kit. Say goodbye to manual watering and hello to efficient and precise irrigation. It's perfect for maintaining optimal soil moisture, and you'll conserve water while keeping your plants lush and thriving.",
    price: 89.99,
    quantity: 20,
    category: "Fertilizers and Soil Amendments",
    rating: 4.7,
    farmer: {
      id: 3,
      name: "Elena Rodriguez",
      location: "Aqua Farms, Spain",
      image: require("../assets/farmer/1.jpg"),
    },
    image: require("../assets/new/drip-irrigation.jpg"),
  },
  {
    _id: 4,
    name: "Professional Pruning Shears",
    description:
      "Achieve precise and clean cuts with our Professional Pruning Shears. Crafted for durability and sharpness, these shears are essential for shaping your garden and maintaining plant health. Trust in the quality of our shears for all your pruning needs.",
    price: 22.99,
    quantity: 30,
    category: "Gardening Tools",
    rating: 4.6,
    farmer: {
      id: 4,
      name: "Michael Smith",
      location: "Green Thumb Gardens, USA",
      image: require("../assets/farmer/1.jpg"),
    },
    image: require("../assets/new/pruning-shears.jpg"),
  },
  {
    _id: 5,
    name: "Fresh Farm Eggs",
    description:
      "Savor the taste of farm-fresh, organic eggs from our free-range chickens. Our commitment to the highest standards of animal welfare ensures that our eggs are of the highest quality. Enjoy wholesome and delicious eggs from our happy hens.",
    price: 3.99,
    quantity: 200,
    category: "Farm Produce",
    rating: 4.9,
    farmer: {
      id: 5,
      name: "Emma Brown",
      location: "Eggcellent Farms, UK",
      image: require("../assets/farmer/1.jpg"),
    },
    image: require("../assets/new/farm-eggs.jpg"),
  },
  {
    _id: 6,
    name: "Premium Garden Soil",
    description:
      "Cultivate a thriving garden with our Premium Garden Soil. This rich and fertile soil is the foundation of successful plant growth. It's carefully crafted to provide essential nutrients and optimal moisture retention. Unlock the full potential of your garden with our premium soil.",
    price: 19.99,
    quantity: 150,
    category: "Soil and Amendments",
    rating: 4.4,
    farmer: {
      id: 6,
      name: "Daniel Lee",
      location: "Nature's Bounty Farms, Canada",
      image: require("../assets/farmer/1.jpg"),
    },
    image: require("../assets/new/farm-eggs.jpg"),
  },
  {
    _id: 7,
    name: "Heavy-Duty Farm Gloves",
    description:
      "Protect your hands during farm work with our Heavy-Duty Farm Gloves. These durable gloves provide excellent hand protection while ensuring comfort and flexibility. They are designed to withstand the rigors of farm life and keep your hands safe.",
    price: 9.49,
    quantity: 100,
    category: "Farm Clothing and Safety Gear",
    rating: 4.3,
    farmer: {
      id: 7,
      name: "Olivia White",
      location: "Safe Farm Supplies, Australia",
      image: require("../assets/farmer/1.jpg"),
    },
    image: require("../assets/new/farm-eggs.jpg"),
  },
  {
    _id: 8,
    name: "Farmhouse Honey Jar",
    description:
      "Indulge in the pure and natural sweetness of our Farmhouse Honey. Harvested from local bees, this honey is a true culinary delight. It's perfect for drizzling on your morning toast, sweetening your tea, or adding a touch of nature's goodness to your recipes.",
    price: 7.99,
    quantity: 80,
    category: "Beekeeping Products",
    rating: 4.6,
    farmer: {
      id: 8,
      name: "Liam Johnson",
      location: "Golden Hive Farms, USA",
      image: require("../assets/farmer/1.jpg"),
    },
    image: require("../assets/new/farm-eggs.jpg"),
  },
  {
    _id: 9,
    name: "Stainless Steel Garden Fork",
    description:
      "Tackle soil cultivation and turning with ease using our sturdy Stainless Steel Garden Fork. This garden tool is built to last, featuring a rust-resistant stainless steel head and a comfortable handle. Whether you're preparing soil or aerating compost, this fork is up for the task.",
    price: 14.99,
    quantity: 40,
    category: "Gardening Tools",
    rating: 4.7,
    farmer: {
      id: 9,
      name: "Sophia Martinez",
      location: "Green Thumb Gardens, USA",
      image: require("../assets/farmer/1.jpg"),
    },
    image: require("../assets/new/farm-eggs.jpg"),
  },
  {
    _id: 10,
    name: "Organic Vegetable Seedlings",
    description:
      "Kickstart your garden with our Organic Vegetable Seedlings. These healthy and organic seedlings are nurtured with care and ready to be planted in your garden. They offer a head start to a vibrant and sustainable vegetable garden, providing you with homegrown produce in no time.",
    price: 8.99,
    quantity: 60,
    category: "Seeds and Seedlings",
    rating: 4.5,
    farmer: {
      id: 10,
      name: "Aiden Clark",
      location: "Organic Oasis, USA",
      image: require("../assets/farmer/1.jpg"),
    },
    image: require("../assets/new/farm-eggs.jpg"),
  },
];

export default newProducts;
