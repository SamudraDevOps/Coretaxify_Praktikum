import React from "react";
import HartaTable from "../../shared/HartaTable";
import { jenisHartaGlobal } from "../../config/jenisHartaOptions";

export default function Kelompok3({ config, onTotalChange }) {
  return (
    <HartaTable
      jenisHartaOptions={jenisHartaGlobal}
      title="Harta Kelompok 3"
      onTotalChange={onTotalChange}
      customConfig={config}
    />
  );
}
