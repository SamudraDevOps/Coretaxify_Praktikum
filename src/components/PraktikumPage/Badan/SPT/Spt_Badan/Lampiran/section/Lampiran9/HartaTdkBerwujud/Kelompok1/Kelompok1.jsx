import React from "react";
import HartaTable from "../../shared/HartaTable";
import { jenisHartaTidakBerwujud } from "../../config/jenisHartaOptions";

export default function Kelompok1({ config, onTotalChange }) {
  return (
    <HartaTable
      jenisHartaOptions={jenisHartaTidakBerwujud}
      title="PENYUSUTAN DAN AMORTISASI FISKAL"
      customConfig={config}
      onTotalChange={onTotalChange}
    />
  );
}
