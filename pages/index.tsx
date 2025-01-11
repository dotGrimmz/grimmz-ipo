import ipoLogo from "@/public/Ipologo.png";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <div className="hero min-h-screen bg-primary">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={ipoLogo.src} className="max-w-sm rounded-lg shadow-2xl" />
          <div className="w-full min-w-[499px]">
            <h1 className="text-5xl font-bold ">
              Real-Time Monitoring and Insights on New Stock Listings
            </h1>
            <p className="py-6">
              Designed for both amateur investors and financial professionals,
              IPO Tracker simplifies navigating the often complex world of stock
              market debuts.
            </p>
            <Link href="/ipos" className="btn btn-accent">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
