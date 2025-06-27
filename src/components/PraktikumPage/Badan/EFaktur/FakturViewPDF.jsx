import FakturPajakKeluaranPdf from "../../PDFTemplate/FakturKeluaran";
import { ViewerPDF } from "../../PDFTemplate/PDFViewer";

export default function FakturViewPDF({ data }) {
  console.log(data);
  return (
    <div>
      <ViewerPDF document={<FakturPajakKeluaranPdf data={data} />} />
    </div>
  );
}
