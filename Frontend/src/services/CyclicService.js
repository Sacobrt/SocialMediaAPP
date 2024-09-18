import { HttpService } from "./HttpService";

async function get(rows, columns) {
    return await HttpService.get(`/Cyclic/${rows}/${columns}`)
        .then((response) => {
            return response;
        })
        .catch((e) => {
            return message;
        });
}

export default {
    get,
};
