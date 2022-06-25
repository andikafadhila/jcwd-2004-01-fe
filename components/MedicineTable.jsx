import {
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import { HiOutlineDownload } from "react-icons/hi";
import { debounce } from "lodash";
import DetailTableObat from "./DetailTableObat";
import ModalInputDrugs from "./ModalInputProduct";
import {
  useState,
  useMemo,
  useTransition,
  useCallback,
  useEffect,
} from "react";
import PaginationProductAdmin from "./PaginationProductAdmin";
import API_URL from "../helpers/apiurl";
import axios from "axios";

const MedicineTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState({
    search: "",
    category: "",
  });
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [component, setComponent] = useState([]);

  console.log(data, "inidata");

  const Categories = ({ val }) => {
    return (
      <div className="overflow-y-hidden scrollbar-hide">
        {val.map((category, i) => {
          return (
            <>
              <span
                key={i}
                className="bg-blackPrimary w-fit text-white font-semibold capitalize py-1 px-2 mr-1 text-sm rounded-xl"
              >
                {category.name}
              </span>
            </>
          );
        })}
      </div>
    );
  };

  const columns = useMemo(() => [
    {
      Header: "No",
      accessor: "id",
      isNumeric: true,
    },
    {
      Header: "Nama Obat",
      accessor: "name",
    },
    {
      Header: "No Obat",
      accessor: "no_obat",
    },
    {
      Header: "No BPOM",
      accessor: "no_bpom",
    },
    {
      Header: "Kategori",
      accessor: "categories",
      Cell: ({ cell: { value } }) => <Categories val={value} />,
    },
    {
      Header: "Stok",
      accessor: "total_stock",
      isNumeric: true,
    },
    {
      Header: "Satuan",
      accessor: "unit",
    },
    {
      Header: "Nilai Barang",
      accessor: "original_price",
    },
    {
      Header: "Nilai Jual",
      accessor: "price",
    },
    {
      Header: "Atur",
    },
  ]);

  const updateLimit = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setPage(0);
    // console.log(input);
  };

  const getComponent = async () => {
    let response = await axios.get(`${API_URL}/product/get-category`);
    setComponent([...response.data]);

    // console.log(comp, "inicom");
  };

  const getDaftarProduk = async (page, input, cb) => {
    let response = await axios.get(
      `${API_URL}/product/get-all-product?page=${page}&search=${input.search}&category=${input.category}&orderName=&orderPrice=`
    ); //! Dipersingkat querynya (dibuat conditional)
    console.log(response);
    cb(response);
  };
  //http://localhost:5000/product/get-all-product?search=&page=&category=&orderName=&orderPrice=DESC
  const debouncedFetchData = useCallback(
    debounce((page, input, cb) => {
      getDaftarProduk(page, input, cb);
    }, 1000),
    []
  );

  useEffect(() => {
    getComponent();
  }, []);

  useEffect(() => {
    debouncedFetchData(page, input, (response) => {
      setTotalData(parseInt(response.headers["x-total-product"]));
      setData([...response.data]);
      setIsLoading(false);
    });
  }, [page, input]);

  return (
    <>
      <div className="shadow-xl rounded-lg w-[72.6%] h-[72.6vh] ml-80 mt-[19px]">
        <div className="flex border-0 border-slate-900 h-[42px] justify-between mx-4">
          <div className="flex gap-4 mt-4">
            <InputGroup w="328px" h="42px">
              <Input
                placeholder="Cari nama obat"
                focusBorderColor="blackPrimary"
                name="search"
                value={input.search}
                onChange={(e) => handleInput(e)}
              />
              <InputRightElement>
                <GoSearch />
              </InputRightElement>
            </InputGroup>
            <Select
              w="156px"
              h="42px"
              focusBorderColor="blackPrimary"
              placeholder="Filter"
              name="category"
              value={input.category}
              onChange={(e) => handleInput(e)}
            >
              <option value="">All</option>
              {component.map(({ id, name }) => {
                return (
                  <>
                    <option value={id}>{name}</option>
                  </>
                );
              })}
            </Select>
          </div>
          <Button
            onClick={onOpen}
            variant="fillCustom"
            leftIcon={<HiOutlineDownload />}
            fontSize="12px"
            fontWeight="700"
            w="159px"
            h="42px"
            mt="16px"
          >
            Tambah Obat
          </Button>
        </div>
        <ModalInputDrugs isOpen={isOpen} onClose={onClose} />
        <DetailTableObat columns={columns} data={data} isLoading={isLoading} />
        <div className="mt-[265px]">
          <PaginationProductAdmin
            page={page}
            totalData={totalData}
            limit={10}
            setLimit={setLimit}
            updateLimit={updateLimit}
            pageChangeHandler={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default MedicineTable;
