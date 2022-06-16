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

const NavbarAdmin = ({ where }) => {
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
          <AccordionItem>
            <h2>
              <AccordionButton
                _focus={{ boxShadow: "none" }}
                h="80px"
                _hover={{ textColor: "blackPrimary" }}
              >
                <MdHomeFilled className="w-6 h-6 mr-2" />
                <Box flex="1" textAlign="left">
                  Dashboard
                </Box>
              </AccordionButton>
            </h2>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton
                _focus={{ boxShadow: "none" }}
                h="80px"
                _hover={{ textColor: "blackPrimary" }}
              >
                <GiMedicines className="w-6 h-6 mr-2" />
                <Box flex="1" textAlign="left">
                  Produk
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
                Daftar Produk
              </Button>
              <Button
                variant="unstyled"
                _hover={{ bgColor: "none", color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Tambah Produk
              </Button>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _focus={{ boxShadow: "none" }}
                h="80px"
                _hover={{ textColor: "blackPrimary" }}
              >
                <Image src="/Transaction1.svg" width="24px" height="24px" />
                <Box flex="1" textAlign="left" className="ml-2">
                  Transaksi
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
                Semua Pesanan
              </Button>

              <Button
                variant="unstyled"
                _hover={{ bgColor: "none", color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Pesanan Baru
              </Button>
              <Button
                variant="unstyled"
                _hover={{ bgColor: "none", color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Siap Dikirim
              </Button>
              <Button
                variant="unstyled"
                _hover={{ bgColor: "none", color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Dalam Pengiriman
              </Button>
              <Button
                variant="unstyled"
                _hover={{ bgColor: "none", color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Selesai
              </Button>
              <Button
                variant="unstyled"
                _hover={{ bgColor: "none", color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Dibatalkan
              </Button>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _focus={{ boxShadow: "none" }}
                h="80px"
                _hover={{ textColor: "blackPrimary" }}
              >
                <Image src="/SalesRevenue.svg" width="24px" height="24px" />
                <Box flex="1" textAlign="left" className="ml-2">
                  Sales & Revenue
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
                Ringkasan Statistik
              </Button>
              <Button
                variant="unstyled"
                _hover={{ bgColor: "none", color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Buku Kas
              </Button>
              <Button
                variant="unstyled"
                _hover={{ bgColor: "none", color: "blackPrimary" }}
                w="fit-content"
                ml="30px"
              >
                Laba dan Rugi
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default NavbarAdmin;
