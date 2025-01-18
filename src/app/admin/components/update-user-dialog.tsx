"use client";
import LabelledFormInput from "@/components/form/labelled-form-input";
import SwitchFormInput from "@/components/form/switch-form-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Switch } from "@/components/ui/switch";
import {
  ICreateUser,
  IUpdateUser,
} from "@/lib/validators/iam/create-user-validator";
import { Profile, User } from "@prisma/client";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "../users/new/api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const UpdateUserDialog: React.FC<{
  open: boolean;
  setOpen: (x: boolean) => void;
  user: User & {
    Profile: Profile;
  };
}> = ({ open, setOpen, user }) => {
  const form = useForm<IUpdateUser>({
    defaultValues: {
      email: user.email,
      name: user.Profile.name,
      contactNumber: user.Profile.contactNumber,
      companyAddress: user.Profile.companyAddress,
      companyName: user.Profile.companyName,
      password: user.password,
      active: user.Active,
    },
  });
  const toast = useToast().toast;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: IUpdateUser) => {
    setLoading(true);
    updateUser(user.id, data)
      .then((res) => {
        if (res) {
          toast({
            title: "Success!",
            description: "User has been updated successfully",
          });
          startTransition(() => {
            router.refresh();
            setOpen(false);
          });
        } else {
          toast({
            title: "Whoops!",
            description: "Failed to update user",
            variant: "destructive",
          });
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-max max-h-[80vh] overflow-auto min-h-max flex justify-normal flex-col">
        <DialogHeader className="sticky top-0 backdrop-blur-sm  z-[1000] mr-4">
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>Edit User Details</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <LabelledFormInput
              control={form.control}
              label="Name"
              name="name"
              placeholder="John Doe"
            />
            <LabelledFormInput
              control={form.control}
              label="Email"
              name="email"
              placeholder="jane.doe@gmail.com"
            />
            <LabelledFormInput
              control={form.control}
              label="Password"
              name="password"
              placeholder="********"
            />
            <LabelledFormInput
              control={form.control}
              label="Contact Number"
              name="contactNumber"
              placeholder="1234567890"
            />
            <LabelledFormInput
              control={form.control}
              label="Company Name"
              name="companyName"
              placeholder="Company Inc."
            />
            <LabelledFormInput
              control={form.control}
              label="Company Address"
              name="companyAddress"
              placeholder="1234 Company St."
            />
            <SwitchFormInput
              control={form.control}
              label="Active"
              name="active"
            />
            <Button type="submit" disabled={loading}>
              {loading && (
                <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
              )}
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
