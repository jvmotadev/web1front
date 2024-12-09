import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import promptsData from "@/lib/prompts.json";
import { Label } from "@/components/ui/label";

interface Prompt {
  id: string;
  title: string;
  text: string;
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void;
}

export function PromptSelect({ onPromptSelected }: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  // Load prompts from the JSON file
  useEffect(() => {
    const formattedPrompts = Object.entries(promptsData.prompt).map(([key, value]) => ({
      id: key,
      title: value.title,
      text: value.text,
    }));
    setPrompts(formattedPrompts);
  }, []);

  // Handle selection of a prompt
  const handlePromptSelected = (promptId: string) => {
    const selectedPrompt = prompts.find((prompt) => prompt.id === promptId);

    if (!selectedPrompt) {
      return;
    }

    // Pass the selected template text to the parent component
    onPromptSelected(selectedPrompt.text);
  };

  return (
    <div className="space-y-2">
        <Label htmlFor="prompt_select">
            Selecione o prompt (Opcional)
        </Label>
        <Select onValueChange={handlePromptSelected}>
            <SelectTrigger>
                <SelectValue placeholder="Select a prompt" />
            </SelectTrigger>
            <SelectContent id="prompt_select">
                {prompts.map((prompt) => (
                <SelectItem key={prompt.id} value={prompt.id}>
                    {prompt.title}
                </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
    
  );
}
