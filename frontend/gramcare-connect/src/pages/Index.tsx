import { Link } from "react-router-dom";
import { Stethoscope, Brain, Users, ArrowRight, Heart, Shield, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.jpeg";

const steps = [
  {
    icon: Brain,
    title: "Describe Symptoms",
    description: "Tell us how you're feeling using text or voice input in your language.",
    color: "bg-healthcare-blue/10 text-healthcare-blue",
  },
  {
    icon: Shield,
    title: "Get AI Health Advice",
    description: "Our AI analyzes your symptoms and provides guidance on what to do next.",
    color: "bg-healthcare-green/10 text-healthcare-green",
  },
  {
    icon: Stethoscope,
    title: "Connect with Doctors",
    description: "Book a consultation with verified doctors available for your area.",
    color: "bg-healthcare-orange/10 text-healthcare-orange",
  },
];

const stats = [
  { value: "10,000+", label: "Villages Connected" },
  { value: "500+", label: "Verified Doctors" },
  { value: "24/7", label: "AI Health Support" },
  { value: "50+", label: "Medicine Partners" },
];

const Index = () => {
  return (
    <div className="min-h-screen gradient-hero">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Heart className="h-7 w-7 text-healthcare-blue" />
          <span className="text-xl font-bold text-foreground">GramCare AI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Create Account</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-healthcare-blue/10 px-4 py-1.5 text-sm font-medium text-healthcare-blue mb-6">
              <Heart className="h-4 w-4" />
              Trusted by 10,000+ villages
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Healthcare Access for{" "}
              <span className="text-healthcare-blue">Every Village</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              GramCare AI connects rural communities with doctors, medicines, and
              digital health services — all from your phone or computer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </div>
          <div className="animate-fade-in-delay-2 flex justify-center">
            <img
              src={heroImage}
              alt="Telemedicine connecting rural villages with doctors"
              className="w-full max-w-md animate-float"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-6 text-center shadow-card"
              style={{ animation: `fade-in 0.6s ease-out ${0.1 * i}s forwards` }}
            >
              <div className="text-2xl md:text-3xl font-bold text-healthcare-blue">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How GramCare AI Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three simple steps to get healthcare support from anywhere.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              style={{ animation: `fade-in 0.6s ease-out ${0.15 * i}s forwards` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${step.color}`}>
                <step.icon className="h-7 w-7" />
              </div>
              <div className="text-sm font-semibold text-muted-foreground mb-2">
                Step {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-card rounded-3xl p-12 shadow-card">
          <Pill className="h-10 w-10 text-healthcare-green mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to bring healthcare to your village?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join thousands of rural communities already using GramCare AI for better health outcomes.
          </p>
          <Link to="/signup">
            <Button size="lg" className="gap-2">
              Create Free Account <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-healthcare-blue" />
            <span className="font-semibold text-foreground">GramCare AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 GramCare AI. Healthcare for every village.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
