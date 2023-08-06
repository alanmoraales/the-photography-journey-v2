import { Nunito_Sans, Roboto_Slab } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const nunitoSans = Nunito_Sans({ variable: "--font-nunito-sans" });
const robotoSlab = Roboto_Slab({ variable: "--font-roboto-slab" });

const metadata: Metadata = {
  title: "The Photography Journey",
  description:
    "Welcome to the photography journey. This is alanmoraales personal place to share his photography journey.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${robotoSlab.variable}`}>
        {children}
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
