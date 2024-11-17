import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  amount: number;
  color: string;
}

export function SummaryCards() {
    const entries = 1500.0; // Example value for Entradas
    const exits = 300.0; // Example value for Saídas
    const balance = entries - exits; // Dynamically calculate balance
  
    const data: SummaryCardProps[] = [
      { title: "Entradas", amount: entries, color: "text-lime-500" },
      { title: "Saídas", amount: exits, color: "text-red-500" },
      { title: "Balanço", amount: balance, color: "text-blue-500" },
    ];
  
    return (
      <div className="flex justify-between gap-x-32 mt-6">
        {data.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>
    );
  }

function SummaryCard({ title, amount, color }: SummaryCardProps) {
  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  return (
    <Card className="bg-zinc-900 flex-1 shadow-lg px-16 text-center">
      <CardHeader>
        <CardTitle className={`text-2xl ${color}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-center items-center">
          <div>
            <span className="text-4xl font-medium">{formattedAmount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
