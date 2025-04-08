import type { Metadata } from "next";
import "@/globals.css";
import Providers from "@/components/Provider/Providers";
import SideBarAll from "@/components/sidebar/SideBarAll";
import Tanstack from "@/components/Provider/Tansket";
import { Toaster } from "sonner";
import PreventClosePageCarts from "@/components/global/PreventClosePageCarts";

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
    <html lang="en">
      <body>
        <PreventClosePageCarts />
        <Providers>
          <Tanstack>
            <Toaster
              toastOptions={{
                unstyled: false,
                classNames: {
                  toast: "bg-primary",
                  title: "text-white",
                  success: "text-white !bg-green-500",
                  error: "!bg-red-500 text-white",
                  icon: "text-white",
                },
              }}
            />
            <div className="flex">
              <SideBarAll>{children}</SideBarAll>
            </div>
          </Tanstack>
        </Providers>
      </body>
    </html>
  );
}
