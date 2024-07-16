import { useField } from "formik";

// export function CustomInput({ label, ...props }) {
//   const [field, meta] = useField(props);
//   //   console.log(`field: ${field}  meta: ${meta}`);
//   // console.log(field, meta);
//   return (
//     <div className="flex flex-col">
//       <label>{label}</label>
//       <input
//         {...field}
//         {...props}
//         className={
//           meta.touched && meta.error
//             ? "outline-none border border-red-600 rounded-[4px] w-[380px] h-[48px] p-[12px] placeholder-gray-500 max-[375px]:w-[343px] bg-[#21263F]"
//             : "border rounded-[4px] w-[380px] h-[48px] p-[12px] placeholder-gray-500 max-[375px]:w-[343px] bg-[#21263F] border-[#565F7E]"
//         }
//       />
//       {meta.touched && meta.error && (
//         <div className="text-red-600 text-[12px]">{meta.error}</div>
//       )}
//     </div>
//   );
// }
// export function CustomCheckBox({ label, ...props }) {
//   const [field, meta] = useField(props);
//   //   console.log(`field: ${field}  meta: ${meta}`);
//   // console.log(field, meta);
//   return (
//     <div className="flex gap-[16px]">
//       <input {...field} {...props} className="w-[20px] h-[20px]" />
//       <span>Remember</span>
//     </div>
//   );
// }
export function CustomInput({ label, ...props }) {
  const [field, meta] = useField(props);
  // console.log(field, meta);
  return (
    <div className="flex flex-col">
      <label className="text-gray-400">{label}</label>
      <input
        {...field}
        {...props}
        autoComplete="off"
        className={
          meta.touched && meta.error
            ? "outline-none border border-red rounded-[4px] w-[380px] h-[48px] p-[12px] placeholder-gray-300 max-sm:w-[343px] bg-gray-100 "
            : "border rounded-[4px] w-[380px] h-[48px] p-[12px] placeholder-gray-300 max-sm:w-[343px]  bg-gray-100 border-gray-200 text-white"
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
  //   console.log(`field: ${field}  meta: ${meta}`);
  // console.log(field, meta);
  return (
    <div className="flex items-center gap-[16px]">
      <input
        {...field}
        {...props}
        className="w-[20px] h-[20px] form-checkbox bg-gray-0 border-gray-300  transition duration-150 ease-in-out"
      />
      <span className="text-gray-400">Remember</span>
    </div>
  );
}
