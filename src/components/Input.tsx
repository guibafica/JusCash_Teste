import { useEffect, useRef, useCallback, useState } from "react";
import { useField } from "@unform/core";
import { twMerge } from "tailwind-merge";
import { CircleAlert } from "lucide-react";

import { Tooltip } from "./Tooltip";

interface IInputProps {
  name: string;
  title: string;
  placeholder: string;
  type?: "password";
  disabled?: boolean;
}

export const Input = ({
  name,
  title,
  placeholder,
  type,
  disabled = false,
  ...rest
}: IInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div
      className={twMerge(
        "relative border border-purple-600",
        isFilled ? "border-red-600" : "border-green-600"
      )}
    >
      <div className="flex flex-row items-center">
        <h1 className="text-main-blue">{title}</h1>
        {/* 
        {error && (
          <Tooltip title={error}> */}
        <Tooltip title={"error"}>
          <CircleAlert className="text-red-700 size-5 ml-3" />
        </Tooltip>
        {/* )} */}
      </div>

      <input
        className={twMerge(
          "border-t border-r border-l border-solid border-gray-300 border-b-2 border-b-gray-700 w-full text-gray-600 transition-all duration-400 ease-in-out h-14 text-xl rounded-lg mt-[-8px] px-4 shadow-[0_4px_10px_rgba(0,0,0,0.1)] bg-white/50 focus:border-b-2 focus:border-blue-600 placeholder-gray-500 disabled:bg-slate-300 disabled:cursor-not-allowed",
          error ? "border-red-700" : ""
        )}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type ? type : "text"}
        ref={inputRef}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};
