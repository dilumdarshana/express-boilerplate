import mongoose from 'mongoose';
import { hashSync, compare, genSaltSync } from 'bcrypt-nodejs';

const { Schema } = mongoose;

const AdministratorSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
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

AdministratorSchema.pre('save', async function (next) {
    const user = this;
    const salt = genSaltSync(10);
    const hash = await hashSync(user.password, salt);

    user.password = hash;
    next();
});

AdministratorSchema.statics.comparePassword = function (password, passwordDB) {
    return new Promise((resolve, reject) => {
        compare(password, passwordDB, (error, matches) => {
            if (error) {
                reject({
                    status: 400,
                    error,
                });
            } else {
                resolve({
                    status: 200,
                    result: matches,
                });
            }
        });
    });
};

export default mongoose.model('Administrator', AdministratorSchema);
