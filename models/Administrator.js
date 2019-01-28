import mongoose from 'mongoose';

const { Schema } = mongoose;

const AdministratorSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password_hash: {
        type: String,
        default: null,
    },
    active: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'administrator' });

export default mongoose.model('Administrator', AdministratorSchema);
