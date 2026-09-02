import React from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

/**
 * Reusable InputField Component
 * 
 * @param {Object} props
 * @param {string} props.id - Input ID for label association
 * @param {string} props.label - Field label text
 * @param {string} props.type - Input type (text, password, email, etc.)
 * @param {string} props.name - Field name attribute
 * @param {string} props.value - Controlled input value
 * @param {function} props.onChange - Input change handler
 * @param {string} [props.placeholder] - Optional placeholder text
 * @param {React.ElementType} [props.icon] - Icon component to display on left
 * @param {string} [props.error] - Error message string
 * @param {boolean} [props.isPassword] - Whether input is a password field
 * @param {boolean} [props.isPasswordVisible] - Toggle state for password visibility
 * @param {function} [props.onTogglePassword] - Click handler for password show/hide
 */
const InputField = ({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  icon: Icon,
  error = '',
  isPassword = false,
  isPasswordVisible = false,
  onTogglePassword,
  ...rest
}) => {
  // Determine computed input type when handling password toggle
  const inputType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type;

  return (
    <div className={`input-group ${error ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          <span>{label}</span>
        </label>
      )}

      <div className="input-wrapper">
        {Icon && (
          <div className="input-icon-left" aria-hidden="true">
            <Icon size={18} />
          </div>
        )}

        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`custom-input ${isPassword ? 'has-right-action' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            className="input-action-btn"
            onClick={onTogglePassword}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            title={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <div id={`${id}-error`} className="input-error-text" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;
