import { GitCommit, Code, Star, GitPullRequest } from "lucide-react";

export const ProofVisualization = () => {
  const stats = [
    { label: "Commits", value: "2,847", icon: GitCommit, color: "text-primary" },
    { label: "Problems", value: "423", icon: Code, color: "text-accent" },
    { label: "Stars", value: "156", icon: Star, color: "text-yellow-500" },
    { label: "PRs", value: "89", icon: GitPullRequest, color: "text-primary" },
  ];

  return (
    <div className="relative">
      {/* Central identity card */}
      <div className="glow-card p-8 max-w-md mx-auto">
        {/* Profile header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
            JD
          </div>
          <div>
            <h3 className="text-xl font-bold">john.dev</h3>
            <p className="text-muted-foreground text-sm font-mono">0x7a3f...8b2c</p>
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Verified
            </span>
          </div>
        </div>

        {/* Skill bars */}
        <div className="space-y-4 mb-6">
          <SkillBar label="TypeScript" percentage={92} />
          <SkillBar label="React" percentage={88} />
          <SkillBar label="Solidity" percentage={75} />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-secondary/50 rounded-lg p-3 flex items-center gap-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <p className="font-mono font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activity graph */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Contribution Activity</p>
          <div className="flex gap-1 items-end h-12">
            {[40, 60, 35, 80, 55, 90, 70, 45, 85, 50, 75, 95].map((height, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-primary/50 to-primary transition-all hover:from-primary hover:to-accent"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-card border border-border p-3 animate-float shadow-lg">
        <GitCommit className="w-full h-full text-primary" />
      </div>
      <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-card border border-border p-2.5 animate-float shadow-lg" style={{ animationDelay: '2s' }}>
        <Code className="w-full h-full text-accent" />
      </div>
    </div>
  );
};

const SkillBar = ({ label, percentage }: { label: string; percentage: number }) => (
  <div>
    <div className="flex justify-between mb-1.5">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-mono text-muted-foreground">{percentage}%</span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);
