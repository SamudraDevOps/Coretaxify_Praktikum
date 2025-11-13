import BpeSptPdf from "../../PDFTemplate/BPESPTTemplate";
import { ViewerPDF } from "../../PDFTemplate/PDFViewer";

export default function SPTUnifikasiViewBPE({ data }) {
  console.log(data);
  return (
    <div>
      <ViewerPDF document={<BpeSptPdf data={data} />} />
    </div>
  );
}
