
import { AdUnits, HomeMaxOutlined, ManageAccounts, ViewWeek } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PreviewIcon from '@mui/icons-material/Preview';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const UserMenus = [
    {
        icon: <AccountCircleIcon></AccountCircleIcon>,
        text: "Admin Profile",
        link: "/admin-dashboard/admin-profile"
    },
    {
        icon: <FactCheckIcon></FactCheckIcon>,
        text: "Manage Properties",
        link: "/admin-dashboard/admin-manage-properties"
    },
    {
        icon: <ManageAccounts></ManageAccounts>,
        text: "Manage Users",
        link: "/admin-dashboard/admin-manage-users"
    },
    {
        icon: <PreviewIcon></PreviewIcon>,
        text: "Manage Review",
        link: "/admin-dashboard/admin-manage-review"
    },
    {
        icon: <AdUnits></AdUnits>,
        text: "Advertise Property",
        link: "/admin-dashboard/admin-advertise-property"
    }

]

export const DefaultMenu = [
    {
        icon: <HomeMaxOutlined></HomeMaxOutlined>,
        text: "Home",
        link: "/"
    },
    {
        icon: <ViewWeek></ViewWeek>,
        text: "All Properties",
        link: "/properties"
    }

]

export default UserMenus;