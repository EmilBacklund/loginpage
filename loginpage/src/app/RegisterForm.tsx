import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";
import { object, string, ref } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = object({
  email: string().required("Email is required").email("Email is not valid"),
  password: string().required("Password is required").min(8, "must be at least 8 characters long"),
  confirmPassword: string()
    .required("Field is required")
    .min(8, "must be at least 8 characters long")
    .oneOf([ref("password")], "Passwords must match"),
}).required();

const RegisterForm = ({ setErrorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setErrorMessage("");
        router.push("/home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode, errorMessage);

        if (errorCode === "auth/email-already-in-use") {
          setErrorMessage("User already exists");
        } else {
          // Handle other errors or set a generic error message
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Email address
          </label>
          <div className="text-sm text-orange-300 font-semibold">{errors.email?.message}</div>
        </div>
        <div className="mt-2">
          <input
            id="email"
            {...register("email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            autoComplete="email"
            className="block w-full indent-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
            Password
          </label>
          <div className="text-sm text-orange-300 font-semibold">{errors.password?.message}</div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            {...register("password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            autoComplete="current-password"
            className="block indent-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
            Confirm password
          </label>
          <div className="text-sm text-orange-300 font-semibold">
            {errors.confirmPassword?.message}
          </div>
        </div>
        <div className="mt-2">
          <input
            id="confirmPassword"
            {...register("confirmPassword")}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="block indent-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Create account
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
