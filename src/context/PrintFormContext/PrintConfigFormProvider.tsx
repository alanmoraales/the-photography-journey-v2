"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PrintConfigFormContext, {
  IPrintConfigFormContext,
  IPrintConfigFormValues,
} from "./PrintConfigFormContext";
import type { ReactNode } from "react";

const printConfigSchema = yup.object().shape({
  printSize: yup.string().required("Debes seleccionar un tamaño de impresión"),
  wantsFrame: yup.string().required("Debes seleccionar una opción de marco"),
  shipmentType: yup.string().required("Debes seleccionar un tipo de envío"),
});

interface IPrintConfigFormProviderProps {
  children: ReactNode;
}

const PrintConfigFormProvider = ({
  children,
}: IPrintConfigFormProviderProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IPrintConfigFormValues>({
    defaultValues: {
      printSize: "",
      wantsFrame: "with-frame",
      shipmentType: "",
    },
    resolver: yupResolver(printConfigSchema),
  });
  console.log(errors);

  const onSubmit = handleSubmit((printConfig) => {
    /**
     * @todo Implement WhatsApp redirect with config in the message
     */
    console.log(printConfig);
  });

  const contextValue: IPrintConfigFormContext = {
    onSubmit,
    register,
  };
  return (
    <PrintConfigFormContext.Provider value={contextValue}>
      {children}
    </PrintConfigFormContext.Provider>
  );
};

export default PrintConfigFormProvider;
