import BPA1PDF from "@/components/PraktikumPage/PDFTemplate/BupotA1Template";
import { ViewerPDF } from "@/components/PraktikumPage/PDFTemplate/PDFViewer";

export default function Bupot21ViewPDF({ data }) {
  console.log("pdfdata", data);
  return (
    <div>
      <ViewerPDF document={<BPA1PDF data={data} />} />
    </div>
  );
}
