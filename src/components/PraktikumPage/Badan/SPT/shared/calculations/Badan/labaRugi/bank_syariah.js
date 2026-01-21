import { parseFormattedNumber, toNumber } from "@utils/formatCurrency";

// Rumus subtotal untuk kode 4130 Total Pendapatan Dari Piutang
export function hitungSubtotal4130(rows) {
  const kode4130 = rows.find((r) => r.kodeAkun === "4130");
  const kode4121 = rows.find((r) => r.kodeAkun === "4121");
  const kode4122 = rows.find((r) => r.kodeAkun === "4122");
  const kode4123 = rows.find((r) => r.kodeAkun === "4123");

  if (kode4130 && kode4121 && kode4122 && kode4123) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4130[key] = toNumber(kode4121[key]) + toNumber(kode4122[key]) + toNumber(kode4123[key]);
    });
  }
}

// Rumus subtotal untuk kode 4140 Jumlah Pnedapatan Bagi Hasil

export function hitungSubtotal4140(rows) {
  {
    const kode4140 = rows.find((r) => r.kodeAkun === "4140");
    const kode4131 = rows.find((r) => r.kodeAkun === "4131");
    const kode4132 = rows.find((r) => r.kodeAkun === "4132");

    if (kode4140 && kode4131 && kode4132) {
      const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
      kolomJumlah.forEach((key) => {
        kode4140[key] = toNumber(kode4131[key]) + toNumber(kode4132[key]);
      });
    }
  }
}

// Rumus subtotal untuk kode 4150 Jumlah Pendapatan Dari Penyaluran Dana

export function hitungSubtotal4150(rows) {
  {
    const kode4150 = rows.find((r) => r.kodeAkun === "4150");
    const kode4130 = rows.find((r) => r.kodeAkun === "4130");
    const kode4140 = rows.find((r) => r.kodeAkun === "4140");
    const kode4149 = rows.find((r) => r.kodeAkun === "4149");

    if (kode4150 && kode4130 && kode4140 && kode4149) {
      const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
      kolomJumlah.forEach((key) => {
        kode4150[key] = toNumber(kode4130[key]) + toNumber(kode4140[key]) + toNumber(kode4149[key]);
      });
    }
  }
}

// Rumus subtotal untuk kode 5310 Jumlah Bagi Hasil Untuk Pemilih Dana Investasi

export function hitungSubtotal5310(rows) {
  {
    const kode5310 = rows.find((r) => r.kodeAkun === "5310");
    const kode5301 = rows.find((r) => r.kodeAkun === "5301");
    const kode5302 = rows.find((r) => r.kodeAkun === "5302");

    if (kode5310 && kode5301 && kode5302) {
      const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
      kolomJumlah.forEach((key) => {
        kode5310[key] = toNumber(kode5301[key]) + toNumber(kode5302[key]);
      });
    }
  }
}

// Rumus subtotal untuk kode 4300 Pendapatan setelah distribusi bagi hasil
export function hitungSubtotal4300(rows) {
  {
    const kode4300 = rows.find((r) => r.kodeAkun === "4300");
    const kode4150 = rows.find((r) => r.kodeAkun === "4150");
    const kode5310 = rows.find((r) => r.kodeAkun === "5310");

    if (kode4300 && kode4150 && kode5310) {
      const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
      kolomJumlah.forEach((key) => {
        kode4300[key] = toNumber(kode4150[key]) - toNumber(kode5310[key]);
      });
    }
  }
}

// Rumus subtotal untuk kode 4210 Jumlah Pendapatan Operasional Lainnya
export function hitungSubtotal4210(rows) {
  const kode4210 = rows.find((r) => r.kodeAkun === "4210");
  const kode4071 = rows.find((r) => r.kodeAkun === "4071");
  const kode4073 = rows.find((r) => r.kodeAkun === "4073");
  const kode4074 = rows.find((r) => r.kodeAkun === "4074");
  const kode4084 = rows.find((r) => r.kodeAkun === "4084");
  const kode4092 = rows.find((r) => r.kodeAkun === "4092");
  const kode4093 = rows.find((r) => r.kodeAkun === "4093");
  const kode4094 = rows.find((r) => r.kodeAkun === "4094");
  const kode4199 = rows.find((r) => r.kodeAkun === "4199");

  if (
    kode4210 &&
    kode4071 &&
    kode4073 &&
    kode4074 &&
    kode4084 &&
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
        toNumber(kode4084[key]) +
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
  const kode5341 = rows.find((r) => r.kodeAkun === "5341");
  const kode5342 = rows.find((r) => r.kodeAkun === "5342");
  const kode5343 = rows.find((r) => r.kodeAkun === "5343");
  const kode5344 = rows.find((r) => r.kodeAkun === "5344");
  const kode5345 = rows.find((r) => r.kodeAkun === "5345");
  const kode5346 = rows.find((r) => r.kodeAkun === "5346");
  const kode5347 = rows.find((r) => r.kodeAkun === "5347");
  const kode5348 = rows.find((r) => r.kodeAkun === "5348");
  const kode5349 = rows.find((r) => r.kodeAkun === "5349");
  const kode5311 = rows.find((r) => r.kodeAkun === "5311");
  const kode5313 = rows.find((r) => r.kodeAkun === "5313");
  const kode5320 = rows.find((r) => r.kodeAkun === "5320");
  const kode5321 = rows.find((r) => r.kodeAkun === "5321");
  const kode5322 = rows.find((r) => r.kodeAkun === "5314");
  const kode5399 = rows.find((r) => r.kodeAkun === "5399");
  if (
    kode5401 &&
    kode5341 &&
    kode5342 &&
    kode5343 &&
    kode5344 &&
    kode5345 &&
    kode5346 &&
    kode5347 &&
    kode5348 &&
    kode5349 &&
    kode5311 &&
    kode5313 &&
    kode5320 &&
    kode5321 &&
    kode5322 &&
    kode5399
  ) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode5401[key] =
        toNumber(kode5341[key]) +
        toNumber(kode5342[key]) +
        toNumber(kode5343[key]) +
        toNumber(kode5344[key]) +
        toNumber(kode5345[key]) +
        toNumber(kode5346[key]) +
        toNumber(kode5347[key]) +
        toNumber(kode5348[key]) +
        toNumber(kode5349[key]) +
        toNumber(kode5311[key]) +
        toNumber(kode5313[key]) +
        toNumber(kode5320[key]) +
        toNumber(kode5321[key]) +
        toNumber(kode5322[key]) +
        toNumber(kode5399[key]);
    });
  }
}

// Rumus subtotal untuk kode 4220 Pendapatan Beban Operasional Lain
export function hitungSubtotal4220(rows) {
  {
    const kode4220 = rows.find((r) => r.kodeAkun === "4220");
    const kode4210 = rows.find((r) => r.kodeAkun === "4210");
    const kode5401 = rows.find((r) => r.kodeAkun === "5401");

    if (kode4220 && kode4210 && kode5401) {
      const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
      kolomJumlah.forEach((key) => {
        kode4220[key] = toNumber(kode4210[key]) - toNumber(kode5401[key]);
      });
    }
  }
}

// Rumus subtotal untuk kode 4500 Jumlah Laba Rudi Operasional
export function hitungSubtotal4500(rows) {
  {
    const kode4500 = rows.find((r) => r.kodeAkun === "4500");
    const kode4300 = rows.find((r) => r.kodeAkun === "4300");
    const kode4220 = rows.find((r) => r.kodeAkun === "4220");
    const kode5401 = rows.find((r) => r.kodeAkun === "5401");

    if (kode4500 && kode4300 && kode4220 && kode5401) {
      const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
      kolomJumlah.forEach((key) => {
        kode4500[key] = toNumber(kode4300[key]) + toNumber(kode4220[key]) - toNumber(kode5401[key]);
      });
    }
  }
}

// Rumus subtotal untuk kode 4700 Laba (Rugi) Non Operasional-Bersih

export function hitungSubtotal4700(rows) {
  const kode4700 = rows.find((r) => r.kodeAkun === "4700");
  const kode4502 = rows.find((r) => r.kodeAkun === "4502");
  const kode4501 = rows.find((r) => r.kodeAkun === "4501");
  const kode4599 = rows.find((r) => r.kodeAkun === "4599");
  const kode5422 = rows.find((r) => r.kodeAkun === "5422");
  const kode5421 = rows.find((r) => r.kodeAkun === "5421");
  const kode5499 = rows.find((r) => r.kodeAkun === "5499");

  if (kode4700 && kode4502 && kode4501 && kode4599 && kode5422 && kode5421 && kode5499) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4700[key] =
        toNumber(kode4502[key]) +
        toNumber(kode4501[key]) +
        toNumber(kode4599[key]) -
        toNumber(kode5422[key]) -
        toNumber(kode5421[key]) -
        toNumber(kode5499[key]);
    });
  }
}

// Rumus subtotal untuk kode 4800 Laba (Rugi) Sebelum Pajak

export function hitungSubtotal4800(rows) {
  const kode4800 = rows.find((r) => r.kodeAkun === "4800");
  const kode4300 = rows.find((r) => r.kodeAkun === "4300");
  const kode4210 = rows.find((r) => r.kodeAkun === "4210");
  const kode5401 = rows.find((r) => r.kodeAkun === "5401");
  const kode4700 = rows.find((r) => r.kodeAkun === "4700");

  if (kode4800 && kode4300 && kode4210 && kode5401 && kode4700) {
    const kolomJumlah = ["nilaiKomersial", "nilaiFiskal"];
    kolomJumlah.forEach((key) => {
      kode4800[key] =
        toNumber(kode4300[key]) +
        (toNumber(kode4210[key]) - toNumber(kode5401[key])) +
        toNumber(kode4700[key]);
    });
  }
}
