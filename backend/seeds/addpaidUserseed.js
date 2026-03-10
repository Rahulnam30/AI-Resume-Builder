import Payment from "../Models/payment.js";
import Subscription from "../Models/subscription.js";
import User from "../Models/User.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

/* You can test the paid user functioinality is working properly or not  by changing the following field mentioned below:

      a) email (Must change , should be unique and not prevouisly in db)
      b) plan (if need to check different plan)
      c) amount( Pro : 499 , Liftime : 3215 --> predetermined values)
*/

dotenv.config({ path: "../.env" });

const addNewPaidUser = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("MongoDB connected");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const username = "krishnadek201";
    const email = "krishna3003@gmail.com";
    const password = "Password@123";
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create(
      [
        {
          username,
          email,
          password: hashedPass,
          isAdmin: false,
          isActive: true,
          plan: "Pro", // match schema default case ["Pro","Lifetime"]
        },
      ],
      { session }
    );

    const userId = newUser[0]._id;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

   //Subscription 
    const newSubscription = await Subscription.create(
      [
        {
          user: userId,
          plan: "Pro",
          status: "active",
          startDate,
          endDate,
        },
      ],
      { session }
    );

    const subscriptionId = newSubscription[0]._id;
   //Payment
    await Payment.create(
      [
        {
          user: userId,
          subscription: subscriptionId,
          amount: 499,
          currency: "INR",
          status: "success",
          paymentMethod: "razorpay",
          transactionId: "TXN_" + Date.now(),
        },
      ],
      { session }
    );

    await session.commitTransaction();
    console.log("✅ Paid user created successfully");
  } catch (error) {
    await session.abortTransaction();
    console.error("❌ Error:", error.message);
  } finally {
    session.endSession();
    mongoose.connection.close();
  }
};

addNewPaidUser();