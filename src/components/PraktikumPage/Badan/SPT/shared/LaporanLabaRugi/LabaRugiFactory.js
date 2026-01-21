import { PERUSAHAAN_CONFIG, KODE_KOREKSI_OPTIONS } from "../perusahaanConfig";
import { MASTER_AKUN_LAPORAN_LABA_RUGI, createLineRow } from "../akunListLabaRugi";
import { RowBuilder } from "./rowBuilders";
import { calculations } from "../calculations";

export class LabaRugiFactory {
  static createComponent(jenisPerusahaan, bagian = "A", kategoriEntitas = "badan") {
    const config = PERUSAHAAN_CONFIG[jenisPerusahaan];
    if (!config) {
      throw new Error(`Konfigurasi untuk jenis perusahaan '${jenisPerusahaan}' tidak ditemukan`);
    }

    const lineRows = this.generateLineRows(config.akunKonteksLabaRugi);
    const pickByKode = this.createPickByKode(lineRows);
    const initialRows = RowBuilder.buildRows(jenisPerusahaan, bagian, pickByKode, kategoriEntitas);

    return {
      initialRows,
      config,
      bagian,
      kategoriEntitas,
      kodeKoreksiOptions: KODE_KOREKSI_OPTIONS,
    };
  }

  static generateLineRows(akunKonteksLabaRugi) {
    const lineRows = [];

    Object.entries(akunKonteksLabaRugi).forEach(([kodeAkun, jenisAktif]) => {
      const kandidat = MASTER_AKUN_LAPORAN_LABA_RUGI.filter((a) => a.kodeAkun === kodeAkun);

      if (!kandidat.length) {
        console.log(`Tidak ditemukan akun dengan kode ${kodeAkun}`);
        return;
      }

      const cocok = kandidat.find(
        (a) =>
          Array.isArray(a.jenisPerusahaan) &&
          a.jenisPerusahaan.some((jp) => jenisAktif.includes(jp))
      );

      if (!cocok) {
        console.error(
          `Tidak ditemukan akun untuk kode ${kodeAkun} dengan jenis perusahaan: ${jenisAktif.join(
            ", "
          )}`
        );
        return;
      }

      lineRows.push(createLineRow(cocok, 0));
    });

    // Validasi tidak boleh ada ID duplikat dalam lineRows
    const ids = lineRows.map((r) => r.id);
    if (new Set(ids).size !== ids.length) {
      throw new Error("Duplicate akun id dalam satu form Laba Rugi");
    }

    return lineRows;
  }

  static createPickByKode(lineRows) {
    return (kodes) => {
      return kodes.map((kode) => lineRows.find((r) => r.kodeAkun === kode)).filter(Boolean);
    };
  }

  // static getSubtotalCalculations(jenisPerusahaan, bagian, kategoriEntitas = "badan") {
  //   // Ambil calculation sesuai jenis perusahaan
  //   const calculationSource = calculations[jenisPerusahaan];
  //   if (!calculationSource) throw new Error("Calculation source not found for Laba Rugi");

  //   // Misal: calculationSource.calculate(rows, bagian)
  //   return calculationSource;
  // }

  static getSubtotalCalculations(jenisPerusahaan, bagian, kategoriEntitas = "badan") {
    const config = PERUSAHAAN_CONFIG[jenisPerusahaan];
    if (!config || !config.subtotalCalculations) {
      console.warn(`Config tidak ditemukan untuk ${jenisPerusahaan}`);
      return [];
    }

    // AMBIL calculation names berdasarkan kategoriEntitas
    const calculationsByKategori = config.subtotalCalculations[kategoriEntitas];

    console.log("[LabaRugiFactory] calculationsByKategori:", calculationsByKategori);
    console.log("[LabaRugiFactory] bagian:", bagian);
    console.log(
      "[LabaRugiFactory] calculationsByKategori[bagian]:",
      calculationsByKategori?.[bagian]
    );

    if (!calculationsByKategori) {
      console.error(`[LabaRugiFactory] Tidak ada config untuk kategoriEntitas: ${kategoriEntitas}`);
      return [];
    }

    const calculationNames = calculationsByKategori?.[bagian] || [];
    console.log(
      `[LabaRugiFactory] Using calculations for ${jenisPerusahaan} - ${kategoriEntitas} - Bagian ${bagian}:`,
      calculationNames
    );

    const calculationSource =
      kategoriEntitas === "orang_pribadi"
        ? calculations.orang_pribadi?.labaRugi?.[jenisPerusahaan]
        : calculations.badan?.labaRugi?.[jenisPerusahaan];

    if (!calculationSource) {
      console.error(
        `[LabaRugiFactory] Calculation source tidak ditemukan untuk ${jenisPerusahaan} - ${kategoriEntitas}`
      );
      return [];
    }

    console.log(
      `[LabaRugiFactory] Using calculations for ${jenisPerusahaan} - ${kategoriEntitas} - Bagian ${bagian}:`,
      calculationNames
    );

    return calculationNames
      .map((calcName) => {
        const calcFunction = calculationSource[calcName];
        if (!calcFunction) {
          console.warn(
            `[LabaRugiFactory] Function '${calcName}' tidak ditemukan untuk ${jenisPerusahaan} - ${kategoriEntitas}`
          );
        }
        return calcFunction;
      })
      .filter(Boolean);
  }

  static getFieldConfig(jenisPerusahaan, selectedRow, kodeKoreksiOptions) {
    const config = PERUSAHAAN_CONFIG[jenisPerusahaan];

    return {
      kodeKoreksiOptions,
      editableTidakFinal: [],
      editableNilaiFiskal: [],
      readOnlyFields: config?.readOnlyFields || {},
    };
  }
}
