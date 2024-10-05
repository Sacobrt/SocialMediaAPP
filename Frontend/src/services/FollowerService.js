import { HttpService } from "./HttpService";

async function get() {
    return await HttpService.get("/Follower")
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.error(e);
        });
}

async function getByID(id) {
    return await HttpService.get("/Follower/" + id)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch((e) => {
            return { error: true, message: "Follower doesn't exist!" };
        });
}

async function remove(id) {
    return await HttpService.delete("/Follower/" + id)
        .then((response) => {
            return { error: false, message: response.data.message };
        })
        .catch((e) => {
            return { error: true, message: "Followers cannot be deleted!" };
        });
}

async function add(follower) {
    return await HttpService.post("/Follower/", follower)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch((e) => {
            switch (e.status) {
                case 400:
                    let message = [];
                    for (const key in e.response.data) {
                        message.push(e.response.data[key]);
                    }
                    return { error: true, message: message };
                default:
                    return { error: true, message: "Follower cannot be added!" };
            }
        });
}

async function change(id, follower) {
    return await HttpService.put("/Follower/" + id, follower)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch((e) => {
            switch (e.status) {
                case 400:
                    let message = [];
                    for (const key in e.response.data) {
                        message.push(e.response.data[key]);
                    }
                    return { error: true, message: message };
                default:
                    return { error: true, message: "Followers cannot be changed!" };
            }
        });
}

export default {
    get,
    getByID,
    remove,
    add,
    change,
};