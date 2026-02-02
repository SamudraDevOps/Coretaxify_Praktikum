import { JENIS_PERUSAHAAN, BAGIAN_LAMPIRAN } from "../../perusahaanConfig";

export class BadanRowBuilder {
  static buildUmumB(pickByKode) {
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

  static buildManufakturB(pickByKode) {
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

  static buildDagangB(pickByKode) {
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

  static buildJasaB(pickByKode) {
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

      ...pickByKode(["1181", "1200", "1401", "1421", "1422", "1423", "1499"]).map((row) => ({
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

      ...pickByKode(["1501", "1521"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1522"]).map((row) => ({
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

  static buildBank_konvensionalB(pickByKode) {
    return [
      // ASET LANCAR
      {
        id: "g-aset",
        type: "header",
        keterangan: "Aset ",
        side: "left",
      },
      ...pickByKode([
        "1101",
        "1105",
        "1106",
        "1155",
        "1152",
        "1153",
        "1154",
        "1157",
        "1156",
        "1141",
        "1271",
      ]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1131"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1600"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1601"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1521"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1522"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1535"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1658"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1561", "1611", "1421", "1698"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1700"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      // liabilitas
      {
        id: "g-liabilitas",
        type: "header",
        keterangan: "Liabilitas",
        side: "right",
      },

      ...pickByKode([
        "2140",
        "2141",
        "2152",
        "2160",
        "2162",
        "2163",
        "2156",
        "2155",
        "2157",
        "2191",
        "2204",
        "2211",
        "2214",
        "2321",
        "2998",
        "2221",
      ]).map((row) => ({
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
  static buildDana_pensiunB(pickByKode) {
    return [
      // ASET LANCAR
      {
        id: "g-aset",
        type: "header",
        keterangan: "Aset ",
        side: "left",
      },
      {
        id: "g-investasi",
        type: "header",
        keterangan: "Investasi (Nilai Historitis) ",
        side: "left",
      },
      ...pickByKode([
        "1201",
        "1202",
        "1203",
        "1204",
        "1223",
        "1225",
        "1241",
        "1242",
        "1243",
        "1244",
        "1251",
        "1252",
        "1253",
        "1254",
        "1255",
        "1256",
        "1260",
        "1272",
        "1281",
        "1282",
        "1283",
      ]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1290"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1300"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),
      ...pickByKode(["1301"]).map((row) => ({
        ...row,
        side: "left",
      })),

      // Aset Lancar Diluar Investasi
      {
        id: "g-aset-lancar-diluar-investasi",
        type: "header",
        keterangan: "Aset Lancar Diluar Investasi",
        side: "left",
      },

      ...pickByKode(["1101"]).map((row) => ({
        ...row,
        side: "left",
      })),

      // Piutang Iuran
      {
        id: "g-piutang-iuran",
        type: "header",
        keterangan: "Piutang Iuran",
        side: "left",
      },

      ...pickByKode(["1193", "1194", "1195"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1111", "1423", "1421", "1121", "1122", "1180"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1500"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      // Aset Operasional
      {
        id: "g-aset-operasional",
        type: "header",
        keterangan: "Aset Operasional",
        side: "left",
      },
      ...pickByKode(["1521"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1522"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1679"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
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

      // liabilitas
      {
        id: "g-liabilitas",
        type: "header",
        keterangan: "Liabilitas",
        side: "right",
      },

      ...pickByKode(["2181"]).map((row) => ({
        ...row,
        side: "right",
      })),

      //  Liabilitas Diluar Liabilitas Manfaat Pensiun

      {
        id: "g-liabilitas-diluar-liabilitas-manfaat-pensiun",
        type: "header",
        keterangan: "Liabilitas Diluar Liabilitas Manfaat Pensiun",
        side: "right",
      },

      ...pickByKode(["2183", "2184", "2185", "2203", "2195", "2322", "2998"]).map((row) => ({
        ...row,
        side: "right",
      })),

      ...pickByKode(["2900", "2999"]).map((row) => ({
        ...row,
        side: "right",
        type: "label",
        variant: "bold",
      })),
    ];
  }

  static buildAsuransiB(pickByKode) {
    return [
      // ASET LANCAR
      {
        id: "g-aset",
        type: "header",
        keterangan: "Aset ",
        side: "left",
      },
      {
        id: "g-investasi",
        type: "header",
        keterangan: "Investasi ",
        side: "left",
      },
      ...pickByKode(["1203", "1204", "1232", "1244", , "1181"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1131"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode([
        "1252",
        "1226",
        "1227",
        "1222",
        "1224",
        "1251",
        "1253",
        "1254",
        "1260",
        "1272",
        "1282",
        "1291",
        "1292",
        "1293",
        "1294",
        "1299",
      ]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1300"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      // Non Investasi
      {
        id: "g-non-investasi",
        type: "header",
        keterangan: "Non Investasi",
        side: "left",
      },

      ...pickByKode(["1101", "1130", "1132", "1191", "1133", "1134", "1121", "1122", "1521"]).map(
        (row) => ({
          ...row,
          side: "left",
        })
      ),

      ...pickByKode(["1522"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1613", "1698"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1700"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      // liabilitas
      {
        id: "g-liabilitas",
        type: "header",
        keterangan: "Liabilitas",
        side: "right",
      },

      ...pickByKode(["2167", "2168", "2165", "2166", "2186", "2191", "2195", "2322", "2194"]).map(
        (row) => ({
          ...row,
          side: "right",
        })
      ),

      // Cadagan Teknsis

      {
        id: "g-cadangan-teknis",
        type: "header",
        keterangan: "Cadangan Teknis",
        side: "right",
      },

      ...pickByKode(["2171", "2172", "2173", "2174", "2361", "2998"]).map((row) => ({
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
  static buildPropertiB(pickByKode) {
    return [
      // ASET LANCAR
      {
        id: "g-aset",
        type: "header",
        keterangan: "Aset ",
        side: "left",
      },
      {
        id: "g-aset-lancar",
        type: "header",
        keterangan: "Aset Lancar",
        side: "left",
      },
      ...pickByKode(["1101", "1211", "1212", "1213", , "1181"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1131"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1214", "1180", "1401", "1421", "1422", "1423", "1499"]).map((row) => ({
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

      ...pickByKode(["1519", "1542", "1551", "1573", "1574", "1611", "1583", "1621", "1521"]).map(
        (row) => ({
          ...row,
          side: "left",
        })
      ),

      ...pickByKode(["1522"]).map((row) => ({
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
      ...pickByKode(["1612"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1658"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1699", "1700"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      // liabilitas
      {
        id: "g-liabilitas",
        type: "header",
        keterangan: "Liabilitas",
        side: "right",
      },

      //  Liabilitas Jangka Pendek

      {
        id: "g-liabilitas-jangka-pendek",
        type: "header",
        keterangan: "Liabilitas Jangka Pendek",
        side: "right",
      },

      ...pickByKode([
        "2201",
        "2121",
        "2194",
        "2203",
        "2192",
        "2195",
        "2191",
        "2186",
        "2187",
        "2151",
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

      // LIABILITAS JANGKA PANJANG

      {
        id: "g-liabilitas-jangka-panjang",
        type: "header",
        keterangan: "Liabilitas Jangka Panjang",
        side: "right",
      },

      ...pickByKode(["2321", "2312", "2322", "2301", "2302", "2306", "2341", "2342", "2998"]).map(
        (row) => ({
          ...row,
          side: "right",
        })
      ),

      ...pickByKode(["2900", "2999"]).map((row) => ({
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

  static buildBank_syariahB(pickByKode) {
    return [
      // ASET LANCAR
      {
        id: "g-aset",
        type: "header",
        keterangan: "Aset ",
        side: "left",
      },
      ...pickByKode([
        "1101",
        "1105",
        "1106",
        "1155",
        "1152",
        "1160",
        "1142",
        "1143",
        "1149",
        "1561",
        "1271",
      ]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1131"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1600"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1601"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1631", "1633", "1634", "1521"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1522"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),
      ...pickByKode(["1535"]).map((row) => ({
        ...row,
        side: "left",
      })),
      ...pickByKode(["1658"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1401", "1611", "1421", "1698"]).map((row) => ({
        ...row,
        side: "left",
      })),

      ...pickByKode(["1700"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      // liabilitas
      {
        id: "g-liabilitas",
        type: "header",
        keterangan: "Liabilitas",
        side: "right",
      },

      ...pickByKode([
        "2141",
        "2142",
        "2162",
        "2161",
        "2156",
        "2204",
        "2205",
        "2211",
        "2214",
        "2314",
        "2998",
        "2221",
      ]).map((row) => ({
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
  static buildInfrastrukturB(pickByKode) {
    return [
      // ASET
      {
        id: "g-aset",
        type: "header",
        keterangan: "Aset ",
        side: "left",
      },

      // ASET LANCAR
      {
        id: "g-aset-lancar",
        type: "header",
        keterangan: "Aset Lancar",
        side: "left",
      },
      ...pickByKode(["1101", "1211", "1212", "1213", "1180", "1181"]).map((row) => ({
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

      // Aset Tidak Lancar

      {
        id: "g-aset-tidak-lancar",
        type: "header",
        keterangan: "Aset Tidak Lancar",
        side: "left",
      },
      ...pickByKode(["1518", "1519", "1551", "1571", "1573", "1574", "1611", "1621", "1521"]).map(
        (row) => ({
          ...row,
          side: "left",
        })
      ),

      ...pickByKode(["1522"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1655"]).map((row) => ({
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

      ...pickByKode(["1699", "1700"]).map((row) => ({
        ...row,
        side: "left",
        type: "label",
        variant: "bold",
      })),

      // liabilitas
      {
        id: "g-liabilitas",
        type: "header",
        keterangan: "Liabilitas",
        side: "right",
      },

      {
        id: "g-liabilitas-jangka-pendek",
        type: "header",
        keterangan: "Liabilitas Jangka Pendek",
        side: "right",
      },

      ...pickByKode([
        "2201",
        "2121",
        "2194",
        "2203",
        "2191",
        "2186",
        "2187",
        "2193",
        "2202",
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

      // LIABILITAS JANGKA PANJANG

      {
        id: "g-liabilitas-jangka-panjang",
        type: "header",
        keterangan: "Liabilitas Jangka Panjang",
        side: "right",
      },

      ...pickByKode([
        "2321",
        "2344",
        "2345",
        "2312",
        "2322",
        "2301",
        "2302",
        "2306",
        "2311",
        "2313",
        "2998",
      ]).map((row) => ({
        ...row,
        side: "right",
      })),

      ...pickByKode(["2900", "2999"]).map((row) => ({
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
}
