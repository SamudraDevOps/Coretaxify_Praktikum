// Format rupiah
export const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number || 0);
};

// FIXED: Format angka dengan titik setiap 3 digit (tanpa mata uang)
export const formatNumber = (number) => {
  if (number === null || number === undefined || number === "") return "";

  // FIXED: Handle 0 specifically
  if (number === 0) return "0";

  // Empty string → empty string (show placeholder)
  if (number === "") {
    return "";
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// FIXED: Parse string yang diformat kembali ke angka
export const parseFormattedNumber = (formattedString) => {
  if (formattedString === null || formattedString === undefined || formattedString === "")
    return null;

  // Hapus semua karakter non-digit
  const numbersOnly = formattedString.replace(/\D/g, "");

  // FIXED: Handle empty string dan "0" dengan benar
  if (numbersOnly === "") return null;

  const parsed = parseInt(numbersOnly, 10);
  return isNaN(parsed) ? null : parsed;
};

// IMPROVED: Custom hook untuk handle input number dengan format
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
