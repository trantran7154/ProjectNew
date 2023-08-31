import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: 'https://down-vn.img.susercontent.com/file/sg-11134201-7qvdv-lgjglhxblyes67'
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    slug: {
        type: String,
        slug: 'name'
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', Schema)