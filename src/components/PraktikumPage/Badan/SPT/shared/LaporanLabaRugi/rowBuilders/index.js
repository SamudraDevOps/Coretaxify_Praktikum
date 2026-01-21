import { BadanRowBuilder } from "./badanRowBuilder";
import { OPRowBuilder } from "./opRowBuilder";

export class RowBuilder {
  static buildRows(jenisPerusahaan, bagian, pickByKode, kategoriEntitas = "badan") {
    const BuilderClass = kategoriEntitas === "orang_pribadi" ? OPRowBuilder : BadanRowBuilder;

    const methodName = `build${
      jenisPerusahaan.charAt(0).toUpperCase() + jenisPerusahaan.slice(1)
    }${bagian}`;

    if (typeof BuilderClass[methodName] === "function") {
      return BuilderClass[methodName](pickByKode);
    }

    console.warn(
      `Builder untuk ${jenisPerusahaan} bagian ${bagian} kategori ${kategoriEntitas} belum diimplementasikan`
    );

    if (typeof BuilderClass.buildGeneric === "function") {
      return BuilderClass.buildGeneric(pickByKode, jenisPerusahaan);
    }

    return [];
  }
}

export { BadanRowBuilder } from "./badanRowBuilder";
export { OPRowBuilder } from "./opRowBuilder";
