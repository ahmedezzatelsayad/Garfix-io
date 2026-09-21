"use client";

import { useState } from "react";
import {
  MessageCircle,
  Send,
  Sparkles,
  Plus,
  Trash2,
  FileText,
  CheckCircle2,
  Edit3,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useApp, useDict } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Invoice, InvoiceItem } from "@/lib/store";

type Item = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

export function OrderInvoice() {
  const t = useDict();
  const locale = useApp((s) => s.locale);
  const user = useApp((s) => s.user);
  const invoices = useApp((s) => s.invoices);
  const addInvoice = useApp((s) => s.addInvoice);
  const updateInvoice = useApp((s) => s.updateInvoice);
  const deleteInvoice = useApp((s) => s.deleteInvoice);
  const { toast } = useToast();

  const Chevron = locale === "ar" ? ChevronLeft : ChevronRight;

  const [message, setMessage] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [parsing, setParsing] = useState(false);
  const [view, setView] = useState<"chat" | "invoices">("chat");

  if (!user) return null;

  const clientInvoices = invoices[user.id] || [];

  // Local parser: extracts items, quantities, prices from natural-language messages
  const parseMessage = () => {
    if (!message.trim()) return;
    setParsing(true);
    setTimeout(() => {
      const detected = parseOrder(message, locale);
      setItems(detected);
      setParsing(false);
      if (detected.length > 0) {
        toast({
          title: t.orderInvoice.detectedItems,
          description: `${detected.length} ${locale === "ar" ? "عنصر" : "items"}`,
        });
      }
    }, 700);
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: `it-${Date.now()}`, name: "", qty: 1, price: 0 },
    ]);
  };

  const updateItem = (id: string, patch: Partial<Item>) => {
    setItems(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const removeItem = (id: string) => {
    setItems(items.filter((it) => it.id !== id));
  };

  const total = items.reduce((sum, it) => sum + it.qty * it.price, 0);

  const generateInvoice = () => {
    if (items.length === 0) {
      toast({
        title: t.orderInvoice.noItems,
        variant: "destructive",
      });
      return;
    }
    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      clientId: user.id,
      customerName: customerName || (locale === "ar" ? "عميل" : "Customer"),
      customerPhone,
      items: items.map((it) => ({
        id: it.id,
        name: it.name,
        qty: it.qty,
        price: it.price,
      })),
      notes,
      status: "draft",
      createdAt: new Date().toISOString(),
    };
    addInvoice(user.id, invoice);
    toast({
      title: `#${invoice.id.slice(-6).toUpperCase()}`,
      description: t.orderInvoice.generateInvoice,
    });

    // Reset
    setMessage("");
    setItems([]);
    setCustomerName("");
    setCustomerPhone("");
    setNotes("");
    setView("invoices");
  };

  const loadExample = (ex: string) => {
    setMessage(ex);
    setItems([]);
  };

  const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#A3E635]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#65A30D]">
            <Sparkles className="h-3 w-3" />
            {t.orderInvoice.badge}
          </span>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-[#0F172A]">
            {t.orderInvoice.title}
          </h1>
          <p className="mt-1 text-sm text-[#64748B] max-w-2xl">{t.orderInvoice.subtitle}</p>
        </div>

        {/* Toggle chat / invoices */}
        <div className="inline-flex rounded-lg border border-[#E2E8F0] bg-white p-0.5">
          <button
            onClick={() => setView("chat")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              view === "chat" ? "bg-[#2563EB]/10 text-[#2563EB]" : "text-[#64748B]"
            )}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {locale === "ar" ? "محادثة" : "Chat"}
          </button>
          <button
            onClick={() => setView("invoices")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              view === "invoices" ? "bg-[#2563EB]/10 text-[#2563EB]" : "text-[#64748B]"
            )}
          >
            <FileText className="h-3.5 w-3.5" />
            {t.orderInvoice.myInvoices} ({clientInvoices.length})
          </button>
        </div>
      </div>

      {view === "chat" ? (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: chat input + parsed items */}
          <div className="lg:col-span-3 space-y-4">
            {/* WhatsApp-style chat box */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">
                    {locale === "ar" ? "رسالة العميل" : "Customer message"}
                  </div>
                  <div className="text-[10px] text-[#64748B]">
                    {locale === "ar" ? "اكتب زي الواتساب" : "Type like WhatsApp"}
                  </div>
                </div>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.orderInvoice.chatPlaceholder}
                rows={5}
                className="w-full px-4 py-3 text-sm text-[#0F172A] focus:outline-none resize-none"
              />

              <div className="px-3 py-2 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
                <button
                  onClick={parseMessage}
                  disabled={parsing || !message.trim()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1E40AF] transition-colors disabled:opacity-50"
                >
                  {parsing ? (
                    <>
                      <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                      {t.orderInvoice.parsing}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      {t.orderInvoice.parse}
                    </>
                  )}
                </button>
                <span className="text-[10px] text-[#64748B]">
                  {locale === "ar" ? "الذكاء الاصطناعي يحلل الرسالة" : "AI parses the message"}
                </span>
              </div>
            </div>

            {/* Examples */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                {t.orderInvoice.examplesTitle}
              </div>
              <div className="space-y-1.5">
                {t.orderInvoice.examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => loadExample(ex)}
                    className="block w-full text-start rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Detected items (editable) */}
            {items.length > 0 && (
              <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#EFF6FF] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Edit3 className="h-4 w-4 text-[#2563EB]" />
                    <h3 className="font-display text-sm font-bold text-[#0F172A]">
                      {t.orderInvoice.editItems}
                    </h3>
                  </div>
                  <button
                    onClick={addItem}
                    className="inline-flex items-center gap-1 rounded-md bg-[#2563EB]/10 px-2 py-1 text-xs font-medium text-[#2563EB] hover:bg-[#2563EB]/20 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    {t.orderInvoice.addRow}
                  </button>
                </div>

                <div className="divide-y divide-[#E2E8F0]">
                  {items.map((it) => (
                    <div key={it.id} className="grid grid-cols-12 gap-2 px-3 py-2 items-center">
                      <input
                        type="text"
                        value={it.name}
                        onChange={(e) => updateItem(it.id, { name: e.target.value })}
                        placeholder={t.orderInvoice.item}
                        className="col-span-6 rounded-md border border-[#E2E8F0] px-2 py-1.5 text-xs focus:border-[#2563EB] focus:outline-none"
                      />
                      <input
                        type="number"
                        value={it.qty}
                        min={1}
                        onChange={(e) => updateItem(it.id, { qty: Math.max(1, Number(e.target.value) || 1) })}
                        className="col-span-2 rounded-md border border-[#E2E8F0] px-2 py-1.5 text-xs tabular focus:border-[#2563EB] focus:outline-none"
                      />
                      <input
                        type="number"
                        value={it.price}
                        min={0}
                        onChange={(e) => updateItem(it.id, { price: Math.max(0, Number(e.target.value) || 0) })}
                        className="col-span-3 rounded-md border border-[#E2E8F0] px-2 py-1.5 text-xs tabular focus:border-[#2563EB] focus:outline-none"
                      />
                      <button
                        onClick={() => removeItem(it.id)}
                        className="col-span-1 inline-flex items-center justify-center text-[#EF4444] hover:bg-red-50 rounded-md p-1"
                        aria-label={t.orderInvoice.delete}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">{t.orderInvoice.total}</span>
                  <span className="font-display text-lg font-extrabold text-[#0F172A] tabular">
                    {fmt(total)} {t.pricing.calc.currency}
                  </span>
                </div>
              </div>
            )}

            {/* Customer info + actions */}
            {items.length > 0 && (
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="block text-xs font-semibold text-[#475569] mb-1.5">
                      {t.orderInvoice.customerName}
                    </span>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-semibold text-[#475569] mb-1.5">
                      {t.orderInvoice.customerPhone}
                    </span>
                    <input
                      type="tel"
                      dir="ltr"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-xs font-semibold text-[#475569] mb-1.5">
                    {t.orderInvoice.notes}
                  </span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
                  />
                </label>

                <button
                  onClick={generateInvoice}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#2563EB]/25 hover:bg-[#1E40AF] transition-colors"
                >
                  <Send className="h-4 w-4" />
                  {t.orderInvoice.generateInvoice}
                </button>
              </div>
            )}
          </div>

          {/* Right: How it works */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#EFF6FF] p-5">
              <h3 className="font-display text-sm font-bold text-[#0F172A]">
                {t.orderInvoice.howItWorks}
              </h3>
              <ol className="mt-4 space-y-3">
                {t.orderInvoice.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white text-xs font-bold tabular">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">{s.title}</div>
                      <div className="text-[11px] text-[#475569] mt-0.5 leading-relaxed">{s.desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      ) : (
        // Invoices list
        <div className="space-y-4">
          {clientInvoices.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white/50 p-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-[#CBD5E1]" />
              <p className="mt-3 text-sm text-[#64748B]">{t.orderInvoice.noInvoices}</p>
              <button
                onClick={() => setView("chat")}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                {locale === "ar" ? "ابدأ محادثة جديدة" : "Start a new chat"}
                <Chevron className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {clientInvoices.map((inv) => {
                  const invTotal = inv.items.reduce((s, it) => s + it.qty * it.price, 0);
                  const statusInfo = {
                    draft: { label: t.orderInvoice.status.draft, className: "bg-slate-100 text-slate-600" },
                    sent: { label: t.orderInvoice.status.sent, className: "bg-[#2563EB]/10 text-[#2563EB]" },
                    paid: { label: t.orderInvoice.status.paid, className: "bg-[#A3E635]/15 text-[#65A30D]" },
                  }[inv.status];
                  return (
                    <article
                      key={inv.id}
                      className="rounded-2xl border border-[#E2E8F0] bg-white p-5 card-hover hover:shadow-md hover:border-[#2563EB]/20"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-display text-xs text-[#64748B]">
                            {t.orderInvoice.invoiceNumber}
                          </div>
                          <div className="font-mono text-sm font-bold text-[#0F172A]">
                            #{inv.id.slice(-6).toUpperCase()}
                          </div>
                        </div>
                        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold", statusInfo.className)}>
                          {statusInfo.label}
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="text-xs text-[#64748B]">{inv.customerName}</div>
                        {inv.customerPhone && (
                          <div className="text-[10px] text-[#94A3B8] tabular" dir="ltr">{inv.customerPhone}</div>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-[#64748B]">{t.orderInvoice.totalAmount}</div>
                          <div className="font-display text-lg font-extrabold text-[#0F172A] tabular">
                            {fmt(invTotal)} <span className="text-xs font-normal text-[#64748B]">{t.pricing.calc.currency}</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-[#64748B]">
                          {inv.items.length} {t.orderInvoice.itemsCount}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-1">
                        {inv.status !== "sent" && inv.status !== "paid" && (
                          <button
                            onClick={() => updateInvoice(user.id, inv.id, { status: "sent" })}
                            className="flex-1 inline-flex items-center justify-center gap-1 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1.5 text-[10px] font-medium text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                          >
                            <Send className="h-3 w-3" />
                            {t.orderInvoice.markSent}
                          </button>
                        )}
                        {inv.status !== "paid" && (
                          <button
                            onClick={() => updateInvoice(user.id, inv.id, { status: "paid" })}
                            className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-[#A3E635]/15 text-[#65A30D] px-2 py-1.5 text-[10px] font-semibold hover:bg-[#A3E635]/25 transition-colors"
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            {t.orderInvoice.markPaid}
                          </button>
                        )}
                        <button
                          onClick={() => deleteInvoice(user.id, inv.id)}
                          className="inline-flex items-center justify-center rounded-md p-1.5 text-[#EF4444] hover:bg-red-50 transition-colors"
                          aria-label={t.orderInvoice.delete}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Local parser — extracts items from natural-language messages.
 *
 * Supports patterns like:
 *   - "2 تيشيرت بـ 250"
 *   - "1 jacket at 800"
 *   - "3 كيلو قهوة بـ 150"
 *   - "5x product 200"
 *
 * Each detected item: { qty, name, price }.
 * Lines joined by "+", "،", newlines, or "and" are split.
 */
function parseOrder(message: string, locale: "ar" | "en"): Item[] {
  const items: Item[] = [];
  // Split on + ، , and newline
  const parts = message
    .split(/[\+,،\n]|و(?:\s|$)|\band\b/i)
    .map((p) => p.trim())
    .filter(Boolean);

  // Pattern: optional qty, item name, optional "at/بـ" + price
  // Numbers can be Arabic or Latin
  const toLatin = (s: string) =>
    s.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

  for (const part of parts) {
    const text = toLatin(part);

    // Match: <qty> <name> <price-marker> <price>
    // Examples:
    //   "2 تيشيرت قطن بـ 250"
    //   "1 jacket at 800 EGP"
    //   "3x coffee 150"
    const m = text.match(
      /^(?:(\d+)\s*x?\s*)?(.+?)(?:\s+(?:بـ|بـ\s*price|at|@|price|بسعر)\s*)(\d+(?:\.\d+)?)\s*(?:جنيه|egp|ج\.م|le)?\s*$/i
    );

    if (m) {
      const qty = m[1] ? parseInt(m[1], 10) : 1;
      const name = m[2].trim();
      const price = parseFloat(m[3]);
      if (name && !isNaN(price)) {
        items.push({
          id: `it-${Date.now()}-${items.length}`,
          name,
          qty,
          price,
        });
        continue;
      }
    }

    // Pattern: <qty> <name> only (no price)
    const m2 = text.match(/^(?:(\d+)\s*x?\s+)(.+)$/);
    if (m2) {
      const qty = parseInt(m2[1], 10);
      const name = m2[2].trim();
      if (name) {
        items.push({
          id: `it-${Date.now()}-${items.length}`,
          name,
          qty,
          price: 0,
        });
        continue;
      }
    }
  }

  return items;
}
