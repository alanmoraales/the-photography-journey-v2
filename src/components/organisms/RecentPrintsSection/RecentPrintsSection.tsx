import PrintsCarousel from "@organisms/PrintsCarousel";
import { IPrint } from "@services/notion";
import PreviewSectionTemplate from "@templates/PreviewSectionTemplate";

interface IRecentPrintsSectionProps {
  prints: IPrint[];
}

const RecentPrintsSection = ({ prints }: IRecentPrintsSectionProps) => (
  <PreviewSectionTemplate
    title="Más fotos impresas"
    // No index page yet
    // goToHref="/prints"
    // goToLabel="Ver todas"
  >
    <PrintsCarousel prints={prints} />
  </PreviewSectionTemplate>
);

export default RecentPrintsSection;
