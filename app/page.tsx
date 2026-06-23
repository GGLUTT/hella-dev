import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import AIAutomation from "@/components/AIAutomation";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Services />
      <AIAutomation />
      <FAQ />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
