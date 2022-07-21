import * as React from 'react';
import { ButtonProps } from './@types/Button';

export type { ButtonProps } from './@types/Button';

const Button: React.FC<ButtonProps> = ({
  to,
  href,
  loading,
  size = 'md',
  loaderText = 'Loading',
  className,
  children,
  loader,
  variant = 'default',
  color = 'primary',
  icon,
  loaderColor,
  loaderSize,
  disabled,
  router = 'none',
  styles,
  align = 'center',
  height,
  ...rest
}) => {
  const props = {
    className: `c-btn btn btn-primary ${className}`,
    disabled: disabled || loading || false,
    style: {
      // ...buttonStyles[disabled ? "disabled" : variant](color),
      // ...buttonSizesStyle[size],
      ...styles,
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      textAlign: align === 'center' ? 'center' : 'left',
      pointerEvents: disabled || loading ? 'none' : 'all',
      alignItems: 'center',
      height,
    },
    ...rest,
  };

  if (href || to) {
    const link = href || to;
    const prop = href ? 'href' : 'to';

    const routeProp = { [prop]: link };

    if (router === 'none') {
      return (
        <a
          style={{
            // ...buttonStyles[disabled ? "disabled" : variant](color),
            // ...buttonSizesStyle[size],
            ...styles,
            pointerEvents: disabled || loading ? 'none' : 'all',
            display: 'flex',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
            alignItems: 'center',
            textAlign: align === 'center' ? 'center' : 'left',
            textDecoration: 'none',
          }}
          {...routeProp}
        >
          <span style={{ width: '100%' }}>
            {loading ? loader || <span>{loaderText}...</span> : children}
          </span>
        </a>
      );
    }

    const Router: any = router;

    return (
      <Router {...routeProp}>
        <span
          className={className}
          style={{
            // ...buttonStyles[disabled ? "disabled" : variant](color),
            // ...buttonSizesStyle[size],
            ...styles,
            pointerEvents: disabled || loading ? 'none' : 'all',
            display: 'flex',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
            alignItems: 'center',
            textAlign: align === 'center' ? 'center' : 'left',
            textDecoration: 'none',
            width: '100%',
          }}
        >
          {loading ? loader || <span>{loaderText}...</span> : children}
        </span>
      </Router>
    );
  }

  return (
    <button {...props}>
      {loading ? (
        loader || <span>{loaderText}...</span>
      ) : // <Loader text={loaderText} color={loaderColor} size={loaderSize} />
      icon ? (
        <>
          <span>{children}</span>
          {typeof icon === 'string' ? (
            <span className="material-icons c-btn-icon">{icon}</span>
          ) : (
            icon
          )}
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
