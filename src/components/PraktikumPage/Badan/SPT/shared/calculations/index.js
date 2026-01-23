import * as BadanLabaRugiUmum from "./Badan/labaRugi/umum";
import * as BadanLabaRugiManufaktur from "./Badan/labaRugi/manufaktur";
import * as BadanLabaRugiDagang from "./Badan/labaRugi/dagang";
import * as BadanLabaRugiJasa from "./Badan/labaRugi/jasa";
import * as BadanLabaRugiBankKonvensional from "./Badan/labaRugi/bank_konvensional";
import * as BadanLabaRugiDanaPensiun from "./Badan/labaRugi/dana_pensiun";
import * as BadanLabaRugiAsuransi from "./Badan/labaRugi/asuransi";
import * as BadanLabaRugiProperti from "./Badan/labaRugi/properti";
import * as BadanLabaRugiBankSyariah from "./Badan/labaRugi/bank_syariah";
import * as BadanLabaRugiInfrastruktur from "./Badan/labaRugi/infrastruktur";
import * as BadanLabaRugiSekuritas from "./Badan/labaRugi/sekuritas";
import * as BadanLabaRugiPembiayaan from "./Badan/labaRugi/pembiayaan";

// BADAN - NERACA
import * as BadanNeracaUmum from "./Badan/neraca/umum";
import * as BadanNeracaManufaktur from "./Badan/neraca/manufaktur";
import * as BadanNeracaDagang from "./Badan/neraca/dagang";
import * as BadanNeracaJasa from "./Badan/neraca/jasa";
import * as BadanBankKonvensional from "./Badan/neraca/bank_konvensional";
import * as BadanDanaPensiun from "./Badan/neraca/dana_pensiun";
import * as BadanAsuransi from "./Badan/neraca/asuransi";

// ORANG PRIBADI - LABA RUGI
// import * as OPLabaRugiUmum from "./OP/labaRugi/umum";
// import * as OPLabaRugiManufaktur from "./OP/labaRugi/manufaktur";
import * as OPLabaRugiDagang from "./OP/labaRugi/dagang";
// import * as OPLabaRugiJasa from "./OP/labaRugi/jasa";

// ORANG PRIBADI - NERACA
// import * as OPNeracaUmum from "./OP/neraca/umum";
// import * as OPNeracaManufaktur from "./OP/neraca/manufaktur";
import * as OPNeracaDagang from "./OP/neraca/dagang";

// EXPORT STRUCTURE (HANYA 1 CARA)
export const calculations = {
  badan: {
    labaRugi: {
      umum: BadanLabaRugiUmum,
      manufaktur: BadanLabaRugiManufaktur,
      dagang: BadanLabaRugiDagang,
      jasa: BadanLabaRugiJasa,
      bank_konvensional: BadanLabaRugiBankKonvensional,
      dana_pensiun: BadanLabaRugiDanaPensiun,
      asuransi: BadanLabaRugiAsuransi,
      properti: BadanLabaRugiProperti,
      bank_syariah: BadanLabaRugiBankSyariah,
      infrastruktur: BadanLabaRugiInfrastruktur,
      sekuritas: BadanLabaRugiSekuritas,
      pembiayaan: BadanLabaRugiPembiayaan,
    },
    neraca: {
      umum: BadanNeracaUmum,
      manufaktur: BadanNeracaManufaktur,
      dagang: BadanNeracaDagang,
      jasa: BadanNeracaJasa,
      bank_konvensional: BadanBankKonvensional,
      dana_pensiun: BadanDanaPensiun,
      asuransi: BadanAsuransi,
    },
  },
  orang_pribadi: {
    labaRugi: {
      // umum: OPLabaRugiUmum,
      // manufaktur: OPLabaRugiManufaktur,
      dagang: OPLabaRugiDagang,
      // jasa: OPLabaRugiJasa,
    },
    neraca: {
      // umum: OPNeracaUmum,
      // manufaktur: OPNeracaManufaktur,
      dagang: OPNeracaDagang,
      // jasa: OPNeracaUmum, // Jasa sama dengan umum
    },
  },
};
