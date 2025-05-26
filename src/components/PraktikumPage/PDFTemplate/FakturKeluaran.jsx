// FakturPajakPDF.js
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 20,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 2,
  },
  label: {
    width: "30%",
    fontWeight: "bold",
  },
  value: {
    width: "70%",
  },
  box: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginBottom: 5,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: 1,
    borderTop: 1,
    fontWeight: "bold",
    padding: 3,
  },
  tableRow: {
    flexDirection: "row",
    padding: 3,
  },
  cell: {
    flex: 1,
    paddingRight: 5,
  },
  signature: {
    marginTop: 20,
    alignItems: "flex-end",
    textAlign: "right",
  },
  textRight: {
    textAlign: "right",
  },
});

// Component
export const PDFFakturKeluaran = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Faktur Pajak</Text>

      {/* Header Info */}
      <View style={styles.section}>
        <Text>Nama: KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN</Text>
        <Text>
          Alamat: PERUMAHAN PONDOK BLIMBING INDAH F4 NO.46, KOTA MALANG
        </Text>
        <Text>#093427400242900000001</Text>
      </View>

      <View style={styles.box}>
        <Text>Kode dan Nomor Seri Faktur Pajak: 04002500110910510</Text>
      </View>

      {/* Pengusaha Kena Pajak */}
      <View style={styles.box}>
        <Text style={{ fontWeight: "bold" }}>Pengusaha Kena Pajak:</Text>
        <Text>Nama: KANTOR AKUNTAN PUBLIK MOH WILDAN DAN ADI DARMAWAN</Text>
        <Text>
          Alamat: JL SOEKARNO HATTA NO.606, RT 001, RW 001, SEKEJATI, BUAHBATU,
          KOTA BANDUNG, JAWA BARAT 40286
        </Text>
        <Text>NPWP: 0934274002429000</Text>
      </View>

      {/* Pembeli */}
      <View style={styles.box}>
        <Text style={{ fontWeight: "bold" }}>
          Pembeli Barang Kena Pajak/Penerima Jasa Kena Pajak:
        </Text>
        <Text>Nama: SUMBER REJEKI TRANSJAYA</Text>
        <Text>
          Alamat: JL TANJUNG LAYAR E NO.04, RT 001, RW 011, PERAK BARAT,
          KREMBANGAN, KOTA SURABAYA, JAWA TIMUR 60177
        </Text>
        <Text>NPWP: 0017060815631000</Text>
        <Text>Email: pt.sumberrejekitrans@yahoo.com</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ ...styles.cell, flex: 0.5 }}>No.</Text>
        <Text style={{ ...styles.cell, flex: 1 }}>Kode Barang/Jasa</Text>
        <Text style={styles.cell}>
          Nama Barang Kena Pajak / Jasa Kena Pajak
        </Text>
        <Text style={styles.cell}>
          Harga Jual / Penggantian / Uang Muka / Termin (Rp)
        </Text>
      </View>

      {/* Table Row */}
      <View style={styles.tableRow}>
        <Text style={{ ...styles.cell, flex: 0.5 }}>1</Text>
        <Text style={{ ...styles.cell, flex: 1 }}>000000</Text>
        <Text style={styles.cell}>
          Jasa Audit 2024 Termin II{"\n"}
          Rp 7.882.883,00 x 1,00 Kegiatan{"\n"}
          Potongan Harga = Rp 0,00{"\n"}
          PPnBM (0,00%) = Rp 0,00
        </Text>
        <Text style={styles.cell}>7.882.883,00</Text>
      </View>

      {/* Summary */}
      <View style={styles.box}>
        <Text>
          Harga Jual / Penggantian / Uang Muka / Termin: Rp 7.882.883,00
        </Text>
        <Text>Dikurangi Potongan Harga: Rp 0,00</Text>
        <Text>Dikurangi Uang Muka yang telah diterima: Rp 0,00</Text>
        <Text>Dasar Pengenaan Pajak: Rp 7.225.976,00</Text>
        <Text>Jumlah PPN (Pajak Pertambahan Nilai): Rp 867.117,00</Text>
        <Text>Jumlah PPnBM (Pajak Penjualan atas Barang Mewah): Rp 0,00</Text>
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <Text>KOTA MALANG, 21 April 2025</Text>
        <Text style={{ marginTop: 20 }}>ADI DARMAWAN ERVANTO</Text>
        <Text>Ditandatangani secara elektronik</Text>
      </View>

      {/* Footer */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 7 }}>
          Pemberitahuan: Faktur Pajak ini telah dilaporkan ke Direktorat
          Jenderal Pajak...
        </Text>
      </View>
    </Page>
  </Document>
);

export default PDFFakturKeluaran;
