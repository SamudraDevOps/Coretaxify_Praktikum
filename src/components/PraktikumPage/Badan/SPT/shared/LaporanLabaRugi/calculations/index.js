import * as UmumCalculations from "./umum/labaRugiSubtotal";
import * as ManufakturCalculations from "./manufaktur/labaRugiSubtotal";
import * as DagangCalculations from "./dagang/labaRugiSubtotal";
import * as JasaCalculations from "./jasa/labaRugiSubtotal";
import * as BankKonvensionalCalculations from "./bank_konvensional/labaRugiSubtotal";

// Export dengan namespace
export const umum = UmumCalculations;
export const manufaktur = ManufakturCalculations;
export const dagang = DagangCalculations;
export const jasa = JasaCalculations;
export const bank_konvensional = BankKonvensionalCalculations;
