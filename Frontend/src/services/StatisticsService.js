import { HttpService } from "./HttpService";

async function topUserStats() {
    return await HttpService.get("/Statistics/TopUserStats")
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.error(e);
        });
}

export default {
    topUserStats,
};
