import "./globals.css";
import { Nunito_Sans, Roboto_Slab } from "next/font/google";
import type { Metadata } from "next";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});
const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "The Photography Journey",
  description:
    "Welcome to the photography journey. This is alanmoraales personal place to share his photography journey.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es" className={`${nunitoSans.variable} ${robotoSlab.variable}`}>
      <body>{children}</body>
    </html>
  );
};

export { metadata };
export default RootLayout;
