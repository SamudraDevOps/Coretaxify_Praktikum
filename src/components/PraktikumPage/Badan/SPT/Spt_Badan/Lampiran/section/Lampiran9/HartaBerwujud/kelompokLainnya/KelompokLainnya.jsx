import React from "react";
import HartaTable from "../../shared/HartaTable";
import { jenisHartaGlobal } from "../../config/jenisHartaOptions";

export default function KelompokLainnya({ config, onTotalChange }) {
  return (
    <HartaTable
      jenisHartaOptions={jenisHartaGlobal}
      title="Harta Kelompok Lainnya"
      onTotalChange={onTotalChange}
      customConfig={config}
    />
  );
}
