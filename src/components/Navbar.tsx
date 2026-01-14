import { Button } from "@/components/ui/button";
import { Github, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, loading, signInWithGithub, signOut } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleConnect = async () => {
    try {
      await signInWithGithub();
    } catch (error) {
      toast.error("Failed to connect GitHub", {
        description: "Please try again later.",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PoW</span>
            </div>
            <span className="font-bold text-lg hidden sm:block">ProofID</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("features")} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("stats")} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              For Developers
            </button>
            <button 
              onClick={() => scrollToSection("cta")} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-9 bg-muted animate-pulse rounded-md" />
            ) : user ? (
              <>
                <Button variant="ghost" size="sm" onClick={handleDashboard}>
                  <User className="w-4 h-4 mr-2" />
                  {profile?.github_username || "Dashboard"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button variant="default" size="sm" onClick={handleConnect}>
                <Github className="w-4 h-4" />
                Connect GitHub
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection("features")} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection("how-it-works")} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection("stats")} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                For Developers
              </button>
              <button 
                onClick={() => scrollToSection("cta")} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Get Started
              </button>
              <div className="flex gap-3 pt-4 border-t border-border">
                {user ? (
                  <>
                    <Button variant="ghost" size="sm" className="flex-1" onClick={handleDashboard}>
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button variant="default" size="sm" className="flex-1" onClick={handleConnect}>
                    <Github className="w-4 h-4" />
                    Connect GitHub
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
