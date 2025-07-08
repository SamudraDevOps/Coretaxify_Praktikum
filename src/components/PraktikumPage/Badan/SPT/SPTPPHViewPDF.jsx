import { ViewerPDF } from "../../PDFTemplate/PDFViewer";
import SptMasaPph21Pdf from "../../PDFTemplate/SPTMasaPPH";

export default function SPTPPHViewPDF({ data }) {
  console.log(data);
  return (
    <div>
      <ViewerPDF document={<SptMasaPph21Pdf data={data} />} />
    </div>
  );
}
