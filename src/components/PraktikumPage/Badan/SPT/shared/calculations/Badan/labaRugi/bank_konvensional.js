import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4040 Pendapatan (Beban) Bunga bersih
export function hitungSubtotal4040(rows) {
  const kode4040 = rows.find((r) => r.kodeAkun === "4040");
  const kode4027 = rows.find((r) => r.kodeAkun === "4027");
  const kode4028 = rows.find((r) => r.kodeAkun === "4028");
  const kode4031 = rows.find((r) => r.kodeAkun === "4031");
  const kode4033 = rows.find((r) => r.kodeAkun === "4033");

  if (kode4040 && kode4027 && kode4028 && kode4031 && kode4033) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4040[key] =
        toNumber(kode4027[key]) +
        toNumber(kode4028[key]) -
        (toNumber(kode4031[key]) + toNumber(kode4033[key]));
    });
  }
}

// Rumus subtotal untuk kode 4210 Jumlah Pendapatan Operasional Lain

export function hitungSubtotal4210(rows) {
  const kode4210 = rows.find((r) => r.kodeAkun === "4210");
  const kode4071 = rows.find((r) => r.kodeAkun === "4071");
  const kode4073 = rows.find((r) => r.kodeAkun === "4073");
  const kode4074 = rows.find((r) => r.kodeAkun === "4074");
  const kode4091 = rows.find((r) => r.kodeAkun === "4091");
  const kode4092 = rows.find((r) => r.kodeAkun === "4092");
  const kode4093 = rows.find((r) => r.kodeAkun === "4093");
  const kode4094 = rows.find((r) => r.kodeAkun === "4094");
  const kode4199 = rows.find((r) => r.kodeAkun === "4199");

  if (
    kode4210 &&
    kode4071 &&
    kode4073 &&
    kode4074 &&
    kode4091 &&
    kode4092 &&
    kode4093 &&
    kode4094 &&
    kode4199
  ) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4210[key] =
        toNumber(kode4071[key]) +
        toNumber(kode4073[key]) +
        toNumber(kode4074[key]) +
        toNumber(kode4091[key]) +
        toNumber(kode4092[key]) +
        toNumber(kode4093[key]) +
        toNumber(kode4094[key]) +
        toNumber(kode4199[key]);
    });
  }
}

// Rumus subtotal untuk kode 5401 Jumlah Beban Operasional Lain

export function hitungSubtotal5401(rows) {
  const kode5401 = rows.find((r) => r.kodeAkun === "5401");
  const kode5350 = rows.find((r) => r.kodeAkun === "5350");
  const kode5351 = rows.find((r) => r.kodeAkun === "5351");
  const kode5352 = rows.find((r) => r.kodeAkun === "5352");
  const kode5353 = rows.find((r) => r.kodeAkun === "5353");
  const kode5354 = rows.find((r) => r.kodeAkun === "5354");
  const kode5346 = rows.find((r) => r.kodeAkun === "5346");
  const kode5356 = rows.find((r) => r.kodeAkun === "5356");
  const kode5348 = rows.find((r) => r.kodeAkun === "5348");
  const kode5358 = rows.find((r) => r.kodeAkun === "5358");
  const kode5311 = rows.find((r) => r.kodeAkun === "5311");
  const kode5312 = rows.find((r) => r.kodeAkun === "5312");
  const kode5313 = rows.find((r) => r.kodeAkun === "5313");
  const kode5314 = rows.find((r) => r.kodeAkun === "5314");
  const kode5315 = rows.find((r) => r.kodeAkun === "5315");
  const kode5316 = rows.find((r) => r.kodeAkun === "5316");
  const kode5317 = rows.find((r) => r.kodeAkun === "5317");
  const kode5318 = rows.find((r) => r.kodeAkun === "5318");
  const kode5320 = rows.find((r) => r.kodeAkun === "5320");
  const kode5321 = rows.find((r) => r.kodeAkun === "5321");
  const kode5322 = rows.find((r) => r.kodeAkun === "5322");
  const kode5399 = rows.find((r) => r.kodeAkun === "5399");
  if (
    kode5401 &&
    kode5350 &&
    kode5351 &&
    kode5352 &&
    kode5353 &&
    kode5354 &&
    kode5346 &&
    kode5356 &&
    kode5348 &&
    kode5358 &&
    kode5311 &&
    kode5312 &&
    kode5313 &&
    kode5314 &&
    kode5315 &&
    kode5316 &&
    kode5317 &&
    kode5318 &&
    kode5320 &&
    kode5321 &&
    kode5322 &&
    kode5399
  ) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode5401[key] =
        toNumber(kode5350[key]) +
        toNumber(kode5351[key]) +
        toNumber(kode5352[key]) +
        toNumber(kode5353[key]) +
        toNumber(kode5354[key]) +
        toNumber(kode5346[key]) +
        toNumber(kode5356[key]) +
        toNumber(kode5348[key]) +
        toNumber(kode5358[key]) +
        toNumber(kode5311[key]) +
        toNumber(kode5312[key]) +
        toNumber(kode5313[key]) +
        toNumber(kode5314[key]) +
        toNumber(kode5315[key]) +
        toNumber(kode5316[key]) +
        toNumber(kode5317[key]) +
        toNumber(kode5318[key]) +
        toNumber(kode5320[key]) +
        toNumber(kode5321[key]) +
        toNumber(kode5322[key]) +
        toNumber(kode5399[key]);
    });
  }
}

// Rumus subtotal untuk kode 4400 Laba Rugi Operasional Lain-Bersih

export function hitungSubtotal4400(rows) {
  const kode4400 = rows.find((r) => r.kodeAkun === "4400");
  const kode4040 = rows.find((r) => r.kodeAkun === "4040");
  const kode4210 = rows.find((r) => r.kodeAkun === "4210");
  const kode5401 = rows.find((r) => r.kodeAkun === "5401");

  if (kode4400 && kode4040 && kode4210 && kode5401) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4400[key] = toNumber(kode4040[key]) + (toNumber(kode4210[key]) - toNumber(kode5401[key]));
    });
  }
}

// Rumus subtotal untuk kode 4700 Laba (Rugi) Non Operasional-Bersih

export function hitungSubtotal4700(rows) {
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

// Rumus subtotal untuk kode 4800 Laba (Rugi) Sebelum Pajak

export function hitungSubtotal4800(rows) {
  const kode4800 = rows.find((r) => r.kodeAkun === "4800");
  const kode4040 = rows.find((r) => r.kodeAkun === "4040");
  const kode4210 = rows.find((r) => r.kodeAkun === "4210");
  const kode5401 = rows.find((r) => r.kodeAkun === "5401");
  const kode4600 = rows.find((r) => r.kodeAkun === "4600");
  const kode5500 = rows.find((r) => r.kodeAkun === "5500");

  if (kode4800 && kode4040 && kode4210 && kode5401 && kode4600 && kode5500) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4800[key] =
        toNumber(kode4040[key]) +
        (toNumber(kode4210[key]) - toNumber(kode5401[key])) +
        (toNumber(kode4600[key]) - toNumber(kode5500[key]));
    });
  }
}
