import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.ts";
import connectCloudinary from "./config/cloudinary.ts";
import userRouter from "./routes/userRoute.ts";
import productRouter from "./routes/productRoute.ts";

const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log('server started on port', port);
});