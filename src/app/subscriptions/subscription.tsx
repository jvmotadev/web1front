import React from "react";
import { useSubscriptionForm } from "./subscription-config";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Subscription() {
  const { formData, handleInputChange, handleSelectChange, handleSubmit } = useSubscriptionForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assinaturas</CardTitle>
        <CardDescription>Registre novas assinaturas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Nome */}
        <div className="space-y-1">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            placeholder="Netflix"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>

        {/* Dia de cobrança */}
        <div className="space-y-1">
          <Label htmlFor="day">Dia de cobrança</Label>
          <Input
            id="day"
            type="number"
            placeholder="10"
            value={formData.day}
            onChange={(e) => handleInputChange("day", Number(e.target.value))}
          />
        </div>

        {/* (Opcional) Mês de cobrança para anual */}
        {/* Descomente se quiser capturar o mês
        <div className="space-y-1">
          <Label htmlFor="month">Mês (para anual)</Label>
          <Input
            id="month"
            type="number"
            placeholder="6"
            value={formData.month ?? ""}
            onChange={(e) => handleInputChange("month", Number(e.target.value))}
          />
        </div>
        */}

        {/* Valor */}
        <div className="space-y-1">
          <Label htmlFor="value">Valor</Label>
          <Input
            id="value"
            placeholder="29.90"
            value={formData.value === 0 ? "" : formData.value}
            onChange={(e) => {
              const rawInput = e.target.value;
              const inputValue = rawInput.replace(",", ".");
              const decimalRegex = /^-?\d*(\.\d*)?$/;
              const isValid = decimalRegex.test(inputValue);

              if (isValid || inputValue === "") {
                const parsedValue =
                  inputValue === "" ? 0 : inputValue === "." || inputValue.endsWith(".")
                    ? inputValue
                    : parseFloat(inputValue);
                handleInputChange("value", parsedValue);
              }
            }}
          />
        </div>

        {/* Frequência */}
        <div className="space-y-1">
          <Label htmlFor="frequency">Frequência</Label>
          <Select
            onValueChange={(value) => handleInputChange("frequency", value)}
            value={formData.frequency}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Selecione a frequência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Categoria (Agora com Select) */}
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
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="flex-1" onClick={handleSubmit}>
          Salvar Assinatura
        </Button>
      </CardFooter>
    </Card>
  );
}
