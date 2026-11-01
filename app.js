// 関西エリア 光回線5社 × 電力会社6社 料金データ＆シミュレーションエンジン（公式情報ソースリンク付き）

const INTERNET_PROVIDERS = [
  {
    id: "eo",
    name: "eo光（オプテージ）",
    officialUrl: "https://eonet.jp/",
    networkType: "関西独自回線（高速・高安定）",
    pricing: {
      detached: {
        "1g": { year1: 3280, year2: 5448, cashback: 0, note: "eo暮らしスタート割（1年目3,280円）" },
        "10g": { year1: 500, year2: 5500, cashback: 0, note: "eo光シンプルプラン10G（1年目500円/6ヶ月0円特典）" }
      },
      apartment: {
        "1g": { year1: 3326, year2: 3876, cashback: 3000, note: "マンションタイプ（モデムレンタル料込目安）" },
        "10g": { year1: 3876, year2: 4950, cashback: 3000, note: "マンション10G対応物件目安" }
      }
    },
    phoneDiscount: {
      au_uq: {
        perPhone: 1100,
        requiredOptionFee: 314, // eo光電話（アダプター利用料314円）が必須
        label: "auスマートバリュー / UQ自宅セット割（要eo光電話 月314円）",
        sourceUrl: "https://eonet.jp/service/set/eoxau/",
        sourceTitle: "eo光公式：auスマートバリュー / UQ mobile 自宅セット割"
      },
      mineo: {
        perPhone: 330,
        requiredOptionFee: 0,
        label: "eo×mineoセット割（月330円割引）",
        flatTotal: true,
        sourceUrl: "https://eonet.jp/service/set/eoxmineo/",
        sourceTitle: "eo光公式：eo×mineoセット割"
      }
    },
    highlights: ["関西シェア・満足度No.1独自回線", "au/UQモバイル・mineoセット割対応", "eo電気とのセット割あり"]
  },
  {
    id: "nuro",
    name: "NURO光",
    officialUrl: "https://www.nuro.jp/",
    networkType: "独自回線（標準2G/10G）",
    pricing: {
      detached: {
        "1g": { year1: 980, year2: 5200, cashback: 45000, note: "2ギガプラン・初年度980円＋4.5万円CB" },
        "10g": { year1: 980, year2: 5700, cashback: 45000, note: "10ギガプラン・初年度980円＋4.5万円CB" }
      },
      apartment: {
        "1g": { year1: 2980, year2: 3850, cashback: 25000, note: "NURO光マンション2G＋2.5万円CB" },
        "10g": { year1: 2980, year2: 4400, cashback: 25000, note: "NURO光マンション10G＋2.5万円CB" }
      }
    },
    phoneDiscount: {
      softbank_ym: {
        perPhone: 1100,
        requiredOptionFee: 550, // NURO光でんわ（月額550円）の契約が必須条件
        label: "ソフトバンク「おうち割 光セット」（要NURO光でんわ 月550円）",
        sourceUrl: "https://www.nuro.jp/hikari/phone/sb.html",
        sourceTitle: "NURO光公式：おうち割 光セット（要NURO光でんわ）"
      }
    },
    highlights: ["NURO光でんわ加入でSB/ワイモバイルのスマホ割対応", "高額キャッシュバックで2年実質が安価", "※大阪ガスの電気とのネット×電気セット割はなし"]
  },
  {
    id: "gmo",
    name: "GMOとくとくBB光",
    officialUrl: "https://gmobb.jp/service/gmohikari/price/",
    networkType: "光コラボ（NTT回線・縛りなし）",
    pricing: {
      detached: {
        "1g": { year1: 4818, year2: 4818, cashback: 32000, note: "契約縛りなし・ずっと定額＋3.2万円CB" },
        "10g": { year1: 2970, year2: 5940, cashback: 40000, note: "10G鬼安キャンペーン（6ヶ月0円相当）＋4万円CB" }
      },
      apartment: {
        "1g": { year1: 3773, year2: 3773, cashback: 32000, note: "契約縛りなし・ずっと定額＋3.2万円CB" },
        "10g": { year1: 2970, year2: 5940, cashback: 40000, note: "10G鬼安キャンペーン＋4万円CB" }
      }
    },
    phoneDiscount: {},
    highlights: ["格安SIM（楽天・ahamo・povo）ユーザー最安級", "解約違約金0円・高性能ルーター無料レンタル", "基本月額が業界最安水準"]
  },
  {
    id: "docomo",
    name: "ドコモ光（タイプA）",
    officialUrl: "https://www.docomo.ne.jp/internet/hikari/",
    networkType: "光コラボ（NTT回線）",
    pricing: {
      detached: {
        "1g": { year1: 5720, year2: 5720, cashback: 35000, note: "1ギガ（タイプA）＋3.5万円還元特典" },
        "10g": { year1: 3190, year2: 6380, cashback: 40000, note: "10ギガワンコインキャンペーン（6ヶ月500円）＋特典" }
      },
      apartment: {
        "1g": { year1: 4400, year2: 4400, cashback: 35000, note: "マンション1ギガ（タイプA）＋3.5万円還元" },
        "10g": { year1: 3190, year2: 6380, cashback: 40000, note: "10ギガワンコインキャンペーン＋特典" }
      }
    },
    phoneDiscount: {
      docomo: {
        perPhone: 1100,
        requiredOptionFee: 0, // ドコモ光は固定電話オプション不要でスマホ割適用可
        label: "ドコモ光セット割（最大1,100円×台数・オプション不要）",
        sourceUrl: "https://www.docomo.ne.jp/charge/hikari_set/",
        sourceTitle: "NTTドコモ公式：ドコモ光セット割"
      }
    },
    highlights: ["ドコモユーザーの唯一のセット割対象回線（オプション加入不要）", "家族のドコモ回線が多いほどお得", "全国エリア・マンション導入率No.1"]
  },
  {
    id: "softbank",
    name: "ソフトバンク光",
    officialUrl: "https://www.softbank.jp/internet/sbhikari/",
    networkType: "光コラボ（NTT回線）",
    pricing: {
      detached: {
        "1g": { year1: 5720, year2: 5720, cashback: 35000, note: "戸建て1ギガ＋代理店キャッシュバック3.5万円" },
        "10g": { year1: 3190, year2: 6380, cashback: 40000, note: "超高速10ギガ（6ヶ月500円キャンペーン）＋CB" }
      },
      apartment: {
        "1g": { year1: 4180, year2: 4180, cashback: 35000, note: "マンション1ギガ＋代理店CB 3.5万円" },
        "10g": { year1: 3190, year2: 6380, cashback: 40000, note: "超高速10ギガ＋代理店CB 4万円" }
      }
    },
    phoneDiscount: {
      softbank_ym: {
        perPhone: 1100,
        requiredOptionFee: 550, // 指定オプションパック（光BBユニット＋Wi-Fi＋電話＝月550円）必須
        label: "おうち割 光セット（要指定オプション月550円）",
        sourceUrl: "https://www.softbank.jp/mobile/campaigns/list/ouchiwari-hikari/",
        sourceTitle: "ソフトバンク公式：おうち割 光セット"
      }
    },
    highlights: ["ソフトバンク純正光コラボ・おうちでんきともセット割対応", "他社違約金最大10万円満額還元キャンペーン", "NTTフレッツ網でどのマンションでも導入しやすい"]
  }
];

const ELECTRICITY_PROVIDERS = [
  {
    id: "kanden",
    name: "関西電力（従量電灯A / なっトクでんき）",
    officialUrl: "https://kepco.jp/ryokin/menu/dento_a/",
    planName: "従量電灯A（関電ガスセット時：なっトクでんき）",
    calcMonthly: (kwh, context) => {
      let bill = 522.58;
      if (kwh > 15) bill += Math.min(kwh - 15, 105) * 20.21;
      if (kwh > 120) bill += Math.min(kwh - 120, 180) * 25.61;
      if (kwh > 300) bill += (kwh - 300) * 28.59;
      let bundleDiscount = 0;
      let bundleNote = "";
      let discountSource = null;
      if (context.gas === "kanden_gas") {
        bundleDiscount = Math.round(bill * 0.02);
        bundleNote = "関電ガス「なっトクプラン」セット特典";
        discountSource = {
          label: `関電ガス×関西電力「なっトクパック」割引（▲¥${bundleDiscount}/月）`,
          url: "https://kepco.jp/gas/",
          title: "関西電力公式：関電ガス なっトクプラン"
        };
      }
      return {
        rawBill: Math.round(bill),
        bundleDiscount,
        promoMonthlyDiscount: 0,
        note: bundleNote || "関西エリアの標準基準プラン（ネット・スマホとのセット割なし）",
        discountSource
      };
    },
    feature: "関西の基準となる大手電力。単体でも全国的に見れば安めだが、新電力やセット割への切替でさらに削減可能。"
  },
  {
    id: "eo_elec",
    name: "eo電気（オプテージ）",
    officialUrl: "https://eonet.jp/service/denki/charge/",
    planName: "スタンダードプランK / シンプルプランK",
    calcMonthly: (kwh, context) => {
      const isEoNet = context.internetId === "eo";
      let bill = isEoNet ? 495 : 522;
      const tier1 = isEoNet ? 20.10 : 20.21;
      const tier2 = isEoNet ? 25.10 : 25.55;
      const tier3 = isEoNet ? 26.95 : 27.80;
      if (kwh > 15) bill += Math.min(kwh - 15, 105) * tier1;
      if (kwh > 120) bill += Math.min(kwh - 120, 180) * tier2;
      if (kwh > 300) bill += (kwh - 300) * tier3;

      let bundleDiscount = 0;
      const notes = [];
      let discountSource = null;
      if (isEoNet) {
        bundleDiscount += 550;
        notes.push("eo光×eo電気セット割");
        discountSource = {
          label: "eo光×eo電気 ネットセット割単価＆特典（▲¥550/月相当）",
          url: "https://eonet.jp/service/denki/charge/",
          title: "eo電気公式：料金表・eo光セット割引"
        };
      }
      if (context.gas === "kanden_gas") {
        bundleDiscount += 200;
        notes.push("関電ガス「eo割」適用");
      }
      return {
        rawBill: Math.round(bill),
        bundleDiscount,
        promoMonthlyDiscount: isEoNet ? 200 : 0,
        note: notes.length ? notes.join("＋") : "※eo光以外のネット回線とはセット割なし",
        discountSource
      };
    },
    feature: "関西電力グループのオプテージが提供。eo光とセットにすることで単価引き下げ＆セット特典が付き、関電ガス「eo割」も使える。"
  },
  {
    id: "osaka_gas_elec",
    name: "大阪ガスの電気",
    officialUrl: "https://home.osakagas.co.jp/energy/electricity/price/plan_ag/",
    planName: "ベースプランA-G（ガスセット）/ ベースプランA",
    calcMonthly: (kwh, context) => {
      const hasOsakaGas = context.gas === "osaka_gas";
      let bill = hasOsakaGas ? 446.57 : 466.57;
      const tier2 = hasOsakaGas ? 25.15 : 25.35;
      const tier3 = hasOsakaGas ? 27.97 : 28.20;
      if (kwh > 15) bill += Math.min(kwh - 15, 105) * 20.21;
      if (kwh > 120) bill += Math.min(kwh - 120, 230) * tier2;
      if (kwh > 350) bill += (kwh - 350) * tier3;

      let bundleDiscount = hasOsakaGas ? Math.round(bill * 0.015) + 150 : 0;
      let discountSource = null;
      if (hasOsakaGas) {
        discountSource = {
          label: `大阪ガス（都市ガス）×大阪ガスの電気「ベースプランA-G」セット割（▲¥${bundleDiscount}/月） ※光回線・スマホとのセット割ではありません`,
          url: "https://home.osakagas.co.jp/energy/electricity/price/plan_ag/",
          title: "大阪ガス公式：ベースプランA-G（電気・ガスセット）"
        };
      }
      return {
        rawBill: Math.round(bill),
        bundleDiscount,
        promoMonthlyDiscount: 0,
        note: hasOsakaGas
          ? "大阪ガス（都市ガス）とのセット「ベースプランA-G」適用（※NURO光やSBスマホとの電気セット割はありません）"
          : "第2段階が350kWhまで広いプラン（※光回線・スマホとのセット割はありません）",
        discountSource
      };
    },
    feature: "大阪ガス（都市ガス）とのセット「ベースプランA-G」で安くなる電力。なお、本家NURO光やソフトバンクスマホとの電気セット割はありません（大阪ガス光「さすガねっと」のみネット割対象）。"
  },
  {
    id: "sym_energy",
    name: "シン・エナジー",
    officialUrl: "https://www.symenergy.net/plan/show?supplier_cd=10&customer_class=1",
    planName: "きほんプラン（関西電力エリア）",
    calcMonthly: (kwh) => {
      let bill = 475.0;
      if (kwh > 15) bill += Math.min(kwh - 15, 105) * 19.65;
      if (kwh > 120) bill += Math.min(kwh - 120, 180) * 24.10;
      if (kwh > 300) bill += (kwh - 300) * 26.60;
      return {
        rawBill: Math.round(bill),
        bundleDiscount: 0,
        promoMonthlyDiscount: 0,
        note: "セット割なし（単体の基本単価・従量単価自体が関西電力より安い設計）",
        discountSource: {
          label: "セット条件なしで全段階単価が関電より割安（単体割引型）",
          url: "https://www.symenergy.net/plan/show?supplier_cd=10&customer_class=1",
          title: "シン・エナジー公式：関西電力エリア きほんプラン料金表"
        }
      };
    },
    feature: "神戸発の人気新電力。ネットやスマホのセット条件なしで、単体の電気料金そのものが安く設定されている実力派。"
  },
  {
    id: "octopus",
    name: "オクトパスエナジー",
    officialUrl: "https://octopusenergy.co.jp/",
    planName: "グリーンオクトパス / シンプルオクトパス",
    calcMonthly: (kwh) => {
      let bill = 460.0;
      if (kwh > 15) bill += Math.min(kwh - 15, 105) * 19.80;
      if (kwh > 120) bill += Math.min(kwh - 120, 180) * 24.35;
      if (kwh > 300) bill += (kwh - 300) * 26.85;
      return {
        rawBill: Math.round(bill),
        bundleDiscount: 0,
        promoMonthlyDiscount: 290,
        note: "セット割なし（単体単価の安さ＋公式新規申込の電気代割引特典）",
        discountSource: {
          label: "公式新規申込キャンペーン特典（電気代割引 約¥7,000＝月▲¥290換算）",
          url: "https://octopusenergy.co.jp/",
          title: "オクトパスエナジー公式サイト"
        }
      };
    },
    feature: "英国発・東京ガス出資の新電力。ネットやスマホとのセット割はないが、単体単価が安く新規電気代割引キャンペーンが強力。"
  },
  {
    id: "softbank_elec",
    name: "おうちでんき（ソフトバンクでんき）",
    officialUrl: "https://www.softbank.jp/energy/special/ouchi-denki/",
    planName: "おうちでんき Powered by 関西電力 / (N)",
    calcMonthly: (kwh, context) => {
      let bill = 522.58;
      if (kwh > 15) bill += Math.min(kwh - 15, 105) * 20.21;
      if (kwh > 120) bill += Math.min(kwh - 120, 180) * 25.61;
      if (kwh > 300) bill += (kwh - 300) * 28.59;

      const unitDiscount = context.evalMode === "steady_state" ? 55 : 110;
      let eligibleLines = 0;
      const notes = [];

      if (context.carrier === "softbank_ym") {
        eligibleLines += context.phoneCount;
        notes.push(`SB/YMスマホ${context.phoneCount}台×¥${unitDiscount}`);
      }
      if (context.internetId === "softbank") {
        eligibleLines += 1;
        notes.push(`ソフトバンク光1回線×¥${unitDiscount}`);
      }

      const bundleDiscount = eligibleLines * unitDiscount;
      let discountSource = null;
      if (bundleDiscount > 0) {
        discountSource = {
          label: `おうち割 でんきセット（${notes.join("＋")}＝月▲¥${bundleDiscount.toLocaleString()}）`,
          url: "https://www.softbank.jp/energy/special/ouchi-denki/",
          title: "ソフトバンク公式：おうちでんき（おうち割 でんきセット）"
        };
      }
      return {
        rawBill: Math.round(bill),
        bundleDiscount,
        promoMonthlyDiscount: 0,
        note:
          bundleDiscount > 0
            ? `おうち割 でんきセット適用（${notes.join("＋")}＝月▲¥${bundleDiscount.toLocaleString()}）`
            : "関電と同額単価（※SB/ワイモバイルやSB光がない場合は割引なし）",
        discountSource
      };
    },
    feature: "ソフトバンク光やSB/ワイモバイルスマホと組み合わせると「おうち割 でんきセット（1回線あたり月110円割引）」が適用。"
  }
];

let activeMatrixTab = "internet";
let activeChartSort = "rank";
let activeLayoutMode = "auto"; // "auto" | "portrait" | "landscape"

function applyResponsiveLayout() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isPortraitMedia = window.matchMedia
    ? window.matchMedia("(orientation: portrait)").matches
    : height >= width;

  let resolvedLayout = "landscape";
  let statusText = "";

  if (activeLayoutMode === "auto") {
    // 縦長画面（または幅760px未満の縦向き）は縦1列モード、横長画面は左右2列モード
    if (isPortraitMedia && width < 900) {
      resolvedLayout = "portrait";
      statusText = `📱 縦画面を自動検出（${width}×${height}px）：スマホ縦1列＋下部ミニ結果バー配置`;
    } else if (!isPortraitMedia && width < 960) {
      resolvedLayout = "landscape";
      statusText = `📲 スマホ・タブレット横画面を自動検出（${width}×${height}px）：左右2列スプリット配置`;
    } else if (width < 760) {
      resolvedLayout = "portrait";
      statusText = `📱 コンパクト画面を自動検出（${width}×${height}px）：縦1列配置`;
    } else {
      resolvedLayout = "landscape";
      statusText = `💻 ワイド・横画面を自動検出（${width}×${height}px）：左右2列配置`;
    }
  } else if (activeLayoutMode === "portrait") {
    resolvedLayout = "portrait";
    statusText = `📱 縦1列モード（手動固定中：スマホ縦画面向け配置）`;
  } else {
    resolvedLayout = "landscape";
    statusText = `📲 左右2列モード（手動固定中：横画面・PC向け配置）`;
  }

  document.body.classList.toggle("layout-portrait", resolvedLayout === "portrait");
  document.body.classList.toggle("layout-landscape", resolvedLayout === "landscape");
  document.body.classList.toggle(
    "is-compact-landscape",
    resolvedLayout === "landscape" && height < 560
  );

  // 横2列になった場合はフォームの折りたたみを解除して常時表示
  if (resolvedLayout === "landscape") {
    const formSection = document.getElementById("form-card-section");
    const toggleBtn = document.getElementById("toggle-form-btn");
    if (formSection && formSection.classList.contains("collapsed")) {
      formSection.classList.remove("collapsed");
      if (toggleBtn) {
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.textContent = "▲ 条件を折りたたむ";
      }
    }
  }

  const labelEl = document.getElementById("detected-orientation-label");
  if (labelEl) {
    labelEl.textContent = statusText;
  }
}

function getFormValues() {
  const form = document.getElementById("sim-form");
  const housing = form.elements["housing"].value;
  const carrier = form.elements["carrier"].value;
  const phoneCount = parseInt(form.elements["phoneCount"].value, 10);
  const speed = form.elements["speed"].value;
  const kwh = parseInt(form.elements["kwh"].value, 10);
  const gas = form.elements["gas"].value;
  const evalMode = form.elements["evalMode"].value;
  return { housing, carrier, phoneCount, speed, kwh, gas, evalMode };
}

function calcInternetCost(provider, state) {
  const plan = provider.pricing[state.housing][state.speed];
  let netMonthly = plan.year2;
  let promoSavingMonthly = 0;
  if (state.evalMode === "2year_effective") {
    const total24 = plan.year1 * 12 + plan.year2 * 12 - plan.cashback;
    netMonthly = Math.round(total24 / 24);
    promoSavingMonthly = plan.year2 - netMonthly;
  }

  // スマホセット割の計算（必須オプション料金も差し引いて実質割引額を算出）
  let grossPhoneDiscount = 0;
  let requiredOptionFee = 0;
  let phoneDiscountMonthly = 0;
  let phoneDiscountLabel = "スマホセット割：対象外（¥0）";
  let phoneSource = null;

  const rule = provider.phoneDiscount[state.carrier];
  if (rule) {
    grossPhoneDiscount = rule.flatTotal ? rule.perPhone : rule.perPhone * state.phoneCount;
    requiredOptionFee = rule.requiredOptionFee || 0;
    // 必須オプション代の方が高くなる場合は適用しない
    if (grossPhoneDiscount > requiredOptionFee) {
      phoneDiscountMonthly = grossPhoneDiscount - requiredOptionFee;
      const optText = requiredOptionFee > 0 ? ` [割引¥${grossPhoneDiscount.toLocaleString()} - 必須OP¥${requiredOptionFee}]` : "";
      phoneDiscountLabel = `${rule.label}（実質 ▲¥${phoneDiscountMonthly.toLocaleString()}/月${optText}）`;
      phoneSource = {
        label: phoneDiscountLabel,
        url: rule.sourceUrl,
        title: rule.sourceTitle
      };
    }
  }

  return {
    baseYear1: plan.year1,
    baseYear2: plan.year2,
    cashback: plan.cashback,
    effectiveNetMonthly: netMonthly,
    promoSavingMonthly,
    grossPhoneDiscount,
    requiredOptionFee,
    phoneDiscountMonthly,
    phoneDiscountLabel,
    phoneSource,
    note: plan.note
  };
}

function calcElectricityCost(elecProvider, state, internetId) {
  const res = elecProvider.calcMonthly(state.kwh, {
    gas: state.gas,
    internetId,
    carrier: state.carrier,
    phoneCount: state.phoneCount,
    evalMode: state.evalMode
  });
  const promo = state.evalMode === "2year_effective" ? res.promoMonthlyDiscount : 0;
  const effectiveElecMonthly = res.rawBill - res.bundleDiscount - promo;
  return {
    rawBill: res.rawBill,
    bundleDiscount: res.bundleDiscount,
    promoMonthlyDiscount: promo,
    effectiveElecMonthly,
    note: res.note,
    discountSource: res.discountSource
  };
}

function evaluateAllCombinations(state) {
  const combos = [];

  for (const net of INTERNET_PROVIDERS) {
    const netCost = calcInternetCost(net, state);
    for (const elec of ELECTRICITY_PROVIDERS) {
      const elecCost = calcElectricityCost(elec, state, net.id);
      const totalEffectiveMonthly =
        netCost.effectiveNetMonthly - netCost.phoneDiscountMonthly + elecCost.effectiveElecMonthly;

      const totalDiscountMonthly =
        netCost.phoneDiscountMonthly +
        elecCost.bundleDiscount +
        elecCost.promoMonthlyDiscount;

      // ネットと電気の直接セット割があるかどうか
      const hasNetElecDirectBundle =
        (net.id === "eo" && elec.id === "eo_elec") ||
        (net.id === "softbank" && elec.id === "softbank_elec");

      const tags = [];
      if (netCost.phoneDiscountMonthly > 0) {
        tags.push(`📱 光×スマホ割 実質▲¥${netCost.phoneDiscountMonthly.toLocaleString()}/月`);
      }
      if (net.id === "eo" && elec.id === "eo_elec") {
        tags.push("⚡ eo光×eo電気セット割");
      }
      if (elec.id === "softbank_elec" && elecCost.bundleDiscount > 0) {
        tags.push(`⚡ おうち割でんきセット ▲¥${elecCost.bundleDiscount.toLocaleString()}/月`);
      }
      if (
        elecCost.bundleDiscount > 0 &&
        !(net.id === "eo" && elec.id === "eo_elec") &&
        elec.id !== "softbank_elec"
      ) {
        tags.push(`🔥 ガス×電気セット割 ▲¥${elecCost.bundleDiscount.toLocaleString()}/月`);
      }
      if (state.evalMode === "2year_effective" && netCost.cashback > 0) {
        tags.push(`🎁 光回線CB ¥${netCost.cashback.toLocaleString()}`);
      }

      combos.push({
        net,
        elec,
        netCost,
        elecCost,
        hasNetElecDirectBundle,
        totalEffectiveMonthly,
        totalDiscountMonthly,
        tags
      });
    }
  }

  combos.sort((a, b) => a.totalEffectiveMonthly - b.totalEffectiveMonthly);
  return combos;
}

function renderResults() {
  const state = getFormValues();

  document.getElementById("phoneCountLabel").textContent = `${state.phoneCount}台`;
  document.getElementById("kwhLabel").textContent = `${state.kwh} kWh`;

  const phoneWrapper = document.getElementById("phone-count-wrapper");
  phoneWrapper.style.opacity = state.carrier === "none" || state.carrier === "mineo" ? "0.55" : "1";

  const kandenBase = ELECTRICITY_PROVIDERS[0].calcMonthly(state.kwh, { gas: "other", internetId: "" }).rawBill;
  document.getElementById("currentElecEst").textContent = `（関電 従量電灯A目安：約¥${kandenBase.toLocaleString()}/月）`;

  const standardNetBase = state.housing === "detached" ? (state.speed === "10g" ? 6380 : 5720) : (state.speed === "10g" ? 6380 : 4400);
  const baselineMonthly = standardNetBase + kandenBase;

  const combos = evaluateAllCombinations(state);
  const best = combos[0];

  document.getElementById("baseline-monthly").innerHTML = `¥${baselineMonthly.toLocaleString()}<span>/月</span>`;
  document.getElementById("best-monthly").innerHTML = `¥${best.totalEffectiveMonthly.toLocaleString()}<span>/月</span>`;

  // スマホ縦画面の下部フローティングバー更新
  const floatingCombo = document.getElementById("floating-best-combo");
  const floatingPrice = document.getElementById("floating-best-price");
  if (floatingCombo && floatingPrice) {
    const shortNet = best.net.name.replace(/（.*?）/g, "");
    const shortElec = best.elec.name.replace(/（.*?）/g, "");
    floatingCombo.textContent = `${shortNet} × ${shortElec}`;
    floatingPrice.textContent = `¥${best.totalEffectiveMonthly.toLocaleString()}`;
  }

  const monthlyDiff = Math.max(0, baselineMonthly - best.totalEffectiveMonthly);
  const annualSaving = monthlyDiff * 12;
  const twoYearSaving = monthlyDiff * 24;

  document.getElementById("annual-saving-pill").innerHTML = `
    基準プランと比べて 年間 <strong>約 ¥${annualSaving.toLocaleString()}</strong>（2年間で <strong>約 ¥${twoYearSaving.toLocaleString()}</strong>）お得になります！
  `;

  const top10 = combos.slice(0, 10);
  const container = document.getElementById("ranking-container");
  container.innerHTML = top10
    .map((item, idx) => {
      const rank = idx + 1;
      const badgeLabel =
        rank === 1
          ? "👑 コスパ第1位（最安ベスト）"
          : rank === 2
          ? "🥈 第2位"
          : rank === 3
          ? "🥉 第3位"
          : `第${rank}位（1位との差 +¥${(item.totalEffectiveMonthly - best.totalEffectiveMonthly).toLocaleString()}/月）`;
      const tagsHtml = item.tags
        .map((t) => `<span class="tag ${t.includes("セット") ? "green" : ""}">${t}</span>`)
        .join("");

      // 割引情報ソースリストの組み立て
      const sourceItems = [];

      // 1. 光回線の公式料金・キャンペーンソース
      sourceItems.push(`
        <li class="source-item">
          <span>🌐 <strong>光回線料金：</strong>${item.net.name}（${item.netCost.note}）</span>
          <a class="source-link" href="${item.net.officialUrl}" target="_blank" rel="noopener noreferrer">🔗 ${item.net.name} 公式ページ ↗</a>
        </li>
      `);

      // 2. 光回線×スマホセット割ソース
      if (item.netCost.phoneSource) {
        sourceItems.push(`
          <li class="source-item">
            <span>📱 <strong>スマホセット割：</strong>${item.netCost.phoneSource.label}</span>
            <a class="source-link" href="${item.netCost.phoneSource.url}" target="_blank" rel="noopener noreferrer">🔗 ${item.netCost.phoneSource.title} ↗</a>
          </li>
        `);
      } else {
        sourceItems.push(`
          <li class="source-item">
            <span>📱 <strong>スマホセット割：</strong>この光回線と現在のスマホキャリアのセット割はありません（¥0）</span>
          </li>
        `);
      }

      // 3. ネット×電気のセット割有無の明示（誤解防止）
      if (!item.hasNetElecDirectBundle) {
        sourceItems.push(`
          <li class="source-item no-bundle">
            <span>⚠️ <strong>ネット×電気のセット割なし：</strong>「${item.net.name}」と「${item.elec.name}」の間には直接のセット割引はありません（それぞれ単体で安いものを組み合わせています）</span>
          </li>
        `);
      }

      // 4. 電気料金＆ガス/電気セット割の公式ソース
      if (item.elecCost.discountSource) {
        sourceItems.push(`
          <li class="source-item">
            <span>💡 <strong>電気料金・特典：</strong>${item.elecCost.discountSource.label}</span>
            <a class="source-link" href="${item.elecCost.discountSource.url}" target="_blank" rel="noopener noreferrer">🔗 ${item.elecCost.discountSource.title} ↗</a>
          </li>
        `);
      } else {
        sourceItems.push(`
          <li class="source-item">
            <span>💡 <strong>電気料金：</strong>${item.elec.name}（${item.elecCost.note}）</span>
            <a class="source-link" href="${item.elec.officialUrl}" target="_blank" rel="noopener noreferrer">🔗 ${item.elec.name} 公式料金表 ↗</a>
          </li>
        `);
      }

      return `
        <article class="rank-card rank-${rank}">
          <div class="rank-header">
            <div class="rank-title-group">
              <span class="rank-badge">${badgeLabel}</span>
              <h3 class="combo-name">${item.net.name} × ${item.elec.name}</h3>
            </div>
            <div class="combo-total">
              <span class="total-label">${state.evalMode === "2year_effective" ? "ネット＋電気 実質月額合計" : "ネット＋電気 2年目以降月額合計"}</span>
              <div class="total-value">¥${item.totalEffectiveMonthly.toLocaleString()}<small>/月（税込）</small></div>
            </div>
          </div>

          <div class="breakdown-grid">
            <div class="breakdown-item">
              <span class="item-title">🌐 光回線（${state.speed.toUpperCase()}）</span>
              <div class="item-val">¥${item.netCost.effectiveNetMonthly.toLocaleString()}/月</div>
              <span class="item-sub">通常 ¥${item.netCost.baseYear2.toLocaleString()}（1年目 ¥${item.netCost.baseYear1.toLocaleString()}）</span>
            </div>
            <div class="breakdown-item">
              <span class="item-title">💡 電気代（${state.kwh}kWh）</span>
              <div class="item-val">¥${item.elecCost.effectiveElecMonthly.toLocaleString()}/月</div>
              <span class="item-sub">関電従量電灯A比 ▲¥${Math.max(0, kandenBase - item.elecCost.effectiveElecMonthly).toLocaleString()}/月</span>
            </div>
            <div class="breakdown-item discount">
              <span class="item-title">📱 光×スマホセット割（必須OP差引後）</span>
              <div class="item-val">${item.netCost.phoneDiscountMonthly > 0 ? `-¥${item.netCost.phoneDiscountMonthly.toLocaleString()}/月` : "¥0（対象外）"}</div>
              <span class="item-sub">${item.netCost.phoneDiscountLabel}</span>
            </div>
          </div>

          <div class="reason-tags">${tagsHtml}</div>

          <div class="sources-box">
            <div class="sources-box-title">📚 割引の適用条件・公式情報ソース（クリックで公式ページを確認）</div>
            <ul class="source-list">
              ${sourceItems.join("")}
            </ul>
          </div>
        </article>
      `;
    })
    .join("");

  renderMatrixTable(state, kandenBase);
  renderAllPatternsChart(combos, baselineMonthly, best.totalEffectiveMonthly);
}

function renderAllPatternsChart(combos, baselineMonthly, bestTotal) {
  const chartContainer = document.getElementById("all-patterns-chart");
  const baselineLegend = document.getElementById("chart-baseline-legend");
  if (!chartContainer) return;

  baselineLegend.textContent = `基準額（標準光＋関電従量電灯A：¥${baselineMonthly.toLocaleString()}/月）`;

  // コスパ順位を保持したまま、ソートモードに応じて並び替え
  const rankedCombos = combos.map((item, idx) => ({
    ...item,
    rank: idx + 1
  }));

  const displayList =
    activeChartSort === "provider"
      ? [...rankedCombos].sort((a, b) => {
          if (a.net.id !== b.net.id) {
            return (
              INTERNET_PROVIDERS.findIndex((p) => p.id === a.net.id) -
              INTERNET_PROVIDERS.findIndex((p) => p.id === b.net.id)
            );
          }
          return a.totalEffectiveMonthly - b.totalEffectiveMonthly;
        })
      : rankedCombos;

  // グラフの最大横幅スケール（基準額または最大値の1.05倍）
  const maxCost = Math.max(
    baselineMonthly,
    ...rankedCombos.map((c) => c.totalEffectiveMonthly)
  ) * 1.05;

  const baselinePct = Math.min(100, (baselineMonthly / maxCost) * 100);

  chartContainer.innerHTML = displayList
    .map((item) => {
      const netAfterPhone = Math.max(0, item.netCost.effectiveNetMonthly - item.netCost.phoneDiscountMonthly);
      const elecNet = Math.max(0, item.elecCost.effectiveElecMonthly);
      const total = item.totalEffectiveMonthly;

      const totalWidthPct = Math.min(100, (total / maxCost) * 100);
      const netSharePct = total > 0 ? (netAfterPhone / total) * 100 : 50;
      const elecSharePct = 100 - netSharePct;

      const diffFromBest = total - bestTotal;
      const rankClass = item.rank <= 3 ? `rank-${item.rank}` : "";
      const rowClasses = [
        "chart-row",
        item.rank === 1 ? "is-top1" : "",
        item.hasNetElecDirectBundle ? "has-direct-bundle" : ""
      ]
        .filter(Boolean)
        .join(" ");

      const shortNetName = item.net.name.replace(/（.*?）/g, "");
      const shortElecName = item.elec.name.replace(/（.*?）/g, "");

      const subNotes = [];
      if (item.netCost.phoneDiscountMonthly > 0) {
        subNotes.push(`スマホ割▲¥${item.netCost.phoneDiscountMonthly.toLocaleString()}`);
      }
      if (item.hasNetElecDirectBundle) {
        subNotes.push(`⚡ネット×電気セット割`);
      } else if (item.elecCost.bundleDiscount > 0) {
        subNotes.push(`ガス×電気割▲¥${item.elecCost.bundleDiscount.toLocaleString()}`);
      }

      return `
        <div class="${rowClasses}">
          <div class="chart-rank-pill ${rankClass}">
            ${item.rank === 1 ? "👑 1位" : `${item.rank}位`}
          </div>
          <div class="chart-label-col">
            <span class="chart-combo-title">${shortNetName} × ${shortElecName}</span>
            <span class="chart-combo-sub">${subNotes.length ? subNotes.join(" / ") : "セット割なし（単体組み合わせ）"}</span>
          </div>
          <div class="chart-bar-track-wrap">
            <div class="chart-baseline-marker" style="left: ${baselinePct.toFixed(1)}%;" title="基準額: ¥${baselineMonthly.toLocaleString()}/月"></div>
            <div class="chart-bar-stack" style="width: ${totalWidthPct.toFixed(1)}%;">
              <div class="chart-seg-net" style="width: ${netSharePct.toFixed(1)}%;" title="光回線（スマホ割後）: ¥${netAfterPhone.toLocaleString()}/月">
                ネット ¥${netAfterPhone.toLocaleString()}
              </div>
              <div class="chart-seg-elec" style="width: ${elecSharePct.toFixed(1)}%;" title="電気代（セット割後）: ¥${elecNet.toLocaleString()}/月">
                電気 ¥${elecNet.toLocaleString()}
              </div>
            </div>
          </div>
          <div class="chart-price-col">
            <span class="chart-total-val">¥${total.toLocaleString()}<small>/月</small></span>
            <span class="chart-diff-val">${diffFromBest === 0 ? "🏆 最安ベスト" : `1位差 +¥${diffFromBest.toLocaleString()}/月`}</span>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderMatrixTable(state, kandenBase) {
  const table = document.getElementById("matrix-table");
  if (activeMatrixTab === "internet") {
    const rows = INTERNET_PROVIDERS.map((p) => {
      const c = calcInternetCost(p, state);
      const afterPhone = c.effectiveNetMonthly - c.phoneDiscountMonthly;
      const sourceLink = c.phoneSource
        ? `<a class="source-link" href="${c.phoneSource.url}" target="_blank" rel="noopener noreferrer">🔗 割引条件ソース ↗</a>`
        : `<a class="source-link" href="${p.officialUrl}" target="_blank" rel="noopener noreferrer">🔗 公式料金 ↗</a>`;
      return `
        <tr>
          <td>
            <strong>${p.name}</strong><br>
            <small style="color:#64748b">${p.networkType}</small>
          </td>
          <td>¥${c.baseYear1.toLocaleString()}/月</td>
          <td>¥${c.baseYear2.toLocaleString()}/月</td>
          <td>¥${c.cashback.toLocaleString()}</td>
          <td style="color:#dc2626;font-weight:700;">
            ${c.phoneDiscountMonthly > 0 ? `-¥${c.phoneDiscountMonthly.toLocaleString()}/月<br><small style="color:#64748b;font-weight:400;">(必須OP ¥${c.requiredOptionFee}差引済)</small>` : "対象外"}
          </td>
          <td style="font-weight:800;color:#1d4ed8;">¥${afterPhone.toLocaleString()}/月</td>
          <td>${sourceLink}</td>
        </tr>
      `;
    }).join("");

    table.innerHTML = `
      <thead>
        <tr>
          <th>光回線事業者</th>
          <th>1年目月額</th>
          <th>2年目以降</th>
          <th>キャッシュバック</th>
          <th>スマホ割（必須OP差引後）</th>
          <th>スマホ割後の実質月額</th>
          <th>公式情報ソース</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    `;
  } else {
    const rows = ELECTRICITY_PROVIDERS.map((e) => {
      const sampleNetId = e.id === "softbank_elec" ? "softbank" : "eo";
      const c = calcElectricityCost(e, state, sampleNetId);
      const diff = kandenBase - c.effectiveElecMonthly;
      const sourceUrl = c.discountSource ? c.discountSource.url : e.officialUrl;
      return `
        <tr>
          <td><strong>${e.name}</strong><br><small style="color:#64748b">${e.planName}</small></td>
          <td>¥${c.rawBill.toLocaleString()}/月</td>
          <td style="color:#059669;font-weight:700;">${c.bundleDiscount + c.promoMonthlyDiscount > 0 ? `-¥${(c.bundleDiscount + c.promoMonthlyDiscount).toLocaleString()}/月` : "なし"}</td>
          <td style="font-weight:800;color:#1d4ed8;">¥${c.effectiveElecMonthly.toLocaleString()}/月</td>
          <td>${diff >= 0 ? `関電より月 ¥${diff.toLocaleString()} 安い` : `関電と同水準`}</td>
          <td><a class="source-link" href="${sourceUrl}" target="_blank" rel="noopener noreferrer">🔗 公式料金・割引条件 ↗</a></td>
        </tr>
      `;
    }).join("");

    table.innerHTML = `
      <thead>
        <tr>
          <th>電力会社・プラン</th>
          <th>基本算定額（${state.kwh}kWh）</th>
          <th>セット割・特典</th>
          <th>実質月額（電気代）</th>
          <th>関西電力（従量電灯A）との差額</th>
          <th>公式情報ソース</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sim-form");
  form.addEventListener("input", renderResults);
  form.addEventListener("change", renderResults);

  const presetBtns = document.querySelectorAll(".preset-btn");
  const kwhInput = document.getElementById("kwh");
  presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      presetBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      kwhInput.value = btn.dataset.kwh;
      renderResults();
    });
  });

  kwhInput.addEventListener("input", () => {
    presetBtns.forEach((b) => {
      b.classList.toggle("active", b.dataset.kwh === kwhInput.value);
    });
  });

  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeMatrixTab = btn.dataset.tab;
      renderResults();
    });
  });

  const sortBtns = document.querySelectorAll(".chart-sort-btn");
  sortBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      sortBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeChartSort = btn.dataset.sort;
      renderResults();
    });
  });

  // 画面レイアウト切り替えボタン（自動 / 縦1列 / 横2列）
  const layoutBtns = document.querySelectorAll(".layout-mode-btn");
  layoutBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      layoutBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeLayoutMode = btn.dataset.layout;
      applyResponsiveLayout();
    });
  });

  // 画面の回転・リサイズ時に自動で最適配置へ切り替え
  window.addEventListener("resize", applyResponsiveLayout);
  window.addEventListener("orientationchange", () => {
    setTimeout(applyResponsiveLayout, 100);
  });

  // 縦画面での条件フォーム折りたたみボタン
  const toggleFormBtn = document.getElementById("toggle-form-btn");
  const formSection = document.getElementById("form-card-section");
  if (toggleFormBtn && formSection) {
    toggleFormBtn.addEventListener("click", () => {
      const isCollapsed = formSection.classList.toggle("collapsed");
      toggleFormBtn.setAttribute("aria-expanded", String(!isCollapsed));
      toggleFormBtn.textContent = isCollapsed ? "▼ 条件を開く" : "▲ 条件を折りたたむ";
    });
  }

  // 下部フローティングバーの「結果を見る / 条件へ戻る」ジャンプボタン
  const jumpBtn = document.getElementById("floating-jump-btn");
  if (jumpBtn) {
    jumpBtn.addEventListener("click", () => {
      const banner = document.getElementById("savings-banner");
      if (!banner) return;
      const rect = banner.getBoundingClientRect();
      if (rect.top > 120) {
        banner.scrollIntoView({ behavior: "smooth", block: "start" });
        jumpBtn.textContent = "条件変更 ⬆️";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        jumpBtn.textContent = "結果を見る ⬇️";
      }
    });
  }

  applyResponsiveLayout();
  renderResults();
});
