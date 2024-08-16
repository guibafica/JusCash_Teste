import { useRef, useState, useCallback } from "react";
import { Form } from "@unform/web";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";

import { Loading } from "../components/Loading";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { SignInBubblesBG } from "../components/SignInBubblesBG";

import { getValidationErrors } from "../utils/getValidationErrors";

import { UseAuth } from "../hooks/auth";

import typingVideo from "../assets/typingVideo1.mp4";
import jusCashLogo from "../assets/jusCashLogo.png";

interface IFormDataProps {
  email: string;
  password: string;
}

export function SignIn() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { signIn } = UseAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: IFormDataProps) => {
      try {
        setLoading(true);

        // @ts-expect-error type error
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Informe um e-mail válido"),
          password: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = await signIn(data);

        console.log(token);

        if (token) navigate("/home");

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
    [navigate, signIn]
  );

  const handleNavigateToRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <>
      <Loading isLoading={loading} />

      <div className="w-screen h-screen z-10 absolute bg-main-blue/75" />
      <SignInBubblesBG />

      <div className="w-screen h-screen overflow-hidden flex flex-row items-center justify-between">
        <div className="h-screen w-1/2 max-sm:w-full">
          <video
            src={typingVideo}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
        </div>

        <div className="h-[200vh] w-full absolute -right-[40%] border-l-8 border-blue-900 rotate-12 bg-main-blue flex items-start max-sm:hidden" />

        <div className="w-1/2 h-full flex items-center justify-center z-40 max-sm:w-full max-sm:absolute">
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
              <Input name="email" title="E-mail:" isRequired />

              <Input
                name="password"
                title="Senha:"
                type="password"
                isRequired
                className="mt-3"
              />

              <div
                className="w-full flex justify-end"
                onClick={handleNavigateToRegister}
              >
                <span className="text-main-blue text-sm font-medium cursor-pointer mt-3 hover:underline">
                  Não possui uma conta? Cadastre agora
                </span>
              </div>

              <div className="w-full flex justify-center mt-6">
                <Button text="Entrar" type="submit" />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
