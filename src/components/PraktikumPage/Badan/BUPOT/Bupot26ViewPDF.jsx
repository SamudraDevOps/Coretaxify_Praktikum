import BP26PDF from "@/components/PraktikumPage/PDFTemplate/Bupot26Template";
import { ViewerPDF } from "@/components/PraktikumPage/PDFTemplate/PDFViewer";

export default function Bupot26ViewPDF({ data }) {
  console.log("pdfdata BP26", data);
  return (
    <div>
      <ViewerPDF document={<BP26PDF data={data} />} />
    </div>
  );
}
