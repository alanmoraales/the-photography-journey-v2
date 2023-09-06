import Image from "next/image";
import SnapCarousel from "@organisms/SnapCarousel";
import type { IPrintPhoto } from "@services/notion";

interface IPrintPhotosCarouselProps {
  printTitle: string;
  photos: IPrintPhoto[];
}

const PrintPhotosCarousel = ({
  printTitle,
  photos,
}: IPrintPhotosCarouselProps) => {
  return (
    <SnapCarousel>
      {photos.map((photo) => (
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
            alt={printTitle}
            blurDataURL={photo.base64Placeholder}
            placeholder="blur"
          />
        </div>
      ))}
    </SnapCarousel>
  );
};

export default PrintPhotosCarousel;
