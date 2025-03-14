const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db')
const {redisClient} = require('./redisClient')
const CouponRoutes = require('./routes/coupon')


connectToDb();
const app = express();

app.use(cors({
    origin: [
        "http://localhost:5174", 
        "https://coupondistribution-frontend.onrender.com",
        "http://localhost:5173"
      ], // Allow only the frontend origin
    credentials: true // Allow cookies & authentication headers
}));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Coupon distribution API is running !")
});

//routes
app.use('/api',CouponRoutes);



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
