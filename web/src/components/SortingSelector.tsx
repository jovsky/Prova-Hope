import { SortFiels } from "../interfaces/interfaces";

const options = [
    { name: "Nome", value: "nome" },
    { name: "Preço", value: "preco" },
    { name: "Nenhum", value: "-" },
] as const;

const SortSelector = ({
    selectedOption,
    handleOptionChange,
}: {
    selectedOption: SortFiels;
    handleOptionChange: (v: SortFiels) => void;
}) => {
    return (
        <div className="">
            <select
                value={selectedOption}
                onChange={(event) =>
                    handleOptionChange(event.target.value as SortFiels)
                }
                className="block appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute w-4 h-4 inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 12l-6-6h12l-6 6z" />
                </svg>
            </div>
        </div>
    );
};

export default SortSelector;
