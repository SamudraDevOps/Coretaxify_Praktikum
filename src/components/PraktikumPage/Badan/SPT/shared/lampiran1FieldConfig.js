export function getLampiran1FieldConfig(selectedRow, options = {}) {
  if (!selectedRow) {
    return { baseFields: [], customChildren: [] };
  }
  const { readOnlyFields = {}, kodeKoreksiOptions = [] } = options;

  const isReadOnlyRow = selectedRow.type !== "line";

  // Daftar kode yang field tidakFinal-nya BISA diedit (editable)
  const editableTidakFinal = options.editableTidakFinal || [];
  const editableNilaiFiskal = options.editableNilaiFiskal || [];

  const isReadOnly = (field) => {
    if (field === "tidakFinal") {
      // Cek baik id maupun kodeAkun, dan handle string vs number
      const rowId = selectedRow.id;
      const kodeAkun = selectedRow.kodeAkun;
      return !(
        editableTidakFinal.includes(rowId) ||
        editableTidakFinal.includes(parseInt(rowId)) ||
        editableTidakFinal.includes(kodeAkun) ||
        editableTidakFinal.includes(parseInt(kodeAkun))
      );
    }
    if (field === "nilaiFiskal") {
      // Cek baik id maupun kodeAkun, dan handle string vs number
      const rowId = selectedRow.id;
      const kodeAkun = selectedRow.kodeAkun;
      return !(
        editableNilaiFiskal.includes(rowId) ||
        editableNilaiFiskal.includes(parseInt(rowId)) ||
        editableNilaiFiskal.includes(kodeAkun) ||
        editableNilaiFiskal.includes(parseInt(kodeAkun))
      );
    }

    const rowId = selectedRow.id;
    const kodeAkun = selectedRow.kodeAkun;

    const isFieldReadOnly =
      isReadOnlyRow ||
      readOnlyFields[rowId]?.includes(field) ||
      readOnlyFields[kodeAkun]?.includes(field) ||
      readOnlyFields[parseInt(rowId)]?.includes(field) ||
      readOnlyFields[parseInt(kodeAkun)]?.includes(field);

    return isFieldReadOnly;
    // return isReadOnlyRow || (readOnlyFields[selectedRow.id]?.includes(field) ?? false);
  };

  const isKodePenyesuaianReadOnly = isReadOnly("kodePenyesuaian");

  return {
    baseFields: [],
    customChildren: [
      {
        key: "kodeAkun",
        type: "text",
        title: "Kode Akun",
        placeholder: "Kode Akun",
        required: true,
        readOnly: true,
        className: "bg-gray-100 text-gray-600",
      },
      {
        key: "keterangan",
        type: "text",
        title: "Keterangan",
        placeholder: "Keterangan",
        required: true,
        readOnly: true,
        className: "bg-gray-100 text-gray-600",
      },
      {
        key: "nilaiKomersial",
        type: "currency",
        title: "Nilai Komersial",
        placeholder: "0",
        required: false,
        readOnly: isReadOnly("nilaiKomersial"),
        className: isReadOnly("nilaiKomersial") ? "bg-gray-100 text-gray-600" : "",
      },
      {
        key: "nonObjekPajak",
        type: "currency",
        title: "Tidak Termasuk Objek Pajak",
        placeholder: "0",
        required: false,
        readOnly: isReadOnly("nonObjekPajak"),
        className: isReadOnly("nonObjekPajak") ? "bg-gray-100 text-gray-600" : "",
      },
      {
        key: "pphFinal",
        type: "currency",
        title: "Dikenakan PPh Final",
        placeholder: "0",
        required: false,
        readOnly: isReadOnly("pphFinal"),
        className: isReadOnly("pphFinal") ? "bg-gray-100 text-gray-600" : "",
      },
      {
        key: "tidakFinal",
        type: "currency",
        title: "Objek Pajak Tidak Final",
        placeholder: "0",
        required: false,
        readOnly: isReadOnly("tidakFinal"),
        className: isReadOnly("tidakFinal") ? "bg-gray-100 text-gray-600" : "",
      },
      {
        key: "penyesuaianPositif",
        type: "currency",
        title: "Koreksi Fiskal (+)",
        placeholder: "0",
        required: false,
        readOnly: isReadOnly("penyesuaianPositif"),
        className: isReadOnly("penyesuaianPositif") ? "bg-gray-100 text-gray-600" : "",
      },
      {
        key: "penyesuaianNegatif",
        type: "currency",
        title: "Koreksi Fiskal (−)",
        placeholder: "0",
        required: false,
        readOnly: isReadOnly("penyesuaianNegatif"),
        className: isReadOnly("penyesuaianNegatif") ? "bg-gray-100 text-gray-600" : "",
      },
      {
        key: "kodePenyesuaian",
        type: isKodePenyesuaianReadOnly ? "text" : "select-search",
        title: "Kode Koreksi Fiskal",
        placeholder: isKodePenyesuaianReadOnly ? "" : "Silahkan pilih kode koreksi fiskal",
        required: false,
        options: kodeKoreksiOptions,
        readOnly: isKodePenyesuaianReadOnly,
        disabled: isKodePenyesuaianReadOnly,
        className: isKodePenyesuaianReadOnly ? "bg-gray-100 text-gray-600" : "",
      },
      {
        key: "nilaiFiskal",
        type: "currency",
        title: "Nilai Fiskal (Sebelum Fasilitas Perpajakan)",
        placeholder: "Auto Calculate",
        required: false,
        readOnly: isReadOnly("nilaiFiskal"),
        className: isReadOnly("nilaiFiskal") ? "bg-gray-100 text-gray-600" : "",
      },
    ],
  };
}
