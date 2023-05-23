import mongoose from "mongoose";

const hasilInspeksi = new mongoose.Schema({
    jadwal_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "jadwalinspeksis"
    },
    detail: [{
        deskripsi: String,
        kerusakan: {
            type: String,
            enum: ['RINGAN', 'SEDANG', 'BERAT', 'TIDAK ADA'],
            default: 'TIDAK ADA',
        },
        bukti: String,
    }],
    status: {
        type: String,
        enum: ['TERVERIFIKASI', 'BELUM TERVERIFIKASI'],
        default: 'BELUM TERVERIFIKASI',
    },
});

hasilInspeksi.methods.toUpperCase = function () {
    this.status = this.status.toUpperCase();
    this.detail.forEach((item) => {
        item.kerusakan = item.kerusakan.toUpperCase();
    }); 
};

export default mongoose.model("hasilInspeksi", hasilInspeksi);




