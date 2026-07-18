import './strengthMeter.css';
import { calculateEntropy, getStrengthLevel, getStrengthColor } from '../utils/passwordStrength';

export default function StrengthMeter({ length, charOptions }) {
  const entropy = calculateEntropy({ ...charOptions, length });
  const { label, level } = getStrengthLevel(entropy);

  return (
    <div className="strength-meter">
      <div className="strength-bars">
        {[1, 2, 3, 4].map((barIndex) => (
          <div
            key={barIndex}
            className={`strength-bar ${barIndex <= level ? 'active' : ''} ${barIndex <= level ? `level-${level}` : ''}`}
            style={{
              animationDelay: `${(barIndex - 1) * 80}ms`,
            }}
          />
        ))}
      </div>
      <div className="strength-label">
        <span>Strength</span>
        <span style={{ color: level > 0 ? getStrengthColor(level) : undefined }}>
          {label}{entropy > 0 ? ` (${entropy} bits)` : ''}
        </span>
      </div>
    </div>
  );
}
