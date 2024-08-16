import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";

import { UseAuth } from "../hooks/auth";

import favIcon from "../../public/favIcon.png";

export const Header = () => {
  const { user, signOut } = UseAuth();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    signOut();

    navigate("/signIn");
  }, [signOut, navigate]);

  return (
    <>
      <div className="fixed top-0 w-screen h-14 bg-white shadow-sm flex items-center justify-center">
        <div className="h-full w-full max-w-7xl px-10 flex items-center justify-between max-sm:px-5">
          <div className="h-full flex flex-row items-center justify-start gap-4">
            <div className="size-10 rounded-full flex items-center justify-center overflow-hidden">
              <img src={favIcon} alt="JusCash Logo" className="w-full" />
            </div>

            <div className="h-5/6 w-[1px] bg-slate-200 max-sm:hidden" />

            <h1 className="text-main-blue font-medium text-lg max-sm:hidden">
              Olá, {user?.name.split(" ")[0]}
            </h1>
          </div>

          <Button
            text="Sair"
            type="button"
            style="outlined-red"
            onClick={logout}
          />
        </div>
      </div>
    </>
  );
};
