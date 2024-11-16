export function SummaryCards() {
    const entries = 700.0; // Example value for Entradas
    const exits = 700.0; // Example value for Saidas
    const balance = entries - exits; // Calculate balance dynamically
  
    const formattedEntries = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(entries);
  
    const formattedExits = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(exits);
  
    const formattedBalance = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(balance);
}