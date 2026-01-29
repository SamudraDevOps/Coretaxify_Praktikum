import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value || 0));

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const d = new Date(dateString);
  if (isNaN(d)) return "-";
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
};

const formatMasaPajak = (masaAwal) => {
  if (!masaAwal) return "-";
  const d = new Date(masaAwal);
  if (isNaN(d)) return "-";
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}-${yyyy}`;
};

const parsePair = (str) => {
  if (!str) return { id: "-", name: "-" };
  const [id, ...rest] = String(str).split(" - ");
  return { id: id || "-", name: (rest.join(" - ") || "-").trim() };
};

// ===== Styles =====
const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 10, fontFamily: "Helvetica" },
  fixedTop: { position: "absolute", top: 24, left: 24, right: 24 },
  topSpacer: { height: 86 },
  kop: { width: "100%", marginBottom: 6 },
  titleBlock: { alignItems: "center", marginTop: 4, marginBottom: 6 },
  title1: { fontSize: 11, fontWeight: 700 },
  title2: { fontSize: 10, fontWeight: 700 },
  title3: { fontSize: 10, fontWeight: 700, marginTop: 4 },
  codeBadge: { marginTop: 2, fontSize: 12, fontWeight: 700 },

  gridRow: { flexDirection: "row", gap: 4, marginTop: 6 },
  gridItem: { flex: 1, backgroundColor: "#e0e0e0", padding: 4, borderWidth: 1, borderColor: "#bbb" },
  gridLabel: { fontSize: 9, fontWeight: 700, marginBottom: 2 },

  sectionTitle: { backgroundColor: "#003c82", color: "#fff", fontWeight: 700, padding: 6, marginTop: 10 },

  // Tabel
  table: { borderWidth: 1, borderColor: "#000" },
  thead: { flexDirection: "row", backgroundColor: "#d1d1d1", borderBottomWidth: 1, borderColor: "#000" },
  tr: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#000" },
  th: { padding: 4, fontWeight: 700, borderRightWidth: 1, borderColor: "#000" },
  td: { padding: 4, borderRightWidth: 1, borderColor: "#000" },
  lastCell: { borderRightWidth: 0 },
  right: { textAlign: "right" },
  center: { textAlign: "center" },

  // Row label-:-value untuk perataan titik dua
  fieldRow: { flexDirection: "row", marginTop: 2 },
  fieldLabel: { width: 150 },           // atur lebar label agar konsisten
  fieldColon: { width: 10, textAlign: "center" }, // kolom titik dua
  fieldValue: { flex: 1 },

  mt6: { marginTop: 6 },
  mt8: { marginTop: 8 },
  mt12: { marginTop: 12 },
  italic: { fontStyle: "italic", color: "#777" },


   metaRow: {
    flexDirection: "row",
    marginTop: 6,
    backgroundColor: "#e6e6e6",
    borderWidth: 1,
    borderColor: "#bbb",
  },
  metaItem: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  metaDivider: {
    borderRightWidth: 2,
    borderRightColor: "#ffffff",
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: 700,
    marginBottom: 4,
    textAlign: "center",
  },
  metaValueBox: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#bbb",
    height: 28,                 // tinggi seragam
    justifyContent: "center",   // tengah vertikal
    alignItems: "center",       // tengah horizontal
  },
  metaValueText: {
    fontWeight: 700,
    fontSize: 10,
  },
});

// Komponen baris label : value
const RowField = ({ label, value }) => (
  <View style={styles.fieldRow}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldColon}>:</Text>
    <Text style={styles.fieldValue}>{value}</Text>
  </View>
);

// Tidak Menggunakan : gaes
const RowFieldNoColon = ({ label, value }) => (
  <View style={styles.fieldRow}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldValue}>{value}</Text>
  </View>
);

const HeaderFixed = ({ kopImage }) => (
  <View fixed style={styles.fixedTop}>
    {kopImage ? <Image style={styles.kop} src={kopImage} /> : null}
    <View style={styles.titleBlock}>
      <Text style={styles.title1}>KEMENTERIAN KEUANGAN REPUBLIK INDONESIA</Text>
      <Text style={styles.title2}>DIREKTORAT JENDERAL PAJAK</Text>
      <Text style={styles.title3}>BUKTI PEMOTONGAN PAJAK PENGHASILAN PASAL 21</Text>
      <Text style={styles.title3}>YANG TIDAK BERSIFAT FINAL & YANG BERSIFAT FINAL</Text>
      <Text style={styles.codeBadge}>BP21</Text>
    </View>
  </View>
);

const TableHeaderFixed = () => (
  <View fixed style={[styles.table, styles.mt6]}>
    <View style={styles.thead}>
      <Text style={[styles.th, { flex: 1.4 }]}>KODE OBJEK PAJAK{"\n"}B.2</Text>
      <Text style={[styles.th, { flex: 3 }]}>OBJEK PAJAK{"\n"}B.3</Text>
      <Text style={[styles.th, { flex: 2 }, styles.right]}>PENGHASILAN BRUTO (Rp){"\n"}B.4</Text>
      <Text style={[styles.th, { flex: 2 }, styles.center]}>DPP (%){"\n"}B.5</Text>
      <Text style={[styles.th, { flex: 1 }, styles.center]}>TARIF (%){"\n"}B.6</Text>
      {/* <Text style={[styles.th, { flex: 1 }, styles.right, styles.lastCell]}>PPh DIPOTONG (Rp){"\n"}B.7</Text> */}
    </View>
  </View>
);

const BP21PDF = ({ data = {}, kopImage, qrImage }) => {
  console.log("BP21PDF data:", data);
    const bupotData = data?.data || data || {};

  const rincian = Array.isArray(bupotData.rincian) && bupotData.rincian.length
    ? bupotData.rincian
    : [{
      kode_objek: bupotData.kode_objek_pajak || "-",
    objek_pajak: bupotData.nama_objek_pajak || "-",
    bruto: bupotData.dasar_pengenaan_pajak ?? 0,
    dpp_persen: bupotData.dasar_pengenaan_pajak ?? 0,
    tarif_persen: bupotData.tarif_pajak ?? 0,
    pph_dipotong: bupotData.pajak_penghasilan ?? 0,
    }];

  const totalBruto = rincian.reduce((s, r) => s + (Number(r.bruto) || 0), 0);
  const totalPph = rincian.reduce((s, r) => s + (Number(r.pph_dipotong) || 0), 0);

  const { name: pemotongNitkuName } = parsePair(data.nitku_pemotong);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header fixed */}
        <HeaderFixed kopImage={kopImage} />
        <View style={styles.topSpacer} />

        {/* Grid metadata */}
        <View style={styles.metaRow}>
          {[
            { label: "NOMOR BUKTI PEMOTONGAN", value: bupotData.nomor_dokumen || "-" },
            { label: "MASA PAJAK", value: formatMasaPajak(bupotData.masa_awal) },
            { label: "SIFAT PEMOTONGAN", value: (bupotData.sifat_pajak_penghasilan || "TIDAK FINAL").toUpperCase() },
            { label: "STATUS BUKTI PEMOTONGAN", value: (bupotData.status || "NORMAL").toUpperCase() },
          ].map((it, i, arr) => (
            <View
              key={i}
              style={[styles.metaItem, i !== arr.length - 1 && styles.metaDivider]}
            >
              <Text style={styles.metaLabel}>{it.label}</Text>
              <View style={styles.metaValueBox}>
                <Text style={styles.metaValueText}>{it.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Section A */}
        <Text style={styles.sectionTitle}>A. IDENTITAS PENERIMA PENGHASILAN</Text>
        <View>
          <RowField label="A.1 NIK/NPWP" value={bupotData.npwp_akun || "-"} />
          <RowField label="A.2 Nama" value={bupotData.nama_akun || "-"} />
          <RowField label="A.3 NITKU" value={bupotData.nitku || "-"} />
        </View>

        {/* Section B */}
        <Text style={styles.sectionTitle}>B. PENGHASILAN YANG DIPOTONG</Text>
        <View>
          <RowField label="B.1 Jenis Fasilitas" value={bupotData.fasilitas_pajak || "Tanpa Fasilitas"} />
        </View>

        {/* Table header fixed */}
        <TableHeaderFixed />

        {/* Table body */}
        <View style={[styles.table, { borderTopWidth: 0 }]}>
          {rincian.map((r, idx) => (
            <View key={idx} style={styles.tr} wrap={false}>
              <Text style={[styles.td, { flex: 1.4 }]}>{r.kode_objek || "-"}</Text>
              <Text style={[styles.td, { flex: 3 }]}>{r.objek_pajak || "-"}</Text>
              <Text style={[styles.td, { flex: 2 }, styles.right]}>{formatRupiah(r.bruto)}</Text>
              <Text style={[styles.td, { flex: 2 }, styles.center]}>{formatRupiah(r.pph_dipotong) ?? 0}</Text>
              <Text style={[styles.td, { flex: 1 }, styles.center]}>{r.tarif_persen ?? 0}</Text>
              {/* <Text style={[styles.td, { flex: 1 }, styles.right, styles.lastCell]}>{r.tes || "-"}</Text> */}
            </View>
          ))}

          {/* Subtotal */}
          <View style={[styles.tr, { backgroundColor: "#f2f2f2" }]} wrap={false}>
            <Text style={[styles.td, { flex: 4.7, fontWeight: 700 }]}>JUMLAH</Text>
            <Text style={[styles.td, { flex: 2 }, styles.right]}>{formatRupiah(totalBruto)}</Text>
            <Text style={[styles.td, { flex: 2 }, styles.center]}>{formatRupiah(totalPph)}</Text>
            <Text style={[styles.td, { flex: 1 }, styles.center]}>—</Text>
            {/* <Text style={[styles.td, { flex: 1 }, styles.right, styles.lastCell]}>-</Text> */}
          </View>
        </View>

        {/* Dokumen Referensi */}
        <View style={styles.mt8}>
          <RowFieldNoColon label="B.8 Dokumen Referensi" value="" />
          <RowField label="Jenis Dokumen" value={bupotData.jenis_dokumen || " Bukti Pembayaran"} />
          <RowField label="Tanggal Dokumen" value={formatDate(bupotData.tanggal_dokumen)} />
          <RowField label="B.9 Nomor Dokumen" value={bupotData.nomor_dokumen || "-"} />
        </View>

        {/* Section C */}
        <Text style={styles.sectionTitle}>C. IDENTITAS PEMOTONG PPh</Text>
        <View>
          <RowField label="C.1 NPWP/NIK" value={bupotData.nitku_dokumen?.split(" - ")[0] || "-"} />
          <RowField label="C.2 NITKU atau Nomor Identitas Subunit Organisasi" value={bupotData.nitku_dokumen || "-"} />
          <RowField label="C.3 Nama Pemotong" value={bupotData.nitku_dokumen?.split(" - ")[1] || "-"} />
          <RowField label="C.4 Tanggal" value={formatDate(bupotData.tanggal_dokumen)} />
          <RowField label="C.5 Nama Penandatangan" value={bupotData.nitku_dokumen?.split(" - ")[1] || "-"} />
          <RowField
            label="C.6 Pernyataan"
            value="Dengan ini saya menyatakan bahwa Bukti Pemotongan ini telah saya isi dengan benar dan telah saya tandatangani secara elektronik."
          />
        </View>

        {/* QR & footer note */}
        <View style={[styles.mt12, { flexDirection: "row", alignItems: "center" }]}>
          {qrImage ? <Image style={{ width: 80 }} src={qrImage} /> : null}
          <Text style={[styles.italic, { marginLeft: 8 }]}>Ditandatangani secara elektronik</Text>
        </View>
        <Text style={styles.mt6}>
          Sesuai dengan ketentuan yang berlaku, Direktorat Jenderal Pajak mengatur bahwa Bukti Pemotongan ini dinyatakan sah dan tidak diperlukan tanda tangan basah.
        </Text>
      </Page>
    </Document>
  );
};

export default BP21PDF;
