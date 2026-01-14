import { PERUSAHAAN_CONFIG, BAGIAN_LAMPIRAN } from "../perusahaanConfig";
import { MASTER_AKUN_NERACA, createLineRow } from "../akunListNeraca";
import { RowBuilder } from "./rowBuilders";
import { neraca as calculations } from "../calculations";

export class NeracaFactory {
  static createComponent(jenisPerusahaan, bagian = "B") {
    const config = PERUSAHAAN_CONFIG[jenisPerusahaan];
    if (!config) {
      throw new Error(`Konfigurasi untuk ${jenisPerusahaan} tidak ditemukan`);
    }

    const lineRows = this.generateLineRows(config.akunKonteksNeraca);
    const pickByKode = this.createPickByKode(lineRows);
    const initialRows = RowBuilder.buildRows(jenisPerusahaan, bagian, pickByKode);

    return {
      initialRows,
      config,
      bagian,
    };
  }

  static generateLineRows(akunKonteksNeraca) {
    if (!akunKonteksNeraca) return [];

    const lineRows = [];

    Object.entries(akunKonteksNeraca).forEach(([kodeAkun, jenisAktif]) => {
      const kandidat = MASTER_AKUN_NERACA.filter((a) => a.kodeAkun === kodeAkun);

      if (!kandidat.length) {
        console.warn(`Tidak ditemukan akun dengan kode ${kodeAkun}`);
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

    // Validasi tidak boleh ada ID duplikat
    const ids = lineRows.map((r) => r.id);
    if (new Set(ids).size !== ids.length) {
      throw new Error("Duplicate akun id dalam satu form Neraca");
    }

    return lineRows;
  }

  static createPickByKode(lineRows) {
    return (kodes) => {
      return kodes.map((kode) => lineRows.find((r) => r.kodeAkun === kode)).filter(Boolean);
    };
  }

  static getSubtotalCalculations(jenisPerusahaan, bagian) {
    // Ambil calculation sesuai jenis perusahaan
    const calculationSource = calculations[jenisPerusahaan];
    if (!calculationSource) throw new Error("Calculation source not found for Neraca");

    // Misal: calculationSource.calculate(rows, bagian)
    return calculationSource;
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
          console.warn(`Function '${calcName}' tidak ditemukan`);
        }
        return calcFunction;
      })
      .filter(Boolean);
  }
}
