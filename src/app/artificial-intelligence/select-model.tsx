import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function ModelSelect() {
  return (
    <div className="space-y-2">
      <Label htmlFor="model_select">Selecione o modelo</Label>
      <Select disabled defaultValue="gpt-4o">
        <SelectTrigger>
          <SelectValue placeholder="Selecione um modelo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt-4o">Chat GPT Model 4o-mini</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
