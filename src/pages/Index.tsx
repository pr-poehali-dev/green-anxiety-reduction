import { useState } from "react";

const breathingImg = "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/f67f7531-d660-4c15-b7e1-3fca266e6d4b.jpg";
const groundingImg = "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/2d37f3a8-9356-4032-94df-823f07491def.jpg";
const relaxImg = "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/472df3be-71da-42b8-94a9-7dcf7f82542d.jpg";

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
  forLevel: number[]; // 0=низкая,1=умеренная,2=высокая,3=острая
}

const techniques: Technique[] = [
  {
    num: "01",
    title: "Дыхание 4-7-8",
    subtitle: "Быстро успокаивает нервную систему",
    img: breathingImg,
    color: "#2d6a4f",
    lightColor: "#d8f3dc",
    steps: [
      "Сядь удобно, спина прямая",
      "Вдох через нос — медленно считай до 4",
      "Задержи дыхание — считай до 7",
      "Выдох через рот — считай до 8",
      "Повтори 3–4 раза подряд",
    ],
    tip: "Работает в любом месте — в школе, автобусе, дома",
    forLevel: [1, 2, 3],
  },
  {
    num: "02",
    title: "Техника 5-4-3-2-1",
    subtitle: "Возвращает в настоящий момент",
    img: groundingImg,
    color: "#1b4332",
    lightColor: "#b7e4c7",
    steps: [
      "Назови 5 вещей, которые ВИДИШЬ",
      "Назови 4 вещи, которые СЛЫШИШЬ",
      "Потрогай 3 предмета и назови их",
      "Почувствуй 2 запаха вокруг",
      "Назови 1 вкус во рту",
    ],
    tip: "Помогает при панике — отвлекает мозг от тревожных мыслей",
    forLevel: [2, 3],
  },
  {
    num: "03",
    title: "Мышечное расслабление",
    subtitle: "Снимает напряжение в теле",
    img: relaxImg,
    color: "#40916c",
    lightColor: "#d8f3dc",
    steps: [
      "Сожми кулаки изо всех сил — 5 сек",
      "Резко расслабь руки — 10 сек",
      "Напряги плечи к ушам — 5 сек",
      "Опусти и расслабь — 10 сек",
      "Повтори с ногами и животом",
    ],
    tip: "Тело и разум связаны — расслабив тело, успокоишь мысли",
    forLevel: [1, 2],
  },
  {
    num: "04",
    title: "Холодная вода",
    subtitle: "Мгновенное снижение паники",
    emoji: "🚿",
    color: "#52b788",
    lightColor: "#d8f3dc",
    steps: [
      "Умойся холодной водой",
      "Или подержи запястья под холодной водой 30 сек",
      "Можно сжать кубик льда в руках",
      "Дыши медленно пока делаешь это",
      "Почувствуй, как напряжение уходит",
    ],
    tip: "Холод активирует рефлекс «нырка» — замедляет сердцебиение",
    forLevel: [3],
  },
  {
    num: "05",
    title: "Письмо тревоге",
    subtitle: "Выгружает мысли из головы",
    emoji: "✏️",
    color: "#2d6a4f",
    lightColor: "#b7e4c7",
    steps: [
      "Возьми листок или открой заметки",
      "Напиши: «Я тревожусь о том, что...»",
      "Перечисли всё, что беспокоит",
      "Напиши: «Что я могу сделать прямо сейчас?»",
      "Выбери одно маленькое действие",
    ],
    tip: "Мысли на бумаге — мозг перестаёт «крутить» их по кругу",
    forLevel: [0, 1],
  },
  {
    num: "06",
    title: "Квадратное дыхание",
    subtitle: "Балансирует нервную систему",
    emoji: "⬜",
    color: "#1b4332",
    lightColor: "#d8f3dc",
    steps: [
      "Представь квадрат перед собой",
      "Вдох — взгляд вверх, считай до 4",
      "Задержка — взгляд вправо, до 4",
      "Выдох — взгляд вниз, до 4",
      "Задержка — взгляд влево, до 4",
    ],
    tip: "Можно делать незаметно на уроке — просто двигай глазами",
    forLevel: [0, 1, 2],
  },
];

const quizQuestions = [
  { text: "Мне легко и спокойно", reversed: true },
  { text: "Я чувствую себя напряжённым", reversed: false },
  { text: "Я чувствую внутреннее удовлетворение", reversed: true },
  { text: "Я расстроен", reversed: false },
  { text: "Я чувствую себя свободно", reversed: true },
  { text: "Я взволнован", reversed: false },
  { text: "Я беспокоюсь о возможных неудачах", reversed: false },
  { text: "Я чувствую себя отдохнувшим", reversed: true },
  { text: "Я испытываю чувство тревоги", reversed: false },
  { text: "Я чувствую себя уверенно", reversed: true },
];

const quizOpts = ["Нет", "Немного", "Да", "Совсем да"];

export default function Index() {
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const score = answers.reduce((sum, v, i) => {
    if (v === -1) return sum;
    return sum + (quizQuestions[i].reversed ? 3 - v : v);
  }, 0);

  const allAnswered = answers.every((a) => a !== -1);

  const levelIdx = score <= 7 ? 0 : score <= 15 ? 1 : score <= 22 ? 2 : 3;
  const levels = [
    { label: "Низкая тревога", color: "#2d6a4f", rec: "Письмо тревоге или квадратное дыхание" },
    { label: "Умеренная тревога", color: "#40916c", rec: "Дыхание 4-7-8 или мышечное расслабление" },
    { label: "Высокая тревога", color: "#e6a817", rec: "Дыхание 4-7-8 или техника 5-4-3-2-1" },
    { label: "Острая тревога", color: "#c1121f", rec: "Холодная вода + техника 5-4-3-2-1" },
  ];
  const level = levels[levelIdx];
  const recommended = techniques.filter((t) => t.forLevel.includes(levelIdx));

  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif", background: "#eaf4ee", minHeight: "100vh" }}>

      {/* ===== ЭКРАН ===== */}
      <div className="screen-only">
        <div style={{ background: "#1b4332", padding: "18px 20px 14px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Caveat',cursive", fontSize: 11, color: "#95d5b2", fontWeight: 600, marginBottom: 3 }}>
            Зуева Дарья · Великий Новгород
          </div>
          <div style={{ fontFamily: "'Caveat',cursive", fontSize: 28, fontWeight: 700, color: "white", lineHeight: 1.1 }}>
            Острая тревога
          </div>
          <div style={{ fontSize: 11, color: "#95d5b2", marginTop: 5, fontWeight: 500 }}>
            Снижение тревожности у подростков за счёт эффективных практик
          </div>
        </div>

        <div style={{ background: "#d8f3dc", borderBottom: "1px solid #95d5b2", padding: "9px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span>🖨️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1b4332" }}>Макет для печати</div>
            <div style={{ fontSize: 10, color: "#2d6a4f" }}>Карточки 10×14.5 см, 1 карточка на лист A4 — вырезать по пунктирной линии</div>
          </div>
          <button onClick={() => window.print()} style={{ background: "#2d6a4f", color: "white", border: "none", borderRadius: 6, padding: "7px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'Golos Text',sans-serif" }}>
            Печать
          </button>
        </div>

        <div style={{ padding: 16 }}>
          {/* Опросник */}
          <div style={{ background: "white", borderRadius: 12, border: "2px solid #2d6a4f", padding: 16, marginBottom: 14 }}>
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 20, fontWeight: 700, color: "#1b4332", marginBottom: 3 }}>
              📋 Опросник: как ты сейчас?
            </div>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 12 }}>
              Ответь на вопросы — получишь рекомендацию подходящей техники
            </div>
            {quizQuestions.map((q, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#1b4332", marginBottom: 4 }}>{i + 1}. {q.text}</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {quizOpts.map((opt, j) => (
                    <button key={j}
                      onClick={() => { const n = [...answers]; n[i] = j; setAnswers(n); setShowResult(false); }}
                      style={{ flex: 1, padding: "4px 2px", fontSize: 9, borderRadius: 5, border: `1.5px solid ${answers[i] === j ? "#2d6a4f" : "#ddd"}`, background: answers[i] === j ? "#2d6a4f" : "white", color: answers[i] === j ? "white" : "#555", cursor: "pointer", fontWeight: answers[i] === j ? 700 : 400, fontFamily: "'Golos Text',sans-serif" }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {allAnswered && (
              <button onClick={() => setShowResult(true)}
                style={{ width: "100%", background: "#2d6a4f", color: "white", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Golos Text',sans-serif", marginTop: 4 }}>
                Узнать рекомендацию →
              </button>
            )}
            {showResult && (
              <div style={{ background: "#d8f3dc", borderRadius: 8, padding: 14, marginTop: 12, border: `2px solid ${level.color}` }}>
                <div style={{ fontFamily: "'Caveat',cursive", fontSize: 20, fontWeight: 700, color: level.color }}>{level.label}</div>
                <div style={{ fontSize: 11, color: "#333", marginTop: 4 }}>
                  <strong>Рекомендуемые техники:</strong> {level.rec}
                </div>
                <div style={{ fontSize: 10, color: "#777", marginTop: 4 }}>Баллы: {score} из 30</div>
                <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {recommended.map((t) => (
                    <span key={t.num} style={{ background: t.color, color: "white", borderRadius: 20, padding: "3px 10px", fontSize: 10, fontWeight: 700 }}>
                      {t.num} {t.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Превью техник */}
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1b4332", marginBottom: 10 }}>Все техники ({techniques.length}):</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
            {techniques.map((t) => (
              <div key={t.num} style={{ background: "white", borderRadius: 10, border: `2px solid ${t.color}`, overflow: "hidden" }}>
                <div style={{ background: t.color, padding: "7px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: "'Caveat',cursive", fontSize: 14, fontWeight: 700, color: "white", opacity: 0.65 }}>{t.num}</span>
                  <span style={{ fontFamily: "'Caveat',cursive", fontSize: 13, fontWeight: 700, color: "white", lineHeight: 1.2 }}>{t.title}</span>
                </div>
                <div style={{ padding: "7px 10px" }}>
                  <div style={{ fontSize: 9.5, color: "#555", fontStyle: "italic", marginBottom: 5 }}>{t.subtitle}</div>
                  {t.steps.slice(0, 3).map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 5, marginBottom: 2 }}>
                      <span style={{ fontSize: 9, color: t.color, fontWeight: 700 }}>{i + 1}.</span>
                      <span style={{ fontSize: 9.5, color: "#333", lineHeight: 1.4 }}>{s}</span>
                    </div>
                  ))}
                  <div style={{ fontSize: 8.5, color: "#bbb", marginTop: 3 }}>+ ещё {t.steps.length - 3} шага...</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ПЕЧАТЬ ===== */}
      <PrintLayout />
    </div>
  );
}

function PrintLayout() {
  return (
    <div className="cards-wrap">

      {/* ── 1. ОБЛОЖКА ── */}
      <Card>
        <div style={{ background: "linear-gradient(160deg,#1b4332 0%,#2d6a4f 55%,#52b788 100%)", width: "100%", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "16px 14px 12px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, fontSize: 36, lineHeight: 1.5, userSelect: "none", overflow: "hidden" }}>
            {"🌿🌱🍃".repeat(40)}
          </div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 10, color: "#95d5b2", fontWeight: 600, letterSpacing: 0.8 }}>
              Зуева Дарья · Великий Новгород
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ width: 36, height: 2, background: "#52b788", margin: "0 auto 8px" }} />
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 36, fontWeight: 700, color: "white", lineHeight: 1.05, textShadow: "0 2px 10px rgba(0,0,0,0.35)", letterSpacing: 1 }}>
              ОСТРАЯ<br />ТРЕВОГА
            </div>
            <div style={{ width: 36, height: 2, background: "#52b788", margin: "8px auto 10px" }} />
            <div style={{ fontSize: 9, color: "#b7e4c7", lineHeight: 1.6, fontWeight: 600, maxWidth: 130, margin: "0 auto" }}>
              Снижение тревожности<br />у подростков за счёт<br />эффективных практик
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1, fontSize: 20 }}>💚</div>
        </div>
      </Card>

      {/* ── 2. ТРЕВОГА — ЭТО НОРМАЛЬНО ── */}
      <Card pageNum={2}>
        <CardHead color="#d8f3dc" textColor="#1b4332" title="Тревожиться — это нормально" />
        <CardBody>
          <p style={txt}>Тревога — это <strong>естественная реакция</strong> организма. Она появляется, когда мозг замечает угрозу, и помогает нам быть внимательнее и осторожнее.</p>
          <p style={txt}>Каждый человек тревожится — это не слабость и не болезнь.</p>
          <Highlight color="#2d6a4f">
            💡 Разница между тревогой и тревожным расстройством — в том, мешает ли она жить каждый день.
          </Highlight>
          <p style={txt}>Эти карточки помогут тебе <strong>быстро снизить тревогу</strong> в любой ситуации. Чем чаще практикуешь — тем легче!</p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
            <img src={breathingImg} alt="" style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8, opacity: 0.8, border: "2px solid #52b788" }} />
          </div>
        </CardBody>
      </Card>

      {/* ── 3. ОГЛАВЛЕНИЕ ── */}
      <Card pageNum={3}>
        <CardHead color="#2d6a4f" title="Оглавление" />
        <CardBody>
          {[
            { title: "Тревожиться — это нормально", pg: 2 },
            { title: "Опросник: как ты сейчас?", pg: 4 },
            { title: "Подсчёт результата", pg: 5 },
            { title: "Техника 01 — Дыхание 4-7-8", pg: 6 },
            { title: "Техника 02 — Метод 5-4-3-2-1", pg: 7 },
            { title: "Техника 03 — Расслабление мышц", pg: 8 },
            { title: "Техника 04 — Холодная вода", pg: 9 },
            { title: "Техника 05 — Письмо тревоге", pg: 10 },
            { title: "Техника 06 — Квадратное дыхание", pg: 11 },
          ].map((row) => (
            <div key={row.pg} style={{ display: "flex", alignItems: "baseline", marginBottom: 6 }}>
              <span style={{ fontSize: 10.5, color: "#222", fontWeight: 600, flex: 1, lineHeight: 1.4 }}>{row.title}</span>
              <span style={{ flex: "0 0 24px", borderBottom: "1px dotted #b2dfdb", margin: "0 4px 2px" }} />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "#2d6a4f", minWidth: 16, textAlign: "right" }}>{row.pg}</span>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* ── 4. ОПРОСНИК ── */}
      <Card pageNum={4}>
        <CardHead color="#2d6a4f" title="Как вы себя чувствуете?" />
        <CardBody>
          <p style={{ ...txt, marginBottom: 7, fontSize: 9 }}>
            Обведи цифру: <strong>1</strong> — нет, <strong>2</strong> — немного, <strong>3</strong> — да, <strong>4</strong> — совсем да
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {["Мне легко и спокойно", "Я чувствую напряжение", "Я внутренне удовлетворён", "Я расстроен", "Я чувствую себя свободно", "Я взволнован", "Беспокоюсь о неудачах", "Чувствую себя отдохнувшим", "Испытываю тревогу", "Чувствую уверенность"].map((q, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e0f2e9" }}>
                  <td style={{ fontSize: 9.5, color: "#222", padding: "3.5px 4px 3.5px 0", lineHeight: 1.3, fontWeight: 500 }}>{i + 1}. {q}</td>
                  <td style={{ fontSize: 10, color: "#2d6a4f", fontWeight: 700, whiteSpace: "nowrap", paddingLeft: 4, fontFamily: "'Golos Text',sans-serif" }}>1 · 2 · 3 · 4</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* ── 5. РЕЗУЛЬТАТ ── */}
      <Card pageNum={5}>
        <CardHead color="#d8f3dc" textColor="#1b4332" title="Подсчёт результата" />
        <CardBody>
          <p style={{ ...txt, marginBottom: 8 }}>
            Сложи все обведённые цифры. Вопросы <strong>1, 3, 5, 8, 10</strong> считаются наоборот:<br />1→4, 2→3, 3→2, 4→1
          </p>
          {[
            { range: "10–19", label: "Низкая тревога", color: "#2d6a4f", rec: "Письмо тревоге, квадратное дыхание" },
            { range: "20–29", label: "Умеренная тревога", color: "#52b788", rec: "Дыхание 4-7-8, расслабление мышц" },
            { range: "30–39", label: "Высокая тревога", color: "#e6a817", rec: "Дыхание 4-7-8, техника 5-4-3-2-1" },
            { range: "40+", label: "Острая тревога", color: "#c1121f", rec: "Холодная вода + техника 5-4-3-2-1" },
          ].map((r) => (
            <div key={r.range} style={{ marginBottom: 6, background: "#f6fdf8", borderRadius: 5, padding: "5px 8px", border: `1.5px solid ${r.color}30` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: r.color, minWidth: 34 }}>{r.range}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#222", flex: 1 }}>{r.label}</span>
                <span style={{ fontSize: 8, color: "#aaa", border: `1px solid ${r.color}80`, borderRadius: 3, padding: "0 5px" }}>___</span>
              </div>
              <div style={{ fontSize: 8.5, color: "#666", marginTop: 2, paddingLeft: 40, fontWeight: 500 }}>→ {r.rec}</div>
            </div>
          ))}
          <div style={{ background: "#b7e4c7", borderRadius: 6, padding: "5px 8px", marginTop: 6, fontSize: 10, color: "#1b4332", fontWeight: 700 }}>
            📌 Мой результат: _____ баллов
          </div>
        </CardBody>
      </Card>

      {/* ── КАРТОЧКИ ТЕХНИК ── */}
      {techniques.map((t, idx) => (
        <Card key={t.num} pageNum={idx + 6}>
          <div style={{ background: t.color, padding: "8px 12px 7px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ fontFamily: "'Caveat',cursive", fontSize: 22, fontWeight: 700, color: "white", opacity: 0.55, lineHeight: 1 }}>{t.num}</span>
            <div>
              <div style={{ fontFamily: "'Caveat',cursive", fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1.1 }}>{t.title}</div>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{t.subtitle}</div>
            </div>
          </div>
          <CardBody>
            <div style={{ marginBottom: 9 }}>
              {t.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 7, marginBottom: 5, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 9, color: "white", background: t.color, borderRadius: "50%", width: 15, height: 15, minWidth: 15, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, marginTop: 1 }}>{i + 1}</span>
                  <span style={{ fontSize: 10.5, color: "#222", lineHeight: 1.45, fontWeight: 500 }}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              {t.img ? (
                <img src={t.img} alt="" style={{ width: 54, height: 54, objectFit: "cover", borderRadius: 7, opacity: 0.82, border: `1.5px solid ${t.color}60`, flexShrink: 0 }} />
              ) : (
                <div style={{ width: 54, height: 54, borderRadius: 7, background: t.lightColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, border: `1.5px solid ${t.color}50` }}>
                  {t.emoji}
                </div>
              )}
              <div style={{ background: t.lightColor, borderRadius: 6, padding: "6px 8px", fontSize: 9, color: "#1b4332", lineHeight: 1.55, fontWeight: 600, border: `1px solid ${t.color}40` }}>
                <span style={{ fontWeight: 700, color: t.color }}>💡 Совет: </span>{t.tip}
              </div>
            </div>
          </CardBody>
        </Card>
      ))}

      {/* ── ФИНАЛЬНАЯ ── */}
      <Card>
        <div style={{ background: "linear-gradient(135deg,#1b4332 0%,#40916c 100%)", width: "100%", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.05, fontSize: 28, lineHeight: 1.7, userSelect: "none" }}>
            {"🌿🌱🍃".repeat(40)}
          </div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 18px" }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>💚</div>
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 26, fontWeight: 700, color: "white", marginBottom: 8 }}>Ты справишься!</div>
            <div style={{ fontSize: 10.5, color: "#b7e4c7", lineHeight: 1.7, fontWeight: 500 }}>
              Тревога — это временно.<br />Твои инструменты<br />всегда с тобой.
            </div>
            <div style={{ width: 36, height: 1.5, background: "#52b788", margin: "12px auto 10px" }} />
            <div style={{ fontSize: 9, color: "#52b788", fontWeight: 600 }}>Зуева Дарья · Великий Новгород</div>
          </div>
        </div>
      </Card>

    </div>
  );
}

/* ── helpers ── */

const txt: React.CSSProperties = { fontSize: 10.5, color: "#222", lineHeight: 1.55, margin: "0 0 7px", fontWeight: 500 };

function Card({ children, pageNum }: { children: React.ReactNode; pageNum?: number }) {
  return (
    <div className="pcard">
      <div className="pcard-inner-wrap">
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {children}
        </div>
        {pageNum !== undefined && (
          <div style={{ textAlign: "center", fontSize: 7.5, color: "#aaa", padding: "3px 0 4px", fontWeight: 600, fontFamily: "'Golos Text',sans-serif", flexShrink: 0 }}>
            {pageNum}
          </div>
        )}
      </div>
    </div>
  );
}

function CardHead({ color, textColor = "white", title }: { color: string; textColor?: string; title: string }) {
  return (
    <div style={{ background: color, padding: "8px 12px 7px", flexShrink: 0, borderBottom: textColor === "white" ? "none" : "2px solid #52b788" }}>
      <span style={{ fontFamily: "'Caveat',cursive", fontSize: 18, fontWeight: 700, color: textColor, lineHeight: 1.1 }}>{title}</span>
    </div>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div style={{ flex: 1, padding: "9px 12px 6px", overflow: "hidden" }}>{children}</div>;
}

function Highlight({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div style={{ background: "#b7e4c7", borderLeft: `3px solid ${color}`, borderRadius: "0 6px 6px 0", padding: "6px 8px", marginBottom: 8, fontSize: 9.5, color: "#1b4332", lineHeight: 1.55, fontWeight: 600 }}>
      {children}
    </div>
  );
}