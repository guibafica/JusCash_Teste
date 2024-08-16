import { useRef, useCallback, useState } from "react";
import { Form } from "@unform/web";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

import { getValidationErrors } from "../utils/getValidationErrors";

import { UseUser } from "../hooks/user";

import jusCashLogo from "../assets/jusCashLogo.png";

interface IFormDataProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Register() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { createUser } = UseUser();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: IFormDataProps) => {
      try {
        setLoading(true);

        // @ts-expect-error type error
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          fullName: Yup.string().required("Nome completo é obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Informe um e-mail válido"),
          password: Yup.string()
            .required("Senha obrigatória")
            .min(8, "Senha deve conter no mínimo 8 caracteres")
            .matches(
              /[a-zA-Z]/,
              "A senha deve conter pelo menos um caractere alfanumérico"
            )
            .matches(
              /[0-9]/,
              "A senha deve conter pelo menos um caractere numérico"
            )
            .matches(
              /[\W_]/,
              "A senha deve conter pelo menos um caractere especial"
            ),
          confirmPassword: Yup.string()
            .required("Senha obrigatória")
            .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // api request
        createUser({
          email: data.email,
          fullName: data.fullName,
          password: data.password,
        });

        toast.success("Conta criada com sucesso!");

        navigate("/signIn");

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
    [navigate, createUser]
  );

  const handleNavigateToSignIn = useCallback(() => {
    navigate("/signIn");
  }, [navigate]);

  return (
    <>
      <Loading isLoading={loading} />

      <div className="w-screen h-screen z-10 absolute bg-main-blue/75 blur-sm" />

      <div className="h-screen w-screen flex flex-row items-center justify-center bg-no-repeat bg-cover bg-computer-typing">
        <div className="z-20 px-8 pb-3 pt-6 bg-white w-[450px] rounded-lg flex flex-col items-center justify-center shadow-xl gap-8 max-sm:w-11/12">
          <img src={jusCashLogo} alt="JusCash Logo" className="w-80" />

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <Input
              name="fullName"
              // placeholder="Informe seu nome completo"
              title="Seu nome completo:"
              isRequired
            />

            <Input name="email" title="E-mail:" isRequired className="mt-3" />

            <Input
              name="password"
              title="Senha:"
              type="password"
              isRequired
              className="mt-3"
            />

            <Input
              name="confirmPassword"
              title="Confirme sua senha:"
              type="password"
              isRequired
              className="mt-3"
            />

            <div
              className="w-full flex justify-end"
              onClick={handleNavigateToSignIn}
            >
              <span className="text-main-blue text-sm font-medium cursor-pointer mt-3 hover:underline">
                Já possui uma conta? Fazer o login
              </span>
            </div>

            <div className="w-full flex justify-center mt-6">
              <Button text="Criar conta" type="submit" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
