import userModel from "../models/user.js"
import response from "../helper/response.js"

export default {
    index: async (req, res) => {
        try {
            const user = await userModel.find();
            response.sendOK(res, user);
        } catch (error) {
            response.sendForbidden(res, error.message);
        }
    },
    create: async (req, res) => {
        const newUser = new userModel(req.body);
        newUser.toUpperCase();
        try {
            const savedUser = await newUser.save();
            response.sendCreated(res, savedUser);
        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
    }
}

