import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/airbnb.css";

type Instance = flatpickr.Instance;
type BaseOptions = flatpickr.Options.Options;

interface DateFieldPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CustomDatePickerProps {
  onChange: (date: Date | null) => void;
  value?: Date | null;
  dayPosition: DateFieldPosition;
  monthPosition: DateFieldPosition;
  yearPosition: DateFieldPosition;
  scale: number;
  name: string;
  required?: boolean;
  disabled?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onChange,
  value,
  dayPosition,
  monthPosition,
  yearPosition,
  scale,
  name,
  required = false,
  disabled = false,
}) => {
  const {
    formState: { errors },
  } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const flatpickrRef = useRef<Instance | null>(null);

  const hasError = !!errors[name];

  const formatDate = (date: Date | null) => {
    if (!date) return { day: "", month: "", year: "" };
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: (date.getMonth() + 1).toString().padStart(2, "0"),
      year: date.getFullYear().toString(),
    };
  };

  const { day, month, year } = formatDate(selectedDate);

  useEffect(() => {
    setSelectedDate(value || null);
    if (flatpickrRef.current && value) {
      flatpickrRef.current.setDate(value, false);
    }
  }, [value]);

  const openDatepicker = () => {
    if (flatpickrRef.current && !disabled) {
      flatpickrRef.current.open();
    }
  };

  useEffect(() => {
    if (!hiddenInputRef.current || !containerRef.current) return;

    const options: Partial<BaseOptions> = {
      dateFormat: "Y-m-d",
      allowInput: false,
      disableMobile: true,
      static: true,
      appendTo: containerRef.current,
      defaultDate: value || undefined,
      onChange: (selectedDates: Date[]) => {
        const newDate = selectedDates[0] || null;
        setSelectedDate(newDate);
        onChange(newDate);
      },
      onOpen: () => {
        if (
          !flatpickrRef.current?.calendarContainer ||
          !containerRef.current ||
          !dayInputRef.current
        )
          return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const dayInputRect = dayInputRef.current.getBoundingClientRect();

        const calendar = flatpickrRef.current.calendarContainer;
        calendar.style.position = "absolute";
        calendar.style.top = `${dayInputRect.bottom - containerRect.top + 5}px`;
        calendar.style.left = `${dayInputRect.left - containerRect.left}px`;
        calendar.style.zIndex = "9999";
      },
    };

    flatpickrRef.current = flatpickr(hiddenInputRef.current, options);

    if (value) {
      flatpickrRef.current.setDate(value, false);
    }

    return () => {
      if (flatpickrRef.current) {
        flatpickrRef.current.destroy();
        flatpickrRef.current = null;
      }
    };
  }, []);

  const getInputClassName = () => {
    const baseClasses =
      "relative overflow-hidden w-full h-full border rounded-none px-2 py-2";

    if (disabled) {
      return `${baseClasses} bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed`;
    }

    if (hasError) {
      return `${baseClasses} border-red-500 bg-red-50 focus:border-red-700 focus:ring-0 focus:outline-0 focus:bg-red-50 hover:border-red-700`;
    }

    return `${baseClasses} border-sky-300 bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500 cursor-pointer`;
  };

  const renderDateField = (
    value: string,
    position: DateFieldPosition,
    placeholder: string,
    ref?: React.RefObject<HTMLInputElement>
  ) => (
    <div
      style={{
        position: "absolute",
        left: `${position.x / 10}%`,
        top: `${position.y / 10}%`,
        width: `${position.width / 10}%`,
        height: `${position.height / 10}%`,
        fontSize: `${14 * scale}px`,
      }}
      className="overflow-hidden"
    >
      <input
        ref={ref}
        type="text"
        value={value}
        onClick={disabled ? undefined : openDatepicker}
        placeholder={placeholder}
        className={getInputClassName()}
        readOnly
        disabled={disabled}
      />
      {required && (
        <span
          className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 rotate-45 transform origin-center transition-colors ${
            hasError ? "bg-red-400/70" : "bg-sky-300/70"
          }`}
        >
          <span className="absolute text-white top-[23px] left-[17px] text-lg">
            *
          </span>
        </span>
      )}
    </div>
  );

  return (
    <div ref={containerRef}>
      {renderDateField(day, dayPosition, "DD", dayInputRef)}
      {renderDateField(month, monthPosition, "MM")}
      {renderDateField(year, yearPosition, "YYYY")}
      <input
        ref={hiddenInputRef}
        type="text"
        style={{ display: "none" }}
        readOnly
        disabled={disabled}
      />
    </div>
  );
};

export default CustomDatePicker;
