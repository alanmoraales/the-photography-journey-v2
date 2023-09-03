import Image from "next/image";
import Flex from "@atoms/Flex";
import PageLimitContainer from "@atoms/PageLimitContainer";
import FadeInAnimation from "@molecules/FadeInAnimation";
import PrintHeader from "@molecules/PrintHeader/PrintHeader";
import SnapCarousel from "@organisms/SnapCarousel/SnapCarousel";
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
    <PageLimitContainer paddingY="xl">
      <FadeInAnimation>
        <PrintHeader
          title={print.title}
          collectionName={print.collectionName}
        />
        <main>
          <Flex flexDirection="column" gap="xl">
            <Flex flexDirection="column" gap="xl">
              <SnapCarousel>
                {print.photos.map((photo) => (
                  <div
                    key={photo.src}
                    style={{
                      height: "30vh",
                      width: "100%",
                      aspectRatio: `${photo.width} / ${photo.height}`,
                    }}
                  >
                    <Image
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt={print.title}
                      blurDataURL={photo.base64Placeholder}
                      placeholder="blur"
                    />
                  </div>
                ))}
              </SnapCarousel>
            </Flex>
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
