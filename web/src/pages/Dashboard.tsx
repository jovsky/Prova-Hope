import { useContext, useEffect, useState } from "react";
import { ProductInterface, SortFiels } from "../interfaces/interfaces";
import { getProducts } from "../api/APIService";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import ProductDetails from "../components/ProductDetails";
import SortingSelector from "../components/SortingSelector";

let timeout: ReturnType<typeof setTimeout> | null = null;

const Dashboard = () => {
    const { session } = useContext(AuthContext);

    if (!session?.token) {
        return <Navigate replace to="/login" />;
    }

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<
        ProductInterface[]
    >([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [searchText, setSerchText] = useState<string>("");

    const [sortDirection, setSortDirection] = useState(false);
    const [selectedSort, setSortSelected] = useState<SortFiels>("-");

    const [selectedProd, setSelectedProd] = useState<ProductInterface | null>(
        null
    );

    useEffect(() => {
        setLoading(true);
        getProducts(session!.token)
            .then(({ products, errorMsg }) => {
                setLoading(false);
                setErrorMsg(errorMsg ?? null);
                setProducts(products);
            })
            .catch(() => setLoading(false));
    }, []);

    // Aplica filtros
    useEffect(() => {
        let filtered = [...products];

        // Filtro do texto de busca
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

        // Remove os sem preço e sem estoque
        filtered = filtered.filter((item) => item.preco && item.qtd_estoque);

        // Ordena
        if (selectedSort !== "-") {
            filtered = filtered.sort((it1, it2) => {
                if (it1[selectedSort] > it2[selectedSort]) {
                    return sortDirection ? -1 : 1;
                }
                if (it1[selectedSort] < it2[selectedSort]) {
                    return sortDirection ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredProducts(filtered);
    }, [products, searchText, sortDirection, selectedSort]);

    function debounce(value: string) {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
            setSerchText(value);
        }, 300);
    }

    return (
        <>
            <NavBar />
            {errorMsg ? (
                <div className="flex flex-col w-full text-center pt-40 text-xl">
                    <span>{errorMsg}</span>
                    <Link className="text-pink-500 underline" to="/login">
                        Voltar para página de Login
                    </Link>
                </div>
            ) : (
                <div className="mx-auto flex flex-col max-w-[1200px] w-[70%] pt-24 h-[100vh]">
                    <div className="flex flex-col h-fit">
                        <span className="text-[40px] pt-8 pb-2 font-semibold">
                            Confira Nossas Ofertas!
                        </span>
                        <div className="w-full flex h-12 my-8 pt-1">
                            <SortingSelector
                                selectedOption={selectedSort}
                                handleOptionChange={(value) =>
                                    setSortSelected(value)
                                }
                            />
                            {selectedSort === "-" ? (
                                ""
                            ) : (
                                <div
                                    onClick={() =>
                                        setSortDirection(!sortDirection)
                                    }
                                    className="cursor-pointer ml-1 flex justify-center items-center text-xl rounded-md border border-neutral-300 h-full w-12"
                                >
                                    <span className="text-blue-500 font-extrabold text-[26px]">
                                        {sortDirection ? "↑" : "↓"}
                                    </span>
                                </div>
                            )}
                            <input
                                className="ml-5 pl-2 border border-gray-300 text-gray-700 h-full rounded-md w-full placeholder-gray-400"
                                type="email"
                                placeholder="Pesquisar produto..."
                                onChange={(e) => debounce(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex w-full h-full overflow-hidden mb-10 relative">
                        <div
                            className={`bg-gray-200 p-4 overflow-auto transition-width duration-200 ease-in-out ${
                                selectedProd ? "w-1/2" : "w-full"
                            }`}
                        >
                            <div className="grid grid-cols-1 gap-5">
                                {loading ? (
                                    <span className="w-full m-auto h-[100px] flex justify-center items-center">
                                        {"Obtendo dados de produtos..."}
                                    </span>
                                ) : filteredProducts.length ? (
                                    filteredProducts.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() =>
                                                setSelectedProd(item)
                                            }
                                        >
                                            <ProductCard product={item} />
                                        </div>
                                    ))
                                ) : (
                                    <span className="w-full m-auto h-[100px] flex justify-center items-center">
                                        {"Nenhum resultado encontrado :("}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div
                            className={`absolute right-0 top-0 h-full w-[48%] transition-opacity duration-200 ease-in-out ${
                                selectedProd
                                    ? "opacity-100"
                                    : "opacity-0 pointer-events-none"
                            }`}
                        >
                            {selectedProd && (
                                <ProductDetails
                                    product={selectedProd}
                                    unselect={() => setSelectedProd(null)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
