import mongoose from "mongoose";

const hasilInspeksi = new mongoose.Schema({
    jadwal_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "jadwalinspeksis"
    },
    detail: [{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "saranaprasaranas",
    }],
    status: {
        type: String,
        enum: ['TERVERIFIKASI', 'BELUM TERVERIFIKASI'],
        default: 'BELUM TERVERIFIKASI',
    },
});

hasilInspeksi.methods.toUpperCase = function () {
    this.status = this.status.toUpperCase();
};

export default mongoose.model("hasilInspeksi", hasilInspeksi);




