// Format rupiah
export const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number || 0);
};

// Format angka dengan titik setiap 3 digit (tanpa mata uang)
export const formatNumber = (number) => {
  if (number === null || number === undefined || number === "") return "";

  const n = Number(number);
  if (isNaN(n)) return "";

  const isNegative = n < 0;
  const abs = Math.abs(n);

  const formatted = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return isNegative ? `-${formatted}` : formatted;
};

// Parse string yang diformat kembali ke angka
export const parseFormattedNumber = (formattedString) => {
  if (formattedString === null || formattedString === undefined || formattedString === "")
    return null;

  // Deteksi minus di depan
  const isNegative = formattedString.trim().startsWith("-");
  const numbersOnly = formattedString.replace(/\D/g, "");

  if (numbersOnly === "") return null;

  const parsed = parseInt(numbersOnly, 10);
  if (isNaN(parsed)) return null;
  return isNegative ? -parsed : parsed;
};

// Custom hook untuk handle input number dengan format
export const useFormattedNumberInput = (value, onChange) => {
  const handleChange = (e) => {
    const raw = e.target.value;

    // jika benar-benar dikosongkan, simpan 0
    if (raw.trim() === "") {
      onChange(0);
      return;
    }

    const numeric = parseFormattedNumber(raw);
    onChange(numeric);
  };

  return {
    displayValue: value === "" || value === null || value === undefined ? "" : formatNumber(value),
    handleChange,
  };
};

// Helper function untuk memastikan nilai selalu angka
export const toNumber = (val) => {
  if (val === null || val === undefined || val === "") return 0;
  // Jika sudah angka, return langsung
  if (typeof val === "number") return val;
  // Jika string, parse dulu dengan parseFormattedNumber
  const parsed = parseFormattedNumber(val);
  return parsed === null ? 0 : parsed;
};
