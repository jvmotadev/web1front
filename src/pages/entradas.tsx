import { Layout } from "@/app/layout";
import { Tabela } from "@/app/tabela";
import { EntriesChart } from "@/components/charts/entries";

const Entradas = () => {
  return (
    <div className="flex ">
      <Layout children={undefined} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between gap-x-24">
          <h1 className="text-5xl">Entradas</h1>
        </div>
        <Tabela/>

        <EntriesChart />
      </main>
    </div>
  );
};

export default Entradas;
