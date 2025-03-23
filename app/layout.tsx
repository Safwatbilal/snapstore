
import type { Metadata } from "next";
import "@/globals.css";
import Providers from "@/components/Provider/Providers";
import SideBarAll from "@/components/sidebar/SideBarAll";
import Tanstack from "@/components/Provider/Tansket";
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
      <Tanstack>
        <html lang="en">
          <body>
            <div className="flex">
              <SideBarAll children={children}></SideBarAll>
            </div>
          </body>
        </html>
      </Tanstack>
    </Providers>
  );
}
