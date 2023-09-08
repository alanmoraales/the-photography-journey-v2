"use client";

import { IPrintSizes } from "@services/notion";
import { createContext } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

interface IPrintConfigFormValues {
  printSize: string;
  wantsFrame: string;
  shipmentType: string;
}

interface IPrintConfigFormContext {
  onSubmit: () => void;
  register: UseFormRegister<IPrintConfigFormValues>;
  errors: FieldErrors<IPrintConfigFormValues>;
  availableSizes: IPrintSizes[];
  hasSelectedPrintSize: boolean;
  isCustomSize: boolean;
  selectedPrintSize: IPrintSizes | undefined;
  frameOptionPrice: number | undefined;
  deliveryIsFree: boolean;
}

const PrintConfigFormContext = createContext<
  IPrintConfigFormContext | undefined
>(undefined);

export type { IPrintConfigFormContext, IPrintConfigFormValues };
export default PrintConfigFormContext;
