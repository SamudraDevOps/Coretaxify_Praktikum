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
        id: "h-aset-lancar",
        type: "header",
        level: 0,
        keterangan: "Aset Lancar",
        side: "left",
        nilai: 0,
      },
      ...pickByKode(["1101", "1122", "1499"]).map((row) => ({
        ...row,
        side: "right",
      })),

      // ASET TIDAK LANCAR
      {
        id: "h-aset-tidak-lancar",
        type: "header",
        level: 0,
        kodeAkun: "",
        keterangan: "Aset Tidak Lancar",
        nilai: 0,
      },
      ...pickByKode(["1501"]).map((row) => ({
        ...row,
        side: "left",
        level: 2,
      })),

      ...pickByKode(["1523"]).map((row) => ({
        ...row,
        type: "label",
        variant: "bold",
        side: "left",
      })),

      ...pickByKode(["1123"]).map((row) => ({
        ...row,
        side: "left",
      })),
    ];
    s;
  }

  // MANUFAKTUR (bisa sama dengan UMUM atau customize)
  static buildManufaktur(pickByKode) {
    return this.buildUmum(pickByKode);
  }

  // DAGANG
  static buildDagang(pickByKode) {
    return this.buildUmum(pickByKode);
  }

  // JASA
  static buildJasa(pickByKode) {
    return this.buildUmum(pickByKode);
  }
}
