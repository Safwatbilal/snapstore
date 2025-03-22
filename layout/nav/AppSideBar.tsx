import React from "react";
import { appNav,anylistNav } from "./config";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui/sidebar"
import SideBarItems from "./SideBarItems";
const AppSideBar:React.FunctionComponent<{
    navListDataApp:typeof appNav;
    navListDataAnylist:typeof anylistNav,

}>=({navListDataApp,navListDataAnylist})=>{
    return(
        <Sidebar  >
      <SidebarContent >
        <SidebarGroup>
          <SideBarItems titleNav='Application' navListData={navListDataApp}></SideBarItems>
          <SideBarItems titleNav='Anylist' navListData={navListDataAnylist}></SideBarItems>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    )
}
export default AppSideBar;