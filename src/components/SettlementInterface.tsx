"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderTable from "./OrderTable";
import OrderBookChart from "./OrderBookChart";
import { useOrderStore } from "@/lib/store";
import { Button } from "./ui/button";
import { Order } from "@/lib/types";

export default function SettlementInterface() {
  const { activeOrders, settleOrder } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleSettle = (action: "accept" | "reject" | "modify") => {
    if (selectedOrder) {
      settleOrder(selectedOrder.id, action);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Order Book</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderBookChart />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTable orders={activeOrders} />
        </CardContent>
      </Card>
      {selectedOrder && (
        <Card>
          <CardHeader>
            <CardTitle>Settlement Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex space-x-2">
            <Button onClick={() => handleSettle("accept")}>Accept</Button>
            <Button
              onClick={() => handleSettle("reject")}
              variant="destructive"
            >
              Reject
            </Button>
            <Button onClick={() => handleSettle("modify")} variant="outline">
              Modify
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
