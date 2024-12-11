import { Layout } from "@/app/layout";
import { SendHorizontal } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CategoryScroll } from "@/app/artificial-intelligence/category-ignore";
import { PromptSelect } from "@/app/artificial-intelligence/select-prompt";
import { ModelSelect } from "@/app/artificial-intelligence/select-model";
import { useCompletion } from "ai/react";

const FinanceAI = () => {
  const [, setPrompt] = useState(""); // User input

  const {
    completion,
    input,
    setInput,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
  });

  const handlePromptSelected = (selectedTemplate: string) => {
    setInput(selectedTemplate); // Atualiza o prompt no hook
    setPrompt(selectedTemplate); // Sincroniza com o estado local, se necessário
  };

  return (
    <div className="flex">
      <Layout children={undefined} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between gap-x-24">
          <h1 className="text-5xl">FinanceAI</h1>
        </div>

        <div className="flex container mx-auto mt-8">
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[750px] max-w-md rounded-l-lg border md:min-w-[1150px]"
          >
            <ResizablePanel defaultSize={40} minSize={30}>
              <div className="flex h-full items-center justify-center p-0">
                <Textarea
                  className="rounded-none rounded-tl-sm resize-none p-4 leading-relaxed w-full h-full"
                  placeholder={"Resposta da IA"}
                  readOnly
                  value={completion} // Resposta gerenciada pelo hook
                />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={60} minSize={30}>
              <div className="flex h-full items-center justify-center p-0">
                <Textarea
                  className="rounded-none rounded-bl-sm resize-none p-4 leading-relaxed w-full h-full"
                  placeholder={"Inclua aqui seu prompt"}
                  value={input} // Bind do hook ao textarea
                  onChange={handleInputChange} // Atualiza o estado no hook
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
          <Card className="flex-1 rounded-r-lg rounded-l-none shadow-lg px-4 text-center">
            <CardHeader>
              <CardTitle className={`text-2xl`}>Configurações</CardTitle>
            </CardHeader>
            <CardContent className="h-full max-h-[668px]">
              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-4 w-full">
                  <ModelSelect></ModelSelect>
                  <PromptSelect onPromptSelected={handlePromptSelected} />
                  <CategoryScroll />
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <Separator className="w-full"></Separator>

                  <Button
                    disabled={isLoading} // Disable button during loading
                    type="button"
                    className="gap-2 w-full"
                    onClick={handleSubmit} // Gatilho do envio
                  >
                    {isLoading ? "Enviando..." : "Enviar"}
                    <SendHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="ml-12 text-base text-muted-foreground">
          Lembre-se: Você pode utilizar a variável <code className="text-orange-400">{' {dados} '}</code> no seu prompt para adicionar suas transações, exceto as categorias eliminadas na lista lateral.
        </p>
      </main>
    </div>
  );
};

export default FinanceAI;
