import { Layout } from "@/app/layout";
import Calendar from "@/components/calendar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X , Pencil, CirclePlus } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { fetchSubscriptions } from "@/app/subscriptions/get-subscription";
import { deleteSubscription } from "@/app/subscriptions/delete-subscription";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Subscription } from "@/app/subscriptions/subscription";

export interface SubscriptionData {
  id: string;
  name: string;
  category: string;
  day: number;
  month?: number;
  value: number;
  frequency: string;
}

const categoryColorMap: Record<string, { colorClass: string; colorRGB: string }> = {
  alimentacao: { colorClass: "red", colorRGB: "rgba(244, 67, 54, 1)" },
  transporte: { colorClass: "blue", colorRGB: "rgba(156, 202, 235, 1)" },
  roupas: { colorClass: "pink", colorRGB: "rgba(233, 30, 99, 1)" },
  moradia: { colorClass: "light-blue", colorRGB: "rgba(3, 169, 244, 1)" },
  saude: { colorClass: "light-green", colorRGB: "rgba(139, 195, 74, 1)" },
  educacao: { colorClass: "indigo", colorRGB: "rgba(63, 81, 181, 1)" },
  lazer: { colorClass: "orange", colorRGB: "rgba(247, 167, 0, 1)" },
  entretenimento: { colorClass: "purple", colorRGB: "rgba(186, 104, 200, 1)" },
  contas: { colorClass: "gray", colorRGB: "rgba(66, 66, 66, 1)" },
  assinaturas: { colorClass: "lime", colorRGB: "rgba(205, 220, 57, 1)" },
  impostos: { colorClass: "amber", colorRGB: "rgba(255, 193, 7, 1)" },
  investimentos: { colorClass: "cyan", colorRGB: "rgba(0, 188, 212, 1)" },
  viagens: { colorClass: "deep-purple", colorRGB: "rgba(103, 58, 183, 1)" },
  pets: { colorClass: "teal", colorRGB: "rgba(77, 182, 172, 1)" },
  tecnologia: { colorClass: "deep-orange", colorRGB: "rgba(244, 67, 54, 1)" },
  dividas: { colorClass: "brown", colorRGB: "rgba(141, 110, 99, 1)" },
  doacoes: { colorClass: "yellow", colorRGB: "rgba(255, 87, 34, 1)" },
  presentes: { colorClass: "dark-gray", colorRGB: "rgba(66, 66, 66, 1)" },
};

const Assinaturas = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);

  useEffect(() => {
    fetchSubscriptions()
      .then((data) => setSubscriptions(data))
      .catch((error) => console.error("Error fetching subscriptions:", error));
  }, []);

  const events = subscriptions.map(sub => {
    const normalizedCategory = sub.category.toLowerCase().replace(/\s+/g, "");
    const colorInfo = categoryColorMap[normalizedCategory] || { colorClass: "gray", colorRGB: "rgba(158, 158, 158, 1)" };
  
    return {
      eventName: sub.name,
      calendar: sub.category,
      color: colorInfo.colorClass, // Agora passa a classe CSS correta para o calendário
      date: moment().month(sub.month ? sub.month - 1 : moment().month()).date(sub.day),
    };
  });
  

  const handleDelete = async (id: string) => {
    const success = await deleteSubscription(id);
    if (success) {
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    }
  };

  return (
    <div className="flex">
      <Layout children={undefined} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between gap-x-24">
          <h1 className="text-5xl">Assinaturas</h1>
        </div>
        <div className="container pt-20 flex flex-row gap-6">
          <div className="flex">
            <Calendar events={events} />
          </div>
          <div className="flex flex-col min-w-[200px] max-w-[700px] max-h-[700px] flex-1">
          <ScrollArea className="min-w-[200px] max-w-[700px] max-h-[700px] flex-1">
            <div className="pb-4 pr-6 space-y-4">
              {subscriptions.map((item, index) => {
                const normalizedCategory = item.category.toLowerCase().replace(/\s+/g, "");
                const colorInfo = categoryColorMap[normalizedCategory] || { colorClass: "gray", colorRGB: "rgba(158, 158, 158, 1)" };

                return (
                  <Card key={index} id={item.name} style={{ boxShadow: `inset 2px 0 0 0 ${colorInfo.colorRGB}` }}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{`Categoria: ${item.category} | Valor: R$${item.value}`}</CardDescription>
                      </div>
                      <CardContent>
                        <div className="flex flex-row gap-4 items-center">
                          <Pencil className="cursor-pointer w-5 h-5" />
                          <X
                            className="cursor-pointer text-red-600"
                            onClick={() => handleDelete(item.id)}
                          />
                        </div>
                      </CardContent>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>

            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer mt-5 mr-6">
                  <CardHeader className="flex items-center p-2">
                    <CardContent>
                      <div className="flex items-center w-12 h-12">
                        <CirclePlus className="w-20 h-20"></CirclePlus>
                      </div>
                    </CardContent>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <Subscription/>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assinaturas;
