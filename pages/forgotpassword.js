import InputForm from "../components/input_form";
import MobileHeader from "../components/mobile_header";
import { Button } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import API_URL from "../helpers/apiurl";

const ForgotPassword = () => {
  const imageRegisterLogin = "/Frame.svg";
  const logo = "/LogoHealthymed.svg";

  const [inputEmail, setinputEmail] = useState({
    email: "",
  });

  const handleInput = (e) => {
    setinputEmail({ ...inputEmail, [e.target.name]: e.target.value });
  };

  const submitForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/forgotpassword`, {
        email: inputEmail.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          onSubmit={submitForgotPassword}
        >
          <div className="w-[327px] lg:hidden">
            <MobileHeader
              firstProp={<IoIosArrowBack />}
              classExtend={"w-full"}
              secondPropClassExtend={"white"}
            />
          </div>

          <div className="w-[327px] lg:w-[528px] text-2xl font-bold lg:hidden">
            Forgot Password
          </div>
          <div className="w-[327px] lg:w-[528px] text-2xl font-bold hidden lg:inline-block lg:mt-14">
            Forgot Password
          </div>

          <div className="mt-20 space-y-1">
            <p className="text-blackPrimary font-bold">Email</p>
            <div className="lg:hidden">
              <InputForm
                leftIcon={<FaEnvelope />}
                placeholder={"Email"}
                name="email"
                onChange={handleInput}
              />
            </div>
            <div className="hidden lg:inline-block">
              <InputForm
                leftIcon={<FaEnvelope />}
                placeholder={"Email"}
                name="email"
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="w-[327px] lg:w-[528px] pt-8">
            <Button type="submit" w="full" h="48px" variant={"fillCustom"}>
              Kirim email
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

export default ForgotPassword;
