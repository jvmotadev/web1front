export interface Transaction {
  id: string;
  value: number; // Match "value" from API response
  name: string;
  category: string;
  description: string;
  date: string;
  type: string; // "entrada" or "saida"
}
