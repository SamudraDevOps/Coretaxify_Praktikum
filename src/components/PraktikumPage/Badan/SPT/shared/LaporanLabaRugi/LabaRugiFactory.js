import { PERUSAHAAN_CONFIG, KODE_KOREKSI_OPTIONS } from "../perusahaanConfig";
import { MASTER_AKUN_LAPORAN_LABA_RUGI, createLineRow } from "../akunListLabaRugi";
import { RowBuilder } from "./rowBuilders";

// Mengabil seluruh export king dengan menggunakan import * as
import * as calculations from "./calculations";

export class LabaRugiFactory {
  static createComponent(jenisPerusahaan, bagian = "A") {
    const config = PERUSAHAAN_CONFIG[jenisPerusahaan];
    if (!config) {
      throw new Error(`Konfigurasi untuk jenis perusahaan '${jenisPerusahaan}' tidak ditemukan`);
    }

    const lineRows = this.generateLineRows(config.akunKonteksLabaRugi);
    const pickByKode = this.createPickByKode(lineRows);
    const initialRows = RowBuilder.buildRows(jenisPerusahaan, bagian, pickByKode);

    return {
      initialRows,
      config,
      bagian,
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

  static getSubtotalCalculations(jenisPerusahaan, bagian) {
    const config = PERUSAHAAN_CONFIG[jenisPerusahaan];
    if (!config || !config.subtotalCalculations) {
      console.warn(`Config tidak ditemukan untuk ${jenisPerusahaan}`);
      return [];
    }

    const calculationNames = config.subtotalCalculations[bagian] || [];
    const calculationSource = calculations[jenisPerusahaan];

    if (!calculationSource) {
      console.error(`Calculation source tidak ditemukan untuk ${jenisPerusahaan}`);
      return [];
    }

    return calculationNames
      .map((calcName) => {
        const calcFunction = calculationSource[calcName];
        if (!calcFunction) {
          console.warn(`Function '${calcName}' tidak ditemukan untuk ${jenisPerusahaan}`);
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
