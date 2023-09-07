"use client";

import Body from "@atoms/Body";
import Flex from "@atoms/Flex";
import Heading from "@atoms/Heading";
import When from "@atoms/When";
import usePrintConfigFormContext from "@context/PrintFormContext";
import PrintOptionRadioButton from "@molecules/PrintOptionRadioButton";
import { css } from "@styled/css";

const PrintConfigForm = () => {
  const { register, onSubmit, errors } = usePrintConfigFormContext();

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDirection="column" gap="md">
        <Heading level="h6">Escoge tus opciones de compra</Heading>
        <fieldset id="print-size-options">
          <Flex flexDirection="column" gap="sm">
            <Body>1. Tamaño de impresión</Body>
            <PrintOptionRadioButton
              value="4x6"
              label="4x6 pulgadas"
              secondaryLabel="(10x15 cm)"
              {...register("printSize")}
            />
            <PrintOptionRadioButton
              value="custom"
              label="Me interesa otro tamaño*"
              {...register("printSize")}
            />
            <When condition={Boolean(errors?.printSize)}>
              <Body size="sm" fontStyle="italic" color="error">
                {errors?.printSize?.message}
              </Body>
            </When>
            <Body size="sm" weight="light" fontStyle="italic">
              * Se hará una cotización personalizada de acuerdo al tamaño
              deseado.
            </Body>
          </Flex>
        </fieldset>
        <Flex flexDirection="column" gap="sm">
          <Body>2. ¿Deseas agregar un marco?</Body>
          <fieldset id="wants-frame">
            <Flex flexDirection="column" gap="sm">
              <PrintOptionRadioButton
                value="without-frame"
                label="Sin marco"
                rightText="$150 MXN"
                {...register("wantsFrame")}
              />
              <PrintOptionRadioButton
                value="with-frame"
                label="Con marco"
                rightText="$280 MXN"
                {...register("wantsFrame")}
              />
              <When condition={Boolean(errors?.wantsFrame)}>
                <Body size="sm" fontStyle="italic" color="error">
                  {errors?.wantsFrame?.message}
                </Body>
              </When>
            </Flex>
          </fieldset>
        </Flex>
        <Flex flexDirection="column" gap="sm">
          <Body>3. ¿Cómo haremos la entrega de tu pedido?</Body>
          <fieldset id="shipment-type">
            <Flex flexDirection="column" gap="sm">
              <PrintOptionRadioButton
                value="delivery-point"
                label="Punto de entrega"
                rightText="Gratis"
                {...register("shipmentType")}
              />
              <PrintOptionRadioButton
                value="home-delivery"
                label="A domicilio"
                rightText="+ Envío**"
                {...register("shipmentType")}
              />
              <When condition={Boolean(errors?.shipmentType)}>
                <Body size="sm" fontStyle="italic" color="error">
                  {errors?.shipmentType?.message}
                </Body>
              </When>
              <Body size="sm" weight="light" fontStyle="italic">
                ** Los precios de envío se cotizan según la distancia.
              </Body>
            </Flex>
          </fieldset>
        </Flex>
        <div
          className={css({
            position: {
              base: "fixed",
              md: "relative",
            },
            width: "100%",
            bottom: {
              base: "0",
            },
            left: {
              base: "0",
            },
            paddingY: "20px",
            background: "white",
            boxShadow: {
              base: "0 4px 30px rgba(0, 0, 0, 0.1)",
              md: "none",
            },
            display: "grid",
          })}
        >
          <button
            type="submit"
            className={css({
              backgroundColor: "#25D366",
              borderRadius: "10px",
              padding: "10px 20px",
              width: {
                base: "90%",
                md: "100%",
              },
              cursor: "pointer",
              _hover: {
                backgroundColor:
                  "color-mix(in lch, #25D366, token(colors.white) 5%)",
              },
              justifySelf: "center",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            })}
          >
            <Heading level="h6" color="white">
              Ordenar por $280 MXN
            </Heading>
          </button>
        </div>
      </Flex>
    </form>
  );
};

export default PrintConfigForm;
