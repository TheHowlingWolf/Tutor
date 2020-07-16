const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    accId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    cardId: { //card payment
        type: String 
    },
    upiId:{ // for upi
        //vpa
        type: String
    },
    bankName: { // for netbanking
        type: String
    },
    walletName: { // for wallets
        type: String
    },
    method :{
        type: String,
        required: true
    },
    
    email: {  
      type: String,
      required: true,
      trim: true,
    },
    date:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("Payment", PaymentSchema);