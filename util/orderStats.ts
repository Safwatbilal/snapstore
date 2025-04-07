
    interface OrderItem {
        state: string;
        timeOrder: string;
    }
    
    interface Order {
        cartArray: OrderItem[];
    }
    
    export const getDateRange = () => {
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
    
        const sixtyDaysAgo = new Date(today);
        sixtyDaysAgo.setDate(today.getDate() - 60);
    
        return { today, thirtyDaysAgo, sixtyDaysAgo };
    };
    
    export const countItemsByStateAndDate = (
        orders: Order[] | undefined,
        state: string,
        start: Date,
        end: Date
    ): number => {
        if (!orders) return 0;
    
        return orders.reduce((total, order) => {
        return (
            total +
            order.cartArray.filter((item) => {
            const date = new Date(item.timeOrder);
            return item.state === state && date >= start && date < end;
            }).length
        );
        }, 0);
    };
    
    export const calculatePercentageChange = (
        currentCount: number,
        previousCount: number
    ): number => {
        if (previousCount === 0 && currentCount > 0) return 100;
        if (previousCount === 0 && currentCount === 0) return 0;
        return ((currentCount - previousCount) / previousCount) * 100;
    };
    
    export const calculateAveragePercentage = (percentages: number[]): number => {
        const validPercentages = percentages.filter((p) => !isNaN(p)&&p>0);
        if (validPercentages.length === 0) return 0;
        return (
        validPercentages.reduce((sum, p) => sum + p, 0) / validPercentages.length
        );
    };
    
    export const getOrderStatistics = (orders: Order[] | undefined) => {
        const { today, thirtyDaysAgo, sixtyDaysAgo } = getDateRange();
    
        const pending30 = countItemsByStateAndDate(orders, "pending", thirtyDaysAgo, today);
        const completed30 = countItemsByStateAndDate(orders, "completed", thirtyDaysAgo, today);
        const canceled30 = countItemsByStateAndDate(orders, "cancelled", thirtyDaysAgo, today);
        const accepted30 = countItemsByStateAndDate(orders, "accepted", thirtyDaysAgo, today);
    
        const pendingPrev30 = countItemsByStateAndDate(orders, "pending", sixtyDaysAgo, thirtyDaysAgo);
        const completedPrev30 = countItemsByStateAndDate(orders, "completed", sixtyDaysAgo, thirtyDaysAgo);
        const canceledPrev30 = countItemsByStateAndDate(orders, "cancelled", sixtyDaysAgo, thirtyDaysAgo);
        const acceptedPrev30 = countItemsByStateAndDate(orders, "accepted", sixtyDaysAgo, thirtyDaysAgo);
    
        const pendingPercent = calculatePercentageChange(pending30, pendingPrev30);
        const completedPercent = calculatePercentageChange(completed30, completedPrev30);
        const canceledPercent = calculatePercentageChange(canceled30, canceledPrev30);
        const acceptedPercent = calculatePercentageChange(accepted30, acceptedPrev30);
    
        const totalOrders = pending30 + completed30 + canceled30 + accepted30;
        const totalPercent = calculateAveragePercentage([pendingPercent, completedPercent, canceledPercent, acceptedPercent]);
    
        return {
        pending30,
        completed30,
        canceled30,
        accepted30,
        pendingPercent,
        completedPercent,
        canceledPercent,
        acceptedPercent,
        totalOrders,
        totalPercent
        };
    };
    