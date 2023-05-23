import saranaPrasaranaModel from "../models/saranaPrasarana.js";
import response from "../helper/response.js";

export default {
    getAllSaranaPrasarana: async (req, res) => {
        try {
            const saranaPrasarana = await saranaPrasaranaModel.find();
            response.sendOK(res, saranaPrasarana);
        } catch (error) {
            response.sendForbidden(res, error.message);
        }
    },
    createSaranaPrasarana: async (req, res) => {
        const body = {
            ...req.body,
        }
        const saranaPrasarana = new saranaPrasaranaModel(body);
        saranaPrasarana.toUpperCase();
        try {
            const savedSaranaPrasarana = await saranaPrasarana.save();
            response.sendCreated(res, savedSaranaPrasarana);
        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
    }

}