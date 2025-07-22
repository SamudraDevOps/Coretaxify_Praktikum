import FakturPajakKeluaranPdf from "../../PDFTemplate/FakturKeluaran";
import { ViewerPDF } from "../../PDFTemplate/PDFViewer";
import { ReturFakturPDF } from "../../PDFTemplate/ReturFakturTemplate";

export default function ReturFakturViewPDF({ data }) {
  console.log(data);
  return (
    <div>
      <ViewerPDF document={<ReturFakturPDF data={data} />} />
    </div>
  );
}
