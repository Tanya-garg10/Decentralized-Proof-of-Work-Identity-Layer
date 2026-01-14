import { 
  Lock, 
  TrendingUp, 
  Users, 
  Globe, 
  Cpu,
  RefreshCw 
} from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Tamper-Proof Verification",
    description: "Cryptographic proofs ensure your skill profile cannot be manipulated or falsified.",
  },
  {
    icon: TrendingUp,
    title: "Growth Tracking",
    description: "Track your learning journey over time with detailed analytics and progress metrics.",
  },
  {
    icon: Users,
    title: "Recruiter Dashboard",
    description: "Let employers verify candidates instantly with our recruiter verification tools.",
  },
  {
    icon: Globe,
    title: "Universal Recognition",
    description: "One identity that works across hackathons, job applications, and educational programs.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms evaluate code quality, not just quantity of contributions.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Updates",
    description: "Your profile automatically updates as you contribute more code and solve problems.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 relative bg-gradient-to-b from-transparent via-secondary/30 to-transparent">
      <div className="container px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build Trust Through <span className="gradient-text">Transparency</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to prove your real technical abilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group glow-card p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent p-0.5 mb-4">
                <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
