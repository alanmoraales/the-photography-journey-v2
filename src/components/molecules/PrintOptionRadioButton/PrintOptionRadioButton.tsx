"use client";

import Body from "@atoms/Body";
import Flex from "@atoms/Flex";
import Heading from "@atoms/Heading";
import When from "@atoms/When";
import { css } from "@styled/css";
import { ChangeEventHandler, FocusEventHandler, forwardRef } from "react";

interface IPrintOptionRadioButtonProps {
  value: string;
  label: string;
  secondaryLabel?: string;
  rightText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

// eslint-disable-next-line react/display-name
const PrintOptionRadioButton = forwardRef<
  HTMLInputElement,
  IPrintOptionRadioButtonProps
>(
  (
    { value, label, secondaryLabel = "", rightText = "", ...inputProps },
    ref
  ) => {
    return (
      <label htmlFor={value}>
        <div
          className={css({
            display: "flex",
            gap: "md",
            justifyContent: "space-between",
            padding: "token(spacing.xsm) token(spacing.sm)",
            borderRadius: "0.7rem",
            border: "1px solid token(colors.gray)",
            cursor: "pointer",
            "&:has(input:checked)": {
              backgroundColor: "primary",
              color: "white",
              border: "1px solid token(colors.primary.light)",
            },
            "&:hover": {
              backgroundColor:
                "color-mix(in lch, token(colors.primary.light) 50%, rgba(211, 208, 221, 1))",
              color: "white",
              border: "1px solid token(colors.primary.light)",
            },
          })}
        >
          <Flex gap="sm" alignItems="center">
            <input
              type="radio"
              value={value}
              id={value}
              ref={ref}
              {...inputProps}
              className={css({
                WebkitAppearance: "none",
                appearance: "none",
                backgroundColor: "token(colors.white)",
                margin: 0,
                font: "inherit",
                color: "currentColor",
                width: "16px",
                height: "16px",
                border: "1px solid currentColor",
                borderRadius: "50%",
                display: "grid",
                placeContent: "center",
                "&::before": {
                  content: '""',
                  display: "block",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  transform: "scale(0)",
                  transition: "120ms transform ease-in-out",
                  boxShadow: "inset 1em 1em token(colors.primary.light)",
                },
                "&:checked::before": {
                  transform: "scale(1)",
                },
              })}
            />
            <Heading level="h6" color="inherit">
              {label}
            </Heading>
            <When condition={Boolean(secondaryLabel)}>
              <Body color="inherit">{secondaryLabel}</Body>
            </When>
          </Flex>
          <When condition={Boolean(rightText)}>
            <Body color="inherit">{rightText}</Body>
          </When>
        </div>
      </label>
    );
  }
);

export default PrintOptionRadioButton;
