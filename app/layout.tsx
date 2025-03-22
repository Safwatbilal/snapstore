
import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import SideBarAll from "@/components/sidebar/SideBarAll";

export const metadata: Metadata = {
  title: "Snapstore",
  description: "website for sale and buy A to Z",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <div className="flex">
            <SideBarAll children={children}></SideBarAll>
          </div>
        </body>
      </html>
    </Providers>
  );
}
