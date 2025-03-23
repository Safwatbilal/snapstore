import React from "react";
import { appNav,anylistNav } from "./config";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui/sidebar"
import SideBarItems from "./SideBarItems";
import { useSelector } from "react-redux";
const AppSideBar:React.FunctionComponent<{
    navListDataApp:typeof appNav;
    navListDataAnylist:typeof anylistNav,

}>=({navListDataApp,navListDataAnylist})=>{
  const { lang } = useSelector((state: IRootState) => state.control);

    return(
        <Sidebar side={`${lang==='en'?'left':'right'}`} >
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