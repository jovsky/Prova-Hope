import { useContext, useEffect, useState } from "react";
import {
    ProductInterface,
    SortFiels,
    SortType,
} from "../interfaces/interfaces";
import { getProducts } from "../api/APIService";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import ProductDetails from "../components/ProductDetails";
import SortingSelector from "../components/SortingSelector";

const arrowUp = "&#129065;";
const arrowDown = "&#129067;";

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

    const [sortValues, setSortValues] = useState<{
        [k in "nome" | "preco" | "-"]: boolean;
    }>({ "-": true, nome: true, preco: true });

    const [selectedSort, setSortSelected] = useState<SortType>({
        sortBy: "-",
        asc: true,
    });

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

    function handleOptionChange(value: SortFiels) {
        const newDirection = !sortValues[value];
        setSortValues({
            ...sortValues,
            [value]: !sortValues[value],
        });
        setSortSelected({ sortBy: value, asc: newDirection });
    }

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
        if (selectedSort.sortBy !== "-") {
            const sortBy = selectedSort.sortBy;
            filtered = filtered.sort((it1, it2) => {
                const val1 = it1[sortBy] ? 1 : 0;
                const val2 = it2[sortBy] ? 1 : 0;
                return selectedSort.asc ? val1 - val2 : val2 - val1;
            });
        }

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
                    <div className="w-full flex gap-3">
                        <input
                            className="border my-10 border-gray-300 text-gray-700 px-3 pt-1 h-12 rounded-md w-full placeholder-gray-400"
                            type="email"
                            placeholder="Pesquisar produto..."
                            value={searchText}
                            onChange={(e) => setSerchText(e.target.value)}
                        />
                        <SortingSelector
                            selectedOption={selectedSort.sortBy}
                            handleOptionChange={handleOptionChange}
                        />
                    </div>
                </div>
                <div className="flex  w-full h-full overflow-hidden mb-10 relative">
                    <div
                        className={`bg-gray-200 p-4 overflow-auto transition-width duration-200 ease-in-out ${
                            selectedProd ? "w-1/2" : "w-full"
                        }`}
                    >
                        <div className="grid grid-cols-3 gap-5">
                            {loading ? (
                                <span className="w-full m-auto h-[100px] flex justify-center items-center">
                                    {"Obtendo dados de produtos..."}
                                </span>
                            ) : filteredProducts.length ? (
                                filteredProducts.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedProd(item)}
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
        </>
    );
};

export default Dashboard;
