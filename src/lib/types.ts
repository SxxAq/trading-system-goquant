export interface Order {
  id: string;
  asset: string;
  quantity: number;
  price: number;
  expirationType: "duration" | "datetime";
  expirationValue: string;
  status: "active" | "settled" | "rejected" | "modified";
  createdAt: Date;
}
