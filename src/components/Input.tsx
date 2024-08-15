import { useEffect, useRef, useCallback, useState } from "react";
import { useField } from "@unform/core";
import { twMerge } from "tailwind-merge";
import { CircleAlert, EyeOff, Eye } from "lucide-react";

import { Tooltip } from "./Tooltip";

interface IInputProps {
  name: string;
  title: string;
  placeholder?: string;
  type?: "password" | "text";
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
}

export const Input = ({
  name,
  title,
  placeholder,
  type = "text",
  className,
  disabled = false,
  isRequired = false,
  ...rest
}: IInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFilled, setIsFilled] = useState(false);
  const [inputType, setInputType] = useState(type);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleShowPassword = useCallback(() => {
    if (inputType === "password") setInputType("text");
    if (inputType === "text") setInputType("password");
  }, [inputType]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <>
      <div className={twMerge("flex flex-row items-center", className)}>
        <h1 className="text-main-blue text-sm font-medium">{title}</h1>

        {isRequired && <span className="text-red-700 ml-1">*</span>}

        {error && (
          <Tooltip title={error}>
            <CircleAlert className="text-red-700 size-5" />
          </Tooltip>
        )}
      </div>

      <div
        className={twMerge(
          "flex items-center justify-between border border-solid w-full transition-all border-main-blue duration-400 ease-in-out h-9 rounded-md px-2 bg-white focus:border-slate-400 focus:shadow-md",
          error ? "border-red-700" : "",
          isFilled ? "border-main-green" : "border-main-blue",
          disabled && "bg-slate-200 cursor-not-allowed border-slate-300"
        )}
      >
        <input
          className={twMerge(
            "h-full text-slate-700 text-lg bg-transparent outline-none placeholder-slate-500 disabled:cursor-not-allowed",
            type === "password" ? "w-11/12" : "w-full"
          )}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={inputType}
          ref={inputRef}
          disabled={disabled}
          {...rest}
        />

        {type === "password" && (
          <div
            onClick={handleShowPassword}
            className="w-1/12 h-full flex items-center justify-center cursor-pointer text-slate-500 transition-all hover:text-slate-700"
          >
            {inputType === "password" ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </div>
        )}
      </div>
    </>
  );
};
