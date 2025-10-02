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
    if (!number || number === 0) return "";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Parse string yang diformat kembali ke angka
export const parseFormattedNumber = (formattedString) => {
    if (!formattedString) return "";
    // Hapus semua karakter non-digit
    const numbersOnly = formattedString.replace(/\D/g, "");
    // Convert ke number
    return numbersOnly ? parseInt(numbersOnly, 10) : "";
};

// Custom hook untuk handle input number dengan format
export const useFormattedNumberInput = (value, onChange) => {
    const handleChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = parseFormattedNumber(inputValue);
        onChange(numericValue);
    };

    return {
        displayValue: formatNumber(value),
        handleChange,
    };
};