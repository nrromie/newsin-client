
const Globe = () => {
    const moveRightKeyframes = `
        @keyframes moveRight {
            0% {
                transform: translateX(-50%);
            }
            100% {
                transform: translateX(0%);
            }
        }
    `;

    const animateMoveRightStyle = {
        animation: 'moveRight 10s linear infinite',
    };

    return (
        <>
            <style>{moveRightKeyframes}</style>
            <div className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden shadow-slate-500 shadow-md">
                <div
                    className="w-[1200px] h-[300px] lg:w-[2000px] lg:h-[500px] animate-moveRight"
                    style={animateMoveRightStyle}
                >
                    <img
                        className="aspect-w-4 aspect-h-1 h-full object-cover"
                        src="./images/map.jpeg"
                        alt="Moving Image"
                    />
                </div>
            </div>
        </>
    );
};

export default Globe;