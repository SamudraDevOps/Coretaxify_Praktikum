import { ViewerPDF } from "../../PDFTemplate/PDFViewer";
import SptPpnPdf from "../../PDFTemplate/SPTPPN";
import SPTUnifikasiPDF from "../../PDFTemplate/SPTUnifikasiTemplate";

export default function SPTUnifikasiViewPDF({ data }) {
  console.log(data);
  return (
    <div>
      <ViewerPDF document={<SPTUnifikasiPDF data={data} />} />
    </div>
  );
}
