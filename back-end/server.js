import express from 'express';
import {router as userRouter} from './routes/userRoutes.js';
import { synchronizeDatabase } from './models/config.js';

const PORT = 8080;

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Bine ai venit!! Zuzele");  
})

app.use("/user", userRouter);

const startServer = async () => {
    try {
        await synchronizeDatabase();
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

startServer();