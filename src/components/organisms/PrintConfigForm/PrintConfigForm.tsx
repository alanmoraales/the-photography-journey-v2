"use client";

import Body from "@atoms/Body";
import Flex from "@atoms/Flex";
import Heading from "@atoms/Heading";
import usePrintConfigFormContext from "@context/PrintFormContext";
import PrintOptionRadioButton from "@molecules/PrintOptionRadioButton";

const PrintConfigForm = () => {
  const { register, onSubmit } = usePrintConfigFormContext();

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
              <Body size="sm" weight="light" fontStyle="italic">
                ** Los precios de envío se cotizan según la distancia.
              </Body>
            </Flex>
          </fieldset>
        </Flex>
        <button type="submit">Ordenar</button>
      </Flex>
    </form>
  );
};

export default PrintConfigForm;
