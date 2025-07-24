"use client";
import AppNavbar from "@/components/common/organisms/AppNavbar";
import Footer from "@/components/common/organisms/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
