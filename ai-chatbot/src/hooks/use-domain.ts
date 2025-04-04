// import { useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { FieldValues, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AddDomainSchema } from "@/schemas/settings.schema"; // TODO: Define this schema
// import { UploadClient } from "@uploadcare/upload-client";
// import { onIntegrateDomain } from "@/actions/setting";
// import { toast } from "sonner";


// const upload = new UploadClient({
//   publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
// });

// export const useDomain = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm<AddDomainSchemaType>({
//     resolver: zodResolver(AddDomainSchema), // Use correct Zod schema
//   });


//   const pathname = usePathname();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
//   const router = useRouter();

//   useEffect(() => {
//     setIsDomain(pathname.split("/").pop()); // Extract domain from URL
//   }, [pathname]);

//   const onAddDomain = handleSubmit(async (values: FieldValues) => {
//     setLoading(true);

//     try {

//         let iconUrl: string | undefined = values.icon;
//       // TODO: Upload the domain icon image

//       if(values.icon instanceof File) {
//         const file = await upload.uploadFile(values.icon);
//         iconUrl = file.cdnUrl;
//       }
//       // TODO: Call the server action to add the domain
      
//       const response = await onIntegrateDomain(values.domain, iconUrl || "" ) 
      
//       toast({ title: response.status === 200 ? "Success" : "Error", description: response.message });

//       if (response.status === 200) {
//         reset(); // Reset form after success
//         router.refresh(); // Refresh the UI
//       }
//     } catch (error) {
//       console.error(error);
//       toast({ title: "Error", description: "Something went wrong" });
//     } finally {
//       setLoading(false);
//     }
//   });

//   return { register, onAddDomain, errors, loading, isDomain };
// };



import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddDomainSchema, AddDomainSchemaType } from "@/schemas/settings.schema"; // Fix Type
import { UploadClient } from "@uploadcare/upload-client";
import { onIntegrateDomain } from "@/actions/setting";
import { toast } from "sonner";

// Initialize UploadCare client
const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
});

export const useDomain = () => {
  // ✅ Explicitly define form types
  const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm<AddDomainSchemaType>({
    resolver: zodResolver(AddDomainSchema), // Use correct Zod schema
  });

  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    setIsDomain(pathname.split("/").pop()); // Extract domain from URL
  }, [pathname]);

  const onAddDomain = handleSubmit(async (values) => {
    setLoading(true);

    try {
        let iconUrl: string | undefined;

        // Check if `values.icon` is a File before uploading
        if (values.icon instanceof File) {
          const file = await upload.uploadFile(values.icon);
          iconUrl = file.cdnUrl; // Uploaded file returns a string URL
        } else if (typeof values.icon === "string") {
          iconUrl = values.icon; // Keep existing URL if already a string
        }
      // ✅ Call the server action to add the domain
      const response = await onIntegrateDomain(values.domain, iconUrl || "");

      // ✅ Fix Sonner toast usage (no object, just string arguments)
      if (response.status === 200) {
        toast.success("Domain successfully added");
        reset(); // Reset form after success
        router.refresh(); // Refresh the UI
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  });

  return { register, setValue, onAddDomain, errors, loading, isDomain };
};
