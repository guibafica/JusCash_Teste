export const SignInBubblesBG = () => {
  return (
    <div className="max-sm:hidden">
      <div className="flex items-center justify-center h-[400px] w-[400px] absolute rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-main-green/10 z-20 top-10 right-10 blur-[20px]">
        <div className="h-[300px] w-[300px]  rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-main-blue/20 z-20 blur-[100px]" />
      </div>

      <div className="h-[300px] w-[300px] right-0 absolute rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-main-green/10 z-20 mt-[100px] blur-[8px] rotate-180" />

      <div className="flex items-center justify-center h-[150px] w-[150px] right-0 absolute rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-main-green/20 z-20 left-[50%] bottom-[10%]  blur-[20px] rotate-180">
        <div className="h-[300px] w-[300px] absolute rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-main-green/10 z-20 l-0 blur-[8px] rotate-180" />
      </div>
    </div>
  );
};
