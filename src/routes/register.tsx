import { useRef, useCallback, useState } from "react";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import jusCashLogo from "../assets/jusCashLogo.png";

export function Register() {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data) => {
    try {
      //implementar loading
      setLoading(true);

      // @ts-expect-error type error
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        fullName: Yup.string().required("Nome completo é obrigatório"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Informe um e-mail válido"),
        password: Yup.string().required("Senha obrigatória"),
        confirmPassword: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // add mais validações senha
      // validação senhas iguais e setar error senha

      // add toast

      // navegar

      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error instanceof Yup.ValidationError) {
        // implementar validationError
        // const errors = getValidationErrors(error);

        // @ts-expect-error type error
        formRef.current?.setErrors(errors);

        return;
      }

      // add toast
    }
  }, []);

  return (
    <>
      <div className="w-screen h-screen z-10 absolute bg-main-blue/75 blur-sm" />

      <div className="h-screen w-screen flex flex-row items-center justify-center bg-no-repeat bg-cover bg-computer-typing">
        <div className="z-20 px-8 pb-3 pt-6 bg-white w-[450px] rounded-lg flex flex-col items-center justify-center shadow-xl gap-8">
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

            <div className="w-full flex justify-end">
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
