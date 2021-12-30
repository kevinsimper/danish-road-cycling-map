import React, { forwardRef } from "react";

type InputProps = {
  name?: string;
  type?: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  value?: string | string[];
  disabled?: boolean;
  pattern?: string;
  defaultValue?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type = "text",
    name = "",
    label,
    onChange,
    onBlur,
    required = false,
    placeholder = "",
    value,
    disabled = false,
    pattern,
  } = props;
  return (
    <div className="w-full">
      <label>
        <span className="block text-gray-900 font-semibold mb-1">
          {required ? <>{label} &#42;</> : label}
        </span>
        <input
          ref={ref}
          className="w-full border p-2 rounded border-gray-400"
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          placeholder={placeholder}
          value={value}
          name={name}
          disabled={disabled}
          pattern={pattern}
        />
      </label>
    </div>
  );
});
