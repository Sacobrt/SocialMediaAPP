import { HttpService } from "./HttpService";

async function get() {
    return await HttpService.get("/User")
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.error(e);
        });
}

async function getByID(id) {
    return await HttpService.get("/User/" + id)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch((e) => {
            return { error: true, message: e.response.data };
        });
}

async function remove(id) {
    return await HttpService.delete("/User/" + id)
        .then((response) => {
            return { error: false, message: response.data.message };
        })
        .catch((e) => {
            return { error: true, message: e.response.data.message };
        });
}

async function add(user) {
    return await HttpService.post("/User/", user)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch((e) => {
            switch (e.status) {
                case 400: {
                    let message = [];
                    for (const key in e.response.data.errors) {
                        message.push(e.response.data.errors[key][0]);
                    }
                    return { error: true, message: message };
                }
                default:
                    return { error: true, message: "User cannot be added!" };
            }
        });
}

async function change(id, user) {
    return await HttpService.put("/User/" + id, user)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch((e) => {
            switch (e.status) {
                case 400: {
                    let message = [];
                    for (const key in e.response.data.errors) {
                        message.push(e.response.data.errors[key][0]);
                    }
                    return { error: true, message: message };
                }
                default:
                    return { error: true, message: "User cannot be changed!" };
            }
        });
}

async function setImage(id, image) {
    return await HttpService.put("/User/setImage/" + id, image)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch(() => {
            return { error: true, message: "Problem with uploading a image! " };
        });
}

async function getPagination(page, condition) {
    return await HttpService.get("/User/pagination/" + page + "?condition=" + condition)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch((e) => {
            return { error: true, message: e.response.data };
        });
}

async function totalData() {
    return await HttpService.get("/Statistics/TotalData")
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.error(e);
        });
}

async function randomUsers() {
    return await HttpService.get("/Statistics/RandomUsers")
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.error(e);
        });
}

export default {
    get,
    getByID,
    remove,
    add,
    change,
    setImage,
    getPagination,
    totalData,
    randomUsers,
};
