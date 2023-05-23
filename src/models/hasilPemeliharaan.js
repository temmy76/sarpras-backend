import mongoose from "mongoose";

const hasilPemeliharaan = new mongoose.Schema({
	jadwal_id: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: "jadwalpemeliharaans",
	},
	detail: [
		{
			vendor: {
				type: String,
				required: true,
			},
			penanganan: {
				type: String,
				required: true,
			},
			tanggal_selesai: {
				type: Date,
				required: true,
			},
			biaya: {
				type: Number,
				required: true,
			},
			bukti: {
				type: String,
				required: true,
			},
		},
	],
	catatan: String,
});




export default mongoose.model("hasilPemeliharaan", hasilPemeliharaan);
