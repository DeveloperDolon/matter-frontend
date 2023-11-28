import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
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


function createData(id, property_title, property_location, agent_email, agent_name, price_range, status) {
    return { id, property_title, property_location, agent_email, agent_name, price_range, status };
}

const AdminManageProperties = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: properties, refetch } = useQuery({
        queryKey: ["admin-get-properties"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin-manage-properties?email=${user?.email}`);
            return res.data;
        }
    });

    const rows = properties?.map(item => {
        return createData(item._id, item.property_title, item.property_location, item.agent_email, item.agent_name, item.price_range, item.verified);
    });

    const {mutate} = useMutation({
        mutationFn: (statusData) => {
            
            return axiosSecure.patch(`/admin-set-properties-status/${statusData?.id}?email=${user?.email}`, {status: statusData?.status});
        },
        onSuccess: () => {
            refetch();
        }
    })

    const handleVerify = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Verified it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const statusData = {
                    id: id,
                    status: "verified"
                }

                mutate(statusData);

                Swal.fire({
                    title: "Verified!",
                    text: "Property has been rejected.",
                    icon: "success"
                });
            }
        });
    }
    
    const handleReject = (id) => {
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
                const statusData = {
                    id: id,
                    status: "rejected"
                }

                mutate(statusData);

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
            <Helmet>
                <title>MATTER | Admin manage properties</title>
            </Helmet>

            <div className="flex justify-between gap-10 flex-wrap">
                <h1 className="title-text md:text-5xl text-3xl ">Manage Properties</h1>
                <h1 className="title-text md:text-5xl text-3xl ">Total : {properties?.length}</h1>
            </div>

            {
                properties?.length > 0 ?

                    <TableContainer component={Paper} className="mt-16 max-w-6xl mx-auto">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Property title</TableCell>
                                    <TableCell align="center">Property location</TableCell>
                                    <TableCell align="center">Agent email</TableCell>
                                    <TableCell align="center">Agent name</TableCell>
                                    <TableCell align="center">Price range</TableCell>
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
                                        <TableCell align="center">{row.agent_email}</TableCell>
                                        <TableCell align="center">{row.agent_name}</TableCell>
                                        <TableCell align="center">{row.price_range}</TableCell>
                                        <TableCell align="center">
                                            {
                                                row.status === "verified" ? <p className="w-fit mx-auto py-1 px-3 md:text-sm text-xs bg-green-500 text-white rounded-full">Verified</p>
                                                    : row.status === "rejected" ? <p className="w-fit mx-auto py-1 px-3 md:text-sm text-xs bg-red-500 text-white rounded-full">Rejected</p>
                                                            : row.status === "unknown" ? <div className="grid grid-cols-1 gap-2">
                                                                <Button variant="contained" onClick={() => handleVerify(row.id)} size="small">Verify</Button>
                                                                <Button variant="contained" onClick={() => handleReject(row.id)} size="small" color="error">Reject</Button>
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

export default AdminManageProperties;