import { LoaderCircle } from "lucide-react";

interface ILoadingProps {
  isLoading: boolean;
}

export const Loading = ({ isLoading }: ILoadingProps) => {
  return (
    <>
      {isLoading && (
        <div className="w-screen h-screen fixed flex items-center justify-center z-50 bg-slate-700/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6px]">
          <LoaderCircle className="text-main-blue animate-spin" size={40} />
        </div>
      )}
    </>
  );
};
