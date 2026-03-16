import { BadanRowBuilder } from "./badanRowBuilder";
import { OPRowBuilder } from "./opRowBuilder";

export class RowBuilder {
  static buildRows(jenisPerusahaan, bagian, pickByKode, kategoriEntitas = "badan") {
    const BuilderClass = kategoriEntitas === "orang_pribadi" ? OPRowBuilder : BadanRowBuilder;

    const methodName = `build${jenisPerusahaan.charAt(0).toUpperCase() + jenisPerusahaan.slice(1)}${bagian}`;

    if (typeof BuilderClass[methodName] === "function") {
      console.log(
        `[Neraca RowBuilder] Calling ${BuilderClass.name}.${methodName} for kategoriEntitas: ${kategoriEntitas}`
      );
      return BuilderClass[methodName](pickByKode);
    }

    console.warn(`[Neraca RowBuilder] Method ${methodName} not found in ${BuilderClass.name}`);
    return [];
  }
}

export { BadanRowBuilder } from "./badanRowBuilder";
export { OPRowBuilder } from "./opRowBuilder";
