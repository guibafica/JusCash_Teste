import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";

interface ICreateLeadProps {
  name: string;
  email: string;
  phone: string;
  checkboxSuccumbencialsValue: boolean;
  checkboxContractualValue: boolean;
  checkboxDativesValue: boolean;
  checkboxCreditValue: boolean;
}

interface ILeadProps extends ICreateLeadProps {
  id: string;
}

interface ILeadContextData {
  leads: ILeadProps[];
  createLead(payload: ICreateLeadProps): void;
  getLead(id: string): ILeadProps | undefined;
}

interface IAppProviderProps {
  children: ReactNode;
}

export const LeadContext = createContext<ILeadContextData>(
  {} as ILeadContextData
);

export const LeadProvider: React.FC<IAppProviderProps> = ({ children }) => {
  const [leads, setLeads] = useState<ILeadProps[]>([]);

  const createLead = useCallback(async (payload: ICreateLeadProps) => {
    const generatedId = uuidv4();

    const localItemLeads = localStorage.getItem("@jusCash:leads") || "[]";

    const newLeadArray: ILeadProps[] = [
      ...JSON.parse(localItemLeads),
      {
        id: generatedId,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        checkboxSuccumbencialsValue: payload.checkboxSuccumbencialsValue,
        checkboxContractualValue: payload.checkboxContractualValue,
        checkboxDativesValue: payload.checkboxDativesValue,
        checkboxCreditValue: payload.checkboxCreditValue,
      },
    ];

    console.log("LEADS 2: ", newLeadArray);

    localStorage.setItem("@jusCash:leads", JSON.stringify(newLeadArray));
    setLeads(newLeadArray);
  }, []);

  const getLead = useCallback(
    (id: string) => {
      const foundLead = leads.find((lead) => lead.id === id);

      return foundLead;
    },
    [leads]
  );

  const loadData = useCallback(() => {
    const localItemLeads = localStorage.getItem("@jusCash:leads");

    if (localItemLeads && localItemLeads?.length > 0) {
      setLeads(JSON.parse(localItemLeads));

      return;
    }

    const defaultLeads = [
      {
        id: uuidv4(),
        name: "AWS Advocacia",
        email: "aws@email.com",
        phone: "(38) 3419-3563",
        checkboxSuccumbencialsValue: true,
        checkboxContractualValue: true,
        checkboxDativesValue: false,
        checkboxCreditValue: true,
      },
      {
        id: uuidv4(),
        name: "Ricardo Almeida Advg",
        email: "ricardoADVG@email.com",
        phone: "(34) 2261-1911",
        checkboxSuccumbencialsValue: false,
        checkboxContractualValue: true,
        checkboxDativesValue: true,
        checkboxCreditValue: false,
      },
      {
        id: uuidv4(),
        name: "Fernanda Soares ADV",
        email: "fernandaADV@email.com",
        phone: "(28) 2736-6697",
        checkboxSuccumbencialsValue: true,
        checkboxContractualValue: true,
        checkboxDativesValue: true,
        checkboxCreditValue: true,
      },
    ];

    localStorage.setItem("@jusCash:leads", JSON.stringify(defaultLeads));
    setLeads(defaultLeads);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <LeadContext.Provider value={{ leads, createLead, getLead }}>
      {children}
    </LeadContext.Provider>
  );
};

export function UseLead(): ILeadContextData {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error("useLead mut be user within an UserProvider");
  }

  return context;
}
