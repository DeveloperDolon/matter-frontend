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

    const rows = soldProperties?.map(item => createData(item.property_title, item.property_location, item.buyer_email, item.buyer_name, item.offered_price));


    return (
        <div className="w-full md:px-10 px-5 md:py-10 py-5">

            <div className="flex justify-between gap-10 flex-wrap">
                <h1 className="title-text md:text-5xl text-3xl ">Sold Properties</h1>
                <h1 className="title-text md:text-5xl text-3xl ">Total asdf : {soldProperties?.length}</h1>
            </div>

            {
                soldProperties?.length > 0 ?

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