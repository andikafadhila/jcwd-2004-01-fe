import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Spinner,
} from "@chakra-ui/react";
import MobileHeader from "../components/mobile_header";
import SearchBar from "../components/searchbar";
import useUser from "../hooks/useUser";
import useCart from "../hooks/useCart";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineDotsVertical, HiOutlineX } from "react-icons/hi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import {
  IoNotificationsSharp,
  IoChatbubbleEllipsesSharp,
  IoShareSocialSharp,
} from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import CardCart from "../components/CardCart";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import API_URL from "../helpers/apiurl";
import { useState } from "react";
import Rupiah from "../lib/rupiah";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard";
import Footer from "../components/footer";
import { getCartAction } from "../redux/actions/cart_action";
import { connect } from "react-redux";
import CardAddressCheckout from "../components/CardAddressCheckout";
import CardCheckout from "../components/CardCheckout";
import { useRef } from "react";

const Checkout = ({ getCartAction }) => {
  const { isLogin, fullname } = useUser();
  const { cart, selected_product } = useCart();
  console.log(cart, selected_product, "hehe");
  let token = Cookies.get("token");

  const [checkoutProduct, setCheckoutProduct] = useState([]);
  const [bankData, setBankData] = useState([]);
  console.log(bankData);

  console.log(checkoutProduct);

  let subTotal = 0;

  let totalQuantity = 0;
  for (let i = 0; i < selected_product.length; i++) {
    const quantity = selected_product[i].quantity;
    const price = selected_product[i].detail_product.price;
    totalQuantity = totalQuantity + quantity;
    subTotal = subTotal + quantity * price;
  }

  const [productTerkait, setProductTerkait] = useState([]);

  const getProdcutTerkait = async (idSymptom) => {
    try {
      let response = await axios.get(
        `${API_URL}/product/get-product-terkait?symptom_id=${17}`
      );
      let data = response.data;

      setProductTerkait(data);
    } catch (error) {
      console.log(error);
    }
  };

  //get bank

  const getBank = async () => {
    try {
      let response = await axios.get(`${API_URL}/transaction/get-bank`);
      console.log(response.data, "response Data");
      setBankData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectBank, setSeleckBank] = useState(null);
  console.log(selectBank, "selectedBank id");

  // get address

  const [addressData, setAddressData] = useState({});
  console.log(addressData, "address data");

  const getAddress = async () => {
    try {
      let response = await axios.get(`${API_URL}/profile/get-default-address`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "address");
      setAddressData(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  //get ongkir
  const [shippingCost, setShippingCost] = useState(0);

  const getShippingCost = async () => {
    console.log(addressData, "didalam");
    let cityId = addressData.city_id;
    try {
      let response = await axios.get(
        `${API_URL}/transaction/get-fee?cityId=${cityId}`
      );

      console.log(response);
      setShippingCost(response.data.value);
    } catch (error) {
      setShippingCost(9000);
      console.log(error);
    }
  };

  let total = subTotal + parseInt(shippingCost);

  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      getShippingCost();
    }
    mounted.current = true;
    return () => {};
  }, [addressData]);

  useEffect(() => {
    if (mounted.current) {
      getBank();
      getCartAction();
      getProdcutTerkait();
      getAddress();
      setCheckoutProduct(selected_product);
    }
    mounted.current = true;
    return () => {};
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const settingsProdukTerkait = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className="w-100">
        <ul className="list-unstyled flex-row justify-content-center align-items-center mb-4">
          {dots}
        </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 2048,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="">
        <div className="shadow-xl w-full px-[76px] pb-2">
          <MobileHeader
            firstProp={null}
            secondProp={<SearchBar placeholder={"Hayo mau cari apa"} />}
            thirdProp={
              isLogin ? (
                <FaShoppingCart />
              ) : (
                <Button variant={"outlineCustom"} h={"44px"} w={"114px"}>
                  Masuk
                </Button>
              )
            }
            fourthProp={
              isLogin ? (
                <div className="flex items-center gap-2">
                  <FaUserCircle />
                  <div className="text-base">{fullname}</div>
                </div>
              ) : (
                <Button variant={"fillCustom"} h={"44px"} w={"114px"}>
                  Daftar
                </Button>
              )
            }
            classExtend={"hidden lg:flex"}
          />
        </div>
        <MobileHeader
          firstProp={<IoIosArrowBack className="text-base ml-8" />}
          secondProp={
            <p className="text-base mr-[110px] w-[120px]">Keranjang Saya</p>
          }
          thirdProp={<FaShoppingCart className="text-xl" />}
          fourthProp={<HiOutlineDotsVertical className="mr-5 text-xl" />}
          classExtend={"flex shadow-xl lg:hidden"}
        />
      </div>
      <div className="hidden md:inline md:text-2xl md:font-bold ">
        <p className="pl-[96px] mt-[57px] "> Alat Pengiriman </p>
      </div>
      <div className="flex">
        <div>
          <CardAddressCheckout addressData={addressData} />
          <CardCheckout
            cartData={cart}
            selected_product={selected_product}
            subTotal={subTotal}
          />
        </div>
        <div className="w-[405px] h-fit py-[28px] shadow-xl rounded-xl mr-3 mt-16">
          <div className="mt-[28px]">
            <p className="text-xl font-bold ml-3">Total</p>
            <div className="flex justify-between w-[320px] mx-auto mt-[32px] text-[#6B6B6B]">
              <p className="text-base">Sub Total</p>
              <p className="font-bold">{Rupiah(subTotal)}</p>
            </div>
            <div className="flex justify-between w-[320px] mx-auto mt-[32px] text-[#6B6B6B]">
              <p className="text-base">Pengiriman</p>

              {shippingCost == 0 ? (
                <Spinner size="sm" />
              ) : (
                <p className="font-bold"> {Rupiah(shippingCost)} </p>
              )}
            </div>
            <Divider w="320px" mx="auto" mt="22px" />
            <div className="flex justify-between w-[320px] mx-auto mt-[22px] ">
              <p className="text-base font-bold">Total</p>
              {shippingCost == 0 ? (
                <Spinner size="sm" />
              ) : (
                <p className="font-bold"> {Rupiah(total)}</p>
              )}
            </div>
            <Divider w="405px" mx="auto" mt="24px" />
            <div className="w-[320px] mx-auto mt-[24px]">
              <p className="text-[20px] font-bold">Metode Pembayaran</p>
              <p className="text-[14px] mt-1">
                Silahkan pilih metode pembayaran anda disini
              </p>
            </div>
            <div className="w-[320px] mx-auto mt-[46px]">
              <Button variant="fillCustom" w="320px" h="52px" onClick={onOpen}>
                Pilih Metode Pembayaran({totalQuantity})
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Button Beli Cart */}
      <div className="h-[100px] w-[100%] mt-11 bg-slate-100 flex justify-between items-center md:hidden">
        <div className="flex items-center gap-4 mx-auto">
          <div>
            <p className="text-sm">Total</p>
            <p className="text-lg font-bold">{Rupiah(subTotal)}</p>
          </div>
          <Button
            variant="fillCustom"
            w="204px"
            h="46px"
            fontSize="14px"
            onClick={() => {}}
            // isLoading={buttonLoading}
          >
            Pilih Metode Pembayaran({totalQuantity})
          </Button>
        </div>
      </div>
      <Divider className="hidden md:inline-block md:mt-[72px] md:mb-[60px]" />
      {/* Produk Terkait */}
      <div className="mx-8 mt-6">
        <p className="font-bold text-sm mb-[26px]">Produk Terkait</p>
        <Slider {...settingsProdukTerkait}>
          {productTerkait.map((val, i) => {
            return (
              <div className="w-[20px] h-[350px]" key={i}>
                <ProductCard
                  variant="popular"
                  imageUrl={`${API_URL}${val.imageProduct}`}
                  imageAlt={val.name}
                  title={val.name}
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice={Rupiah(val.price)}
                  unit={val.unit}
                />
              </div>
            );
          })}
          {/* <div className="w-[20px]">
                <ProductCard
                  variant="popular"
                  imageUrl="/Barbara_ProfilePicture.jpg"
                  imageAlt="PANADOL 10 KAPLET HEHEHEHE"
                  title="PANADOL 10 KAPLET HEHEHEHE"
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice="Rp.35.000"
                  unit="strip"
                />
              </div>
              <div className="w-[20px]">
                <ProductCard
                  variant="popular"
                  imageUrl="/Barbara_ProfilePicture.jpg"
                  imageAlt="PANADOL 10 KAPLET HEHEHEHE"
                  title="PANADOL 10 KAPLET HEHEHEHE"
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice="Rp.35.000"
                  unit="strip"
                />
              </div>
              <div className="w-[20px]">
                <ProductCard
                  variant="popular"
                  imageUrl="/Barbara_ProfilePicture.jpg"
                  imageAlt="PANADOL 10 KAPLET HEHEHEHE"
                  title="PANADOL 10 KAPLET HEHEHEHE"
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice="Rp.35.000"
                  unit="strip"
                />
              </div>
              <div className="w-[20px]">
                <ProductCard
                  variant="popular"
                  imageUrl="/Barbara_ProfilePicture.jpg"
                  imageAlt="PANADOL 10 KAPLET HEHEHEHE"
                  title="PANADOL 10 KAPLET HEHEHEHE"
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice="Rp.35.000"
                  unit="strip"
                />
              </div>
              <div className="w-[20px]">
                <ProductCard
                  variant="popular"
                  imageUrl="/Barbara_ProfilePicture.jpg"
                  imageAlt="PANADOL 10 KAPLET HEHEHEHE"
                  title="PANADOL 10 KAPLET HEHEHEHE"
                  discount="17%"
                  originalPrice="Rp.65.000"
                  formattedPrice="Rp.35.000"
                  unit="strip"
                />
              </div> */}
        </Slider>
      </div>
      <div className="hidden md:inline">
        <Footer />
      </div>
      {/* bank modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="500px" maxH="600px">
          <GrFormPrevious
            className={`absolute top-[35px] left-[25px] text-2xl hover:cursor-pointer ${
              selectBank == null ? "hidden" : ""
            }`}
            onClick={() => setSeleckBank(null)}
          />
          <ModalCloseButton
            left={selectBank == null ? "25px" : "445px"}
            top="32px"
          >
            <HiOutlineX className="text-xl" />
          </ModalCloseButton>
          <ModalHeader pt="32px">
            <Center>Metode Pembayaran</Center>
          </ModalHeader>

          <ModalBody>
            <div className="flex items-center justify-between shadow-xl rounded-lg p-[18px]">
              <div>
                <p className="text-sm">Total Harga</p>
                <p className="text-xl font-bold">{Rupiah(10000)}</p>
              </div>
              <p className="text-xs font-bold">Lihat Detail</p>
            </div>
            <Divider my="20px" w="500px" ml="-6" />
            {/* page pilih bank */}
            {selectBank == null ? (
              <div className="h-[286px] overflow-y-auto">
                {bankData.map((val, i) => {
                  return (
                    <div
                      key={val.id}
                      onClick={() => setSeleckBank(parseInt(i))}
                    >
                      <div className="flex items-center justify-between hover:cursor-pointer">
                        <div className="flex items-center gap-[34px]">
                          <img
                            src={`${API_URL}${val.image}`}
                            alt=""
                            className="w-[42px] h-[42px] object-scale-down"
                          />
                          <p className="text-sm">{val.name}</p>
                        </div>
                        <GrFormNext />
                      </div>
                      <Divider />
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* page konfirmasi pilih bank */}
            {selectBank !== null ? (
              <div className="h-[286px] overflow-y-auto shadow-xl rounded-lg p-[18px]">
                <div className="flex items-center justify-between">
                  <p className="font-bold">{bankData[selectBank].name}</p>
                  <img
                    src={`${API_URL}${bankData[selectBank].image}`}
                    alt=""
                    className="w-[42px] h-[42px] object-scale-down"
                  />
                </div>
                <br />
                <div className="text-sm">
                  <li>
                    Tagihan ini akan otomatis menggantikan tagihan{" "}
                    {bankData[selectBank].name} yang belum terbayar.
                  </li>
                  <br />
                  <li>
                    Tidak disarankan pembayaran melalui bank agar transaksi
                    dapat diproses tanpa kendala
                  </li>
                  <br />
                  <li>Dapatkan kode pembayaran setelah klik pembayaran.</li>
                </div>
              </div>
            ) : null}
            <Divider w="500px" ml="-6" />
          </ModalBody>

          <Center>
            <ModalFooter>
              <Button
                variant="fillCustom"
                w="455px"
                h="52px"
                isDisabled={selectBank == null}
              >
                Pilih Metode
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};

export default connect(null, { getCartAction })(Checkout);
