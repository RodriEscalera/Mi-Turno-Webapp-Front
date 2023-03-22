import React from "react";
import QRCode from "qrcode.react";

interface props {
  value: string;
  documentId: string;
}
function QRGenerator(props: props) {
  const { value, documentId } = props;
  return (
    <div style={{ height: "40px", width: "40px" }}>
      <QRCode
        id={documentId}
        value={value}
        size={50}
        bgColor="#F5F5F5"
        fgColor="#000"
        includeMargin
        level={"H"}
      />
    </div>
  );
}

export default QRGenerator;
