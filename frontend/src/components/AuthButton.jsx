import React from 'react';

/**
 * Reusable AuthButton Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label / inner content
 * @param {boolean} [props.isLoading] - Loading state flag
 * @param {string} [props.loadingText] - Text to display during loading state
 * @param {boolean} [props.disabled] - Disabled flag
 * @param {string} [props.type='submit'] - Button type attribute
 * @param {React.ElementType} [props.icon: Icon] - Optional leading icon
 * @param {function} [props.onClick] - Click handler
 */
const AuthButton = ({
  children,
  isLoading = false,
  loadingText = 'Authenticating...',
  disabled = false,
  type = 'submit',
  icon: Icon,
  onClick,
  ...rest
}) => {
  return (
    <button
      type={type}
      className="auth-btn"
      disabled={disabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {isLoading ? (
        <>
          <span className="btn-spinner" aria-hidden="true" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={19} className="btn-icon" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default AuthButton;
