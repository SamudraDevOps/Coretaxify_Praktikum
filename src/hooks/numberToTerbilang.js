export function numberToTerbilang(n) {
  const satuan = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas",
  ];
  n = parseInt(n, 10);
  if (isNaN(n) || n < 0) return "";
  if (n < 12) return satuan[n];
  if (n < 20) return numberToTerbilang(n - 10) + " belas";
  if (n < 100)
    return (
      numberToTerbilang(Math.floor(n / 10)) +
      " puluh" +
      (n % 10 !== 0 ? " " + numberToTerbilang(n % 10) : "")
    );
  if (n < 200)
    return "seratus" + (n - 100 !== 0 ? " " + numberToTerbilang(n - 100) : "");
  if (n < 1000)
    return (
      numberToTerbilang(Math.floor(n / 100)) +
      " ratus" +
      (n % 100 !== 0 ? " " + numberToTerbilang(n % 100) : "")
    );
  if (n < 2000)
    return "seribu" + (n - 1000 !== 0 ? " " + numberToTerbilang(n - 1000) : "");
  if (n < 1000000)
    return (
      numberToTerbilang(Math.floor(n / 1000)) +
      " ribu" +
      (n % 1000 !== 0 ? " " + numberToTerbilang(n % 1000) : "")
    );
  if (n < 1000000000)
    return (
      numberToTerbilang(Math.floor(n / 1000000)) +
      " juta" +
      (n % 1000000 !== 0 ? " " + numberToTerbilang(n % 1000000) : "")
    );
  if (n < 1000000000000)
    return (
      numberToTerbilang(Math.floor(n / 1000000000)) +
      " miliar" +
      (n % 1000000000 !== 0 ? " " + numberToTerbilang(n % 1000000000) : "")
    );
  if (n < 1000000000000000)
    return (
      numberToTerbilang(Math.floor(n / 1000000000000)) +
      " triliun" +
      (n % 1000000000000 !== 0
        ? " " + numberToTerbilang(n % 1000000000000)
        : "")
    );
  return "terlalu besar";
}
