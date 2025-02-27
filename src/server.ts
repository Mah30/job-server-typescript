import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// configuracao de middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Job Tricker API is runnig! 🚀")
});


// Routes
/* app.use("/auth", authRouter) */
/* app.use("/api", router); */
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});


async function isAdminExists(params:string) {   
    const adminEmail = "admin@example.com";
    const adminPassword = "admin321";
}

const existingAdmin = await prisma.user.findFirst({
    where: {isAdmin: true},
});

/* if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);
    
} */













app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

