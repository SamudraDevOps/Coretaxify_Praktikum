import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 30,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 2,
  },
  label: {
    width: "35%",
    fontWeight: "bold",
  },
  value: {
    width: "65%",
  },
  box: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    // marginVertical: 0,
  },
  boxContainer: {
    borderWidth: 1,
    borderColor: "#000",
  },
  boxRow: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  boxRowLast: {
    padding: 5,
  },

  table: {
    display: "flex",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  cell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  cellLast: {
    padding: 5,
  },
  summaryLabel: {
    padding: 5,
    fontWeight: "bold",
  },
  signature: {
    marginTop: 15,
    alignItems: "flex-end",
    textAlign: "right",
  },
  footer: {
    marginTop: 10,
    fontSize: 8,
  },
});

const FakturPajakKeluaranPdf = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Title */}
      <Text style={styles.title}>Faktur Pajak</Text>

      {/* Penjual */}
      <View style={styles.section}>
        <Text style={styles.label}>Nama:</Text>
        <Text style={styles.value}>
          KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN
        </Text>
        <Text style={styles.label}>Alamat:</Text>
        <Text style={styles.value}>
          PERUMAHAN PONDOK BLIMBING INDAH F4 NO.46, KOTA MALANG
        </Text>
        <Text style={styles.label}>Nomor:</Text>
        <Text style={styles.value}>#0934274002429000000001</Text>
      </View>

      {/* Faktur Code */}
      <View style={styles.boxContainer}>
        <View style={styles.boxRow}>
          <Text>Kode dan Nomor Seri Faktur Pajak: 04002500110910510</Text>
        </View>

        <View style={styles.boxRow}>
          <Text style={{ fontWeight: "bold" }}>Pengusaha Kena Pajak:</Text>
          <Text>Nama: KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN</Text>
          <Text>
            Alamat: JL SOEKARNO HATTA NO.606, RT 001, RW 001, SEKEJATI,
            BUAHBATU, KOTA BANDUNG, JAWA BARAT 40286
          </Text>
          <Text>NPWP: 0934274002429000</Text>
        </View>

        <View style={styles.boxRowLast}>
          <Text style={{ fontWeight: "bold" }}>
            Pembeli Barang Kena Pajak / Penerima Jasa Kena Pajak:
          </Text>
          <Text>Nama: SUMBER REJEKI TRANSJAYA</Text>
          <Text>
            Alamat: JL TANJUNG LAYAR E NO.04, RT 001, RW 011, PERAK BARAT,
            KREMBANGAN, KOTA SURABAYA, JAWA TIMUR 60177
          </Text>
          <Text>NPWP: 0017060815631000</Text>
          <Text>NIK: -</Text>
          <Text>Nomor Paspor: -</Text>
          <Text>Identitas Lain: -</Text>
          <Text>Email: pt.sumberrejekitrans@yahoo.com</Text>
        </View>
      </View>

      {/* Item Table */}

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={{ ...styles.cell, flex: 0.4 }}>No.</Text>
          <Text style={{ ...styles.cell, flex: 0.9 }}>Kode</Text>
          <Text style={{ ...styles.cell, flex: 2 }}>Nama Barang/Jasa</Text>
          <Text style={{ ...styles.cellLast, flex: 1 }}>Harga (Rp)</Text>
        </View>

        {/* Table Items */}
        <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, flex: 0.4 }}>1</Text>
          <Text style={{ ...styles.cell, flex: 0.9 }}>000000</Text>
          <Text style={{ ...styles.cell, flex: 2 }}>
            Jasa Audit 2024 Termin II{"\n"}
            Rp 7.882.883,00 x 1,00 Kegiatan{"\n"}
            Potongan Harga = Rp 0,00{"\n"}
            PPnBM (0,00%) = Rp 0,00
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            7.882.883,00
          </Text>
        </View>

        {/* Summary Section - with left-aligned content but aligned borders */}
        <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Harga Jual / Penggantian / Uang Muka / Termin
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            Rp 7.882.883,00
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Dikurangi Potongan Harga
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            Rp 0,00
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Dikurangi Uang Muka yang telah diterima
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            -
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Dasar Pengenaan Pajak
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            Rp 7.225.976,00
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Jumlah PPN (Pajak Pertambahan Nilai)
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            Rp 867.117,00
          </Text>
        </View>

        <View style={styles.tableRowLast}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Jumlah PPnBM (Pajak Penjualan atas Barang Mewah)
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            Rp 0,00
          </Text>
        </View>
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <Text>KOTA MALANG, 21 April 2025</Text>
        <Text style={{ marginTop: 20 }}>ADI DARMAWAN ERVANTO</Text>
        <Text>Ditandatangani secara elektronik</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          Faktur Pajak ini telah dilaporkan ke Direktorat Jenderal Pajak dan
          telah memperoleh persetujuan sesuai dengan ketentuan peraturan
          perpajakan yang berlaku.
        </Text>
        <Text style={{ marginTop: 4 }}>
          PERINGATAN: PKP yang membuat Faktur Pajak yang tidak sesuai dengan
          keadaan yang sebenarnya dikenai sanksi sesuai Pasal 14 ayat (4) UU
          KUP.
        </Text>
        <Text style={{ marginTop: 4 }}>
          Tanggal proses digital: 2025-04-23T16:40:35+0700 (Jakarta-ID)
        </Text>
      </View>
    </Page>
  </Document>
);

export default FakturPajakKeluaranPdf;
