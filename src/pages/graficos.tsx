import { Layout } from "@/app/layout";
import { DailyExpenses } from "@/components/charts/daily-expenses";
import { ExitChart } from "@/components/charts/exits";
import { EntriesChart } from "@/components/charts/entries";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Graphs = () => {
  return (
    <div className="flex ">
      <Layout children={undefined} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between gap-x-24">
          <h1 className="text-5xl">Gráficos</h1>
        </div>

        <div className="container mx-auto mt-8">
        <Tabs defaultValue="categoria" className="flex-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categoria">
              Saídas por Categoria
            </TabsTrigger>
            <TabsTrigger value="diario">
              Despesas Diárias
            </TabsTrigger>
            <TabsTrigger value="entrada">
              Entradas por Categoria
            </TabsTrigger>
          </TabsList>
          <TabsContent value="categoria">
            <ExitChart/>
          </TabsContent>
          <TabsContent value="diario">
            <DailyExpenses/>
          </TabsContent>

          <TabsContent value="entrada">
            <EntriesChart />
          </TabsContent>

        </Tabs>
        </div>
        

      </main>
    </div>
  );
};

export default Graphs;