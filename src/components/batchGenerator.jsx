import { useState } from "react";
import { generatePassword } from "../utils/passwordGenerator";
import { calculateEntropy, getStrengthLevel, getStrengthColor } from "../utils/passwordStrength";
import "./batchGenerator.css";

export default function BatchGenerator({ charOptions, passwordLength, excludeAmbiguous }) {
  const [batchCount, setBatchCount] = useState(5);
  const [passwords, setPasswords] = useState([]);

  function handleGenerateBatch() {
    const count = Math.min(Math.max(batchCount, 1), 25);
    const generated = [];
    for (let i = 0; i < count; i++) {
      const pwd = generatePassword({
        length: parseInt(passwordLength),
        ...charOptions,
        excludeAmbiguous,
      });
      const entropy = calculateEntropy({ ...charOptions, length: passwordLength });
      generated.push({ password: pwd, entropy });
    }
    setPasswords(generated);
  }

  function handleCopyAll() {
    const text = passwords.map((p) => p.password).join("\n");
    navigator.clipboard.writeText(text);
  }

  function handleExportCSV() {
    const header = "password,length,entropy";
    const rows = passwords.map((p) => `"${p.password}",${passwordLength},${p.entropy}`);
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `passwords-batch-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="batch-section">
      <div className="batch-header">
        <h3>Batch Generator</h3>
      </div>
      <div className="batch-controls mb-3">
        <label htmlFor="batch-count">Generate</label>
        <input
          id="batch-count"
          type="number"
          className="batch-count-input"
          min="1"
          max="25"
          value={batchCount}
          onChange={(e) => setBatchCount(Number(e.target.value))}
        />
        <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", marginRight: "8px" }}>
          passwords
        </span>
        <button
          type="button"
          className="history-btn"
          onClick={handleGenerateBatch}
          disabled={!charOptions.uppercase && !charOptions.lowercase && !charOptions.numbers && !charOptions.symbols}
        >
          Generate Batch
        </button>
      </div>

      {passwords.length > 0 && (
        <>
          <div className="history-actions mb-2">
            <button type="button" className="history-btn" onClick={handleCopyAll}>
              Copy All
            </button>
            <button type="button" className="history-btn" onClick={handleExportCSV}>
              Export CSV
            </button>
          </div>
          <div className="batch-table-wrapper">
            <table className="batch-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Password</th>
                  <th>Strength</th>
                </tr>
              </thead>
              <tbody>
                {passwords.map((p, i) => {
                  const { label, level } = getStrengthLevel(p.entropy);
                  return (
                    <tr key={i}>
                      <td style={{ color: "var(--color-text-muted)" }}>{i + 1}</td>
                      <td className="batch-password-cell">{p.password}</td>
                      <td>
                        <span
                          className={`history-badge level-${level}`}
                          style={{ background: level > 0 ? getStrengthColor(level) : undefined }}
                        >
                          {label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {passwords.length === 0 && (
        <div className="batch-empty">Set the count and generate a batch</div>
      )}
    </div>
  );
}
