import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTransactions } from "@/app/cards/cards-information"; // Import the hook

export function SummaryCards() {
  const { transactions, loading, error } = useTransactions();

  if (loading) {
    return <p>Loading...</p>; // Show a loading state
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>; // Show an error state
  }

  // Calculate entries and exits
  const entries = transactions
    .filter((transaction) => transaction.type === "entrada")
    .reduce((sum, transaction) => sum + transaction.value, 0);

  const exits = transactions
    .filter((transaction) => transaction.type === "saida")
    .reduce((sum, transaction) => sum + transaction.value, 0);

  const balance = entries - exits; // Dynamically calculate balance

  const data = [
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

function SummaryCard({ title, amount, color }: { title: string; amount: number; color: string }) {
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
