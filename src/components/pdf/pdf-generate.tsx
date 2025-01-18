"use client";
import React from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  Svg,
  Path,
  View,
  Text,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import PDFTable from "./pdf-table";
import ShipmentHeader from "./pdf-heading";
import { Profile, Shipment, User } from "@prisma/client";
import PDFDisclaimer from "./pdf-disclaimer";
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const disclaimers = [
  "The IIM Bangalore (IIM-B) has prepared this Transportation emissions calculator to provide the general public with a free and up-to-date methodology for estimating GHG Emissions from freight transportation.",
  "IIM Bangalore makes no representations as to the accuracy, completeness, suitability or validity of any information on this tool and will not be liable for any errors, omissions, or delays in this information or any losses, injuries, or damages arising from its display or use. ",
  "The contents in, and linked to, this tool do not reflect the policy or position of the IIM-B and do not imply IIM-B endorsement. Under no circumstances shall the IIM-B be liable for any loss, damage, liability or expense incurred or suffered that is claimed to have resulted from the use of this tool, its data or its methodology, or from the conduct of any user. ",
  "Use of this online calculator and reliance upon the content in or linked to it is solely at the user's own risk. ",
  // "The emission factors used in this online tool are sourced from references that may not be applicable to all geographic locations.",
  "The user is encouraged to use more suitable emission factors when they are available. Each user agrees to decide if, when and how to use this tool, and does so at his or her sole risk. ",
  "The IIM Bangalore is not responsible for, nor does it endorse, the results of third parties' calculations using this tool. ",
];

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const PDFGenerate: React.FC<{
  data: Shipment[];
  user: User & { Profile: Profile };
  from: Date;
  to: Date;
}> = ({ data, user, from, to }) => (
  <div className="w-[80vw] h-[80vh]">
    <PDFViewer width="100%" height="100%" className="app">
      <Document>
        <Page size="A4" style={styles.page}>
          {/* <Image style={styles.logo} src={logo} /> */}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {/* <Svg width="240" height="50" viewBox="0 0 268 133" fill="none">
              <Path d="M46 133V21L0 20.5V2H116.5V21H68V133H46Z" fill="black" />
              <Path
                d="M197 131V18.5H151V0H267.5V18.5H219V131H197Z"
                fill="black"
              />
              <Path d="M112.5 64H67V80H112.5V64Z" fill="black" />
              <Path
                d="M142.152 27.7165L116.435 2L103 15.435L128.717 41.1515L142.152 27.7165Z"
                fill="black"
              />
              <Path
                d="M145.255 95.8198L113.435 64L100 77.435L131.82 109.255L145.255 95.8198Z"
                fill="black"
              />
              <Path
                d="M150.82 64L119 95.8198L132.435 109.255L164.255 77.435L150.82 64Z"
                fill="black"
              />
              <Path d="M151 64V131H177V64H151Z" fill="black" />
              <Path d="M112.5 117H67V133H112.5V117Z" fill="black" />
            </Svg> */}
            <Text>Ulip Hackathon</Text>
          </View>
          <ShipmentHeader
            from={from}
            to={to}
            title="GHG Emission Report"
            user={user}
          />
          <PDFTable data={data} />
          <PDFDisclaimer />
        </Page>
      </Document>
    </PDFViewer>
  </div>
);

export default PDFGenerate;
