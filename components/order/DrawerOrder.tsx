
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
import { IRootState } from "@/store/rootReducers"
import { addToCart, removeFromCart } from "@/store/slice/cart"
import { dispatch } from "@/store/store"
const DrawerOrder:React.FC<{ onClick: (id: string) => void}> = ({onClick}) => {
        const handleAddToCart = (item: {
            productId: string
            productName: string
            price: number
            imageUrl: string
            quantity: number
            state:string
            timeOrder:string
            userId:string
            
        }) => {
            dispatch(addToCart(item))
        }
    const now = new Date();
        const handleRemoveCart = ({ productId }: { productId: string }) => {
            dispatch(removeFromCart(productId))
        }
        const { cartArray } = useSelector((state: IRootState) => state.cart)
        console.log(cartArray.length)
    return (
        <>
            <DrawerTrigger asChild>
                    <Button variant="outline" className="bg-[#F1F2F7] cursor-pointer">
                        <ShoppingCart size={20} />
                        Cart
                    </Button>
                </DrawerTrigger>

                <DrawerContent className="overflow-auto z-50 no-after">
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Shopping Cart</DrawerTitle>
                            <DrawerDescription>Review your selected items before checkout.</DrawerDescription>
                        </DrawerHeader>

                        <div className="space-y-4">
                            {cartArray.map((item) => (
                                <div className="p-4 border-b last:border-none relative" key={item.productId}>
                                    <span className="absolute bottom-3 left-7 text-sm font-semibold text-gray-600">{item.quantity}</span>
                                    <span className="absolute bottom-3 left-20 text-sm font-semibold text-gray-600">
                                        {item.quantity * item.price} SYP
                                    </span>
                                    <span className="absolute bottom-3 right-3 text-sm font-semibold text-gray-600">
                                        <Trash
                                            className="hover:text-red-700 cursor-pointer"
                                            onClick={() => handleRemoveCart({ productId: item.productId })}
                                            size={17}
                                        />
                                    </span>
                                    <div className="flex items-center justify-between">
                                        <Button
                                            onClick={() => handleAddToCart({ ...item, quantity: -1 })}
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 rounded-full cursor-pointer"
                                        >
                                            <Minus />
                                        </Button>

                                        <div className="flex flex-col items-center">
                                            <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 object-cover rounded-md shadow-md" />
                                            <p className="text-sm font-semibold mt-2">{item.productName}</p>
                                            <p className="text-gray-600 text-xs">{item.price} SYP</p>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleAddToCart({ ...item, quantity: 1 ,state:'pending',timeOrder:now})}
                                            className="h-8 w-8 rounded-full cursor-pointer"
                                        >
                                            <Plus />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <DrawerFooter>
                            <Button className="w-full" onClick={onClick} disabled={cartArray.length===0}>Proceed to Checkout</Button>
                            <DrawerClose asChild>
                                <Button variant="outline" className="w-full">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
    </>
  )
}

export default DrawerOrder