import { Github, BarChart3, Shield, Award } from "lucide-react";

const steps = [
  {
    icon: Github,
    title: "Connect Your Accounts",
    description: "Link your GitHub and LeetCode profiles securely using OAuth. Your credentials are never stored.",
    step: "01",
  },
  {
    icon: BarChart3,
    title: "Analyze Your Activity",
    description: "Our algorithms analyze commit patterns, code quality, problem-solving skills, and consistency.",
    step: "02",
  },
  {
    icon: Shield,
    title: "Generate Proof",
    description: "Create a cryptographic proof of your skills that's verifiable and tamper-resistant.",
    step: "03",
  },
  {
    icon: Award,
    title: "Share & Verify",
    description: "Share your verified identity with recruiters, hackathon organizers, and educational institutions.",
    step: "04",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">Proof-of-Work</span> Identity Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to build your verified developer identity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="group relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="glow-card p-6 h-full transition-transform duration-300 group-hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-mono text-3xl font-bold text-muted-foreground/30">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
