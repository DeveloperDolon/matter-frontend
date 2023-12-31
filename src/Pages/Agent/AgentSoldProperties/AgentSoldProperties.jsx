import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Helmet } from "react-helmet";

function createData(property_title, property_location, buyer_email, buyer_name, sold_price) {
    return { property_title, property_location, buyer_email, buyer_name, sold_price };
}


const AgentSoldProperties = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: soldProperties } = useQuery({
        queryKey: ["sold-properties"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agent-sold-properties?email=${user?.email}`);
            return res.data;
        }
    })

    const rows = soldProperties?.soldProperties?.map(item => createData(item.property_title, item.property_location, item.buyer_email, item.buyer_name, item.offered_price));


    return (
        <div className="w-full md:px-10 px-5 md:py-10 py-5">
             <Helmet>
                <title>MATTER | Sold Properties</title>
            </Helmet>
            <div className="flex justify-center gap-10 flex-wrap pb-5">
                <h1 className="title-text md:text-5xl text-3xl text-center">Sold Properties</h1>
            </div>

            <div className="flex justify-center flex-wrap gap-10 mt-5">
                <div>
                    <div className="relative overflow-hidden bg-white rounded-lg shadow w-60 md:w-72">
                        <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/bangladesh-currency-7256174-5969106.png" alt="btc logo" className="absolute w-24 h-24 rounded-full opacity-50 -top-6 -right-6 md:-right-4" />
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm font-medium leading-5 text-gray-500 truncate">
                                    Total sold amouont
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold leading-9 text-gray-900">
                                    ৳ {soldProperties?.totalSoldAmount}
                                </dd>
                            </dl>
                        </div>
                    </div>

                </div>

                <div>

                    <div className="py-5 bg-white shadow-lg rounded-2xl px-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <p className="text-gray-700 text-sm font-bold dark:text-gray-50">
                                Total Sales
                            </p>
                        </div>
                        <div className="flex flex-col justify-start">
                            <p className=" my-1 text-4xl font-bold text-left text-gray-800 dark:text-white">
                                {soldProperties?.soldProperties?.length}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {
                soldProperties?.soldProperties?.length > 0 ?

                    <TableContainer component={Paper} className="mt-16 max-w-5xl mx-auto">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Property title</TableCell>
                                    <TableCell align="center">Property location</TableCell>
                                    <TableCell align="center">Buyer email</TableCell>
                                    <TableCell align="center">Buyer name</TableCell>
                                    <TableCell align="center">Sold price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, idx) => (
                                    <TableRow
                                        className={`${idx % 2 === 0 ? "bg-purple-100" : "bg-cyan-100"}`}
                                        key={row.property_title}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {row.property_title}
                                        </TableCell>
                                        <TableCell align="center">{row.property_location}</TableCell>
                                        <TableCell align="center">{row.buyer_email}</TableCell>
                                        <TableCell align="center">{row.buyer_name}</TableCell>
                                        <TableCell align="center">{row.sold_price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> :
                    <div className="flex justify-center">
                        <img className="md:w-[70%] mx-auto w-full" src="https://theyouthproject.in/static/media/empty_data_set.88c7d759.png" alt="" />
                    </div>
            }
        </div>
    );
};

export default AgentSoldProperties;