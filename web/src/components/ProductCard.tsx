import { ProductInterface } from "../interfaces/interfaces";

const ProductCard = ({ product }: { product: ProductInterface }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow min-h-[150px] flex flex-col h-full overflow-hidden w-full hover:scale-101 transition ease-in-out cursor-pointer">
            <h3 className="text-xl text-pink-500 font-bold mb-2">
                {product.nome}
            </h3>

            <p className="text-green-600 text-xl font-bold mt-auto whitespace-nowrap">
                R$ {Number(product.preco).toFixed(2)}
            </p>
            <p className="">Em estoque: {product.qtd_estoque}</p>
        </div>
    );
};

export default ProductCard;
