import suratPerintahModel from "../models/suratPerintah.js";
import saranaPrasaranaModel from "../models/saranaPrasarana.js";
import userModel from "../models/user.js";
import response from "../helper/response.js";
import jwt from "jsonwebtoken";

export default {
    checkJabatanTU: async (req, res, next) => {
        const user_id = jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET).id;
        const user = await userModel.findById(user_id);

        if (user.jabatan === 'WADIR2' || user.jabatan === 'TEKNISI') {
            response.sendForbidden(res, "Anda tidak memiliki akses sebagai TU");
            return;
        }
        next();
    },

    checkJabatanWD2: async (req, res, next) => {
        const user_id = jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET).id;
        const user = await userModel.findById(user_id);

        if (user.jabatan === 'SUB BAG TU' || user.jabatan === 'TEKNISI') {
            response.sendForbidden(res, "Anda tidak memiliki akses sebagai Wakil Direktur II");
            return;
        }
        next();
    },

    checkJabatanTeknisi: async (req, res, next) => {
        const user_id = jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET).id;
        const user = await userModel.findById(user_id);

        if (user.jabatan === 'WADIR2') {
            response.sendForbidden(res, "Anda tidak memiliki akses sebagai Teknisi");
            return;
        }
        next();
    },

    checkTeknisiNotInTask: async (req, res, next) => {
        const suratPerintah = await suratPerintahModel.find({ petugas_id: req.body.surat.petugas_id });
        let founded = false;
        suratPerintah.forEach((surat) => {
            if (surat.status === 'DITUGASKAN') {
                founded = true;
                response.sendUnprocessableEntity(res, "Teknisi sedang dalam tugas");
            }
        });
        if (founded) {
            return;
        }
        next();
    },

    checkSarprasNotInTask: async (req, res, next) => {
        const { items } = req.body.surat;

        for (let index = 0; index < items.length; index++) {
            let sarana = items[index];
            let saranaPrasarana = await saranaPrasaranaModel.findById(sarana);

            if (saranaPrasarana.status === 'PERBAIKAN' || saranaPrasarana.status === 'INSPEKSI') {
                response.sendUnprocessableEntity(res, "Sarana Prasarana sedang dalam perbaikan atau inspeksi");
                return;
            }
        }
        next();
    }

}