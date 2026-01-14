import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4201 Jumlah Pendapatan Usaha
export function hitungSubtotal4201(rows) {
  const kode4201 = rows.find((r) => r.kodeAkun === "4201");
  const kode4081 = rows.find((r) => r.kodeAkun === "4081");
  const kode4082 = rows.find((r) => r.kodeAkun === "4082");
  const kode4083 = rows.find((r) => r.kodeAkun === "4083");
  const kode4026 = rows.find((r) => r.kodeAkun === "4026");
  const kode4091 = rows.find((r) => r.kodeAkun === "4091");
  const kode4199 = rows.find((r) => r.kodeAkun === "4199");

  if (kode4201 && kode4081 && kode4082 && kode4083 && kode4026 && kode4091 && kode4199) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4201[key] =
        toNumber(kode4081[key]) +
        toNumber(kode4082[key]) +
        toNumber(kode4083[key]) +
        toNumber(kode4026[key]) +
        toNumber(kode4091[key]) +
        toNumber(kode4199[key]);
    });
  }
}

// Rumus subtotal untuk kode 5400 Jumlah Beban Usaha
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
  const kode5322 = rows.find((r) => r.kodeAkun === "5322");
  const kode5205 = rows.find((r) => r.kodeAkun === "5205");
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
    kode5322 &&
    kode5205 &&
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
        toNumber(kode5322[key]) +
        toNumber(kode5205[key]) +
        toNumber(kode5399[key]);
    });
  }
}

// Rumus total untuk kode 4600 Jumlah Pendapaatan diluar Usaha

export function hitungTotal4600(rows) {
  const kode4600 = rows.find((r) => r.kodeAkun === "4600");
  const kode4511 = rows.find((r) => r.kodeAkun === "4511");
  const kode4503 = rows.find((r) => r.kodeAkun === "4503");
  const kode4501 = rows.find((r) => r.kodeAkun === "4501");
  const kode4599 = rows.find((r) => r.kodeAkun === "4599");

  if (kode4600 && kode4503 && kode4511 && kode4501 && kode4599) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4600[key] =
        toNumber(kode4511[key]) +
        toNumber(kode4503[key]) +
        toNumber(kode4501[key]) +
        toNumber(kode4599[key]);
    });
  }
}

// Rumus total untuk kode 5500 Jumlah Beban Non Usaha
export function hitungTotal5500(rows) {
  const kode5500 = rows.find((r) => r.kodeAkun === "5500");
  const kode5405 = rows.find((r) => r.kodeAkun === "5405");
  const kode5421 = rows.find((r) => r.kodeAkun === "5421");
  const kode5409 = rows.find((r) => r.kodeAkun === "5409");
  const kode5499 = rows.find((r) => r.kodeAkun === "5499");

  if (kode5500 && kode5405 && kode5409 && kode5421 && kode5499) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode5500[key] =
        +toNumber(kode5405[key]) +
        toNumber(kode5421[key]) +
        toNumber(kode5409[key]) +
        toNumber(kode5499[key]);
    });
  }
}

export function hitungTotal4800(rows) {
  const kode4800 = rows.find((r) => r.kodeAkun === "4800");
  const kode4201 = rows.find((r) => r.kodeAkun === "4201");
  const kode5400 = rows.find((r) => r.kodeAkun === "5400");
  const kode4600 = rows.find((r) => r.kodeAkun === "4600");
  const kode5500 = rows.find((r) => r.kodeAkun === "5500");

  if (kode4800 && kode4201 && kode5400 && kode4600 && kode5500) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4800[key] =
        toNumber(kode4201[key]) -
        toNumber(kode5400[key]) +
        toNumber(kode4600[key]) -
        toNumber(kode5500[key]);
    });
  }
}
