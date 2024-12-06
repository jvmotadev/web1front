import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactionForm } from "./transaction-config"; // Adjust the import path

export function Transaction() {
  const { formData, handleInputChange, handleSelectChange, handleSubmit } =
    useTransactionForm("saida");

  return (
    <Tabs defaultValue="saida" className="flex-1">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="saida"
          onClick={() => handleInputChange("type", "saida")}
        >
          Saídas
        </TabsTrigger>
        <TabsTrigger
          value="entrada"
          onClick={() => handleInputChange("type", "entrada")}
        >
          Entradas
        </TabsTrigger>
      </TabsList>
      <TabsContent value="saida">
        <Card>
          <CardHeader>
            <CardTitle>Saídas</CardTitle>
            <CardDescription>Gastou dinheiro? Registre aqui.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Dogão do Paulão"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="value">Valor</Label>
              <Input
                id="value"
                placeholder="25.90"
                value={formData.value === 0 ? "" : formData.value} // Show blank when value is 0
                onChange={(e) => {
                  const inputValue = e.target.value.replace(",", "."); // Handle comma as decimal separator
                  if (!isNaN(Number(inputValue)) || inputValue === "") {
                    handleInputChange("value", inputValue === "" ? 0 : parseFloat(inputValue));
                  }
                }}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="category">Categoria</Label>
              <Select
                onValueChange={handleSelectChange}
                value={formData.category}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="alimentacao">Alimentação</SelectItem>
                      <SelectItem value="transporte">Transporte</SelectItem>
                      <SelectItem value="roupas">Roupas</SelectItem>
                      <SelectItem value="moradia">Moradia</SelectItem>
                      <SelectItem value="saude">Saúde</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                      <SelectItem value="lazer">Lazer</SelectItem>
                      <SelectItem value="entretenimento">Entretenimento</SelectItem>
                      <SelectItem value="contas">Contas</SelectItem>
                      <SelectItem value="assinaturas">Assinaturas</SelectItem>
                      <SelectItem value="impostos">Impostos</SelectItem>
                      <SelectItem value="investimentos">Investimentos</SelectItem>
                      <SelectItem value="viagens">Viagens</SelectItem>
                      <SelectItem value="pets">Pets</SelectItem>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="dividas">Dívidas</SelectItem>
                      <SelectItem value="doacoes">Doações</SelectItem>
                      <SelectItem value="presentes">Presentes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                placeholder="Detalhes sobre esta saída"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="flex-1" onClick={handleSubmit}>
              Salvar Saída
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="entrada">
      <Card>
          <CardHeader>
            <CardTitle>Entradas</CardTitle>
            <CardDescription>
              Ganhou dinheiro? Registre aqui.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Pagamento " />
            </div>
            <div className="space-y-1">
                <Label htmlFor="value">Valor</Label>
                <Input id="value" placeholder="25,90" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                    <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="roupa">Salário</SelectItem>
                        <SelectItem value="viagem">Freelance</SelectItem>
                        <SelectItem value="transporte">OLX</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-1">
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" placeholder="Detalhes sobre esta saída" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="flex-1">Salvar Entrada</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
