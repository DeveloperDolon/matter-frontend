
import { HomeMaxOutlined, ViewWeek } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ReviewsIcon from '@mui/icons-material/Reviews';



const UserMenus = [
    {
        icon: <AccountCircleIcon></AccountCircleIcon>,
        text: "My Profile",
        link: "/user-dashboard/"
    },
    {
        icon: <FavoriteIcon></FavoriteIcon>,
        text: "Wishlist",
        link: "/user-dashboard/wishlist"
    },
    {
        icon: <LocalMallIcon></LocalMallIcon>,
        text: "Property bought",
        link: "/user-dashboard/property-bought"
    },
    {
        icon: <ReviewsIcon></ReviewsIcon>,
        text: "My Review",
        link: "/user-dashboard/reviews"
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