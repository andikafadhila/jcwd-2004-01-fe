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
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginAction } from "../redux/actions/user_action";
import { connect } from "react-redux";
import useUser from "../hooks/useUser";

const Login = ({ loginAction }) => {
  const line = "/Line30.svg";
  const lineDesktop = "/Line8.svg";
  const imageRegisterLogin = "/Frame.svg";
  const logo = "/LogoHealthymed.svg";

  const router = useRouter();

  const { isLogin, role_id } = useUser();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(255, "Must contain 25 characters or less")
        .required("Required"),
      password: Yup.string()
        .min(8, "Must contain 8 characters or more")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        await loginAction(values);
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  });

  console.log(role_id, "role");
  if (isLogin && role_id == "user") {
    router.push("/home");
  } else if (isLogin && role_id == "admin") {
    router.push("/admin/dashboard");
  }

  return (
    <div className="flex">
      <div className="hidden w-[720px] h-fit lg:flex lg:flex-col items-center">
        <div>
          <img className="absolute top-8 left-16" src={logo} alt="" />
          <img src={imageRegisterLogin} alt="" />
        </div>
      </div>
      <div>
        <form
          className="w-[375px] h-fit lg:w-[720px] flex flex-col items-center mx-8 lg:mx-0"
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
            Masuk
          </div>
          <div className="w-[327px] lg:w-[528px] text-2xl font-bold hidden lg:inline-block lg:mt-14">
            Masuk
          </div>

          <div className="mt-9 space-y-1">
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
              <p className="text-sm ml-3 text-pinktertiary">
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          <div className="flex justify-between items-center w-[327px] lg:w-[528px] mt-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <p className="text-sm">Ingat saya</p>
            </div>
            <div className="text-sm text-gray-400">Lupa kata sandi?</div>
          </div>

          <div className="w-[327px] lg:w-[528px] pt-8">
            <Button type="submit" w="full" h="48px" variant={"fillCustom"}>
              Masuk
            </Button>
          </div>

          <div className="flex items-center mt-10 justify-between lg:hidden gap-2">
            <div>
              <img src={line} alt="" />
            </div>
            <div>atau</div>
            <div>
              <img src={line} alt="" />
            </div>
          </div>

          <div className="items-center w-[528px] mt-10 hidden lg:flex justify-between">
            <div>
              <img src={lineDesktop} alt="" />
            </div>
            <div>atau masuk dengan</div>
            <div>
              <img src={lineDesktop} alt="" />
            </div>
          </div>

          <div className="mt-10">
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

          <p className="mt-10 pb-10 lg:pb-0">
            Belum punya akun?{" "}
            <Link href="">
              <span className="hover:cursor-pointer font-bold">Daftar</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { loginAction })(Login);
