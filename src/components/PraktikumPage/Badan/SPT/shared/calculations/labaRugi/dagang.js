import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4004 Penjualan Bruto
export function hitungSubtotal4004(rows) {
  const kode4004 = rows.find((r) => r.kodeAkun === "4004");
  const kode4003 = rows.find((r) => r.kodeAkun === "4003");
  const kode4002 = rows.find((r) => r.kodeAkun === "4002");

  if (kode4004 && kode4003 && kode4002) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4004[key] = toNumber(kode4003[key]) + toNumber(kode4002[key]);
    });
  }
}

// Rumus subtotal untuk kode 4020 Penjualan Bersih

export function hitungSubtotal4020(rows) {
  const kode4011 = rows.find((r) => r.kodeAkun === "4011");
  const kode4012 = rows.find((r) => r.kodeAkun === "4012");
  const kode4013 = rows.find((r) => r.kodeAkun === "4013");
  const kode4020 = rows.find((r) => r.kodeAkun === "4020");
  const kode4004 = rows.find((r) => r.kodeAkun === "4004");

  if (kode4020 && kode4011 && kode4012 && kode4013 && kode4004) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4020[key] =
        toNumber(kode4004[key]) -
        (toNumber(kode4011[key]) + toNumber(kode4012[key]) + toNumber(kode4013[key]));
    });
  }
}

// Rumus subtotal untuk kode 5020 Harga Pokok Penjualan
export function hitungSubtotal5020(rows) {
  const kode5020 = rows.find((r) => r.kodeAkun === "5020");
  const kode5001 = rows.find((r) => r.kodeAkun === "5001");
  const kode5003 = rows.find((r) => r.kodeAkun === "5003");
  const kode5007 = rows.find((r) => r.kodeAkun === "5007");
  const kode5008 = rows.find((r) => r.kodeAkun === "5008");
  const kode5009 = rows.find((r) => r.kodeAkun === "5009");

  if (kode5020 && kode5001 && kode5003 && kode5007 && kode5008 && kode5009) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode5020[key] =
        toNumber(kode5001[key]) +
        toNumber(kode5003[key]) +
        toNumber(kode5007[key]) +
        toNumber(kode5008[key]) -
        toNumber(kode5009[key]);
    });
  }
}

// Rumus subtotal untuk kode 4300 Laba Kotor
export function hitungSubtotal4300(rows) {
  const kode4300 = rows.find((r) => r.kodeAkun === "4300");
  const kode4020 = rows.find((r) => r.kodeAkun === "4020");
  const kode5020 = rows.find((r) => r.kodeAkun === "5020");

  if (kode4300 && kode4020 && kode5020) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4300[key] = toNumber(kode4020[key]) - toNumber(kode5020[key]);
    });
  }
}


// Rumus subtotal untuk kode 5400 Beban Usaha
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
        toNumber(kode5399[key]);
    });
  }
}

// Rumus subtotal untuk kode 4500 Laba (Rugi) Usaha
export function hitungSubtotal4500(rows) {
  const kode4500 = rows.find((r) => r.kodeAkun === "4500");
  const kode4300 = rows.find((r) => r.kodeAkun === "4300");
  const kode5400 = rows.find((r) => r.kodeAkun === "5400");

  if (kode4500 && kode4300 && kode5400) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4500[key] = toNumber(kode4300[key]) - toNumber(kode5400[key]);
    });
  }
}

// Rumus subtotal untuk kode 4600 Jumlah Pendapatan Non Usaha
export function hitungSubtotal4600(rows) {
  const kode4600 = rows.find((r) => r.kodeAkun === "4600");
  const kode4501 = rows.find((r) => r.kodeAkun === "4501");
  const kode4503 = rows.find((r) => r.kodeAkun === "4503");
  const kode4511 = rows.find((r) => r.kodeAkun === "4511");
  const kode4599 = rows.find((r) => r.kodeAkun === "4599");

  if (kode4600 && kode4501 && kode4503 && kode4511 && kode4599) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4600[key] =
        toNumber(kode4501[key]) +
        toNumber(kode4503[key]) +
        toNumber(kode4511[key]) +
        toNumber(kode4599[key]);
    });
  }
}

// Rumus subtotal untuk kode 5500 Jumlah Beban Non Usaha

export function hitungSubtotal5500(rows) {
  const kode5500 = rows.find((r) => r.kodeAkun === "5500");
  const kode5405 = rows.find((r) => r.kodeAkun === "5405");
  const kode5409 = rows.find((r) => r.kodeAkun === "5409");
  const kode5421 = rows.find((r) => r.kodeAkun === "5421");
  const kode5499 = rows.find((r) => r.kodeAkun === "5499");

  if (kode5500 && kode5405 && kode5409 && kode5421 && kode5499) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode5500[key] =
        toNumber(kode5405[key]) +
        toNumber(kode5409[key]) +
        toNumber(kode5421[key]) +
        toNumber(kode5499[key]);
    });
  }
}

// Rumus total untuk kode 4700 Laba (Rugi) Non Usaha

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
  const kode4300 = rows.find((r) => r.kodeAkun === "4300");
  const kode4199 = rows.find((r) => r.kodeAkun === "4199");
  const kode5400 = rows.find((r) => r.kodeAkun === "5400");
  const kode4600 = rows.find((r) => r.kodeAkun === "4600");
  const kode5500 = rows.find((r) => r.kodeAkun === "5500");

  if (kode4800 && kode4300 && kode4199 && kode5400 && kode4600 && kode5500) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4800[key] =
        toNumber(kode4300[key]) +
        toNumber(kode4199[key]) -
        toNumber(kode5400[key]) +
        toNumber(kode4600[key]) -
        toNumber(kode5500[key]);
    });
  }
}
