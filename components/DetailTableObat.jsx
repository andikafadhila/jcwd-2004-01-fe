// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
//   chakra,
// } from "@chakra-ui/react";
// import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
// import { useMemo } from "react";
// import { useTable, useSortBy } from "react-table";
// import MOCK_DATA from "../test/MOCK_DATA.json";

// const DetailTableObat = () => {
//   const data = useMemo(() => MOCK_DATA, []);

//   const columns = useMemo(
//     () => [
//       {
//         Header: "No",
//         accessor: "No",
//       },
//       {
//         Header: "Nama Obat",
//         accessor: "nama_obat",
//       },
//       {
//         Header: "No. Obat",
//         accessor: "no_obat",
//       },
//       {
//         Header: "No. BPOM",
//         accessor: "no_bpom",
//       },
//       {
//         Header: "Kategori",
//         accessor: "kategori",
//       },
//       {
//         Header: "Stok",
//         accessor: "Stok",
//       },
//       {
//         Header: "Satuan",
//         accessor: "satuan",
//       },
//       {
//         Header: "Nilai Barang",
//         accessor: "nilai_barang",
//       },
//       {
//         Header: "Nilai Jual",
//         accessor: "nilai_jual",
//       },
//       {
//         Header: "Atur",
//       },
//     ],
//     []
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data }, useSortBy);

//   return (
//     <Table {...getTableProps()} variant="striped" colorScheme="blackAlpha">
//       <Thead bg="blackPrimary">
//         {headerGroups.map((headerGroup) => (
//           <Tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <Th
//                 {...column.getHeaderProps(column.getSortByToggleProps())}
//                 isNumeric={column.isNumeric}
//                 textColor="white"
//               >
//                 {column.render("Header")}
//                 <chakra.span pl="4">
//                   {column.isSorted ? (
//                     column.isSortedDesc ? (
//                       <TriangleDownIcon aria-label="sorted descending" />
//                     ) : (
//                       <TriangleUpIcon aria-label="sorted ascending" />
//                     )
//                   ) : null}
//                 </chakra.span>
//               </Th>
//             ))}
//           </Tr>
//         ))}
//       </Thead>
//       <Tbody {...getTableBodyProps()}>
//         {rows.map((row) => {
//           prepareRow(row);
//           return (
//             <Tr {...row.getRowProps()}>
//               {row.cells.map((cell) => (
//                 <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
//                   {cell.render("Cell")}
//                 </Td>
//               ))}
//             </Tr>
//           );
//         })}
//       </Tbody>
//     </Table>
//   );
// };

// export default DetailTableObat;
