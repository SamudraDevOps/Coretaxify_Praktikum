import { Page, Text, View, Document } from "@react-pdf/renderer";

export const ReturFakturPDF = ({ data }) => (
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
        Nomor: RET0425000105031327 Tanggal Retur: 23 Juni 2025 {"\n"}
        (atas nomor Faktur Pajak: 04009022561402667 Tanggal Faktur 28 Maret
        2025)
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
        <Text>Nama : CV. AMIN JAYA PERDANA</Text>
        <Text>
          Alamat : JL. TELINDUNG BARU NO.42, RT 030, RW 000, BATU AMPAR,
          BALIKPAPAN UTARA, KOTA BALIKPAPAN, KALIMANTAN TIMUR 76126
        </Text>
        <Text>NPWP : 0837258219721000</Text>
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
        <Text>Nama : CITRA UTAMA</Text>
        <Text>
          Alamat : JL. MT. HARYONO NO.121, RT 041, RW 000, GUNUNGBAGHIA,
          BALIKPAPAN SELATAN, KOTA BALIKPAPAN, KALIMANTAN TIMUR 76114
        </Text>
        <Text>NPWP : 0015600141721000</Text>
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

        {/* Row 1 */}
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
            Ultra Mimi Choco X-tra Cal 125 Ml/40{"\n"}
            Rp 102.883,00 x 0,03 Lainnya
          </Text>
          <Text
            style={{
              width: "30%",
              padding: 4,
              borderBottom: "1px solid black",
            }}
          >
            3.086,49
          </Text>
        </View>

        {/* Row 2 */}
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: "5%",
              padding: 4,
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            2
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
            ULTRA MILK FULL CREAM 1000 ML/12-CB{"\n"}
            Rp 191.351,00 x 0,09 Lainnya
          </Text>
          <Text
            style={{
              width: "30%",
              padding: 4,
              borderBottom: "1px solid black",
            }}
          >
            17.221,59
          </Text>
        </View>

        {/* Row 3 */}
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              width: "5%",
              padding: 4,
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            3
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
            Ultra Milk Chocolate 125 Ml/40{"\n"}
            Rp 102.883,00 x 0,03 Lainnya
          </Text>
          <Text
            style={{
              width: "30%",
              padding: 4,
              borderBottom: "1px solid black",
            }}
          >
            3.086,49
          </Text>
        </View>
      </View>

      {/* Summary */}
      <Text>
        Harga Jual / Penggantian / Uang Muka / Termin berdasarkan Faktur Pajak
      </Text>
      <Text>41.073.645,00</Text>
      <Text>Harga Jual / Penggantian / Uang Muka / Termin yang diretur</Text>
      <Text>21.090,00</Text>
      <Text>PPN yang diretur</Text>
      <Text>2.320,00</Text>
      <Text>PPnBM yang diretur</Text>
      <Text>0,00</Text>

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
          <Text>KOTA BALIKPAPAN, 23 Juni 2025</Text>
          <Text style={{ fontWeight: "bold", marginTop: 20 }}>
            LAUW, IRMA YUANITHA
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
          <Text>QR</Text>
        </View>
      </View>

      <Text style={{ fontStyle: "italic", marginTop: 4 }}>
        Ditandatangani secara elektronik
      </Text>
    </Page>
  </Document>
);
