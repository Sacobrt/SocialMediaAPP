import { HttpService } from "./HttpService";

async function get() {
    return await HttpService.get("/Post")
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.error(e);
        });
}

async function getByID(id) {
    return await HttpService.get("/Post/" + id)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch(() => {
            return { error: true, message: "Post doesn't exist!" };
        });
}

async function remove(id) {
    return await HttpService.delete("/Post/" + id)
        .then((response) => {
            return { error: false, message: response.data.message };
        })
        .catch(() => {
            return { error: true, message: "Post cannot be deleted!" };
        });
}

async function add(post) {
    return await HttpService.post("/Post/", post)
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
                    return { error: true, message: "Post cannot be added!" };
            }
        });
}

async function change(id, post) {
    return await HttpService.put("/Post/" + id, post)
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
                    return { error: true, message: "Post cannot be changed!" };
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
