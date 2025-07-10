import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
});

const SptPpnPdf = ({ data }) => {
  const s = (key) => data?.detail_spt?.[key] ?? "0.00";
  console.log("pdf data", data);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>
            SAMUDERA EDUKASI TEKNOLOGI
        </Text>
        <Text style={styles.subHeader}>CORETAXIFY</Text>
        <Text style={styles.subHeader}>
          SURAT PEMBERITAHUAN MASA PAJAK PERTAMBAHAN NILAI (SPT MASA PPN)
        </Text>

        <View style={styles.row}>
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
            <Text style={{ width: "42%" }}>Jenis Penyerahan</Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              Harga Jual / DPP
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              DPP Nilai Lain
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>PPN</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>PPnBM</Text>
          </View>

          {/* Row 1 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              1. Ekspor BKP/BKP Tidak Berwujud/JKP
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_1a1_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>-</Text>
          </View>

          {/* Row 2 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              2. Penyerahan PPN & PPnBM dipungut sendiri (Kode 04 & 05)
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_1a2_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_1a2_dpp_lain}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_1a2_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_1a2_ppnbm}
            </Text>
          </View>

          {/* Row 3 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              3. Penyerahan ke turis (Kode 06)
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_1a3_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_1a3_dpp_lain}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_1a3_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_1a3_ppnbm}
            </Text>
          </View>

          {/* Row 4 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              4. Penyerahan lainnya (Kode 01, 09, 10)
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_1a4_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_1a4_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_1a4_ppnbm}
            </Text>
          </View>

          {/* Row 5 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              5. Penyerahan digunggung (Kode 07)
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_1a5_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_1a5_dpp_lain}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_1a5_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_1a5_ppnbm}
            </Text>
          </View>

          {/* Row 6 */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              6. Penyerahan oleh Pemungut PPN (Kode 02 & 03)
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_1a6_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_1a6_dpp_lain}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_1a6_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_1a6_ppnbm}
            </Text>
          </View>

          {/* Rows 7–9 */}
          {[7, 8, 9].map((n) => (
            <View key={n} style={{ flexDirection: "row", paddingVertical: 2 }}>
              <Text style={{ width: "42%" }}> {n}. -</Text>
              <Text style={{ width: "18%", textAlign: "right" }}>
                {data.detail_spt[`cl_1a${n}_dpp`]}
              </Text>
              <Text style={{ width: "18%", textAlign: "right" }}>
                {data.detail_spt[`cl_1a${n}_dpp_lain`]}
              </Text>
              <Text style={{ width: "11%", textAlign: "right" }}>
                {data.detail_spt[`cl_1a${n}_ppn`]}
              </Text>
              <Text style={{ width: "11%", textAlign: "right" }}>
                {data.detail_spt[`cl_1a${n}_ppnbm`]}
              </Text>
            </View>
          ))}

          {/* Total Row */}
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 4,
              borderTopWidth: 1,
              marginTop: 5,
            }}
          >
            <Text style={{ width: "42%", fontWeight: "bold" }}>
              Jumlah (I.A.1 s.d I.A.9)
            </Text>
            <Text
              style={{ width: "18%", textAlign: "right", fontWeight: "bold" }}
            >
              {data.detail_spt.cl_1a_jumlah_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text
              style={{ width: "11%", textAlign: "right", fontWeight: "bold" }}
            >
              {data.detail_spt.cl_1a_jumlah_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_1a_jumlah_ppnbm}
            </Text>
          </View>

          {/* Footer */}
          <View style={{ marginTop: 4 }}>
            <Text>
              B. Penyerahan barang/jasa yang tidak terutang PPN:{" "}
              {data.detail_spt.cl_1b_jumlah_dpp}
            </Text>
            <Text>
              C. Jumlah seluruh penyerahan barang dan jasa (I.A + I.B):{" "}
              {data.detail_spt.cl_1c_jumlah_dpp}
            </Text>
          </View>
        </View>

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
            <Text style={{ width: "42%" }}>Jenis Perolehan</Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              Harga Jual / DPP
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              DPP Nilai Lain
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>PPN</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>PPnBM</Text>
          </View>

          {/* Row A */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              A. Impor BKP, Pemanfaatan BKP Tidak Berwujud dan/atau JKP dari
              luar Daerah Pabean
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_2a_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2a_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2a_ppnbm}
            </Text>
          </View>

          {/* Row B */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              B. Perolehan BKP/JKP dari dalam negeri dengan DPP Nilai Lain atau
              Besaran Tertentu
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_2b_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_2b_dpp_lain}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2b_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2b_ppnbm}
            </Text>
          </View>

          {/* Row C */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              C. Perolehan BKP dari dalam negeri selain dengan DPP Nilai Lain
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_2c_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2c_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2c_ppnbm}
            </Text>
          </View>

          {/* Row D */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              D. Perolehan BKP/JKP dari dalam negeri sebagai Pemungut PPN
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_2d_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_2d_dpp_lain}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2d_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2d_ppnbm}
            </Text>
          </View>

          {/* Row E */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              E. Kompensasi kelebihan Pajak Masukan
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2e_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>-</Text>
          </View>

          {/* Row F */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              F. Hasil penghitungan kembali Pajak Masukan yang telah dikreditkan
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2f_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>-</Text>
          </View>

          {/* Row G */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%", fontWeight: "bold" }}>
              G. Jumlah Pajak Masukan yang dapat diperhitungkan
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_2g_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2g_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>-</Text>
          </View>

          {/* Row H */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              H. Impor atau perolehan BKP/JKP yang tidak dikreditkan atau
              fasilitas
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_2h_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_2h_dpp_lain}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2h_ppn}
            </Text>
            <Text style={{ width: "11%", textAlign: "right" }}>
              {data.detail_spt.cl_2h_ppnbm}
            </Text>
          </View>

          {/* Row I */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "42%" }}>
              I. Impor/perolehan digunggung dan tidak terutang PPN
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>
              {data.detail_spt.cl_2i_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>-</Text>
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
            <Text style={{ width: "42%", fontWeight: "bold" }}>
              J. Jumlah Perolehan (II.A + ... + II.I)
            </Text>
            <Text
              style={{ width: "18%", textAlign: "right", fontWeight: "bold" }}
            >
              {data.detail_spt.cl_2j_dpp}
            </Text>
            <Text style={{ width: "18%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>-</Text>
            <Text style={{ width: "11%", textAlign: "right" }}>-</Text>
          </View>
        </View>

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
            <Text style={{ width: "70%" }}>Uraian</Text>
            <Text style={{ width: "30%", textAlign: "right" }}>
              PPN (Rupiah)
            </Text>
          </View>

          {/* Rows A–G */}
          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "70%" }}>
              A. Pajak Keluaran yang harus dipungut sendiri (I.A.2 + I.A.3 +
              I.A.4 + I.A.5)
            </Text>
            <Text style={{ width: "30%", textAlign: "right" }}>
              {data.detail_spt.cl_3a_ppn}
            </Text>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "70%" }}>
              B. PPN Disetor di muka dalam masa pajak yang sama
            </Text>
            <Text style={{ width: "30%", textAlign: "right" }}>
              {data.detail_spt.cl_3b_ppn}
            </Text>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "70%" }}>
              C. Pajak Masukan yang dapat diperhitungkan (II.G)
            </Text>
            <Text style={{ width: "30%", textAlign: "right" }}>
              {data.detail_spt.cl_3c_ppn}
            </Text>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "70%" }}>
              D. Kelebihan pemungutan PPN oleh Pemungut PPN
            </Text>
            <Text style={{ width: "30%", textAlign: "right" }}>
              {data.detail_spt.cl_3d_ppn}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingVertical: 4,
              borderTopWidth: 1,
              fontWeight: "bold",
            }}
          >
            <Text style={{ width: "70%" }}>
              E. PPN kurang atau (lebih) bayar (III.A - III.B - III.C - III.D)
            </Text>
            <Text style={{ width: "30%", textAlign: "right" }}>
              {data.detail_spt.cl_3e_ppn}
            </Text>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "70%" }}>
              F. PPN kurang atau (lebih) bayar pada SPT yang dibetulkan
              sebelumnya
            </Text>
            <Text style={{ width: "30%", textAlign: "right" }}>
              {data.detail_spt.cl_3f_ppn}
            </Text>
          </View>

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "70%" }}>
              G. PPN kurang atau (lebih) bayar karena pembetulan SPT (III.E –
              III.F)
            </Text>
            <Text style={{ width: "30%", textAlign: "right" }}>
              {data.detail_spt.cl_3g_ppn}
            </Text>
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

        <View style={{ marginTop: 10 }}>
          {/* IV */}
          <Text style={{ fontWeight: "bold", fontSize: 10, marginBottom: 4 }}>
            IV. PPN TERUTANG ATAS KEGIATAN MEMBANGUN SENDIRI
          </Text>
          <View style={styles.tableRow}>
            <Text style={{ width: "80%" }}>PPN Terutang</Text>
            <Text style={{ width: "20%", textAlign: "right" }}>
              {data.detail_spt.cl_4_ppn_terutang_dpp}
            </Text>
            <Text style={{ width: "20%", textAlign: "right" }}>
              {data.detail_spt.cl_4_ppn_terutang}
            </Text>
          </View>

          {/* V */}
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
            <Text style={{ width: "80%" }}>PPN Yang Wajib Dibayar Kembali</Text>
            <Text style={{ width: "20%", textAlign: "right" }}>
              {data.detail_spt.cl_5_ppn_wajib}
            </Text>
          </View>

          {/* VI */}
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
          <View style={styles.tableHeader}>
            <Text style={{ width: "80%" }}>Uraian</Text>
            <Text style={{ width: "20%", textAlign: "right" }}>PPnBM (Rp)</Text>
          </View>

          {[
            [
              "A. PPnBM yang harus dipungut sendiri (I.A.2 + I.A.3 + I.A.4 + I.A.5)",
              data.detail_spt.cl_6a_ppnbm,
            ],
            [
              "B. Kelebihan pemungutan PPnBM oleh Pemungut PPN",
              data.detail_spt.cl_6b_ppnbm,
            ],
            [
              "C. PPnBM kurang atau (lebih) bayar (VIA - VIB)",
              data.detail_spt.cl_6c_ppnbm,
            ],
            [
              "D. PPnBM kurang atau (lebih) bayar SPT dibetulkan sebelumnya",
              data.detail_spt.cl_6d_ppnbm,
            ],
            [
              "E. PPnBM kurang atau (lebih) bayar karena pembetulan (VIC - VID)",
              data.detail_spt.cl_6e_ppnbm,
            ],
          ].map(([desc, val], idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={{ width: "80%" }}>{desc}</Text>
              <Text style={{ width: "20%", textAlign: "right" }}>{val}</Text>
            </View>
          ))}

          <View style={{ flexDirection: "row", paddingVertical: 2 }}>
            <Text style={{ width: "80%" }}>
              ☐ diminta pengembalian pajak yang tidak seharusnya terutang
            </Text>
            <Text style={{ width: "20%" }}></Text>
          </View>

          {/* VII */}
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

          <View style={styles.tableHeader}>
            <Text style={{ width: "40%" }}>Uraian</Text>
            <Text style={{ width: "15%", textAlign: "right" }}>Harga Jual</Text>
            <Text style={{ width: "15%", textAlign: "right" }}>
              DPP Nilai Lain
            </Text>
            <Text style={{ width: "15%", textAlign: "right" }}>PPN</Text>
            <Text style={{ width: "15%", textAlign: "right" }}>PPnBM</Text>
          </View>

          {[
            [
              "A. Jumlah PPN dan PPnBM yang dipungut",
              [
                data.detail_spt.cl_7a_dpp,
                data.detail_spt.cl_7a_dpp_lain,
                data.detail_spt.cl_7a_ppn,
                data.detail_spt.cl_7a_ppnbm,
              ],
            ],
            [
              "B. PPN dan PPnBM kurang atau (lebih) bayar pada SPT yang dibetulkan",
              [
                data.detail_spt.cl_7b_dpp,
                data.detail_spt.cl_7b_dpp_lain,
                data.detail_spt.cl_7b_ppn,
                data.detail_spt.cl_7b_ppnbm,
              ],
            ],
            [
              "C. PPN dan PPnBM kurang atau (lebih) bayar karena pembetulan (VII.A - VII.B)",
              [
                data.detail_spt.cl_7c_dpp,
                data.detail_spt.cl_7c_dpp_lain,
                data.detail_spt.cl_7c_ppn,
                data.detail_spt.cl_7c_ppnbm,
              ],
            ],
          ].map(([desc, values], idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={{ width: "40%" }}>{desc}</Text>
              {values.map((v, i) => (
                <Text key={i} style={{ width: "15%", textAlign: "right" }}>
                  {v}
                </Text>
              ))}
            </View>
          ))}
        </View>
        {/* VIII */}
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

        <View style={styles.tableHeader}>
          <Text style={{ width: "40%" }}>Uraian</Text>
          <Text style={{ width: "15%", textAlign: "right" }}>Harga Jual</Text>
          <Text style={{ width: "15%", textAlign: "right" }}>
            DPP Nilai Lain
          </Text>
          <Text style={{ width: "15%", textAlign: "right" }}>PPN</Text>
          <Text style={{ width: "15%", textAlign: "right" }}>PPnBM</Text>
        </View>

        {[
          [
            "A. Jumlah PPN dan PPnBM yang dipungut",
            [
              data.detail_spt.cl_8a_dpp,
              data.detail_spt.cl_8a_dpp_lain,
              data.detail_spt.cl_8a_ppn,
              data.detail_spt.cl_8a_ppnbm,
            ],
          ],
          [
            "B. PPN dan PPnBM kurang atau (lebih) bayar pada SPT yang dibetulkan",
            [
              data.detail_spt.cl_8b_dpp,
              data.detail_spt.cl_8b_dpp_lain,
              data.detail_spt.cl_8b_ppn,
              data.detail_spt.cl_8b_ppnbm,
            ],
          ],
          [
            "C. PPN dan PPnBM kurang atau (lebih) bayar karena pembetulan (VIII.A - VIII.B)",
            [
              data.detail_spt.cl_8c_dpp,
              data.detail_spt.cl_8c_dpp_lain,
              data.detail_spt.cl_8c_ppn,
              data.detail_spt.cl_8c_ppnbm,
            ],
          ],
        ].map(([desc, values], idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={{ width: "40%" }}>{desc}</Text>
            {values.map((v, i) => (
              <Text key={i} style={{ width: "15%", textAlign: "right" }}>
                {v}
              </Text>
            ))}
          </View>
        ))}

        <View style={styles.tableRow}>
          <Text style={{ width: "40%" }}>
            D. ☐ diminta pengembalian pajak yang tidak seharusnya terutang
          </Text>
          <Text style={{ width: "15%" }} />
          <Text style={{ width: "15%" }} />
          <Text style={{ width: "15%" }} />
          <Text style={{ width: "15%" }} />
        </View>

        {/* IX */}
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
          <Text>
            ☑ 1. Dokumen Daftar Rincian Penyerahan Kendaraan Bermotor.
          </Text>
          <Text>
            ☑ 2. Hasil Penghitungan Kembali Pajak Masukan yang Telah
            Dikreditkan.
          </Text>
        </View>

        {/* Pernyataan */}
        <Text style={{ fontSize: 9, marginTop: 12 }}>
          <Text style={{ fontWeight: "bold" }}>PERNYATAAN{"\n"}</Text>
          Dengan menyadari sepenuhnya akan segala akibatnya termasuk
          sanksi-sanksi sesuai dengan ketentuan perundang-undangan yang berlaku,
          Saya menyatakan bahwa apa yang telah Saya beritahukan di atas adalah
          benar, lengkap, dan jelas.
        </Text>

        {/* III. Penghitungan PPN */}
        {/* <Text style={styles.sectionTitle}>III. PENGHITUNGAN PPN</Text>
        <View style={styles.row}>
          <Text style={styles.label}>A. Pajak Keluaran</Text>
          <Text style={styles.value}>{s("cl_1a2_ppn")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>C. Pajak Masukan</Text>
          <Text style={styles.value}>{s("cl_2b_ppn")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>E. PPN Kurang / Lebih Bayar</Text>
          <Text style={styles.value}>{s("cl_3d_ppn")}</Text>
        </View> */}

        {/* VI. PPnBM */}
        {/* <Text style={styles.sectionTitle}>
          VI. PAJAK PENJUALAN ATAS BARANG MEWAH
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>A. PPnBM Dipungut Sendiri</Text>
          <Text style={styles.value}>{s("cl_1a2_ppnbm")}</Text>
        </View> */}

        {/* IX. Pernyataan */}
        {/* <Text style={styles.sectionTitle}>IX. PERNYATAAN</Text>
        <Text style={styles.statement}>
          Dengan menyadari sepenuhnya atas segala akibatnya, termasuk sanksi
          sesuai ketentuan yang berlaku, saya menyatakan bahwa apa yang saya
          laporkan adalah benar, lengkap, dan jelas.
        </Text>

        <View style={styles.signature}>
          <Text>
            {data.kota_badan ?? "KOTA"}, {data.tanggal_dibuat}
          </Text>
          <Text style={{ marginTop: 20 }}>{data.nama_pic}</Text>
          <Text>Ditandatangani secara elektronik</Text>
        </View>

        <Text style={styles.footer}>
          Dokumen ini telah dibubuhi sertifikat elektronik. Verifikasi
          keasliannya di https://tte.kominfo.go.id/verifyPDF
        </Text> */}
      </Page>
    </Document>
  );
};

export default SptPpnPdf;
