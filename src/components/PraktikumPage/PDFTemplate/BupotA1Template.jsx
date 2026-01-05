import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

import qrImage from "../../../assets/images/qr-web.png";
import kopImage from "../../../assets/images/KOP/BPA1.png";

// ================= Helpers =================
const formatRupiah = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(v || 0));

const formatDate = (v) => {
  if (!v) return "-";
  const d = new Date(v);
  if (isNaN(d)) return "-";
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
};

const formatMasaRange = (awal, akhir) => {
  if (!awal || !akhir) return "-";
  const a = new Date(awal);
  const b = new Date(akhir);
  if (isNaN(a) || isNaN(b)) return "-";
  return `${String(a.getMonth() + 1).padStart(2, "0")}-${a.getFullYear()}-${String(b.getMonth() + 1).padStart(2, "0")}-${b.getFullYear()}`;
};

// ================= Styles =================
const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 10, fontFamily: "Helvetica" },
  fixedTop: { position: "absolute", top: 24, left: 24, right: 24 },
  topSpacer: { height: 95 },
  kop: { width: "100%", marginBottom: 6 },

  titleCenter: { textAlign: "center", fontWeight: 700 },
  titleMain: { fontSize: 11, marginTop: 4 },
  titleSub: { fontSize: 10 },
  titleCode: { fontSize: 12, marginTop: 4 },

  metaRow: { flexDirection: "row", borderWidth: 1, borderColor: "#000", marginTop: 6 },
  metaCell: { flex: 1, padding: 6, borderRightWidth: 1 },
  metaLast: { borderRightWidth: 0 },
  metaLabel: { fontSize: 9, fontWeight: 700 },
  metaValue: { marginTop: 4, fontWeight: 700, textAlign: "center" },

  sectionTitle: { backgroundColor: "#003c82", color: "#fff", fontWeight: 700, padding: 6, marginTop: 10 },

  fieldRow: { flexDirection: "row", marginTop: 2 },
  fieldLabel: { width: 220 },
  fieldColon: { width: 10, textAlign: "center" },
  fieldValue: { flex: 1 },

  table: { borderWidth: 1, borderColor: "#000", marginTop: 6 },
  tr: { flexDirection: "row", borderBottomWidth: 1 },
  th: { padding: 4, fontWeight: 700, borderRightWidth: 1 },
  td: { padding: 4, borderRightWidth: 1 },
  lastCell: { borderRightWidth: 0 },
  right: { textAlign: "right" },

  italic: { fontStyle: "italic", color: "#777" },
  mt6: { marginTop: 6 },
  mt12: { marginTop: 12 },
});

const RowField = ({ label, value }) => (
  <View style={styles.fieldRow}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldColon}>:</Text>
    <Text style={styles.fieldValue}>{value}</Text>
  </View>
);

const HeaderFixed = ({ kop }) => (
  <View fixed style={styles.fixedTop}>
    {kop && <Image src={kop} style={styles.kop} />}
    {/* <Text style={[styles.titleCenter, styles.titleSub]}>KEMENTERIAN KEUANGAN REPUBLIK INDONESIA</Text>
    <Text style={[styles.titleCenter, styles.titleSub]}>DIREKTORAT JENDERAL PAJAK</Text>
    <Text style={[styles.titleCenter, styles.titleMain]}>BUKTI PEMOTONGAN PAJAK PENGHASILAN PASAL 21</Text>
    <Text style={[styles.titleCenter, styles.titleSub]}>
      BAGI PEGAWAI TETAP ATAU PENSIUNAN YANG MENERIMA UANG TERKAIT PENSIUN SECARA BERKALA
    </Text>
    <Text style={[styles.titleCenter, styles.titleCode]}>BPA1</Text> */}
  </View>
);

// ================= Main =================
const BPA1PDF = ({ data = {}, kopImage: kopProp, qrImage: qrProp }) => {
  const kop = kopProp || kopImage;
  const qr = qrProp || qrImage;

  const raw = data?.bupot_resource || data || {};
  const d = JSON.parse(raw);

  console.log(d);

  const brutoRows = [
    { no: 1, label: "Gaji/Pensiun atau THT/JHT", key: "gaji_pokok_pensiun" },
    { no: 2, label: "Tunjangan PPh", key: "tunjangan_pph" },
    { no: 3, label: "Tunjangan Lainnya, Uang Lembur dan Sebagainya", key: "tunjangan_lainnya" },
    { no: 4, label: "Honorarium dan Imbalan Lain Sejenisnya", key: "honorarium_imbalan_lainnya" },
    { no: 5, label: "Premi Asuransi yang Dibayar Pemberi Kerja", key: "premi_asuransi_pemberi_kerja" },
    { no: 6, label: "Penerimaan Natura yang Dikenakan PPh Pasal 21", key: "natura_pph_pasal_21" },
    { no: 7, label: "Tantiem, Bonus, Gratifikasi, Jasa Produksi dan THR", key: "tantiem_bonus_gratifikasi_jasa_thr" },
  ];

  const pengurangRows = [
    { no: 9, label: "Biaya Jabatan / Biaya Pensiun", key: "biaya_jabatan" },
    { no: 10, label: "Iuran Terkait Pensiun atau Hari Tua", key: "iuran_pensiun" },
    { no: 11, label: "Zakat Atau Sumbangan Keagamaan yang Bersifat Wajib yang Dibayarkan Melalui Pemberi Kerja", key: "sumbangan_keagamaan_pemberi_kerja" },
  ];

  const pphRows = [
    { no: 13, label: "Jumlah Penghasilan Neto (8 - 12)", key: "jumlah_penghasilan_neto" },
    { no: 14, label: "Penghasilan Neto dari Pemotongan Sebelumnya", key: "penghasilan_neto_sebelumnya" },
    { no: 15, label: "Jumlah Penghasilan Neto untuk Perhitungan PPh Pasal 21 (Setahun/Disetahunkan)", key: "penghasilan_neto_pph_pasal_21" },
    { no: 16, label: "Penghasilan Tidak Kena Pajak", key: "penghasilan_tidak_kena_pajak" },
    { no: 17, label: "Penghasilan Kena Pajak Setahun / Disetahunkan (15 - 16)", key: "penghasilan_kena_pajak" },
    { no: 18, label: "PPh Pasal 21 atas Penghasilan Kena Pajak Setahun/Disetahunkan", key: "pph_pasal_21_penghasilan_kena_pajak" },
    { no: 19, label: "PPh Pasal 21 Terutang", key: "pph_pasal_21_terutang" },
    { no: 20, label: "PPh Pasal 21 Dipotong Dari Bukti Pemotongan Sebelumnya", key: "pph_pasal_21_potongan_bpa1_sebelumnya" },
    { no: 21, label: "PPh Pasal 21 Terutang pada Bukti Pemotongan Ini (Dapat Dikreditkan Pada SPT Tahunan)", key: "pph_pasal_21_terutang_bupot_ini" },
    { no: 22, label: "PPh Pasal 21 yang Telah Dipotong / Ditanggung Pemerintah", key: "pph_pasal_21_ditanggung_pemerintah" },
    { no: 23, label: "PPh Pasal 21 Kurang (Lebih) Dipotong pada Masa Pajak Desember / Masa Pajak Terakhir (21 - 22)", key: "pph_pasal_21_masa_pajak_terakhir" },
  ];

  return (
    <Document>
      <Page size={[595, undefined]} style={styles.page} wrap={false}>
        <HeaderFixed kop={kop} />
        <View style={styles.topSpacer} />

        {/* META */}
        <View style={styles.metaRow}>
          <View style={styles.metaCell}>
            <Text style={styles.metaLabel}>NOMOR BUKTI PEMOTONGAN</Text>
            <Text style={styles.metaValue}>{d.nomor_pemotongan || "-"}</Text>
          </View>
          <View style={styles.metaCell}>
            <Text style={styles.metaLabel}>PERIODE PENGHASILAN</Text>
            <Text style={styles.metaValue}>{formatMasaRange(d.masa_awal, d.masa_akhir)}</Text>
          </View>
          <View style={styles.metaCell}>
            <Text style={styles.metaLabel}>SIFAT PEMOTONGAN</Text>
            <Text style={styles.metaValue}>{(d.sifat_pemotongan || "TIDAK FINAL").toUpperCase()}</Text>
          </View>
          <View style={[styles.metaCell, styles.metaLast]}>
            <Text style={styles.metaLabel}>STATUS BUKTI PEMOTONGAN</Text>
            <Text style={styles.metaValue}>{(d.status || "NORMAL").toUpperCase()}</Text>
          </View>
        </View>

        {/* A */}
        <Text style={styles.sectionTitle}>A. IDENTITAS PENERIMA PENGHASILAN</Text>
        <RowField label="A.1 NIK/NPWP" value={d.npwp_akun || "-"} />
        <RowField label="A.2 Nama" value={d.nama_akun || "-"} />
        <RowField label="A.3 Alamat" value={d.alamat_utama_akun || "-"} />
        <RowField label="A.4 Jenis Kelamin" value={d.jenis_kelamin_akun || "-"} />
        <RowField label="A.5 Status PTKP" value={d.ptkp_akun || "-"} />
        <RowField label="A.6 Posisi" value={d.posisi_akun || "-"} />
        <RowField label="A.7 Pegawai Asing" value={d.pegawai_asing || "Tidak"} />
        <RowField label="A.8 Nomor Paspor" value={d.nomor_paspor_akun || "-"} />
        <RowField label="A.9 Kode Negara" value={d.negara_akun || "IDN"} />
        <RowField label="A.10 Bekerja di Lebih dari Satu Pemberi Kerja" value={d.bekerja_di_lebih_dari_satu_pemberi_kerja || "Tidak"} />

        {/* B */}
        <Text style={styles.sectionTitle}>B. RINCIAN PENGHASILAN DAN PENGHITUNGAN PPh PASAL 21</Text>
        <RowField label="B.1.1 Kode Objek Pajak" value={d.kode_objek_pajak || "-"} />
        <RowField label="B.1.2 Objek Pajak" value={d.nama_objek_pajak || "-"} />
        <RowField label="B.2 Jenis Pemotongan" value={d.jenis_pemotongan || "-"} />

        <View style={styles.table}>
          <View style={styles.tr}>
            <Text style={[styles.th, { flex: 0.2 }]}>No</Text>
            <Text style={[styles.th, { flex: 4 }]}>Uraian</Text>
            <Text style={[styles.th, { flex: 1 }, styles.right, styles.lastCell]}>Jumlah</Text>
          </View>

          <View style={[styles.tr, { backgroundColor: "#e5e5e5ff" }]}>
            <Text style={[styles.td, { flex: 0.2, fontWeight: 700 }]}>
              I
            </Text>
            <Text style={[styles.td, { flex: 4, fontWeight: 700 }]}>
              Penghasilan Bruto
            </Text>
            <Text style={[styles.td, { flex: 1 }, styles.right, styles.lastCell]}>
              
            </Text>
          </View>
          
          {brutoRows.map((row) => (
            <View key={row.no} style={styles.tr}>
              <Text style={[styles.td, { flex: 0.2 }]}>
                {row.no}.
              </Text>
              <Text style={[styles.td, { flex: 4 }]}>
                {row.label}
              </Text>
              <Text style={[styles.td, { flex: 1 }, styles.right, styles.lastCell]}>
                {formatRupiah(d[row.key])}
              </Text>
            </View>
          ))}

          {/* JUMLAH */}
          <View style={[styles.tr, { backgroundColor: "#f2f2f2" }]}>
            <Text style={[styles.td, { flex: 0.2, fontWeight: 700 }]}>
              8.
            </Text>
            <Text style={[styles.td, { flex: 4, fontWeight: 700 }]}>
              Jumlah Penghasilan Bruto (1 s.d 7)
            </Text>
            <Text style={[styles.td, { flex: 1 }, styles.right, styles.lastCell]}>
              {formatRupiah(d.dasar_pengenaan_pajak)}
            </Text>
          </View>

          <View style={[styles.tr, { backgroundColor: "#e5e5e5ff" }]}>
            <Text style={[styles.td, { flex: 0.2, fontWeight: 700 }]}>
              II
            </Text>
            <Text style={[styles.td, { flex: 4, fontWeight: 700 }]}>
              Pengurang Penghasilan Bruto
            </Text>
            <Text style={[styles.td, { flex: 1 }, styles.right, styles.lastCell]}>
              
            </Text>
          </View>

          {pengurangRows.map((row) => (
            <View key={row.no} style={styles.tr}>
              <Text style={[styles.td, { flex: 0.2 }]}>
                {row.no}.
              </Text>
              <Text style={[styles.td, { flex: 4 }]}>
                {row.label}
              </Text>
              <Text style={[styles.td, { flex: 1 }, styles.right, styles.lastCell]}>
                {formatRupiah(d[row.key])}
              </Text>
            </View>
          ))}

          {/* JUMLAH */}
          <View style={[styles.tr, { backgroundColor: "#f2f2f2" }]}>
            <Text style={[styles.td, { flex: 0.2, fontWeight: 700 }]}>
              12.
            </Text>
            <Text style={[styles.td, { flex: 4, fontWeight: 700 }]}>
              Jumlah Pengurang Penghasilan Bruto (9 s.d 11)
            </Text>
            <Text style={[styles.td, { flex: 1 }, styles.right, styles.lastCell]}>
              {formatRupiah(d.jumlah_pengurangan)}
            </Text>
          </View>

          <View style={[styles.tr, { backgroundColor: "#e5e5e5ff" }]}>
            <Text style={[styles.td, { flex: 0.2, fontWeight: 700 }]}>
              III
            </Text>
            <Text style={[styles.td, { flex: 4, fontWeight: 700 }]}>
              Perhitungan PPh Pasal 21
            </Text>
            <Text style={[styles.td, { flex: 1 }, styles.right, styles.lastCell]}>
              
            </Text>
          </View>

          {pphRows.map((row) => (
            <View key={row.no} style={styles.tr}>
              <Text style={[styles.td, { flex: 0.2 }]}>
                {row.no}.
              </Text>
              <Text style={[styles.td, { flex: 4 }]}>
                {row.label}
              </Text>
              <Text style={[styles.td, { flex: 1 }, styles.right, styles.lastCell]}>
                {formatRupiah(d[row.key])}
              </Text>
            </View>
          ))}
        </View>

        <RowField label="B.6 Jenis Fasilitas" value={d.fasilitas_pajak || "Tanpa Fasilitas"} />

        {/* C */}
        <Text style={styles.sectionTitle}>C. IDENTITAS PEMOTONG PPh</Text>
        <RowField label="C.1 NPWP/NIK" value={d.nitku?.split(" - ")[0] || "-"} />
        <RowField label="C.2 NITKU" value={d.nitku || "-"} />
        <RowField label="C.3 Nama Pemotong" value={d.nitku?.split(" - ")[1] || "-"} />
        <RowField label="C.4 Tanggal" value={formatDate(d.masa_akhir)} />
        <RowField label="C.5 Nama Penandatangan" value={d.nama_representatif || d.nitku?.split(" - ")[1] || "-"} />
        <RowField
          label="C.6 Pernyataan"
          value="Dengan ini saya menyatakan bahwa Bukti Pemotongan ini telah saya isi dengan benar dan telah saya tandatangani secara elektronik."
        />

        <View style={[styles.mt12, { flexDirection: "row", alignItems: "center" }]}>
          {qr && <Image src={qr} style={{ width: 80 }} />}
          <Text style={[styles.italic, { marginLeft: 8 }]}>Ditandatangani secara elektronik</Text>
        </View>
      </Page>
    </Document>
  );
};

export default BPA1PDF;
