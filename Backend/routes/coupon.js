const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const {redisClient} = require('../redisClient') // Use Redis client from server.js

// Helper function to get user's IP
const getUserIP = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

router.get('/claim-coupon',async(req,res)=>{
    try {
        const userIP = getUserIP(req);//get user IP
        const cooldownTime = 3600; // 1 hour in seconds
        
        // Check if the user already claimed within cooldown
        const lastClaimTime = await redisClient.get(userIP);

        if (lastClaimTime) {
            // Calculate remaining time
            const timeElapsed = Math.floor((Date.now() - parseInt(lastClaimTime)) / 1000); // in seconds
            const timeRemaining = cooldownTime - timeElapsed;

            if (timeRemaining > 0) {
                return res.status(429).json({
                    success: false,
                    message: `Please wait ${Math.ceil(timeRemaining / 60)} minutes before claiming another coupon.`,
                    cooldownTimeRemaining: timeRemaining, // Send remaining cooldown in seconds
                });
            }
        }

        // Get the next available coupon
        const coupon = await Coupon.findOneAndUpdate(
            { assigned: false },
            { assigned: true },
            { new: true }
        );

        if (!coupon) {
            return res.status(400).json({
                success: false,
                message: "No more coupons available!",
            });
        }

        // Store user claim timestamp in Redis with expiry
        await redisClient.setEx(userIP, cooldownTime, Date.now().toString());

        res.cookie('couponClaimed', 'true', { maxAge: cooldownTime*1000, httpOnly: true });

        res.json({
            success: true,
            message: `Coupon ${coupon.code} claimed successfully!`,
            couponCode: coupon.code,
            cooldownTimeRemaining: cooldownTime, // Send cooldown time in seconds
        });

    } catch (error) {
        console.error('Error in /claim-coupon:', error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
});

module.exports = router;