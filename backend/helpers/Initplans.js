
import mongoose from "mongoose";
import Plan from "./Models/Plan.js";
import dotenv from "dotenv";

dotenv.config();

const initializePlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("✅ MongoDB connected");

    // Check if plans already exist
    const existingPlans = await Plan.countDocuments();
    
    if (existingPlans > 0) {
      console.log(`⚠️  Plans already exist (${existingPlans} found). Skipping initialization.`);
      process.exit(0);
    }

    const defaultPlans = [
      {
        planId: 1,
        name: "Free",
        price: 0,
        active: true,
        description: "For testing & basic usage",
        features: [
          "1 Resume Template",
          "Limited AI Suggestions",
          "Watermark on Resume",
          "Community Support",
        ],
      },
      {
        planId: 2,
        name: "Pro",
        price: 299,
        active: true,
        description: "Best for students & professionals",
        features: [
          "Unlimited Templates",
          "Full AI Resume Writing",
          "No Watermark",
          "PDF & DOCX Export",
          "Priority Support",
        ],
      },
      {
        planId: 3,
        name: "Ultra Pro",
        price: 999,
        active: true,
        description: "One-time payment",
        features: [
          "All Pro Features",
          "Lifetime Access",
          "Priority Support",
          "Future Updates",
        ],
      },
    ];

    const createdPlans = await Plan.insertMany(defaultPlans);
    console.log(`✅ Successfully initialized ${createdPlans.length} plans:`);
    createdPlans.forEach(plan => {
      console.log(`   - ${plan.name}: ₹${plan.price}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing plans:", error);
    process.exit(1);
  }
};

initializePlans();