"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderForm from "./OrderForm";
import OrderTable from "./OrderTable";
import { useOrderStore } from "@/lib/store";
import { useTradeWebSocket } from "@/lib/useWebSocket";

export default function ClientInterface() {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const { activeOrders, orderHistory } = useOrderStore();
  const { lastMessage } = useTradeWebSocket();

  useEffect(() => {
    if (lastMessage !== null) {
      // You can add additional logic here to handle real-time updates
      console.log("Received message:", lastMessage);
    }
  }, [lastMessage]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Place Order</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "active"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Active Orders
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "history"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Order History
            </button>
          </div>
          {activeTab === "active" ? (
            <OrderTable orders={activeOrders} />
          ) : (
            <OrderTable orders={orderHistory} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
