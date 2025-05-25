"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function CheckoutContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const router = useRouter();
  let emails = 100;

  let price = 99;
  if (plan === "superuser") {
    price = 299;
    emails = 500;
  } else if (plan === "hobby") {
    price = 0;
    emails = 0;
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (!plan || plan === "hobby") {
      setError("Please select a valid paid plan to proceed.");
      setLoading(false);
      return;
    }

    const startPayment = async () => {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setError("Razorpay SDK failed to load. Check your connection.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: price }),
        });

        const orderData = await res.json();

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "MailPilot",
          description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
          order_id: orderData.id,
          handler: async function (response) {
            try {
              await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  plan,
                  emails,
                }),
              });
              router.push("/");
            } catch (err) {
              console.error("Verification failed", err);
              alert("Payment verification failed");
            }
          },

          prefill: {
            name: "Test User",
            email: "test@example.com",
            contact: "9999999999",
          },
          notes: {
            plan,
          },
          theme: {
            color: "#0f172a",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (err) {
        setError("Failed to initiate payment.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    startPayment();
  }, [plan]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-4">
      <div className="bg-gray-900 border border-gray-700 p-10 rounded-xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {loading && <p>Preparing your payment...</p>}
        {error && <p className="text-red-400 font-medium mt-4">{error}</p>}
        {!loading && !error && (
          <p className="text-green-400 font-medium mt-4">
            If Razorpay didn't open, please reload the page.
          </p>
        )}
      </div>
    </div>
  );
}

function CheckoutFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-4">
      <div className="bg-gray-900 border border-gray-700 p-10 rounded-xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Loading checkout...</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}
