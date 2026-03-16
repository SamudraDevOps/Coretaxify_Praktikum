import React from "react";
import HartaTable from "../../shared/HartaTable";
import { jenisHartaGlobal } from "../../config/jenisHartaOptions";

export default function Kelompok1({ config, onTotalChange }) {
  return (
    <HartaTable
      jenisHartaOptions={jenisHartaGlobal}
      title="PENYUSUTAN DAN AMORTISASI FISKAL"
      customConfig={config}
      onTotalChange={onTotalChange}
    />
  );
}
