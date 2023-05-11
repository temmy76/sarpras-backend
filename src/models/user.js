import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    jabatan: String,
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

export default mongoose.model("user", userSchema);

