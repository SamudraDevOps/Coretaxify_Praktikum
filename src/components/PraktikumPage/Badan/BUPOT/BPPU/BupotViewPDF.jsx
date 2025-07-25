import BupotUnifikasiPDF from "@/components/PraktikumPage/PDFTemplate/BupotUnifikasiTemplate";
import { ViewerPDF } from "@/components/PraktikumPage/PDFTemplate/PDFViewer";

export default function BupotViewPDF({ data }) {
  console.log("pdfdata", data);
  return (
    <div>
      <ViewerPDF document={<BupotUnifikasiPDF data={data} />} />
    </div>
  );
}
