import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import qrImage from "../../../assets/images/qr-web.png";
import kopImage from "../../../assets/images/KOP/PPN.png";

const styles = StyleSheet.create({
  page: { fontSize: 10, padding: 30, fontFamily: "Helvetica", lineHeight: 1.5 },
  header: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeader: { fontSize: 10, textAlign: "center", marginBottom: 10 },
  sectionTitle: {
    fontWeight: "bold",
    marginVertical: 6,
    fontSize: 10,
    borderBottom: 1,
  },
  row: { flexDirection: "row", marginBottom: 2 },
  label: { width: "70%" },
  value: { width: "30%", textAlign: "right" },
  statement: { marginTop: 15 },
  signature: { marginTop: 20, textAlign: "right" },
  footer: { fontSize: 8, marginTop: 10, fontStyle: "italic" },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottom: 1,
    backgroundColor: "#eee",
    fontWeight: "bold",
  },
  tableCellText: {
    paddingHorizontal: 2,
    fontSize: 9,
  },
  tableCellNumeric: {
    paddingHorizontal: 2,
    fontSize: 8,
    textAlign: "right",
  },
  tableHeaderText: {
    paddingHorizontal: 2,
    fontSize: 9,
    fontWeight: "bold",
  },
  tableHeaderNumeric: {
    paddingHorizontal: 2,
    fontSize: 8,
    textAlign: "right",
    fontWeight: "bold",
  },
});

const SptPpnPdf = ({ data }) => {
  const s = (key) => data?.detail_spt?.[key] ?? "0.00";
  console.log("pdf data", data);

  // function formatRupiah(value) {
  //   const numberString = value?.toString().replace(/[^0-9]/g, "") || "0";
  //   const number = parseInt(numberString) || 0;

  //   if (number === 0) return "0";

  //   // Use compact format without currency symbol
  //   return new Intl.NumberFormat("id-ID").format(number);
  // }

  // function formatRupiah(value) {
  //   const numberString = value?.toString().replace(/[^0-9]/g, "") || "0";
  //   return new Intl.NumberFormat("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //     minimumFractionDigits: 0,
  //   }).format(numberString || 0);
  // }

  function formatRupiah(value) {
    const number = Number(value) || 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={{ width: "20%" }}>
          <Image
            style={{ width: 50, height: 50 }}
            src={kopImage} // Update with actual logo path
          />
        </View> */}
        {/* <Text style={styles.header}>SAMUDERA EDUKASI TEKNOLOGI</Text>
        <Text style={styles.subHeader}>CORETAXIFY</Text>
        <Text style={styles.subHeader}>
          SURAT PEMBERITAHUAN MASA PAJAK PERTAMBAHAN NILAI (SPT MASA PPN)
        </Text> */}

        {/* <View style={styles.row}>
          <Text style={styles.label}>Nama PKP:</Text>
          <Text style={styles.value}>{data.nama_pengusaha}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>NPWP:</Text>
          <Text style={styles.value}>{data.npwp}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Masa Pajak:</Text>
          <Text style={styles.value}>
            {data.masa_bulan} {data.masa_tahun}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.value}>{data.model}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Alamat:</Text>
          <Text style={styles.value}>{data.alamat}</Text>
        </View> */}

        <View style={{ border: "1px solid black", padding: 6 }}>
          {/* <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "20%" }}></View>
            <View style={{ width: "60%", textAlign: "center" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
              </Text>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                DIREKTORAT JENDERAL PAJAK
              </Text>
              <Text style={{ fontSize: 11, marginTop: 4, fontWeight: "bold" }}>
                SURAT PEMBERITAHUAN MASA
              </Text>
              <Text style={{ fontSize: 10 }}>
                PAJAK PERTAMBAHAN NILAI (SPT MASA PPN)
              </Text>
              <Text style={{ fontSize: 10 }}>BAGI PENGUSAHA KENA PAJAK</Text>
            </View>
            <View
              style={{
                width: "20%",
                textAlign: "center",
                justifyContent: "center",
              }}
            ></View>
          </View> */}
          <View style={{ width: "100%", textAlign: "center" }}>
            <Image
              style={{ width: "100%", height: "auto", marginBottom: 5 }}
              src={kopImage}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              fontSize: 9,
              marginTop: 6,
              borderWidth: 1,
              borderColor: "#000",
            }}
          >
            <View style={{ width: "33.3%", padding: 4, borderRight: 1 }}>
              <Text>Masa Pajak</Text>
              <Text>
                {data.masa_bulan} {data.masa_tahun}
              </Text>
            </View>
            <View style={{ width: "33.3%", padding: 4, borderRight: 1 }}>
              <Text>Tahun Buku</Text>
              <Text>1 s.d 12</Text>
            </View>
            <View style={{ width: "33.3%", padding: 4 }}>
              <Text>Normal/Pembetulan</Text>
              <Text>{data.model}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              fontSize: 9,
              marginTop: 6,
              padding: 4,
              backgroundColor: "#eee",
            }}
          >
            <View style={{ width: "58%", paddingRight: 6 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 2,
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ width: 50, fontWeight: "bold" }}>NAMA PKP</Text>
                <Text style={{ width: 10, textAlign: "center" }}>:</Text>
                <Text style={{ flex: 1 }}>{data.nama_pengusaha}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 2,
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ width: 50, fontWeight: "bold" }}>ALAMAT</Text>
                <Text style={{ width: 10, textAlign: "center" }}>:</Text>
                <Text style={{ flex: 1 }}>{data.alamat}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 2,
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ width: 50, fontWeight: "bold" }}>TELEPON</Text>
                <Text style={{ width: 10, textAlign: "center" }}>:</Text>
                <Text style={{ flex: 1 }}>{data.telepon}</Text>
              </View>
            </View>

            <View style={{ width: "42%" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 2,
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ width: 50, fontWeight: "bold" }}>NPWP</Text>
                <Text style={{ width: 10, textAlign: "center" }}>:</Text>
                <Text style={{ flex: 1 }}>{data.npwp}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 2,
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ width: 50, fontWeight: "bold" }}>KLU</Text>
                <Text style={{ width: 10, textAlign: "center" }}>:</Text>
                <Text style={{ flex: 1 }}>
                  AKTIVITAS AKUNTANSI, PEMBUKUAN DAN PEMERIKSA
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 2,
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ width: 50, fontWeight: "bold" }}>HP</Text>
                <Text style={{ width: 10, textAlign: "center" }}>:</Text>
                <Text style={{ flex: 1 }}>{data.hp}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* I. Penyerahan */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 4 }}>
            I. PENYERAHAN BARANG DAN JASA
          </Text>

          {/* Table Header */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#eee",
              borderBottomWidth: 1,
              paddingVertical: 4,
              fontWeight: "bold",
            }}
          >
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableHeaderText}>Jenis Penyerahan</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>Harga Jual / DPP</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>DPP Nilai Lain</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>PPN</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>PPnBM</Text>
            </View>
          </View>

          {/* Row 1 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                1. Ekspor BKP/BKP Tidak Berwujud/JKP
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a1_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                2. Penyerahan PPN & PPnBM dipungut sendiri (Kode 04 & 05)
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a2_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a2_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a2_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a2_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row 3 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                3. Penyerahan ke turis (Kode 06)
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a3_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a3_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a3_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a3_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row 4 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                4. Penyerahan lainnya (Kode 01, 09, 10)
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a4_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a4_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a4_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a4_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row 5 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                5. Penyerahan digunggung (Kode 07)
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a5_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a5_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a5_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a5_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row 6 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                6. Penyerahan oleh Pemungut PPN (Kode 02 & 03)
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a6_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a6_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a6_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a6_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row 7 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                7. Penyerahan yang mendapat fasilitas PPN atau PPnBM Tidak
                Dipungut (dengan Faktur Pajak Kode 07)
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a7_dpp)}
              </Text>
            </View>

            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a7_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a7_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a7_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row 8 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                8. Penyerahan yang mendapat fasilitas PPN atau PPnBM Dibebaskan
                (dengan Faktur Pajak Kode 08)
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a8_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a8_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a8_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a8_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row 9 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                9.Penyerahan yang mendapat fasilitas PPN atau PPnBM dengan
                Faktur Pajak yang dilaporkan secara digunggung
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a9_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a9_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a9_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a9_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Total Row */}
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 4,
              borderTopWidth: 1,
              marginTop: 5,
            }}
          >
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={[styles.tableCellText, { fontWeight: "bold" }]}>
                Jumlah (I.A.1 s.d I.A.9)
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={[styles.tableCellNumeric, { fontWeight: "bold" }]}>
                {formatRupiah(data.detail_spt.cl_1a_jumlah_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={[styles.tableCellNumeric, { fontWeight: "bold" }]}>
                {formatRupiah(data.detail_spt.cl_1a_jumlah_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_1a_jumlah_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={{ marginTop: 4 }}>
            <View style={{ flexDirection: "row", paddingVertical: 2 }}>
              <View style={{ width: "70%", paddingRight: 8 }}>
                <Text style={styles.tableCellText}>
                  B. Penyerahan barang/jasa yang tidak terutang PPN:
                </Text>
              </View>
              <View style={{ width: "30%", paddingHorizontal: 2 }}>
                <Text style={styles.tableCellNumeric}>
                  {formatRupiah(data.detail_spt.cl_1b_jumlah_dpp)}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 2 }}>
              <View style={{ width: "70%", paddingRight: 8 }}>
                <Text style={styles.tableCellText}>
                  C. Jumlah seluruh penyerahan barang dan jasa (I.A + I.B):
                </Text>
              </View>
              <View style={{ width: "30%", paddingHorizontal: 2 }}>
                <Text style={styles.tableCellNumeric}>
                  {formatRupiah(data.detail_spt.cl_1c_jumlah_dpp)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* II. PEROLEHAN BARANG DAN JASA */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 4 }}>
            II. PEROLEHAN BARANG DAN JASA
          </Text>

          {/* Table Header */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#eee",
              borderBottomWidth: 1,
              paddingVertical: 3,
              fontWeight: "bold",
            }}
          >
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableHeaderText}>Jenis Perolehan</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>Harga Jual / DPP</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>DPP Nilai Lain</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>PPN</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>PPnBM</Text>
            </View>
          </View>

          {/* Row A */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                A. Impor BKP, Pemanfaatan BKP Tidak Berwujud dan/atau JKP dari
                luar Daerah Pabean
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2a_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2a_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2a_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row B */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                B. Perolehan BKP/JKP dari dalam negeri dengan DPP Nilai Lain
                atau Besaran Tertentu
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2b_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2b_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2b_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2b_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row C */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                C. Perolehan BKP dari dalam negeri selain dengan DPP Nilai Lain
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2c_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2c_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2c_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row D */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                D. Perolehan BKP/JKP dari dalam negeri sebagai Pemungut PPN
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2d_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2d_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2d_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2d_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row E */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                E. Kompensasi kelebihan Pajak Masukan
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2e_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
          </View>

          {/* Row F */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                F. Hasil penghitungan kembali Pajak Masukan yang telah
                dikreditkan
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2f_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
          </View>

          {/* Row G */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={[styles.tableCellText, { fontWeight: "bold" }]}>
                G. Jumlah Pajak Masukan yang dapat diperhitungkan
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2g_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2g_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
          </View>

          {/* Row H */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                H. Impor atau perolehan BKP/JKP yang tidak dikreditkan atau
                fasilitas
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2h_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2h_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2h_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2h_ppnbm)}
              </Text>
            </View>
          </View>

          {/* Row I */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                I. Impor/perolehan digunggung dan tidak terutang PPN
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_2i_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
          </View>

          {/* Row J */}
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 4,
              borderTopWidth: 1,
              marginTop: 5,
            }}
          >
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={[styles.tableCellText, { fontWeight: "bold" }]}>
                J. Jumlah Perolehan (II.A + II.B + II.C + II.D +II.H + II.I)
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={[styles.tableCellNumeric, { fontWeight: "bold" }]}>
                {formatRupiah(data.detail_spt.cl_2j_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>-</Text>
            </View>
          </View>
        </View>

        {/* III. PENGHITUNGAN PPN KURANG BAYAR / LEBIH BAYAR */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 4 }}>
            III. PENGHITUNGAN PPN KURANG BAYAR / LEBIH BAYAR
          </Text>

          {/* Table Header */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#eee",
              borderBottomWidth: 1,
              borderTopWidth: 1,
              paddingVertical: 3,
              fontWeight: "bold",
            }}
          >
            <View style={{ width: "70%", paddingRight: 8 }}>
              <Text style={styles.tableHeaderText}>Uraian</Text>
            </View>
            <View style={{ width: "30%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>PPN (Rupiah)</Text>
            </View>
          </View>

          {/* Rows A–G */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "70%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                A. Pajak Keluaran yang harus dipungut sendiri (I.A.2 + I.A.3 +
                I.A.4 + I.A.5)
              </Text>
            </View>
            <View style={{ width: "30%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_3a_ppn)}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "70%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                B. PPN Disetor di muka dalam masa pajak yang sama
              </Text>
            </View>
            <View style={{ width: "30%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_3b_ppn)}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "70%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                C. Pajak Masukan yang dapat diperhitungkan (II.G)
              </Text>
            </View>
            <View style={{ width: "30%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_3c_ppn)}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "70%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                D. Kelebihan pemungutan PPN oleh Pemungut PPN
              </Text>
            </View>
            <View style={{ width: "30%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_3d_ppn)}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingVertical: 4,
              borderTopWidth: 1,
              fontWeight: "bold",
            }}
          >
            <View style={{ width: "70%", paddingRight: 8 }}>
              <Text style={[styles.tableCellText, { fontWeight: "bold" }]}>
                E. PPN kurang atau (lebih) bayar (III.A - III.B - III.C - III.D)
              </Text>
            </View>
            <View style={{ width: "30%", paddingHorizontal: 2 }}>
              <Text style={[styles.tableCellNumeric, { fontWeight: "bold" }]}>
                {formatRupiah(data.detail_spt.cl_3e_ppn)}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "70%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                F. PPN kurang atau (lebih) bayar pada SPT yang dibetulkan
                sebelumnya
              </Text>
            </View>
            <View style={{ width: "30%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_3f_ppn)}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "70%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                G. PPN kurang atau (lebih) bayar karena pembetulan SPT (III.E –
                III.F)
              </Text>
            </View>
            <View style={{ width: "30%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_3g_ppn)}
              </Text>
            </View>
          </View>

          {/* Section H */}
          <Text style={{ fontWeight: "bold", marginTop: 6 }}>
            H. Diminta Untuk:
          </Text>
          <View style={{ marginLeft: 10, marginTop: 2 }}>
            {data.detail_spt.cl_3h_diminta === 1 && (
              <Text>1. Dikompensasikan</Text>
            )}
            {data.detail_spt.cl_3h_diminta === 2 && (
              <Text>2. Dikembalikan melalui pengembalian pendahuluan</Text>
            )}
            {data.detail_spt.cl_3h_diminta === 3 && (
              <Text>3. Dikembalikan untuk pemeriksaan</Text>
            )}
          </View>

          {/* Rekening Info */}
          <View
            style={{
              marginTop: 8,
              padding: 6,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 2 }}>
              <Text style={{ width: "40%" }}>Nomor Rekening</Text>
              <Text style={{ width: "5%" }}>:</Text>
              <Text style={{ width: "55%" }}>
                {data.detail_spt.cl_3h_nomor_rekening}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 2 }}>
              <Text style={{ width: "40%" }}>Nama Bank</Text>
              <Text style={{ width: "5%" }}>:</Text>
              <Text style={{ width: "55%" }}>
                {data.detail_spt.cl_3h_nama_bank}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ width: "40%" }}>Nama Pemilik Rekening</Text>
              <Text style={{ width: "5%" }}>:</Text>
              <Text style={{ width: "55%" }}>
                {data.detail_spt.cl_3h_nama_pemilik_bank}
              </Text>
            </View>
          </View>
        </View>

        {/* IV. PPN TERUTANG ATAS KEGIATAN MEMBANGUN SENDIRI */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 10, marginBottom: 4 }}>
            IV. PPN TERUTANG ATAS KEGIATAN MEMBANGUN SENDIRI
          </Text>
          <View style={styles.tableRow}>
            <View style={{ width: "60%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>PPN Terutang</Text>
            </View>
            <View style={{ width: "20%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_4_ppn_terutang_dpp)}
              </Text>
            </View>

            <View style={{ width: "20%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_4_ppn_terutang)}
              </Text>
            </View>
          </View>

          {/* V. PEMBAYARAN KEMBALI PAJAK MASUKAN YANG TIDAK DAPAT DIKREDITKAN */}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 10,
              marginTop: 8,
              marginBottom: 4,
            }}
          >
            V. PEMBAYARAN KEMBALI PAJAK MASUKAN YANG TIDAK DAPAT DIKREDITKAN
          </Text>
          <View style={styles.tableRow}>
            <View style={{ width: "80%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                PPN Yang Wajib Dibayar Kembali
              </Text>
            </View>
            <View style={{ width: "20%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_5_ppn_wajib)}
              </Text>
            </View>
          </View>

          {/* VI. PAJAK PENJUALAN ATAS BARANG MEWAH */}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 10,
              marginTop: 8,
              marginBottom: 4,
            }}
          >
            VI. PAJAK PENJUALAN ATAS BARANG MEWAH
          </Text>

          {/* Table Header */}
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 4,
              borderBottom: 1,
              backgroundColor: "#eee",
              fontWeight: "bold",
            }}
          >
            <View style={{ width: "80%", paddingRight: 8 }}>
              <Text style={styles.tableHeaderText}>Uraian</Text>
            </View>
            <View style={{ width: "20%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>PPnBM (Rp)</Text>
            </View>
          </View>

          {/* PPnBM Rows */}
          <View style={styles.tableRow}>
            <View style={{ width: "80%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                A. PPnBM yang harus dipungut sendiri (I.A.2 + I.A.3 + I.A.4 +
                I.A.5)
              </Text>
            </View>
            <View style={{ width: "20%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_6a_ppnbm)}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={{ width: "80%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                B. Kelebihan pemungutan PPnBM oleh Pemungut PPN
              </Text>
            </View>
            <View style={{ width: "20%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_6b_ppnbm)}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={{ width: "80%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                C. PPnBM kurang atau (lebih) bayar (VIA - VIB)
              </Text>
            </View>
            <View style={{ width: "20%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_6c_ppnbm)}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={{ width: "80%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                D. PPnBM kurang atau (lebih) bayar SPT dibetulkan sebelumnya
              </Text>
            </View>
            <View style={{ width: "20%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_6d_ppnbm)}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={{ width: "80%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                E. PPnBM kurang atau (lebih) bayar karena pembetulan (VIC - VID)
              </Text>
            </View>
            <View style={{ width: "20%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_6e_ppnbm)}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <View style={{ width: "80%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                ☐ diminta pengembalian pajak yang tidak seharusnya terutang
              </Text>
            </View>
            <View style={{ width: "20%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}></Text>
            </View>
          </View>

          {/* VII. PEMUNGUTAN PPN ATAU PPN DAN PPnBM OLEH PEMUNGUT PPN */}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 10,
              marginTop: 10,
              marginBottom: 4,
            }}
          >
            VII. PEMUNGUTAN PPN ATAU PPN DAN PPnBM OLEH PEMUNGUT PPN
          </Text>

          {/* Table Header */}
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 4,
              borderBottom: 1,
              backgroundColor: "#eee",
              fontWeight: "bold",
            }}
          >
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableHeaderText}>Uraian</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>Harga Jual</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>DPP Nilai Lain</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>PPN</Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableHeaderNumeric}>PPnBM</Text>
            </View>
          </View>

          {/* Section VII Rows */}
          <View style={styles.tableRow}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                A. Jumlah PPN dan PPnBM yang dipungut
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7a_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7a_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7a_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7a_ppnbm)}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                B. PPN dan PPnBM kurang atau (lebih) bayar pada SPT yang
                dibetulkan
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7b_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7b_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7b_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7b_ppnbm)}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={{ width: "40%", paddingRight: 8 }}>
              <Text style={styles.tableCellText}>
                C. PPN dan PPnBM kurang atau (lebih) bayar karena pembetulan
                (VII.A - VII.B)
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7c_dpp)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7c_dpp_lain)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7c_ppn)}
              </Text>
            </View>
            <View style={{ width: "15%", paddingHorizontal: 2 }}>
              <Text style={styles.tableCellNumeric}>
                {formatRupiah(data.detail_spt.cl_7c_ppnbm)}
              </Text>
            </View>
          </View>
        </View>

        {/* VIII. PEMUNGUTAN PPN ATAU PPN DAN PPnBM OLEH PIHAK LAIN */}
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 10,
            marginTop: 10,
            marginBottom: 4,
          }}
        >
          VIII. PEMUNGUTAN PPN ATAU PPN DAN PPnBM OLEH PIHAK LAIN
        </Text>

        {/* Table Header */}
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 4,
            borderBottom: 1,
            backgroundColor: "#eee",
            fontWeight: "bold",
          }}
        >
          <View style={{ width: "40%", paddingRight: 8 }}>
            <Text style={styles.tableHeaderText}>Uraian</Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableHeaderNumeric}>Harga Jual</Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableHeaderNumeric}>DPP Nilai Lain</Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableHeaderNumeric}>PPN</Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableHeaderNumeric}>PPnBM</Text>
          </View>
        </View>

        {/* Section VIII Rows */}
        <View style={styles.tableRow}>
          <View style={{ width: "40%", paddingRight: 8 }}>
            <Text style={styles.tableCellText}>
              A. Jumlah PPN dan PPnBM yang dipungut
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8a_dpp)}
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8a_dpp_lain)}
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8a_ppn)}
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8a_ppnbm)}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={{ width: "40%", paddingRight: 8 }}>
            <Text style={styles.tableCellText}>
              B. PPN dan PPnBM kurang atau (lebih) bayar pada SPT yang
              dibetulkan
            </Text>
          </View>

          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8b_dpp)}
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8b_dpp_lain)}
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8b_ppn)}
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8b_ppnbm)}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={{ width: "40%", paddingRight: 8 }}>
            <Text style={styles.tableCellText}>
              C. PPN dan PPnBM kurang atau (lebih) bayar karena pembetulan
              (VIII.A - VIII.B)
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8c_dpp)}
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8c_dpp_lain)}
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8c_ppn)}
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}>
              {formatRupiah(data.detail_spt.cl_8c_ppnbm)}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={{ width: "40%", paddingRight: 8 }}>
            <Text style={styles.tableCellText}>
              D. ☐ diminta pengembalian pajak yang tidak seharusnya terutang
            </Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}></Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}></Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}></Text>
          </View>
          <View style={{ width: "15%", paddingHorizontal: 2 }}>
            <Text style={styles.tableCellNumeric}></Text>
          </View>
        </View>

        {/* IX. KELENGKAPAN SPT */}
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 10,
            marginTop: 10,
            marginBottom: 4,
          }}
        >
          IX. KELENGKAPAN SPT
        </Text>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.tableCellText}>
            ☑ 1. Dokumen Daftar Rincian Penyerahan Kendaraan Bermotor.
          </Text>
          <Text style={styles.tableCellText}>
            ☑ 2. Hasil Penghitungan Kembali Pajak Masukan yang Telah
            Dikreditkan.
          </Text>
        </View>

        {/* PERNYATAAN */}
        <Text style={{ fontSize: 9, marginTop: 12 }}>
          <Text style={{ fontWeight: "bold" }}>PERNYATAAN{"\n"}</Text>
          Dengan menyadari sepenuhnya akan segala akibatnya termasuk
          sanksi-sanksi sesuai dengan ketentuan perundang-undangan yang berlaku,
          Saya menyatakan bahwa apa yang telah Saya beritahukan di atas adalah
          benar, lengkap, dan jelas.
        </Text>

        {/* Signature Section */}
        <View style={styles.signature}>
          <Text style={styles.tableCellText}>
            {data.alamat ?? "KOTA"}, {data.tanggal_dibuat}
          </Text>
          <Text style={{ marginTop: 20, ...styles.tableCellText }}>
            {data.nama_pic}
          </Text>
          <View style={{ alignItems: "flex-end" }}>
            <Image
              style={{ width: "15%", height: "auto", marginBottom: 5 }}
              src={qrImage}
            />
          </View>
          <Text style={styles.tableCellText}>
            Ditandatangani secara elektronik
          </Text>
        </View>

        {/* <Text style={styles.footer}>
          Dokumen ini telah dibubuhi sertifikat elektronik. Verifikasi
          keasliannya di https://tte.kominfo.go.id/verifyPDF
        </Text> */}
      </Page>
    </Document>
  );
};

export default SptPpnPdf;
