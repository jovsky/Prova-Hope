import { useContext, useEffect, useState } from "react";
import { ProductInterface } from "../interfaces/interfaces";
import { getProducts } from "../api/APIService";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

const Dashboard = () => {
    const { session } = useContext(AuthContext);

    if (!session?.token) {
        return <Navigate replace to="/login" />;
    }

    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<
        ProductInterface[]
    >([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [searchText, setSerchText] = useState<string>("");

    useEffect(() => {
        getProducts(session!.token).then(({ products, errorMsg }) => {
            setErrorMsg(errorMsg ?? null);
            setProducts(products);
        });
    }, []);

    useEffect(() => {
        let filtered = [...products];

        if (searchText) {
            filtered = filtered.filter((item) => {
                const productName = item.nome.toLowerCase();
                const productDescription = item.descricao?.toLowerCase() ?? "";
                return (
                    productName.includes(searchText) ||
                    productDescription.includes(searchText)
                );
            });
        }
        filtered = filtered
            .filter((item) => item.preco)
            .sort((it1, it2) => {
                const val1 = it1.qtd_estoque ? 1 : 0;
                const val2 = it2.qtd_estoque ? 1 : 0;
                return val1 - val2;
            });

        setFilteredProducts(filtered);
    }, [products, searchText]);

    if (errorMsg) {
        return <span>{errorMsg}</span>;
    }

    return (
        <>
            <NavBar />
            <div className="flex flex-col m-auto max-w-[1200px] w-[80%] p-30 pt-20 h-[100vh]">
                <div className="flex flex-col h-fit">
                    <span className="text-[40px] pt-8 pb-2 font-semibold">
                        Confira Nossas Ofertas!
                    </span>
                    <input
                        className="border my-10 border-gray-300 text-gray-700 px-3 pt-1 h-12 rounded-md w-full placeholder-gray-400"
                        type="email"
                        placeholder="Pesquisar produto..."
                        value={searchText}
                        onChange={(e) => setSerchText(e.target.value)}
                    />
                </div>
                <div
                    id="prod-list"
                    className="flex bg-gray-200 w-full h-full overflow-hidden mb-10 "
                >
                    <div className="flex-grow p-4 overflow-auto">
                        <div className="grid grid-cols-3 gap-5">
                            {filteredProducts.length ? (
                                filteredProducts.map((item) => (
                                    <ProductCard product={item} key={item.id} />
                                ))
                            ) : (
                                <span className="w-full m-auto h-[100px] flex justify-center items-center">
                                    {"Nenhum resultado encontrado :("}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div id="prod-details"></div>
            </div>
        </>
    );
};

export default Dashboard;
