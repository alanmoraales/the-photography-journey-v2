import Flex from "@atoms/Flex";
import PageLimitContainer from "@atoms/PageLimitContainer";
import FadeInAnimation from "@molecules/FadeInAnimation";
import PrintHeader from "@molecules/PrintHeader";
import PrintPhotosCarousel from "@organisms/PrintPhotosCarousel";
import PrintConfigForm from "@organisms/PrintConfigForm";
import Navbar from "@organisms/Navbar";
import { PrintConfigFormProvider } from "@context/PrintFormContext";
import notionService from "@services/notion";
import mixpanelService from "@services/mixpanel";
import { css } from "@styled/css";
import NotionContent from "@organisms/NotionContent/NotionContent";
import PostCard from "@molecules/PostCard/PostCard";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface IPrintsPageParams {
  slug: string;
}

interface IPrintsPageProps {
  params: IPrintsPageParams;
}

const PrintsPage = async ({ params }: IPrintsPageProps) => {
  const print = await notionService.getPrintBySlug(params.slug);
  const aboutPrintContentBlocks = await notionService.getPostContentBlocks(
    print.id
  );
  let post;
  if (print.postSlug) {
    post = await notionService.getPostBySlug(print.postSlug);
  }
  mixpanelService.trackEnterPage("Print", { title: print.title });

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
                display: { base: "flex", xsm: "grid" },
                gap: "lg",
                gridTemplateColumns: {
                  xsm: "45% 1fr",
                  md: "55% 1fr",
                  lg: "60% 1fr",
                },
                flexDirection: "column",
              })}
            >
              <Flex flexDirection="column" gap="lg" height="fit-content">
                <PrintPhotosCarousel
                  printTitle={print.title}
                  photos={print.photos}
                />
                <NotionContent blocks={aboutPrintContentBlocks} />
                {post ? (
                  <PostCard
                    {...post}
                    href={`/posts/${post?.slug}?from=print&printSlug=${print.slug}`}
                    publishedAt={format(post.publishedAt, "PP", { locale: es })}
                  />
                ) : null}
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
                <PrintConfigFormProvider
                  availableSizes={print.availableSizes}
                  printTitle={print.title}
                >
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
