'use client'
import React from "react";
import { appNav, anylistNav } from "./config";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui/sidebar";
import SideBarItems from "./SideBarItems";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import TopNav from "./TopNav";

const AppSideBar: React.FunctionComponent<{
  navListDataApp: typeof appNav;
  navListDataAnylist: typeof anylistNav;
}> = ({ navListDataApp, navListDataAnylist }) => {
  const { lang } = useSelector((state: IRootState) => state.control);
  const { t } = useTranslation();

  return (
    <Sidebar variant="floating" className="bg-[#F1F2F7]" collapsible="icon" side={`${lang === 'en' ? 'left' : 'right'}`}>
      <SidebarContent>
        <SidebarGroup>
          <SideBarItems titleNav={t('sidebar.Application')} navListData={navListDataApp} />
          <SideBarItems titleNav={t('sidebar.Analysis')} navListData={navListDataAnylist} />
              </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
