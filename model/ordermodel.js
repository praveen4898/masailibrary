const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: 'UserModel', required: true },
    books: [{ type: ObjectId, ref: 'BookModel', required: true }],
    totalAmount: { type: Number, required: true }
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = {
    OrderModel
};
