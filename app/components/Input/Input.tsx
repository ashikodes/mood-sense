import { FieldError } from 'react-hook-form';
import './Input.scss';
import cn from 'classnames';

interface InputProps {
  label: string;
  error?: FieldError;
  disabled?: boolean;
}

export function Input(props: InputProps) {
  const { label, error } = props;
  return (
    <div className="input-container">
      <label>{label}</label>
      <textarea
        className={cn("input-textarea", { "input-error": error })}
        placeholder={`Type your ${label}...`}
        {...props}
      ></textarea>
      <span className='error-desc'>{error?.message}</span>
    </div>
  );
}
