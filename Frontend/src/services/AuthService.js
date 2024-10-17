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
        .catch(() => {
            return { error: true, message: "Problem with authorization!" };
        });
}
