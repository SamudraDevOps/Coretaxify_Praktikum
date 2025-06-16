import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 30,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  header: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "bold",
  },
  subHeader: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 2,
  },
  contactInfo: {
    fontSize: 8,
    textAlign: "center",
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  fieldRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  fieldLabel: {
    width: "33%",
    fontWeight: "bold",
  },
  fieldColon: {
    width: "2%",
    fontWeight: "bold",
  },
  fieldValue: {
    width: "65%",
  },
  footer: {
    fontSize: 8,
    marginTop: 20,
    fontStyle: "italic",
  },
});

const BpeSptPdf = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>KEMENTERIAN KEUANGAN REPUBLIK INDONESIA</Text>
      <Text style={styles.subHeader}>DIREKTORAT JENDERAL PAJAK</Text>
      <Text style={styles.subHeader}>KANTOR WILAYAH DJP JAWA TIMUR III</Text>
      <Text style={styles.subHeader}>
        KANTOR PELAYANAN PAJAK PRATAMA MALANG SELATAN
      </Text>
      <Text style={styles.contactInfo}>
        JALAN MERDEKA UTARA NO. 3, MALANG, 65119 • TELP (0341) 361121, 361971,
        365167 • FAX (0341) 364407 • www.pajak.go.id
      </Text>
      <Text style={styles.contactInfo}>
        LAYANAN INFORMASI DAN PENGADUAN: KRING PAJAK (021)1500200 • SUREL:
        pengaduan@pajak.go.id, informasi@pajak.go.id
      </Text>

      {/* Title */}
      <Text style={{ ...styles.header, marginTop: 10 }}>
        BUKTI PENERIMAAN ELEKTRONIK
      </Text>

      {/* Nomor & Tanggal */}
      <View style={styles.section}>
        <Text>Nomor: BPE-11907/CT/KPP.1214/2025</Text>
        <Text>Tanggal: 08 Mei 2025</Text>
      </View>

      {/* Taxpayer Info */}
      <View style={styles.section}>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>NPWP</Text>
          <Text style={styles.fieldColon}>:</Text>
          <Text style={styles.fieldValue}>0127905768623000</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Nama Wajib Pajak</Text>
          <Text style={styles.fieldColon}>:</Text>
          <Text style={styles.fieldValue}>SAMUDRA EDUKASI TEKNOLOGI</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Jenis SPT</Text>
          <Text style={styles.fieldColon}>:</Text>
          <Text style={styles.fieldValue}>SPT Masa PPh Pasal 21/26</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Tahun Pajak</Text>
          <Text style={styles.fieldColon}>:</Text>
          <Text style={styles.fieldValue}>2025</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Masa Pajak</Text>
          <Text style={styles.fieldColon}>:</Text>
          <Text style={styles.fieldValue}>April 2025</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Status SPT</Text>
          <Text style={styles.fieldColon}>:</Text>
          <Text style={styles.fieldValue}>Normal</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Saluran</Text>
          <Text style={styles.fieldColon}>:</Text>
          <Text style={styles.fieldValue}>Portal Wajib Pajak</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Tanggal Terima SPT</Text>
          <Text style={styles.fieldColon}>:</Text>
          <Text style={styles.fieldValue}>08 Mei 2025</Text>
        </View>
      </View>

      {/* Disclaimer */}
      <Text style={styles.footer}>
        Sesuai dengan ketentuan peraturan perundang-undangan yang berlaku,
        dokumen ini diproses secara elektronik dan merupakan keputusan
        Direktorat Jenderal Pajak atau pejabat Direktorat Jenderal Pajak yang
        berwenang sehingga tidak diperlukan tanda tangan.
      </Text>

      <Text style={styles.footer}>Diterima pada: 2025-05-08T07:19:01+0000</Text>
    </Page>
  </Document>
);

export default BpeSptPdf;
