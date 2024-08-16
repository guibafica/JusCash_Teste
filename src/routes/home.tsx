import { useCallback, useState } from "react";

import { Loading } from "../components/Loading";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { LeadTable } from "../components/LeadTable";
import { AddLeadModal } from "../components/AddLeadModal";

import jusCashLogo from "../assets/jusCashLogo-noBg.png";

export function Home() {
  const [loading] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  const handleOpenNewLeadModal = useCallback(() => {
    setIsAddLeadModalOpen(true);
  }, []);

  const handleCloseNewLeadModal = useCallback(() => {
    setIsAddLeadModalOpen(false);
  }, []);

  return (
    <>
      <Loading isLoading={loading} />
      <Header />
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={handleCloseNewLeadModal}
      />

      <div className="h-screen w-screen flex items-center justify-center bg-slate-100">
        <div className="h-full w-full max-w-7xl px-10 pt-14 flex flex-col items-center justify-start max-sm:px-5">
          <div className="w-full mt-10 flex flex-row items-center justify-between">
            <img src={jusCashLogo} alt="JusCash Logo" className="w-80" />

            <Button
              text="+ Novo Lead"
              type="button"
              style="blue"
              onClick={handleOpenNewLeadModal}
            />
          </div>

          <div className="w-full mt-20 flex items-center justify-center">
            <LeadTable />
          </div>
        </div>
      </div>
    </>
  );
}
