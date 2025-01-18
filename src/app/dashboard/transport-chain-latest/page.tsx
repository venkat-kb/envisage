import LabelledFormInput from "@/components/form/labelled-form-input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TransportChainForm from "./transport-chain-form";
import { prisma } from "@/lib/db";

export default async function Page() {
  const roadEmissions = await prisma.roadVehicle.findMany();
  const waterEmissions = await prisma.waterEmission.findMany();
  return (
    <div className="w-full flex gap-4 max-h-full overflow-auto h-full">
      <div className="min-w-[300px] ">
        <Card className="min-w-[300px] backdrop-blur-sm bg-transparent shadow-xl max-h-max h-max max-w-[300px]">
          <CardHeader>
            <CardTitle className="font-medium text-center">
              Transport Chain
            </CardTitle>
            <CardDescription>
              Join your transportation operations across various freight methods
              into a single cumulative transport chain element. This allows you
              to track and manage your transportation operations, from the first
              mile to the last mile.
            </CardDescription>

            <CardDescription>
              In the event that that freight methods defined for transportation
              between any two places doesn't directly connect, the system will
              automatically find the best possible route to connect the two
              places.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex w-full gap-8 h-full min-h-[80vh] justify-start">
        <TransportChainForm
          roadData={roadEmissions}
          waterData={waterEmissions}
        />
      </div>
    </div>
  );
}
