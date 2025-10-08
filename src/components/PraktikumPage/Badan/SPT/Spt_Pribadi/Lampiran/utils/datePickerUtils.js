/**
 * Utility functions untuk DatePicker operations
 */

/**
 * Convert tahun (number) ke Date object untuk DatePicker
 * @param {number|string} year - Tahun yang akan dikonversi
 * @returns {Date|null} - Date object atau null jika tahun tidak valid
 */
export const yearToDate = (year) => {
    if (!year) return null;

    // Handle jika input berupa string
    const yearNumber = typeof year === 'string' ? parseInt(year, 10) : year;

    // Validasi tahun
    if (isNaN(yearNumber) || yearNumber < 1900 || yearNumber > 2100) {
        return null;
    }

    // Return Date object dengan tahun tersebut (bulan 0 = Januari, tanggal 1)
    return new Date(yearNumber, 0, 1);
};

/**
 * Extract tahun dari Date object
 * @param {Date} date - Date object dari DatePicker
 * @returns {number|string} - Tahun sebagai number, atau empty string jika date null
 */
export const dateToYear = (date) => {
    if (!date || !(date instanceof Date)) {
        return "";
    }

    return date.getFullYear();
};

/**
 * Validasi tahun
 * @param {number|string} year - Tahun yang akan divalidasi
 * @param {number} minYear - Tahun minimum (default: 1900)
 * @param {number} maxYear - Tahun maximum (default: tahun sekarang + 10)
 * @returns {boolean} - True jika valid, false jika tidak
 */
export const isValidYear = (year, minYear = 1900, maxYear = new Date().getFullYear() + 10) => {
    const yearNumber = typeof year === 'string' ? parseInt(year, 10) : year;

    if (isNaN(yearNumber)) return false;

    return yearNumber >= minYear && yearNumber <= maxYear;
};

/**
 * Format tahun untuk display
 * @param {number|string} year - Tahun yang akan diformat
 * @returns {string} - Formatted year string atau placeholder
 */
export const formatYearDisplay = (year) => {
    if (!year) return "Belum dipilih";

    const yearNumber = typeof year === 'string' ? parseInt(year, 10) : year;

    if (isNaN(yearNumber)) return "Tahun tidak valid";

    return `Tahun ${yearNumber}`;
};

/**
 * Generate array tahun untuk dropdown/select
 * @param {number} startYear - Tahun mulai (default: 1900)
 * @param {number} endYear - Tahun akhir (default: tahun sekarang + 10)
 * @param {boolean} descending - Urutan descending (default: true)
 * @returns {Array} - Array of year objects dengan value dan label
 */
export const generateYearOptions = (
    startYear = 1900,
    endYear = new Date().getFullYear() + 10,
    descending = true
) => {
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
        years.push({
            value: year,
            label: year.toString()
        });
    }

    return descending ? years.reverse() : years;
};

/**
 * Default props untuk Year DatePicker
 */
export const defaultYearPickerProps = {
    showYearPicker: true,
    dateFormat: "yyyy",
    yearItemNumber: 10,
    placeholderText: "Pilih Tahun",
    className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm",
    maxDate: new Date(2050, 0, 1),
    minDate: new Date(1900, 0, 1),
    showPopperArrow: false,
    // Custom styling untuk year picker
    calendarClassName: "year-picker-calendar"
};

/**
 * Create year picker handler function
 * @param {Function} updateFunction - Function untuk update state
 * @param {string} fieldName - Nama field yang akan diupdate
 * @returns {Function} - Handler function untuk DatePicker onChange
 */
export const createYearPickerHandler = (updateFunction, fieldName) => {
    return (date) => {
        const year = dateToYear(date);
        updateFunction(fieldName, year);

        // Log untuk debugging
        console.log(`📅 Year picker: ${fieldName} updated to ${year}`);
    };
};

/**
 * Custom CSS untuk year picker (bisa diimport ke file CSS utama)
 */
export const yearPickerStyles = `
.year-picker-calendar {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.react-datepicker__year-wrapper {
  display: flex;
  flex-wrap: wrap;
  max-width: 180px;
}

.react-datepicker__year-text {
  display: inline-block;
  width: 4rem;
  margin: 2px;
  padding: 4px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.react-datepicker__year-text:hover {
  background-color: #e3f2fd;
  color: #1976d2;
}

.react-datepicker__year-text--selected {
  background-color: #1976d2;
  color: white;
}

.react-datepicker__year-text--today {
  font-weight: bold;
  color: #1976d2;
}
`;