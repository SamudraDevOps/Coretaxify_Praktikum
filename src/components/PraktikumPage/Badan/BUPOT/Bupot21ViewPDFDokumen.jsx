import BP21PDFDokumen from "@/components/PraktikumPage/PDFTemplate/Bupot21TemplateDokumen";
import { ViewerPDF } from "@/components/PraktikumPage/PDFTemplate/PDFViewer";
import { useParams } from "react-router-dom";


export default function Bupot21ViewPDFDokumen({ data }) {
  const { dokumen } = useParams();
  // Pastikan dokumen adalah string, samakan dengan id di data
  const dokumenObj = Array.isArray(data)
    ? data.find((item) => String(item.id) === String(dokumen))
    : data;

  // console.log("pdfdata testing", dokumenObj); 

  return (
    <div>
      <ViewerPDF document={<BP21PDFDokumen data={dokumenObj} />} />
    </div>
  );
}
