const path =require('path')
const Razorpay = require('razorpay')
const shortid = require('shortid')

const razorpay = new Razorpay({
    key_id: 'rzp_test_BauetMNElZ2N7N',
    key_secret: 'ByGo60MG3CPO4wW93fnZ3NqO',
  });
 exports.paymentProcess = async (req,res)=>{
    const payment_capture = 1
    const amount = 500
    const currency ='INR'
  
    const options = {
      amount: amount*100,
      currency, 
      receipt: shortid.generate(), 
      payment_capture, 
      }
    try{
    const response = await razorpay.orders.create(options)
    console.log("hi")
    console.log(response)
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
      })
    }
    catch{
      err => console.log(err)
    }
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

          require('fs').writeFileSync('payment2.json', JSON.stringify(req.body, null, 4))
      } else {
          // pass it
    }
    
    res.json({status:'ok'})
  }
  