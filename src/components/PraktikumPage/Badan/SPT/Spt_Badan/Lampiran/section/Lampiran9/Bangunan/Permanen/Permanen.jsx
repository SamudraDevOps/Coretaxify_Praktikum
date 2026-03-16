import React from "react";
import HartaTable from "../../shared/HartaTable";
import { jenisHartaBangunan } from "../../config/jenisHartaOptions";

export default function Permanen({ config, onTotalChange }) {
  return <HartaTable jenisHartaOptions={jenisHartaBangunan} title="Bangunan Permanen" customConfig={config} onTotalChange={onTotalChange} />;
}
