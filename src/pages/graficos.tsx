import { Layout } from "@/app/layout";
import { DailyExpenses } from "@/components/charts/daily-expenses";
import { ExitChart } from "@/components/charts/exits";

const Graphs = () => {
  return (
    <div className="flex ">
      <Layout children={undefined} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between gap-x-24">
          <h1 className="text-5xl">Gráficos</h1>
        </div>

        <ExitChart/>

        <DailyExpenses/>

      </main>
    </div>
  );
};

export default Graphs;
