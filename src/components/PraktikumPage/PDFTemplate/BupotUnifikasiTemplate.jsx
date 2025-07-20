import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import qrImage from "../../../assets/images/qr-web.png";
import kopImage from "../../../assets/images/KOP BPPU.jpg";

// Assume this function exists globally or is imported
const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value ?? 0);

const BupotUnifikasiPDF = ({ data }) => (
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
          { label: "NOMOR", value: "250000MS2" },
          { label: "MASA PAJAK", value: "01-2025" },
          { label: "SIFAT PEMOTONGAN", value: "TIDAK FINAL" },
          { label: "STATUS", value: "NORMAL" },
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
        <Text>A.1 NPWP / NIK : {data?.npwp || "-"}</Text>
        <Text>A.2 NAMA : {data?.nama || "-"}</Text>
        <Text>A.3 NOMOR IDENTITAS : {data?.identitas || "-"}</Text>
        <Text>
          TEMPAT KEGIATAN USAHA (NITKU) : {data?.tempat_kegiatan || "-"}
        </Text>
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
        <Text>B.1 Jenis Fasilitas : Tanpa Fasilitas</Text>
        <Text>B.2 Jenis PPh : Pasal 23</Text>
      </View>

      {/* Table Header */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#d1d1d1",
          border: "1px solid #000",
        }}
      >
        <Text style={{ flex: 1.2, borderRight: "1px solid #000", padding: 4 }}>
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
        <Text style={{ flex: 1.2, borderRight: "1px solid #000", padding: 4 }}>
          24-104-17
        </Text>
        <Text style={{ flex: 3, borderRight: "1px solid #000", padding: 4 }}>
          Jasa Penyedia Tenaga Kerja dan/atau Tenaga Ahli (Outsourcing Services)
        </Text>
        <Text
          style={{
            flex: 2,
            borderRight: "1px solid #000",
            padding: 4,
            textAlign: "right",
          }}
        >
          {formatRupiah(data?.dpp)}
        </Text>
        <Text
          style={{
            flex: 1,
            borderRight: "1px solid #000",
            padding: 4,
            textAlign: "center",
          }}
        >
          2
        </Text>
        <Text style={{ flex: 2, padding: 4, textAlign: "right" }}>
          {formatRupiah(data?.pph)}
        </Text>
      </View>

      {/* Footer Information */}
      <View style={{ marginTop: 10, lineHeight: 1.4 }}>
        <Text>
          B.8 Dokumen Dasar Bukti Pemotongan dan/atau Pemungutan PPh Unifikasi
          atau Dasar Pemberian Fasilitas
        </Text>
        <Text>Jenis Dokumen : Dokumen Lainnya</Text>
        <Text>Tanggal : 03 Desember 2024</Text>
        <Text>B.9 Nomor Dokumen : 0076/KUN-OMI/XII/2024</Text>
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
        <Text>C.1 NPWP / NIK : {data?.pemotong_npwp || "-"}</Text>
        <Text>
          C.2 NOMOR IDENTITAS TEMPAT KEGIATAN USAHA (NITKU) / SUBUNIT ORGANISASI
          : {data?.pemotong_nitku || "-"}
        </Text>
        <Text>
          C.3 NAMA PEMOTONG DAN/ATAU PEMUNGUT PPh : {data?.pemotong_nama || "-"}
        </Text>
        <Text>C.4 TANGGAL : {data?.tanggal || "11 Januari 2025"}</Text>
        <Text>
          C.5 NAMA PENANDATANGAN :{" "}
          {data?.penandatangan || "CIPTO SUWARNO KURNIAWAN"}
        </Text>
        <Text style={{ marginTop: 6 }}>C.6 PERNYATAAN WAJIB PAJAK:</Text>
        <Text style={{ marginLeft: 10 }}>
          Dengan ini saya menyatakan bahwa Bukti Pemotongan dan/atau Pemungutan
          PPh Unifikasi telah saya isi dengan benar dan telah saya tandatangani
          secara elektronik.
        </Text>
        <Text style={{ marginTop: 4, marginLeft: 10 }}>
          Sesuai dengan ketentuan yang berlaku, Direktur Jenderal Pajak mengatur
          bahwa Bukti Pemotongan dan/atau Pemungutan PPh Unifikasi ini
          dinyatakan sah dan tidak diperlukan tanda tangan basah pada Bukti
          Pemotongan dan/atau Pemungutan PPh Unifikasi ini.
        </Text>
      </View>

      {/* Optional QR / Signature */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        {/* You can use Image from @react-pdf/renderer if you have a base64 or URI QR code */}
        {/* <Image src={qrCodeBase64} style={{ width: 60, height: 60, marginRight: 10 }} /> */}

        <Image
          style={{ width: "15%", height: "auto", marginBottom: 5 }}
          src={qrImage}
        />
        {/* <View
          style={{
            width: 60,
            height: 60,
            marginRight: 10,
            border: "1px solid #ccc",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>QR</Text>
        </View> */}
        <Text style={{ fontStyle: "italic", color: "#777" }}>
          Ditandatangani secara elektronik
        </Text>
      </View>
    </Page>
  </Document>
);

export default BupotUnifikasiPDF;
