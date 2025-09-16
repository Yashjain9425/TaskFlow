import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// Debug: Log the JWT secret being used
console.log('Auth Middleware - JWT_SECRET:', JWT_SECRET ? 'SET' : 'NOT SET');

export default async function authMiddleware(req, res, next){
    //GREAB THE BEARER TOKEN FROM AUTHORIZATION HEADER

    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Unauthorized, token missing" });
    }

    const token = authHeader.split(' ')[1];

    // VERIFY & ATTACH USER OBJECT

    try{
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.id).select('-password');

        if(!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    }
    catch(err) {
        console.log("JWT verification failed", err);
        return res.status(401).json({ success: false, message: "Token invalid or expired" });
    }
}