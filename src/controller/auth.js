import jwt from "jsonwebtoken";
import response from "../helper/response.js";
import userModel from "../models/user.js";
import { config } from "dotenv";
config();

const privateKey = process.env.JWT_SECRET;
const tokenLife = parseInt(process.env.JWT_TOKEN_LIFE);

export default {
    authenticate: async (req, res) => {
        
        const user = await userModel.findOne({ username: req.body.username })
        if (!user) {
            response.sendUnauthorized(res, "Authentication failed. User not found.");
        } else if (user) {
            user.verifyPassword(req.body.password, (err, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign(user.getTokenData(), privateKey, {
                        expiresIn: tokenLife
                    });

                    res.json({
                        succes: true,
                        message: 'Token created',
                        token: token,
                    });
                } else {
                    response.sendUnauthorized(res, "Authentication failed.");
                }
            });
        }

    },
    verifyToken: async (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, privateKey, async (err, decoded) => {
                console.log(tokenLife);
                if (err) {
                    return response.sendUnauthorized(res, "Failed to authenticate token, token expired.");
                } else {
                    try {
                        const user = await userModel.findById(decoded.id);
                        if (!user) {
                            response.sendUnauthorized(res, "Authentication failed. User not found.");
                        }
                        req.currentUser = user;
                        req.decoded = decoded;
                    } catch (error) {
                        res.json(error.message);

                    }
                    next();
                }
            });
        } else {
            response.sendUnauthorized(res, "No token provided.");
        }
    },
}