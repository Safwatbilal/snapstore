"use client"

import * as React from "react"
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import {
    Drawer,  
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { addToCart, removeFromCart } from "@/store/slice/cart"
import { dispatch } from "@/store/store"
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
