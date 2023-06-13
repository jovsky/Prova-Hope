import { ProductInterface } from "../interfaces/interfaces";

const ProductDetails = ({
    product,
    unselect,
}: {
    product: ProductInterface;
    unselect: Function;
}) => {
    const available = !!product.qtd_estoque;

    return (
        <div className="flex flex-col relative w-[95%] h-full p-6 border bg-white rounded-xl text-xl overflow-hidden">
            <div
                className="absolute cursor-pointer right-6"
                onClick={() => unselect()}
            >
                ❌
            </div>

            <h3 className="text-[40px] text-pink-500 font-bold mb-2 mt-6">
                {product.nome}
            </h3>

            <p className="text-neutral-600 mr-6 mt-10">{product.descricao}</p>

            <div className="flex justify-between mt-auto mb-20">
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                        <span className="text-neutral-500 w-20">SKU</span>
                        <strong className="ml-2 text-neutral-600">
                            {product.sku}
                        </strong>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-neutral-500 w-20">Tamanho</span>
                        <strong className="ml-2 text-neutral-600">
                            {product.tam}
                        </strong>
                    </div>
                </div>

                <div className="flex flex-col gap-1 whitespace-nowrap">
                    <div className="flex gap-2">
                        <span className="text-neutral-500 w-30">
                            Já vendidos
                        </span>
                        <strong className="ml-2 text-neutral-600">
                            {product.qtd_vendida}
                        </strong>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-neutral-500 w-30">
                            Em estoque
                        </span>
                        <strong className="ml-2 text-neutral-600">
                            {product.qtd_estoque}
                        </strong>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-end">
                <p className="text-[30px] text-green-600 text-xl font-bold whitespace-nowrap">
                    R$ {Number(product.preco).toFixed(2)}
                </p>
                <button className="py-2 px-4 ml-auto cursor-pointer bg-neutral-500 hover:bg-neutral-400 text-white w-30 h-10 rounded text-base">
                    Carrinho
                </button>
                <button className="py-2 px-4 ml-2 cursor-pointer bg-pink-500 hover:bg-pink-400 text-white w-30 h-10 rounded text-base">
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
