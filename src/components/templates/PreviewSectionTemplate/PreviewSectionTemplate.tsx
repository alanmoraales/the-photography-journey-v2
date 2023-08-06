import Flex from "@atoms/Flex";
import GoToLink from "@atoms/GoToLink";
import Heading from "@atoms/Heading";
import PageLimitContainer from "@atoms/PageLimitContainer";
import When from "@atoms/When";
import { ReactNode } from "react";

interface IPreviewSectionTemplateProps {
  children: ReactNode;
  title: string;
  goToHref?: string;
  goToLabel?: string;
  isHalfWidth?: boolean;
}

const PreviewSectionTemplate = ({
  children,
  title,
  goToHref = "",
  goToLabel = "Ver todos",
  isHalfWidth = false,
}: IPreviewSectionTemplateProps) => (
  <section id={title}>
    <Flex flexDirection="column" gap="lg">
      <PageLimitContainer isHalfWidth>
        <Heading level="h6" color="light">
          {title}
        </Heading>
      </PageLimitContainer>
      <PageLimitContainer isHalfWidth={isHalfWidth}>
        {children}
      </PageLimitContainer>
      <When condition={Boolean(goToHref)}>
        <PageLimitContainer isHalfWidth>
          <Flex justifyContent="flex-end">
            <GoToLink href={goToHref}>{goToLabel}</GoToLink>
          </Flex>
        </PageLimitContainer>
      </When>
    </Flex>
  </section>
);

export default PreviewSectionTemplate;
