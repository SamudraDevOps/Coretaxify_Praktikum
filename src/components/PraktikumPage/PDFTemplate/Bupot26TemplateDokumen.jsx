import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import qrImage from "../../../assets/images/qr-web.png";
import kopImageBP26 from "../../../assets/images/KOP/BP26.png";

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

  //style B.8 - 9 
    docRow: { flexDirection: "row", marginTop: 2, alignItems: "flex-start" },

    docLeft: { width: 140 },     // kolom kiri (B.8/B.9)
    docMid: { flex: 1.6 },       // kolom tengah
    docRight: { flex: 1.4 },     // kolom kanan

    docInline: { flexDirection: "row", alignItems: "flex-start" },
    docLabel: { width: 92 },     // lebar label "Document's Type/Number/Date"
    docColon: { width: 6, textAlign: "center" },
    docValue: { flex: 1 },
});

// Komponen baris label : value
const RowField = ({ label, value }) => (
  <View style={styles.fieldRow}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldColon}>:</Text>
    <Text style={styles.fieldValue}>{value}</Text>
  </View>
);
//komponen b 
const InlineDocField = ({ label, value }) => (
  <View style={styles.docInline}>
    <Text style={styles.docLabel}>{label}</Text>
    <Text style={styles.docColon}>:</Text>
    <Text style={styles.docValue}>{value}</Text>
  </View>
);

//komponen c
const RowFieldC = ({ label, value }) => (
  <View style={styles.fieldRow}>
    {/* bikin label lebih panjang supaya ":" makin ke kanan */}
    <Text style={[styles.fieldLabel, { width: 240 }]}>{label}</Text>
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

const HeaderFixed = ({ kopImageBP26 }) => (
  <View fixed style={styles.fixedTop}>
    {kopImageBP26 ? <Image style={styles.kop} src={kopImageBP26} /> : null}
  </View>
);

const TableHeaderFixed = () => (
  <View fixed style={[styles.table, styles.mt6]}>
    <View style={styles.thead}>
      <Text style={[styles.th, { flex: 1.4 }]}>OBJECT CODE{"\n"}B.2</Text>
      <Text style={[styles.th, { flex: 3 }]}>TAX OBJECT{"\n"}B.3</Text>
      <Text style={[styles.th, { flex: 2 }, styles.right]}>GROSS INCOME (Rp){"\n"}B.4</Text>
      <Text style={[styles.th, { flex: 1.5 }, styles.center]}>DEEMED NET INCOME RATE (%){"\n"}B.5</Text>
      <Text style={[styles.th, { flex: 1.5 }, styles.center]}>TAX RATE (%){"\n"}B.6</Text>
      <Text style={[styles.th, { flex: 2 }, styles.right]}>INCOME TAX (Rp){"\n"}B.7</Text>
    </View>
  </View>
);

const BP26PDFDokumen = ({ data = {}, kopImageBP26: kopImageProp, qrImage: qrImageProp }) => {

  const kopImg = kopImageProp || kopImageBP26;
  const qrImg = qrImageProp || qrImage;

  let bupotData = data?.bupot_resource;
  if (typeof bupotData === "string") {
    try {
      bupotData = JSON.parse(bupotData);
    } catch {
      bupotData = {};
    }
  }
  if (!bupotData || Object.keys(bupotData).length === 0) {
    bupotData = data;
  }

  const rincian = Array.isArray(bupotData.rincian) && bupotData.rincian.length
    ? bupotData.rincian
    : [{
      kode_objek: bupotData.kode_objek_pajak || "-",
      objek_pajak: bupotData.nama_objek_pajak || "-",
      bruto: bupotData.dasar_pengenaan_pajak ?? 0,
      dpp_persen: bupotData.persentase_penghasilan_bersih ?? 0,
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
        <HeaderFixed kopImageBP26={kopImg} />
        <View style={styles.topSpacer} />

        {/* Grid metadata */}
        <View style={styles.metaRow}>
          {[
            { label: "NUMBER", value: bupotData.nomor_dokumen || "-" },
            { label: "TAX PERIOD", value: formatMasaPajak(bupotData.masa_awal) },
            { label: "INCOME TAX STATUS", value: (bupotData.sifat_pajak_penghasilan || "FINAL").toUpperCase() },
            { label: "WITHHOLDING SLIP STATUS", value: (bupotData.status || "NORMAL").toUpperCase() },
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
        <Text style={styles.sectionTitle}>A. INCOME RECIPIENT</Text>
        <View>
        <RowField label="A.1 TIN" value={bupotData.npwp_akun || "-"} />
        <RowField label="A.2 Name" value={bupotData.nama_akun || "-"} />
        <RowField label="A.3 Address" value={bupotData.alamat_utama_akun || "-"} />
        <RowField label="A.4 Country" value={bupotData.negara_akun || "-"} />

        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginRight: 12 }}>
            <RowField label="A.5 Date of Birth" value={bupotData.tanggal_lahir_akun || "-"} />
            </View>
            <View style={{ flex: 1 }}>
            <RowField label="A.7 Birthcity" value={bupotData.tempat_lahir_akun || "-"} />
            </View>
        </View>

        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginRight: 12 }}>
            <RowField label="A.6 Passport Number" value={bupotData.nomor_paspor_akun || "-"} />
            </View>
            <View style={{ flex: 1 }}>
            <RowField label="A.8 KITAS/KITAB Number" value={bupotData.nomor_kitas_kita || "-"} />
            </View>
        </View>
        </View>

        {/* Section B */}
        <Text style={styles.sectionTitle}>B. INCOME TAX WITHHELD</Text>
        <View>
          <RowField label="B.1 Tax Certificate" value={bupotData.fasilitas_pajak || "Tanpa Fasilitas"} />
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
              <Text style={[styles.td, { flex: 1.5 }, styles.center]}>{r.persentase_penghasilan_bersih ?? 0}</Text>
              <Text style={[styles.td, { flex: 1.5 }, styles.center]}>{r.tarif_persen ?? 0}</Text>
              <Text style={[styles.td, { flex: 2 }, styles.right]}>{formatRupiah(r.pph_dipotong)}</Text>
            </View>
          ))}

          {/* Subtotal */}
          <View style={[styles.tr, { backgroundColor: "#f2f2f2" }]} wrap={false}>
            <Text style={[styles.td, { flex: 4.6, fontWeight: 700 }]}>TOTAL</Text>
            <Text style={[styles.td, { flex: 2 }, styles.right]}>{formatRupiah(totalBruto)}</Text>
            <Text style={[styles.td, { flex: 1.5 }, styles.center]}>—</Text>
            <Text style={[styles.td, { flex: 1.5 }, styles.center]}>—</Text>
            <Text style={[styles.td, { flex: 2 }, styles.right]}>{formatRupiah(totalPph)}</Text>
          </View>
        </View>

        {/* Dokumen Referensi */}
        <View style={styles.mt8}>
        {/* B.8 */}
        <View style={styles.docRow}>
            <Text style={styles.docLeft}>B.8  Reference Document</Text>

            <View style={styles.docMid}>
            <InlineDocField
                label="Document's Type"
                value={bupotData.jenis_dokumen || "Bukti Pembayaran"}
            />
            </View>

            <View style={styles.docRight}>
            <InlineDocField
                label="Document's Date"
                value={formatDate(bupotData.tanggal_dokumen)}
            />
            </View>
        </View>

        {/* B.9 */}
        <View style={styles.docRow}>
            <Text style={styles.docLeft}>B.9</Text>

            <View style={styles.docMid}>
            <InlineDocField
                label="Document's Number"
                value={bupotData.nomor_dokumen || "-"}
            />
            </View>

            <View style={styles.docRight}>
            <Text> </Text>
            </View>
        </View>
        </View>


        {/* Section C */}
        <Text style={styles.sectionTitle}>C. WITHHOLDING AGENT</Text>
        <View>
        <RowFieldC label="C.1 TIN" value={bupotData.nitku_dokumen?.split(" - ")[0] || "-"} />
        <RowFieldC
            label="C.2 Place of Business Activity / Subunit Organization Identification Number"
            value={bupotData.nitku_dokumen || "-"}
        />
        <RowFieldC label="C.3 Withholding Agent Name" value={bupotData.nitku_dokumen?.split(" - ")[1] || "-"} />
        <RowFieldC label="C.4 Date" value={formatDate(bupotData.tanggal_dokumen)} />
        <RowFieldC label="C.5 Signer's Name" value={bupotData.nama_representatif || bupotData.nitku_dokumen?.split(" - ")[1] || "-"} />
        <RowFieldC
            label="C.6 Taxpayer Declaration"
            value="Dengan ini saya menyatakan bahwa Bukti Pemotongan ini telah saya isi dengan benar dan telah saya tandatangani secara elektronik."
        />
        </View>

        {/* QR & footer note */}
        <View style={[styles.mt12, { flexDirection: "row", alignItems: "center" }]}>
          {qrImg ? <Image style={{ width: 80 }} src={qrImg} /> : null}
          <Text style={[styles.italic, { marginLeft: 8 }]}>Ditandatangani secara elektronik</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <Text style={styles.mt6}>
            Sesuai dengan ketentuan yang berlaku, Direktorat Jenderal Pajak mengatur bahwa Bukti Pemotongan ini dinyatakan sah dan tidak diperlukan tanda tangan basah.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default BP26PDFDokumen;
