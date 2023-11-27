
import { AddCircle, HomeMaxOutlined, ViewWeek } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';



const UserMenus = [
    {
        icon: <AccountCircleIcon></AccountCircleIcon>,
        text: "My Profile",
        link: "/agent-dashboard/agent-profile"
    },
    {
        icon: <AddCircle></AddCircle>,
        text: "Add Property",
        link: "/agent-dashboard/agent-add-property"
    },
    {
        icon: <StorefrontIcon></StorefrontIcon>,
        text: "My added properties",
        link: "/agent-dashboard/agent-added-properties"
    },
    {
        icon: <AutoAwesomeMotionIcon></AutoAwesomeMotionIcon>,
        text: "My sold properties",
        link: "/agent-dashboard/agent-sold-properties"
    },
    {
        icon: <AddAlarmIcon></AddAlarmIcon>,
        text: "Requested properties",
        link: "/agent-dashboard/agent-requested-properties"
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