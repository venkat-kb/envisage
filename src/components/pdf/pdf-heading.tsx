import { Profile, User } from "@prisma/client";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  reportTitle: {
    letterSpacing: 4,
    fontSize: 25,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  invoiceContainer: {
    flexDirection: "row",
  },

  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    width: 80,
    color: "#64748B",
  },
});

const ShipmentHeader: React.FC<{
  title: string;
  user: User & { Profile: Profile };
  from: Date;
  to: Date;
}> = ({ title, user, from, to }) => (
  <>
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>{title}</Text>
    </View>
    <View style={styles.invoiceContainer}>
      <Text style={styles.label}>Generated By</Text>
      <Text>Vaahan Blend</Text>
    </View>
    <View style={styles.invoiceContainer}>
      <Text style={styles.label}>Generated On</Text>
      <Text>
        {new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </Text>
    </View>
    <View style={styles.invoiceContainer}>
      <Text style={styles.label}>Generated For</Text>
      <Text>{user.Profile.name}</Text>
    </View>
    <View style={styles.invoiceContainer}>
      <Text style={styles.label}>Company</Text>
      <Text>{user.Profile.companyName}</Text>
    </View>
    <View style={styles.invoiceContainer}>
      <Text style={styles.label}>Address</Text>
      <Text>{user.Profile.companyAddress}</Text>
    </View>
    <View style={styles.invoiceContainer}>
      <Text style={styles.label}>Data Range</Text>
      <Text>
        {from.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}{" "}
        -{" "}
        {to.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </Text>
    </View>
  </>
);

export default ShipmentHeader;
