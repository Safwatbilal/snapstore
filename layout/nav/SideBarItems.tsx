'use client'
import React from 'react'
import { SidebarGroupLabel,SidebarGroupContent,SidebarMenu,SidebarMenuItem,SidebarMenuButton } from '@/components/ui/sidebar'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { updateControlState } from '@/store/slice/control'
import { dispatch } from '@/store/store'
import { changeLanguage } from '@/lib/i18n'
interface NavItem {
  title: string;
  pathName: string;
  icon: React.ReactNode;
}
const SideBarItems:React.FunctionComponent<{titleNav :string,navListData:NavItem[]}> = ({titleNav,navListData}) => {
  const { lang } = useSelector((state: IRootState) => state.control);
  return (
    <>
    <SidebarGroupLabel>{titleNav}</SidebarGroupLabel>
    <SidebarGroupContent >
      <SidebarMenu >
        {navListData.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.pathName}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
    </>
  )
}

export default SideBarItems;