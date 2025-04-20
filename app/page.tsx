export default function Home() {
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
    </div>
  );
}
