import { getStrengthLevel, getStrengthColor } from "../utils/passwordStrength";
import "./passwordHistory.css";

function CopyIconSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export default function PasswordHistory({ entries, clearHistory, exportCSV }) {
  if (entries.length === 0) {
    return (
      <div className="history-section">
        <div className="history-empty">No passwords generated yet</div>
      </div>
    );
  }

  function handleCopy(password) {
    navigator.clipboard.writeText(password);
  }

  function handleExportCSV() {
    const csv = exportCSV();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `password-history-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="history-section">
      <div className="history-header">
        <h3>History ({entries.length})</h3>
        <div className="history-actions">
          <button type="button" className="history-btn" onClick={handleExportCSV}>
            Export CSV
          </button>
          <button type="button" className="history-btn danger" onClick={clearHistory}>
            Clear
          </button>
        </div>
      </div>
      <div className="history-table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Password</th>
              <th>Length</th>
              <th>Strength</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const { label, level } = getStrengthLevel(entry.entropy);
              return (
                <tr key={entry.id}>
                  <td className="history-password-cell">{entry.password}</td>
                  <td>{entry.length}</td>
                  <td>
                    <span
                      className={`history-badge level-${level}`}
                      style={{ background: level > 0 ? getStrengthColor(level) : undefined }}
                    >
                      {label}
                    </span>
                  </td>
                  <td style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="history-copy-btn"
                      onClick={() => handleCopy(entry.password)}
                      aria-label="Copy password"
                    >
                      <CopyIconSm />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
