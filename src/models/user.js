import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    jabatan: {
        type: String,
        enum: ['SUB BAG TU', 'TEKNISI', 'WADIR2'],
        default: 'TEKNISI',
    },
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);

        this.password = hash;
        next();
    });
});

userSchema.methods.getTokenData = function () {
    return {
        id: this.id,
        username: this.username
    }
};

userSchema.methods.verifyPassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

userSchema.methods.toUpperCase = function () {
    this.jabatan = this.jabatan.toUpperCase();
};


export default mongoose.model("user", userSchema);

