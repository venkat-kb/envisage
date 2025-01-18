import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Shipment } from "@prisma/client";

const borderColor = "#64748B";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#64748B",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    fontSize: "8px",
  },
  description: {
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
    overflow: "hidden",
    height: 24,
    paddingTop: 7,
  },

  co2e: {
    textAlign: "right",
    paddingRight: 8,
    height: 24,
    paddingTop: 7,
  },
  ten: {
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
    height: 24,
    paddingTop: 7,
  },
  count: {
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
    height: 24,
    paddingTop: 7,
  },
  date: {
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "left",
    height: 24,
    paddingTop: 7,
  },
});

const PDFRows: React.FC<{ data: Shipment[] }> = ({ data }) => {
  const rows = data.map((item, i) => (
    <View style={styles.row} key={i}>
      <Text style={{ ...styles.count, width: "5%" }}>{i + 1}</Text>
      <Text style={{ ...styles.ten, width: "10%" }}>
        {item.from.toLocaleDateString()}
      </Text>
      <Text style={{ ...styles.ten, width: "10%" }}>
        {item.to.toLocaleDateString()}
      </Text>
      <Text style={{ ...styles.ten, width: "10%" }}>{item.category}</Text>

      <Text style={{ ...styles.description, width: "20%" }}>{item.origin}</Text>
      <Text style={{ ...styles.description, width: "20%" }}>
        {item.destination}
      </Text>
      <Text style={{ ...styles.co2e, width: "10%", borderRightWidth: 1 }}>
        {item.load}
      </Text>
      <Text style={{ ...styles.co2e, width: "15%" }}>
        {(item.co2e / 1000).toFixed(4)}
      </Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default PDFRows;
