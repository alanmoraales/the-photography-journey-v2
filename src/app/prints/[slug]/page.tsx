import Flex from "@atoms/Flex";
import PageLimitContainer from "@atoms/PageLimitContainer";
import FadeInAnimation from "@molecules/FadeInAnimation";
import PrintHeader from "@molecules/PrintHeader";
import PrintPhotosCarousel from "@organisms/PrintPhotosCarousel";
import PrintConfigForm from "@organisms/PrintConfigForm";
import { PrintConfigFormProvider } from "@context/PrintFormContext";
import notionService from "@services/notion";

interface IPrintsPageParams {
  slug: string;
}

interface IPrintsPageProps {
  params: IPrintsPageParams;
}

const PrintsPage = async ({ params }: IPrintsPageProps) => {
  const print = await notionService.getPrintBySlug(params.slug);

  return (
    <PageLimitContainer paddingY="xl">
      <FadeInAnimation>
        <PrintHeader
          title={print.title}
          collectionName={print.collectionName}
        />
        <main>
          <Flex flexDirection="column" gap="xl">
            <Flex flexDirection="column" gap="xl">
              <PrintPhotosCarousel
                printTitle={print.title}
                photos={print.photos}
              />
            </Flex>
            <PrintConfigFormProvider>
              <PrintConfigForm />
            </PrintConfigFormProvider>
          </Flex>
        </main>
      </FadeInAnimation>
    </PageLimitContainer>
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
