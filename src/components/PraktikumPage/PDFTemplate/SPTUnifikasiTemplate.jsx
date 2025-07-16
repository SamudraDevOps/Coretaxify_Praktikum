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
function formatRupiah(value) {
  const numberString = value?.toString().replace(/[^0-9]/g, "") || "0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numberString || 0);
}
const SPTUnifikasiPDF = ({ data }) => {
  // const dataRows = [
  //   [
  //     "1",
  //     "PPh Pasal 4 ayat 2",
  //     data?.detail_spt?.cl_a_pasal4,
  //     data?.detail_spt?.cl_b_pasal4,
  //     data?.detail_spt?.cl_c_pasal4,
  //     data?.detail_spt?.cl_d_pasal4,
  //     "0",
  //     "0",
  //   ],

  //   [
  //     "2",
  //     "PPh Pasal 15",
  //     data?.detail_spt?.cl_a_pasal15,
  //     data?.detail_spt?.cl_b_pasal15,
  //     data?.detail_spt?.cl_c_pasal15,
  //     data?.detail_spt?.cl_d_pasal15,
  //     "0",
  //     "0",
  //   ],
  //   // [
  //   //   "3",
  //   //   "PPh Pasal 21",
  //   //   data?.detail_spt?.cl_a_pasal21,
  //   //   data?.detail_spt?.cl_b_pasal21,
  //   //   data?.detail_spt?.cl_c_pasal21,
  //   //   data?.detail_spt?.cl_d_pasal21,
  //   //   "0",
  //   //   "0",
  //   // ],
  //   [
  //     "3",
  //     "PPh Pasal 22",
  //     data?.detail_spt?.cl_a_pasal22,
  //     data?.detail_spt?.cl_b_pasal22,
  //     data?.detail_spt?.cl_c_pasal22,
  //     data?.detail_spt?.cl_d_pasal22,
  //     "0",
  //     "0",
  //   ],
  //   [
  //     "4",
  //     "PPh Pasal 26",
  //     data?.detail_spt?.cl_a_pasal26,
  //     data?.detail_spt?.cl_b_pasal26,
  //     data?.detail_spt?.cl_c_pasal26,
  //     data?.detail_spt?.cl_d_pasal26,
  //     "0",
  //     "0",
  //   ],
  //   [
  //     "6",
  //     "Total Pajak Penghasilan",
  //     String(
  //       (
  //         parseFloat(data?.detail_spt?.cl_a_pasal4 || 0) +
  //         parseFloat(data?.detail_spt?.cl_a_pasal15 || 0)
  //       ).toFixed(3)
  //     ),
  //     String(
  //       (
  //         parseFloat(data?.detail_spt?.cl_b_pasal4 || 0) +
  //         parseFloat(data?.detail_spt?.cl_b_pasal15 || 0)
  //       ).toFixed(3)
  //     ),
  //     String(
  //       (
  //         parseFloat(data?.detail_spt?.cl_c_pasal4 || 0) +
  //         parseFloat(data?.detail_spt?.cl_c_pasal15 || 0)
  //       ).toFixed(3)
  //     ),
  //     String(
  //       (
  //         parseFloat(data?.detail_spt?.cl_d_pasal4 || 0) +
  //         parseFloat(data?.detail_spt?.cl_d_pasal15 || 0)
  //       ).toFixed(3)
  //     ),
  //     String(
  //       (
  //         parseFloat(data?.detail_spt?.cl_d_pasal4 || 0) +
  //         parseFloat(data?.detail_spt?.cl_d_pasal15 || 0)
  //       ).toFixed(3)
  //     ),
  //     "0",
  //   ],
  // ];
  const dataRows = [
    // PPh Pasal 4 Ayat 2
    [
      "1",
      "Pasal 4 Ayat 2",
      formatRupiah(data?.detail_spt?.cl_a_pasal4),
      formatRupiah(data?.detail_spt?.cl_b_pasal4),
      formatRupiah(data?.detail_spt?.cl_c_pasal4),
      formatRupiah(data?.detail_spt?.cl_d_pasal4),
      "0",
      "0",
    ],
    [
      "",
      "KJS411128-100",
      formatRupiah(data?.detail_spt?.cl_a_1),
      formatRupiah(data?.detail_spt?.cl_b_1),
      formatRupiah(data?.detail_spt?.cl_c_1),
      formatRupiah(data?.detail_spt?.cl_d_1),
      "0",
      "0",
    ],
    [
      "",
      "KJS411128-402",
      formatRupiah(data?.detail_spt?.cl_a_2),
      formatRupiah(data?.detail_spt?.cl_b_2),
      formatRupiah(data?.detail_spt?.cl_c_2),
      formatRupiah(data?.detail_spt?.cl_d_2),
      "0",
      "0",
    ],
    [
      "",
      "KJS411128-403",
      formatRupiah(data?.detail_spt?.cl_a_3),
      formatRupiah(data?.detail_spt?.cl_b_3),
      formatRupiah(data?.detail_spt?.cl_c_3),
      formatRupiah(data?.detail_spt?.cl_d_3),
      "0",
      "0",
    ],

    // PPh Pasal 15
    [
      "2",
      "Pasal 15",
      formatRupiah(data?.detail_spt?.cl_a_pasal15),
      formatRupiah(data?.detail_spt?.cl_b_pasal15),
      formatRupiah(data?.detail_spt?.cl_c_pasal15),
      formatRupiah(data?.detail_spt?.cl_d_pasal15),
      "0",
      "0",
    ],
    [
      "",
      "KJS411128-600",
      formatRupiah(data?.detail_spt?.cl_a_4),
      formatRupiah(data?.detail_spt?.cl_b_4),
      formatRupiah(data?.detail_spt?.cl_c_4),
      formatRupiah(data?.detail_spt?.cl_d_4),
      "0",
      "0",
    ],
    [
      "",
      "KJS411129-600",
      formatRupiah(data?.detail_spt?.cl_a_5),
      formatRupiah(data?.detail_spt?.cl_b_5),
      formatRupiah(data?.detail_spt?.cl_c_5),
      formatRupiah(data?.detail_spt?.cl_d_5),
      "0",
      "0",
    ],

    // PPh Pasal 22
    [
      "3",
      "Pasal 22",
      formatRupiah(data?.detail_spt?.cl_a_pasal22),
      formatRupiah(data?.detail_spt?.cl_b_pasal22),
      formatRupiah(data?.detail_spt?.cl_c_pasal22),
      formatRupiah(data?.detail_spt?.cl_d_pasal22),
      "0",
      "0",
    ],
    [
      "",
      "KJS411122-100",
      formatRupiah(data?.detail_spt?.cl_a_6),
      formatRupiah(data?.detail_spt?.cl_b_6),
      formatRupiah(data?.detail_spt?.cl_c_6),
      formatRupiah(data?.detail_spt?.cl_d_6),
      "0",
      "0",
    ],
    [
      "",
      "KJS411122-900",
      formatRupiah(data?.detail_spt?.cl_a_7),
      formatRupiah(data?.detail_spt?.cl_b_7),
      formatRupiah(data?.detail_spt?.cl_c_7),
      formatRupiah(data?.detail_spt?.cl_d_7),
      "0",
      "0",
    ],
    [
      "",
      "KJS411122-910",
      formatRupiah(data?.detail_spt?.cl_a_8),
      formatRupiah(data?.detail_spt?.cl_b_8),
      formatRupiah(data?.detail_spt?.cl_c_8),
      formatRupiah(data?.detail_spt?.cl_d_8),
      "0",
      "0",
    ],

    // PPh Pasal 23
    [
      "4",
      "Pasal 23",
      formatRupiah(data?.detail_spt?.cl_a_pasal23),
      formatRupiah(data?.detail_spt?.cl_b_pasal23),
      formatRupiah(data?.detail_spt?.cl_c_pasal23),
      formatRupiah(data?.detail_spt?.cl_d_pasal23),
      "0",
      "0",
    ],
    [
      "",
      "KJS411124-100",
      formatRupiah(data?.detail_spt?.cl_a_9),
      formatRupiah(data?.detail_spt?.cl_b_9),
      formatRupiah(data?.detail_spt?.cl_c_9),
      formatRupiah(data?.detail_spt?.cl_d_9),
      "0",
      "0",
    ],

    // PPh Pasal 26
    [
      "5",
      "Pasal 26",
      formatRupiah(data?.detail_spt?.cl_a_pasal26),
      formatRupiah(data?.detail_spt?.cl_b_pasal26),
      formatRupiah(data?.detail_spt?.cl_c_pasal26),
      formatRupiah(data?.detail_spt?.cl_d_pasal26),
      "0",
      "0",
    ],
    [
      "",
      "KJS411127-110",
      formatRupiah(data?.detail_spt?.cl_a_10),
      formatRupiah(data?.detail_spt?.cl_b_10),
      formatRupiah(data?.detail_spt?.cl_c_10),
      formatRupiah(data?.detail_spt?.cl_d_10),
      "0",
      "0",
    ],

    // Total Row
    [
      "",
      "TOTAL OF INCOME TAX",
      formatRupiah(data?.detail_spt?.cl_total_setor),
      formatRupiah(data?.detail_spt?.cl_total_potong),
      formatRupiah(data?.detail_spt?.cl_total_tanggung),
      formatRupiah(data?.detail_spt?.cl_total_bayar),
      "0",
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
