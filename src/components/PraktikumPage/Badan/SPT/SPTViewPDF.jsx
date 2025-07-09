import { ViewerPDF } from "../../PDFTemplate/PDFViewer";
import SptPpnPdf from "../../PDFTemplate/SPTPPN";

export default function SPTViewPDF({ data }) {
  console.log(data);
  return (
    <div>
      <ViewerPDF document={<SptPpnPdf data={data} />} />
    </div>
  );
}
