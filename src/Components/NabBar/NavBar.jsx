import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import logo from "../../assets/logo.png";
import useAuth from '../../Hooks/useAuth';


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user } = useAuth();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const userOption = <>
        <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
            <Typography textAlign="center"></Typography>
        </MenuItem>
        <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Logout</Typography>
        </MenuItem>
    </>

    const navBar = (color) => {
        return <>
            <Button
                className='md:w-auto w-full text-left'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: color, display: 'block' }}
            >
                <NavLink to={"/"}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending w-full md:text-base text-xs font-bold block" : isActive ? "border-b-2 border-blue-100 w-full md:text-base text-xs font-bold block" : "w-full md:text-base text-xs font-bold block"
                    }
                >
                    Home
                </NavLink>
            </Button>
            <Button
                className='md:w-auto w-full text-left'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: color, display: 'block' }}
            >
                <NavLink
                    to={"/all-properties"}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending w-full md:text-base text-xs font-bold block" : isActive ? "border-b-2 border-blue-100 w-full md:text-base text-xs font-bold block" : "w-full md:text-base text-xs font-bold block"
                    }
                >
                    All Properties
                </NavLink>
            </Button>
            <Button
                className='md:w-auto w-full text-left'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: color, display: 'block' }}
            >
                <NavLink
                    to={"/dashboard"}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending w-full md:text-base text-xs font-bold block" : isActive ? "border-b-2 border-blue-100 w-full md:text-base text-xs font-bold block" : "w-full md:text-base text-xs font-bold block"
                    }
                >
                    Dashboard
                </NavLink>
            </Button>
            <Button
                className='md:w-auto w-full text-left'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: color, display: 'block' }}
            >
                <NavLink
                    to={"/login"}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending w-full md:text-base text-xs font-bold block" : isActive ? "border-b-2 border-blue-100 w-full md:text-base text-xs font-bold block" : "w-full md:text-base text-xs font-bold block"
                    }
                >
                    Login
                </NavLink>
            </Button>
        </>
    }

    return (
        <AppBar position="static" sx={{ background: "#121414" }} className='w-full'>
            <Container maxWidth="xl" className='bg-[#121414]'>
                <Toolbar disableGutters>
                    <img src={logo} className='md:w-16 md:block hidden w-5 mr-2 py-3' />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 5,
                            fontSize: "35px",
                            fontFamily: "Montserrat",
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MATTER
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {navBar("black")}
                        </Menu>
                    </Box>
                    <img src={logo} className='md:hidden block w-10 mr-2 py-3' />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MATTER
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', color: "black" } }}>
                        {navBar("white")}
                    </Box>

                    {
                        user &&
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {userOption}
                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
