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
import toast from "react-hot-toast";


function createData(id, user_name, user_email, role) {
    return { id, user_name, user_email, role };
}

const AdminManageUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: allUser, refetch } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users?email=${user?.email}`);
            return res.data;
        }
    })

    const rows = allUser?.map(item => {
        return createData(item._id, item.name, item.email, item.role);
    }); 

    const {mutate} = useMutation({
        mutationFn: (userData) => {
            return axiosSecure.patch(`/update-user?email=${user?.email}`, {...userData});
        }, 
        onSuccess: () => {
            refetch();
        }
    })

    const updatingUser = (id, roleStatus) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, Make user ${roleStatus === "admin" ? "Admin" : roleStatus === "agent" ? "Agent" : roleStatus === "fraud" ? "Fraud" : "" }!`
        }).then((result) => {
            if (result.isConfirmed) {

                const statusData = {
                    id: id,
                    role: roleStatus
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

    const handleMakeAdmin = (id) => {
       updatingUser(id, "admin");
    }

    const handleMakeFraud = (id) => {
        updatingUser(id, "fraud");
    }
    
    const handleDeleteUser = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete this user!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(id);
                axiosSecure.delete(`/delete-user/${id}?email=${user?.email}`)
                .then(res => {
                    console.log(res);
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }).catch(err => {
                    console.log(err);
                    toast.error(err.message)
                });     
            }
        });

    }

    const handleMakeAgent = (id) => {
        updatingUser(id, "agent");
    }

    return (
        <div className="w-full md:px-10 px-5 md:py-10 py-5">
            <Helmet>
                <title>MATTER | Manage user</title>
            </Helmet>

            <div className="flex justify-between gap-10 flex-wrap">
                <h1 className="title-text md:text-5xl text-3xl ">Manage User</h1>
                <h1 className="title-text md:text-5xl text-3xl ">Total : {allUser?.length}</h1>
            </div>


            {
                allUser?.length > 0 ?

                    <TableContainer component={Paper} className="mt-16 max-w-6xl mx-auto">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">User Name</TableCell>
                                    <TableCell align="center">User Email</TableCell>
                                    <TableCell align="center">User Role</TableCell>
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
                                            {row.user_name}
                                        </TableCell>
                                        <TableCell align="center">{row.user_email}</TableCell>
                                        <TableCell align="center">{row.role}</TableCell>
                                        <TableCell align="center">
                                            {
                                                row.role === "admin" ? <p className="w-fit mx-auto py-1 px-3 md:text-lg text-base bg-cyan-500 text-white rounded-full">Admin</p>
                                                    : row.role === "agent" ? <div className="grid grid-cols-1 gap-2"> 
                                                        <Button variant="contained" color="secondary"  onClick={() => handleMakeAdmin(row.id)} size="small">Make Admin</Button>
                                                        <Button variant="contained" size="small" onClick={() => handleMakeFraud(row.id)} color="warning">Make as fraud</Button>
                                                        <Button variant="contained" onClick={() => handleDeleteUser(row.id)} size="small" color="error">Delete</Button>
                                                    </div>
                                                    : row.role === "fraud" ? <p className="w-fit mx-auto py-1 px-3 md:text-sm text-xs bg-red-500 text-white rounded-full">Fraud</p> 
                                                    : row.role === "user" ?  <div className="grid grid-cols-1 gap-2">
                                                        <Button variant="contained" color="secondary"  onClick={() => handleMakeAdmin(row.id)} size="small">Make Admin</Button>
                                                        <Button variant="contained" color="success"  onClick={() => handleMakeAgent(row.id)} size="small">Make Agent</Button>
                                                        <Button variant="contained" onClick={() => handleDeleteUser(row.id)} size="small" color="error">Delete</Button>
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

export default AdminManageUser;