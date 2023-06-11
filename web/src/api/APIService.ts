import { APIAuthResponse, ProductInterface } from "../interfaces/interfaces";

const baseURL = "http://localhost:9090";

async function request(
    url: string,
    email: string,
    password: string
): Promise<APIAuthResponse> {
    const payload = { email, password };

    try {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data: APIAuthResponse = await response.json();
        return data;
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : "desconhecido.";
        return {
            message: `Erro na comunicação com o servidor: ${errMsg}`,
            success: false,
        };
    }
}

export async function authenticate(
    email: string,
    password: string
): Promise<APIAuthResponse> {
    const url = `${baseURL}/authenticate`;
    return await request(url, email, password);
}

export async function registerUser(
    email: string,
    password: string
): Promise<APIAuthResponse> {
    const url = `${baseURL}/registerUser`;
    return await request(url, email, password);
}

export async function getProducts(): Promise<{
    products: ProductInterface[];
    errorMsg?: string;
}> {
    try {
        const response = await fetch(`${baseURL}/products`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            return { errorMsg: "A requisição falhou.", products: [] };
        }

        const products = await response.json();

        return { products };
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : "desconhecido.";
        return {
            errorMsg: `Erro na comunicação com o servidor: ${errMsg}`,
            products: [],
        };
    }
}
