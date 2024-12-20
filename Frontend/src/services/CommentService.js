import { HttpService } from "./HttpService";

async function get() {
    return await HttpService.get("/Comment")
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.error(e);
        });
}

async function getByID(id) {
    return await HttpService.get("/Comment/" + id)
        .then((response) => {
            return { error: false, message: response.data };
        })
        .catch((e) => {
            return { error: true, message: e.response.data };
        });
}

async function remove(id) {
    return await HttpService.delete("/Comment/" + id)
        .then((response) => {
            return { error: false, message: response.data.message };
        })
        .catch((e) => {
            return { error: true, message: e.response.data };
        });
}

async function add(comment) {
    return await HttpService.post("/Comment/", comment)
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
                    return { error: true, message: "Comment cannot be added!" };
            }
        });
}

async function change(id, comment) {
    return await HttpService.put("/Comment/" + id, comment)
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
                    return { error: true, message: "Comment cannot be changed!" };
            }
        });
}

async function getPagination(page, condition) {
    return await HttpService.get("/Comment/pagination/" + page + "?condition=" + condition)
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
};
