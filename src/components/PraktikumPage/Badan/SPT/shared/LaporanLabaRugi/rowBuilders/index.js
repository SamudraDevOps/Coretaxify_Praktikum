import { JENIS_PERUSAHAAN, BAGIAN_LAMPIRAN } from "../perusahaanConfig";

export class RowBuilder {
  static buildRows(jenisPerusahaan, bagian, pickByKode) {
    const methodName = `build${
      jenisPerusahaan.charAt(0).toUpperCase() + jenisPerusahaan.slice(1)
    }${bagian}`;

    if (typeof this[methodName] === "function") {
      return this[methodName](pickByKode);
    }

    // Fallback untuk jenis perusahaan yang belum ada builder-nya
    console.warn(
      `Builder untuk ${jenisPerusahaan} bagian ${bagian} belum diimplementasikan, menggunakan generic builder`
    );
    return this.buildGeneric(pickByKode, jenisPerusahaan);
  }

  // UMUM Bagian A
  static buildUmumA(pickByKode) {
    return [
      // GROUP PENJUALAN
      { id: "g-penjualan", type: "header", level: 0, keterangan: "Penjualan" },
      ...pickByKode(["4002", "4003"]),
      ...pickByKode(["4004"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
      })),

      // DIKURANGI
      {
        id: "label-dikurangi",
        type: "label",
        level: 0,
        keterangan: "Dikurangi :",
        variant: "bold",
      },
      ...pickByKode(["4011", "4012", "4013"]).map((row) => ({
        ...row,
        level: 1,
      })),
      ...pickByKode(["4020"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
      })),

      // GROUP Harga Pokok Penjualan
      {
        id: "g-harga-pokok-penjualan",
        type: "header",
        level: 0,
        keterangan: "Harga Pokok Penjualan",
      },
      ...pickByKode(["5001", "5003", "5007", "5008", "5009"]),
      ...pickByKode(["5020"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
      })),

      // Laba Kotor
      ...pickByKode(["4300"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
      })),

      ...pickByKode(["4199"]),

      // GROUP Beban Usaha
      {
        id: "g-beban-usaha",
        type: "header",
        level: 0,
        keterangan: "Beban Usaha",
      },
      ...pickByKode([
        "5311",
        "5312",
        "5313",
        "5314",
        "5315",
        "5316",
        "5317",
        "5318",
        "5319",
        "5320",
        "5321",
        "5322",
        "5399",
      ]),
      ...pickByKode(["5400"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
      })),

      // Laba Rugi Usaha
      ...pickByKode(["4500"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
      })),

      // Pendapatan Non Usaha
      {
        id: "g-pendapatan-non-usaha",
        type: "header",
        level: 0,
        keterangan: "Pendapatan Non Usaha",
      },
      ...pickByKode(["4501", "4503", "4511", "4599"]),
      ...pickByKode(["4600"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
      })),

      // Beban Non Usaha
      {
        id: "g-beban-non-usaha",
        type: "header",
        level: 0,
        keterangan: "Beban Non Usaha",
      },
      ...pickByKode(["5405", "5409", "5421", "5499"]),
      ...pickByKode(["5500"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
      })),

      // Total
      ...pickByKode(["4700", "4800"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
      })),
    ];
  }

  // MANUFAKTUR Bagian A
  static buildManufakturA(pickByKode) {
    return [
      // GROUP PENJUALAN
      { id: "g-penjualan", type: "header", level: 0, keterangan: "Penjualan" },
      ...pickByKode(["4002", "4003"]),
      ...pickByKode(["4004"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // DIKURANGI
      {
        id: "label-dikurangi",
        type: "label",
        derived: true,

        level: 0,
        keterangan: "Dikurangi :",
        variant: "bold",
      },
      ...pickByKode(["4011", "4012", "4013"]).map((row) => ({
        ...row,
        level: 1,
      })),
      ...pickByKode(["4020"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // GROUP Harga Pokok Produksi
      {
        id: "g-harga-pokok-produksi",
        type: "header",
        level: 0,
        keterangan: "Harga Pokok Produksi",
      },
      {
        id: "g-biaya-bahan-baku",
        type: "header",
        level: 0,
        keterangan: "Biaya Bahan Baku",
      },

      ...pickByKode(["5021"]).map((row) => ({
        ...row,
        level: 1,
      })),
      ...pickByKode(["5022"]).map((row) => ({
        ...row,
        level: 2,
      })),
      ...pickByKode(["5029"]).map((row) => ({
        ...row,
        level: 2,
      })),
      ...pickByKode(["5030"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        level: 1,
        derived: true,
      })),
      ...pickByKode(["5031"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        level: 1,
        derived: true,
      })),
      ...pickByKode(["5032"]).map((row) => ({
        ...row,
        level: 1,
      })),
      ...pickByKode(["5040"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
      ...pickByKode(["5050"]),

      // GROUP Biaya Pabrikasi
      {
        id: "g-biaya-pabrikasi",
        type: "header",
        level: 0,
        keterangan: "Biaya Pabrikasi",
      },
      ...pickByKode(["5051", "5052", "5058", "5059", "5069"]).map((row) => ({
        ...row,
        level: 1,
      })),
      ...pickByKode(["5070", "5080"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
      ...pickByKode(["5090", "5099"]),
      ...pickByKode(["5100"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
      ...pickByKode(["5008", "5009"]),
      ...pickByKode(["5020", "4300"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
      ...pickByKode(["4199"]),

      // GROUP Beban Usaha
      {
        id: "g-beban-usaha",
        type: "header",
        level: 0,
        keterangan: "Beban Usaha",
      },
      ...pickByKode([
        "5311",
        "5312",
        "5313",
        "5314",
        "5315",
        "5316",
        "5317",
        "5318",
        "5319",
        "5320",
        "5321",
        "5322",
        "5399",
      ]),
      ...pickByKode(["5400"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,

        level: 1,
      })),
      ...pickByKode(["4500"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Pendapatan Non Usaha
      {
        id: "g-pendapatan-non-usaha",
        type: "header",
        level: 0,
        keterangan: "Pendapatan Non Usaha",
      },
      ...pickByKode(["4501", "4503", "4511", "4599"]),
      ...pickByKode(["4600"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Beban Non Usaha
      {
        id: "g-beban-non-usaha",
        type: "header",
        level: 0,
        keterangan: "Beban Non Usaha",
      },
      ...pickByKode(["5405", "5409", "5421", "5499"]),
      ...pickByKode(["5500"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        level: 1,
        derived: true,
      })),
      ...pickByKode(["4700", "4800"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
    ];
  }

  //  Dagang Bagian A
  static buildDagangA(pickByKode) {
    return [
      // GROUP PENJUALAN
      { id: "g-penjualan", type: "header", level: 0, keterangan: "Penjualan" },
      ...pickByKode(["4002", "4003"]),
      ...pickByKode(["4004"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // DIKURANGI
      {
        id: "label-dikurangi",
        type: "label",
        level: 0,
        keterangan: "Dikurangi :",
        variant: "bold",
        derived: true,
      },
      ...pickByKode(["4011", "4012", "4013"]).map((row) => ({
        ...row,
        level: 1,
      })),
      ...pickByKode(["4020"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // GROUP Harga Pokok Penjualan
      {
        id: "g-harga-pokok-penjualan",
        type: "header",
        level: 0,
        keterangan: "Harga Pokok Penjualan",
      },
      ...pickByKode(["5001", "5003", "5007", "5008", "5009"]),
      ...pickByKode(["5020"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Laba Kotor
      ...pickByKode(["4300"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      ...pickByKode(["4199"]),

      // GROUP Beban Usaha
      {
        id: "g-beban-usaha",
        type: "header",
        level: 0,
        keterangan: "Beban Usaha",
      },
      ...pickByKode([
        "5311",
        "5312",
        "5313",
        "5314",
        "5315",
        "5316",
        "5317",
        "5318",
        "5319",
        "5320",
        "5321",
        "5322",
        "5399",
      ]),
      ...pickByKode(["5400"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Laba Rugi Usaha
      ...pickByKode(["4500"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Pendapatan Non Usaha
      {
        id: "g-pendapatan-non-usaha",
        type: "header",
        level: 0,
        keterangan: "Pendapatan Non Usaha",
      },
      ...pickByKode(["4501", "4503", "4511", "4599"]),
      ...pickByKode(["4600"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Beban Non Usaha
      {
        id: "g-beban-non-usaha",
        type: "header",
        level: 0,
        keterangan: "Beban Non Usaha",
      },
      ...pickByKode(["5405", "5409", "5421", "5499"]),
      ...pickByKode(["5500"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Total
      ...pickByKode(["4700", "4800"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
    ];
  }

  // JASA Bagian A
  static buildJasaA(pickByKode) {
    return [
      // Pendapatan Usaha
      {
        id: "g-pendapatan-usaha",
        type: "header",
        level: 0,
        keterangan: "Pendapatan Usaha",
      },
      ...pickByKode(["4021"]),

      ...pickByKode(["4013"]).map((row) => ({
        ...row,
        level: 1,
      })),

      ...pickByKode(["5020"]),

      // Laba Kotor
      ...pickByKode(["4300"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      ...pickByKode(["4199"]),

      // Beban Usaha
      {
        id: "g-beban-usaha",
        type: "header",
        level: 0,
        keterangan: "Beban Usaha",
      },
      ...pickByKode([
        "5311",
        "5312",
        "5313",
        "5314",
        "5315",
        "5316",
        "5317",
        "5318",
        "5319",
        "5320",
        "5321",
        "5399",
      ]),
      ...pickByKode(["5400"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Laba Rugi Usaha
      ...pickByKode(["4500"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Pendapatan Non Usaha
      {
        id: "g-pendapatan-non-usaha",
        type: "header",
        level: 0,
        keterangan: "Pendapatan Non Usaha",
      },
      ...pickByKode(["4501", "4503", "4511", "4599"]),
      ...pickByKode(["4600"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Beban Non Usaha
      {
        id: "g-beban-non-usaha",
        type: "header",
        level: 0,
        keterangan: "Beban Non Usaha",
      },
      ...pickByKode(["5405", "5409", "5421", "5499"]),
      ...pickByKode(["5500"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Total
      ...pickByKode(["4700", "4800"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
    ];
  }

  // BANK KONVENSIONAL Bagian A

  static buildBank_konvensionalA(pickByKode) {
    return [
      // Pendapatan Bunga
      {
        id: "g-pendapatan-bunga",
        type: "header",
        level: 0,
        keterangan: "Pendapatan Bunga",
      },
      ...pickByKode(["4027", "4028"]),

      // Beban Bunga
      {
        id: "g-beban-bunga",
        type: "header",
        level: 0,
        keterangan: "Beban Bunga",
      },

      ...pickByKode(["4031", "4033"]),

      // Pendapatan (Beban) Bunga bersih

      ...pickByKode(["4040"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Pendapatan Operasional Lain
      {
        id: "g-pendapatan-operasional-lain",
        type: "header",
        level: 0,
        keterangan: "Pendapatan Operasional Lain",
      },

      ...pickByKode(["4071", "4072", "4073", "4074", "4091", "4092", "4093", "4094", "4199"]),

      // Jumlah Pendapatan Operasional Lain

      ...pickByKode(["4210"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Beban Operasional Lain
      {
        id: "g-beban-operasional-lain",
        type: "header",
        level: 0,
        keterangan: "Beban Operasional Lain",
      },

      ...pickByKode([
        "5350",
        "5351",
        "5352",
        "5353",
        "5354",
        "5346",
        "5356",
        "5348",
        "5358",
        "5311",
        "5312",
        "5313",
        "5314",
        "5315",
        "5316",
        "5317",
        "5318",
        "5319",
        "5320",
        "5321",
        "5322",
        "5399",
      ]).map((row) => ({
        ...row,
        level: 1,
      })),

      // Total Beban Operasional Lain

      ...pickByKode(["5401"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        level: 1,
        derived: true,
      })),

      // Laba Rugi Operasional Lain-bersih

      ...pickByKode(["4400"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      ...pickByKode(["4600"]),

      ...pickByKode(["5500"]).map((row) => ({
        ...row,
        level: 1,
      })),

      // Laba Rugi non Operasional Bersih
      ...pickByKode(["4700", "4800"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
    ];
  }

  // DANA PENSIUN Bagian A

  static buildDana_pensiunA(pickByKode) {
    return [
      // Pendapatan Dana Pensiun
      {
        id: "g-pendapatan-bunga",
        type: "header",
        level: 0,
        keterangan: "Pendapatan Bunga",
      },
      ...pickByKode(["4026", "4091", "4101", "4106", "4118"]),

      ...pickByKode(["4120"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Beban Invenstasi
      {
        id: "g-beban-investasi",
        type: "header",
        level: 0,
        keterangan: "Beban Investasi",
      },

      ...pickByKode(["5201", "5202", "5203", "5204", "5205", "5299"]).map((row) => ({
        ...row,
        level: 1,
      })),

      ...pickByKode(["5300", "4300"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Beban Operasional
      {
        id: "g-beban-operasional",
        type: "header",
        level: 0,
        keterangan: "Beban Operasional",
      },

      ...pickByKode([
        "5311",
        "5312",
        "5323",
        "5326",
        "5314",
        "5316",
        "5317",
        "5318",
        "5320",
        "5399",
      ]).map((row) => ({
        ...row,
        level: 1,
      })),

      ...pickByKode(["5400"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Laba Rugi non Operasional
      {
        id: "g-laba-rugi-nono-operasional",
        type: "header",
        level: 0,
        keterangan: "Laba (Rugi) non Operasional",
      },
      ...pickByKode(["4512", "4513", "4514", "4599", "5499"]),

      ...pickByKode(["4700", "4800"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
    ];
  }

  static buildAsuransiA(pickByKode) {
    return [
      ...pickByKode(["4041"]),

      ...pickByKode(["4045", "4047", "4051"]).map((row) => ({
        ...row,
        level: 1,
      })),

      ...pickByKode(["4060"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      ...pickByKode(["4171"]),

      ...pickByKode(["4200"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      // Beban Underwriting

      {
        id: "g-beban-underwriting",
        type: "header",
        level: 0,
        keterangan: "Beban Underwriting",
      },

      ...pickByKode(["5101", "5102", "5103", "5109"]).map((row) => ({
        ...row,
        level: 1,
      })),
      ...pickByKode(["5200"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
        level: 1,
      })),

      ...pickByKode(["4300"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      ...pickByKode(["4120", "4199"]),

      // Beban Operasional

      {
        id: "g-beban-operasional",
        type: "header",
        level: 0,
        keterangan: "Beban Operasional",
      },

      ...pickByKode([
        "5311",
        "5312",
        "5313",
        "5314",
        "5315",
        "5316",
        "5317",
        "5318",
        "5319",
        "5320",
        "5321",
        "5399",
      ]).map((row) => ({
        ...row,
        level: 1,
      })),

      ...pickByKode(["5400"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
        level: 1,
      })),

      ...pickByKode(["4600"]),

      ...pickByKode(["5500"]).map((row) => ({
        ...row,
        level: 1,
      })),

      ...pickByKode(["4700", "4800"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
    ];
  }

  // TODO: Tambahkan builder untuk BagianB dan BagianC
  static buildManufakturB(pickByKode) {
    // Logic khusus untuk Bagian B manufaktur (untuk Laporan Posisi Keuangan)
    return [];
  }

  static buildManufakturC(pickByKode) {
    // Logic khusus untuk Bagian C manufaktur
    return [];
  }

  static buildUmumB(pickByKode) {
    // Logic khusus untuk Bagian B umum (untuk Laporan Posisi Keuangan)
    return [];
  }

  static buildUmumC(pickByKode) {
    // Logic khusus untuk Bagian C umum
    return [];
  }

  static buildJasaB(pickByKode) {
    // Logic khusus untuk Bagian B jasa
    return [];
  }

  static buildJasaC(pickByKode) {
    // Logic khusus untuk Bagian C jasa
    return [];
  }
}
