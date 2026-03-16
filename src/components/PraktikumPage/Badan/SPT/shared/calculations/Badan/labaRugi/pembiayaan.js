import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4201 Jumlah Pendapatan Usaha
export function hitungSubtotal4201(rows) {
  const kode4201 = rows.find((r) => r.kodeAkun === "4201");
  const kode4061 = rows.find((r) => r.kodeAkun === "4061");
  const kode4062 = rows.find((r) => r.kodeAkun === "4062");
  const kode4063 = rows.find((r) => r.kodeAkun === "4063");
  const kode4064 = rows.find((r) => r.kodeAkun === "4064");
  const kode4065 = rows.find((r) => r.kodeAkun === "4065");
  const kode4066 = rows.find((r) => r.kodeAkun === "4066");
  const kode4199 = rows.find((r) => r.kodeAkun === "4199");

  if (
    kode4201 &&
    kode4061 &&
    kode4062 &&
    kode4063 &&
    kode4064 &&
    kode4065 &&
    kode4066 &&
    kode4199
  ) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4201[key] =
        toNumber(kode4061[key]) +
        toNumber(kode4062[key]) +
        toNumber(kode4063[key]) +
        toNumber(kode4064[key]) +
        toNumber(kode4065[key]) +
        toNumber(kode4066[key]) +
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
  const kode5326 = rows.find((r) => r.kodeAkun === "5326");
  const kode5327 = rows.find((r) => r.kodeAkun === "5327");
  const kode5328 = rows.find((r) => r.kodeAkun === "5328");
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
    kode5326 &&
    kode5327 &&
    kode5328 &&
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
        toNumber(kode5326[key]) +
        toNumber(kode5327[key]) +
        toNumber(kode5328[key]) +
        toNumber(kode5399[key]);
    });
  }
}

// Rumus total untuk kode 4600 Jumlah Pendapaatan diluar Usaha

export function hitungTotal4600(rows) {
  const kode4600 = rows.find((r) => r.kodeAkun === "4600");
  const kode4026 = rows.find((r) => r.kodeAkun === "4026");
  const kode4161 = rows.find((r) => r.kodeAkun === "4161");
  const kode4501 = rows.find((r) => r.kodeAkun === "4501");
  const kode4599 = rows.find((r) => r.kodeAkun === "4599");

  if (kode4600 && kode4026 && kode4161 && kode4501 && kode4599) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4600[key] =
        toNumber(kode4026[key]) +
        toNumber(kode4161[key]) +
        toNumber(kode4501[key]) +
        toNumber(kode4599[key]);
    });
  }
}

// Rumus total untuk kode 5500 Jumlah Beban Non Usaha
export function hitungTotal5500(rows) {
  const kode5500 = rows.find((r) => r.kodeAkun === "5500");
  const kode5405 = rows.find((r) => r.kodeAkun === "5405");
  const kode5409 = rows.find((r) => r.kodeAkun === "5409");
  const kode5412 = rows.find((r) => r.kodeAkun === "5412");
  const kode5499 = rows.find((r) => r.kodeAkun === "5499");

  if (kode5500 && kode5405 && kode5409 && kode5412 && kode5499) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode5500[key] =
        +toNumber(kode5405[key]) +
        toNumber(kode5412[key]) +
        toNumber(kode5409[key]) +
        toNumber(kode5499[key]);
    });
  }
}

// Rumus total untuk kode 4800 Laba(Rugi) Sebelum Pajak
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
