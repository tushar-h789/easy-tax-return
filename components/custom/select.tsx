import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormContext, FieldError } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  name: string;
  placeholder?: string;
  style?: React.CSSProperties;
  scale: number;
  required: boolean;
  onBlur?: (value: string) => void;
  isVisible?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  name,
  placeholder = "Select an option",
  style,
  scale,
  required,
  onBlur,
  isVisible,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const {
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name as keyof typeof errors] as
    | FieldError
    | undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: Option) => {
    if (onBlur) onBlur(option.value);
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  // Combine the passed style with our scaled font size
  const combinedStyle = {
    ...style,
    fontSize: `${0.875 * scale}rem`,
  };

  return (
    <div
      ref={selectRef}
      className="relative w-full h-full"
      style={combinedStyle}
    >
      <div
        className={cn(
          "w-full h-full bg-white border cursor-pointer relative",
          fieldError
            ? "border-red-500 bg-red-300/10 hover:border-red-700"
            : "border-sky-300 hover:border-sky-500",
          isVisible ? "block" : "hidden"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative items-center justify-between flex px-2 overflow-hidden w-full h-full">
          <span className="truncate">
            {selectedOption ? (
              selectedOption.label
            ) : (
              <span
                className={cn(
                  placeholder.length > 50 ? "text-xs" : "",
                  fieldError ? "text-red-500" : ""
                )}
              >
                {placeholder}
              </span>
            )}
          </span>
          <ChevronDown
            className={cn("flex-shrink-0", fieldError ? "text-red-500" : "")}
            style={{ width: "8%", height: "40%" }}
          />

          {required && (
            <span
              className={cn(
                "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 rotate-45 transform origin-center transition-colors",
                fieldError ? "bg-red-500/70" : "bg-sky-300/70"
              )}
            >
              <span className="absolute text-white top-[23px] left-[17px] text-lg">
                *
              </span>
            </span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "cursor-pointer hover:bg-gray-100",
                option.value === value && "bg-blue-100"
              )}
              onClick={() => handleSelect(option)}
              style={{
                padding: `${0.5 * scale}rem ${1 * scale}rem`,
                fontSize: `${0.875 * scale}rem`,
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
