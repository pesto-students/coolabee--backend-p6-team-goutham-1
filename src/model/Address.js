import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    phoneNumber: {
        type: Number,
        required: true,
        default: null,
    },

    address: {
        type: String,
        required: true,
        default: "",
    },

    pincode: {
        type: Number,
        required: true,
        default: 0,
    },

    state: {
        type: String,
        required: true,
        default: null,
    },

    city: {
        type: String,
        required: true,
        default: null,
    },

    landmark: {
        type: String,
        required: true,
        default: null,
    },

    label: {
        type: String,
        required: true,
        default: null,
    },

    // TODO check later
    gps: {
        type: String,
        required: false,
        default: null,
    },
    status:{
		type:Boolean,
		default:true
	},

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Address', AddressSchema);

