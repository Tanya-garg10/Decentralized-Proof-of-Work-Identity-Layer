import { Github, Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner";

export const Footer = () => {
  const handleSocialClick = (platform: string) => {
    toast.info(`${platform} link coming soon!`);
  };

  const handleLinkClick = (page: string) => {
    toast.info(`${page} page coming soon!`);
  };

  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PoW</span>
            </div>
            <span className="font-bold">ProofID</span>
          </button>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button onClick={() => handleLinkClick("Privacy")} className="hover:text-foreground transition-colors">
              Privacy
            </button>
            <button onClick={() => handleLinkClick("Terms")} className="hover:text-foreground transition-colors">
              Terms
            </button>
            <button onClick={() => handleLinkClick("Docs")} className="hover:text-foreground transition-colors">
              Docs
            </button>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleSocialClick("GitHub")} 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleSocialClick("Twitter")} 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleSocialClick("LinkedIn")} 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          © 2024 ProofID. Building trust through transparency.
        </p>
      </div>
    </footer>
  );
};
