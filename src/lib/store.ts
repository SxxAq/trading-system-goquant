import { create } from "zustand";
import { Order } from "./types";

interface OrderStore {
  activeOrders: Order[];
  orderHistory: Order[];
  addOrder: (order: Order) => void;
  settleOrder: (
    orderId: string,
    action: "accept" | "reject" | "modify",
  ) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  activeOrders: [],
  orderHistory: [],
  addOrder: (order) =>
    set((state) => ({
      activeOrders: [...state.activeOrders, order],
    })),
  settleOrder: (orderId, action) =>
    set((state) => {
      const orderIndex = state.activeOrders.findIndex(
        (order) => order.id === orderId,
      );
      if (orderIndex === -1) return state;

      const updatedActiveOrders = [...state.activeOrders];
      const [settledOrder] = updatedActiveOrders.splice(orderIndex, 1);

      const updatedOrder = {
        ...settledOrder,
        status:
          action === "accept"
            ? "settled"
            : action === "reject"
              ? "rejected"
              : "modified",
      };

      return {
        activeOrders: updatedActiveOrders,
        orderHistory: [...state.orderHistory, updatedOrder],
      };
    }),
}));
