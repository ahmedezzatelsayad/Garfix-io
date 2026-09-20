import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { ValueProposition } from "@/components/site/value-proposition";
import { Services } from "@/components/site/services";
import { Pricing } from "@/components/site/pricing";
import { HowWeWork } from "@/components/site/how-we-work";
import { Governance } from "@/components/site/governance";
import { Footer } from "@/components/site/footer";

export default function Home() {
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
