const Logo = ({ nav }: { nav: boolean }) => {
    if (nav) {
        return (
            <div className="flex items-center justify-center gap-1">
                <div className="flex relative items-center justify-center w-14 h-14 rounded-lg bg-white cursor-default">
                    <p className="text-pink-500 font-bold text-[50px]/[50px] mt-[-5px]">
                        H
                    </p>
                </div>
                <h2 className="text-gray-200 text-[35px] font-bold">opeShop</h2>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center gap-1">
            <div className="flex relative items-center justify-center w-24 h-24 rounded-lg bg-black cursor-default">
                <p className="text-pink-500 font-bold text-[80px]/[80px] mt-[-10px]">
                    H
                </p>
            </div>
            <h2 className="text-gray-800 text-7xl font-bold">opeShop</h2>
        </div>
    );
};
export default Logo;
