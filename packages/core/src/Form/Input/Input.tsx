import * as React from 'react';
import {
  InputProps,
  SelectProps,
  CheckboxProps,
  TextAreaProps,
} from './@types/Input';

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  className = '',
  error,
  inputClassName = '',
  disabled,
  ...rest
}) => {
  // css={textareaStyles({
  //   hasError: Boolean(error),
  //   disabled,
  // })}
  return (
    <div className={`${className} form-group x-form`}>
      {label && <label className="x-form__label">{label}</label>}
      <textarea
        className={`x-form__textarea form-control x-form__component ${inputClassName}`}
        disabled={disabled}
        {...rest}
      />
      {error && <small className="x-form__error">{error}</small>}
    </div>
  );
};

export const Input: React.FC<InputProps> = ({
  label,
  className = '',
  error,
  inputClassName = '',
  disabled,
  attach,
  ...rest
}) => {
  // css={inputStyles({
  //   hasError: Boolean(error),
  //   disabled,
  // })}
  return (
    <div className={`${className} form-group x-form`}>
      {label && <label className="x-form__label">{label}</label>}
      <div className={`x-form__container ${attach ? '-has-attachment' : ''}`}>
        <input
          className={`x-form__input form-control x-form__component ${inputClassName}`}
          disabled={disabled}
          {...rest}
        />
        {attach && <div className="input-attachment__container">{attach}</div>}
      </div>
      {error && <small className="x-form__error">{error}</small>}
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({
  label,
  className = '',
  error,
  inputClassName = '',
  disabled,
  options = [],
  ...rest
}) => {
  // css={selectStyles({
  //   hasError: Boolean(error),
  //   disabled,
  // })}
  return (
    <div className={`${className} form-group x-form`}>
      {label && <label className="x-form__label">{label}</label>}
      <select
        className={`x-form__select form-control x-form__component ${inputClassName}`}
        disabled={disabled}
        {...rest}
      >
        {options.map((option: any, index: number) => (
          <option
            key={index}
            value={typeof option === 'string' ? option : option.value}
            className="select__option"
          >
            {typeof option === 'string' ? option : option.name}
          </option>
        ))}
      </select>
      {error && <small className="x-form__error">{error}</small>}
    </div>
  );
};

export const CheckBox: React.FC<CheckboxProps> = ({
  label,
  className = '',
  error,
  disabled,
  inputClassName = '',
  customLabel,
  id,
  ...rest
}) => {
  // css={checkboxStyles({
  //   hasError: Boolean(error),
  //   disabled,
  // })}
  return (
    <div className={`${className} form-group x-form`}>
      <div className="checkbox-container flex flex:center-start">
        <input
          className={`x-form__checkbox form-control ${inputClassName}`}
          type="checkbox"
          id={id || `checkbox-${label?.split(' ').join('-').toLowerCase()}`}
          disabled={disabled}
          {...rest}
        />
        {(customLabel || label) && (
          <label
            className="x-form__label"
            htmlFor={
              id || `checkbox-${label?.split(' ').join('-').toLowerCase()}`
            }
          >
            {customLabel || label}
          </label>
        )}
      </div>
      {error && <small className="x-form__error">{error}</small>}
    </div>
  );
};

export default Input;
