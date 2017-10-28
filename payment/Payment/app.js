//product key : pk_test_AEs8PFYm4nTIwsJEL0iWjL7O
// secretkey :	sk_test_YTmA0CQReuJyFJ3rKICm5NMo

const express = require("express");
const stripe = require("stripe")("sk_test_YTmA0CQReuJyFJ3rKICm5NMo");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render("index",{

  });
});

app.get('/paysuccess', function(req, res) {
  res.render("paysuccess",{

  });
});

// app.post('/charge', (req, res) => {
//   const amount = 10000;
//
//   stripe.customers.create({
//     email: req.body.stripeEmail,
//     source: req.body.stripeToken
//   })
//   .then(customer => stripe.charges.create({
//     amount,
//     description: 'Web Development Ebook',
//     currency: 'usd',
//     customer: customer.id
//   }))
//   .then(charge => res.render('success'));
// });

// app.post('/charge', function(req, res) {
//   var token =  req.body.stripeToken;
//   var chargeAmount = req.body.chargeAmount;
//   var charge = stripe.charges.create({
//       amount: chargeAmount,
//       currency: "usd",
//       source: token
//     }, function(err, charge) {
//       if(err & err.type === "StripeCardError") {
//           console.log("Card declined");
//       }
//   });
//   console.log("Payment successful");
//   res.redirect('/paysuccess');
//
// });


app.post('/charge', function(req, res) {
  const amount = 5000;
  var token =  req.body.stripeToken;
  // var amount = req.body.amount;
  var charge = stripe.charges.create({
      amount,
      currency: "usd",
      source: token
    }, function(err, charge) {
      if(err) {
          console.log("Card declined");
      }
  });
  console.log("Payment successful");
  res.redirect('/paysuccess');

});



app.listen(process.env.PORT || 3000, () => {
  console.log("App running");
});
