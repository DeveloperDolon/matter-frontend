import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import Swal from "sweetalert2";


function createData(id, property_title, property_location, buyer_email, buyer_name, sold_price, property_id, status) {
    return { id, property_title, property_location, buyer_email, buyer_name, sold_price, property_id, status };
}

const RequestedProperties = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requestedProperties, refetch } = useQuery({
        queryKey: ["requestedProperties"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agents-requested-properties?email=${user?.email}`)
            return res.data;
        }
    });


    const rows = requestedProperties?.map(item => {
        return createData(item._id, item.property_title, item.property_location, item.buyer_email, item.buyer_name, item.offered_price, item.property_id, item.status);
    });

    const { mutate } = useMutation({
        mutationFn: (updateData) => {
            return axiosSecure.patch(`/agents-requested-properties/${updateData?.boughtId}?email=${user?.email}`, { ...updateData });
        },
        onSuccess: () => {
            refetch();
        }
    })

    const handleAcceptRequest = (id, property_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept it!"
        }).then((result) => {
            if (result.isConfirmed) {

                mutate({
                    boughtId: id,
                    property_id: property_id,
                    status: "accepted",
                })

                Swal.fire({
                    title: "Accepted!",
                    text: "Requested has been accepted.",
                    icon: "success"
                });
            }
        });
    }

    const handleRejectRequest = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!"
        }).then((result) => {
            if (result.isConfirmed) {

                mutate({
                    boughtId: id,
                    property_id: null,
                    status: "rejected",
                })

                Swal.fire({
                    title: "Rejected!",
                    text: "Requested has been rejected.",
                    icon: "success"
                });
            }
        });
    }


    return (
        <div className="w-full md:px-10 px-5 md:py-10 py-5">
            <div className="flex justify-between gap-10 flex-wrap">
                <h1 className="title-text md:text-5xl text-3xl ">Requested Properties</h1>
                <h1 className="title-text md:text-5xl text-3xl ">Total asdf : {requestedProperties?.length}</h1>
            </div>

            {
                requestedProperties?.length > 0 ?

                    <TableContainer component={Paper} className="mt-16 max-w-6xl mx-auto">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Property title</TableCell>
                                    <TableCell align="center">Property location</TableCell>
                                    <TableCell align="center">Buyer email</TableCell>
                                    <TableCell align="center">Buyer name</TableCell>
                                    <TableCell align="center">Offered price (TK)</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.map((row, idx) => (
                                    <TableRow
                                        className={`${idx % 2 === 0 ? "bg-purple-100" : "bg-cyan-100"}`}
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {row.property_title}
                                        </TableCell>
                                        <TableCell align="center">{row.property_location}</TableCell>
                                        <TableCell align="center">{row.buyer_email}</TableCell>
                                        <TableCell align="center">{row.buyer_name}</TableCell>
                                        <TableCell align="center">{row.sold_price}</TableCell>
                                        <TableCell align="center">
                                            {
                                                row.status === "accepted" ? <p className="w-fit mx-auto py-1 px-3 md:text-sm text-xs bg-green-500 text-white rounded-full">Accepted</p>
                                                    : row.status === "rejected" ? <p className="w-fit mx-auto py-1 px-3 md:text-sm text-xs bg-red-500 text-white rounded-full">Rejected</p>
                                                        : row.status === "sold" ? <p className="w-fit mx-auto py-1 px-3 md:text-sm text-xs bg-blue-500 text-white rounded-full">Sold</p>
                                                            : row.status === "pending" ? <div className="grid grid-cols-1 gap-2">
                                                                <Button variant="contained" onClick={() => handleAcceptRequest(row.id, row.property_id)} size="small">Accept</Button>
                                                                <Button variant="contained" onClick={() => handleRejectRequest(row.id)} size="small" color="error">Reject</Button>
                                                            </div> : ""
                                            }
                                        </TableCell>
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

export default RequestedProperties;