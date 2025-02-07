interface FormGroupProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  fieldValue: string;
  fieldError: string | undefined;
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormControl({
  label,
  type,
  name,
  placeholder,
  fieldValue,
  fieldError,
  isRequired = true,
  isDisabled = false,
  onChange,
}: FormGroupProps) {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={fieldValue}
        onChange={onChange}
        placeholder={placeholder}
        className="input input-bordered"
        required={isRequired}
        disabled={isDisabled}
      />
      {fieldError && <span className="mt-1 text-sm text-error">{fieldError}</span>}
    </div>
  );
}
