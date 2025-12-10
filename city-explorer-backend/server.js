import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// ----------------- Middleware to check API key -----------------
function checkApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== "12345ABCDEF") {
    return res.status(401).json({ error: "Unauthorized: Invalid API key" });
  }
  next();
}

// ----------------- Save city search -----------------
app.post("/save", checkApiKey, async (req, res) => {
  try {
    const db = client.db(); // default DB from URI
    const result = await db.collection("cities").insertOne(req.body);
    res.json({ message: "Data saved successfully", id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// ----------------- Get search history -----------------
app.get("/history", async (req, res) => {
  try {
    const db = client.db();
    const history = await db.collection("cities").find({}).sort({ _id: -1 }).toArray();
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// ----------------- Root -----------------
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ----------------- Start server -----------------
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
