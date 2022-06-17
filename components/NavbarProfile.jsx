import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
} from "@chakra-ui/react";
import { MdHomeFilled } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

const NavbarProfile = ({ where }) => {
  return (
    <>
      <div className="relative left-0 top-0 w-[256px] h-[100vh] shadow-lg overflow-y-scroll scrollbar-hide z-10 bg-white">
        {/* Logo */}
        <div className="w-[170px] h-[43px] relative mt-2 mx-auto">
          <Image src="/LogoHealthymed.svg" width="204px" layout="fill" />
        </div>

        <Accordion
          defaultIndex={[0]}
          allowMultiple
          border="transparent"
          color="gray.500"
          mt="15px"
        >
          <AccordionItem className="mt-5">
            <h2>
              <AccordionButton
                _focus={{ boxShadow: "none" }}
                h="50px"
                _hover={{ textColor: "blackPrimary" }}
              >
                <MdHomeFilled className="w-6 h-6 mr-2" />
                <Box flex="1" textAlign="left">
                  Home
                </Box>
              </AccordionButton>
            </h2>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _focus={{ boxShadow: "none" }}
                h="50px"
                _hover={{ textColor: "blackPrimary" }}
              >
                <FaUserCircle className="w-6 h-6 mr-2" />
                <Box flex="1" textAlign="left">
                  Profile
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} display="flex" flexDirection="column">
              <Button
                variant="unstyled"
                _hover={{ color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Biodata
              </Button>
              <Button
                variant="unstyled"
                _hover={{ bgColor: "none", color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Address
              </Button>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _focus={{ boxShadow: "none" }}
                h="50px"
                _hover={{ textColor: "blackPrimary" }}
              >
                <HiDocumentText className="w-6 h-6" />
                <Box flex="1" textAlign="left" className="ml-2">
                  Pembelian
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} display="flex" flexDirection="column">
              <Button
                variant="unstyled"
                _hover={{ color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Menunggu Pembayaran
              </Button>

              <Button
                variant="unstyled"
                _hover={{ bgColor: "none", color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Daftar Transaksi
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default NavbarProfile;
