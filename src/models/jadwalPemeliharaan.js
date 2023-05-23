
import mongoose from "mongoose";

const jadwalPemeliharaan = new mongoose.Schema({
    surat_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "suratperintahs"
    },
    prioritas: {
        required: true,
        type: String,
        enum: ['RINGAN', 'SEDANG', 'BERAT', 'KRITIS'],
    },
    tanggal: {
        type: Date,
        required: true,
    },
    catatan: String,
});

jadwalPemeliharaan.methods.toDate = function () {
    this.tanggal = new Date(this.tanggal);
};

jadwalPemeliharaan.methods.toUpperCase = function () {
    this.prioritas = this.prioritas.toUpperCase();
};

export default mongoose.model("jadwalPemeliharaan", jadwalPemeliharaan);




