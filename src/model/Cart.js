import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    products : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Products",
    },
    status:{
		type:Boolean,
		default:true
	},

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Cart', CartSchema);