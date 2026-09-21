"use client";

import { useApp } from "@/lib/store";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { ValueProposition } from "@/components/site/value-proposition";
import { Services } from "@/components/site/services";
import { Pricing } from "@/components/site/pricing";
import { HowWeWork } from "@/components/site/how-we-work";
import { Governance } from "@/components/site/governance";
import { Footer } from "@/components/site/footer";
import { LoginView } from "@/components/auth/login-view";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { FounderView } from "@/components/founder/founder-view";

export default function Home() {
  const view = useApp((s) => s.view);

  if (view === "login") {
    return <LoginView />;
  }

  if (view === "dashboard") {
    return <DashboardView />;
  }

  if (view === "founder") {
    return <FounderView />;
  }

  // marketing (default)
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <ValueProposition />
        <Services />
        <Pricing />
        <HowWeWork />
        <Governance />
      </main>
      <Footer />
    </div>
  );
}
