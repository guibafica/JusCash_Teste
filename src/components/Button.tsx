import { twMerge } from "tailwind-merge";

interface IButtonProps {
  text: string;
  type: "button" | "submit";
  onClick?: () => void;
  style?: "green" | "outlined-red" | "blue" | "outlined-blue";
}

export const Button = ({
  text,
  type,
  onClick,
  style = "green",
}: IButtonProps) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick ? onClick : () => {}}
        className={twMerge(
          "py-1 px-5 rounded-md font-medium transition-all hover:shadow-lg",
          style === "green" && "bg-main-green text-white hover:bg-green-500",
          style === "outlined-red" &&
            "bg-transparent text-red-500 border-red-500 border hover:bg-red-500 hover:text-white hover:border-white",
          style === "blue" &&
            "bg-blue-400 border border-blue-400 text-white hover:bg-blue-500",
          style === "outlined-blue" &&
            "bg-transparent text-blue-400 border-blue-400 border hover:bg-blue-500 hover:text-white hover:border-white"
        )}
      >
        {text}
      </button>
    </>
  );
};
