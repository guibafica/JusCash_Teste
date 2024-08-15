interface IButtonProps {
  text: string;
  type: "button" | "submit";
  onClick?: () => void;
}

export const Button = ({ text, type, onClick }: IButtonProps) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick ? onClick : () => {}}
        className="bg-main-green py-1 px-5 rounded-md text-white font-medium transition-all hover:shadow-lg hover:bg-green-500"
      >
        {text}
      </button>
    </>
  );
};
