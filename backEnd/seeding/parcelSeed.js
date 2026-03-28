const DB_URI = "";

import mongoose from "mongoose";
import Parcel from "../models/parcel.model.js";

// This is the ID from your logs - ensure it matches your current logged-in user
const USER_ID = "694a66f73966fe4979f40e18";

const mockParcels = [
  {
    id: "PC-1021",
    address: "Dhaka, Bangladesh",
    status: "In Transit",
    payment: "Paid",
    amount: 1200,
  },
  {
    id: "PC-1022",
    address: "Chittagong",
    status: "Delivered",
    payment: "Paid",
    amount: 950,
  },
  {
    id: "PC-1023",
    address: "Sylhet",
    status: "Booked",
    payment: "Unpaid",
    amount: 1900,
  },
  {
    id: "PC-1024",
    address: "Banasree, Dhaka",
    status: "In Transit",
    payment: "Paid",
    amount: 1250,
  },
  {
    id: "PC-1025",
    address: "Hazaribag, Chittagong",
    status: "Delivered",
    payment: "Paid",
    amount: 9050,
  },
  {
    id: "PC-1026",
    address: "Sylhet",
    status: "Booked",
    payment: "Unpaid",
    amount: 1800,
  },
  {
    id: "PC-1027",
    address: "Banasree, Dhaka",
    status: "In Transit",
    payment: "Paid",
    amount: 1150,
  },
  {
    id: "PC-1028",
    address: "Hazaribag, Chittagong",
    status: "Delivered",
    payment: "Paid",
    amount: 9950,
  },
  {
    id: "PC-1029",
    address: "Sylhet",
    status: "Booked",
    payment: "Unpaid",
    amount: 1890,
  },
  {
    id: "PC-1030",
    address: "Mirpur, Dhaka",
    status: "In Transit",
    payment: "Paid",
    amount: 1450,
  },
  {
    id: "PC-1031",
    address: "Rangpur",
    status: "Delivered",
    payment: "Paid",
    amount: 8500,
  },
  {
    id: "PC-1032",
    address: "Khulna",
    status: "Booked",
    payment: "Unpaid",
    amount: 2100,
  },
  {
    id: "PC-1033",
    address: "Uttara, Dhaka",
    status: "In Transit",
    payment: "Paid",
    amount: 1550,
  },
  {
    id: "PC-1034",
    address: "Barisal",
    status: "Delivered",
    payment: "Paid",
    amount: 7800,
  },
];

const seedData = async () => {
  try {
    console.log(DB_URI);
    // 1. Connect to Database
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB... 🔌");

    // 2. Clear existing parcels (Optional - uncomment if you want a clean slate)
    // await Parcel.deleteMany({ customer: USER_ID });

    // 3. Map mock data to your Schema
    const formattedData = mockParcels.map((parcel) => ({
      trackingId: parcel.id,
      customer: USER_ID,
      pickupAddress: "Main Hub, Dhaka",
      deliveryAddress: parcel.address,
      parcelType: "medium",
      paymentType: parcel.payment === "Paid" ? "Prepaid" : "COD",
      codAmount: parcel.payment === "Unpaid" ? parcel.amount : 0,
      status: parcel.status, // Enums match: Booked, In Transit, Delivered
      deliveryContactName: "Test Receiver",
      deliveryContactNumber: "01700000000",
      location: { lat: 23.8103, lng: 90.4125 }, // Default Dhaka coords
    }));

    // 4. Insert into DB
    await Parcel.insertMany(formattedData);
    console.log(`Successfully seeded ${formattedData.length} parcels! ✅`);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data: ❌", error);
    process.exit(1);
  }
};

seedData();
