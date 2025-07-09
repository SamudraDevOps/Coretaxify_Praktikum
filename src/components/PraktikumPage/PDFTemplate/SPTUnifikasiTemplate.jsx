// MyUnifikasiPDF.js
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 8,
  },
  header: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    border: "1px solid black",
    padding: 3,
    textAlign: "center",
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#ddd",
  },
  text: {
    marginBottom: 2,
  },
  bold: {
    fontWeight: "bold",
  },
  signature: {
    marginTop: 10,
  },
});

// Table columns config
const columnWidths = ["5%", "20%", "12%", "12%", "12%", "12%", "12%", "15%"];

// Main Document Component
const SPTUnifikasiPDF = ({ data }) => {
  const dataRows = [
    [
      "1",
      "PPh Pasal 4 ayat 2",
      data?.detail_spt?.cl_a_pasal4,
      data?.detail_spt?.cl_b_pasal4,
      data?.detail_spt?.cl_c_pasal4,
      data?.detail_spt?.cl_d_pasal4,
      "0",
      "0",
    ],

    [
      "2",
      "PPh Pasal 15",
      data?.detail_spt?.cl_a_pasal15,
      data?.detail_spt?.cl_b_pasal15,
      data?.detail_spt?.cl_c_pasal15,
      data?.detail_spt?.cl_d_pasal15,
      "0",
      "0",
    ],
    // [
    //   "3",
    //   "PPh Pasal 21",
    //   data?.detail_spt?.cl_a_pasal21,
    //   data?.detail_spt?.cl_b_pasal21,
    //   data?.detail_spt?.cl_c_pasal21,
    //   data?.detail_spt?.cl_d_pasal21,
    //   "0",
    //   "0",
    // ],
    [
      "3",
      "PPh Pasal 22",
      data?.detail_spt?.cl_a_pasal22,
      data?.detail_spt?.cl_b_pasal22,
      data?.detail_spt?.cl_c_pasal22,
      data?.detail_spt?.cl_d_pasal22,
      "0",
      "0",
    ],
    [
      "4",
      "PPh Pasal 26",
      data?.detail_spt?.cl_a_pasal26,
      data?.detail_spt?.cl_b_pasal26,
      data?.detail_spt?.cl_c_pasal26,
      data?.detail_spt?.cl_d_pasal26,
      "0",
      "0",
    ],
    [
      "6",
      "Total Pajak Penghasilan",
      String(
        (
          parseFloat(data?.detail_spt?.cl_a_pasal4 || 0) +
          parseFloat(data?.detail_spt?.cl_a_pasal15 || 0)
        ).toFixed(3)
      ),
      String(
        (
          parseFloat(data?.detail_spt?.cl_b_pasal4 || 0) +
          parseFloat(data?.detail_spt?.cl_b_pasal15 || 0)
        ).toFixed(3)
      ),
      String(
        (
          parseFloat(data?.detail_spt?.cl_c_pasal4 || 0) +
          parseFloat(data?.detail_spt?.cl_c_pasal15 || 0)
        ).toFixed(3)
      ),
      String(
        (
          parseFloat(data?.detail_spt?.cl_d_pasal4 || 0) +
          parseFloat(data?.detail_spt?.cl_d_pasal15 || 0)
        ).toFixed(3)
      ),
      String(
        (
          parseFloat(data?.detail_spt?.cl_d_pasal4 || 0) +
          parseFloat(data?.detail_spt?.cl_d_pasal15 || 0)
        ).toFixed(3)
      ),
      "0",
    ],
  ];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>
          SURAT PEMBERITAHUAN MASA PPH UNIFIKASI
        </Text>

        <View style={styles.section}>
          <Text style={styles.bold}>
            MASA PAJAK: {data?.masa_bulan} {data?.masa_tahun}
          </Text>
          <Text style={styles.bold}>STATUS SPT: {data?.status}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>
            A. IDENTITAS PEMOTONG DAN/ATAU PEMUNGUT PPH
          </Text>
          <Text style={styles.text}>NPWP/NIK: {data?.npwp}</Text>
          <Text style={styles.text}>Nama: {data?.nama_pengusaha}</Text>
          <Text style={styles.text}>Alamat : {data?.alamat}</Text>
          <Text style={styles.text}>No. Telepon: {data?.telepon_seluler}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>B. PAJAK PENGHASILAN</Text>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              {[
                "NO",
                "DETIL",
                "PAJAK PENGHASILAN SETOR SENDIRI",
                "PEMOTONGAN DAN/ATAU PEMUNGUT PPH",
                "PPH YANG DITANGGUNG PEMERINTAH",
                "JUMLAH PPH YANG HARUS DISETOR",
                "JUMLAH PPH YANG TELAH DISETOR",
                "PPH KURANG (LEBIH) SETOR",
              ].map((col, i) => (
                <Text
                  key={i}
                  style={[styles.tableCol, { width: columnWidths[i] }]}
                >
                  {col}
                </Text>
              ))}
            </View>

            {dataRows.map((row, idx) => (
              <View key={idx} style={styles.tableRow}>
                {row.map((col, i) => (
                  <Text
                    key={i}
                    style={[styles.tableCol, { width: columnWidths[i] }]}
                  >
                    {col}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>PERNYATAAN DAN TANDA TANGAN</Text>
          <Text style={styles.text}>Nama: {data?.nama_pic}</Text>
          <Text style={styles.text}>Tanggal: {data?.tanggal_dibuat}</Text>
          <Text style={styles.text}>
            Dengan menyadari sepenuhnya akan segala akibatnya termasuk
            sanksi-sanksi sesuai dengan ketentuan perundang-undangan yang
            berlaku, saya menyatakan bahwa apa yang telah saya beritahukan di
            atas beserta lampiran-lampirannya adalah benar, lengkap dan jelas
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default SPTUnifikasiPDF;
