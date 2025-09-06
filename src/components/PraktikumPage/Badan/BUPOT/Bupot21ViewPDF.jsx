import BP21PDF from "@/components/PraktikumPage/PDFTemplate/Bupot21Template";
import { ViewerPDF } from "@/components/PraktikumPage/PDFTemplate/PDFViewer";

export default function Bupot21ViewPDF({ data }) {
  console.log("pdfdata", data);
  return (
    <div>
      <ViewerPDF document={<BP21PDF data={data} />} />
    </div>
  );
}
