import { HttpService } from "./HttpService";

async function get(firstNumber, secondNumber) {
    return await HttpService.get(`/Cyclic/${firstNumber}/${secondNumber}`)
        .then((response) => {
            console.log(response.data);
            return response;
        })
        .catch((e) => {
            console.error(e);
        });
}

export default {
    get,
};
