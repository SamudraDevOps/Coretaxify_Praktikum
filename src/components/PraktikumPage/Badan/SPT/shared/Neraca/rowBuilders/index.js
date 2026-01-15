import { JENIS_PERUSAHAAN, BAGIAN_LAMPIRAN } from "../../perusahaanConfig";

export class RowBuilder {
  static buildRows(jenisPerusahaan, bagian, pickByKode) {
    // Untuk Neraca, bagian selalu "B"
    const methodName = `build${jenisPerusahaan.charAt(0).toUpperCase() + jenisPerusahaan.slice(1)}`;

    if (typeof this[methodName] === "function") {
      return this[methodName](pickByKode);
    }

    console.warn(
      `Builder Neraca untuk ${jenisPerusahaan} belum diimplementasikan, menggunakan generic builder`
    );
    return this.buildUmum(pickByKode);
  }

  // UMUM
  static buildUmum(pickByKode) {
    return [
      // ASET LANCAR
      {
        id: "g-aset-lancar",
        type: "header",
        keterangan: "Aset Lancar",
        side: "left",
      },
      ...pickByKode(["1101", "1122", "1123", "1124", "1125"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1131"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1181", "1200", "1401", "1421", "1423", "1405", "1422", "1499"]).map(
        (row) => ({
          ...row,
          side: "left",
        })
      ),

      // ASET TIDAK LANCAR
      {
        id: "g-aset-tidak-lancar",
        type: "header",
        keterangan: "Aset Tidak Lancar",
        side: "left",
      },

      ...pickByKode(["1501", "1520", "1523"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1524"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1529"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1530"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1531", "1533"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1534"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1551", "1599", "1600"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1601"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1611", "1651"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1658"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1698"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1700"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      // liabilitas Jangka pendek
      {
        id: "g-liabilitas-jangka-pendek",
        type: "header",
        keterangan: "Liabilitas Jangka Pendek",
        side: "right",
      },

      ...pickByKode([
        "2102",
        "2103",
        "2111",
        "2186",
        "2187",
        "2191",
        "2192",
        "2195",
        "2201",
        "2202",
        "2203",
        "2228",
      ]).map((row) => ({
        ...row,
        side: "right",
      })),

      // liabilitas Jangka Panjang
      {
        id: "g-liabilitas-jangka-panjang",
        type: "header",
        keterangan: "Liabilitas Jangka Panjang",
        side: "right",
      },

      ...pickByKode(["2301", "2303", "2304", "2312", "2322", "2321", "2998"]).map((row) => ({
        ...row,
        side: "right",
      })),

      ...pickByKode(["2999"]).map((row) => ({
        ...row,
        side: "right",
        type: "label",
        variant: "bold",
      })),

      // EKUITAS
      {
        id: "g-ekuitas",
        type: "header",
        keterangan: "Ekuitas",
        side: "right",
      },

      ...pickByKode(["3102", "3120", "3200", "3297", "3298"]).map((row) => ({
        ...row,
        side: "right",
      })),

      ...pickByKode(["3299", "3300"]).map((row) => ({
        ...row,
        side: "right",
        type: "label",
        variant: "bold",
      })),
    ];
  }

  static buildManufaktur(pickByKode) {
    return [
      // ASET LANCAR
      {
        id: "g-aset-lancar",
        type: "header",
        keterangan: "Aset Lancar",
        side: "left",
      },
      ...pickByKode(["1101", "1122", "1123", "1124", "1125"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1131"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode([
        "1181",
        "1200",
        "1402",
        "1403",
        "1404",
        "1405",
        "1421",
        "1422",
        "1423",
        "1499",
      ]).map((row) => ({
        ...row,
        side: "left",
      })),

      // ASET TIDAK LANCAR
      {
        id: "g-aset-tidak-lancar",
        type: "header",
        keterangan: "Aset Tidak Lancar",
        side: "left",
      },

      ...pickByKode(["1501", "1520", "1523"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1524"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1525"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1526"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1527"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1528"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1529"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1530"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1533"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1534"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1551", "1599", "1600"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1601"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1611", "1651"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1658"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1698"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1700"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      // liabilitas Jangka pendek
      {
        id: "g-liabilitas-jangka-pendek",
        type: "header",
        keterangan: "Liabilitas Jangka Pendek",
        side: "right",
      },

      ...pickByKode([
        "2102",
        "2103",
        "2111",
        "2186",
        "2187",
        "2191",
        "2192",
        "2195",
        "2201",
        "2202",
        "2203",
        "2228",
      ]).map((row) => ({
        ...row,
        side: "right",
      })),

      // liabilitas Jangka Panjang
      {
        id: "g-liabilitas-jangka-panjang",
        type: "header",
        keterangan: "Liabilitas Jangka Panjang",
        side: "right",
      },

      ...pickByKode(["2301", "2303", "2304", "2312", "2321", "2322", "2998"]).map((row) => ({
        ...row,
        side: "right",
      })),

      ...pickByKode(["2999"]).map((row) => ({
        ...row,
        side: "right",
        type: "label",
        variant: "bold",
      })),

      // EKUITAS
      {
        id: "g-ekuitas",
        type: "header",
        keterangan: "Ekuitas",
        side: "right",
      },

      ...pickByKode(["3102", "3120", "3200", "3297", "3298"]).map((row) => ({
        ...row,
        side: "right",
      })),

      ...pickByKode(["3299", "3300"]).map((row) => ({
        ...row,
        side: "right",
        type: "label",
        variant: "bold",
      })),
    ];
  }

  // DAGANG
  static buildDagang(pickByKode) {
    return [
      // ASET LANCAR
      {
        id: "g-aset-lancar",
        type: "header",
        keterangan: "Aset Lancar",
        side: "left",
      },
      ...pickByKode(["1101", "1200", "1122", "1123", "1124", "1125", "1181"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1131"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1401", "1423", "1422", "1499"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1500"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      // ASET TIDAK LANCAR
      {
        id: "g-aset-tidak-lancar",
        type: "header",
        keterangan: "Aset Tidak Lancar",
        side: "left",
      },

      ...pickByKode(["1501", "1520", "1523"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1524"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1529"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1530"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1533"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1534"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1551", "1599", "1600"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1601"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1611", "1651"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1658"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1698"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1699"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      ...pickByKode(["1700"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      // liabilitas Jangka pendek
      {
        id: "g-liabilitas-jangka-pendek",
        type: "header",
        keterangan: "Liabilitas Jangka Pendek",
        side: "right",
      },

      ...pickByKode([
        "2102",
        "2103",
        "2111",
        "2191",
        "2186",
        "2187",
        "2192",
        "2195",
        "2201",
        "2202",
        "2203",
        "2228",
      ]).map((row) => ({
        ...row,
        side: "right",
      })),

      ...pickByKode(["2229"]).map((row) => ({
        ...row,
        side: "right",
        type: "label",
        variant: "bold",
      })),

      // liabilitas Jangka Panjang
      {
        id: "g-liabilitas-jangka-panjang",
        type: "header",
        keterangan: "Liabilitas Jangka Panjang",
        side: "right",
      },

      ...pickByKode(["2301", "2303", "2304", "2312", "2322", "2321", "2998"]).map((row) => ({
        ...row,
        side: "right",
      })),

      ...pickByKode(["2999"]).map((row) => ({
        ...row,
        side: "right",
        type: "label",
        variant: "bold",
      })),

      // EKUITAS
      {
        id: "g-ekuitas",
        type: "header",
        keterangan: "Ekuitas",
        side: "right",
      },

      ...pickByKode(["3102", "3120", "3200", "3297", "3298"]).map((row) => ({
        ...row,
        side: "right",
      })),

      ...pickByKode(["3299", "3300"]).map((row) => ({
        ...row,
        side: "right",
        type: "label",
        variant: "bold",
      })),
    ];
  }

  // JASA
  static buildJasa(pickByKode) {
    return this.buildUmum(pickByKode);
  }
}
