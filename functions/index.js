const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_51PdBptRxKVbjqFD4iHaSxK72x66L8WaHJEthSzwPEmgeylvRKdzUcicvN9MxBZ6bbTwVcvRzR7wOyM6SiHyvX5sp00CrpW4o5x');

exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  const YOUR_DOMAIN = 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: 'mx',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe requiere el monto en centavos
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send('Error creating checkout session');
  }
});
