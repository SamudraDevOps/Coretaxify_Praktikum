import React from "react";
import { PDFViewer } from "@react-pdf/renderer";

export const ViewerPDF = ({ document }) => (
  <PDFViewer
    style={{
      width: "100%",
      height: "80vh",
      border: "none",
      backgroundColor: "hsl(var(--background))",
    }}
  >
    {document}
  </PDFViewer>
);

// Usage example:
// <ViewerPDF document={<PDFFakturKeluaran data={yourData} />} />
