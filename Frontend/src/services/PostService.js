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
        .catch((e) => {
            return { error: true, message: e.response.data };
        });
}

async function remove(id) {
    return await HttpService.delete("/Post/" + id)
        .then((response) => {
            return { error: false, message: response.data.message };
        })
        .catch((e) => {
            return { error: true, message: e.response.data };
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

async function getPagination(page, condition) {
    return await HttpService.get("/Post/pagination/" + page + "?condition=" + condition)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch((e) => {
            return { error: true, message: e.response.data };
        });
}

async function homePagination(page, condition) {
    return await HttpService.get("/Statistics/pagination/" + page + "?condition=" + condition)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch((e) => {
            return { error: true, message: e.response.data };
        });
}

export default {
    get,
    getByID,
    remove,
    add,
    change,
    getPagination,
    homePagination,
};
