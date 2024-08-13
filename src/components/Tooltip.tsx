import { ReactNode } from "react";

interface ITooltipProps {
  title: string;
  children: ReactNode;
}

export const Tooltip = ({ title, children }: ITooltipProps) => {
  return (
    <>
      <div className="relative group">
        {children}

        <span
          className="
            flex justify-center bg-red-700 p-2 rounded font-normal text-sm opacity-0 transition-opacity duration-400 invisible absolute bottom-[calc(100%_+_12px)] left-1/2 transform -translate-x-1/2 w-40 text-gray-50 z-30 group-hover:visible group-hover:opacity-100
            before:content-[''] before:border-solid before:border-t-[8px] before:border-t-red-700 before:border-x-[6px] before:border-x-transparent before:border-b-0 before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2
          "
        >
          {title}
        </span>
      </div>
    </>
  );
};
