import Hero from "@/components/Hero";
import SiteLoader from "@/components/SiteLoader";
import Nav from "@/components/Nav";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import AIAutomation from "@/components/AIAutomation";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ForWhom from "@/components/ForWhom";
import WhatYouGet from "@/components/WhatYouGet";
import Workflow from "@/components/Workflow";

export default function Page() {
  return (
    <main className="relative">
      <SiteLoader />
      <Nav />
      <Hero />
      <About />
      <ForWhom />
      <WhatYouGet />
      <Projects />
      <Services />
      <AIAutomation />
      <Workflow />
      <FAQ />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
