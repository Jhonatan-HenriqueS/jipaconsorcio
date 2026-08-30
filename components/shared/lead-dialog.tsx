"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import {
  buildWhatsappUrl,
  formatCurrency,
  formatPhone,
  isValidBrazilianPhone,
  onlyDigits,
} from "@/lib/whatsapp";

type LeadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  mode: "Parcela" | "Crédito";
  amount: number;
};

type Errors = Partial<Record<"name" | "phone" | "consent", string>>;

export function LeadDialog({
  open,
  onOpenChange,
  category,
  mode,
  amount,
}: LeadDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Errors = {};
    const cleanName = name.trim();

    if (cleanName.length < 2 || !/^[A-Za-zÀ-ÿ' -]+$/.test(cleanName)) {
      nextErrors.name = "Informe seu nome usando apenas letras.";
    }
    if (!isValidBrazilianPhone(phone)) {
      nextErrors.phone = "Informe um telefone brasileiro com DDD.";
    }
    if (!consent) {
      nextErrors.consent = "Você precisa autorizar o contato para continuar.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const url = buildWhatsappUrl(siteConfig.whatsappNumber, {
      name: cleanName,
      phone: onlyDigits(phone),
      category,
      simulationMode: mode,
      amount,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lead-dialog">
        <DialogHeader>
          <p className="eyebrow">Último passo</p>
          <DialogTitle>Simule o plano ideal pra sua vida.</DialogTitle>
          <DialogDescription>
            Antes de iniciar a simulação online, nos informe alguns dados:
          </DialogDescription>
        </DialogHeader>

        <div className="simulation-summary" aria-label="Resumo da simulação">
          <span>{category}</span>
          <strong>{formatCurrency(amount)}</strong>
          <small>Simulação por {mode.toLowerCase()}</small>
        </div>

        <form onSubmit={submitLead} noValidate>
          <div className="form-field">
            <label htmlFor="lead-name">Nome</label>
            <input
              id="lead-name"
              name="name"
              autoComplete="name"
              maxLength={60}
              value={name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "lead-name-error" : undefined}
              onChange={(event) => setName(event.target.value)}
            />
            {errors.name ? (
              <p className="field-error" id="lead-name-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="lead-phone">Telefone com DDD</label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={16}
              placeholder="(69) 99999-9999"
              value={phone}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "lead-phone-error" : undefined}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
            />
            {errors.phone ? (
              <p className="field-error" id="lead-phone-error">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div className="consent-field">
            <input
              id="lead-consent"
              type="checkbox"
              checked={consent}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={
                errors.consent ? "lead-consent-error" : undefined
              }
              onChange={(event) => setConsent(event.target.checked)}
            />
            <label htmlFor="lead-consent">
              Li a{" "}
              <Link href="/politica-de-privacidade" prefetch={false}>
                Política de Privacidade
              </Link>{" "}
              e autorizo o uso dos dados informados para que a JIPA Consórcios
              entre em contato e realize esta simulação.
            </label>
          </div>
          {errors.consent ? (
            <p
              className="field-error"
              id="lead-consent-error"
              aria-live="polite"
            >
              {errors.consent}
            </p>
          ) : null}

          <Button type="submit" className="dialog-submit" size="lg">
            Continuar no WhatsApp
            <ArrowUpRight aria-hidden="true" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
