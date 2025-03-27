import { Calendar, Home, Inbox, Search, Settings,Group,ShoppingCart,Type,ListOrdered ,MessageCircle, User,BarChart} from "lucide-react"
import { FolderKanban } from "lucide-react";

import { HOME_PATH, CUSTOMERS_PATH, COUPON_PATH, NOTIFICATION_PATH, ORDER_PATH, PRODUCT_PATH, SETTING_PATH, CATEGORY_PATH } from "@/routes/path";

export const ICONS = {
    home:  <Home size={15} />,
    customer: <Group size={15} />,
    product: <ShoppingCart size={15} />,
    category: <FolderKanban size={15} />,
    coupon: <Home size={15}/>,
    order: <ListOrdered size={15} />,
    notification: <Home size={15}/>,
    setting: <Settings size={15} />,
    profile:<User size={15}></User>,
    anylist:<BarChart size={15}></BarChart>
};

export const appNav = [
    {
        title: "sidebar.Home",
        pathName: HOME_PATH.HOME,
        icon: ICONS.home,
    },
    {
        title: "sidebar.Customer",
        pathName: CUSTOMERS_PATH.CUSTOMERS,
        icon: ICONS.customer,
    },
    {
        title: "sidebar.Products",
        pathName: PRODUCT_PATH.PRODUCTS,
        icon: ICONS.product,
    },
    {
        title: "sidebar.Category",
        pathName: CATEGORY_PATH.CATEGORY,
        icon: ICONS.category,
    },
    {
        title: "sidebar.Coupon",
        pathName: COUPON_PATH.COUPON,
        icon: ICONS.coupon,
    },
    {
        title: "sidebar.Order",
        pathName: ORDER_PATH.ORDER,
        icon: ICONS.order,
    },
    {
        title: "sidebar.Notification",
        pathName: NOTIFICATION_PATH.NOTIFICATION,
        icon: ICONS.notification,
    },
];

export const anylistNav = [
    {
        title:'sidebar.Profile',
        pathName:'s',
        icon:ICONS.profile
    },
    {
        title:'sidebar.Analysis',
        pathName:'s',
        icon:ICONS.anylist
    }
]