import Flex from "@atoms/Flex";
import PageLimitContainer from "@atoms/PageLimitContainer";
import FadeInAnimation from "@molecules/FadeInAnimation";
import PrintHeader from "@molecules/PrintHeader";
import PrintPhotosCarousel from "@organisms/PrintPhotosCarousel";
import PrintConfigForm from "@organisms/PrintConfigForm";
import Navbar from "@organisms/Navbar";
import { PrintConfigFormProvider } from "@context/PrintFormContext";
import notionService from "@services/notion";
import { css } from "@styled/css";

interface IPrintsPageParams {
  slug: string;
}

interface IPrintsPageProps {
  params: IPrintsPageParams;
}

const PrintsPage = async ({ params }: IPrintsPageProps) => {
  const print = await notionService.getPrintBySlug(params.slug);

  return (
    <Flex
      flexDirection="column"
      gap="xl"
      paddingTop="xl"
      paddingBottom={{ base: "2xl", md: "xl" }}
    >
      <Navbar />
      <PageLimitContainer>
        <FadeInAnimation>
          <main>
            <div
              className={css({
                display: { base: "block", md: "none" },
                paddingBottom: { base: "lg", md: "0" },
              })}
            >
              <PrintHeader
                title={print.title}
                collectionName={print.collectionName}
              />
            </div>
            <div
              className={css({
                display: { base: "flex", md: "grid" },
                gap: "lg",
                gridTemplateColumns: { md: "60% 1fr" },
                flexDirection: "column",
              })}
            >
              <Flex flexDirection="column" gap="lg">
                <PrintPhotosCarousel
                  printTitle={print.title}
                  photos={print.photos}
                />
              </Flex>
              <Flex flexDirection="column" gap="lg">
                <div
                  className={css({ display: { base: "none", md: "block" } })}
                >
                  <PrintHeader
                    title={print.title}
                    collectionName={print.collectionName}
                  />
                </div>
                <PrintConfigFormProvider>
                  <PrintConfigForm />
                </PrintConfigFormProvider>
              </Flex>
            </div>
          </main>
        </FadeInAnimation>
      </PageLimitContainer>
    </Flex>
  );
};

const generateStaticParams = async (): Promise<IPrintsPageParams[]> => {
  const prints = await notionService.getPrints();
  return prints.map((print) => ({
    slug: print.slug,
  }));
};

export { generateStaticParams };

export default PrintsPage;
