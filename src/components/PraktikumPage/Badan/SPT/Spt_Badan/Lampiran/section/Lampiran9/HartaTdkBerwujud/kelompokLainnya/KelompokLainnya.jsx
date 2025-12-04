import React from "react";
import HartaTable from "../../shared/HartaTable";
import { jenisHartaTidakBerwujud } from "../../config/jenisHartaOptions";

export default function KelompokLainnya({ config, onTotalChange }) {
  return (
    <HartaTable
      jenisHartaOptions={jenisHartaTidakBerwujud}
      title="Harta Kelompok Lainnya"
      onTotalChange={onTotalChange}
      customConfig={config}
    />
  );
}
