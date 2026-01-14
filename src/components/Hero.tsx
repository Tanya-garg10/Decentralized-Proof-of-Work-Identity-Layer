import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Shield, Zap } from "lucide-react";
import { ProofVisualization } from "./ProofVisualization";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const { user, signInWithGithub } = useAuth();
  const navigate = useNavigate();

  const handleConnectGithub = async () => {
    if (user) {
      navigate("/dashboard");
      return;
    }
    try {
      await signInWithGithub();
    } catch (error) {
      toast.error("Failed to connect GitHub", {
        description: "Please try again later.",
      });
    }
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="hero-glow w-[600px] h-[600px] -top-40 -left-40 animate-glow-pulse" />
      <div className="hero-glow w-[500px] h-[500px] -bottom-32 -right-32 animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      
      <div className="container relative z-10 px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
              <span className="text-sm font-mono text-muted-foreground">Proof-of-Work Identity</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Skills,{" "}
              <span className="gradient-text">Verified</span>
              <br />
              On-Chain Forever
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Build a tamper-proof developer identity from your real GitHub and LeetCode activity. 
              No more resume padding—let your code speak for itself.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" onClick={handleConnectGithub}>
                <Github className="w-5 h-5" />
                {user ? "View Dashboard" : "Connect GitHub"}
              </Button>
              <Button variant="glow" size="xl" onClick={scrollToHowItWorks}>
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-8 mt-12 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">Tamper-Proof</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="w-5 h-5 text-accent" />
                <span className="text-sm">Real-Time Sync</span>
              </div>
            </div>
          </div>
          
          {/* Right visualization */}
          <div className="flex-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <ProofVisualization />
          </div>
        </div>
      </div>
    </section>
  );
};
