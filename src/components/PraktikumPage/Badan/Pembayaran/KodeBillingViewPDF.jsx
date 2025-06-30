import BillingCodePdf from "../../PDFTemplate/BillingCodeTemplate";
import { ViewerPDF } from "../../PDFTemplate/PDFViewer";

export default function KodeBillingViewPDF({ data }) {
  console.log(data);
  return (
    <div>
      <ViewerPDF document={<BillingCodePdf data={data} />} />
    </div>
  );
}
