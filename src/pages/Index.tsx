import { useState } from "react";

const breathingImg = "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/f67f7531-d660-4c15-b7e1-3fca266e6d4b.jpg";
const groundingImg = "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/2d37f3a8-9356-4032-94df-823f07491def.jpg";
const relaxImg = "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/472df3be-71da-42b8-94a9-7dcf7f82542d.jpg";

const quizQuestions = [
  "Мне легко и спокойно",
  "Я чувствую себя напряжённым",
  "Я чувствую внутреннее удовлетворение",
  "Я расстроен",
  "Я чувствую себя свободно",
  "Я взволнован",
  "Я беспокоюсь о возможных неудачах",
  "Я чувствую себя отдохнувшим",
  "Я испытываю чувство тревоги",
  "Я чувствую себя уверенно",
];

const quizOptions = ["Нет", "Немного", "Да", "Совсем да"];

export default function Index() {
  const [quizAnswers, setQuizAnswers] = useState<number[]>(Array(10).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const score = quizAnswers.reduce((sum, v, i) => {
    if (v === -1) return sum;
    const reversed = [0, 2, 4, 7, 9];
    const val = reversed.includes(i) ? 3 - v : v;
    return sum + val;
  }, 0);

  const allAnswered = quizAnswers.every((a) => a !== -1);

  const getLevel = () => {
    if (score <= 7) return { label: "Низкая тревога", color: "#2d6a4f", desc: "Ты справляешься хорошо! Но карточки всё равно пригодятся." };
    if (score <= 15) return { label: "Умеренная тревога", color: "#40916c", desc: "Есть напряжение. Попробуй техники — они помогут снизить фон." };
    if (score <= 22) return { label: "Высокая тревога", color: "#e6a817", desc: "Тревога заметная. Регулярная практика техник очень поможет." };
    return { label: "Острая тревога", color: "#c1121f", desc: "Сейчас трудно. Начни с техники дыхания прямо сейчас." };
  };

  const level = getLevel();

  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif", background: "#eaf4ee", minHeight: "100vh" }}>

      {/* ===== APP VIEW (screen only) ===== */}
      <div className="screen-only">
        <div style={{ background: "#1b4332", color: "white", padding: "20px 24px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 12, color: "#95d5b2", marginBottom: 4 }}>
            Зуева Дарья · Великий Новгород
          </div>
          <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 30, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
            Острая тревога
          </h1>
          <p style={{ fontSize: 12, color: "#95d5b2", margin: "6px 0 0", fontWeight: 500 }}>
            Снижение тревожности у подростков за счёт эффективных практик
          </p>
        </div>

        <div style={{ background: "#d8f3dc", borderBottom: "1px solid #95d5b2", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16 }}>🖨️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1b4332" }}>Макет для печати и вырезания</div>
            <div style={{ fontSize: 10, color: "#2d6a4f" }}>Нажми <strong>Ctrl+P</strong> чтобы распечатать карточки A4</div>
          </div>
          <button onClick={() => window.print()} style={{ background: "#2d6a4f", color: "white", border: "none", borderRadius: 6, padding: "7px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
            Печать
          </button>
        </div>

        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1b4332", marginBottom: 12 }}>Предпросмотр карточек:</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
            {techniques.map((t) => (
              <div key={t.num} style={{ background: "white", borderRadius: 10, border: `2px solid ${t.color}`, overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
                <div style={{ background: t.color, color: "white", padding: "7px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: "'Caveat',cursive", fontSize: 15, fontWeight: 700, opacity: 0.65 }}>{t.num}</span>
                  <span style={{ fontFamily: "'Caveat',cursive", fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>{t.title}</span>
                </div>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: 9.5, color: "#555", marginBottom: 5, fontStyle: "italic" }}>{t.subtitle}</div>
                  {t.steps.slice(0, 3).map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 5, marginBottom: 2.5 }}>
                      <span style={{ fontSize: 9, color: t.color, fontWeight: 700, minWidth: 10, marginTop: 1 }}>{i + 1}.</span>
                      <span style={{ fontSize: 9.5, color: "#333", lineHeight: 1.4 }}>{s}</span>
                    </div>
                  ))}
                  <div style={{ fontSize: 8.5, color: "#aaa", marginTop: 3 }}>+ ещё {t.steps.length - 3} шага...</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quiz */}
          <div style={{ background: "white", borderRadius: 12, border: "2px solid #2d6a4f", padding: 16, marginTop: 14 }}>
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 20, fontWeight: 700, color: "#1b4332", marginBottom: 4 }}>📋 Опросник тревожности</div>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 12 }}>Как вы себя чувствуете? Ответьте на 10 вопросов</div>
            {quizQuestions.map((q, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#1b4332", marginBottom: 4 }}>{i + 1}. {q}</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {quizOptions.map((opt, j) => (
                    <button key={j} onClick={() => { const n = [...quizAnswers]; n[i] = j; setQuizAnswers(n); setShowResult(false); }}
                      style={{ flex: 1, padding: "4px 2px", fontSize: 9, borderRadius: 5, border: `1.5px solid ${quizAnswers[i] === j ? "#2d6a4f" : "#ddd"}`, background: quizAnswers[i] === j ? "#2d6a4f" : "white", color: quizAnswers[i] === j ? "white" : "#555", cursor: "pointer", fontWeight: quizAnswers[i] === j ? 700 : 400, transition: "all 0.15s", fontFamily: "'Golos Text',sans-serif" }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {allAnswered && (
              <button onClick={() => setShowResult(true)} style={{ width: "100%", background: "#2d6a4f", color: "white", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Golos Text',sans-serif", marginTop: 4 }}>
                Узнать результат →
              </button>
            )}
            {showResult && (
              <div style={{ background: "#d8f3dc", borderRadius: 8, padding: 12, marginTop: 10, border: `2px solid ${level.color}` }}>
                <div style={{ fontFamily: "'Caveat',cursive", fontSize: 20, fontWeight: 700, color: level.color }}>{level.label}</div>
                <div style={{ fontSize: 11, color: "#333", marginTop: 4 }}>{level.desc}</div>
                <div style={{ fontSize: 10, color: "#777", marginTop: 4 }}>Баллы: {score} из 30</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== PRINT LAYOUT (print only) ===== */}
      <PrintLayout />
    </div>
  );
}

interface Technique {
  num: string;
  title: string;
  subtitle: string;
  img?: string;
  emoji?: string;
  color: string;
  lightColor: string;
  steps: string[];
  tip: string;
}

const techniques: Technique[] = [
  {
    num: "01", title: "Дыхание 4-7-8", subtitle: "Быстро успокаивает нервную систему",
    img: breathingImg, color: "#2d6a4f", lightColor: "#d8f3dc",
    steps: ["Сядь удобно, спина прямая", "Вдох через нос — 4 секунды", "Задержи дыхание — 7 секунд", "Выдох через рот — 8 секунд", "Повтори 3–4 раза"],
    tip: "Работает в любом месте — в школе, автобусе, дома",
  },
  {
    num: "02", title: "Техника 5-4-3-2-1", subtitle: "Возвращает в настоящий момент",
    img: groundingImg, color: "#1b4332", lightColor: "#b7e4c7",
    steps: ["Назови 5 вещей, которые ВИДИШЬ", "Назови 4 вещи, которые СЛЫШИШЬ", "Потрогай 3 предмета и назови их", "Почувствуй 2 запаха вокруг", "Назови 1 вкус во рту"],
    tip: "Помогает при панике — отвлекает мозг от тревожных мыслей",
  },
  {
    num: "03", title: "Мышечное расслабление", subtitle: "Снимает напряжение в теле",
    img: relaxImg, color: "#40916c", lightColor: "#d8f3dc",
    steps: ["Сожми кулаки изо всех сил — 5 сек", "Резко расслабь руки — 10 сек", "Напряги плечи к ушам — 5 сек", "Опусти и расслабь — 10 сек", "Повтори с ногами и животом"],
    tip: "Тело и разум связаны — расслабив тело, успокоишь мысли",
  },
  {
    num: "04", title: "Холодная вода", subtitle: "Мгновенное снижение паники",
    emoji: "🚿", color: "#52b788", lightColor: "#d8f3dc",
    steps: ["Умойся холодной водой", "Или подержи запястья под холодной водой 30 сек", "Можно держать лёд в руках", "Дыши медленно пока делаешь это", "Почувствуй, как напряжение уходит"],
    tip: "Холод активирует рефлекс «нырка» — замедляет сердцебиение",
  },
  {
    num: "05", title: "Письмо тревоге", subtitle: "Выгружает мысли из головы",
    emoji: "✏️", color: "#2d6a4f", lightColor: "#b7e4c7",
    steps: ["Возьми листок или открой заметки", "Напиши: «Я тревожусь о том, что...»", "Перечисли всё, что беспокоит", "Напиши: «Что я могу сделать сейчас?»", "Выбери одно маленькое действие"],
    tip: "Мысли на бумаге — мозг перестаёт «крутить» их по кругу",
  },
  {
    num: "06", title: "Квадратное дыхание", subtitle: "Балансирует нервную систему",
    emoji: "⬜", color: "#1b4332", lightColor: "#d8f3dc",
    steps: ["Представь квадрат перед собой", "Вдох — взгляд вверх, считай до 4", "Задержка — вправо, считай до 4", "Выдох — вниз, считай до 4", "Задержка — влево, считай до 4"],
    tip: "Можно делать незаметно на уроке — просто двигай глазами",
  },
];

function PrintLayout() {
  return (
    <div className="print-grid">

      {/* 1. ОБЛОЖКА */}
      <div className="pcard cover-card">
        <div style={{ background: "linear-gradient(160deg,#1b4332 0%,#2d6a4f 60%,#40916c 100%)", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "18px 16px 14px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.07, fontSize: 40, lineHeight: 1.4, overflow: "hidden", userSelect: "none" }}>
            🌿🌱🍃🌿🌱🍃🌿<br />🍃🌿🌱🍃🌿🌱🍃<br />🌱🍃🌿🌱🍃🌿🌱<br />🌿🌱🍃🌿🌱🍃🌿<br />🍃🌿🌱🍃🌿🌱🍃
          </div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 11, color: "#95d5b2", fontWeight: 600, letterSpacing: 1 }}>
              Зуева Дарья · Великий Новгород
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ width: 40, height: 2, background: "#52b788", margin: "0 auto 10px" }} />
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 34, fontWeight: 700, color: "white", lineHeight: 1.1, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
              ОСТРАЯ<br />ТРЕВОГА
            </div>
            <div style={{ width: 40, height: 2, background: "#52b788", margin: "10px auto 12px" }} />
            <div style={{ fontSize: 9.5, color: "#b7e4c7", lineHeight: 1.5, fontWeight: 600, maxWidth: 140, margin: "0 auto" }}>
              Снижение тревожности<br />у подростков за счёт<br />эффективных практик
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 18 }}>💚</div>
          </div>
        </div>
      </div>

      {/* 2. ОГЛАВЛЕНИЕ */}
      <div className="pcard">
        <div className="pcard-inner">
          <div className="pcard-head" style={{ background: "#2d6a4f" }}>
            <span className="pcard-htitle">Оглавление</span>
          </div>
          <div className="pcard-body">
            {[
              "Тревожиться — не страшно",
              "Опросник: как ты сейчас?",
              "Твой результат",
              "Дыхание 4-7-8",
              "Техника 5-4-3-2-1",
              "Расслабление мышц",
              "Холодная вода",
              "Письмо тревоге",
              "Квадратное дыхание",
            ].map((title, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 5 }}>
                <span style={{ fontSize: 10, color: "#333", fontWeight: 600, flex: 1 }}>{title}</span>
                <span style={{ fontSize: 8, color: "#aaa", borderBottom: "1px dotted #bbb", flex: "0 0 30px" }} />
                <span style={{ fontSize: 10, color: "#2d6a4f", fontWeight: 700, minWidth: 14, textAlign: "right" }}>{i + 3}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pcard-page">2</div>
      </div>

      {/* 3. ЧТО ТАКОЕ ТРЕВОГА */}
      <div className="pcard">
        <div className="pcard-inner">
          <div className="pcard-head" style={{ background: "#d8f3dc", borderBottom: "2px solid #52b788" }}>
            <span className="pcard-htitle" style={{ color: "#1b4332" }}>Тревожиться — не страшно</span>
          </div>
          <div className="pcard-body">
            <p style={{ fontSize: 10, color: "#222", lineHeight: 1.55, margin: "0 0 7px", fontWeight: 500 }}>
              Тревога — это нормальная реакция организма. Она сигнализирует об опасности и помогает быть внимательнее.
            </p>
            <p style={{ fontSize: 10, color: "#222", lineHeight: 1.55, margin: "0 0 7px", fontWeight: 500 }}>
              Каждый человек тревожится. Это не слабость и не болезнь.
            </p>
            <div style={{ background: "#b7e4c7", borderLeft: "3px solid #2d6a4f", borderRadius: "0 6px 6px 0", padding: "6px 8px", marginBottom: 8, fontSize: 9.5, color: "#1b4332", lineHeight: 1.5, fontWeight: 600 }}>
              💡 Разница между тревогой и тревожным расстройством — в том, мешает ли она жить каждый день.
            </div>
            <p style={{ fontSize: 10, color: "#222", lineHeight: 1.55, margin: "0 0 6px", fontWeight: 500 }}>
              Эти карточки помогут <strong>быстро снизить тревогу</strong> в любой ситуации. Чем чаще практикуешь — тем легче!
            </p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
              <img src={breathingImg} alt="" style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 8, opacity: 0.75, border: "2px solid #52b788" }} />
            </div>
          </div>
        </div>
        <div className="pcard-page">3</div>
      </div>

      {/* 4. ОПРОСНИК */}
      <div className="pcard">
        <div className="pcard-inner">
          <div className="pcard-head" style={{ background: "#2d6a4f" }}>
            <span className="pcard-htitle">Как вы себя чувствуете?</span>
          </div>
          <div className="pcard-body">
            <p style={{ fontSize: 9, color: "#555", marginBottom: 6, fontWeight: 600 }}>
              Обведи цифру: <strong>1</strong> — нет, <strong>2</strong> — немного, <strong>3</strong> — да, <strong>4</strong> — совсем да
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {["Мне легко и спокойно", "Я чувствую напряжение", "Я внутренне удовлетворён", "Я расстроен", "Я чувствую себя свободно", "Я взволнован", "Беспокоюсь о неудачах", "Чувствую себя отдохнувшим", "Испытываю чувство тревоги", "Чувствую уверенность"].map((q, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #e8f5e9" }}>
                    <td style={{ fontSize: 9.5, color: "#222", padding: "3px 4px 3px 0", lineHeight: 1.3, fontWeight: 500 }}>{i + 1}. {q}</td>
                    <td style={{ fontSize: 10, color: "#2d6a4f", fontWeight: 700, whiteSpace: "nowrap", paddingLeft: 4 }}>1 · 2 · 3 · 4</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pcard-page">4</div>
      </div>

      {/* 5. РЕЗУЛЬТАТ */}
      <div className="pcard">
        <div className="pcard-inner">
          <div className="pcard-head" style={{ background: "#d8f3dc", borderBottom: "2px solid #52b788" }}>
            <span className="pcard-htitle" style={{ color: "#1b4332" }}>Подсчёт результата</span>
          </div>
          <div className="pcard-body">
            <p style={{ fontSize: 9.5, color: "#333", marginBottom: 8, lineHeight: 1.5, fontWeight: 500 }}>
              Сложи все цифры. Вопросы 1, 3, 5, 8, 10 считаются наоборот: 1→4, 2→3, 3→2, 4→1
            </p>
            {[
              { range: "10–19", label: "Низкая тревога", color: "#2d6a4f" },
              { range: "20–29", label: "Умеренная тревога", color: "#52b788" },
              { range: "30–39", label: "Высокая тревога", color: "#e6a817" },
              { range: "40+", label: "Острая тревога", color: "#c1121f" },
            ].map((r) => (
              <div key={r.range} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, background: "#f9fdf9", borderRadius: 5, padding: "4px 6px", border: `1px solid ${r.color}30` }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: r.color, minWidth: 32 }}>{r.range}</span>
                <span style={{ fontSize: 10, color: "#333", flex: 1, fontWeight: 600 }}>{r.label}</span>
                <span style={{ fontSize: 8, color: "#aaa", border: `1px solid ${r.color}`, borderRadius: 3, padding: "1px 6px" }}>___</span>
              </div>
            ))}
            <div style={{ background: "#b7e4c7", borderRadius: 6, padding: "6px 8px", marginTop: 6, fontSize: 10, color: "#1b4332", fontWeight: 700 }}>
              📌 Мой результат: _____ баллов
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
              <img src={groundingImg} alt="" style={{ width: 65, height: 65, objectFit: "cover", borderRadius: 7, opacity: 0.75, border: "2px solid #52b788" }} />
            </div>
          </div>
        </div>
        <div className="pcard-page">5</div>
      </div>

      {/* TECHNIQUE CARDS */}
      {techniques.map((t, idx) => (
        <div className="pcard" key={t.num}>
          <div className="pcard-inner">
            <div className="pcard-head" style={{ background: t.color }}>
              <span style={{ fontFamily: "'Caveat',cursive", fontSize: 16, fontWeight: 700, color: "white", opacity: 0.6, minWidth: 22 }}>{t.num}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Caveat',cursive", fontSize: 16, fontWeight: 700, color: "white", lineHeight: 1.15 }}>{t.title}</div>
                <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{t.subtitle}</div>
              </div>
            </div>
            <div className="pcard-body">
              <div style={{ marginBottom: 8 }}>
                {t.steps.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 9.5, color: "white", background: t.color, borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                    <span style={{ fontSize: 10, color: "#222", lineHeight: 1.45, fontWeight: 500 }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                {t.img ? (
                  <img src={t.img} alt="" style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 6, opacity: 0.8, border: `1.5px solid ${t.color}50`, flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: 6, background: t.lightColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, border: `1.5px solid ${t.color}50` }}>
                    {t.emoji}
                  </div>
                )}
                <div style={{ background: t.lightColor, borderRadius: 5, padding: "5px 7px", fontSize: 9, color: "#1b4332", lineHeight: 1.5, fontWeight: 600, border: `1px solid ${t.color}40` }}>
                  <span style={{ fontWeight: 700, color: t.color }}>💡 Совет: </span>{t.tip}
                </div>
              </div>
            </div>
          </div>
          <div className="pcard-page">{idx + 6}</div>
        </div>
      ))}

      {/* BACK / ФИНАЛЬНАЯ */}
      <div className="pcard cover-card">
        <div style={{ background: "linear-gradient(135deg,#1b4332 0%,#40916c 100%)", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, fontSize: 30, lineHeight: 1.6, display: "flex", flexWrap: "wrap", overflow: "hidden", userSelect: "none" }}>
            {"🌿🌱🍃".repeat(30)}
          </div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 20px" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>💚</div>
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 24, fontWeight: 700, color: "white", marginBottom: 8 }}>Ты справишься!</div>
            <div style={{ fontSize: 10.5, color: "#b7e4c7", lineHeight: 1.7, fontWeight: 500 }}>
              Тревога — это временно.<br />Твои инструменты<br />всегда с тобой.
            </div>
            <div style={{ marginTop: 16, width: 40, height: 1, background: "#52b788", margin: "14px auto 10px" }} />
            <div style={{ fontSize: 9, color: "#52b788", fontWeight: 600 }}>Зуева Дарья · Великий Новгород</div>
          </div>
        </div>
      </div>

    </div>
  );
}