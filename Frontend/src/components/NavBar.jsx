import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { RoutesNames } from "../constants";
import { useNavigate } from "react-router-dom";

const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Swagger", href: "https://sacobrt-001-site1.ctempurl.com/swagger/index.html", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img alt="SocialMediaAPP" src="/logo.svg" className="h-8 w-auto" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <a
                                    className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    onClick={() => navigate(RoutesNames.HOME)}
                                >
                                    Home
                                </a>
                                <a
                                    className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    href="https://sacobrt-001-site1.ctempurl.com/swagger/index.html"
                                    target="_blank"
                                >
                                    Swagger
                                </a>
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                            <span className="absolute -inset-1.5" />
                                            <span>Dropdown</span>
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <MenuItem>
                                            <>
                                                <a
                                                    onClick={() => navigate(RoutesNames.USER_OVERVIEW)}
                                                    className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                >
                                                    Users
                                                </a>
                                                <a
                                                    onClick={() => navigate(RoutesNames.CYCLIC_OVERVIEW)}
                                                    className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                >
                                                    Cyclic
                                                </a>
                                            </>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <a
                        onClick={() => navigate(RoutesNames.HOME)}
                        className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                        <span className="rounded-md px-3 py-2 text-sm font-medium text-gray-300">Home</span>
                    </a>
                    <a
                        href="https://sacobrt-001-site1.ctempurl.com/swagger/index.html"
                        className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                        target="_blank"
                    >
                        <span className="rounded-md px-3 py-2 text-sm font-medium text-gray-300">Swagger</span>
                    </a>
                    <a
                        onClick={() => navigate(RoutesNames.USER_OVERVIEW)}
                        className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                        <span className="rounded-md px-3 py-2 text-sm font-medium text-gray-300">Users</span>
                    </a>
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
