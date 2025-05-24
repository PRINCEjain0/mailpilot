import { Clock, Zap, Sparkles, Shield } from "lucide-react";
import { motion } from "framer-motion";
export default function Features() {
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
    <section className="min-h-screen z-50 flex flex-col items-center text-center px-4 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent">
      <div className="flex items-center gap-2 rounded-full bg-purple-500/10 py-2 px-4 mt-20 mb-4">
        <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
        <p className="text-purple-400 text-xs">Revolutionary Features</p>
      </div>

      <h2 className="text-4xl font-bold mb-2">
        Why Our Platform <span className="text-purple-500">Stands Out</span>
      </h2>

      <p className="text-white/70 mb-8 max-w-xl">
        Discover the cutting-edge features that make our email scheduling
        service the preferred choice for professionals worldwide.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="group"
          >
            <div className="bg-[#111] border border-white/10 rounded-lg p-6 h-full transition-all duration-300 group-hover:border-white/20">
              <div
                className={`w-12 h-12 rounded-md flex items-center justify-center mb-4 ${feature.color} border transition-all duration-300 ${feature.hoverColor}`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70 text-sm group-hover:text-white transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
