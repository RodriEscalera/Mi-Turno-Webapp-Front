import React from "react";
import { Document, Page, Text, View, Image, Svg } from "@react-pdf/renderer";
import checkIcon from "./checkIcon.png";
import QRCode from "react-qr-code";

const DocumentPDF = ({ id, data }: any) => {
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
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10vh",
          }}
        >
          <Text style={{ color: "#A442F1", fontSize: "42px" }}>
            ¡Gracias por tu compra!
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3vh",
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: "3vh",
              textAlign: "center",
              width: "80%",
            }}
          >
            Acercate a la sucursal correspondiente para imprimir tu turno.
          </Text>
        </View>
        <Text
          style={{
            color: "black",
            fontSize: "3vh",
            textAlign: "center",
            marginTop: "3vh",
          }}
        >
          Tu codigo QR:
        </Text>

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

        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "3vh",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: "3vh",
              marginLeft: "7vw",
            }}
          >
            Detalles de la reserva:
          </Text>
        </View>

        {/*  */}
        <View
          style={{
            display: "flex",
            width: "100%",
            height: "20vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "3vh",
              width: "100%",
            }}
          >
            <Text
              style={{
                marginLeft: "7vw",
              }}
            >
              ID de reserva: {data._id}
            </Text>
            <Text
              style={{
                marginLeft: "7vw",
              }}
            >
              Fecha de creación: {data.createdAt}
            </Text>

            <Text
              style={{
                marginLeft: "7vw",
              }}
            >
              Fecha de la reserva: {data.date}
            </Text>
            <Text
              style={{
                marginLeft: "7vw",
              }}
            >
              Horario de la reserva: {data.time}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "3vh",
              width: "100%",
            }}
          >
            <Text
              style={{
                marginLeft: "7vw",
              }}
            >
              Nombre y apellido: {data.fullName}
            </Text>
            <Text
              style={{
                marginLeft: "7vw",
              }}
            >
              Email: {data.email}
            </Text>

            <Text
              style={{
                marginLeft: "7vw",
              }}
            >
              Teléfono: {data.phone}
            </Text>
          </View>
        </View>
        {/*  */}
      </Page>
    </Document>
  );
};

export default DocumentPDF;
