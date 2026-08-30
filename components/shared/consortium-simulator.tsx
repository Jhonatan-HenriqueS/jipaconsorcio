"use client";

import dynamic from "next/dynamic";
import { useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";

import { formatCurrency, onlyDigits } from "@/lib/whatsapp";

const LeadDialog = dynamic(
  () =>
    import("@/components/shared/lead-dialog").then(
      (module) => module.LeadDialog,
    ),
  {
    ssr: false,
    loading: () => <div />,
  },
);

const categories = [
  "Imóveis",
  "Veículos",
  "Motos",
  "Serviços",
  "Investimentos",
] as const;

type SimulationMode = "Parcela" | "Crédito";

const modeRanges: Record<
  SimulationMode,
  { min: number; max: number; step: number; initial: number }
> = {
  Parcela: { min: 300, max: 12000, step: 50, initial: 1500 },
  Crédito: { min: 40000, max: 1500000, step: 5000, initial: 200000 },
};

export function ConsortiumSimulator() {
  const formId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [category, setCategory] =
    useState<(typeof categories)[number]>("Imóveis");
  const [mode, setMode] = useState<SimulationMode>("Crédito");
  const [amount, setAmount] = useState(modeRanges.Crédito.initial);
  const [dialogOpen, setDialogOpen] = useState(false);

  const range = modeRanges[mode];
  const progress = useMemo(
    () => ((amount - range.min) / (range.max - range.min)) * 100,
    [amount, range],
  );

  function changeMode(nextMode: SimulationMode) {
    setMode(nextMode);
    setAmount(modeRanges[nextMode].initial);
  }

  function setClampedAmount(nextAmount: number) {
    if (!Number.isFinite(nextAmount)) return;
    setAmount(Math.min(range.max, Math.max(range.min, nextAmount)));
  }

  function changeDialogOpen(nextOpen: boolean) {
    setDialogOpen(nextOpen);
    if (!nextOpen) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }

  return (
    <section
      className="simulator-card"
      id="simulador"
      aria-labelledby="simulator-title"
    >
      <div className="simulator-heading">
        <span>Simulação inicial</span>
        <ShieldCheck aria-hidden="true" />
      </div>
      <h2 id="simulator-title">Comece pelo que faz sentido para você.</h2>

      <label className="field-label" htmlFor={`${formId}-category`}>
        Tipo de consórcio
      </label>
      <select
        id={`${formId}-category`}
        value={category}
        onChange={(event) => setCategory(event.target.value as typeof category)}
      >
        {categories.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <fieldset className="mode-switch">
        <legend>Simular plano por</legend>
        {(["Crédito", "Parcela"] as const).map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={mode === item}
            onClick={() => changeMode(item)}
          >
            {mode === item ? <Check aria-hidden="true" /> : null}
            {item}
          </button>
        ))}
      </fieldset>

      <label className="field-label" htmlFor={`${formId}-amount`}>
        {mode === "Crédito" ? "Valor do crédito" : "Valor da parcela"}
      </label>
      <input
        className="currency-input"
        id={`${formId}-amount`}
        inputMode="numeric"
        value={formatCurrency(amount)}
        onChange={(event) =>
          setClampedAmount(Number(onlyDigits(event.target.value)))
        }
        onBlur={() => setClampedAmount(amount)}
      />
      <input
        className="range-input"
        type="range"
        aria-label={`Selecionar ${mode.toLowerCase()}`}
        min={range.min}
        max={range.max}
        step={range.step}
        value={amount}
        style={{ "--range-progress": `${progress}%` } as CSSProperties}
        onChange={(event) => setAmount(Number(event.target.value))}
      />
      <div className="range-labels" aria-hidden="true">
        <span>{formatCurrency(range.min)}</span>
        <span>{formatCurrency(range.max)}</span>
      </div>

      <button
        ref={triggerRef}
        type="button"
        className="simulator-submit"
        onClick={() => setDialogOpen(true)}
      >
        Simular meu consórcio
        <ArrowUpRight aria-hidden="true" />
      </button>
      {dialogOpen ? (
        <LeadDialog
          open={dialogOpen}
          onOpenChange={changeDialogOpen}
          category={category}
          mode={mode}
          amount={amount}
        />
      ) : null}
    </section>
  );
}
