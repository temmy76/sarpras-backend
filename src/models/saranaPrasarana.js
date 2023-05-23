
import mongoose from "mongoose";

const saranaPrasarana = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    kategori: {
        required: true,
        type: String,
        enum: ['BANGUNAN', 'LAHAN', 'PERALATAN'],
    },
    status: {
        type: String,
        enum : ['PERBAIKAN', 'BAIK', 'RUSAK', 'INSPEKSI'],
        default: 'BAIK',
    },
    detail: {
        jumlah: {
            type: Number,
        },
        luas: {
            panjang: Number,
            lebar: Number,
        },
    },
    // terakhir_diperiksa: {
    //     required: true,
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "hasilinspeksis",
    // },
    terakhir_diperiksa: Date
});

saranaPrasarana.methods.toUpperCase = function () {
    this.kategori = this.kategori.toUpperCase();
    this.status = this.status.toUpperCase();
};

export default mongoose.model("saranaPrasarana", saranaPrasarana);

