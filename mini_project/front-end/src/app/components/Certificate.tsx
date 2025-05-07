"use client";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";
import QRCode from "qrcode";

export interface CertificateProps {
  name: string;
  issueDate: string;
  startDate: string;
  endDate: string;
  score: string;
  verifyUrl: string;
}

export default function Certificate({
  name,
  issueDate,
  startDate,
  endDate,
  score,
  verifyUrl,
}: CertificateProps) {
  const styles = StyleSheet.create({
    page: {
      position: "relative",
      padding: 40,
      fontFamily: "Helvetica",
      backgroundColor: "#fff",
    },
    watermark: {
      position: "absolute",
      width: 500,
      height: 500,
      opacity: 0.1,
      left: "20%",
    },
    centeredWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    name: {
      fontSize: 18,
      marginVertical: 10,
      fontWeight: "bold",
    },
    bodyText: {
      marginVertical: 4,
      fontSize: 12,
    },
    infoGrid: {
      marginTop: 30,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "60%",
    },

    infoColumn: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },

    infoBlock: {
      fontSize: 11,
      textAlign: "left",
    },
    logo: {
      width: 60,
      height: 60,
      marginBottom: 10,
    },
    qrImage: {
      position: "absolute",
      bottom: 40,
      right: 40,
      width: 60,
      height: 60,
    },
  });

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Image style={styles.qrImage} src={QRCode.toDataURL(verifyUrl)} />
        <Image style={styles.watermark} src="/phindojo-logo.png" />
        <Image style={styles.logo} src="/phindojo-logo.png" />
        <View style={styles.centeredWrapper}>
          <Text style={styles.header}>CERTIFICATE OF COMPLETION</Text>
          <Text style={styles.bodyText}>This certifies that</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.bodyText}>
            has completed the necessary courses of study and passed the
            W3Schools' React exams and is hereby declared a
          </Text>

          {/* New section with score and date info */}
          <View style={styles.infoGrid}>
            <View style={styles.infoColumn}>
              <View style={styles.infoBlock}>
                <Text>Score:</Text>
                <Text>{score}</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text>Issued:</Text>
                <Text>{issueDate}</Text>
              </View>
            </View>
            <View style={styles.infoColumn}>
              <View style={styles.infoBlock}>
                <Text>Start Date:</Text>
                <Text>{startDate}</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text>End Date:</Text>
                <Text>{endDate}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
