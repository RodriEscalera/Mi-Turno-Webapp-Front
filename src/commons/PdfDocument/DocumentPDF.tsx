import React from "react";
import { Document, Page, Text, View, Image, Svg } from "@react-pdf/renderer";
import checkIcon from "./checkIcon.png";
import QRCode from "react-qr-code";

const DocumentPDF = ({ id }: any) => {
  const canva = document.getElementById(id) as HTMLCanvasElement;
  const dataUrl = canva?.toDataURL();
  return (
    <Document>
      <Page
        id={`pages_${id}`}
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10vh",
          }}
        ></View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5vh",
          }}
        >
          <Text style={{ color: "#A442F1", fontSize: "42px" }}>
            ¡Gracias por tu compra!
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: "15px",
              textAlign: "center",
              marginTop: "3vh",
            }}
          >
            Acercate a la sucursal correspondiente para imprimir tu turno.
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: "15px",
              textAlign: "center",
              marginTop: "3vh",
            }}
          >
            Tu codigo QR:
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5vh",
          }}
        >
          <Image
            style={{
              height: "40vw",
              width: "40vw",
            }}
            src={dataUrl}
          />
        </View>
      </Page>
    </Document>
  );
};

export default DocumentPDF;

{
  /* <Document>
<Page
  size="A4"
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  }}
>
  <View
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    }}
  >
    <Text style={{ color: "#3388af", fontSize: "42px" }}>
      Hola amigos de youtube
    </Text>
  </View>
</Page>
</Document> */
}
