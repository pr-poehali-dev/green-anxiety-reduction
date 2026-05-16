import { useState } from "react";

/* ── Изображения ── */
const IMG = {
  breathing: "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/64223be9-f5cd-40d4-ad08-a9cbbbd23b70.jpg",
  grounding:  "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/88138e54-0f25-4d8b-9cd0-a63bc63a75ce.jpg",
  relax:      "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/b115cbc4-650f-4d37-a4fc-1ac1dc0a7060.jpg",
  water:      "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/466f4db3-1c07-4f44-96bf-98f6ec1bfa14.jpg",
  writing:    "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/1d876826-d370-4760-972c-150c806457b6.jpg",
  square:     "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/76e20b1f-a606-4aa6-b8a4-70cc99411ff9.jpg",
  anxious:    "https://cdn.poehali.dev/projects/433d6455-e7f0-4ec5-8355-d4144802042b/files/f72af4d8-dbc3-401a-b73d-6b06b9eaf504.jpg",
};

/* ── Опросник ── */
const QUIZ = [
  { text: "Мне легко и спокойно",                 rev: true  },
  { text: "Я чувствую себя напряжённым",           rev: false },
  { text: "Я чувствую внутреннее удовлетворение",  rev: true  },
  { text: "Я расстроен",                           rev: false },
  { text: "Я чувствую себя свободно",              rev: true  },
  { text: "Я взволнован",                          rev: false },
  { text: "Я беспокоюсь о возможных неудачах",     rev: false },
  { text: "Я чувствую себя отдохнувшим",           rev: true  },
  { text: "Я испытываю чувство тревоги",           rev: false },
  { text: "Я чувствую себя уверенно",              rev: true  },
];
const OPTS = ["Нет", "Немного", "Да", "Совсем да"];

const LEVELS = [
  { label: "Низкая тревога",    color: "#2d6a4f", range: "10–19", rec: "Письмо тревоге, квадратное дыхание" },
  { label: "Умеренная тревога", color: "#52b788", range: "20–29", rec: "Дыхание 4-7-8, расслабление мышц"   },
  { label: "Высокая тревога",   color: "#e6a817", range: "30–39", rec: "Дыхание 4-7-8, техника 5-4-3-2-1"  },
  { label: "Острая тревога",    color: "#c1121f", range: "40+",   rec: "Холодная вода + техника 5-4-3-2-1" },
];

/* ── Общие стили ── */
const G = {
  dark:  "#1b4332",
  mid:   "#2d6a4f",
  light: "#52b788",
  pale:  "#d8f3dc",
  paler: "#f0faf3",
};

export default function Index() {
  const [ans, setAns]           = useState<number[]>(Array(10).fill(-1));
  const [showRes, setShowRes]   = useState(false);

  const score   = ans.reduce((s, v, i) => v === -1 ? s : s + (QUIZ[i].rev ? 3 - v : v), 0);
  const allDone = ans.every(a => a !== -1);
  const lvlIdx  = score <= 7 ? 0 : score <= 15 ? 1 : score <= 22 ? 2 : 3;
  const lv      = LEVELS[lvlIdx];

  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif", background: "#eaf4ee", minHeight: "100vh" }}>

      {/* ══════════ ЭКРАН ══════════ */}
      <div className="screen-only">
        {/* Шапка */}
        <div style={{ background: G.dark, padding: "18px 20px 14px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Caveat',cursive", fontSize: 11, color: "#95d5b2", fontWeight: 600 }}>
            Зуева Дарья · Великий Новгород
          </div>
          <div style={{ fontFamily: "'Caveat',cursive", fontSize: 28, fontWeight: 700, color: "white", lineHeight: 1.1 }}>
            Острая тревога
          </div>
          <div style={{ fontSize: 11, color: "#95d5b2", marginTop: 5, fontWeight: 500 }}>
            Снижение тревожности у подростков за счёт эффективных практик
          </div>
        </div>

        {/* Печать */}
        <div style={{ background: G.pale, borderBottom: `1px solid #95d5b2`, padding: "9px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span>🖨️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: G.dark }}>Для печати и вырезания</div>
            <div style={{ fontSize: 10, color: G.mid }}>12 карточек по 10×14.5 см · по 2 на листе A4</div>
          </div>
          <button onClick={() => window.print()} style={{ background: G.mid, color: "white", border: "none", borderRadius: 6, padding: "7px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'Golos Text',sans-serif" }}>
            Печать
          </button>
        </div>

        <div style={{ padding: 16 }}>
          {/* Опросник */}
          <div style={{ background: "white", borderRadius: 12, border: `2px solid ${G.mid}`, padding: 16, marginBottom: 14 }}>
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 20, fontWeight: 700, color: G.dark, marginBottom: 3 }}>
              📋 Как вы себя чувствуете?
            </div>
            <div style={{ fontSize: 11, color: "#555", marginBottom: 12 }}>
              Ответь на вопросы — получишь рекомендацию подходящей техники
            </div>
            {QUIZ.map((q, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: G.dark, marginBottom: 4 }}>{i + 1}. {q.text}</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {OPTS.map((opt, j) => (
                    <button key={j} onClick={() => { const n = [...ans]; n[i] = j; setAns(n); setShowRes(false); }}
                      style={{ flex: 1, padding: "4px 2px", fontSize: 9, borderRadius: 5, border: `1.5px solid ${ans[i] === j ? G.mid : "#ddd"}`, background: ans[i] === j ? G.mid : "white", color: ans[i] === j ? "white" : "#555", cursor: "pointer", fontWeight: ans[i] === j ? 700 : 400, fontFamily: "'Golos Text',sans-serif" }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {allDone && (
              <button onClick={() => setShowRes(true)} style={{ width: "100%", background: G.mid, color: "white", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Golos Text',sans-serif", marginTop: 4 }}>
                Узнать рекомендацию →
              </button>
            )}
            {showRes && (
              <div style={{ background: G.pale, borderRadius: 8, padding: 14, marginTop: 12, border: `2px solid ${lv.color}` }}>
                <div style={{ fontFamily: "'Caveat',cursive", fontSize: 20, fontWeight: 700, color: lv.color }}>{lv.label}</div>
                <div style={{ fontSize: 11, color: "#333", marginTop: 4 }}><strong>Рекомендую:</strong> {lv.rec}</div>
                <div style={{ fontSize: 10, color: "#777", marginTop: 4 }}>Баллы: {score} из 30</div>
              </div>
            )}
          </div>

          {/* Мини-превью */}
          <div style={{ fontSize: 13, fontWeight: 700, color: G.dark, marginBottom: 10 }}>Карточки техник:</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
            {TECHS.map(t => (
              <div key={t.num} style={{ aspectRatio: "10/14.5", background: "white", borderRadius: 8, border: `2px solid ${t.color}`, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <div style={{ background: t.color, padding: "5px 8px" }}>
                  <div style={{ fontFamily: "'Caveat',cursive", fontSize: 11, fontWeight: 700, color: "white", opacity: 0.6 }}>{t.num}</div>
                  <div style={{ fontFamily: "'Caveat',cursive", fontSize: 13, fontWeight: 700, color: "white", lineHeight: 1.15 }}>{t.title}</div>
                </div>
                <div style={{ flex: 1, padding: "5px 7px", overflow: "hidden" }}>
                  {t.steps.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 4, marginBottom: 2.5 }}>
                      <span style={{ fontSize: 7, color: t.color, fontWeight: 700, minWidth: 8 }}>{i+1}.</span>
                      <span style={{ fontSize: 7.5, color: "#333", lineHeight: 1.4 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ ПЕЧАТЬ ══════════ */}
      <PrintLayout />
    </div>
  );
}

/* ═══════════════════════════════════════════
   ДАННЫЕ ТЕХНИК
═══════════════════════════════════════════ */
interface Tech {
  num: string; title: string; subtitle: string;
  color: string; pale: string; img: string;
  why: string; steps: string[]; tip: string; note: string;
  forLevel: number[];
}

const TECHS: Tech[] = [
  {
    num: "01", title: "Дыхание 4-7-8",
    subtitle: "Быстро успокаивает нервную систему",
    color: G.dark, pale: "#d8f3dc", img: IMG.breathing,
    why: "Когда ты тревожишься, дыхание учащается. Этот метод принудительно замедляет его — и мозг получает сигнал «всё в порядке».",
    steps: [
      "Сядь удобно, положи руки на колени",
      "Закрой глаза или смотри в одну точку",
      "Вдох через нос — медленно считай до 4",
      "Задержи дыхание — считай до 7",
      "Выдох через рот со звуком — считай до 8",
      "Повтори 3–4 раза подряд",
    ],
    tip: "Выдох в 2 раза длиннее вдоха — это ключ к успокоению. Чем медленнее — тем лучше.",
    note: "Подходит: в школе, транспорте, перед экзаменом — незаметно для окружающих.",
    forLevel: [1, 2, 3],
  },
  {
    num: "02", title: "Техника 5-4-3-2-1",
    subtitle: "Возвращает в настоящий момент",
    color: "#1b5e3b", pale: "#b7e4c7", img: IMG.grounding,
    why: "При тревоге мозг «застревает» в будущем или прошлом. Эта техника переключает внимание на тело и окружение прямо сейчас.",
    steps: [
      "Назови вслух или про себя 5 вещей, которые ВИДИШЬ",
      "Назови 4 вещи, которые СЛЫШИШЬ прямо сейчас",
      "Потрогай 3 предмета рядом — опиши их текстуру",
      "Найди 2 запаха в воздухе вокруг тебя",
      "Почувствуй 1 вкус во рту или на губах",
    ],
    tip: "Не спеши — уделяй каждому ощущению 5–10 секунд. Пусть оно займёт твоё внимание полностью.",
    note: "Особенно помогает при панике и наплыве тревожных мыслей — «якорит» в реальности.",
    forLevel: [2, 3],
  },
  {
    num: "03", title: "Расслабление мышц",
    subtitle: "Снимает физическое напряжение",
    color: "#40916c", pale: "#d8f3dc", img: IMG.relax,
    why: "Тревога живёт в теле: зажатые плечи, сжатые кулаки. Намеренно напрягая и отпуская мышцы, ты обучаешь тело расслабляться.",
    steps: [
      "Сожми кулаки изо всех сил — удерживай 5 секунд",
      "Резко разожми — почувствуй, как напряжение уходит (10 сек)",
      "Подними плечи к ушам — 5 секунд",
      "Резко опусти и расслабь — 10 секунд",
      "Напряги мышцы живота — 5 секунд, затем отпусти",
      "Сожми ступни — 5 сек, отпусти и почувствуй тепло",
    ],
    tip: "Двигайся снизу вверх или сверху вниз — главное пройти всё тело целиком.",
    note: "Хорошо делать лёжа перед сном, если тревога мешает уснуть.",
    forLevel: [1, 2],
  },
  {
    num: "04", title: "Холодная вода",
    subtitle: "Мгновенно снижает панику",
    color: "#2d6a4f", pale: "#d8f3dc", img: IMG.water,
    why: "Холод активирует «рефлекс ныряльщика»: организм рефлекторно замедляет сердцебиение и снижает уровень стресс-гормонов за секунды.",
    steps: [
      "Набери холодную воду в раковине или стакане",
      "Умойся холодной водой — лицо, виски, шея",
      "Или опусти запястья под холодную воду на 30 секунд",
      "Дыши медленно, пока ощущаешь холод",
      "Почувствуй, как тело «перезагружается»",
    ],
    tip: "Если воды нет — помогает даже кубик льда в руке или холодный стакан.",
    note: "Самый быстрый способ при сильной панике — эффект наступает буквально за 30 секунд.",
    forLevel: [3],
  },
  {
    num: "05", title: "Письмо тревоге",
    subtitle: "Освобождает голову от мыслей",
    color: "#1b4332", pale: "#b7e4c7", img: IMG.writing,
    why: "Когда мысли кружатся в голове, мозг тратит огромные ресурсы, чтобы их «удерживать». Запись переносит их на бумагу — и голова освобождается.",
    steps: [
      "Возьми листок или открой заметки в телефоне",
      "Напиши: «Прямо сейчас я тревожусь о том, что...»",
      "Запиши всё, что беспокоит — без цензуры и оценок",
      "Перечитай. Спроси себя: это факт или мысль?",
      "Напиши: «Что я могу сделать прямо сейчас?»",
      "Выбери одно маленькое действие и сделай его",
    ],
    tip: "Не нужно писать красиво или правильно. Главное — выгрузить мысли наружу.",
    note: "Лучше всего работает регулярно — каждый вечер по 5 минут.",
    forLevel: [0, 1],
  },
  {
    num: "06", title: "Квадратное дыхание",
    subtitle: "Балансирует нервную систему",
    color: "#1b4332", pale: "#d8f3dc", img: IMG.square,
    why: "Равные интервалы вдоха, задержки, выдоха и паузы синхронизируют нервную систему и быстро снижают уровень кортизола — гормона стресса.",
    steps: [
      "Представь квадрат перед собой или нарисуй его",
      "ВДОХ — веди взгляд вверх по левой стороне, 4 счёта",
      "ЗАДЕРЖКА — по верхней стороне вправо, 4 счёта",
      "ВЫДОХ — вниз по правой стороне, 4 счёта",
      "ПАУЗА — по нижней стороне влево, 4 счёта",
      "Повтори квадрат 4–6 раз",
    ],
    tip: "Можно делать совершенно незаметно: просто двигай глазами — никто не догадается.",
    note: "Идеально перед выступлением, контрольной, сложным разговором.",
    forLevel: [0, 1, 2],
  },
];

/* ═══════════════════════════════════════════
   ПЕЧАТНЫЙ МАКЕТ
═══════════════════════════════════════════ */
function PrintLayout() {
  return (
    <div className="cards-wrap">

      {/* 1 — ОБЛОЖКА */}
      <Card isCover>
        <div style={{ flex: 1, background: `linear-gradient(160deg, ${G.dark} 0%, ${G.mid} 55%, ${G.light} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "14px 12px 10px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, fontSize: 32, lineHeight: 1.5, userSelect: "none", overflow: "hidden" }}>{"🌿🌱🍃".repeat(50)}</div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 9, color: "#95d5b2", fontWeight: 600, letterSpacing: 1 }}>Зуева Дарья · Великий Новгород</div>
          </div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ width: 30, height: 2, background: G.light, margin: "0 auto 8px" }} />
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 40, fontWeight: 700, color: "white", lineHeight: 1, textShadow: "0 2px 12px rgba(0,0,0,0.4)", letterSpacing: 2 }}>ОСТРАЯ<br/>ТРЕВОГА</div>
            <div style={{ width: 30, height: 2, background: G.light, margin: "8px auto 10px" }} />
            <div style={{ fontSize: 9, color: "#b7e4c7", lineHeight: 1.6, fontWeight: 600, maxWidth: 130, margin: "0 auto" }}>
              Снижение тревожности<br/>у подростков за счёт<br/>эффективных практик
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1, fontSize: 22 }}>💚</div>
        </div>
      </Card>

      {/* 2 — ТРЕВОЖИТЬСЯ НОРМАЛЬНО */}
      <Card pageNum={2}>
        <CardHead bg={G.pale} color={G.dark}>Тревожиться — это нормально</CardHead>
        <CardBody>
          <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
            <img src={IMG.anxious} alt="" style={thumbStyle} />
            <div>
              <p style={P}>Тревога — это <b>естественная защитная реакция</b> организма. Она существует, чтобы уберечь нас от опасности.</p>
              <p style={P}>Каждый человек тревожится. Это не слабость.</p>
            </div>
          </div>
          <Box color={G.mid}>
            💡 Когда мозг замечает угрозу (реальную или воображаемую) — он включает режим «бей или беги»: учащается сердцебиение, напрягаются мышцы, дыхание становится поверхностным.
          </Box>
          <p style={P}>Проблема возникает, когда тревога не отступает и мешает учиться, общаться, жить.</p>
          <Box color={G.light}>
            ✅ Хорошая новость: тревогой можно управлять. Техники в этих карточках помогают телу и мозгу «выйти» из режима тревоги — быстро и в любом месте.
          </Box>
          <p style={{ ...P, fontSize: 8, color: "#888", marginTop: 6 }}>Регулярная практика снижает общий уровень тревожности и укрепляет уверенность в себе.</p>
        </CardBody>
      </Card>

      {/* 3 — ОГЛАВЛЕНИЕ */}
      <Card pageNum={3}>
        <CardHead bg={G.mid} color="white">Оглавление</CardHead>
        <CardBody>
          <p style={{ ...P, marginBottom: 10, fontSize: 8.5, color: "#555" }}>Сначала пройди опросник (стр. 4–5), чтобы узнать, какие техники подойдут тебе прямо сейчас.</p>
          {[
            { t: "Тревожиться — это нормально",  n: 2 },
            { t: "Опросник: как ты сейчас?",      n: 4 },
            { t: "Результат и рекомендации",       n: 5 },
            { t: "Техника 01 — Дыхание 4-7-8",    n: 6 },
            { t: "Техника 02 — Метод 5-4-3-2-1",  n: 7 },
            { t: "Техника 03 — Расслабление мышц", n: 8 },
            { t: "Техника 04 — Холодная вода",     n: 9 },
            { t: "Техника 05 — Письмо тревоге",   n: 10 },
            { t: "Техника 06 — Квадратное дыхание",n: 11 },
          ].map(r => (
            <div key={r.n} style={{ display: "flex", alignItems: "baseline", marginBottom: 5.5 }}>
              <span style={{ fontSize: 10, color: "#222", fontWeight: 600, flex: 1, lineHeight: 1.4 }}>{r.t}</span>
              <span style={{ borderBottom: "1px dotted #b2dfdb", flex: "0 0 20px", margin: "0 4px 2px" }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: G.mid, minWidth: 14, textAlign: "right" }}>{r.n}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, background: G.pale, borderRadius: 5, padding: "6px 8px", fontSize: 8.5, color: G.dark, fontWeight: 600 }}>
            🌿 Набор рассчитан на самостоятельное использование без помощи взрослых
          </div>
        </CardBody>
      </Card>

      {/* 4 — ОПРОСНИК */}
      <Card pageNum={4}>
        <CardHead bg={G.mid} color="white">Как вы себя чувствуете?</CardHead>
        <CardBody>
          <p style={{ ...P, marginBottom: 6, fontSize: 8.5 }}>Обведи цифру рядом с каждым утверждением:</p>
          <div style={{ display: "flex", gap: 6, marginBottom: 8, fontSize: 8, color: "#555", fontWeight: 500 }}>
            <span><b style={{ color: G.dark }}>1</b> — нет</span>
            <span><b style={{ color: G.dark }}>2</b> — немного</span>
            <span><b style={{ color: G.dark }}>3</b> — да</span>
            <span><b style={{ color: G.dark }}>4</b> — совсем да</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {["Мне легко и спокойно", "Я чувствую напряжение", "Я внутренне удовлетворён", "Я расстроен", "Я чувствую себя свободно", "Я взволнован", "Беспокоюсь о неудачах", "Чувствую себя отдохнувшим", "Испытываю тревогу", "Чувствую уверенность"].map((q, i) => (
                <tr key={i} style={{ borderBottom: `1px solid #e0f2e9` }}>
                  <td style={{ fontSize: 9.5, color: "#222", padding: "4px 4px 4px 0", lineHeight: 1.3, fontWeight: 500, width: "70%" }}>{i + 1}. {q}</td>
                  <td style={{ fontSize: 10.5, color: G.mid, fontWeight: 700, letterSpacing: 2, textAlign: "right" }}>1·2·3·4</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* 5 — РЕЗУЛЬТАТ */}
      <Card pageNum={5}>
        <CardHead bg={G.pale} color={G.dark}>Подсчёт результата</CardHead>
        <CardBody>
          <Box color={G.mid}>
            <b>Важно:</b> вопросы 1, 3, 5, 8, 10 считаются наоборот:<br/>
            если обвёл 1 → считай как 4, если 2 → как 3, если 3 → как 2, если 4 → как 1
          </Box>
          <p style={{ ...P, margin: "6px 0" }}>Сложи все получившиеся числа.</p>
          {LEVELS.map(r => (
            <div key={r.range} style={{ marginBottom: 5, background: G.paler, borderRadius: 5, padding: "5px 8px", borderLeft: `3px solid ${r.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: r.color, minWidth: 32 }}>{r.range}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#1a1a1a", flex: 1 }}>{r.label}</span>
                <span style={{ fontSize: 8, color: "#aaa", border: `1px solid ${r.color}80`, borderRadius: 3, padding: "0 5px" }}>☐</span>
              </div>
              <div style={{ fontSize: 8, color: "#555", marginTop: 2, paddingLeft: 38, fontWeight: 500 }}>→ {r.rec}</div>
            </div>
          ))}
          <div style={{ background: "#b7e4c7", borderRadius: 6, padding: "6px 8px", marginTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12 }}>📌</span>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: G.dark }}>Мой результат: ___ баллов</div>
              <div style={{ fontSize: 8.5, color: G.mid, marginTop: 1 }}>Мои техники: _________________</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 6-11 — ТЕХНИКИ */}
      {TECHS.map((t, idx) => (
        <Card key={t.num} pageNum={idx + 6}>
          {/* Шапка */}
          <div style={{ background: t.color, padding: "8px 10px 7px", display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 28, fontWeight: 700, color: "white", opacity: 0.35, lineHeight: 1, minWidth: 28 }}>{t.num}</div>
            <div>
              <div style={{ fontFamily: "'Caveat',cursive", fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1.1 }}>{t.title}</div>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{t.subtitle}</div>
            </div>
          </div>
          <CardBody>
            {/* Зачем */}
            <div style={{ fontSize: 8.5, color: "#444", lineHeight: 1.5, marginBottom: 8, fontStyle: "italic", borderLeft: `2px solid ${t.color}60`, paddingLeft: 6 }}>
              {t.why}
            </div>
            {/* Картинка + шаги */}
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <img src={t.img} alt="" style={{ width: 58, height: 58, objectFit: "cover", borderRadius: 6, border: `1.5px solid ${t.color}50`, flexShrink: 0, opacity: 0.88 }} />
              <div style={{ flex: 1 }}>
                {t.steps.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 5, marginBottom: 3.5, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 8, color: "white", background: t.color, borderRadius: "50%", width: 13, height: 13, minWidth: 13, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, marginTop: 1, flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 9, color: "#1a1a1a", lineHeight: 1.45, fontWeight: 500 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Совет */}
            <div style={{ background: t.pale, borderRadius: 5, padding: "5px 7px", marginBottom: 5, fontSize: 8.5, color: G.dark, lineHeight: 1.5, fontWeight: 600, border: `1px solid ${t.color}30` }}>
              <span style={{ color: t.color, fontWeight: 700 }}>💡 </span>{t.tip}
            </div>
            {/* Когда применять */}
            <div style={{ fontSize: 8, color: "#666", lineHeight: 1.5, fontWeight: 500 }}>
              <span style={{ color: t.color, fontWeight: 700 }}>📌 </span>{t.note}
            </div>
          </CardBody>
        </Card>
      ))}

      {/* 12 — ФИНАЛ */}
      <Card isCover>
        <div style={{ flex: 1, background: `linear-gradient(135deg, ${G.dark} 0%, ${G.light} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.05, fontSize: 26, lineHeight: 1.8, userSelect: "none" }}>{"🌿🌱🍃".repeat(60)}</div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 16px" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>💚</div>
            <div style={{ fontFamily: "'Caveat',cursive", fontSize: 28, fontWeight: 700, color: "white", marginBottom: 10 }}>Ты справишься!</div>
            <div style={{ width: 32, height: 1.5, background: G.light, margin: "0 auto 10px" }} />
            <div style={{ fontSize: 9.5, color: "#b7e4c7", lineHeight: 1.8, fontWeight: 500 }}>
              Тревога — это временно.<br/>
              Ты уже сделал важный шаг —<br/>
              изучил эти техники.<br/>
              Теперь инструменты всегда с тобой.
            </div>
            <div style={{ marginTop: 12, background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", fontSize: 8.5, color: "#d8f3dc", lineHeight: 1.6 }}>
              Если тревога не уходит несколько недель —<br/>
              поговори с психологом. Это нормально<br/>и правильно — обращаться за помощью.
            </div>
            <div style={{ marginTop: 12, fontSize: 8, color: `${G.light}99`, fontWeight: 600 }}>Зуева Дарья · Великий Новгород</div>
          </div>
        </div>
      </Card>

    </div>
  );
}

/* ═══════════════════════════════════════════
   ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
═══════════════════════════════════════════ */

const P: React.CSSProperties = { fontSize: 9.5, color: "#222", lineHeight: 1.55, margin: "0 0 5px", fontWeight: 500 };
const thumbStyle: React.CSSProperties = { width: 64, height: 64, objectFit: "cover", borderRadius: 7, border: `1.5px solid #95d5b2`, flexShrink: 0, opacity: 0.85 };

function Card({ children, pageNum, isCover }: { children: React.ReactNode; pageNum?: number; isCover?: boolean }) {
  return (
    <div className="pcard">
      <div className="pcard-inner-wrap" style={ isCover ? { borderColor: G.dark } : {}}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {children}
        </div>
        {pageNum !== undefined && (
          <div style={{ textAlign: "center", fontSize: 7, color: "#bbb", padding: "2px 0 3px", fontWeight: 600, fontFamily: "'Golos Text',sans-serif", flexShrink: 0 }}>
            {pageNum}
          </div>
        )}
      </div>
    </div>
  );
}

function CardHead({ children, bg, color }: { children: React.ReactNode; bg: string; color: string }) {
  return (
    <div style={{ background: bg, padding: "8px 10px 7px", flexShrink: 0, borderBottom: bg === G.pale ? `2px solid ${G.light}` : "none" }}>
      <span style={{ fontFamily: "'Caveat',cursive", fontSize: 17, fontWeight: 700, color, lineHeight: 1.1 }}>{children}</span>
    </div>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div style={{ flex: 1, padding: "8px 10px 5px", overflow: "hidden" }}>{children}</div>;
}

function Box({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div style={{ background: G.pale, borderLeft: `3px solid ${color}`, borderRadius: "0 5px 5px 0", padding: "5px 7px", marginBottom: 6, fontSize: 8.5, color: G.dark, lineHeight: 1.55, fontWeight: 600 }}>
      {children}
    </div>
  );
}
