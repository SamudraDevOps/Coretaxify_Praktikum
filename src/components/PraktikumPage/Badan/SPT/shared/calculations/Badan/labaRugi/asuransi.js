import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4060 Jumlah Pendapatan Premi Neto
export function hitungSubtotal4060(rows) {
  const kode4060 = rows.find((r) => r.kodeAkun === "4060");
  const kode4041 = rows.find((r) => r.kodeAkun === "4041");
  const kode4045 = rows.find((r) => r.kodeAkun === "4045");
  const kode4047 = rows.find((r) => r.kodeAkun === "4047");
  const kode4051 = rows.find((r) => r.kodeAkun === "4051");

  if (kode4060 && kode4041 && kode4045 && kode4047 && kode4051) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4060[key] =
        toNumber(kode4041[key]) -
        (toNumber(kode4045[key]) + toNumber(kode4047[key]) + toNumber(kode4051[key]));
    });
  }
}

// Rumus subtotal untuk kode 4200 Jumlah Pendapatan Underwriting

export function hitungSubtotal4200(rows) {
  const kode4200 = rows.find((r) => r.kodeAkun === "4200");
  const kode4060 = rows.find((r) => r.kodeAkun === "4060");
  const kode4171 = rows.find((r) => r.kodeAkun === "4171");

  if (kode4200 && kode4060 && kode4171) {
    ["nilaiKomersial", "nilaiFiskal"].forEach((key) => {
      kode4200[key] = toNumber(kode4060[key]) + toNumber(kode4171[key]);
    });
  }
}

// Rumus subtotal untuk kode 5200 Jumlah Beban Underwriting

export function hitungSubtotal5200(rows) {
  const kode5200 = rows.find((r) => r.kodeAkun === "5200");
  const kode5101 = rows.find((r) => r.kodeAkun === "5101");
  const kode5102 = rows.find((r) => r.kodeAkun === "5102");
  const kode5103 = rows.find((r) => r.kodeAkun === "5103");
  const kode5109 = rows.find((r) => r.kodeAkun === "5109");

  if (kode5200 && kode5101 && kode5102 && kode5103 && kode5109) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode5200[key] =
        toNumber(kode5101[key]) +
        toNumber(kode5102[key]) +
        toNumber(kode5103[key]) +
        toNumber(kode5109[key]);
    });
  }
}

// Rumus subtotal untuk kode 4300 Laba Underwriting

export function hitungSubtotal4300(rows) {
  const kode4300 = rows.find((r) => r.kodeAkun === "4300");
  const kode4200 = rows.find((r) => r.kodeAkun === "4200");
  const kode5200 = rows.find((r) => r.kodeAkun === "5200");

  if (kode4300 && kode5200 && kode4200) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4300[key] = toNumber(kode4200[key]) - toNumber(kode5200[key]);
    });
  }
}

// Rumus subtotal untuk kode 5400 Beban Operasional
export function hitungSubtotal5400(rows) {
  const kode5400 = rows.find((r) => r.kodeAkun === "5400");
  const kode5311 = rows.find((r) => r.kodeAkun === "5311");
  const kode5312 = rows.find((r) => r.kodeAkun === "5312");
  const kode5313 = rows.find((r) => r.kodeAkun === "5313");
  const kode5314 = rows.find((r) => r.kodeAkun === "5314");
  const kode5315 = rows.find((r) => r.kodeAkun === "5315");
  const kode5316 = rows.find((r) => r.kodeAkun === "5316");
  const kode5317 = rows.find((r) => r.kodeAkun === "5317");
  const kode5318 = rows.find((r) => r.kodeAkun === "5318");
  const kode5319 = rows.find((r) => r.kodeAkun === "5319");
  const kode5320 = rows.find((r) => r.kodeAkun === "5320");
  const kode5321 = rows.find((r) => r.kodeAkun === "5321");
  const kode5399 = rows.find((r) => r.kodeAkun === "5399");
  if (
    kode5400 &&
    kode5311 &&
    kode5312 &&
    kode5313 &&
    kode5314 &&
    kode5315 &&
    kode5316 &&
    kode5317 &&
    kode5318 &&
    kode5319 &&
    kode5320 &&
    kode5321 &&
    kode5399
  ) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode5400[key] =
        toNumber(kode5311[key]) +
        toNumber(kode5312[key]) +
        toNumber(kode5313[key]) +
        toNumber(kode5314[key]) +
        toNumber(kode5315[key]) +
        toNumber(kode5316[key]) +
        toNumber(kode5317[key]) +
        toNumber(kode5318[key]) +
        toNumber(kode5319[key]) +
        toNumber(kode5320[key]) +
        toNumber(kode5321[key]) +
        toNumber(kode5399[key]);
    });
  }
}

// Rumus subtotal untuk kode 4700 Laba Rugi Non Operasional
export function hitungSubtotal4700(rows) {
  const kode4700 = rows.find((r) => r.kodeAkun === "4700");
  const kode4512 = rows.find((r) => r.kodeAkun === "4512");
  const kode4513 = rows.find((r) => r.kodeAkun === "4513");
  const kode4514 = rows.find((r) => r.kodeAkun === "4514");
  const kode4599 = rows.find((r) => r.kodeAkun === "4599");
  const kode5499 = rows.find((r) => r.kodeAkun === "5499");

  if (kode4700 && kode4512 && kode4513 && kode4514 && kode4599 && kode5499) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4700[key] =
        toNumber(kode4512[key]) +
        toNumber(kode4513[key]) +
        toNumber(kode4514[key]) +
        toNumber(kode4599[key]) -
        toNumber(kode5499[key]);
    });
  }
}

// Rumus total untuk kode 4700 Laba Rugi Non Operasional

export function hitungTotal4700(rows) {
  const kode4700 = rows.find((r) => r.kodeAkun === "4700");
  const kode4600 = rows.find((r) => r.kodeAkun === "4600");
  const kode5500 = rows.find((r) => r.kodeAkun === "5500");

  if (kode4700 && kode4600 && kode5500) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4700[key] = toNumber(kode4600[key]) - toNumber(kode5500[key]);
    });
  }
}

// Rumus total untuk kode 4800 Laba (Rugi) Sebelum Pajak
export function hitungTotal4800(rows) {
  const kode4800 = rows.find((r) => r.kodeAkun === "4800");
  const kode4200 = rows.find((r) => r.kodeAkun === "4200");
  const kode5200 = rows.find((r) => r.kodeAkun === "5200");
  const kode4120 = rows.find((r) => r.kodeAkun === "4120");
  const kode4199 = rows.find((r) => r.kodeAkun === "4199");
  const kode5400 = rows.find((r) => r.kodeAkun === "5400");
  const kode4700 = rows.find((r) => r.kodeAkun === "4700");

  if (kode4800 && kode4200 && kode5200 && kode4120 && kode4199 && kode5400 && kode4700) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4800[key] =
        toNumber(kode4200[key]) -
        toNumber(kode5200[key]) +
        toNumber(kode4120[key]) +
        toNumber(kode4199[key]) -
        toNumber(kode5400[key]) +
        toNumber(kode4700[key]);
    });
  }
}
