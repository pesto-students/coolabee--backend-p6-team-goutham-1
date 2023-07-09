import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        default: '',
    },

    subCategory : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "SubCategory",
    },
    status:{
		type:Boolean,
		default:true
	},

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Category', CategorySchema);

