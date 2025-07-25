import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import qrImage from "../../../assets/images/qr-web.png";
import kopImage from "../../../assets/images/KOP/BPPU.png";

// Assume this function exists globally or is imported
const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value ?? 0);

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// Helper function to format masa pajak
const formatMasaPajak = (masaAwal) => {
  if (!masaAwal) return "-";
  const date = new Date(masaAwal);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${year}`;
};

const BupotUnifikasiPDF = ({ data }) => {
  // Extract data from the provided structure
  const bupotData = data?.data || data || {};

  return (
    <Document>
      <Page
        size="A4"
        style={{ padding: 24, fontSize: 10, fontFamily: "Helvetica" }}
      >
        {/* Title */}
        <View style={{ width: "100%", textAlign: "center" }}>
          <Image
            style={{ width: "100%", height: "auto", marginBottom: 5 }}
            src={kopImage}
          />
        </View>

        {/* Header Info Grid */}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          {[
            { label: "NOMOR", value: bupotData.nomor_dokumen || "250000MS2" },
            {
              label: "MASA PAJAK",
              value: formatMasaPajak(bupotData.masa_awal),
            },
            {
              label: "SIFAT PEMOTONGAN",
              value:
                bupotData.sifat_pajak_penghasilan?.toUpperCase() ||
                "TIDAK FINAL",
            },
            {
              label: "STATUS",
              value: bupotData.status?.toUpperCase() || "NORMAL",
            },
          ].map((item, idx) => (
            <View
              key={idx}
              style={{
                flex: 1,
                backgroundColor: "#e0e0e0",
                padding: 4,
                border: "1px solid #bbb",
                marginRight: idx !== 3 ? 4 : 0,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 9 }}>
                {item.label}
              </Text>
              <Text>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Section A */}
        <Text
          style={{
            backgroundColor: "#003c82",
            color: "#fff",
            fontWeight: "bold",
            padding: 5,
            marginBottom: 6,
          }}
        >
          A. IDENTITAS WAJIB PAJAK YANG DIPOTONG DAN/ATAU DIPUNGUT PPh ATAU
          PENERIMA PENGHASILAN
        </Text>
        <View style={{ marginBottom: 8, lineHeight: 1.5 }}>
          <Text>A.1 NPWP / NIK : {bupotData.npwp_akun || "-"}</Text>
          <Text>A.2 NAMA : {bupotData.nama_akun || "-"}</Text>
          <Text>A.3 NOMOR IDENTITAS : {bupotData.npwp_akun || "-"}</Text>
          <Text>TEMPAT KEGIATAN USAHA (NITKU) : {bupotData.nitku || "-"}</Text>
        </View>

        {/* Section B */}
        <Text
          style={{
            backgroundColor: "#003c82",
            color: "#fff",
            fontWeight: "bold",
            padding: 5,
            marginBottom: 6,
          }}
        >
          B. PEMOTONGAN DAN/ATAU PEMUNGUTAN PPh
        </Text>

        <View style={{ marginBottom: 6 }}>
          <Text>
            B.1 Jenis Fasilitas :{" "}
            {bupotData.fasilitas_pajak
              ?.replace("_", " ")
              ?.replace(/\b\w/g, (l) => l.toUpperCase()) || "Tanpa Fasilitas"}
          </Text>
          <Text>B.2 Jenis PPh : {bupotData.jenis_pajak || "Pasal 23"}</Text>
        </View>

        {/* Table Header */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#d1d1d1",
            border: "1px solid #000",
          }}
        >
          <Text
            style={{ flex: 1.2, borderRight: "1px solid #000", padding: 4 }}
          >
            KODE OBJEK PAJAK{"\n"}B.3
          </Text>
          <Text style={{ flex: 3, borderRight: "1px solid #000", padding: 4 }}>
            OBJEK PAJAK{"\n"}B.4
          </Text>
          <Text
            style={{
              flex: 2,
              borderRight: "1px solid #000",
              padding: 4,
              textAlign: "right",
            }}
          >
            DPP (Rp){"\n"}B.5
          </Text>
          <Text
            style={{
              flex: 1,
              borderRight: "1px solid #000",
              padding: 4,
              textAlign: "center",
            }}
          >
            TARIF (%){"\n"}B.6
          </Text>
          <Text style={{ flex: 2, padding: 4, textAlign: "right" }}>
            PAJAK PENGHASILAN (Rp){"\n"}B.7
          </Text>
        </View>

        {/* Table Row */}
        <View
          style={{
            flexDirection: "row",
            borderLeft: "1px solid #000",
            borderRight: "1px solid #000",
            borderBottom: "1px solid #000",
          }}
        >
          <Text
            style={{ flex: 1.2, borderRight: "1px solid #000", padding: 4 }}
          >
            {bupotData.kode_objek_pajak || "24-104-17"}
          </Text>
          <Text style={{ flex: 3, borderRight: "1px solid #000", padding: 4 }}>
            {bupotData.nama_objek_pajak ||
              "Jasa Penyedia Tenaga Kerja dan/atau Tenaga Ahli (Outsourcing Services)"}
          </Text>
          <Text
            style={{
              flex: 2,
              borderRight: "1px solid #000",
              padding: 4,
              textAlign: "right",
            }}
          >
            {formatRupiah(bupotData.dasar_pengenaan_pajak)}
          </Text>
          <Text
            style={{
              flex: 1,
              borderRight: "1px solid #000",
              padding: 4,
              textAlign: "center",
            }}
          >
            {bupotData.tarif_pajak * 100 || 0}
          </Text>
          <Text style={{ flex: 2, padding: 4, textAlign: "right" }}>
            {formatRupiah(bupotData.pajak_penghasilan)}
          </Text>
        </View>

        {/* Footer Information */}
        <View style={{ marginTop: 10, lineHeight: 1.4 }}>
          <Text>
            B.8 Dokumen Dasar Bukti Pemotongan dan/atau Pemungutan PPh Unifikasi
            atau Dasar Pemberian Fasilitas
          </Text>
          <Text>
            Jenis Dokumen : {bupotData.jenis_dokumen || "Dokumen Lainnya"}
          </Text>
          <Text>Tanggal : {formatDate(bupotData.tanggal_dokumen)}</Text>
          <Text>B.9 Nomor Dokumen : {bupotData.nomor_dokumen || "-"}</Text>
          <Text>B.10 Untuk Instansi Pemerintah :</Text>
          <Text>B.11 Nomor SP2D :</Text>
        </View>

        {/* Section C */}
        <Text
          style={{
            backgroundColor: "#003c82",
            color: "#fff",
            fontWeight: "bold",
            padding: 5,
            marginTop: 12,
            marginBottom: 6,
          }}
        >
          C. IDENTITAS PEMOTONG DAN/ATAU PEMUNGUT PPh
        </Text>

        <View style={{ lineHeight: 1.5, marginBottom: 10 }}>
          <Text>
            C.1 NPWP / NIK : {bupotData.nitku_dokumen?.split(" - ")[0] || "-"}
          </Text>
          <Text>
            C.2 NOMOR IDENTITAS TEMPAT KEGIATAN USAHA (NITKU) / SUBUNIT
            ORGANISASI : {bupotData.nitku_dokumen || "-"}
          </Text>
          <Text>
            C.3 NAMA PEMOTONG DAN/ATAU PEMUNGUT PPh :{" "}
            {bupotData.nitku_dokumen?.split(" - ")[1] || "-"}
          </Text>
          <Text>C.4 TANGGAL : {formatDate(bupotData.created_at)}</Text>
          <Text>
            C.5 NAMA PENANDATANGAN :{" "}
            {bupotData.nitku_dokumen?.split(" - ")[1] ||
              "CIPTO SUWARNO KURNIAWAN"}
          </Text>
          <Text style={{ marginTop: 6 }}>C.6 PERNYATAAN WAJIB PAJAK:</Text>
          <Text style={{ marginLeft: 10 }}>
            Dengan ini saya menyatakan bahwa Bukti Pemotongan dan/atau
            Pemungutan PPh Unifikasi telah saya isi dengan benar dan telah saya
            tandatangani secara elektronik.
          </Text>
          <Text style={{ marginTop: 4, marginLeft: 10 }}>
            Sesuai dengan ketentuan yang berlaku, Direktur Jenderal Pajak
            mengatur bahwa Bukti Pemotongan dan/atau Pemungutan PPh Unifikasi
            ini dinyatakan sah dan tidak diperlukan tanda tangan basah pada
            Bukti Pemotongan dan/atau Pemungutan PPh Unifikasi ini.
          </Text>
        </View>

        {/* Optional QR / Signature */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Image
            style={{ width: "15%", height: "auto", marginBottom: 5 }}
            src={qrImage}
          />
          <Text style={{ fontStyle: "italic", color: "#777" }}>
            Ditandatangani secara elektronik
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default BupotUnifikasiPDF;
