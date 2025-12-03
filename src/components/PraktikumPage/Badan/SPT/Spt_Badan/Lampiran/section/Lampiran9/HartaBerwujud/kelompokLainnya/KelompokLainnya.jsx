import React from "react";
import HartaTable from "../../shared/HartaTable";
import { jenisHartaGlobal } from "../../config/jenisHartaOptions";

export default function KelompokLainnyaIndex() {
  return <HartaTable jenisHartaOptions={jenisHartaGlobal} title="Harta Kelompok Lainnya" />;
}
