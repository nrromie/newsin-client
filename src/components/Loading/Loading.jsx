
const Loading = () => {
    return (
        <div className="flex justify-center items-center gap-3 h-[90vh]">
            <img className="w-32 animate-spin" src="/images/newsin.svg" alt="Logo" />
            <h1 className="text-3xl">Loading</h1>
        </div>
    );
};

export default Loading;