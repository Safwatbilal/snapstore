import { Calendar, Home, Inbox, Search, Settings,Group,ShoppingCart,Type,ListOrdered ,MessageCircle, User,BarChart} from "lucide-react"

import { HOME_PATH, CUSTOMERS_PATH, COUPON_PATH, NOTIFICATION_PATH, ORDER_PATH, PRODUCT_PATH, SETTING_PATH, CATEGORY_PATH } from "@/routes/path";

const ICONS = {
    home:  <Home size={15} />,
    customer: <Group size={15} />,
    product: <ShoppingCart size={15} />,
    category: <Type size={15} />,
    coupon: <Home size={15}/>,
    order: <ListOrdered size={15} />,
    notification: <Home size={15}/>,
    setting: <Settings size={15} />,
    profile:<User size={15}></User>,
    anylist:<BarChart size={15}></BarChart>
};

export const appNav = [
    {
        title: "Home",
        pathName: HOME_PATH.HOME,
        icon: ICONS.home,
    },
    {
        title: "customer",
        pathName: CUSTOMERS_PATH.CUSTOMERS,
        icon: ICONS.customer,
    },
    {
        title: "product",
        pathName: PRODUCT_PATH.PRODUCTS,
        icon: ICONS.product,
    },
    {
        title: "category",
        pathName: CATEGORY_PATH.CATEGORY,
        icon: ICONS.category,
    },
    {
        title: "coupon",
        pathName: COUPON_PATH.COUPON,
        icon: ICONS.coupon,
    },
    {
        title: "order",
        pathName: ORDER_PATH.ORDER,
        icon: ICONS.order,
    },
    {
        title: "notification",
        pathName: NOTIFICATION_PATH.NOTIFICATION,
        icon: ICONS.notification,
    },
];

export const anylistNav = [
    {
        title:'Profile',
        pathName:'s',
        icon:ICONS.profile
    },
    {
        title:'Anylist',
        pathName:'s',
        icon:ICONS.anylist
    }
]