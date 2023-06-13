export interface ProductInterface {
    id: string;
    nome: string;
    descricao: string;
    sku: string;
    tam: string;
    qtd_estoque: number;
    qtd_vendida: number;
    preco: number;
}

export type Session = { email: string; token: string } | null;

export interface AuthContextInterface {
    session: Session;
    checkedStorage: boolean;
    handleLogin: (
        email: string,
        password: string
    ) => Promise<{ success: boolean; message: string }>;
    handleRegister: (
        email: string,
        password: string
    ) => Promise<{ success: boolean; message: string }>;
    handleLogout: () => void;
}

export interface APIAuthResponse {
    success: boolean;
    message: string;
    token?: string;
}

export interface APIRegisterResponse {
    success: boolean;
    message: string;
}

export interface APIProductsResponse {
    products: ProductInterface[];
    validToken: boolean;
}

export type SortFiels = "nome" | "preco" | "-";

export type SortType = {
    sortBy: SortFiels;
    asc: boolean;
};
