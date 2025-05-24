"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Star } from "lucide-react";

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Hobby",
      price: "Free",
      description: "Best for individuals trying out the service.",
      features: [
        "Send up to 10 emails",
        "Automatic retries (1 retry if delivery fails)",
        "Email support",
      ],
      color: "blue",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-500",
    },
    {
      name: "Creator",
      price: "₹99",
      period: "/month",
      description: "Perfect for personal use, freelancers, and students.",
      features: [
        "Send up to 100 emails",
        "Automatic retries (up to 3 times if delivery fails)",
        "Email analytics (open & click rates)",
        "Priority email support",
      ],
      popular: true,
      color: "purple",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-500",
    },
    {
      name: "Superuser",
      price: "₹299",
      period: "/month",
      description: "For individuals who need high-volume sending.",
      features: [
        "Unlimited emails",
        "Automatic retries (up to 5 times if delivery fails)",
        "Email analytics (open & click rates)",
        "Email performance insights",
        "Early access to new features",
        "Call support",
      ],
      color: "amber",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      textColor: "text-amber-500",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-black/80 to-purple-900/40 pointer-events-none"></div>
      <main className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 backdrop-blur-sm border border-green-500/20 text-xs font-medium mb-6"
            >
              <span className="flex h-1 w-1 rounded-full bg-green-500 mr-2"></span>
              <span className="text-green-400">Simple Pricing</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Choose Your <span className="text-green-500">Perfect Plan</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 text-lg max-w-2xl mx-auto"
            >
              Simple and transparent pricing built for email scheduling power
              users and professionals. Start free and scale as you grow.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div
                  className={`bg-[#111] border rounded-lg p-8 h-full transition-all duration-300 overflow-hidden relative ${
                    tier.popular
                      ? `${tier.borderColor} group-hover:border-purple-500/50`
                      : `border-white/10 group-hover:${tier.borderColor}`
                  }`}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 ${tier.bgColor} rounded-full blur-2xl -mr-16 -mt-16 transition-all duration-500 group-hover:scale-150`}
                  ></div>

                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-4 py-1 mt-4 rounded-full font-medium flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h3
                        className={`text-xl font-bold mb-2 ${tier.textColor}`}
                      >
                        {tier.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold">{tier.price}</span>
                        {tier.period && (
                          <span className="text-white/70 text-sm">
                            {tier.period}
                          </span>
                        )}
                      </div>
                      <p className="text-white/70 text-sm">
                        {tier.description}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <div
                            className={`w-4 h-4 rounded-full ${tier.bgColor} flex items-center justify-center mr-3 flex-shrink-0`}
                          >
                            <Check
                              className={`h-2.5 w-2.5 ${tier.textColor}`}
                            />
                          </div>
                          <span className="text-white/70">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-4">
                      {tier.name === "Enterprise" ? (
                        <Link
                          href="/contact"
                          className={`w-full inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white border-0 rounded-md h-12 text-sm font-medium transition-all duration-300 group`}
                        >
                          Contact Sales
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ) : tier.popular ? (
                        <Link
                          href="/send"
                          className={`w-full inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white border-0 rounded-md h-12 text-sm font-medium transition-all duration-300 group`}
                        >
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ) : (
                        <Link
                          href="/send"
                          className={`w-full inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-md h-12 text-sm font-medium transition-all duration-300 group`}
                        >
                          Get Started Free
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
