const path =require('path')
const Razorpay = require('razorpay')
const shortid = require('shortid')
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
    key_id: 'rzp_test_BauetMNElZ2N7N',
    key_secret: 'ByGo60MG3CPO4wW93fnZ3NqO',
  });
 exports.paymentProcess = async (req,res)=>{
   console.log(req.body,"uffff")
    const payment_capture = 1
    const amount = req.body.amt
    const currency ='INR'
  
    const options = {
      amount: amount*100,
      currency, 
      receipt: shortid.generate(), 
      payment_capture, 
      }
    try{
    const response = await razorpay.orders.create(options)
    // console.log("hi")
    // console.log(response)
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
      })
    }
    catch{err => console.log(err,"errerr")}
  }
  
 exports.paymentVerification = (req,res)=>{
    //do a validation
    const secret = '12345678'
      console.log(req.body)
    const crypto = require('crypto')
    console.log("hiii")
      const shasum = crypto.createHmac('sha256', secret)
      shasum.update(JSON.stringify(req.body))
      const digest = shasum.digest('hex')
  
    console.log(digest, req.headers['x-razorpay-signature']) //express lowercases all the headers by default
    
    if (digest === req.headers['x-razorpay-signature']) {
          console.log('request is legit')
          // process it
          const payment = new Payment;
          payment.accId = req.body.account_id;
          payment.paymentId = req.body.payload.payment.entity.id;
          payment.orderId = req.body.payload.payment.entity.order_id;
          payment.cardId = req.body.payload.payment.entity.card_id;
          payment.upiId = req.body.payload.payment.entity.vpa;
          payment.bankName = req.body.payload.payment.entity.bank;
          payment.walletName = req.body.payload.payment.entity.wallet;
          payment.method = req.body.payload.payment.entity.method;
          payment.email = req.body.payload.payment.entity.email;
          payment.date = new Date();
          payment.save((err,payment) => {
            if(err || !payment){
                console.log(err)
                return res.status(400).json({
                    error: "Please enter all the fields!"
                })
            }
            res.json({payment})
        })
          // require('fs').writeFileSync('payment2.json', JSON.stringify(req.body, null, 4))
      } else {
          // pass it
    }
    
    res.json({status:'ok'})
  }
  