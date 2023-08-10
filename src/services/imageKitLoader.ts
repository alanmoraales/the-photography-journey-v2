interface IImageKitLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

const imageKitLoader = ({ src, width, quality }: IImageKitLoaderProps) => {
  if (src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(",");
  var urlEndpoint = "https://ik.imagekit.io/alanmoraales";
  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${src}?tr=${paramsString}`;
};

export default imageKitLoader;
