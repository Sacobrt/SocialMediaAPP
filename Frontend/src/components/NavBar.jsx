import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { RoutesNames } from "../constants";
import { useNavigate } from "react-router-dom";
import { SiSwagger } from "react-icons/si";
import { TbGridDots } from "react-icons/tb";
import { IoHomeSharp } from "react-icons/io5";
import { FaComments, FaUsers } from "react-icons/fa";
import { RiAdminFill, RiUserFollowFill } from "react-icons/ri";
import { MdOutlinePostAdd } from "react-icons/md";

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <Disclosure as="nav" className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center">
                                <a href="/">
                                    <img alt="SocialMediaAPP" src="/logo.svg" className="h-10 w-auto rounded-lg" />
                                </a>
                                <div className="hidden sm:block sm:ml-10">
                                    <div className="flex space-x-5">
                                        <a
                                            onClick={() => navigate(RoutesNames.HOME)}
                                            className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:bg-opacity-80 hover:text-white transition duration-200 ease-in-out"
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <IoHomeSharp />
                                                Home
                                            </div>
                                        </a>
                                        <a
                                            href="https://sacobrt-001-site1.ctempurl.com/swagger/index.html"
                                            target="_blank"
                                            className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:bg-opacity-80 hover:text-white transition duration-200 ease-in-out"
                                        >
                                            <div className="flex items-center gap-2">
                                                <SiSwagger />
                                                Swagger
                                            </div>
                                        </a>
                                        <a
                                            onClick={() => navigate(RoutesNames.CYCLIC_OVERVIEW)}
                                            className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:bg-opacity-80 hover:text-white transition duration-200 ease-in-out"
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <TbGridDots />
                                                Cyclic
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <Menu as="div" className="relative">
                                    <MenuButton className="text-gray-200 text-sm rounded-md font-semibold focus:outline-none hover:bg-gray-700 hover:text-white transition-all duration-300 px-4 py-2">
                                        <div className="flex items-center gap-1.5">
                                            <RiAdminFill />
                                            Admin Menu
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
                            </div>
                            <div className="sm:hidden flex items-center">
                                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
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
                            <a
                                onClick={() => navigate(RoutesNames.CYCLIC_OVERVIEW)}
                                className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition duration-150"
                            >
                                <div className="flex items-center gap-1.5">
                                    <TbGridDots />
                                    Cyclic
                                </div>
                            </a>
                            <Menu as="div" className="relative">
                                <MenuButton className="w-full text-start cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition duration-150">
                                    <div className="flex items-center gap-1.5">
                                        <RiAdminFill />
                                        Admin Menu
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
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
