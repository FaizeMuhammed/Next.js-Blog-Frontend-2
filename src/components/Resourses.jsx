

export default function Resourses({ text, para }) {
    return (
        <div className="tagnum p-7  w-full border border-[#262626] border-r-0 border-b-0 flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
                <h2 className="text-white text-[40px]">{text}</h2><span className="text-yellow-300">+</span>


            </div>
            <p className="text-[#666666]">{para}</p>

        </div>
    )
}




