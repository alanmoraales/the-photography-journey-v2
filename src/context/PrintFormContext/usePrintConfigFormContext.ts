"use client";

import { useContext } from "react";
import PrintConfigFormContext from "./PrintConfigFormContext";

const usePrintConfigFormContext = () => {
  const contextValue = useContext(PrintConfigFormContext);

  if (!contextValue) {
    throw new Error(
      "usePrintConfigFormContext must be used within a PrintConfigFormProvider"
    );
  }
  return contextValue;
};

export default usePrintConfigFormContext;
