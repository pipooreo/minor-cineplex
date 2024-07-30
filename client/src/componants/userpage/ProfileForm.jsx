import { FaRegUser } from "react-icons/fa6";
import { Form, Formik } from "formik";
import { CustomInput } from "../CustomInput";
import { profile } from "../../schemas/schema";
import { useAuth } from "../../contexts/authentication";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileForm(props) {
  // const [avatarPreview, setAvatarPreview] = useState("");
  const { updateProfile } = useAuth();
  const initialValues = {
    avatar: props.user.image,
    name: props.user.name,
    email: props.user.email,
    // success: false,
  };

  const notify = () => {
    toast.success("Your profile has been successfully updated", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    // console.log(typeof file);

    if (file) {
      setFieldValue("avatar", file);
    }
  };

  async function onSumbit(values, actions) {
    // console.log(actions);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("image", values.avatar);

    const result = await updateProfile(formData, actions);
    if ((result.status = 200)) {
      notify();
    }
  }

  return (
    <div className="flex flex-col gap-[40px] ">
      <h1 className="text-[36px] text-white font-bold">Profile</h1>
      <p className="text-gray-300 text-[16px]">
        Keep your personal details private.
        <br /> Information you add here is visible to anyone who can view your
        profile
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={profile}
        onSubmit={onSumbit}
      >
        {({ values, setFieldValue, isSubmitting, isValid, dirty }) => {
          // console.log(values.success);
          return (
            <Form className="flex flex-col gap-[40px]">
              <div className="flex items-end gap-[16px]">
                <div className="w-[120px] h-[120px] rounded-[333px] bg-gray-200 flex justify-center items-center">
                  {values.avatar && typeof values.avatar !== "object" ? (
                    <img
                      src={values.avatar}
                      alt="profile-picture"
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : values.avatar && typeof values.avatar === "object" ? (
                    <img
                      src={URL.createObjectURL(values.avatar)}
                      alt="profile-picture"
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <FaRegUser className="w-[48px] h-[48px] text-gray-300" />
                  )}
                </div>
                <input
                  name="avatar"
                  type="file"
                  className="bg-BG text-white file:bg-BG file:border-0 file:underline file:cursor-pointer"
                  // value={avatarPreview}
                  onChange={(event) => {
                    // console.log(event);
                    handleFileChange(event, setFieldValue);
                    // setFieldValue("avatar", event.target.files[0]);
                  }}
                />
              </div>
              <div className="w-[380px] flex flex-col gap-[24px]">
                <CustomInput
                  label="Name"
                  name="name"
                  type="text"
                  value={values.name}
                />
                <CustomInput label="Email" name="email" type="email" disabled />
              </div>
              {/* <button
                type="submit"
                disabled={isSubmitting}
                className="rounded border border-gray-300 text-center w-[111px] h-[48px] text-white hover:bg-gray-100"
              > */}
              <button
                // disabled={isSubmitting}
                disabled={isSubmitting || !(isValid && dirty)}
                className={`w-[182px] h-[48px]  text-body1M font-bold rounded-[4px] 
                                transition-all duration-300 ease-in-out
                                ${
                                  isValid && dirty
                                    ? "bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-white"
                                    : "bg-blue-100/40 text-white/40 cursor-not-allowed"
                                }
                                max-sm:w-[343px]`}
                type="submit"
              >
                Save
              </button>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                limit={2}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="colored"
                transition:Bounce
                className="w-[40%]"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ProfileForm;
