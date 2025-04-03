import {
    TableBody,
    TableCell,
    Table as TableContainer,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { cn } from "@/lib/utils";
  import { Skeleton } from "../ui/skeleton";
import { useTranslation } from "react-i18next";
import SearchInput from "./search";
type TableProps={
    columns:{title:string;className?:string}[],
    isLoading:boolean,
    isError:boolean,
    withPagination?:boolean,
    children: React.ReactNode;

}
const Table=({
    isLoading,
    columns,
    children,

}:TableProps)=>{
    const {t}=useTranslation()
    return(
        <div className="">
            <SearchInput></SearchInput>
            <TableContainer className="overflow-hidden rounded-radius_md bg-[#FAFAFA] dark:bg-[#171717] ">
                <TableHeader className=" bg-blue-500 text-white">
                <TableRow className="bg-blue-500 hover:bg-blue-400">
                    {columns.map(({ className, title }) => (
                    <TableHead className={cn("text-white", className)} key={title}>
                        {(t(title))}
                    </TableHead>
                    ))}
                </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading
                    ? new Array(5).fill(1).map((_, index) => (
                        <TableRow key={index}>
                        {
                            new Array(
                            columns.map((_, index) => (
                                <TableCell key={index}>
                                <Skeleton className="h-8" />
                                </TableCell>
                            ))
                            )
                        }
                        </TableRow>
                    ))
                    : children}
                </TableBody>
            </TableContainer>
        </div>
    )
}
export default Table