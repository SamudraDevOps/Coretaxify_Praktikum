import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 30,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    textAlign: "center",
    fontSize: 11,
    marginBottom: 15,
  },
  section: {
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
    padding: 8,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  billingCode: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  tableHeader: {
    flexDirection: "row",
    fontWeight: "bold",
    marginBottom: 3,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  cell: {
    flex: 1,
  },
  footer: {
    marginTop: 15,
    fontSize: 9,
    textAlign: "center",
    fontStyle: "italic",
  },
  rightAlignedSection: {
    flexDirection: "column",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  colon: {
    width: "2%",
    textAlign: "center",
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  tableHeaderCell: {
    flex: 1,
    padding: 4,
    textAlign: "center",
    fontWeight: "bold",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
  },
  tableCell: {
    flex: 1,
    padding: 4,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
  },
  lastCell: {
    borderRightWidth: 0,
  },
  totalRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    padding: 4,
    fontWeight: "bold",
  },
});

// Helper function to format currency
const formatCurrency = (value) => {
  if (!value || value === 0) return "Rp0";
  return `Rp${Number(value).toLocaleString("id-ID")}`;
};

// Helper function to convert number to words (Indonesian)
const numberToWords = (num) => {
  if (!num || num === 0) return "Nol Rupiah";
  // This is a simplified version - you might want to implement a full number-to-words converter
  return "Dua Puluh Ribu Rupiah"; // Placeholder
};

const BillingCodePdf = ({ data }) => {
  // Determine if data is array or single object
  const isArray = Array.isArray(data);
  const billingData = isArray ? data[0] : data; // Use first item for main billing info if array
  const detailItems = isArray ? data : [data]; // Convert single object to array for consistent processing

  // Calculate total
  const totalAmount = detailItems.reduce(
    (sum, item) => sum + (Number(item.nilai) || 0),
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>KEMENTERIAN KEUANGAN RI</Text>
        <Text style={styles.subHeader}>DIREKTORAT JENDERAL PAJAK</Text>

        {/* Billing Code */}
        <View style={styles.rightAlignedSection}>
          <Text style={{ fontWeight: "bold", fontSize: 11 }}>
            K O D E &nbsp; B I L L I N G
          </Text>
          <Text style={styles.billingCode}>{billingData.kode_billing}</Text>
        </View>

        {/* Taxpayer Info */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>NPWP</Text>
            <Text style={styles.value}>: {billingData.npwp}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>NAMA</Text>
            <Text style={styles.value}>: {billingData.nama}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>ALAMAT</Text>
            <Text style={styles.value}>: {billingData.alamat}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>MATA UANG</Text>
            <Text style={styles.value}>: IDR</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>NOMINAL</Text>
            <Text style={styles.value}>: {formatCurrency(totalAmount)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>JUMLAH DETAIL</Text>
            <Text style={styles.value}>: {detailItems.length}</Text>
          </View>
        </View>

        {/* Detail Billing */}
        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            DETAIL BILLING:
          </Text>

          <View style={styles.table}>
            {/* Table Header */}
            <View
              style={[
                styles.tableRow,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: "#000",
                  borderBottomStyle: "solid",
                  backgroundColor: "#f0f0f0",
                  minHeight: 22,
                  alignItems: "center",
                },
              ]}
            >
              <Text style={{ ...styles.tableHeaderCell, flex: 1.5 }}>
                KAP-KJS
              </Text>
              <Text style={styles.tableHeaderCell}>MASA PAJAK</Text>
              <Text style={styles.tableHeaderCell}>REF/TAGIHAN</Text>
              <Text style={styles.tableHeaderCell}>NOP</Text>
              <Text style={{ ...styles.tableHeaderCell, ...styles.lastCell }}>
                NOMINAL
              </Text>
            </View>

            {/* Table Rows - Loop through all items */}
            {detailItems.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "#000",
                    borderBottomStyle: "solid",
                    minHeight: 20,
                    alignItems: "center",
                  },
                ]}
              >
                <Text style={{ ...styles.tableCell, flex: 1.5 }}>
                  {item.kap_kjs_id}
                </Text>
                <Text style={styles.tableCell}>{item.masa_pajak}</Text>
                <Text style={styles.tableCell}>-</Text>
                <Text style={styles.tableCell}>-</Text>
                <Text style={{ ...styles.tableCell, ...styles.lastCell }}>
                  {formatCurrency(item.nilai)}
                </Text>
              </View>
            ))}
          </View>

          {/* Total Row - outside the table but aligned with it */}
          <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
            <View style={{ width: "75%" }}>
              <Text style={{ fontWeight: "bold", textAlign: "right" }}>
                TOTAL:
              </Text>
            </View>
            <View style={{ width: "25%" }}>
              <Text style={{ fontWeight: "bold", textAlign: "right" }}>
                {formatCurrency(totalAmount)}
              </Text>
            </View>
          </View>

          <Text style={{ marginTop: 5 }}>
            Terbilang: {numberToWords(totalAmount)}
          </Text>
        </View>

        {/* Instruction */}
        <Text style={{ fontWeight: "bold", marginBottom: 6 }}>URAIAN:</Text>
        <Text>
          GUNAKAN KODE BILLING DI BAWAH INI UNTUK MELAKUKAN PEMBAYARAN
        </Text>

        {/* Highlight Billing Code Box */}
        <View style={styles.box}>
          <Text>KODE BILLING</Text>
          <Text style={{ marginTop: 5 }}>{billingData.kode_billing}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Dokumen ini diproses secara elektronik oleh Direktorat Jenderal Pajak.
        </Text>
      </Page>
    </Document>
  );
};

export default BillingCodePdf;
