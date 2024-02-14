const forumData = [
  {
    id: "1",
    image:
      "https://images.pexels.com/photos/1482101/pexels-photo-1482101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Best Practices for Organic Farming",
    author: {
      userId: "user1",
      username: "Farmer123",
      avatar: require("../assets/farmer/1.jpg"),
    },
    date: "2023-11-15T10:30:00.000Z",
    content:
      "I'm interested in hearing about the best practices for organic farming. Share your experiences and tips!",
    likes: 20,
    language: "English",
    comments: [
      {
        id: "101",
        author: {
          userId: "user2",
          username: "GreenThumb22",
          avatar: require("../assets/farmer/1.jpg"),
        },
        date: "2023-11-15T11:15:00.000Z",
        content:
          "Using natural compost has significantly improved the soil quality on my farm.",
      },
      // Add more comments...
    ],
  },
  {
    id: "2",
    image:
      "https://images.pexels.com/photos/708798/pexels-photo-708798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Effective Pest Control Methods for Organic Farms",
    author: {
      userId: "user3",
      username: "BugBuster",
      avatar: require("../assets/farmer/1.jpg"),
    },
    date: "2023-11-17T09:45:00.000Z",
    content:
      "Let's discuss the most effective pest control methods for organic farming. Share your insights and experiences!",
    likes: 15,
    language: "English",
    comments: [
      {
        id: "102",
        author: {
          userId: "user4",
          username: "OrganicHarmony",
          avatar: require("../assets/farmer/1.jpg"),
        },
        date: "2023-11-17T10:20:00.000Z",
        content:
          "Introducing beneficial insects like ladybugs has worked wonders in keeping pests at bay on my farm.",
      },
      // Add more comments...
    ],
  },
  {
    id: "3",
    image:
      "https://images.pexels.com/photos/916406/pexels-photo-916406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "कृषि उत्पादनमा जल व्यवस्थापनका उत्कृष्ट तथ्यहरू",
    author: {
      userId: "user5",
      username: "WaterWise",
      avatar: require("../assets/farmer/1.jpg"),
    },
    date: "2023-11-20T11:00:00.000Z",
    content:
      "आफ्नो खेतमा पानी व्यवस्थापनमा जनता बाट शिक्षा ल्याउनुहोस्। तपाईंको अनुभवहरू र सुझावहरू साझा गर्नुहोस्!",
    likes: 12,
    language: "Nepali",
    comments: [
      {
        id: "103",
        author: {
          userId: "user6",
          username: "प्राकृतिक_किसान",
          avatar: require("../assets/farmer/1.jpg"),
        },
        date: "2023-11-20T12:30:00.000Z",
        content: "मेरो खेतमा बालुवा बाट आउने पानीले उत्तम परिणाम दिएको छ।",
      },
      // Add more comments...
    ],
  },
  {
    id: "4",
    image:
      "https://images.pexels.com/photos/235731/pexels-photo-235731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Crop Rotation Strategies for Sustainable Farming",
    author: {
      userId: "user7",
      username: "CropCrafter",
      avatar: require("../assets/farmer/1.jpg"),
    },
    date: "2023-11-22T14:15:00.000Z",
    content:
      "Let's explore effective crop rotation strategies for sustainable farming. Share your knowledge and tips!",
    likes: 18,
    language: "English",
    comments: [
      {
        id: "104",
        author: {
          userId: "user8",
          username: "SustainableSower",
          avatar: require("../assets/farmer/1.jpg"),
        },
        date: "2023-11-22T15:00:00.000Z",
        content:
          "Including legumes in my crop rotation has improved soil fertility and reduced the need for external fertilizers.",
      },
      // Add more comments...
    ],
  },
  {
    id: "5",
    image:
      "https://images.pexels.com/photos/3066025/pexels-photo-3066025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "जैविक खेतीका लागि उत्कृष्ट बीउपत्ति तथ्यहरू",
    author: {
      userId: "user9",
      username: "SeedSaver",
      avatar: require("../assets/farmer/1.jpg"),
    },
    date: "2023-11-25T08:45:00.000Z",
    content:
      "आफ्नो खेतमा जैविक बीउपत्ति गर्न कस्तो सफलतापूर्वक गर्नुहुन्छ भन्नुहोस्। तपाईंको अनुभव र सुझावहरू साझा गर्नुहोस्!",
    likes: 14,
    language: "Nepali",
    comments: [
      {
        id: "105",
        author: {
          userId: "user10",
          username: "जैविक_किसान",
          avatar: require("../assets/farmer/1.jpg"),
        },
        date: "2023-11-25T10:30:00.000Z",
        content:
          "खाद्यान्न र गाईको गोबरले बनाएको उर्वरकले मेरो खेतलाई सजीव बनाएको छ।",
      },
      // Add more comments...
    ],
  },
  {
    id: "6",
    image:
      "https://images.pexels.com/photos/1615785/pexels-photo-1615785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "The Role of Cover Crops in Organic Agriculture",
    author: {
      userId: "user11",
      username: "CoverCraze",
      avatar: require("../assets/farmer/1.jpg"),
    },
    date: "2023-11-28T13:00:00.000Z",
    content:
      "Discussing the importance of cover crops in organic agriculture. Share your experiences and recommendations!",
    likes: 22,
    language: "English",
    comments: [
      {
        id: "106",
        author: {
          userId: "user12",
          username: "OrganicOasis",
          avatar: require("../assets/farmer/1.jpg"),
        },
        date: "2023-11-28T14:45:00.000Z",
        content:
          "Cover crops have not only prevented soil erosion on my farm but also enhanced biodiversity.",
      },
    ],
  },
  {
    id: "7",
    image:
      "https://images.pexels.com/photos/2804327/pexels-photo-2804327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "जैविक खेतीका लागि उपयुक्त जीवाणु नियन्त्रण विधिहरू",
    author: {
      userId: "user13",
      username: "MicrobeMaster",
      avatar: require("../assets/farmer/1.jpg"),
    },
    date: "2023-12-01T09:30:00.000Z",
    content:
      "आफ्नो खेतमा जीवाणु नियन्त्रणमा सफल विधिहरू साझा गरौं। तपाईंको अनुभव र सुझावहरू सुन्न चाहन्छौं!",
    likes: 16,
    language: "Nepali",
    comments: [
      {
        id: "107",
        author: {
          userId: "user14",
          username: "बायोडाइवर्सिटी_किसान",
          avatar: require("../assets/farmer/1.jpg"),
        },
        date: "2023-12-01T10:15:00.000Z",
        content:
          "प्राकृतिक रूपमा पाइने जीवाणुहरूले मेरो खेतलाई नियन्त्रण गरेका छन् र खेतीको रूपमा सहारा पनि पुर्याउँछन्।",
      },
      // Add more comments...
    ],
  },
  {
    id: "8",
    image:
      "https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Maximizing Nutrient Absorption in Organic Crops",
    author: {
      userId: "user15",
      username: "NutrientNinja",
      avatar: require("../assets/farmer/1.jpg"),
    },
    date: "2023-12-04T12:45:00.000Z",
    content:
      "Let's share strategies for maximizing nutrient absorption in organic crops. Your insights and tips are welcome!",
    likes: 25,
    language: "English",
    comments: [
      {
        id: "108",
        author: {
          userId: "user16",
          username: "OrganicOptimist",
          avatar: require("../assets/farmer/1.jpg"),
        },
        date: "2023-12-04T13:30:00.000Z",
        content:
          "Adding compost tea as a foliar spray has significantly enhanced nutrient uptake in my crops.",
      },
      // Add more comments...
    ],
  },
  {
    id: "9",
    image:
      "https://images.pexels.com/photos/50707/cocoa-man-colombia-peasant-50707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "जैविक खेतीका लागि प्रभावी बीज चयन",
    author: {
      userId: "user17",
      username: "SeedSelector",
      avatar: require("../assets/farmer/1.jpg"),
    },
    date: "2023-12-07T11:15:00.000Z",
    content:
      "जैविक खेतीका लागि प्रभावी बीज चयनका लागि तथ्यहरू साझा गरौं। तपाईंको अनुभवहरू र सुझावहरू हामीसँग साझा गरौं!",
    likes: 18,
    language: "Nepali",
    comments: [
      {
        id: "109",
        author: {
          userId: "user18",
          username: "बायो_बीज_किसान",
          avatar: require("../assets/farmer/1.jpg"),
        },
        date: "2023-12-07T12:00:00.000Z",
        content:
          "पर्वपर्वमा सही समयमा पर्वपर्वका लागि बीज चयन गरेकोले मेरो उत्पादन बढिएको छ।",
      },
      // Add more comments...
    ],
  },
  {
    id: "10",
    image:
      "https://images.pexels.com/photos/1733192/pexels-photo-1733192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Optimizing Crop Yield with Companion Planting",
    author: {
      userId: "user19",
      username: "CompanionCultivator",
      avatar: require("../assets/farmer/1.jpg"),
    },
    date: "2023-12-10T10:00:00.000Z",
    content:
      "Discussing the art of companion planting for optimizing crop yield. Share your favorite plant combinations and success stories!",
    likes: 20,
    language: "English",
    comments: [
      {
        id: "110",
        author: {
          userId: "user20",
          username: "HarmonyHarvester",
          avatar: require("../assets/farmer/1.jpg"),
        },
        date: "2023-12-10T10:45:00.000Z",
        content:
          "Planting basil with tomatoes has not only improved flavor but also deterred pests in my garden.",
      },
      // Add more comments...
    ],
  },
  {
    id: "11",
    image:
      "https://images.pexels.com/photos/3019836/pexels-photo-3019836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "आफ्नो खेतमा जैविक उर्वरक बनाउँदा ध्यान दिनुपर्छ",
    author: {
      userId: "user21",
      username: "OrganicChemist",
      avatar: require("../assets/farmer/1.jpg"),
    },
    date: "2023-12-13T13:30:00.000Z",
    content:
      "जैविक उर्वरक बनाउँदा ध्यान दिने तथ्यहरू साझा गरौं। तपाईंको अनुभव र सुझावहरूले अरूलाई पनि मद्दत पुर्याउँछ!",
    likes: 17,
    language: "Nepali",
    comments: [
      {
        id: "111",
        author: {
          userId: "user22",
          username: "उर्वरक_निर्माता",
          avatar: require("../assets/farmer/1.jpg"),
        },
        date: "2023-12-13T14:15:00.000Z",
        content:
          "खाद्यान्न र बायोडाइवर्सिटी बढाउनका लागि आफ्नो खेतमा खोला कम्पोस्ट बनाउँदा धेरै फाइदा हुन्छ।",
      },
      // Add more comments like above
    ],
  },
];
export default forumData;
