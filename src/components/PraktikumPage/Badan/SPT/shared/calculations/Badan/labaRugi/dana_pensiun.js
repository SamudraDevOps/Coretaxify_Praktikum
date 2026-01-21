import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4120 Jumlah Pendatapan Investasi
export function hitungSubtotal4120(rows) {
  const kode4120 = rows.find((r) => r.kodeAkun === "4120");
  const kode4026 = rows.find((r) => r.kodeAkun === "4026");
  const kode4091 = rows.find((r) => r.kodeAkun === "4091");
  const kode4101 = rows.find((r) => r.kodeAkun === "4101");
  const kode4106 = rows.find((r) => r.kodeAkun === "4106");
  const kode4118 = rows.find((r) => r.kodeAkun === "4118");

  if (kode4120 && kode4026 && kode4091 && kode4101 && kode4106 && kode4118) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4120[key] =
        toNumber(kode4026[key]) +
        toNumber(kode4091[key]) +
        toNumber(kode4101[key]) +
        toNumber(kode4106[key]) +
        toNumber(kode4118[key]);
    });
  }
}

// Rumus subtotal untuk kode 5300 Jumlah Beban Investasi
export function hitungSubtotal5300(rows) {
  const kode5300 = rows.find((r) => r.kodeAkun === "5300");
  const kode5201 = rows.find((r) => r.kodeAkun === "5201");
  const kode5202 = rows.find((r) => r.kodeAkun === "5202");
  const kode5203 = rows.find((r) => r.kodeAkun === "5203");
  const kode5204 = rows.find((r) => r.kodeAkun === "5204");
  const kode5205 = rows.find((r) => r.kodeAkun === "5205");
  const kode5299 = rows.find((r) => r.kodeAkun === "5299");

  if (kode5300 && kode5201 && kode5202 && kode5203 && kode5204 && kode5205 && kode5299) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode5300[key] =
        toNumber(kode5201[key]) +
        toNumber(kode5202[key]) +
        toNumber(kode5203[key]) +
        toNumber(kode5204[key]) +
        toNumber(kode5205[key]) +
        toNumber(kode5299[key]);
    });
  }
}

// Rumus subtotal untuk kode 4300 Hasil Usaha Investasi
export function hitungSubtotal4300(rows) {
  const kode4300 = rows.find((r) => r.kodeAkun === "4300");
  const kode4120 = rows.find((r) => r.kodeAkun === "4120");
  const kode5300 = rows.find((r) => r.kodeAkun === "5300");

  if (kode4300 && kode4120 && kode5300) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4300[key] = toNumber(kode4120[key]) - toNumber(kode5300[key]);
    });
  }
}

// Rumus subtotal untuk kode 5400 Jumlah Pendapatan Non Usaha
export function hitungSubtotal5400(rows) {
  const kode5400 = rows.find((r) => r.kodeAkun === "5400");
  const kode5311 = rows.find((r) => r.kodeAkun === "5311");
  const kode5312 = rows.find((r) => r.kodeAkun === "5312");
  const kode5323 = rows.find((r) => r.kodeAkun === "5323");
  const kode5326 = rows.find((r) => r.kodeAkun === "5326");
  const kode5314 = rows.find((r) => r.kodeAkun === "5314");
  const kode5316 = rows.find((r) => r.kodeAkun === "5316");
  const kode5317 = rows.find((r) => r.kodeAkun === "5317");
  const kode5318 = rows.find((r) => r.kodeAkun === "5318");
  const kode5320 = rows.find((r) => r.kodeAkun === "5320");
  const kode5399 = rows.find((r) => r.kodeAkun === "5399");

  if (
    kode5400 &&
    kode5311 &&
    kode5312 &&
    kode5323 &&
    kode5326 &&
    kode5314 &&
    kode5316 &&
    kode5317 &&
    kode5318 &&
    kode5320 &&
    kode5399
  ) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode5400[key] =
        toNumber(kode5311[key]) +
        toNumber(kode5312[key]) +
        toNumber(kode5323[key]) +
        toNumber(kode5326[key]) +
        toNumber(kode5314[key]) +
        toNumber(kode5316[key]) +
        toNumber(kode5317[key]) +
        toNumber(kode5318[key]) +
        toNumber(kode5320[key]) +
        toNumber(kode5399[key]);
    });
  }
}

// Rumus total untuk kode 4700 Jumlah Pendapaatan (Beban) Non Operasional Lainnya

export function hitungTotal4700(rows) {
  const kode4700 = rows.find((r) => r.kodeAkun === "4700");
  const kode4599 = rows.find((r) => r.kodeAkun === "4599");
  const kode5499 = rows.find((r) => r.kodeAkun === "5499");

  if (kode4700 && kode4599 && kode5499) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4700[key] = toNumber(kode4599[key]) - toNumber(kode5499[key]);
    });
  }
}

// Rumus total untuk kode 4800 Laba (Rugi) Sebelum Pajak
export function hitungTotal4800(rows) {
  const kode4800 = rows.find((r) => r.kodeAkun === "4800");
  const kode4300 = rows.find((r) => r.kodeAkun === "4300");
  const kode5400 = rows.find((r) => r.kodeAkun === "5400");
  const kode4512 = rows.find((r) => r.kodeAkun === "4512");
  const kode4513 = rows.find((r) => r.kodeAkun === "4513");
  const kode4514 = rows.find((r) => r.kodeAkun === "4514");
  const kode4700 = rows.find((r) => r.kodeAkun === "4700");

  if (kode4800 && kode4300 && kode5400 && kode4512 && kode4513 && kode4514 && kode4700) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4800[key] =
        toNumber(kode4300[key]) -
        toNumber(kode5400[key]) +
        toNumber(kode4512[key]) +
        toNumber(kode4513[key]) +
        toNumber(kode4514[key]) +
        toNumber(kode4700[key]);
    });
  }
}
