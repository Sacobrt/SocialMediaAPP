import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/FollowerService";
import UserService from "../../services/UserService";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { MdCancel, MdOutlineSaveAlt } from "react-icons/md";

export default function FollowersChange() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [followers, setFollowers] = useState({});
    const [users, setUsers] = useState([]);
    const [usersID, setUsersID] = useState(0);
    const [followersUserID, setFollowersUserID] = useState(0);
    const [userSearchTerm, setUserSearchTerm] = useState("");
    const [followerSearchTerm, setFollowerSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredFollowers, setFilteredFollowers] = useState([]);
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const [followerDropdownVisible, setFollowerDropdownVisible] = useState(false);
    const userDropdownRef = useRef(null);
    const followerDropdownRef = useRef(null);
    const [error, setError] = useState();

    async function getFollowers() {
        const response = await Service.getByID(routeParams.id);
        if (response.error) {
            setError(response.message);
            return;
        }
        response.message.followedAt = moment.utc(response.message.followedAt).format("yyyy-MM-DD");
        setFollowers(response.message);
        setUsersID(response.message.userID);
        setFollowersUserID(response.message.followerUserID);
    }

    async function getUsers() {
        const response = await UserService.get();
        if (response.error) {
            setError(response.message);
            return;
        }
        setUsers(response);
    }

    async function getData() {
        await getFollowers();
        await getUsers();
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (userSearchTerm.length >= 2) {
            const filtered = users.filter((user) => user.username.toLowerCase().includes(userSearchTerm.toLowerCase()));
            setFilteredUsers(filtered);
            setUserDropdownVisible(true);
        } else {
            setUserDropdownVisible(false);
        }
    }, [userSearchTerm, users]);

    useEffect(() => {
        if (followerSearchTerm.length >= 2) {
            const filtered = users.filter((user) => user.username.toLowerCase().includes(followerSearchTerm.toLowerCase()));
            setFilteredFollowers(filtered);
            setFollowerDropdownVisible(true);
        } else {
            setFollowerDropdownVisible(false);
        }
    }, [followerSearchTerm, users]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setUserDropdownVisible(false);
            }
            if (followerDropdownRef.current && !followerDropdownRef.current.contains(event.target)) {
                setFollowerDropdownVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function change(followers) {
        const response = await Service.change(routeParams.id, followers);
        if (response.error) {
            setError(response.message);
            return;
        }
        navigate(RoutesNames.FOLLOWER_OVERVIEW);
    }

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                setError(null);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [error]);

    function handleSubmit(e) {
        e.preventDefault();
        const localDate = new Date();
        const offset = localDate.getTimezoneOffset();
        const formattedDate = new Date(moment.utc(followers.followedAt) - offset * 60 * 1000).toISOString().slice(0, -1);

        change({
            userID: usersID,
            followerUserID: followersUserID,
            followedAt: formattedDate,
        });
    }

    return (
        <div className="container mx-auto max-w-4xl px-5 py-12">
            <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 ">
                Change Follower
            </h1>

            {error && (
                <div className="mb-6 bg-red-600 p-4 rounded-lg text-center text-gray-200 font-semibold animate-bounce">
                    {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Typeahead for selecting user */}
                    <div className="relative" ref={userDropdownRef}>
                        <label htmlFor="userID" className="block text-sm font-medium text-gray-300 mb-2">
                            Select a user <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="userID"
                            value={userSearchTerm}
                            onChange={(e) => setUserSearchTerm(e.target.value)}
                            className="block w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                            placeholder="Search for a user"
                        />
                        {userDropdownVisible && (
                            <ul className="absolute z-10 bg-gray-700 text-gray-200 rounded-lg mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <li
                                            key={user.id}
                                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                            onClick={() => {
                                                setUsersID(user.id);
                                                setUserSearchTerm(user.username);
                                                setUserDropdownVisible(false);
                                            }}
                                        >
                                            {user.username}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-gray-400">No users found</li>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Typeahead for selecting follower */}
                    <div className="relative" ref={followerDropdownRef}>
                        <label htmlFor="followerUserID" className="block text-sm font-medium text-gray-300 mb-2">
                            Select a user to follow <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="followerUserID"
                            value={followerSearchTerm}
                            onChange={(e) => setFollowerSearchTerm(e.target.value)}
                            className="block w-full px-4 py-3 bg-gray-700 text-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                            placeholder="Search for a user to follow"
                        />
                        {followerDropdownVisible && (
                            <ul className="absolute z-10 bg-gray-700 text-gray-200 rounded-lg mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
                                {filteredFollowers.length > 0 ? (
                                    filteredFollowers.map((user) => (
                                        <li
                                            key={user.id}
                                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                            onClick={() => {
                                                setFollowersUserID(user.id);
                                                setFollowerSearchTerm(user.username);
                                                setFollowerDropdownVisible(false);
                                            }}
                                        >
                                            {user.username}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-gray-400">No users found</li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <Link to={RoutesNames.FOLLOWER_OVERVIEW} className="btn-cancel">
                        <MdCancel />
                        <span>Cancel</span>
                    </Link>
                    <button type="submit" className="btn-main">
                        <MdOutlineSaveAlt />
                        <span>Save Changes</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
