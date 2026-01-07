import * as UmumCalculations from "./umum/labaRugiSubtotal";
import * as ManufakturCalculations from "./manufaktur/labaRugiSubtotal";
import * as DagangCalculations from "./dagang/labaRugiSubtotal";
import * as JasaCalculations from "./jasa/labaRugiSubtotal";
import * as BankKonvensionalCalculations from "./bank_konvensional/labaRugiSubtotal";
import * as DanaPensiunCalculations from "./dana_pensiun/labaRugiSubtotal";
import * as AsuransiCalculations from "./asuransi/labaRugiSubtotal";

// Export dengan namespace
export const umum = UmumCalculations;
export const manufaktur = ManufakturCalculations;
export const dagang = DagangCalculations;
export const jasa = JasaCalculations;
export const bank_konvensional = BankKonvensionalCalculations;
export const dana_pensiun = DanaPensiunCalculations;
export const asuransi = AsuransiCalculations;
