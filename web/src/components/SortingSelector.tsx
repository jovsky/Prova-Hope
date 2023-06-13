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
        <select
            value={selectedOption}
            onChange={(event) =>
                handleOptionChange(event.target.value as SortFiels)
            }
            className="text-base bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default SortSelector;
