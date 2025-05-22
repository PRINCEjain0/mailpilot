"use client";
export default async function AnalyticsPage() {
  useEffect(() => {
    const fetchEmails = async () => {
      const res = await fetch("/api/getEmail", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.error("Error fetching emails");
        return;
      }
      const data = await res.json();
      console.log(data);
    };
    fetchEmails();
  });
  return (
    <>
      <div>
        <section className="min-h-screen flex flex-col items-center gap-4 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent">
          <div className="flex justify-center items-center gap-1 rounded-full bg-blue-500/10 backdrop-blur-sm py-2 px-4 mt-20 mb-4">
            <div className="h-1 w-1 bg-blue-500 rounded-full"></div>
            <p className="text-blue-400 text-xs">Email Tracking</p>
          </div>
          <div className="text-2xl sm:text-3xl font-bold flex flex-col items-center text-center">
            <h1>Email Analytics</h1>
          </div>
          <h1 className="text-lg text-white/70 max-w-2xl text-center mt-2">
            Track and analyze all your scheduled emails in one place
          </h1>
          <table>
            <thead>
              <tr>
                <th>To</th>
                <th>Subject</th>
                <th>Sent At</th>
                <th>Status</th>
                <th>Opened At</th>
                <th>Clicked At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
