"use client";

import { Text, View } from "@react-pdf/renderer";

const disclaimers = [
  "The IIM Bangalore (IIM-B) has prepared this Transportation emissions calculator to provide the general public with a free and up-to-date methodology for estimating GHG Emissions from freight transportation.",
  "IIM Bangalore makes no representations as to the accuracy, completeness, suitability or validity of any information on this tool and will not be liable for any errors, omissions, or delays in this information or any losses, injuries, or damages arising from its display or use. ",
  "The contents in, and linked to, this tool do not reflect the policy or position of the IIM-B and do not imply IIM-B endorsement. Under no circumstances shall the IIM-B be liable for any loss, damage, liability or expense incurred or suffered that is claimed to have resulted from the use of this tool, its data or its methodology, or from the conduct of any user. ",
  "Use of this online calculator and reliance upon the content in or linked to it is solely at the user's own risk. ",
  // "The emission factors used in this online tool are sourced from references that may not be applicable to all geographic locations.",
  "The user is encouraged to use more suitable emission factors when they are available. Each user agrees to decide if, when and how to use this tool, and does so at his or her sole risk. ",
  "The IIM Bangalore is not responsible for, nor does it endorse, the results of third parties' calculations using this tool. ",
];

const PDFDisclaimer: React.FC = () => (
  <View style={{ marginTop: 8 }}>
    <Text style={{ fontWeight: "bold" }}>Disclaimer</Text>
    {disclaimers.map((disclaimer, i) => (
      <Text style={{ fontSize: 8 }} key={i}>
        {i + 1}. {disclaimer}
      </Text>
    ))}
  </View>
);
export default PDFDisclaimer;
