import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.model.js";

// Function to validate the Razorpay payment signature
const validatePayment = (orderId, paymentId, signature) => {
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
};

export const createorder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = req.body;
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("Error creating Razorpay order");
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
};

export const ordervalidate = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Validate payment using the custom `validatePayment` function
    const isValid = validatePayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Payment validation failed",
      });
    }

    // Save payment details to the database
    const paymentDetails = new Payment({
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
      //status: "successful",
    });

    await paymentDetails.save();

    res.json({
      success: true,
      message: "Payment validated successfully",
    });
  } catch (err) {
    console.error("Error validating payment:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
