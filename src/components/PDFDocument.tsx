import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  prompt: {
    marginTop: 30,
    marginHorizontal: 30,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  instructions: {
    marginHorizontal: 30,
    paddingBottom: 30,
    fontStyle: "italic",
    color: "gray",
  },
  answer: {
    marginHorizontal: 30,
    padding: 30,
    backgroundColor: "#eee",
    borderRadius: 6,
  },
});

type PDFDocumentProps = {
  prompt: string;
  instructions: string;
  answer: string;
};

export const PDFDocument = (props: PDFDocumentProps) => {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.prompt}>{props.prompt}</Text>
        <Text style={styles.instructions}>{props.instructions}</Text>
        <Text style={styles.answer}>{props.answer || "no response"}</Text>
      </Page>
    </Document>
  );
};
