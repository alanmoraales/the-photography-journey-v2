import FeaturedPrint from "@molecules/FeaturedPrint";
import PreviewSectionTemplate from "@templates/PreviewSectionTemplate";
import { IPrint } from "@services/notion";

interface IFeaturedPrintSectionProps {
  print: IPrint;
}

const FeaturedPrintSection = ({ print }: IFeaturedPrintSectionProps) => (
  <PreviewSectionTemplate title="Print destacado" isHalfWidth>
    <FeaturedPrint
      title={print.title}
      collectionName={print.collectionName}
      minPrice={print.minPrice}
      buyUrl={`/prints/${print.slug}`}
      cover={print.cover}
    />
  </PreviewSectionTemplate>
);

export default FeaturedPrintSection;
