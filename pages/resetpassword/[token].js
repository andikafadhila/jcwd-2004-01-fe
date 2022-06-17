import InputForm from "../../components/input_form";
import MobileHeader from "../../components/mobile_header";
import { Button } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_URL from "../../helpers/apiurl";

const ResetPassword = () => {
  const imageRegisterLogin = "/Frame.svg";
  const logo = "/LogoHealthymed.svg";

  const router = useRouter();

  const { token } = router.query;

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
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
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),

    onSubmit: async (values) => {
      try {
        await axios.post(`${API_URL}/auth/resetpassword`, values, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  });

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
            Reset Password
          </div>
          <div className="w-[327px] lg:w-[528px] text-2xl font-bold hidden lg:inline-block lg:mt-14">
            Reset Password
          </div>

          <div className="mt-20 space-y-1">
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
          </div>

          <div className="mt-3 space-y-1">
            <p className="text-blackPrimary font-bold">Confirm Password</p>
            <div className="lg:hidden">
              <InputForm
                leftIcon={<AiFillLock />}
                placeholder={"Confirm password"}
                rightIcon={<BsEyeSlashFill />}
                altIcon={<BsEyeFill />}
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
            </div>
            <div className="hidden lg:inline-block">
              <InputForm
                leftIcon={<AiFillLock />}
                placeholder={"Confirm password"}
                rightIcon={<BsEyeSlashFill />}
                altIcon={<BsEyeFill />}
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
            </div>
          </div>

          <div className="w-[327px] lg:w-[528px] pt-8">
            <Button type="submit" w="full" h="48px" variant={"fillCustom"}>
              Reset Password
            </Button>
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

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ResetPassword;
