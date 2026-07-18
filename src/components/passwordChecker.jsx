import { useMemo, useState } from "react";
import StrengthMeter from "./strengthMeter";
import "./passwordChecker.css";

function estimateCrackTime(entropy) {
  const guessesPerSecond = 1e10;
  const combinations = Math.pow(2, entropy);
  const seconds = combinations / guessesPerSecond;

  if (seconds < 1) return "instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
  return "centuries";
}

function analyzePassword(pwd) {
  const length = pwd.length;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSymbol = /[^A-Za-z0-9]/.test(pwd);

  return {
    length,
    charOptions: {
      uppercase: hasUpper,
      lowercase: hasLower,
      numbers: hasNumber,
      symbols: hasSymbol,
    },
  };
}

export default function PasswordChecker() {
  const [input, setInput] = useState("admin123");

  const analysis = useMemo(() => {
    if (!input) return null;
    return analyzePassword(input);
  }, [input]);

  const crackTime = useMemo(() => {
    if (!analysis || input.length === 0) return null;
    const bits = Math.round(
      input.length * (Math.log(
        (analysis.charOptions.uppercase ? 26 : 0) +
        (analysis.charOptions.lowercase ? 26 : 0) +
        (analysis.charOptions.numbers ? 10 : 0) +
        (analysis.charOptions.symbols ? 32 : 0)
      ) / Math.log(2))
    );
    return estimateCrackTime(bits);
  }, [analysis, input]);

  return (
    <div className="checker-section">
      <h3>Password Checker</h3>
      <input
        type="text"
        className="checker-input"
        placeholder="Type a password to check..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      {analysis && input.length > 0 && (
        <>
          <div className="px-3 py-2 content-strength my-2">
            <StrengthMeter length={input.length} charOptions={analysis.charOptions} />
          </div>
          <div className="checker-stats">
            <div className="checker-stat">
              <div className="checker-stat-value">{analysis.length}</div>
              <div className="checker-stat-label">Length</div>
            </div>
            <div className="checker-stat">
              <div className="checker-stat-value">
                {[analysis.charOptions.uppercase, analysis.charOptions.lowercase, analysis.charOptions.numbers, analysis.charOptions.symbols].filter(Boolean).length}/4
              </div>
              <div className="checker-stat-label">Char Types</div>
            </div>
          </div>
          <div className="checker-time">
            Estimated crack time: <strong>{crackTime}</strong>
          </div>
        </>
      )}
    </div>
  );
}
