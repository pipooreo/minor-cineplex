import { useField } from "formik";

export function CustomInput({ label, ...props }) {
  const [field, meta] = useField(props);
  // console.log(field, meta);
  return (
    <div className="flex flex-col">
      <label className="text-gray-400 py-2 text-body2R">{label}</label>
      <input
        {...field}
        {...props}
        autoComplete="off"
        className={
          meta.touched && meta.error
            ? "text-body2R outline-none border border-red rounded-[4px] w-[380px] h-[48px] p-[12px] placeholder-gray-300 max-sm:w-[343px] bg-gray-100 text-white"
            : props.disabled
            ? "text-body2R border rounded-[4px] w-[380px] h-[48px] p-[12px] placeholder-gray-300 max-sm:w-[343px]  bg-gray-100 border-gray-200 text-gray-300"
            : "text-body2R border rounded-[4px] w-[380px] h-[48px] p-[12px] placeholder-gray-300 max-sm:w-[343px]  bg-gray-100 border-gray-200 text-white"
        }
      />
      {meta.touched && meta.error && (
        <div className="text-red text-[12px]">{meta.error}</div>
      )}
    </div>
  );
}

// export function CustomCheckBox({ label, ...props }) {
//   const [field, meta] = useField(props);
//   //   console.log(`field: ${field}  meta: ${meta}`);
//   // console.log(field, meta);
//   return (
//     <div className="flex items-center gap-[16px]">
//       <input
//         {...field}
//         {...props}
//         className="w-[20px] h-[20px] form-checkbox bg-gray-0 border-gray-300  transition duration-150 ease-in-out"
//       />
//       <span className="text-gray-400">Remember</span>
//     </div>
//   );
// }

export function CustomCheckBox({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <div className="flex items-center gap-[10px]">
      <div
        onClick={() => setValue(!field.value)}
        className={`w-[20px] h-[20px] border border-gray-300 rounded-[4px] cursor-pointer
                    ${field.value ? "bg-blue-500" : "bg-transparent"}
                    hover:border-blue-400 transition duration-150 ease-in-out`}
      >
        {field.value && (
          <svg
            className="w-full h-full text-white bg-blue-100"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
            />
          </svg>
        )}
      </div>
      <span className="text-gray-400">Remember</span>
    </div>
  );
}
