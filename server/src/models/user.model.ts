import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    isLogin: {
        type: Boolean,
        default: false
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: ''
    },
    logOutAt: {
        type: Date, require: new Date(Date.now())
    },
    loginAt: {
        type: Date, require: new Date(Date.now())
    },
    token: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
}, {
    timestamps: true
});

export default mongoose.model('User', Schema)