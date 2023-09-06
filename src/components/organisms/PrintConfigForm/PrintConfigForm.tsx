"use client";

import Body from "@atoms/Body";
import Flex from "@atoms/Flex";
import Heading from "@atoms/Heading";
import usePrintConfigFormContext from "@context/PrintFormContext";

const PrintConfigForm = () => {
  const { register, onSubmit } = usePrintConfigFormContext();

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDirection="column" gap="md">
        <Heading level="h6">Escoge tus opciones de compra</Heading>
        <fieldset id="print-size-options">
          <Flex flexDirection="column" gap="sm">
            <Body>1. Tamaño de impresión</Body>
            <input
              type="radio"
              value="6x4"
              id="6x4"
              {...register("printSize")}
            />
            <label htmlFor="6x4">6x4 pulgadas (15 x 10 cm)</label>
            <input
              type="radio"
              value="custom"
              id="custom"
              {...register("printSize")}
            />
            <label htmlFor="custom">Me interesa otro tamaño*</label>
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
              <input
                type="radio"
                value="without-frame"
                id="without-frame"
                {...register("wantsFrame")}
              />
              <label htmlFor="without-frame">Sin marco</label>
              <input
                type="radio"
                value="with-frame"
                id="with-frame"
                {...register("wantsFrame")}
              />
              <label htmlFor="with-frame">Con marco</label>
            </Flex>
          </fieldset>
        </Flex>
        <Flex flexDirection="column" gap="sm">
          <Body>3. ¿Cómo haremos la entrega de tu pedido?</Body>
          <fieldset id="shipment-type">
            <Flex flexDirection="column" gap="sm">
              <input
                type="radio"
                value="delivery-point"
                id="delivery-point"
                {...register("shipmentType")}
              />
              <label htmlFor="delivery-point">Punto de entrega</label>
              <input
                type="radio"
                value="home-delivery"
                id="home-delivery"
                {...register("shipmentType")}
              />
              <label htmlFor="home-delivery">A domicilio</label>
            </Flex>
          </fieldset>
        </Flex>
        <button type="submit">Ordenar</button>
      </Flex>
    </form>
  );
};

export default PrintConfigForm;
