import { useField } from "formik";

export function CustomInput({ label, ...props }) {
  const [field, meta] = useField(props);
  // console.log(field, meta);
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        {...field}
        {...props}
        autoComplete="off"
        className={
          meta.touched && meta.error
            ? "outline-none border border-red rounded-[4px] w-[380px] h-[48px] p-[12px] placeholder-gray-500 max-sm:w-[343px] bg-[#21263F]"
            : "border rounded-[4px] w-[380px] h-[48px] p-[12px] placeholder-gray-500 max-sm:w-[343px] bg-[#21263F] border-[#565F7E] text-white"
        }
      />
      {meta.touched && meta.error && (
        <div className="text-red text-[12px]">{meta.error}</div>
      )}
    </div>
  );
}
export function CustomCheckBox({ label, ...props }) {
  const [field, meta] = useField(props);
  // console.log(field, meta);
  return (
    <div className="flex gap-[16px]">
      <input {...field} {...props} className="w-[20px] h-[20px]" />
      <span>Remember</span>
    </div>
  );
}
