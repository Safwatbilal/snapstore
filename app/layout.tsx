import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/layout/nav/AppSideBar";
import { firstNavConfig } from "@/layout/nav/config";
export const metadata: Metadata = {
  title: "Snapstore",
  description: "webisite for sale and by A to Z",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar navListData={firstNavConfig}/>
          <main>
            <SidebarTrigger></SidebarTrigger>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
