// LABA RUGI
import * as LabaRugiUmum from "./Badan/labaRugi/umum";
import * as LabaRugiManufaktur from "./Badan/labaRugi/manufaktur";
import * as LabaRugiDagang from "./Badan/labaRugi/dagang";
import * as LabaRugiJasa from "./Badan/labaRugi/jasa";
import * as LabaRugiBankKonvensional from "./Badan/labaRugi/bank_konvensional";
import * as LabaRugiDanaPensiun from "./Badan/labaRugi/dana_pensiun";
import * as LabaRugiAsuransi from "./Badan/labaRugi/asuransi";
import * as LabaRugiProperti from "./Badan/labaRugi/properti";
import * as LabaRugiBankSyariah from "./Badan/labaRugi/bank_syariah";
import * as LabaRugiInfrastruktur from "./Badan/labaRugi/infrastruktur";
import * as LabaRugiSekuritas from "./Badan/labaRugi/sekuritas";
import * as LabaRugiPembiayaan from "./Badan/labaRugi/pembiayaan";

// NERACA
import * as NeracaUmum from "./Badan/neraca/umum";
import * as NeracaManufaktur from "./Badan/neraca/manufaktur";
import * as NeracaDagang from "./Badan/neraca/dagang";
// import * as NeracaJasa from "./neraca/jasa";
// import * as NeracaBankKonvensional from "./neraca/bank_konvensional";
// import * as NeracaDanaPensiun from "./neraca/dana_pensiun";
// import * as NeracaAsuransi from "./neraca/asuransi";
// import * as NeracaProperti from "./neraca/properti";
// import * as NeracaBankSyariah from "./neraca/bank_syariah";
// import * as NeracaInfrastruktur from "./neraca/infrastruktur";
// import * as NeracaSekuritas from "./neraca/sekuritas";
// import * as NeracaPembiayaan from "./neraca/pembiayaan";

// Export dengan namespace agar tidak tercampur
export const labaRugi = {
  umum: LabaRugiUmum,
  manufaktur: LabaRugiManufaktur,
  dagang: LabaRugiDagang,
  jasa: LabaRugiJasa,
  bank_konvensional: LabaRugiBankKonvensional,
  dana_pensiun: LabaRugiDanaPensiun,
  asuransi: LabaRugiAsuransi,
  properti: LabaRugiProperti,
  bank_syariah: LabaRugiBankSyariah,
  infrastruktur: LabaRugiInfrastruktur,
  sekuritas: LabaRugiSekuritas,
  pembiayaan: LabaRugiPembiayaan,
};

export const neraca = {
  umum: NeracaUmum,
  manufaktur: NeracaManufaktur,
  dagang: NeracaDagang,
  //   jasa: NeracaJasa,
  //   bank_konvensional: NeracaBankKonvensional,
  //   dana_pensiun: NeracaDanaPensiun,
  //   asuransi: NeracaAsuransi,
  //   properti: NeracaProperti,
  //   bank_syariah: NeracaBankSyariah,
  //   infrastruktur: NeracaInfrastruktur,
  //   sekuritas: NeracaSekuritas,
  //   pembiayaan: NeracaPembiayaan,
};
