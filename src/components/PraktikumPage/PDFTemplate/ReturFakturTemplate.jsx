import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import qrImage from "../../../assets/images/qr-web.png";

export const ReturFakturPDF = ({ data }) => {
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Helper function to format currency
  const formatCurrency = (amount) => {
    if (!amount) return "0,00";
    return parseFloat(amount).toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontSize: 10,
          padding: 20,
          fontFamily: "Helvetica",
          lineHeight: 1.5,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 6,
            textTransform: "uppercase",
          }}
        >
          NOTA RETUR / NOTA PEMBATALAN
        </Text>
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          Nomor: {data?.nomor_retur || "N/A"} Tanggal Retur:{" "}
          {formatDate(data?.tanggal_retur)} {"\n"}
          (atas nomor Faktur Pajak: {data?.nomor_faktur_pajak || "N/A"} Tanggal
          Faktur {formatDate(data?.created_at)})
        </Text>

        {/* Buyer Info */}
        <View
          style={{
            border: "1px solid #000",
            padding: 5,
            marginBottom: 8,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Pembeli Barang Kena Pajak/Penerima Jasa Kena Pajak:
          </Text>
          <Text>Nama : {data?.akun_penerima_id?.nama_akun || "N/A"}</Text>
          <Text>
            Alamat : {data?.akun_penerima_id?.alamat_utama_akun || "N/A"}
          </Text>
          <Text>NPWP : {data?.akun_penerima_id?.npwp_akun || "N/A"}</Text>
        </View>

        {/* Seller Info */}
        <View
          style={{
            border: "1px solid #000",
            padding: 5,
            marginBottom: 8,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Penjual Barang Kena Pajak/Pemberi Jasa Kena Pajak:
          </Text>
          <Text>Nama : {data?.akun_pengirim_id?.nama_akun || "N/A"}</Text>
          <Text>
            Alamat : {data?.akun_pengirim_id?.alamat_utama_akun || "N/A"}
          </Text>
          <Text>NPWP : {data?.akun_pengirim_id?.npwp_akun || "N/A"}</Text>
        </View>

        {/* Table */}
        <View
          style={{
            display: "table",
            width: "auto",
            border: "1px solid black",
            marginBottom: 10,
          }}
        >
          {/* Header Row */}
          <View
            style={{
              flexDirection: "row",
              borderBottom: "1px solid black",
            }}
          >
            <Text
              style={{
                width: "5%",
                padding: 4,
                fontWeight: "bold",
                backgroundColor: "#eee",
                borderRight: "1px solid black",
              }}
            >
              No.
            </Text>
            <Text
              style={{
                width: "15%",
                padding: 4,
                fontWeight: "bold",
                backgroundColor: "#eee",
                borderRight: "1px solid black",
              }}
            >
              Kode Barang/Jasa
            </Text>
            <Text
              style={{
                width: "50%",
                padding: 4,
                fontWeight: "bold",
                backgroundColor: "#eee",
                borderRight: "1px solid black",
              }}
            >
              Nama Barang / Jasa
            </Text>
            <Text
              style={{
                width: "30%",
                padding: 4,
                fontWeight: "bold",
                backgroundColor: "#eee",
              }}
            >
              Harga (Rp)
            </Text>
          </View>

          {/* Dynamic Rows from detail_transaksi */}
          {data?.detail_transaksi?.map((item, index) => (
            <View key={index} style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "5%",
                  padding: 4,
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                {index + 1}
              </Text>
              <Text
                style={{
                  width: "15%",
                  padding: 4,
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                {item?.kode || ""}
              </Text>
              <Text
                style={{
                  width: "50%",
                  padding: 4,
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                {item?.nama || item?.deskripsi || "N/A"}
                {"\n"}
                {item?.harga_satuan
                  ? `Rp ${formatCurrency(item.harga_satuan)} x ${
                      item.kuantitas || 1
                    } ${item.satuan || ""}`
                  : ""}
              </Text>
              <Text
                style={{
                  width: "30%",
                  padding: 4,
                  borderBottom: "1px solid black",
                }}
              >
                {formatCurrency(item?.total_harga || item?.harga || 0)}
              </Text>
            </View>
          )) || (
            // Fallback if no detail_transaksi
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "5%",
                  padding: 4,
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                1
              </Text>
              <Text
                style={{
                  width: "15%",
                  padding: 4,
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              ></Text>
              <Text
                style={{
                  width: "50%",
                  padding: 4,
                  borderRight: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                Transaksi Retur{"\n"}
                Referensi: {data?.referensi || "N/A"}
              </Text>
              <Text
                style={{
                  width: "30%",
                  padding: 4,
                  borderBottom: "1px solid black",
                }}
              >
                {formatCurrency(data?.dpp)}
              </Text>
            </View>
          )}
        </View>

        {/* Summary */}
        {/* <Text>
          Harga Jual / Penggantian / Uang Muka / Termin berdasarkan Faktur Pajak
        </Text>
        <Text>{formatCurrency(data?.dpp)}</Text>
        <Text>Harga Jual / Penggantian / Uang Muka / Termin yang diretur</Text>
        <Text>{formatCurrency(data?.jumlah_dpp_retur)}</Text>
        <Text>PPN yang diretur</Text>
        <Text>{formatCurrency(data?.ppn_retur)}</Text>
        <Text>PPnBM yang diretur</Text>
        <Text>{formatCurrency(data?.ppnbm_retur)}</Text> */}
        {/* Summary Table */}
        <View
          style={{
            display: "table",
            width: "auto",
            border: "1px solid black",
            marginBottom: 10,
          }}
        >
          {/* Header Row */}
          <View
            style={{
              flexDirection: "row",
              borderBottom: "1px solid black",
            }}
          >
            <Text
              style={{
                width: "70%",
                padding: 4,
                fontWeight: "bold",
                backgroundColor: "#eee",
                borderRight: "1px solid black",
              }}
            >
              Keterangan
            </Text>
            <Text
              style={{
                width: "30%",
                padding: 4,
                fontWeight: "bold",
                backgroundColor: "#eee",
              }}
            >
              Jumlah (Rp)
            </Text>
          </View>

          {/* Summary Rows */}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                width: "70%",
                padding: 4,
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
              }}
            >
              Harga Jual / Penggantian / Uang Muka / Termin berdasarkan Faktur
              Pajak
            </Text>
            <Text
              style={{
                width: "30%",
                padding: 4,
                borderBottom: "1px solid black",
              }}
            >
              {formatCurrency(data?.dpp)}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                width: "70%",
                padding: 4,
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
              }}
            >
              Harga Jual / Penggantian / Uang Muka / Termin yang diretur
            </Text>
            <Text
              style={{
                width: "30%",
                padding: 4,
                borderBottom: "1px solid black",
              }}
            >
              {formatCurrency(data?.jumlah_dpp_retur)}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                width: "70%",
                padding: 4,
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
              }}
            >
              PPN yang diretur
            </Text>
            <Text
              style={{
                width: "30%",
                padding: 4,
                borderBottom: "1px solid black",
              }}
            >
              {formatCurrency(data?.ppn_retur)}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                width: "70%",
                padding: 4,
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
              }}
            >
              PPnBM yang diretur
            </Text>
            <Text
              style={{
                width: "30%",
                padding: 4,
                borderBottom: "1px solid black",
              }}
            >
              {formatCurrency(data?.ppnbm_retur)}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={{ marginTop: 20 }}>
          Sesuai dengan ketentuan yang berlaku, Direktur Jenderal Pajak mengatur
          bahwa Nota Retur/Nota Pembatalan ini telah ditandatangani secara
          elektronik sehingga tidak diperlukan tanda tangan basah pada Nota
          Retur/Nota Pembatalan ini.
        </Text>

        {/* Signature Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View>
            <Text>{formatDate(data?.tanggal_retur)}</Text>
            <Text style={{ fontWeight: "bold", marginTop: 20 }}>
              {data?.penandatangan ||
                data?.akun_penerima_id?.nama_akun ||
                "N/A"}
            </Text>
          </View>
          <View
            style={{
              width: 80,
              height: 80,
              border: "1px solid #000",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image style={{ height: "auto" }} src={qrImage} />
          </View>
          {/* <View style={{ width: "100%", textAlign: "center" }}>
            <Image
              style={{ width: "15%", height: "auto", marginBottom: 5 }}
              src={qrImage}
            />
          </View> */}
        </View>

        <Text style={{ fontStyle: "italic", marginTop: 4 }}>
          Ditandatangani secara elektronik
        </Text>

        {/* Additional Info */}
        <View style={{ marginTop: 10, fontSize: 8 }}>
          <Text>Status: {data?.status || "N/A"}</Text>
          <Text>
            Masa Pajak: {data?.masa_pajak || "N/A"} {data?.tahun || ""}
          </Text>
          <Text>Kode Transaksi: {data?.kode_transaksi || "N/A"}</Text>
        </View>
      </Page>
    </Document>
  );
};
