import { Button } from "@/components/ui/button";
import { Github, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const CTA = () => {
  const { user, signInWithGithub } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = async () => {
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

  const handleViewDemo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info("Check out the demo profile above!", {
      description: "This shows how your verified identity will look.",
    });
  };

  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[400px] rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Build Your{" "}
            <span className="gradient-text">Verified Identity</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of developers who are proving their skills with real data, not just resumes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" onClick={handleGetStarted}>
              <Github className="w-5 h-5" />
              {user ? "View Dashboard" : "Get Started Free"}
            </Button>
            <Button variant="outline" size="xl" onClick={handleViewDemo}>
              View Demo
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Takes 2 minutes to set up
          </p>
        </div>
      </div>
    </section>
  );
};
