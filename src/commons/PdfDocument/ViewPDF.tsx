import React from "react";
import DocumentPDF from "./DocumentPDF";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import QRGenerator from "./QrGenerator";
function ViewPDF() {
  const qrId = { id: "999", value: "Marico" };
  return (
    <>
      <div className="absolute hidden">
        <QRGenerator value={qrId.value} documentId={qrId.id} />
      </div>
      <div className="h-[100vh] w-full z-20">
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <DocumentPDF id={qrId.id} />
        </PDFViewer>
      </div>
    </>
  );
}

/*

<PDFDownloadLink document={<DocumentPDF />} fileName="turno.pdf">
          <button className="h-[3rem] w-[7rem] bg-slate-600 rounded-md text-white hover:bg-slate-500">
            Download PDF
          </button>
        </PDFDownloadLink>
*/

export default ViewPDF;
