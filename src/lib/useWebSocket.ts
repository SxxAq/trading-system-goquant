import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { useOrderStore } from "./store";
import { Order } from "./types";

const WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";

export function useTradeWebSocket() {
  const { addOrder } = useOrderStore();
  const lastMessageRef = useRef<any>(null);

  const { lastMessage, ready, sendMessage } = useWebSocket(WS_URL, {
    onOpen: () => console.log("WebSocket connection opened"),
    onClose: () => console.log("WebSocket connection closed"),
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      lastMessageRef.current = data;
    }
  }, [lastMessage]);

  useEffect(() => {
    if (ready && lastMessageRef.current) {
      const { s: symbol, p: price } = lastMessageRef.current;
      const newOrder: Order = {
        id: Date.now().toString(),
        asset: symbol,
        quantity: Math.random() * 10,
        price: parseFloat(price),
        expirationType: Math.random() > 0.5 ? "duration" : "datetime",
        expirationValue:
          Math.random() > 0.5
            ? "1h"
            : new Date(Date.now() + 3600000).toISOString(),
        status: "active",
        createdAt: new Date(),
      };
      addOrder(newOrder);
    }
  }, [ready, addOrder]);

  return { lastMessage, ready };
}
