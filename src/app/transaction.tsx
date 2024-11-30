import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

export function Transaction() {
  return (
    <Tabs defaultValue="out" className="flex-1">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="out">Saídas</TabsTrigger>
        <TabsTrigger value="in">Entradas</TabsTrigger>
      </TabsList>
      <TabsContent value="out">
        <Card>
          <CardHeader>
            <CardTitle>Saídas</CardTitle>
            <CardDescription>
              Gastou dinheiro? Registre aqui.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Dogão do Paulão" />
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
                <Input id="description" placeholder="Detalhes sobre esta saída" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="flex-1">Salvar Saída</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="in">
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
                        <SelectItem value="salario">Salário</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="venda_usados">OLX</SelectItem>
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
  )
}
