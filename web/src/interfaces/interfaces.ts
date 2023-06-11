export interface ProductInterface {
    id: string;
    nome: string;
    descricao: string;
    sku: null;
    tam: string;
    qtdEstoque: number;
    qtdVendida: number;
    preco: number;
}

export interface AuthContextInterface {
    user: string | null;
    sessionToken: string | null;
    isLogged: () => boolean;
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
