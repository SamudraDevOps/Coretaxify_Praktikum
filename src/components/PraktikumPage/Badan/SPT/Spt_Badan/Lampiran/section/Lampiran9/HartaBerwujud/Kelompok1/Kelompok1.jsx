import React from "react";
import HartaTable from "../../shared/HartaTable";
import { jenisHartaGlobal } from "../../config/jenisHartaOptions";

export default function Kelompok1Index() {
  return (
    <HartaTable jenisHartaOptions={jenisHartaGlobal} title="PENYUSUTAN DAN AMORTISASI FISKAL" />
  );
}
