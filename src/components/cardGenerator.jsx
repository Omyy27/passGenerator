import { useEffect, useState, useRef } from "react";
import { generatePassword } from "../utils/passwordGenerator";
import Form from "react-bootstrap/Form";
import StrengthMeter from "./strengthMeter";

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

const CardGenerator = ({ onPasswordGenerated }) => {
  const [passwordLength, setPasswordLength] = useState(14);
  const [selectedCharTypes, setSelectedCharTypes] = useState([1, 2, 3, 4]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const inputRef = useRef(null);
  const copyTimeoutRef = useRef(null);

  const charTypes = [
    { id: 1, name: "uppercase letters" },
    { id: 2, name: "lowercase letters" },
    { id: 3, name: "numbers" },
    { id: 4, name: "symbols" },
  ];

  function handleCharTypeChange(e) {
    const value = Number(e.target.value);
    if (e.target.checked) {
      setSelectedCharTypes([...selectedCharTypes, value]);
    } else {
      setSelectedCharTypes(selectedCharTypes.filter((id) => id !== value));
    }
  }

  const charOptions = {
    uppercase: selectedCharTypes.includes(1),
    lowercase: selectedCharTypes.includes(2),
    numbers: selectedCharTypes.includes(3),
    symbols: selectedCharTypes.includes(4),
  };

  useEffect(() => {
    generateNewPassword();
  }, []);

  function generateNewPassword() {
    const pwd = generatePassword({
      length: parseInt(passwordLength),
      ...charOptions,
      excludeAmbiguous,
    });
    setPassword(pwd);
    if (onPasswordGenerated) onPasswordGenerated(pwd, parseInt(passwordLength), charOptions);
    if (inputRef.current) inputRef.current.focus();
  }

  async function copyPassword() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = password;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopyFeedback(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopyFeedback(false), 2000);
  }

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div className="mb-3 position-relative">
        <div className="input-group">
          <input
            ref={inputRef}
            type={showPassword ? "text" : "password"}
            className="form-control text-white"
            id="inputpass"
            readOnly
            placeholder="P4$5W0rD!"
            value={password}
          />
          <button
            type="button"
            className="btn btn-outline-secondary border-0"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{ background: "var(--color-bg-input)", color: "var(--color-text-muted)" }}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary border-0 position-relative"
            onClick={copyPassword}
            aria-label="Copy password"
            style={{ background: "var(--color-bg-input)", color: "var(--color-text-muted)" }}
          >
            {copyFeedback ? <CheckIcon /> : <CopyIcon />}
            {copyFeedback && (
              <span
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--color-primary)",
                  color: "var(--color-primary-text)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                }}
              >
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-body d-flex flex-column flex-wrap">
          <div className="d-flex flex-row flex-wrap align-items-center justify-content-between col-12">
            <span className="text-white">Character length</span>
            <h4 className="pass-length">{passwordLength}</h4>
          </div>
          <div className="col-12">
            <Form.Range
              className="slider"
              min="4"
              max="24"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
            />
          </div>
          <div className="col-12 text-white">
            {charTypes.map((c) => (
              <div className="form-check" key={c.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={c.id}
                  checked={selectedCharTypes.includes(c.id)}
                  onChange={(e) => handleCharTypeChange(e)}
                  id={`char-${c.id}`}
                />
                <label className="form-check-label" htmlFor={`char-${c.id}`}>
                  Include {c.name}
                </label>
              </div>
            ))}
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                id="exclude-ambiguous"
              />
              <label className="form-check-label" htmlFor="exclude-ambiguous" style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>
                Exclude ambiguous characters (0O, 1lI, 5S, 2Z)
              </label>
            </div>
          </div>
          <div className="col-12 px-3 d-flex flex-row flex-wrap align-items-center content-strength my-3">
            <StrengthMeter length={passwordLength} charOptions={charOptions} />
          </div>
          <button
            type="button"
            onClick={generateNewPassword}
            className="btn btn-success btn-block rounded-0"
            disabled={selectedCharTypes.length === 0}
          >
            GENERATE →
          </button>
        </div>
      </div>
    </>
  );
};

export default CardGenerator;
