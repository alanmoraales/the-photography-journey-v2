"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PrintConfigFormContext, {
  IPrintConfigFormContext,
  IPrintConfigFormValues,
} from "./PrintConfigFormContext";
import type { ReactNode } from "react";
import type { IPrintSizes } from "@services/notion";
import environmentService from "@services/environment";

const printConfigSchema = yup.object().shape({
  printSize: yup.string().required("Debes seleccionar un tamaño de impresión"),
  wantsFrame: yup.string().required("Debes seleccionar una opción de marco"),
  shipmentType: yup.string().required("Debes seleccionar un tipo de envío"),
});

interface IPrintConfigFormProviderProps {
  children: ReactNode;
  availableSizes: IPrintSizes[];
  printTitle: string;
}

const PrintConfigFormProvider = ({
  children,
  availableSizes,
  printTitle,
}: IPrintConfigFormProviderProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<IPrintConfigFormValues>({
    defaultValues: {
      printSize: "",
      wantsFrame: "with-frame",
      shipmentType: "",
    },
    resolver: yupResolver(printConfigSchema),
  });
  const printSizeValue = watch("printSize");
  const hasSelectedPrintSize = Boolean(printSizeValue);
  const wantsFrame = watch("wantsFrame");
  const shipmentType = watch("shipmentType");
  const isCustomSize = printSizeValue === "custom";
  const selectedPrintSize = availableSizes.find(
    (size) => size.id === printSizeValue
  );
  const frameOptionPrice = isCustomSize
    ? 0
    : wantsFrame === "with-frame"
    ? selectedPrintSize?.prices.withFrame
    : selectedPrintSize?.prices.withoutFrame;
  const deliveryIsFree =
    shipmentType === "delivery-point" || shipmentType === "pick-up";

  const onSubmit = handleSubmit((printConfig) => {
    const printSizeMessage = isCustomSize
      ? `Hola, me gustaría cotizar la foto ${printTitle} en un tamaño personalizado`
      : `Hola, me gustaría ordernar la foto ${printTitle} en el tamaño de ${printConfig.printSize} pulgadas`;
    const frameOptionsMessages = {
      "with-frame": "con marco",
      "without-frame": "sin marco",
    };
    const deliveryTypeMessages = {
      "delivery-point": "Para recoger en punto de entrega",
      "pick-up": "Para recoger en tienda",
      "home-delivery": "Me gustaría envío a domicilio",
    };

    const whatsappNumber = environmentService.whatsapp.number;
    // @ts-ignore
    const frameOptionMessage = frameOptionsMessages[printConfig.wantsFrame];
    // @ts-ignore
    const deliveryTypeMessage = deliveryTypeMessages[printConfig.shipmentType];
    const message = `${printSizeMessage}, ${frameOptionMessage}. 
    ${deliveryTypeMessage}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
  });

  const contextValue: IPrintConfigFormContext = {
    onSubmit,
    register,
    errors,
    availableSizes,
    hasSelectedPrintSize,
    isCustomSize,
    selectedPrintSize,
    frameOptionPrice,
    deliveryIsFree,
  };
  return (
    <PrintConfigFormContext.Provider value={contextValue}>
      {children}
    </PrintConfigFormContext.Provider>
  );
};

export default PrintConfigFormProvider;
