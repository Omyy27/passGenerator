import "./toolsMenu.css";

function ShieldIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

const TOOLS = [
  {
    key: "checker",
    icon: ShieldIcon,
    title: "Password Checker",
    desc: "Analyze password strength and crack time",
  },
  {
    key: "batch",
    icon: LayersIcon,
    title: "Batch Generator",
    desc: "Generate multiple passwords at once",
  },
];

export default function ToolsMenu({ onSelect }) {
  return (
    <div className="tools-menu">
      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.key}
            type="button"
            className="tools-tile"
            onClick={() => onSelect(tool.key)}
          >
            <span className="tools-tile-icon">
              <Icon />
            </span>
            <div className="tools-tile-text">
              <span className="tools-tile-title">{tool.title}</span>
              <span className="tools-tile-desc">{tool.desc}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export { ArrowLeftIcon };
