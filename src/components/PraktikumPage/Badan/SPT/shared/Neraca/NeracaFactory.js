import { PERUSAHAAN_CONFIG, BAGIAN_LAMPIRAN } from "../perusahaanConfig";
import { MASTER_AKUN_NERACA, createLineRow } from "../akunListNeraca";
import { RowBuilder } from "./rowBuilders";
import { calculations } from "../calculations";

export class NeracaFactory {
  static createComponent(jenisPerusahaan, bagian = "B", kategoriEntitas = "badan") {
    const config = PERUSAHAAN_CONFIG[jenisPerusahaan];
    if (!config) {
      throw new Error(`Konfigurasi untuk ${jenisPerusahaan} tidak ditemukan`);
    }

    const lineRows = this.generateLineRows(config.akunKonteksNeraca);
    const pickByKode = this.createPickByKode(lineRows);
    const initialRows = RowBuilder.buildRows(jenisPerusahaan, bagian, pickByKode, kategoriEntitas);

    return {
      initialRows,
      config,
      bagian,
      kategoriEntitas,
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

  // static getSubtotalCalculations(jenisPerusahaan, bagian, kategoriEntitas = "badan") {
  //   // Ambil calculation sesuai jenis perusahaan
  //   const calculationSource =
  //     kategoriEntitas === "orang_pribadi"
  //       ? calculations.orang_pribadi?.neraca?.[jenisPerusahaan]
  //       : calculations.badan?.neraca?.[jenisPerusahaan];
  //   if (!calculationSource) throw new Error("Calculation source not found for Neraca");

  //   // Misal: calculationSource.calculate(rows, bagian)
  //   return calculationSource;
  // }

  static getSubtotalCalculations(jenisPerusahaan, bagian, kategoriEntitas = "badan") {
    const config = PERUSAHAAN_CONFIG[jenisPerusahaan];
    if (!config || !config.subtotalCalculations) {
      console.warn(`[NeracaFactory] Config tidak ditemukan untuk ${jenisPerusahaan}`);
      return [];
    }

    //  AMBIL calculation names berdasarkan kategoriEntitas
    const calculationsByKategori = config.subtotalCalculations[kategoriEntitas];

    if (!calculationsByKategori) {
      console.error(`[NeracaFactory] Tidak ada config untuk kategoriEntitas: ${kategoriEntitas}`);
      return [];
    }

    const calculationNames = calculationsByKategori[bagian] || [];

    const calculationSource =
      kategoriEntitas === "orang_pribadi"
        ? calculations.orang_pribadi?.neraca?.[jenisPerusahaan]
        : calculations.badan?.neraca?.[jenisPerusahaan];

    if (!calculationSource) {
      console.error(
        `[NeracaFactory] Calculation source tidak ditemukan untuk ${jenisPerusahaan} - ${kategoriEntitas}`
      );
      return [];
    }

    console.log(
      `[NeracaFactory] Using calculations for ${jenisPerusahaan} - ${kategoriEntitas} - Bagian ${bagian}:`,
      calculationNames
    );

    return calculationNames
      .map((calcName) => {
        const calcFunction = calculationSource[calcName];
        if (!calcFunction) {
          console.warn(
            `[NeracaFactory] Function '${calcName}' tidak ditemukan untuk Neraca ${jenisPerusahaan} - ${kategoriEntitas}`
          );
        }
        return calcFunction;
      })
      .filter(Boolean);
  }
}
