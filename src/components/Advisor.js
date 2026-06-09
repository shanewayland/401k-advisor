"use client";

import { useState, useRef } from "react";

const SECTIONS = [
  {
    id: "s1",
    title: "Section 1: Financials",
    questions: [
      {
        id: "net_worth",
        text: "What is your approximate net worth (excluding your principal residence)?",
        scored: false,
        options: ["Under $100K", "$100K – $300K", "$300K – $500K", "$500K – $750K", "$750K – $1.0M", "$1.0M – $3.0M", "Over $3M"],
      },
      {
        id: "liquid_net_worth",
        text: "What is your liquid net worth? (assets that can be readily converted to cash)",
        scored: false,
        options: ["Under $25K", "$25K – $50K", "$50K – $100K", "$100K – $250K", "$250K – $500K", "Over $500K"],
      },
      {
        id: "income",
        text: "What is your current household income?",
        scored: false,
        options: ["Under $50K", "$50K – $100K", "$100K – $150K", "$150K – $250K", "$250K – $500K", "Over $500K"],
      },
      {
        id: "tax_bracket",
        text: "What is your federal income tax bracket?",
        scored: false,
        options: ["10%", "12%", "22%", "24%", "32%", "35%", "37%"],
      },
      {
        id: "emergency_funds",
        text: "If you needed immediate funds equal to 1/4 the value of your investment accounts, where would you obtain the money?",
        scored: true,
        options: [
          { label: "All from this portfolio", score: 0 },
          { label: "At least 75% from this portfolio, remainder from other savings", score: 1 },
          { label: "50% from this portfolio, remainder from other savings", score: 2 },
          { label: "Less than 25% from this portfolio, remainder from other savings", score: 3 },
          { label: "All from other savings and investments", score: 4 },
        ],
      },
    ],
  },
  {
    id: "s2",
    title: "Section 2: Goals",
    questions: [
      {
        id: "objective",
        text: "What is your investment objective?",
        scored: true,
        options: [
          { label: "Preserve Principal", score: 0 },
          { label: "Income", score: 3 },
          { label: "Income and Growth", score: 6 },
          { label: "Growth", score: 9 },
          { label: "Aggressive Growth", score: 12 },
        ],
      },
      {
        id: "withdrawal_timeline",
        text: "When do you expect to begin withdrawals on a regular basis from your investment accounts?",
        scored: true,
        options: [
          { label: "Less than 1 year", score: 0 },
          { label: "1–3 years", score: 3 },
          { label: "4–6 years", score: 6 },
          { label: "7–10 years", score: 9 },
          { label: "More than 10 years", score: 12 },
        ],
      },
      {
        id: "income_reliance",
        text: "Today, how much do you rely on income from your investment accounts?",
        scored: true,
        options: [
          { label: "Heavily", score: 0 },
          { label: "Moderately", score: 1 },
          { label: "Slightly", score: 2 },
          { label: "Not at all", score: 4 },
        ],
      },
    ],
  },
  {
    id: "s3",
    title: "Section 3: Risk Tolerance",
    questions: [
      {
        id: "experience",
        text: "What is your investment experience?",
        scored: false,
        options: ["None", "Limited", "Moderate", "Extensive"],
      },
      {
        id: "risk_tolerance_self",
        text: "Indicate the response that best describes your risk tolerance.",
        scored: true,
        options: [
          { label: "Conservative — Accepting of lower returns for a higher degree of stability; seeks principal preservation and minimizing risk", score: 0 },
          { label: "Moderately Conservative — Comfortable accepting a small degree of risk and volatility; accepting of lower returns in exchange for minimal losses", score: 2 },
          { label: "Moderate — Accepting of modest risks to seek higher long-term returns; accepting of short-term losses of principal in exchange for long-term appreciation", score: 4 },
          { label: "Moderately Aggressive — Willing to accept significant risk; may endure large losses in favor of potentially higher long-term returns", score: 6 },
          { label: "Aggressive — Willing to accept substantial risk; maximizing long-term returns is more important than protecting principal", score: 8 },
        ],
      },
      {
        id: "portfolio_1yr",
        text: "Which hypothetical portfolio are you most comfortable with, considering the possible range of returns, for $100,000 invested over a 1-YEAR period?",
        scored: true,
        note: "A: Best $105K / Worst $102K  |  B: Best $107K / Worst $100K  |  C: Best $110K / Worst $95K  |  D: Best $115K / Worst $90K  |  E: Best $125K / Worst $75K",
        options: [
          { label: "Portfolio A — Best: $105K / Worst: $102K (very low risk)", score: 0 },
          { label: "Portfolio B — Best: $107K / Worst: $100K (low risk)", score: 1 },
          { label: "Portfolio C — Best: $110K / Worst: $95K (moderate risk)", score: 2 },
          { label: "Portfolio D — Best: $115K / Worst: $90K (moderate-high risk)", score: 3 },
          { label: "Portfolio E — Best: $125K / Worst: $75K (high risk)", score: 4 },
        ],
      },
      {
        id: "portfolio_5yr",
        text: "Which hypothetical portfolio are you most comfortable with, considering the possible outcomes of $100,000 invested for 5-YEARS?",
        scored: true,
        note: "A: Best $120K / Worst $105K  |  B: Best $135K / Worst $90K  |  C: Best $145K / Worst $85K  |  D: Best $160K / Worst $80K  |  E: Best $180K / Worst $70K",
        options: [
          { label: "Portfolio A — Best: $120K / Worst: $105K (very low risk)", score: 0 },
          { label: "Portfolio B — Best: $135K / Worst: $90K (low risk)", score: 3 },
          { label: "Portfolio C — Best: $145K / Worst: $85K (moderate risk)", score: 6 },
          { label: "Portfolio D — Best: $160K / Worst: $80K (moderate-high risk)", score: 9 },
          { label: "Portfolio E — Best: $180K / Worst: $70K (high risk)", score: 12 },
        ],
      },
      {
        id: "short_term_loss",
        text: "Historically, markets have experienced sharp, short-term downturns. If your investment portfolio lost 25% of its value over TWO DAYS, how would you react?",
        scored: true,
        options: [
          { label: "I would immediately move all my holdings to cash", score: 0 },
          { label: "I would immediately change to strategies that are more conservative", score: 3 },
          { label: "I would wait at least 3 months before deciding to make any changes", score: 6 },
          { label: "I would immediately change to strategies that are more aggressive", score: 9 },
          { label: "I would immediately add to my portfolio and buy more equities to take advantage of the lower prices", score: 12 },
        ],
      },
      {
        id: "prolonged_loss",
        text: "Historically, markets have experienced prolonged periods of declines. If your investment portfolio lost 33% of its value over the last 3 MONTHS, how would you react?",
        scored: true,
        options: [
          { label: "I would immediately move all my holdings to cash", score: 0 },
          { label: "I would immediately change to strategies that are more conservative", score: 3 },
          { label: "I would wait at least 3 months before deciding to make any changes", score: 6 },
          { label: "I would immediately change to strategies that are more aggressive", score: 9 },
          { label: "I would immediately add to my portfolio and buy more equities to take advantage of the lower prices", score: 12 },
        ],
      },
    ],
  },
];

function getRiskProfile(score) {
  if (score <= 12) return { label: "Conservative", color: "#2563eb", description: "Accepting of lower returns for a higher degree of stability. Seeks principal preservation and minimizing risk." };
  if (score <= 28) return { label: "Moderately Conservative", color: "#0891b2", description: "Comfortable accepting a small degree of risk and volatility. Accepting of lower returns in exchange for minimal losses." };
  if (score <= 51) return { label: "Moderate", color: "#16a34a", description: "Accepting of modest risks to seek higher long-term returns. Accepting of short-term losses of principal in exchange for long-term appreciation." };
  if (score <= 67) return { label: "Moderately Aggressive", color: "#d97706", description: "Willing to accept significant risk. May endure large losses in favor of potentially higher long-term returns." };
  return { label: "Aggressive", color: "#dc2626", description: "Willing to accept substantial risk. Maximizing long-term returns is more important than protecting principal." };
}

function calcScore(answers) {
  let total = 0;
  SECTIONS.forEach((sec) => {
    sec.questions.forEach((q) => {
      if (!q.scored) return;
      const ans = answers[q.id];
      if (ans !== undefined) total += q.options[ans].score;
    });
  });
  return total;
}

const MAX_SCORE = 80;

function buildPdfHtml({ userName, riskProfile, score, answers, funds, result, date }) {
  const getAnswerLabel = (q, idx) => {
    if (idx === undefined) return "—";
    const opt = q.options[idx];
    return typeof opt === "string" ? opt : opt.label.split("—")[0].trim();
  };
  const fundList = funds.filter((f) => f.name || f.ticker);
  const sections = { ALLOCATION: [], RATIONALE: [], "CLIENT SUMMARY": [], CAVEATS: [] };
  let cur = null;
  result.split("\n").forEach((line) => {
    const t = line.trim();
    const match = Object.keys(sections).find((s) => t.toUpperCase().startsWith(s));
    if (match) { cur = match; return; }
    if (cur && t) sections[cur].push(t);
  });
  const pct = Math.round((score / MAX_SCORE) * 100);

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>401(k) Allocation Guide</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:Arial,sans-serif;color:#1a1a2e;font-size:10pt;line-height:1.55;}
.page{max-width:760px;margin:0 auto;padding:44px 52px;}
.header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;border-bottom:3px solid #0f2557;margin-bottom:24px;}
.brand{font-size:17pt;font-weight:700;color:#0f2557;}
.brand-sub{font-size:8pt;color:#6b7280;margin-top:3px;text-transform:uppercase;letter-spacing:.5px;}
.meta{text-align:right;font-size:8.5pt;color:#6b7280;line-height:1.6;}
.meta strong{display:block;font-size:9.5pt;color:#0f2557;font-weight:700;margin-bottom:2px;}
.banner{background:#f0f4ff;border-left:4px solid #0f2557;padding:12px 18px;border-radius:0 6px 6px 0;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;}
.client-name{font-size:13pt;font-weight:700;color:#0f2557;}
.client-sub{font-size:8.5pt;color:#374151;margin-top:2px;}
.badge{background:${riskProfile.color};color:#fff;padding:5px 14px;border-radius:20px;font-size:9.5pt;font-weight:700;}
.sec-title{font-size:8pt;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#0f2557;border-bottom:1px solid #d1d5db;padding-bottom:4px;margin-bottom:10px;margin-top:20px;}
.score-row{display:flex;align-items:center;gap:10px;font-size:9pt;margin-top:8px;}
.bar-bg{flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden;}
.bar-fill{height:100%;width:${pct}%;background:${riskProfile.color};border-radius:4px;}
.score-lbl{color:${riskProfile.color};font-weight:700;font-size:9.5pt;white-space:nowrap;}
table{width:100%;border-collapse:collapse;font-size:8.5pt;}
th{background:#0f2557;color:#fff;padding:6px 9px;text-align:left;font-weight:600;}
td{padding:5px 9px;border:1px solid #e5e7eb;}
tr:nth-child(odd) td{background:#f8faff;}
.result-sec-title{font-size:8pt;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#0f2557;margin:14px 0 6px;}
.result-line{font-size:9.5pt;margin-bottom:3px;}
.bullet{padding-left:12px;position:relative;}
.bullet::before{content:"•";position:absolute;left:0;color:#0f2557;}
.disclosure-box{margin-top:28px;padding:14px 16px;background:#f8faff;border:1px solid #d1d5db;border-radius:6px;font-size:7.5pt;color:#6b7280;line-height:1.55;}
.disclosure-title{font-weight:700;color:#374151;font-size:8pt;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;}
.footer{margin-top:20px;padding-top:12px;border-top:1px solid #e5e7eb;font-size:7pt;color:#9ca3af;line-height:1.5;}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}.page{padding:32px 40px;}}
</style></head><body><div class="page">
<div class="header">
  <div><div class="brand">Vitality Wealth Advisors</div><div class="brand-sub">Financial Wellness | 401(k) Guidance Tool</div></div>
  <div class="meta"><strong>401(k) Allocation Guide</strong>Generated: ${date}<br/>For Personal Use Only</div>
</div>
<div class="banner">
  <div><div class="client-name">${userName || "My 401(k) Plan"}</div><div class="client-sub">Personalized allocation guidance based on your risk assessment</div></div>
  <div class="badge">${riskProfile.label}</div>
</div>
<div class="sec-title">Risk Profile Score</div>
<div class="score-row">
  <span style="color:#6b7280;">Score: <strong>${score} / ${MAX_SCORE}</strong></span>
  <div class="bar-bg"><div class="bar-fill"></div></div>
  <span class="score-lbl">${riskProfile.label}</span>
</div>
<p style="font-size:8.5pt;color:#374151;margin-top:8px;">${riskProfile.description}</p>
<div class="sec-title">Risk Assessment Responses</div>
<table>
  <tr><th style="width:55%">Question</th><th>Response</th></tr>
  ${SECTIONS.flatMap((sec) => sec.questions.map((q) => `<tr><td>${q.text}</td><td>${getAnswerLabel(q, answers[q.id])}</td></tr>`)).join("")}
</table>
${fundList.length > 0 ? `
<div class="sec-title">Available Plan Funds</div>
<table>
  <tr><th>Fund Name</th><th style="width:90px">Ticker</th></tr>
  ${fundList.map((f) => `<tr><td>${f.name || f.ticker || "—"}</td><td style="font-family:monospace;font-size:8pt">${f.ticker || "—"}</td></tr>`).join("")}
</table>` : ""}
<div class="sec-title">Allocation Recommendation</div>
${Object.entries(sections).map(([title, lines]) => lines.length === 0 ? "" : `
  <div class="result-sec-title">${title}</div>
  ${lines.map((l) => { const isBullet = l.startsWith("-") || /^\d+\./.test(l); const text = l.replace(/^[-•]\s*/,"").replace(/^\d+\.\s*/,""); return `<div class="result-line ${isBullet?"bullet":""}">${text}</div>`; }).join("")}
`).join("")}
<div class="disclosure-box">
  <div class="disclosure-title">Important — Please Read</div>
  <p>This tool is provided for educational and informational purposes only. It is not financial advice and does not constitute a recommendation to buy or sell any security. The allocation guidance generated here is based solely on your answers to the risk questionnaire and the fund names you entered. It does not account for your complete financial picture, tax situation, other investments, or personal circumstances.</p>
  <br/>
  <p>Use this as a starting point for your own research. Past performance is not indicative of future results. All investing involves risk, including the possible loss of principal. Vitality Wealth Advisors LLC makes no guarantee as to the accuracy or completeness of this output. You use this tool at your own risk.</p>
</div>
<div class="footer">© ${new Date().getFullYear()} Vitality Wealth Advisors LLC. This document was generated by an automated tool and does not constitute professional financial advice. Not a substitute for personalized guidance from a qualified financial advisor.</div>
</div></body></html>`;
}

export default function Advisor() {
  const [step, setStep] = useState("intro");
  const [userName, setUserName] = useState("");
  const [answers, setAnswers] = useState({});
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [funds, setFunds] = useState([{ name: "", ticker: "" }]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const iframeRef = useRef(null);

  const score = calcScore(answers);
  const riskProfile = getRiskProfile(score);
  const currentSection = SECTIONS[sectionIdx];
  const currentQuestion = currentSection?.questions[questionIdx];
  const currentGlobalIdx = SECTIONS.slice(0, sectionIdx).reduce((n, s) => n + s.questions.length, 0) + questionIdx;
  const totalQuestions = SECTIONS.flatMap((s) => s.questions).length;

  function handleAnswer(qid, optionIdx) {
    setAnswers({ ...answers, [qid]: optionIdx });
    setTimeout(() => advance(), 280);
  }

  function advance() {
    const section = SECTIONS[sectionIdx];
    if (questionIdx < section.questions.length - 1) {
      setQuestionIdx(questionIdx + 1);
    } else if (sectionIdx < SECTIONS.length - 1) {
      setSectionIdx(sectionIdx + 1);
      setQuestionIdx(0);
    } else {
      setStep("funds");
    }
  }

  function goBack() {
    if (questionIdx > 0) {
      setQuestionIdx(questionIdx - 1);
    } else if (sectionIdx > 0) {
      const prev = SECTIONS[sectionIdx - 1];
      setSectionIdx(sectionIdx - 1);
      setQuestionIdx(prev.questions.length - 1);
    }
  }

  function addFund() { setFunds([...funds, { name: "", ticker: "" }]); }
  function updateFund(i, f, v) { const u = [...funds]; u[i][f] = v; setFunds(u); }
  function removeFund(i) { setFunds(funds.filter((_, idx) => idx !== i)); }
  function parsePaste(text) {
    const parsed = text.trim().split("\n").filter(Boolean).map((line) => {
      const parts = line.split(/[\t,|]+/).map((s) => s.trim()).filter(Boolean);
      if (parts.length === 1) return { name: parts[0], ticker: "" };
      const looksLikeTicker = parts[0].length <= 6 && /^[A-Z0-9]+$/.test(parts[0]);
      return looksLikeTicker ? { ticker: parts[0], name: parts.slice(1).join(" ") } : { ticker: "", name: parts.join(" ") };
    });
    if (parsed.length) setFunds(parsed);
  }

  async function callClaude(body) {
    const res = await fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.json();
  }

  async function generateRecommendation() {
    setLoading(true); setError(null);
    const validFunds = funds.filter((f) => f.name || f.ticker);
    const qaSummary = SECTIONS.flatMap((sec) =>
      sec.questions.map((q) => {
        const idx = answers[q.id];
        const opt = q.options[idx];
        const label = typeof opt === "string" ? opt : opt?.label?.split("—")[0]?.trim() ?? "—";
        return `- ${q.text}\n  Answer: ${label ?? "Not answered"}`;
      })
    ).join("\n");

    try {
      const tickerFunds = validFunds.filter((f) => f.ticker.trim());
      let fundDataText = "";

      if (tickerFunds.length > 0) {
        const lookupData = await callClaude({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{
            role: "user",
            content: `You are a financial data assistant. For each mutual fund ticker below, look up its data and return ONLY a JSON array — no prose, no markdown.\n\nEach object must have: ticker, name, category (e.g. "Large Blend", "Intermediate Core Bond"), expenseRatio (e.g. "0.04%"), objective (one sentence).\n\nTickers: ${tickerFunds.map((f) => f.ticker.trim()).join(", ")}\n\nReturn ONLY the JSON array.`,
          }],
        });
        const rawText = lookupData.content?.filter((b) => b.type === "text").map((b) => b.text).join("") || "";
        try {
          const parsed = JSON.parse(rawText.replace(/```json|```/g, "").trim());
          if (Array.isArray(parsed)) {
            fundDataText = parsed.map((f) => `- ${f.ticker}: ${f.name} | Category: ${f.category} | Expense Ratio: ${f.expenseRatio} | Objective: ${f.objective}`).join("\n");
          }
        } catch { /* fall through */ }
      }

      const noTickerText = validFunds.filter((f) => !f.ticker.trim()).map((f) => `- ${f.name}`).join("\n");
      const fullFundContext = [fundDataText, noTickerText].filter(Boolean).join("\n");

      const allocData = await callClaude({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `You are a fiduciary 401(k) investment advisor. Using the verified fund data and risk assessment below, build a specific allocation recommendation.\n\nCLIENT: ${userName || "Plan Participant"}\nRISK SCORE: ${score} / 80\nRISK PROFILE: ${riskProfile.label}\nPROFILE DESCRIPTION: ${riskProfile.description}\n\nCOMPLETED RISK ASSESSMENT:\n${qaSummary}\n\nAVAILABLE PLAN FUNDS:\n${fullFundContext || "No funds provided — give general allocation guidance by asset class"}\n\nUse fund categories and objectives to make an informed allocation. For funds without tickers, infer asset class from the name.\n\nRespond in exactly these four sections:\n\nALLOCATION\nList each fund with percentage. Must sum to 100%. Group by asset class.\n\nRATIONALE\nExplain why this fits the client's risk profile, time horizon, and goals.\n\nCLIENT SUMMARY\n2-3 paragraphs in plain language. No jargon.\n\nCAVEATS\n3-5 specific watch items.`,
        }],
      });

      const allocText = allocData.content?.map((b) => b.text || "").join("") || "";
      if (!allocText) throw new Error();
      setResult(allocText);
      setStep("results");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handlePdf() {
    setPdfLoading(true);
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const html = buildPdfHtml({ userName, riskProfile, score, answers, funds, result, date });
    const iframe = iframeRef.current;
    iframe.srcdoc = html;
    iframe.onload = () => setTimeout(() => { iframe.contentWindow.print(); setPdfLoading(false); }, 400);
  }

  function reset() {
    setStep("intro"); setAnswers({}); setSectionIdx(0); setQuestionIdx(0);
    setFunds([{ name: "", ticker: "" }]); setResult(null); setUserName("");
  }

  return (
    <div style={S.shell}>
      <iframe ref={iframeRef} style={{ position:"fixed",top:-9999,left:-9999,width:1,height:1,border:"none" }} title="pdf" />

      <header style={S.header}>
        <div style={S.headerLeft}>
          <span style={S.logoMark}>◆</span>
          <div>
            <div style={S.brandName}>Vitality Wealth Advisors</div>
            <div style={S.brandSub}>401(k) Allocation Guide</div>
          </div>
        </div>
      </header>

      <main style={S.main}>
        {step === "intro" && (
          <div style={S.card}>
            <h1 style={S.cardTitle}>401(k) Allocation Guide</h1>
            <p style={S.cardSub}>Answer a few questions about your finances and risk comfort level, enter the funds in your 401(k) plan, and get a personalized allocation to consider.</p>
            <div style={S.introSteps}>
              {[["1","Complete a risk assessment (10 questions, about 3 minutes)"],["2","Enter the funds available in your 401(k) plan"],["3","Get a suggested allocation you can save as a PDF"]].map(([n,t]) => (
                <div key={n} style={S.introStep}><span style={S.stepNum}>{n}</span><span style={S.stepText}>{t}</span></div>
              ))}
            </div>
            <div style={S.fieldGroup}>
              <label style={S.label}>Your Name</label>
              <input style={S.input} placeholder="e.g. John Smith" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div style={S.disclaimerBox}>This tool provides educational guidance only — not financial advice. Results are based solely on your inputs. You use this at your own risk.</div>
            <button style={S.btnPrimary} onClick={() => setStep("questions")}>Get Started →</button>
          </div>
        )}

        {step === "questions" && currentQuestion && (
          <div style={S.card}>
            <div style={S.sectionLabel}>{currentSection.title}</div>
            <div style={S.progressRow}>
              <span style={S.progressText}>Question {currentGlobalIdx + 1} of {totalQuestions}</span>
              <div style={S.progressBarBg}><div style={{ ...S.progressBarFill, width:`${((currentGlobalIdx+1)/totalQuestions)*100}%` }} /></div>
            </div>
            <h2 style={S.questionText}>{currentQuestion.text}</h2>
            {currentQuestion.note && <div style={S.noteBox}>{currentQuestion.note}</div>}
            <div style={S.optionsList}>
              {currentQuestion.options.map((opt, oi) => {
                const label = typeof opt === "string" ? opt : opt.label;
                const selected = answers[currentQuestion.id] === oi;
                return (
                  <button key={oi} style={{ ...S.optionBtn, ...(selected ? S.optionSelected : {}) }} onClick={() => handleAnswer(currentQuestion.id, oi)}>
                    <span style={S.optionCheck}>{selected ? "●" : "○"}</span><span>{label}</span>
                  </button>
                );
              })}
            </div>
            <div style={S.navRow}>
              {(sectionIdx > 0 || questionIdx > 0) && <button style={S.btnBack} onClick={goBack}>← Back</button>}
              {answers[currentQuestion.id] !== undefined && (
                <button style={{ ...S.btnPrimary, margin:0, width:"auto", paddingLeft:28, paddingRight:28 }} onClick={advance}>
                  {currentGlobalIdx === totalQuestions - 1 ? "Continue to Funds →" : "Next →"}
                </button>
              )}
            </div>
          </div>
        )}

        {step === "funds" && (
          <div style={S.card}>
            <div style={{ ...S.riskBadge, background: riskProfile.color }}>{riskProfile.label} — Score: {score}/{MAX_SCORE}</div>
            <h2 style={S.cardTitle}>Available Plan Funds</h2>
            <p style={S.cardSub}>Enter the mutual funds available in your 401(k) plan. You can paste a list or enter manually.</p>
            <details style={S.pasteBox}>
              <summary style={S.pasteSummary}>📋 Paste fund list (one fund per line)</summary>
              <textarea style={S.pasteArea} rows={5} placeholder={"Vanguard 500 Index Fund\nFidelity US Bond Index\n\nWith tickers:\nVFINX Vanguard 500 Index Fund\nFXNAX Fidelity US Bond Index"} onBlur={(e) => { if (e.target.value) parsePaste(e.target.value); }} />
            </details>
            {funds.map((f, i) => (
              <div key={i} style={S.fundCard}>
                <div style={S.fundCardRow}>
                  <input style={{ ...S.input, margin:0, flex:1 }} placeholder="Fund name" value={f.name} onChange={(e) => updateFund(i,"name",e.target.value)} />
                  <button style={S.removeBtn} onClick={() => removeFund(i)}>✕</button>
                </div>
                <input style={{ ...S.input, margin:0, fontFamily:"monospace", fontSize:13 }} placeholder="Ticker (e.g. VFINX)" value={f.ticker} onChange={(e) => updateFund(i,"ticker",e.target.value)} />
              </div>
            ))}
            <button style={{ ...S.btnBack, marginTop:8 }} onClick={addFund}>+ Add Fund</button>
            {error && <div style={S.errorBox}>{error}</div>}
            <div style={S.navRow}>
              <button style={S.btnBack} onClick={() => { setStep("questions"); setSectionIdx(2); setQuestionIdx(5); }}>← Back</button>
              <button style={{ ...S.btnPrimary, margin:0, width:"auto", paddingLeft:28, paddingRight:28, opacity: loading ? 0.6 : 1 }} disabled={loading} onClick={generateRecommendation}>
                {loading ? "Looking up funds & generating…" : "Generate Recommendation →"}
              </button>
            </div>
          </div>
        )}

        {step === "results" && result && (
          <div style={S.card}>
            <div style={S.resultsTop}>
              <div>
                <h2 style={S.cardTitle}>{userName ? `${userName}'s` : "Your"} Allocation Guide</h2>
                <div style={{ ...S.riskBadge, background: riskProfile.color, marginTop:6 }}>{riskProfile.label} | Score: {score}/{MAX_SCORE}</div>
              </div>
              <button style={S.btnPdf} onClick={handlePdf} disabled={pdfLoading}>{pdfLoading ? "⏳ Preparing…" : "📄 Export PDF"}</button>
            </div>
            <div style={S.resultBody}>
              {result.split("\n").map((line, i) => {
                if (/^(ALLOCATION|RATIONALE|CLIENT SUMMARY|CAVEATS)/i.test(line.trim())) return <h3 key={i} style={S.resultSecTitle}>{line.trim()}</h3>;
                if (line.trim().startsWith("-") || /^\d+\./.test(line.trim())) return <div key={i} style={S.resultBullet}>{line}</div>;
                if (!line.trim()) return <div key={i} style={{ height:8 }} />;
                return <p key={i} style={S.resultP}>{line}</p>;
              })}
            </div>
            <div style={S.disclosureBanner}>This is educational guidance only — not financial advice. Review this with a financial professional before making changes to your 401(k).</div>
            <div style={S.navRow}>
              <button style={S.btnBack} onClick={reset}>Start Over</button>
              <button style={S.btnBack} onClick={() => navigator.clipboard.writeText(result)}>📋 Copy</button>
            </div>
          </div>
        )}
      </main>

      <footer style={S.footer}>Vitality Wealth Advisors LLC | Financial Wellness | Educational Use Only</footer>
    </div>
  );
}

const S = {
  shell: { minHeight:"100vh", background:"#f0f4ff", fontFamily:"'Inter',system-ui,sans-serif", display:"flex", flexDirection:"column" },
  header: { background:"#0f2557", padding:"14px 32px", display:"flex", alignItems:"center" },
  headerLeft: { display:"flex", alignItems:"center", gap:12 },
  logoMark: { color:"#60a5fa", fontSize:22 },
  brandName: { color:"#fff", fontWeight:700, fontSize:15, letterSpacing:"-0.3px" },
  brandSub: { color:"#93c5fd", fontSize:11, marginTop:1 },
  main: { flex:1, display:"flex", justifyContent:"center", alignItems:"flex-start", padding:"40px 16px" },
  card: { background:"#fff", borderRadius:16, boxShadow:"0 4px 24px rgba(0,0,0,0.09)", padding:"36px 44px", width:"100%", maxWidth:660 },
  cardTitle: { fontSize:22, fontWeight:800, color:"#0f2557", margin:"0 0 8px" },
  cardSub: { color:"#6b7280", fontSize:14, lineHeight:1.6, margin:"0 0 24px" },
  introSteps: { display:"flex", flexDirection:"column", gap:10, marginBottom:28 },
  introStep: { display:"flex", alignItems:"flex-start", gap:12 },
  stepNum: { width:28, height:28, borderRadius:"50%", background:"#eff6ff", color:"#1a56db", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, flexShrink:0 },
  stepText: { fontSize:14, color:"#374151", lineHeight:1.5, paddingTop:4 },
  fieldGroup: { marginBottom:16 },
  label: { display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:6 },
  input: { width:"100%", padding:"9px 12px", border:"1px solid #d1d5db", borderRadius:8, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" },
  disclaimerBox: { background:"#fffbeb", border:"1px solid #fde68a", borderRadius:8, padding:"11px 14px", fontSize:12, color:"#92400e", lineHeight:1.55, margin:"0 0 16px" },
  btnPrimary: { background:"#0f2557", color:"#fff", border:"none", borderRadius:8, padding:"12px 24px", fontSize:15, fontWeight:600, cursor:"pointer", width:"100%", marginTop:4 },
  btnBack: { background:"transparent", color:"#374151", border:"1px solid #d1d5db", borderRadius:8, padding:"9px 18px", fontSize:14, cursor:"pointer" },
  btnPdf: { background:"#0f2557", color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontSize:14, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" },
  sectionLabel: { fontSize:11, fontWeight:700, letterSpacing:"0.8px", textTransform:"uppercase", color:"#1a56db", marginBottom:8 },
  progressRow: { display:"flex", alignItems:"center", gap:10, marginBottom:20 },
  progressText: { fontSize:12, color:"#6b7280", whiteSpace:"nowrap" },
  progressBarBg: { flex:1, height:5, background:"#e5e7eb", borderRadius:4, overflow:"hidden" },
  progressBarFill: { height:"100%", background:"#0f2557", borderRadius:4, transition:"width 0.3s" },
  questionText: { fontSize:18, fontWeight:700, color:"#0f2557", margin:"0 0 16px", lineHeight:1.4 },
  noteBox: { background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#0369a1", marginBottom:14 },
  optionsList: { display:"flex", flexDirection:"column", gap:9, marginBottom:20 },
  optionBtn: { display:"flex", alignItems:"flex-start", gap:10, padding:"11px 14px", textAlign:"left", border:"1.5px solid #e2e8f0", borderRadius:10, background:"#f9fafb", cursor:"pointer", fontSize:13.5, color:"#374151", fontFamily:"inherit", lineHeight:1.45 },
  optionSelected: { borderColor:"#0f2557", background:"#eff6ff", color:"#0f2557", fontWeight:600 },
  optionCheck: { flexShrink:0, fontSize:14, marginTop:1 },
  navRow: { display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:16, gap:12 },
  riskBadge: { display:"inline-flex", alignItems:"center", color:"#fff", padding:"5px 14px", borderRadius:20, fontSize:13, fontWeight:700, marginBottom:10 },
  pasteBox: { border:"1px solid #e2e8f0", borderRadius:8, padding:"10px 14px", marginBottom:16, background:"#f9fafb" },
  pasteSummary: { cursor:"pointer", fontSize:13, fontWeight:600, color:"#374151" },
  pasteArea: { width:"100%", marginTop:8, padding:"8px", border:"1px solid #d1d5db", borderRadius:6, fontSize:12, fontFamily:"monospace", boxSizing:"border-box", resize:"vertical" },
  fundCard: { display:"flex", flexDirection:"column", gap:6, marginBottom:12, padding:"10px 12px", background:"#f9fafb", border:"1px solid #e5e7eb", borderRadius:10 },
  fundCardRow: { display:"flex", alignItems:"center", gap:8 },
  removeBtn: { background:"none", border:"none", color:"#9ca3af", cursor:"pointer", fontSize:15, padding:0, flexShrink:0 },
  errorBox: { background:"#fef2f2", border:"1px solid #fecaca", color:"#dc2626", borderRadius:8, padding:"10px 14px", fontSize:13, marginTop:12 },
  resultsTop: { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 },
  resultBody: { background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:10, padding:"20px 24px", maxHeight:420, overflowY:"auto" },
  resultSecTitle: { fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#0f2557", margin:"18px 0 7px", borderBottom:"1px solid #e2e8f0", paddingBottom:3 },
  resultBullet: { fontSize:13.5, color:"#374151", lineHeight:1.6, paddingLeft:4 },
  resultP: { fontSize:13.5, color:"#374151", lineHeight:1.6, margin:"3px 0" },
  disclosureBanner: { marginTop:16, background:"#fffbeb", border:"1px solid #fde68a", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#92400e", lineHeight:1.5 },
  footer: { textAlign:"center", padding:"14px", fontSize:11, color:"#9ca3af", borderTop:"1px solid #e2e8f0", background:"#fff" },
};
