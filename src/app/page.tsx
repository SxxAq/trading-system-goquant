import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientInterface from "@/components/ClientInterface";
import SettlementInterface from "@/components/SettlementInterface";

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Interactive Trading System</h1>
      <Tabs defaultValue="client">
        <TabsList>
          <TabsTrigger value="client">Client Interface</TabsTrigger>
          <TabsTrigger value="settlement">Settlement Interface</TabsTrigger>
        </TabsList>
        <TabsContent value="client">
          <ClientInterface />
        </TabsContent>
        <TabsContent value="settlement">
          <SettlementInterface />
        </TabsContent>
      </Tabs>
    </div>
  );
}
