import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // <-- import
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


const allowedOrigins = [
  "http://localhost:5173",     
  "https://civicone.netlify.app/" 
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// Routes
app.use("/api/auth", authRoutes);      // <-- register auth routes
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

// Serve uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
