"use client";
import {
  ArrowRight,
  Mail,
  Sparkles,
  Zap,
  Shield,
  Clock,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
export default function Home() {
  const features = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Precision Timing",
      description:
        "Schedule emails down to the minute across multiple time zones with our advanced calendar system.",
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      hoverColor: "group-hover:bg-amber-500 group-hover:text-white",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Retry on Failure",
      description:
        "Emails that fail to send will be retried automatically up to 3 times to ensure delivery.",
      color: "bg-red-500/10 text-red-500 border-red-500/20",
      hoverColor: "group-hover:bg-red-500 group-hover:text-white",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Comprehensive Analytics",
      description:
        "Get detailed insights into open rates, click-through rates, and engagement metrics for all your emails.",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      hoverColor: "group-hover:bg-purple-500 group-hover:text-white",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description:
        "Your data is protected with end-to-end encryption and complies with global security standards.",
      color: "bg-green-500/10 text-green-500 border-green-500/20",
      hoverColor: "group-hover:bg-green-500 group-hover:text-white",
    },
  ];
  return (
    <div>
      <section className="min-h-screen flex flex-col items-center gap-4 bg-gradient-to-b  from-blue-900/20 via-transparent to-transparent">
        <div className="flex justify-center items-center gap-1 rounded-full bg-blue-500/10 backdrop-blur-sm py-2 px-4 mt-20 mb-4">
          <div className="h-1 w-1 bg-blue-500 rounded-full "></div>
          <p className="text-blue-400 text-xs ">
            Next Generation Email Platform
          </p>
        </div>
        <div className="text-5xl sm:text-7xl font-bold flex flex-col items-center text-center">
          <h1>Email Scheduling</h1>
          <h1 className=" text-blue-500">Reimagined</h1>
        </div>
        <h1 className="text-lg text-white/70 max-w-2xl text-center mt-2">
          Schedule, track, and ensure email delivery with automatic resends for
          failures.
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="bg-blue-600 h-12 text-sm font-medium px-4 rounded-md hover:bg-blue-700">
            Get Started
          </button>
          <button className="bg-white/5 h-12 text-sm font-medium px-4 rounded-md hover:bg-white/10 border border-white/20">
            See How It Works
          </button>
        </div>
      </section>

      <section className="min-h-screen flex flex-col items-center gap-4 bg-gradient-to-b  from-purple-900/20 via-transparent to-transparent">
        <div className="flex justify-center items-center gap-1 rounded-full bg-purple-500/10 backdrop-blur-sm py-2 px-4 mt-20 mb-4">
          <div className="h-1 w-1 bg-purple-500 rounded-full "></div>
          <p className="text-purple-400 text-xs ">Revolutionary Features</p>
        </div>
        <div className="flex gap-2 mb-6">
          <h1 className="text-4xl font-bold ">Why Our Platform </h1>

          <h1 className="text-4xl text-purple-500 font-bold"> Stands Out</h1>
        </div>
        <h1>
          Discover the cutting-edge features that make our email scheduling
          service the preferred choice for professionals worldwide.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-[#111] border border-white/10 rounded-lg p-6 h-full transition-all duration-300 group-hover:border-white/20 overflow-hidden">
                <div
                  className={`w-12 h-12 rounded-md flex items-center justify-center mb-4 ${feature.color} border transition-all duration-300 ${feature.hoverColor}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section></section>
    </div>
  );
}
