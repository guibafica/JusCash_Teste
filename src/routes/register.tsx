import { useRef } from "react";
import { Form } from "@unform/web";

import { Input } from "../components/Input";

import jusCashLogo from "../assets/jusCashLogo.png";

export function Register() {
  const formRef = useRef(null);

  return (
    <>
      <div className="w-screen h-screen z-10 absolute bg-main-blue/75 blur-sm" />

      <div className="h-screen w-screen flex flex-row items-center justify-center bg-no-repeat bg-cover bg-computer-typing">
        <div className="z-20 p-8 bg-white rounded-lg flex flex-col items-center justify-center shadow-xl">
          <img src={jusCashLogo} alt="JusCash Logo" className="w-80" />

          <Form ref={formRef} onSubmit={() => {}}>
            <Input
              name="fullName"
              placeholder="Informe seu nome completo"
              title="Seu nome completo"
            />
          </Form>
        </div>
      </div>
    </>
  );
}
