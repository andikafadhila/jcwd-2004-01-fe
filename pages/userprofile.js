import NavbarProfile from "../components/NavbarProfile";
import NavbarAdminTop from "../components/NavbarAdminTop";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import API_URL from "../helpers/apiurl";
import Cookies from "js-cookie";
import useUser from "../hooks/useUser";

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [show1, setShow1] = useState(false);
  const handleClick1 = () => setShow1(!show1);

  const [show2, setShow2] = useState(false);
  const handleClick2 = () => setShow2(!show2);

  const { is_verified } = useUser();

  let token = Cookies.get("token");

  const verifyMe = async () => {
    try {
      await axios.get(`${API_URL}/auth/verifyme`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeNewPassword = async (values) => {
    try {
      console.log(token);
      await axios.post(`${API_URL}/auth/changepassword`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },

    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Required"),
      newPassword: Yup.string()
        .min(8, "Must contain 8 characters or more")
        .matches(/[A-Z]/g, "Should contain at least an uppercase letter")
        .matches(/[a-z]/g, "Should contain at least a lowercase letter")
        .matches(/[0-9]/g, "Should contain at least a number letter")
        .matches(
          /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g,
          "Should contain at least a special character"
        )
        .matches(/^\S*$/, "Should not contain spaces"),
      confirmNewPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords must match"
      ),
    }),

    onSubmit: async (values) => {
      try {
        await changeNewPassword(values);
        console.log("masuk sini");
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally");
      }
    },
  });

  return (
    <>
      {/* navbar admin */}
      <div className="absolute">
        <NavbarProfile />
      </div>
      <NavbarAdminTop />

      {/* Title, excell, and download PDF Button */}
      <div className="flex ml-72 h-[32px] items-center mt-[16px] w-[72.6%] justify-between">
        <p className="text-xl font-bold">Biodata</p>
      </div>

      {/* Biodata */}
      <div className="ml-72 pt-5 flex gap-5">
        {/* Profile Picture Section */}
        <div className="flex flex-col">
          <div className="bg-yellow-400">
            <img
              className="w-56 object-cover"
              src="./Barbara_ProfilePicture.jpg"
            />
          </div>
          <button className="mt-2 w-56 bg-red-500">
            Button Change Profile
          </button>
          <button onClick={onOpen} className="mt-2 w-56 bg-orange-500">
            Button Ubah Kata Sandi
          </button>
          {is_verified === 0 ? (
            <button
              onClick={() => {
                verifyMe();
              }}
              className="mt-2 w-56 bg-green-500"
            >
              Verifikasi Akun
            </button>
          ) : null}
        </div>

        {/* Profile Detail Section */}
        <div className="flex flex-col">
          <div className="w-96 bg-violet-600 text-lg font-bold">
            Ubah Biodata Diri
          </div>
          <div className="mt-3 flex gap-10">
            <div className="w-20 bg-green-400">Nama</div>
            <div>Andika Rizkx</div>
            <button>Ubah</button>
          </div>
          <div className="mt-1 flex gap-10">
            <div className="w-20">Username</div>
            <div>dika42069</div>
            <button>Ubah</button>
          </div>
          <div className="w-96 bg-violet-600 text-lg font-bold mt-3">
            Ubah Kontak
          </div>
          <div className="mt-3 flex gap-10">
            <div className="w-20">Email</div>
            <div>adadadad@gmail.com</div>
            <button>Ubah</button>
          </div>
          <div className="mt-1 flex gap-10">
            <div className="w-20 bg-green-400">Nomor HP</div>
            <div>081615983832</div>
            <button>Ubah</button>
          </div>
        </div>
      </div>

      {/* Modal Change Password */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Old Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Old Password"
                    name="oldPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.oldPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="md" onClick={handleClick}>
                      {show ? <BsEyeFill /> : <BsEyeSlashFill />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show1 ? "text" : "password"}
                    placeholder="New Password"
                    name="newPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.newPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="md" onClick={handleClick1}>
                      {show1 ? <BsEyeFill /> : <BsEyeSlashFill />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Confirm New Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show2 ? "text" : "password"}
                    placeholder="Confirm New Password"
                    name="confirmNewPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.confirmNewPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="md" onClick={handleClick2}>
                      {show2 ? <BsEyeFill /> : <BsEyeSlashFill />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
