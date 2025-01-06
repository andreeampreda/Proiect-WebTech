import express from 'express';
import path from 'path';
import cors from 'cors';
import {router as userRouter} from './routes/userRoutes.js';
import {router as confRouter} from './routes/conferenceRoutes.js';
import {router as artRouter} from './routes/articolRoutes.js';
import {router as revRouter} from './routes/reviewRoutes.js'
import { synchronizeDatabase } from './models/config.js';

const PORT = 8080;

const app = express();
app.use(express.json());

// app.get("/",(req,res)=>{
//   res.send("Bine ai venit!! Zuzele");  
// })

// app.use("/", userRouter);
// app.use(express.static(path.join(process.cwd(), 'public')));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
//   });

app.use(cors());

app.use("/user",userRouter);
app.use("/conference",confRouter);
app.use("/article",artRouter);
app.use("/review",revRouter);

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