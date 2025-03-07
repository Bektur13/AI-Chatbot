import { UseFormRegister, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";

type FormGeneratorProps = {
  fields: { name: string; placeholder: string; type?: string }[];
  register: UseFormRegister<FieldValues>;
};

const FormGenerator = ({ fields, register }: FormGeneratorProps) => {
  return (
    <div className="space-y-3">
      {fields.map(({ name, placeholder, type = "text" }) => (
        <Input key={name} {...register(name)} placeholder={placeholder} type={type} />
      ))}
    </div>
  );
};

export default FormGenerator;
