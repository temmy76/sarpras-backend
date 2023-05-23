import mongoose from "mongoose";
import userModel from "./user.js";

const suratPerintah = new mongoose.Schema({
    petugas_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    jadwal_id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "refJadwal",
        required: true,
    },
    refJadwal: {
        type: String,
        enum: ['jadwalinspeksis', 'jadwalpemeliharaans'],
    },
    jenis: {
        required: true,
        type: String,
        enum: ['INSPEKSI', 'PEMELIHARAAN']
    },
    items: [{
        // no_item: Number,
        // saranaPrasarana_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "saranaprasaranas",
        // }
    }],
    status: {
        type: String,
        enum: ['MENUNGGU', 'DIBATALKAN', 'DITUGASKAN', 'SELESAI'],
        default: 'MENUNGGU',
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },
    additionalInfo: {
        type: String,
        default: "Tidak Ada",
    },
});

suratPerintah.methods.approveSuratPerintah = async function (status) {
    const user = await userModel.findById(this.approvedBy)
    if (user.jabatan !== 'WADIR2') {
        this.approvalBy = null;
        return 403;
    }

    this.status = status;
    return 200;
};

suratPerintah.methods.toUpperCase = function () {
    this.jenis = this.jenis.toUpperCase();
    this.status = this.status.toUpperCase();
};


export default mongoose.model("suratPerintah", suratPerintah);

