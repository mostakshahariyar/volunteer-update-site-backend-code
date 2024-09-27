import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

export const verifyToken = (req, res, next ) =>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret);
        if(!decoded){
            throw new ApiError(401, "Unauthorized");
        }
        req.userId = decoded.user_id;
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}