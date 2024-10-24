import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { APP_URL, RoutesNames } from "../constants";
import { useNavigate } from "react-router-dom";
import { SiSwagger } from "react-icons/si";
import { TbGridDots } from "react-icons/tb";
import { IoHomeSharp } from "react-icons/io5";
import { FaComments, FaSignInAlt, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { RiAdminFill, RiUserFollowFill } from "react-icons/ri";
import { MdOutlinePostAdd } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { parseJwt } from "../hooks/parseJwt";
import { AuthContext } from "./AuthContext";
import defaultImage from "../assets/defaultImage.png";
import { UserContext } from "./UserContext";
import { ImStatsDots } from "react-icons/im";

export default function NavBar() {
    const navigate = useNavigate();

    const { logout, isLoggedIn } = useAuth();

    const { authToken } = useContext(AuthContext);
    const [userData, setUserData] = useState({});

    const { userImage } = useContext(UserContext);

    useEffect(() => {
        if (authToken) {
            const token = parseJwt(authToken);
            setUserData(token);
        }
    }, [authToken]);

    function OpenSwaggerURL() {
        window.open(APP_URL + "/swagger/index.html", "_blank");
    }

    function image(imagePath) {
        if (userImage) {
            return userImage;
        }
        return imagePath ? APP_URL + "/images/users/" + imagePath + `.png?${Date.now()}` : defaultImage;
    }

    return (
        <Disclosure as="nav" className="bg-gray-900 border-b-2 border-gray-700">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
                        <div className={`flex md:justify-between justify-center md:gap-0 ${isLoggedIn ? "h-32" : "h-20"} md:h-20 items-center`}>
                            <div className="flex items-center">
                                <a href="/">
                                    <img
                                        alt="Social Media Logo"
                                        src="/logo.png"
                                        className={`-rotate-3 ${
                                            isLoggedIn ? "-mt-12" : "-mt-0"
                                        } md:mt-0 h-12 md:h-8 w-auto rounded-lg hover:rotate-3 transition-all duration-1000 ease-in-out hover:scale-125`}
                                    />
                                </a>
                                <div className="hidden md:block sm:ml-5">
                                    <div className="flex space-x-1 lg:space-x-4">
                                        {isLoggedIn && (
                                            <>
                                                <a
                                                    onClick={() => navigate(RoutesNames.HOME)}
                                                    className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:bg-opacity-80 hover:text-white transition-all duration-300 ease-in-out"
                                                >
                                                    <div className="flex items-center gap-1.5">
                                                        <IoHomeSharp />
                                                        Home
                                                    </div>
                                                </a>
                                                <a
                                                    onClick={() => OpenSwaggerURL()}
                                                    className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:bg-opacity-80 hover:text-white transition-all duration-300 ease-in-out"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <SiSwagger />
                                                        Swagger
                                                    </div>
                                                </a>
                                            </>
                                        )}
                                        <a
                                            onClick={() => navigate(RoutesNames.CYCLIC_OVERVIEW)}
                                            className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:bg-opacity-80 hover:text-white transition-all duration-300 ease-in-out"
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <TbGridDots />
                                                Cyclic
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* User card for mobile device */}
                            {isLoggedIn && (
                                <div className="absolute left-1/3 top-[70px] flex md:hidden w-40 items-center space-x-2 py-1 px-4 bg-gray-800 rounded-lg">
                                    {/* Profile Image */}
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={image(userData.UserID)}
                                        alt="User Image"
                                        onError={(e) => (e.target.src = defaultImage)}
                                    />

                                    {/* First Name + Last Name and Username */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center space-x-1">
                                            <span className="text-xs font-bold text-teal-400">{userData.FirstName + " " + userData.LastName}</span>
                                        </div>
                                        <span className="text-xs text-gray-400">@{String(userData.Username).toLowerCase()}</span>
                                    </div>
                                </div>
                            )}

                            <div className="hidden md:block">
                                {isLoggedIn ? (
                                    <>
                                        <div className="grid grid-flow-col items-center space-x-1">
                                            <button
                                                onClick={logout}
                                                className="text-gray-200 text-sm rounded-md font-semibold focus:outline-none hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out px-4 py-2"
                                            >
                                                <div className="flex items-center gap-1.5">
                                                    <FaSignOutAlt />
                                                    Sign out
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => navigate(RoutesNames.STATISTICS)}
                                                className="text-gray-200 text-sm rounded-md font-semibold focus:outline-none hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out px-4 py-2"
                                            >
                                                <div className="flex items-center gap-1.5">
                                                    <ImStatsDots />
                                                    Statistics
                                                </div>
                                            </button>
                                            <Menu as="div" className="relative">
                                                <MenuButton className="text-gray-200 text-sm rounded-md font-semibold focus:outline-none hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out px-4 py-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <RiAdminFill />
                                                        Admin
                                                    </div>
                                                </MenuButton>
                                                <Transition
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <MenuItems className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md font-semibold text-gray-300 bg-gray-800">
                                                        <MenuItem>
                                                            <a
                                                                onClick={() => navigate(RoutesNames.USER_OVERVIEW)}
                                                                className={`cursor-pointer block px-4 py-2 text-sm rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out`}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <FaUsers />
                                                                    Users
                                                                </div>
                                                            </a>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <a
                                                                onClick={() => navigate(RoutesNames.FOLLOWER_OVERVIEW)}
                                                                className={`cursor-pointer block px-4 py-2 text-sm rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out`}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <RiUserFollowFill />
                                                                    Followers
                                                                </div>
                                                            </a>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <a
                                                                onClick={() => navigate(RoutesNames.POST_OVERVIEW)}
                                                                className={`cursor-pointer block px-4 py-2 text-sm rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out`}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <MdOutlinePostAdd />
                                                                    Posts
                                                                </div>
                                                            </a>
                                                        </MenuItem>
                                                        <MenuItem>
                                                            <a
                                                                onClick={() => navigate(RoutesNames.COMMENT_OVERVIEW)}
                                                                className={`cursor-pointer block px-4 py-2 text-sm rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out`}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <FaComments />
                                                                    Comments
                                                                </div>
                                                            </a>
                                                        </MenuItem>
                                                    </MenuItems>
                                                </Transition>
                                            </Menu>
                                            {isLoggedIn && (
                                                <div className="flex items-center space-x-2 py-1 px-6 bg-gray-800 rounded-lg">
                                                    {/* Profile Image */}
                                                    <img
                                                        className="w-10 h-10 rounded-full"
                                                        src={image(userData.UserID)}
                                                        alt="User Image"
                                                        onError={(e) => (e.target.src = defaultImage)}
                                                    />

                                                    {/* First Name + Last Name and Username */}
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center space-x-1">
                                                            <span className="text-xs font-bold text-teal-400">{userData.FirstName + " " + userData.LastName}</span>
                                                        </div>
                                                        <span className="text-xs text-gray-400">@{String(userData.Username).toLowerCase()}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => navigate(RoutesNames.LOGIN)}
                                            className="text-gray-200 text-sm rounded-md font-semibold focus:outline-none hover:bg-gray-700 hover:text-white transition-all duration-300 px-4 py-2"
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <FaSignInAlt />
                                                Sign in
                                            </div>
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="md:hidden absolute right-5 top-5">
                                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-0 transition-all duration-300 ease-in-out">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        <div className="px-2 pb-3 space-y-2">
                            {isLoggedIn && (
                                <>
                                    <a
                                        onClick={() => navigate(RoutesNames.HOME)}
                                        className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition duration-150"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <IoHomeSharp />
                                            Home
                                        </div>
                                    </a>
                                    <a
                                        href="https://sacobrt-001-site1.ctempurl.com/swagger/index.html"
                                        className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition duration-150"
                                        target="_blank"
                                    >
                                        <div className="flex items-center gap-2">
                                            <SiSwagger />
                                            Swagger
                                        </div>
                                    </a>
                                </>
                            )}
                            <a
                                onClick={() => navigate(RoutesNames.CYCLIC_OVERVIEW)}
                                className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition duration-150"
                            >
                                <div className="flex items-center gap-1.5">
                                    <TbGridDots />
                                    Cyclic
                                </div>
                            </a>
                            {isLoggedIn && (
                                <Menu as="div" className="relative space-y-2">
                                    <button
                                        onClick={logout}
                                        className="text-gray-200 w-full text-sm rounded-md font-semibold focus:outline-none hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out px-4 py-2"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <FaSignOutAlt />
                                            Sign out
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => navigate(RoutesNames.STATISTICS)}
                                        className="text-gray-200 w-full text-sm rounded-md font-semibold focus:outline-none hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out px-4 py-2"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <ImStatsDots />
                                            Statistics
                                        </div>
                                    </button>
                                    <MenuButton className="w-full text-start cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition duration-150">
                                        <div className="flex items-center gap-1.5">
                                            <RiAdminFill />
                                            Admin
                                        </div>
                                    </MenuButton>
                                    <Transition
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute left-0 z-20 mt-2 w-full rounded-md font-semibold text-gray-300 bg-gray-800">
                                            <MenuItem>
                                                <a
                                                    onClick={() => navigate(RoutesNames.USER_OVERVIEW)}
                                                    className={`cursor-pointer block px-4 py-2 text-sm rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <FaUsers />
                                                        Users
                                                    </div>
                                                </a>
                                            </MenuItem>
                                            <MenuItem>
                                                <a
                                                    onClick={() => navigate(RoutesNames.FOLLOWER_OVERVIEW)}
                                                    className={`cursor-pointer block px-4 py-2 text-sm rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <RiUserFollowFill />
                                                        Followers
                                                    </div>
                                                </a>
                                            </MenuItem>
                                            <MenuItem>
                                                <a
                                                    onClick={() => navigate(RoutesNames.POST_OVERVIEW)}
                                                    className={`cursor-pointer block px-4 py-2 text-sm rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <MdOutlinePostAdd />
                                                        Posts
                                                    </div>
                                                </a>
                                            </MenuItem>
                                            <MenuItem>
                                                <a
                                                    onClick={() => navigate(RoutesNames.COMMENT_OVERVIEW)}
                                                    className={`cursor-pointer block px-4 py-2 text-sm rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <FaComments />
                                                        Comments
                                                    </div>
                                                </a>
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            )}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
