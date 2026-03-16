export class OPRowBuilder {
  static buildUmumB(pickByKode) {
    return [
      {
        id: "g-aset-lancar",
        type: "header",
        keterangan: "Aset Lancar",
        side: "left",
      },
      ...pickByKode(["1101", "1122", "1123", "1124", "1125"]).map((row) => ({
        ...row,
        side: "right",
      })),

      ...pickByKode(["1131"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      // AKTIVA TETAP
      {
        id: "label-aktiva-tetap",
        type: "label",
        keterangan: "Aktiva Tetap",
        variant: "bold",
      },
      ...pickByKode(["1201", "1202", "1203", "1204"]),

      // HEADER PASIVA
      {
        id: "header-pasiva",
        type: "header",
        keterangan: "PASIVA",
      },

      // KEWAJIBAN
      {
        id: "label-kewajiban",
        type: "label",
        keterangan: "Kewajiban",
        variant: "bold",
      },
      ...pickByKode(["2101", "2102", "2103"]),

      // MODAL (OP: Tidak ada Modal Saham, hanya Modal Pemilik)
      {
        id: "label-modal",
        type: "label",
        keterangan: "Modal",
        variant: "bold",
      },
      ...pickByKode(["3103"]),
    ];
  }

  static buildManufakturB(pickByKode) {
    return this.buildUmumB(pickByKode);
  }

  static buildDagangB(pickByKode) {
    return [
      // ASET LANCAR
      {
        id: "g-aset-lancar",
        type: "header",
        keterangan: "Aset Lancar",
        side: "left",
      },
      ...pickByKode(["1101", "1200", "1122", "1123", "1124", "1125"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1131"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1401", "1421", "1422", "1423", "1499"]).map((row) => ({
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
      ...pickByKode(["1501", "1523"]).map((row) => ({
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

      ...pickByKode(["1541", "1599", "1600"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1611"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1698"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1699", "1700"]).map((row) => ({
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
        "2192",
        "2196",
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

      ...pickByKode(["2301", "2303", "2304", "2321", "2998"]).map((row) => ({
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

      ...pickByKode(["3102", "3120", "3200", "3298"]).map((row) => ({
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

  static buildJasaB(pickByKode) {
    return this.buildUmumB(pickByKode);
  }
}
