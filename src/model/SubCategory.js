import mongoose from 'mongoose';

const SubCategory = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        default: '',
    },


    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('SubCategory', SubCategory);

