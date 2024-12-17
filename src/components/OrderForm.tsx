"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrderStore } from "@/lib/store";

const formSchema = z.object({
  asset: z.string().min(1, { message: "Asset is required" }),
  quantity: z.number().positive({ message: "Quantity must be positive" }),
  price: z.number().positive({ message: "Price must be positive" }),
  expirationType: z.enum(["duration", "datetime"]),
  expirationValue: z.string().min(1, { message: "Expiration is required" }),
});

export default function OrderForm() {
  const { addOrder } = useOrderStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asset: "",
      quantity: 0,
      price: 0,
      expirationType: "duration",
      expirationValue: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addOrder({
      id: Date.now().toString(),
      ...values,
      status: "active",
      createdAt: new Date(),
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="asset"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BTC-USDT">BTC-USDT</SelectItem>
                  <SelectItem value="ETH-USDT">ETH-USDT</SelectItem>
                  <SelectItem value="XRP-USDT">XRP-USDT</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.00000001"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expirationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select expiration type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="datetime">Date & Time</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expirationValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration</FormLabel>
              <FormControl>
                {form.watch("expirationType") === "duration" ? (
                  <Input {...field} placeholder="e.g., 1h, 2d, 1w" />
                ) : (
                  <Input {...field} type="datetime-local" />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Place Order</Button>
      </form>
    </Form>
  );
}
