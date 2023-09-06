"use client";

import { createContext } from "react";
import { UseFormRegister } from "react-hook-form";

interface IPrintConfigFormValues {
  printSize: string;
  wantsFrame: string;
  shipmentType: string;
}

interface IPrintConfigFormContext {
  onSubmit: () => void;
  register: UseFormRegister<IPrintConfigFormValues>;
}

const PrintConfigFormContext = createContext<
  IPrintConfigFormContext | undefined
>(undefined);

export type { IPrintConfigFormContext, IPrintConfigFormValues };
export default PrintConfigFormContext;