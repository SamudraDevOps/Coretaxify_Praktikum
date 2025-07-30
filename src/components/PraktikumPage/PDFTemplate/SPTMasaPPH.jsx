import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import kopImage from "../../../assets/images/KOP/PPh 21_26.png";
import qrImage from "../../../assets/images/qr-web.png";

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 30,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  header: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
    fontSize: 10,
    borderBottom: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 2,
  },
  label: {
    width: "40%",
    fontWeight: "bold",
  },
  value: {
    width: "60%",
  },
  tableHeader: {
    flexDirection: "row",
    fontWeight: "bold",
    marginBottom: 2,
    borderBottom: 1,
    paddingBottom: 1,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 1,
  },
  cell: {
    flex: 1,
  },
  signature: {
    marginTop: 10,
  },
  disclaimer: {
    fontSize: 8,
    marginTop: 8,
    fontStyle: "italic",
  },
});

const SptMasaPph21Pdf = ({ data }) => {
  console.log("pdf data : ", data);
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
        {/* <Text style={styles.header}>SAMUDERA EDUKASI</Text>
        <Text style={styles.subHeader}>TEKNOLOGI</Text>
        <Text style={styles.subHeader}>
          SURAT PEMBERITAHUAN (SPT) MASA{"\n"}
          PAJAK PENGHASILAN (PPh) PASAL 21 DAN/ATAU PASAL 26
        </Text> */}
        <View style={{ width: "100%", textAlign: "center" }}>
          <Image
            style={{ width: "100%", height: "auto", marginBottom: 5 }}
            src={kopImage}
          />
        </View>

        {/* <Text style={styles.sectionTitle}>INDUK</Text> */}
        {/* <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, fontWeight: "bold" }}>Masa Pajak</Text>
          <Text style={{ ...styles.cell, fontWeight: "bold" }}>
            Tahun Pajak
          </Text>
          <Text style={{ ...styles.cell, fontWeight: "bold" }}>Status</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>4</Text>
          <Text style={styles.cell}>2025</Text>
          <Text style={styles.cell}>NORMAL</Text>
        </View> */}
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
            <Text>Tahun Pajak</Text>
            <Text>{data.masa_tahun}</Text>
          </View>
          <View style={{ width: "33.3%", padding: 4 }}>
            <Text>Normal/Pembetulan</Text>
            <Text>{data.model}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>A. IDENTITAS PEMOTONG</Text>
        <View style={styles.row}>
          <Text style={styles.label}>NPWP/NIK</Text>
          <Text style={{ width: "2%" }}>:</Text>
          <Text style={{ width: "58%" }}>{data?.npwp}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nama</Text>
          <Text style={{ width: "2%" }}>:</Text>
          <Text style={{ width: "58%" }}>{data?.nama_pengusaha}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Alamat</Text>
          <Text style={{ width: "2%" }}>:</Text>
          <Text style={{ width: "58%" }}>{data?.alamat}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>No. Telepon</Text>
          <Text style={{ width: "2%" }}>:</Text>
          <Text style={{ width: "58%" }}>{data?.telepon_seluler}</Text>
        </View>

        <Text style={styles.sectionTitle}>B. PAJAK PENGHASILAN PASAL 21</Text>
        <Text>I. Pajak yang Dilakukan Pemotongan</Text>

        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Uraian</Text>
          <Text style={styles.cell}>KAP-KJS</Text>
          <Text style={styles.cell}>Jumlah (Rp)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>1. PPh 21 Dipotong</Text>
          <Text style={styles.cell}>411121-100</Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp1_1)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>2. Kelebihan Penyetoran</Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp1_2)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>3. SP2D (Instansi Pemerintah)</Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp1_3)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>4. Kurang/Lebih Disetor (1-2-3)</Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp1_4)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>5. SPT yang Dibetulkan</Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp1_5)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>6. Karena Pembetulan (4-5)</Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp1_6)}
          </Text>
        </View>

        <Text style={{ marginTop: 6 }}>II. Ditanggung Pemerintah</Text>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>1. PPh 21 Ditanggung Pemerintah</Text>
          <Text style={styles.cell}>411121-100</Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp1_7)}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>C. PAJAK PENGHASILAN PASAL 26</Text>
        <Text>I. Pemotongan</Text>

        <View style={styles.tableRow}>
          <Text style={styles.cell}>1. PPh 26 Dipotong</Text>
          <Text style={styles.cell}>411127-100</Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp2_1)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>2. Kelebihan Penyetoran</Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp2_2)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>3. SP2D (Instansi Pemerintah)</Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp2_3)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>4. Kurang/Lebih Disetor (1-2-3)</Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp2_4)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>5. SPT yang Dibetulkan</Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp2_5)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>6. Karena Pembetulan (4-5)</Text>
          <Text style={styles.cell}></Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp2_6)}
          </Text>
        </View>

        <Text style={{ marginTop: 6 }}>II. Ditanggung Pemerintah</Text>
        <View style={styles.tableRow}>
          <Text style={styles.cell}>1. PPh 26 Ditanggung Pemerintah</Text>
          <Text style={styles.cell}>411127-100</Text>
          <Text style={styles.cell}>
            {formatRupiah(data?.detail_spt?.cl_bp2_7)}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          D. PERNYATAAN DAN TANDA TANGAN PEMOTONG
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Wajib Pajak</Text>
          {/* <Text style={{ width: "2%" }}>:</Text>
          <Text style={{ width: "58%" }}>✔</Text> */}
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kuasa</Text>
          {/* <Text style={{ width: "2%" }}>:</Text>
          <Text style={{ width: "58%" }}></Text> */}
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nama</Text>
          <Text style={{ width: "2%" }}>:</Text>
          <Text style={{ width: "58%" }}>{data?.nama_pic}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tanggal</Text>
          <Text style={{ width: "2%" }}>:</Text>
          <Text style={{ width: "58%" }}>{data?.tanggal_dibuat}</Text>
        </View>
        <View style={{ width: "100%", textAlign: "center" }}>
          <Image
            style={{ width: "10%", height: "auto", marginBottom: 5 }}
            src={qrImage}
          />
        </View>

        <Text style={{ marginTop: 4 }}>
          Dengan menyadari sepenuhnya atas segala akibatnya termasuk
          sanksi-sanksi sesuai dengan ketentuan yang berlaku, saya menyatakan
          bahwa apa yang telah saya beritahukan di atas beserta
          lampiran-lampirannya adalah benar, lengkap dan jelas.
        </Text>

        {/* <View style={styles.signature}>
          <Text>Ditandatangani secara elektronik</Text>
        </View> */}

        {/* <Text style={styles.disclaimer}>
          Dokumen ini telah dibubuhkan sertifikat elektronik yang diterbitkan
          oleh BSrE-BSSN dan/atau PSrE. Tanggal: 2025-05-08T14:19:00+0700 |
          Jakarta-ID
        </Text> */}
      </Page>
    </Document>
  );
};
export default SptMasaPph21Pdf;
