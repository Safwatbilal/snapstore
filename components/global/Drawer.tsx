"use client"

import * as React from "react"

import {
    Drawer,  
} from "@/components/ui/drawer"
import DrawerOrder from "../order/DrawerOrder"
import DrawerCheckOut from "../order/DrawerCheckOut"
export function DrawerDemo() {
    const [isCartOpen, setIsCartOpen] = React.useState(false)
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false)
    const handleOpenDetails = () => {
        setIsCartOpen(false) 
        setTimeout(() => setIsCheckoutOpen(true), 300) 
    }
    return (
        <>
            <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DrawerOrder onClick={handleOpenDetails}></DrawerOrder>
            </Drawer>

            <Drawer open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DrawerCheckOut onClick={handleOpenDetails}></DrawerCheckOut>
            </Drawer>
        </>
    )
}
