import Razorpay from "razorpay";

export async function POST(request) {
  const body = await request.json();

  const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });

  const options = {
    amount: body.amount * 100,
    currency: "INR",
    receipt: "receipt#1",
  };

  try {
    const order = await razorpay.orders.create(options);
    return Response.json(order);
  } catch (err) {
    console.error(err);
    return new Response("Order creation failed", { status: 500 });
  }
}
