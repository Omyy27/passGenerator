import "./tabBar.css";

function HistoryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

const TABS = [
  { key: "history", icon: HistoryIcon, label: "History" },
  { key: "generator", icon: KeyIcon, label: "", prominent: true },
  { key: "tools", icon: ToolsIcon, label: "Tools" },
];

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <nav className="tab-bar">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;

        if (tab.prominent) {
          return (
            <button
              key={tab.key}
              type="button"
              className="tab-bar-prominent"
              onClick={() => onTabChange(tab.key)}
              aria-label="Generate password"
            >
              <span className="tab-bar-prominent-icon">
                <Icon />
              </span>
            </button>
          );
        }

        return (
          <button
            key={tab.key}
            type="button"
            className={`tab-bar-item ${isActive ? "active" : ""}`}
            onClick={() => onTabChange(tab.key)}
          >
            <span className="tab-bar-icon">
              <Icon />
            </span>
            <span className="tab-bar-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
