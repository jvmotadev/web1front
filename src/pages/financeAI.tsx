import { Layout } from "@/app/layout";
import { SendHorizontal } from 'lucide-react';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategoryScroll } from "@/app/artificial-intelligence/category-ignore";


const FinanceAI = () => {
  return (
    <div className="flex ">
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
                        className="rounded-none rounded-tl-sm overflow-hidden resize-none p-4 leading-relaxed w-full h-full"
                        placeholder={"Resposta da IA"}
                        readOnly
                        /* value={completion} */
                    />
                
                </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={60} minSize={30}>
                <div className="flex h-full items-center justify-center p-0">
                
                    <Textarea 
                        
                        className="rounded-none rounded-bl-sm overflow-hidden resize-none p-4 leading-relaxed w-full h-full"
                        placeholder={"Inclua aqui seu prompt"}
                        /* value={input}
                        onChange={handleInputChange} */
                    />
                
                </div>
                </ResizablePanel>
            </ResizablePanelGroup>
            <Card className=" flex-1 rounded-r-lg rounded-l-none shadow-lg px-4 text-center">
                <CardHeader>
                    <CardTitle className={`text-2xl`}>Header</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex flex-col justify-center items-center gap-4">
                    <Select disabled defaultValue="gpt3.5">
                        <SelectTrigger>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gpt3.5">{"Chat GPT Model 3.5"}</SelectItem>
                        </SelectContent>
                    </Select>


                    <CategoryScroll></CategoryScroll>
                    <Separator className="w-full"></Separator>

                    <Button /* disabled={isLoading} */ type="submit" className="gap-2 w-full">
                        {"Enviar"}
                        <SendHorizontal className="w-4 h-4"/>
                    </Button>
                    </div>
                </CardContent>
            </Card>

        </div>
        <p className='ml-12 text-base text-muted-foreground'>
            Lembre-se: Você pode utilizar a variável <code className='text-orange-400'>{' {dados} '}</code> no seu prompt para adicionar suas transações exceto as categorias eliminadas na lista lateral
        </p>

      </main>
    </div>
  );
};

export default FinanceAI;
  