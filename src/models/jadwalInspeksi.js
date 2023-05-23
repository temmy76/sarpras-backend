import mongoose from "mongoose";

const jadwalInspeksi = new mongoose.Schema({
    surat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "suratperintahs"
    },
    tanggal: {
        required: true,
        type: Date,
    },
});

jadwalInspeksi.methods.toDate = function () {
    this.tanggal = new Date(this.tanggal);
};

export default mongoose.model("jadwalInspeksi", jadwalInspeksi);




