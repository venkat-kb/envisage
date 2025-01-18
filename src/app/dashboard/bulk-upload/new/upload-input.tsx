"use client";
import { FormDescription } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { UploadCloud, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const FileUploadInput: React.FC<{
  setFile: Dispatch<SetStateAction<File | undefined>>;
  name: string;
  file: File | undefined;
}> = ({ file, name, setFile }) => {
  return (
    <>
      <Label aria-required>Upload</Label>
      <label className="w-full flex items-center justify-center gap-2  p-2 border rounded-lg cursor-pointer flex-row">
        <span className="text-center text-sm ">Add Excel File</span>
        <UploadCloud
          size={24}
          strokeWidth={1}
          color={file ? "green" : "black"}
        />
        <input
          type="file"
          style={{ display: "none" }}
          // accept only excel files
          accept=".xlsx"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFile(e.target.files![0]);
          }}
        />
      </label>
      <div className="flex gap-1 flex-wrap">
        {file && (
          <p className="p-1 flex gap-1 f text-[0.6rem] border rounded-lg">
            {file.name}{" "}
            <X
              size={12}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setFile(undefined);
              }}
            />
          </p>
        )}
      </div>
    </>
  );
};

export default FileUploadInput;
