export default function Hero() {
  const handleLogin = () => {
    window.location.href = "https://mailpilot.princejain.tech/form";
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent">
      <div className="flex items-center gap-2 rounded-full bg-blue-500/10 py-2 px-4 mb-4">
        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
        <p className="text-blue-400 text-xs">Next Generation Email Platform</p>
      </div>

      <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
        Email Scheduling
        <br />
        <span className="text-blue-500">Reimagined</span>
      </h1>

      <p className="text-lg text-white/70 max-w-xl mt-4">
        Schedule, track, and ensure email delivery with automatic resends for
        failures.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium transition"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
