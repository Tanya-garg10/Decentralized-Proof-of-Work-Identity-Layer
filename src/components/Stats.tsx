const stats = [
  { value: "50K+", label: "Developers Verified" },
  { value: "2.3M", label: "Commits Analyzed" },
  { value: "890K", label: "Problems Tracked" },
  { value: "99.9%", label: "Verification Accuracy" },
];

export const Stats = () => {
  return (
    <section className="py-20 relative">
      <div className="container px-6">
        <div className="glow-card p-8 md:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center relative">
                {index < stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border" />
                )}
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
