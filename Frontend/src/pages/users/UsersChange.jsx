import { useNavigate, useParams } from "react-router-dom";
import { APP_URL, RoutesNames } from "../../constants";
import UserService from "../../services/UserService";
import { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";

import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import defaultImage from "../../assets/defaultImage.png";
import { FaCamera } from "react-icons/fa";
import { MdCancel, MdOutlineSaveAlt } from "react-icons/md";
import { VscGitStashApply } from "react-icons/vsc";
import { UserContext } from "../../components/UserContext";

export default function UsersChange() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [user, setUser] = useState({});
    const [error, setError] = useState();

    const [currentImage, setCurrentImage] = useState("");
    const [imageForCrop, setImageForCrop] = useState("");
    const [imageForServer, setImageForServer] = useState("");
    const cropperRef = useRef(null);

    const { setUserImage } = useContext(UserContext);

    async function getUser() {
        const response = await UserService.getByID(routeParams.id);
        if (response.error) {
            setError(response.message);
            return;
        }
        response.message.createdAt = moment.utc(response.message.createdAt).format("yyyy-MM-DD");
        response.message.birthDate = moment.utc(response.message.birthDate).format("yyyy-MM-DD");
        setUser(response.message);

        if (response.message.image != null) {
            setCurrentImage(APP_URL + response.message.image + `?${Date.now()}`);
        } else {
            setCurrentImage(defaultImage);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (error) {
            const interval = setInterval(() => {
                setError(null);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [error]);

    async function change(user) {
        const response = await UserService.change(routeParams.id, user);
        if (response.error) {
            setError(response.message);
            return;
        }
        navigate(RoutesNames.USER_OVERVIEW);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        const localDate = new Date();
        const offset = localDate.getTimezoneOffset();
        const formattedDate = new Date(moment.utc(data.get("createdAt")) - offset * 60 * 1000).toISOString().slice(0, -1);
        const formattedBirthDate = new Date(moment.utc(data.get("birthDate")) - offset * 60 * 1000).toISOString().slice(0, -1);

        change({
            username: data.get("username"),
            password: data.get("password"),
            email: data.get("email"),
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            birthDate: formattedBirthDate,
            createdAt: formattedDate,
        });
    }

    function onCrop() {
        setImageForServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
    function onChangeImage(e) {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImageForCrop(reader.result);
        };
        try {
            reader.readAsDataURL(files[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async function saveImage() {
        const base64 = imageForServer;
        const response = await UserService.setImage(routeParams.id, { Base64: base64.replace("data:image/png;base64,", "") });

        if (response.error) {
            setError(response.error);
            return;
        }

        setCurrentImage(imageForServer);
        setUserImage(imageForServer);
    }

    return (
        <div className="container mx-auto px-6 py-12 shadow-lg mt-10 rounded-3xl hover:shadow-xl border-2 border-gray-600 transition-all duration-300 ease-in-out">
            <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Edit Profile</h1>

            {/* Error Display */}
            {error && (
                <div className="mb-6 p-4 bg-red-600 text-red-100 rounded-lg shadow-md transition-opacity duration-300 ease-out">
                    {error.map((errMsg, index) => (
                        <p key={index} className="text-sm">
                            {errMsg}
                        </p>
                    ))}
                </div>
            )}

            <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
                {/* Profile Image and Cropper Section */}
                <div className="w-full lg:w-1/2 relative flex flex-col items-center">
                    <div className="w-56 h-56 rounded-full overflow-hidden border-2 border-indigo-500 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        {currentImage ? (
                            <img src={currentImage} alt="Profile" className="object-cover w-full h-full cursor-pointer" />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-purple-600 to-indigo-500 text-6xl text-white">
                                {user.username?.charAt(0) || "?"}
                            </div>
                        )}
                    </div>
                    <label
                        htmlFor="profile-pic-input"
                        className="mt-6 flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer transition-all"
                    >
                        <FaCamera />
                        <span className="text-sm">Change Profile Image</span>
                        <input id="profile-pic-input" type="file" className="hidden" onChange={onChangeImage} />
                    </label>

                    {imageForCrop && (
                        <div className="mt-6 border border-gray-600 p-6 rounded-lg shadow-lg w-full">
                            <h2 className="text-xl text-white mb-4 text-center">Edit Your Image</h2>
                            <div className="relative h-96 w-96">
                                <Cropper
                                    src={imageForCrop}
                                    style={{ height: "100%", width: "100%" }}
                                    initialAspectRatio={1}
                                    guides={true}
                                    viewMode={1}
                                    minCropBoxWidth={50}
                                    minCropBoxHeight={50}
                                    cropBoxResizable={true}
                                    background={false}
                                    responsive={true}
                                    checkOrientation={false}
                                    cropstart={onCrop}
                                    cropend={onCrop}
                                    ref={cropperRef}
                                />
                            </div>
                            <button
                                disabled={!imageForServer}
                                onClick={saveImage}
                                className={`mt-4 w-full py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
                                    imageForServer ? "bg-indigo-500 text-white hover:bg-indigo-600" : "bg-gray-600 text-gray-300 cursor-not-allowed"
                                }`}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    <VscGitStashApply />
                                    Apply Image
                                </div>
                            </button>
                        </div>
                    )}
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSubmit} className="w-full lg:w-full border border-gray-700 p-8 rounded-2xl shadow-lg space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { field: "username", label: "Username" },
                            { field: "email", label: "Email Address" },
                            { field: "firstName", label: "First Name" },
                            { field: "lastName", label: "Last Name" },
                            { field: "password", label: "Password" },
                            { field: "birthDate", label: "Date of Birth" },
                            { field: "createdAt", label: "Account Created On" },
                        ].map(({ field, label }, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                                <label htmlFor={field} className="text-sm font-semibold text-gray-400">
                                    {label}
                                </label>
                                <input
                                    type={field === "password" ? "password" : ["birthDate", "createdAt"].includes(field) ? "date" : "text"}
                                    name={field}
                                    id={field}
                                    defaultValue={user[field]}
                                    className="px-4 py-3 w-full bg-gray-700 text-white rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    required={field !== "firstName" && field !== "lastName"}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={() => navigate(RoutesNames.USER_OVERVIEW)} className="btn-cancel">
                            <MdCancel className="lg:mr-2" />
                            Cancel
                        </button>
                        <button type="submit" className="btn-main">
                            <MdOutlineSaveAlt className="lg:mr-2" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
