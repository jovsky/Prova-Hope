import {
    APIAuthResponse,
    APIProductsResponse,
    APIRegisterResponse,
    ProductInterface,
} from "../interfaces/interfaces";

const baseURL = "http://localhost:8000";

export async function authenticate(
    email: string,
    password: string
): Promise<APIAuthResponse> {
    const url = `${baseURL}/authenticate/`;
    const payload = { email, password };

    try {
        console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
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

export async function registerUser(
    email: string,
    password: string
): Promise<APIRegisterResponse> {
    const url = `${baseURL}/registerUser/`;
    const payload = { email, password };

    try {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data: APIRegisterResponse = await response.json();
        return data;
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : "desconhecido.";
        return {
            message: `Erro na comunicação com o servidor: ${errMsg}`,
            success: false,
        };
    }
}

export async function getProducts(token: string): Promise<{
    products: ProductInterface[];
    errorMsg?: string;
}> {
    try {
        const response = await fetch(`${baseURL}/products/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return { errorMsg: "A requisição falhou.", products: [] };
        }

        const data: APIProductsResponse = await response.json();

        const { validToken, products } = data;

        if (!validToken) {
            return { errorMsg: "Sessão expirada.", products: [] };
        }

        return { products };
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : "desconhecido.";
        return {
            errorMsg: `Erro na comunicação com o servidor: ${errMsg}`,
            products: [],
        };
    }
}
