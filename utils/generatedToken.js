import jwt from "jsonwebtoken";

export const generateTokenAndSetToken = (res, user_id) =>{
    const token = jwt.sign({user_id}, process.env.jwt_secret, {
        expiresIn: "7d"
    })
    res.cookie( "token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 60 * 60 * 1000,
        path: 'http://localhost:5173/'
    });
    return token
}