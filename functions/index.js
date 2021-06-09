const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IzangEMWBc7KWcd9NvoRvlHnRTs8bfWgQwcWz3GRTtqtjkyLUVdoQEcTGaJgk3eaAKnHNXV77jR2OfHaZLZ4XET00iKlPuvf6"
);

//API

// - app config;
const app = express();

// - Middlewares;
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// try {
//   app.post("/payments/create", async (req, res) => {
//     const total = req.query.total;
//     console.log("This is bank-end", total);
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total,
//       currency: "usd",
//     });

//     res.status(201).send({ clientSecret: paymentIntent.client_secret });
//   });
// } catch (err) {
//   return res.status(500).send(err);
// }

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  // console.log("This is bank-end", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // console.log(paymentIntent);
  res.status(201).send({ clientSecret: paymentIntent.client_secret });
});

// - Listen command
exports.api = functions.https.onRequest(app);