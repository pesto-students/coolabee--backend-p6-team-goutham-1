import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },

    amount: {
        type: Number,
        required: true,
        default: 0
    },

    discount: {
        type: Number,
        required: true,
        default: 0
    },

    product: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
    },

    status: {
        type: String,
        required: true,
        default: null,
    },

    completedAt: {
        type: Date,
        required: false,
        default: null,
    },

    additionalNotes: {
        type: String,
        required: false,
        default: null,
    },

    // 0 for cod and 1 for online payment
    onlinePayment: {
        type: Number,
        required: true,
    },

    paymentTimeStamp: {
        type: Date,
        required: false,
    },

    razorpay_signature: {
        type: String,
        required: false
    },

    razorpay_payment_id: {
        type: String,
        required: false
    },

    razorpay_order_id: {
        type: String,
        required: false
    },
    status:{
		type:Boolean,
		default:true
	},

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', OrderSchema);

