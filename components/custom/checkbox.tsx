import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface CustomCheckboxProps {
  label: string;
  name: string;
  style?: React.CSSProperties;
  scale: number;
  width: number;
  height: number;
  required: boolean;
  onBlur?: (val: string | boolean) => void;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  name,
  style,
  scale,
  width,
  height,
  required,
  onBlur,
  value,
  onChange,
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const isChecked = value !== undefined ? value : internalChecked;

  const combinedStyle = {
    ...style,
    fontSize: `${1 * scale}rem`,
    width: `${width / 10}%`,
    height: `${height / 10}%`,
  };

  const { onChange: registerOnChange, ...rest } = register(name);

  useEffect(() => {
    if (value !== undefined) {
      setInternalChecked(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = e.target.checked;

    if (value === undefined) {
      setInternalChecked(newCheckedState);
    }

    if (onChange) {
      onChange(newCheckedState);
    }

    registerOnChange(e);

    if (onBlur) {
      onBlur(newCheckedState);
    }
  };

  const fieldError = errors[name];

  return (
    <div className="relative" style={combinedStyle}>
      <label className="flex items-center cursor-pointer w-full h-full">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={isChecked}
          {...rest}
          className="absolute opacity-0 w-0 h-0"
        />
        <span
          className={`relative overflow-hidden w-full h-full border rounded-none
            ${
              fieldError
                ? "border-red-500 bg-red-300/10 hover:border-red-700"
                : "border-sky-300 bg-sky-300/10 hover:border-sky-500"
            } focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent`}
        >
          {required && (
            <span
              className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 rotate-45 transform origin-center transition-colors
                ${fieldError ? "bg-red-400/70" : "bg-sky-300/70"}`}
            >
              <span className="absolute text-white top-[23px] left-[17px] text-lg">
                *
              </span>
            </span>
          )}
          <span className="flex items-center justify-center w-full h-full">
            {isChecked && (
              <svg
                viewBox="0 0 150 150"
                className="text-black fill-current"
                style={{ width: "80%", height: "80%" }}
              >
                <path d="M39.323,124.635c-1.979-0.026-10.5-12.115-18.951-26.871L5,70.939l3.987-3.778c2.19-2.076,8.072-3.772,13.083-3.772h9.097 l4.576,13.658l4.577,13.665l36.4-37.755c20.019-20.764,43.139-41.175,51.394-45.353L143.106,0L112.84,32.579 C96.206,50.495,73.66,78.551,62.752,94.916C51.845,111.282,41.302,124.654,39.323,124.635z" />
              </svg>
            )}
          </span>
        </span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
