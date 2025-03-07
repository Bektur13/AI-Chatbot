// import { useDomain } from "@/hooks/use-domain";
// import { cn } from "@/lib/utils";
// import { useState } from "react";
// import { PlusCircle, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import UploadButton from "@/components/upload-button";
// import FormGenerator from "@/components/forms/form-generator";

// type Props = {
//   min?: boolean;
//   domains: { id: string; name: string; icon: string | null }[] | null | undefined;
// };

// const DomainMenu = ({ domains, min }: Props) => {
//   const { register, setValue, onAddDomain, loading, errors, isDomain } = useDomain();
//   const [open, setOpen] = useState(false);

//   return (
//     <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
//       {/* Header with Add Domain Button */}
//       <div className="flex justify-between w-full items-center">
//         {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <PlusCircle className="cursor-pointer" size={25} />
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New Domain</DialogTitle>
//             </DialogHeader>
//             {/* Form to add a new domain */}
//             <form onSubmit={onAddDomain} className="space-y-4">
//               <Input 
//                 {...register("domain")}
//                 placeholder="Enter domain name"
//                 className="w-full"
//               />
//               {errors.domain && <p className="text-red-500 text-sm">{errors.domain.message}</p>}
              
//               {/* Upload button for domain icon */}
//               <UploadButton setValue = {setValue} />
//               {errors.icon && <p className="text-red-500 text-sm">{errors.icon.message}</p>}
              
//               <Button type="submit" disabled={loading} className="w-full">
//                 {loading ? <Loader2 className="animate-spin" /> : "Add Domain"}
//               </Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Render existing domains */}
//       {domains?.length ? (
//         <div className="flex flex-col gap-2">
//           {domains.map((domain) => (
//             <Link key={domain.id} href={`/dashboard/${domain.name}`} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition">
//               {domain.icon ? (
//                 <Image src={domain.icon} alt={domain.name} width={24} height={24} className="rounded-full" />
//               ) : (
//                 <div className="w-6 h-6 bg-gray-200 rounded-full" />
//               )}
//               <span className="text-sm">{domain.name}</span>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <p className="text-xs text-gray-500">No domains added yet.</p>
//       )}
//     </div>
//   );
// };

// export default DomainMenu;



import { useState } from "react";
import { useDomain } from "@/hooks/use-domain";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import UploadButton from "@/components/upload-button";

const DomainMenu = ({ domains, min }: { domains?: any[]; min?: boolean }) => {
  const { register, setValue, onAddDomain, loading, errors } = useDomain();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
      <div className="flex justify-between w-full items-center">
        {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <PlusCircle className="cursor-pointer" size={25} />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add a Domain</DialogTitle>
            <form onSubmit={onAddDomain} className="space-y-4">
              <input {...register("domain")} placeholder="Domain Name" className="border p-2 w-full" />
              <UploadButton setValue={setValue} />
              <Button type="submit" disabled={loading}>Add</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Render existing domains */}
      {domains?.map((domain) => (
        <div key={domain.id} className="flex items-center space-x-2">
          {domain.icon && <img src={domain.icon} alt="Icon" className="w-6 h-6" />}
          <p>{domain.name}</p>
        </div>
      ))}
    </div>
  );
};

export default DomainMenu;
