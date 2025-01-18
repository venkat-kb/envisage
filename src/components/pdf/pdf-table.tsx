"use client";
import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { Shipment } from "@prisma/client";
import PDFRows from "./pdf-row";

const tableRowsCount = 11;

const borderColor = "#64748B";
const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#64748B",
    borderTopWidth: 0,
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#64748B",
    borderBottomWidth: 1,
    borderTopColor: "#64748B",
    borderTopWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  description: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontSize: "8px",
    textAlign: "center",
    height: 24,
    paddingTop: 6,
  },
  co2e: {
    width: "20%",
    fontSize: "8px",
    height: 24,
    paddingTop: 6,
  },
  ten: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    fontSize: "8px",
    height: 24,
    paddingTop: 6,
  },
});

const PDFTable: React.FC<{ data: Shipment[] }> = ({ data }) => (
  <>
    <View style={styles.tableContainer}>
      <View style={styles.container} fixed>
        <Text style={{ ...styles.ten, width: "5%" }}>S. No</Text>
        <Text style={{ ...styles.ten, width: "10%" }}>From</Text>
        <Text style={{ ...styles.ten, width: "10%" }}>To</Text>
        <Text style={{ ...styles.ten, width: "10%" }}>Freight</Text>
        <Text style={{ ...styles.description, width: "20%" }}>Origin</Text>
        <Text style={{ ...styles.description, width: "20%" }}>Destination</Text>
        <Text style={{ ...styles.co2e, width: "10%", borderRightWidth: 1 }}>
          Load MT
        </Text>
        <Text style={{ ...styles.co2e, width: "15%" }}>CO2e MT</Text>
      </View>
      <PDFRows data={data} />
      {/* <InvoiceTableHeader />
        <InvoiceTableRow items={invoice.items} />
        <InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice.items.length} />
        <InvoiceTableFooter items={invoice.items} /> */}
    </View>
  </>
);

export default PDFTable;
