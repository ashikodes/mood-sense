import './Input.scss';

interface InputProps {
  label: string;
}

export function Input(props: InputProps) {
  const { label } = props;
  return (
    <div className="input-container">
      <label>{label}</label>
      <textarea
        className="input-textarea"
        placeholder={`Type your ${label}...`}
      ></textarea>
    </div>
  );
}
