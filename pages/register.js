import InputForm from "../components/input_form";
import MobileHeader from "../components/mobile_header";
import { Button } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import useUser from "../hooks/useUser";
import { registerAction } from "../redux/actions/user_action";
import { useRouter } from "next/router";

const Register = ({ registerAction }) => {
  const line = "/Line30.svg";
  const lineDesktop = "/LineDesktop.svg";
  const imageRegisterLogin = "/Frame.svg";
  const logo = "/LogoHealthymed.svg";

  const { isLogin } = useUser();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      name: Yup.string()
        .max(100, "Must contain 100 characters or less")
        .required("Required"),
      password: Yup.string()
        .min(8, "Must contain 8 characters or more")
        .matches(/[A-Z]/g, "Should contain at least an uppercase letter")
        .matches(/[a-z]/g, "Should contain at least a lowercase letter")
        .matches(/[0-9]/g, "Should contain at least a number letter")
        .matches(
          /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g,
          "Should contain at least a special character"
        )
        .matches(/^\S*$/, "Should not contain spaces"),
    }),

    onSubmit: async (values) => {
      try {
        await registerAction(values);
        console.log("masuk sini");
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally");
      }
    },
  });

  if (isLogin) {
    router.push("/");
  }

  return (
    <div className="flex">
      <div className="w-[720px] h-fit hidden lg:flex lg:flex-col items-center">
        <div>
          <img className="absolute top-8 left-16" src={logo} alt="" />
          <img src={imageRegisterLogin} alt="" />
        </div>
      </div>
      <div className="w-[375px] h-fit lg:max-h-[768px] lg:w-[720px] mx-8 lg:mx-0 overflow-hidden">
        <form
          className="flex flex-col items-center "
          onSubmit={formik.handleSubmit}
        >
          <div className="w-[327px] lg:hidden">
            <MobileHeader
              firstProp={<IoIosArrowBack />}
              classExtend={"w-full"}
              secondPropClassExtend={"white"}
            />
          </div>

          <div className="w-[327px] lg:w-[528px] text-2xl font-bold lg:hidden">
            Register
          </div>
          <div className="w-[327px] lg:w-[528px] text-2xl font-bold hidden lg:inline-block lg:mt-14">
            Mari kita mulai
          </div>
          <div className="w-[327px] lg:w-[528px] mt-1">
            Sudah punya akun?{" "}
            <Link href="">
              <span className="hover:cursor-pointer font-bold">Masuk</span>
            </Link>
          </div>

          <div className="mt-8">
            <div className="lg:hidden">
              <Button
                type="button"
                w="327px"
                h="48px"
                variant={"outlineCustom"}
                leftIcon={
                  <div className="text-2xl">
                    <FcGoogle />
                  </div>
                }
              >
                Google
              </Button>
            </div>
            <div className="hidden lg:inline-block">
              <Button
                type="button"
                w="528px"
                h="48px"
                variant={"outlineCustom"}
                leftIcon={
                  <div className="text-2xl">
                    <FcGoogle />
                  </div>
                }
              >
                Google
              </Button>
            </div>
          </div>

          <div className="flex items-center mt-6 lg:hidden gap-2">
            <div>
              <img src={line} alt="" />
            </div>
            <div>atau</div>
            <div>
              <img src={line} alt="" />
            </div>
          </div>

          <div className="items-center mt-6 hidden lg:flex gap-2">
            <div>
              <img src={lineDesktop} alt="" />
            </div>
            <div>atau</div>
            <div>
              <img src={lineDesktop} alt="" />
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <p className="text-blackPrimary font-bold">Nama</p>
            <div className="lg:hidden">
              <InputForm
                leftIcon={<FaUserCircle />}
                placeholder={"Username"}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            <div className="hidden lg:inline-block">
              <InputForm
                leftIcon={<FaUserCircle />}
                placeholder={"Username"}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <p className="text-sm ml-3 text-red-500 pt-1">
                {formik.errors.name}
              </p>
            ) : null}
          </div>

          <div className="mt-2 space-y-1">
            <p className="text-blackPrimary font-bold">Email</p>
            <div className="lg:hidden">
              <InputForm
                leftIcon={<FaEnvelope />}
                placeholder={"Email"}
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            <div className="hidden lg:inline-block">
              <InputForm
                leftIcon={<FaEnvelope />}
                placeholder={"Email"}
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p className="text-sm ml-3 text-red-500">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="mt-3 space-y-1">
            <p className="text-blackPrimary font-bold">Password</p>
            <div className="lg:hidden">
              <InputForm
                leftIcon={<AiFillLock />}
                placeholder={"Password"}
                rightIcon={<BsEyeSlashFill />}
                altIcon={<BsEyeFill />}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            <div className="hidden lg:inline-block">
              <InputForm
                leftIcon={<AiFillLock />}
                placeholder={"Password"}
                rightIcon={<BsEyeSlashFill />}
                altIcon={<BsEyeFill />}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-sm ml-3 text-red-500">
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2 w-[327px] lg:w-[528px] mt-8">
            <input type="checkbox" />
            <p className="text-sm">
              Saya setuju dengan{" "}
              <span className="text-blackPrimary font-bold">persyaratan</span>{" "}
              dan <span className="text-blackPrimary font-bold">ketentuan</span>
            </p>
          </div>

          <div className="w-[327px] lg:w-[528px] py-8 lg:pt-8 lg:pb-0">
            <Button type="submit" w="full" h="48px" variant={"fillCustom"}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { registerAction })(Register);
