import mongoose from 'mongoose';

const { Schema } = mongoose;

//mongoose.set('useCreateIndex', true);

const CustomersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    verification_hash: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, { collection: 'customers' });

/**
 * remove customer by given filter
 * @param filter
 * @returns {Promise}
 */
CustomersSchema.statics.removeCustomer = function (filter) {
    const _this = this;

    return new Promise((resolve, reject) => {
        _this.deleteOne(filter, (error, result) => {
            if (error) {
                reject({
                    status: 400,
                    error
                });
            } else {
                resolve({
                    status: 200,
                    result
                });
            }
        });
    });
};

export default mongoose.model('customers', CustomersSchema);
