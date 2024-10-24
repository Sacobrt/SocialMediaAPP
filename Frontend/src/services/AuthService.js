import { HttpService } from "./HttpService";

export async function logInService(data) {
    return await HttpService.post("/Authorization/token", data)
        .then((response) => {
            return {
                error: false,
                token: response.data.token,
                user: response.data.user,
            };
        })
        .catch((e) => {
            return { error: true, message: e.response.data.message };
        });
}
