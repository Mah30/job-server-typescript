import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db";
import bcrypt from "bcrypt";



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


// Função assíncrona para inicialização

async function init() {  
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123"; 
    try {
        const existingAdmin =  await prisma.user.findFirst({
            where: {isAdmin: true},
        });

        if (!existingAdmin) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(adminPassword, salt);

            await prisma.user.create({
                data: {
                  firstName: "Admin",
                  lastName: "User",
                  email: adminEmail,
                  passwordHash,
                  isAdmin: true,
                },
              });

              console.log(`✅ Admin user created: ${adminEmail}`);
        } else{
            console.log("✅ An admin user already exists.");
        }
    } catch (error) {
        console.error("Errot to initialize:", error);
        process.exit(1);
    }
}

init()


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port http://localhost:${PORT}`);
});

