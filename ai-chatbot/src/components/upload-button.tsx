import { useState } from "react";
import { UploadClient } from "@uploadcare/upload-client";
import { UseFormSetValue } from "react-hook-form";
import { Button } from "@/components/ui/button";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});

type UploadButtonProps = {
  setValue: UseFormSetValue<any>; // Hook form's setValue to update the form state
};

const UploadButton = ({ setValue }: UploadButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const uploadedFile = await upload.uploadFile(file);
      setValue("icon", uploadedFile.cdnUrl, { shouldValidate: true }); // ✅ Set form value
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" onChange={handleUpload} disabled={loading} />
      {loading && <p>Uploading...</p>}
    </div>
  );
};

export default UploadButton;
