import Bentodemo from "./bentogrid";

export const Features = () => {
  const features = [
    {
      title: "GitHub Integration",
      description:
        "Seamlessly connect with your GitHub repositories and automate your workflow.",
      icon: "🔄",
    },
    {
      title: "Discord Alerts",
      description:
        "Get instant notifications about important updates directly in Discord.",
      icon: "🔔",
    },
    {
      title: "Template Management",
      description: "Create and manage issue templates to maintain consistency.",
      icon: "📝",
    },
  ];

  return (
    <div className="bg-black text-white py-[72px] sm:py-24 px-5 sm:px-0">
      <h2 className="text-center font-bold text-4xl sm:text-6xl tracking-tighter">
        Everything you need <br className="sm:hidden" />
        <span className="text-purple-500">to forge ahead</span>
      </h2>
      <div className="max-w-xl mx-auto py-4">
        <p className="text-center mt-5 text-lg sm:text-xl text-white/70">
          Supercharge your GitHub workflow with powerful automation tools. From
          template-driven issues to instant Discord alerts, we help your
          team move faster while staying in sync.
        </p>
      </div>

      {/* Mobile Features */}
      <div className="md:hidden mt-16 px-4 space-y-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-white/70">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Desktop Bento Grid */}
      <div className="hidden md:block mt-32">
        <Bentodemo />
      </div>
    </div>
  );
};
