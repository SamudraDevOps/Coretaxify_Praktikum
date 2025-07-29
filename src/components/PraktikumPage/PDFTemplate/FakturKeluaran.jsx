import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import kopImage from "../../../assets/images/KOP/FAKTURPAJAK.png";
import qrImage from "../../../assets/images/qr-web.png";

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
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    // marginTop: 10,
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

const FakturPajakKeluaranPdf = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Title */}
      {/* <Text style={styles.title}>Faktur Pajak</Text> */}
      <View style={{ width: "100%", textAlign: "center" }}>
        <Image
          style={{ width: "100%", height: "auto", marginBottom: 5 }}
          src={kopImage}
        />
      </View>

      {/* Penjual */}
      {/* <View style={styles.section}> */}
      <View style={styles.boxContainer}>
        <View style={styles.boxRow}>
          {/* Baris 1: Nama */}
          
            <Text style={styles.row}>Nama  : {data.akun_pengirim_id.nama_akun}</Text>
            {/* <Text style={styles.value}>{data.akun_pengirim_id.nama_akun}</Text> */}
            {/* </View> */}

            {/* Baris 2: Alamat */}
            {/* <View style={styles.boxRow}> */}
            <Text style={styles.row}>Alamat : {data.akun_pengirim_id.alamat_utama_akun}</Text>
            {/* <Text style={styles.value}>{data.akun_pengirim_id.alamat_utama_akun}</Text> */}
            {/* </View> */}

            {/* Baris 3: NPWP */}
            {/* <View style={styles.boxRow}> */}
            <Text style={styles.row}>NPWP : {data.akun_pengirim_id.npwp_akun} </Text>
            {/* <Text style={styles.value}>{data.akun_pengirim_id.npwp_akun}</Text> */}
          </View>
       
        {/* <View style={styles.boxRow}></View> */}
        <View style={styles.boxRow}>
          <Text style={styles.row}>Kode dan Nomor Seri Faktur Pajak : {data.nomor_faktur_pajak}</Text>
          {/* <Text style={styles.value}>{data.nomor_faktur_pajak}</Text> */}
        </View>
        {/* </View> */}

        {/* Faktur Code */}
        {/* <View style={styles.boxRow}>
          <Text>Kode dan Nomor Seri Faktur Pajak: 04002500110910510</Text>
        </View> */}

        <View style={styles.boxRow}>
          <Text style={{ fontWeight: "bold" }}>Pengusaha Kena Pajak:</Text>
          <Text>Nama: {data.akun_pengirim_id.nama_akun}</Text>
          <Text>Alamat: {data.akun_pengirim_id.alamat_utama_akun}</Text>
          <Text>NPWP: {data.akun_pengirim_id.npwp_akun}</Text>
        </View>

        <View style={styles.boxRowLast}>
          <Text style={{ fontWeight: "bold" }}>
            Pembeli Barang Kena Pajak / Penerima Jasa Kena Pajak:
          </Text>
          <Text>Nama: {data.akun_penerima_id.nama_akun}</Text>
          <Text>Alamat: {data.akun_penerima_id.alamat_utama_akun}</Text>
          <Text>NPWP: {data.akun_penerima_id.npwp_akun}</Text>
          <Text>NIK: -</Text>
          <Text>Nomor Paspor: -</Text>
          <Text>Identitas Lain: -</Text>
          <Text>Email: {data.akun_penerima_id.email_akun}</Text>
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
        <View style={styles.table}>
          {/* Table Header */}
          {/* <View style={styles.tableHeader}>
            <Text style={{ ...styles.cell, flex: 0.4 }}>No.</Text>
            <Text style={{ ...styles.cell, flex: 0.9 }}>Kode</Text>
            <Text style={{ ...styles.cell, flex: 2 }}>Nama Barang/Jasa</Text>
            <Text style={{ ...styles.cellLast, flex: 1 }}>Harga (Rp)</Text>
          </View> */}

          {/* Table Items - Dynamic mapping */}
          {data.detail_transaksi &&
            data.detail_transaksi.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={{ ...styles.cell, flex: 0.4 }}>{index + 1}</Text>
                <Text style={{ ...styles.cell, flex: 0.9 }}>{item.kode}</Text>
                <Text style={{ ...styles.cell, flex: 2 }}>
                  {item.nama}
                  {"\n"}
                  Rp{" "}
                  {(isNaN(parseFloat(item.harga_satuan))
                    ? 0
                    : parseFloat(item.harga_satuan)
                  ).toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  x {item.kuantitas} {item.satuan}
                  {"\n"}
                  Potongan Harga = Rp{" "}
                  {(isNaN(parseFloat(item.pemotongan_harga))
                    ? 0
                    : parseFloat(item.pemotongan_harga)
                  ).toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}
                  {"\n"}
                  PPnBM ({item.tarif_ppnbm}%) = Rp{" "}
                  {(isNaN(parseFloat(item.ppnbm))
                    ? 0
                    : parseFloat(item.ppnbm)
                  ).toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}
                </Text>
                <Text
                  style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}
                >
                  {(isNaN(parseFloat(item.total_harga))
                    ? 0
                    : parseFloat(item.total_harga)
                  ).toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            ))}

          {/* Summary Section - Calculate totals from detail_transaksi */}
          <View style={styles.tableRow}>
            <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
              Harga Jual / Penggantian / Uang Muka / Termin
            </Text>
            <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
              Rp{" "}
              {data.detail_transaksi
                ?.reduce((sum, item) => sum + parseFloat(item.total_harga), 0)
                .toLocaleString("id-ID", { minimumFractionDigits: 2 }) ||
                "0,00"}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
              Dikurangi Potongan Harga
            </Text>
            <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
              Rp{" "}
              {data.detail_transaksi
                ?.reduce(
                  (sum, item) =>
                    sum +
                    (isNaN(parseFloat(item.pemotongan_harga))
                      ? 0
                      : parseFloat(item.pemotongan_harga)),
                  0
                )
                .toLocaleString("id-ID", { minimumFractionDigits: 2 }) ||
                "0,00"}
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
              Rp{" "}
              {data.detail_transaksi
                ?.reduce((sum, item) => sum + parseFloat(item.dpp), 0)
                .toLocaleString("id-ID", { minimumFractionDigits: 2 }) ||
                "0,00"}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
              Jumlah PPN (Pajak Pertambahan Nilai)
            </Text>
            <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
              Rp{" "}
              {data.detail_transaksi
                ?.reduce((sum, item) => sum + parseFloat(item.ppn), 0)
                .toLocaleString("id-ID", { minimumFractionDigits: 2 }) ||
                "0,00"}
            </Text>
          </View>

          {/* <View style={styles.tableRowLast}>
            <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
              Jumlah PPnBM (Pajak Penjualan atas Barang Mewah)
            </Text>
            <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
              Rp{" "}
              {data.detail_transaksi
                ?.reduce((sum, item) => sum + parseFloat(item.ppnbm), 0)
                .toLocaleString("id-ID", { minimumFractionDigits: 2 }) ||
                "0,00"}
            </Text>
          </View> */}
        </View>

        {/* Summary Section - with left-aligned content but aligned borders */}
        {/* <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Harga Jual / Penggantian / Uang Muka / Termin
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            Rp 7.882.883,00
          </Text>
        </View> */}

        {/* <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Dikurangi Potongan Harga
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            Rp 0,00
          </Text>
        </View> */}

        {/* <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Dikurangi Uang Muka yang telah diterima
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            -
          </Text>
        </View> */}

        {/* <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Dasar Pengenaan Pajak
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            Rp 7.225.976,00
          </Text>
        </View> */}

        {/* <View style={styles.tableRow}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Jumlah PPN (Pajak Pertambahan Nilai)
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            Rp 867.117,00
          </Text>
        </View> */}

        {/* <View style={styles.tableRowLast}>
          <Text style={{ ...styles.cell, flex: 3.5, fontWeight: "bold" }}>
            Jumlah PPnBM (Pajak Penjualan atas Barang Mewah)
          </Text>
          <Text style={{ ...styles.cellLast, flex: 1, textAlign: "right" }}>
            Rp 0,00
          </Text>
        </View> */}
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <Text>Tanggal : {data.tanggal_faktur_pajak}</Text>
        <Text style={{ marginTop: 20 }}>{data.penandatangan}</Text>
        <Image
          style={{ width: "15%", height: "auto", marginBottom: 5 }}
          src={qrImage}
        />
        <Text>Ditandatangani secara elektronik</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          {/* Faktur Pajak ini telah dilaporkan ke Direktorat Jenderal Pajak dan
          telah memperoleh persetujuan sesuai dengan ketentuan peraturan
          perpajakan yang berlaku. */}
        </Text>
        <Text style={{ marginTop: 4 }}>
          {/* PERINGATAN: PKP yang membuat Faktur Pajak yang tidak sesuai dengan
          keadaan yang sebenarnya dikenai sanksi sesuai Pasal 14 ayat (4) UU
          KUP. */}
        </Text>
        {/* <Text style={{ marginTop: 4 }}>
          Tanggal proses digital: 2025-04-23T16:40:35+0700 (Jakarta-ID)
        </Text> */}
      </View>
    </Page>
  </Document>
);

export default FakturPajakKeluaranPdf;
