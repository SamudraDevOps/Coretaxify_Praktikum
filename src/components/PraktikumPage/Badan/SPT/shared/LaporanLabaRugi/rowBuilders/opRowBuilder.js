export class OPRowBuilder {
  // UMUM Bagian A - ORANG PRIBADI
  static buildUmumA(pickByKode) {
    return [
      { id: "g-penjualan", type: "header", level: 0, keterangan: "Penjualan" },
      ...pickByKode(["4003"]),
      ...pickByKode(["4004"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
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
      ...pickByKode(["4300"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
      ...pickByKode(["4199"]),
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
      ...pickByKode(["4500"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
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
      ...pickByKode(["4700", "4800"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
    ];
  }

  // MANUFAKTUR Bagian A - ORANG PRIBADI
  static buildManufakturA(pickByKode) {
    return [
      { id: "g-penjualan", type: "header", level: 0, keterangan: "Penjualan" },
      ...pickByKode(["4003"]), // ⭐ OP HANYA 4003
      ...pickByKode(["4004"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
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
      // Sisa sama seperti Badan
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
      ...pickByKode(["5021"]).map((row) => ({ ...row, level: 1 })),
      ...pickByKode(["5022"]).map((row) => ({ ...row, level: 2 })),
      ...pickByKode(["5029"]).map((row) => ({ ...row, level: 2 })),
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
      ...pickByKode(["5032"]).map((row) => ({ ...row, level: 1 })),
      ...pickByKode(["5040"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
      ...pickByKode(["5050"]),
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

  // DAGANG Bagian A - ORANG PRIBADI
  static buildDagangA(pickByKode) {
    return [
      { id: "g-penjualan", type: "header", level: 0, keterangan: "Penjualan" },
      ...pickByKode(["4002", "4003"]),
      ...pickByKode(["4004"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
      {
        id: "label-dikurangi",
        type: "label",
        level: 0,
        keterangan: "Dikurangi :",
        variant: "bold",
        derived: true,
      },
      ...pickByKode(["4011", "4012"]).map((row) => ({
        ...row,
        level: 1,
      })),
      ...pickByKode(["4020"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
      {
        id: "g-harga-pokok-penjualan",
        type: "header",
        level: 0,
        keterangan: "Harga Pokok Penjualan",
      },
      ...pickByKode(["5001", "5008"]),

      ...pickByKode(["5009"]).map((row) => ({
        ...row,
        level: 1,
      })),
      ...pickByKode(["5020"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
      ...pickByKode(["4300"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),

      ...pickByKode([
        "5311",
        "5313",
        "5314",
        "5315",
        "5316",
        "5317",
        "5318",
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

      ...pickByKode(["4800"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
    ];
  }

  // JASA Bagian A - ORANG PRIBADI (sama seperti Badan)
  static buildJasaA(pickByKode) {
    return [
      {
        id: "g-pendapatan-usaha",
        type: "header",
        level: 0,
        keterangan: "Pendapatan Usaha",
      },
      ...pickByKode(["4021"]),
      ...pickByKode(["4013"]).map((row) => ({ ...row, level: 1 })),
      ...pickByKode(["5020"]),
      ...pickByKode(["4300"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
      ...pickByKode(["4199"]),
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
      ...pickByKode(["4500"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
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
      ...pickByKode(["4700", "4800"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        derived: true,
      })),
    ];
  }
}
