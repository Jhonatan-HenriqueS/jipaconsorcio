type SimulationLead = {
  name: string;
  phone: string;
  category: string;
  simulationMode: "Parcela" | "Crédito";
  amount: number;
};

export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function isValidBrazilianPhone(value: string) {
  const digits = onlyDigits(value);
  return /^\d{10,11}$/.test(digits) && !/^(\d)\1+$/.test(digits);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function buildWhatsappUrl(number: string, lead: SimulationLead) {
  const message = [
    "Olá! Vim pelo site da JIPA Consórcios e gostaria de uma simulação.",
    "",
    `Nome: ${lead.name.trim()}`,
    `Telefone: ${formatPhone(lead.phone)}`,
    `Modalidade: ${lead.category}`,
    `Simular por: ${lead.simulationMode}`,
    `Valor desejado: ${formatCurrency(lead.amount)}`,
    "",
    "Se possível, quero entender as condições e os próximos passos.",
  ].join("\n");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

