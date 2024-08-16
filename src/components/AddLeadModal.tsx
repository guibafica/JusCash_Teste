import { useRef, useCallback, useState } from "react";
import { X } from "lucide-react";
import { Form } from "@unform/web";
import { toast } from "sonner";
import * as Yup from "yup";

import { Input } from "./Input";
import { Button } from "./Button";
import { Loading } from "./Loading";

import { UseLead } from "../hooks/lead";

import { getValidationErrors } from "../utils/getValidationErrors";

interface IAddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IFormDataProps {
  fullName: string;
  email: string;
  phone: string;
}

interface ILeadProps {
  name: string;
  email: string;
  phone: string;
  checkboxSuccumbencialsValue: boolean;
  checkboxContractualValue: boolean;
  checkboxDativesValue: boolean;
  checkboxCreditValue: boolean;
}

export const AddLeadModal = ({ isOpen, onClose }: IAddLeadModalProps) => {
  const formRef = useRef(null);
  const { createLead } = UseLead();

  const [loading, setLoading] = useState(false);

  const [checkboxAll, setCheckboxAll] = useState(true);
  const [checkboxSuccumbencials, setCheckboxSuccumbencials] = useState(true);
  const [checkboxContractual, setCheckboxContractual] = useState(true);
  const [checkboxDatives, setCheckboxDatives] = useState(true);
  const [checkboxCredit, setCheckboxCredit] = useState(true);

  const handleSubmit = useCallback(
    async (data: IFormDataProps) => {
      try {
        setLoading(true);

        const phoneReg = /^[0-9]{10,15}$/;

        // @ts-expect-error type error
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          fullName: Yup.string().required("Nome completo obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Informe um e-mail válido"),
          phone: Yup.string()
            .required("Telefone obrigatório")
            .matches(phoneReg, "Informe um telefone válido"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const newLeadData: ILeadProps = {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          checkboxSuccumbencialsValue: checkboxSuccumbencials,
          checkboxContractualValue: checkboxContractual,
          checkboxDativesValue: checkboxDatives,
          checkboxCreditValue: checkboxCredit,
        };

        createLead(newLeadData);

        onClose();
        toast.success("Lead incluído com sucesso");

        setLoading(false);
      } catch (error) {
        setLoading(false);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          // @ts-expect-error type error
          formRef.current?.setErrors(errors);

          toast.error("Verifique o formulário e tente novamente");

          return;
        }

        toast.error("Error desconhecido, tente novamente mais tarde");
      }
    },
    [
      checkboxSuccumbencials,
      checkboxContractual,
      checkboxDatives,
      checkboxCredit,
      createLead,
      onClose,
    ]
  );

  const handleCheckAll = useCallback(() => {
    setCheckboxAll(!checkboxAll);
    setCheckboxSuccumbencials(!checkboxAll);
    setCheckboxContractual(!checkboxAll);
    setCheckboxDatives(!checkboxAll);
    setCheckboxCredit(!checkboxAll);
  }, [checkboxAll]);

  return (
    <>
      <Loading isLoading={loading} />

      {isOpen && (
        <div className="w-screen h-screen fixed flex items-center justify-center z-30 bg-slate-700/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6px]">
          <div className="bg-white w-[800px] flex flex-col items-start justify-center p-4 rounded-md">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-main-blue text-lg font-medium">Novo Lead</h1>

              <div
                className="flex items-center justify-center cursor-pointer p-1"
                onClick={onClose}
              >
                <X className="text-main-blue" size={16} />
              </div>
            </div>

            <h1 className="text-main-blue font-medium mt-4 mb-1">
              Dados do Lead
            </h1>

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              className="w-full"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <div className="w-2/3">
                <Input name="fullName" title="Nome Completo:" isRequired />

                <Input
                  name="email"
                  title="E-mail:"
                  isRequired
                  className="mt-3"
                />

                <Input
                  name="phone"
                  title="Telefone:"
                  isRequired
                  className="mt-3"
                />
              </div>

              <h1 className="text-main-blue font-medium mt-4 mb-1">
                Oportunidades
              </h1>

              <div className="space-y-2">
                <div
                  className="flex gap-1 cursor-pointer"
                  onClick={handleCheckAll}
                >
                  <input
                    type="checkbox"
                    checked={checkboxAll}
                    onClick={handleCheckAll}
                  />

                  <h1 className="text-main-blue text-xs font-medium">Todos</h1>
                </div>

                <div
                  className="flex gap-1 cursor-pointer"
                  onClick={() =>
                    setCheckboxSuccumbencials(!checkboxSuccumbencials)
                  }
                >
                  <input
                    type="checkbox"
                    checked={checkboxSuccumbencials}
                    onClick={() =>
                      setCheckboxSuccumbencials(!checkboxSuccumbencials)
                    }
                  />

                  <h1 className="text-main-blue text-xs font-medium">
                    Honorários Sucumbenciais
                  </h1>
                </div>

                <div
                  className="flex gap-1 cursor-pointer"
                  onClick={() => setCheckboxContractual(!checkboxContractual)}
                >
                  <input
                    type="checkbox"
                    checked={checkboxContractual}
                    onClick={() => setCheckboxContractual(!checkboxContractual)}
                  />

                  <h1 className="text-main-blue text-xs font-medium">
                    Honorários Contratuais
                  </h1>
                </div>

                <div
                  className="flex gap-1 cursor-pointer"
                  onClick={() => setCheckboxDatives(!checkboxDatives)}
                >
                  <input
                    type="checkbox"
                    checked={checkboxDatives}
                    onClick={() => setCheckboxDatives(!checkboxDatives)}
                  />

                  <h1 className="text-main-blue text-xs font-medium">
                    Honorários Dativos
                  </h1>
                </div>

                <div
                  className="flex gap-1 cursor-pointer"
                  onClick={() => setCheckboxCredit(!checkboxCredit)}
                >
                  <input
                    type="checkbox"
                    checked={checkboxCredit}
                    onClick={() => setCheckboxCredit(!checkboxCredit)}
                  />

                  <h1 className="text-main-blue text-xs font-medium">
                    Crédito do Autor
                  </h1>
                </div>
              </div>

              <div className="w-full flex justify-end mt-6 gap-8">
                <Button
                  text="Cancelar"
                  type="button"
                  style="outlined-blue"
                  onClick={onClose}
                />

                <Button text="Salvar" type="submit" style="blue" />
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
