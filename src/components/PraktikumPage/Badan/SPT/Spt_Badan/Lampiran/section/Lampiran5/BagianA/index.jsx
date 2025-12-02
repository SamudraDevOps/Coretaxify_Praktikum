import React from "react";
import TempatTinggal from "./TempatTinggal";

//  CONFIG
const ConfigComponent = {
  baseFields: ["wilayah", "alamat", "nitku", "namaTku"],

  customChildren: [
    {
      key: "nitku",
      type: "text",
      title: "NITKU",
      placeholder: "NITKU",
    },
    {
      key: "namaTku",
      type: "text",
      title: "NAMA TKU",
      placeholder: "Nama TKU",
    },
    {
      key: "wilayah",
      type: "select-wilayah",
      title: "Wilayah",
      required: true,
    },
  ],
};

console.log("  Config defined:", ConfigComponent);

const TempatTinggalIndex = () => {
  return (
    <div className="space-y-4">
      <TempatTinggal config={ConfigComponent} />
    </div>
  );
};

console.log(" ConfigComponent component exported");

export default TempatTinggalIndex;
