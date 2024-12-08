import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const categories: string[] = [
  "Transporte",
  "Roupas",
  "Moradia",
  "Saúde",
  "Educação",
  "Lazer",
  "Entretenimento",
  "Contas",
  "Assinaturas",
  "Impostos",
  "Investimentos",
  "Viagens",
  "Pets",
  "Tecnologia",
  "Dívidas",
  "Doações",
  "Presentes",
];

export function CategoryScroll() {
  const [selectedCategories, setSelectedCategories] = React.useState<boolean[]>(
    Array(categories.length).fill(false)
  );

  const toggleCategory = (index: number, isSelected: boolean) => {
    const newSelections = [...selectedCategories];
    newSelections[index] = isSelected;
    setSelectedCategories(newSelections);
  };

  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-base leading-6 font-medium">Selecione as categorias que não gostaria de receber feedback pela IA</h4>
        {categories.map((category, index) => (
          <React.Fragment key={category}>
            <div className="flex items-center justify-between text-sm">
              <span>{category}</span>
              <Checkbox
                checked={selectedCategories[index]}
                onCheckedChange={(value) =>
                  toggleCategory(index, !!value) // Ensure value is boolean
                }
                aria-label={`Select ${category}`}
              />
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
