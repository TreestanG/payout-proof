import { useEffect, useState } from "react"

const genLink = () => {
    let length = 20
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return `https://discord.com/gifts/${result}`;
}

export default function DiscordMessage({ link, nitro, profile, name, content, time, second }) {

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) return null

    let todaysDate = time

    const hour = todaysDate.getHours()
    let minute = todaysDate.getMinutes()
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12

    if (minute < 10) minute = "0" + minute.toString()

    let nLink = content
    if (content === "nitro") {
        nLink = link ? genLink() : "nitro"
    }


    return (
        <div className=" flex pt-4">
            <div>
                <img src={profile} className="w-[45px] h-[45px] my-1 mx-[20px] rounded-full"></img>
            </div>
            <div className="text-[#f2f3f5] text-[16px]">
                <div className='flex items-center gap-2'>
                    <p className="text-md font-medium">{name}</p>
                    <p className='text-[.75rem] text-[#6e727a] font-[400]'>Today at {hour12}:{minute} {ampm}</p>
                </div>
                <p className={link ? "text-[#00a8fc]" : ""}>{nLink}</p>
                {
                    content === "nitro" && (
                        <div className={"h-6 w-60 bg-black absolute -translate-y-6 translate-x-44"}>
                        </div>
                    )
                }

                {
                    nitro ? (
                        <div className="w-[720px] bg-[#202324] mt-1 rounded-lg flex justify-between ">
                            <div className='p-[12px]'>
                                <p className='font-[700]'>You've been gifted a subscription!</p>
                                <p className='py-2 pb-[68px] text-[#b7b8ba]'>
                                    <span className="font-[700] ">{nitro.payer}</span> has gifted you Nitro for <span className="font-[700]">1 {nitro.amount}</span>!
                                </p>
                                <div className='flex justify-between items-end w-[350px]'>
                                    <button className="py-2 px-5 rounded-md bg-[#42b681] font-[450]">Accept</button>
                                    <p className='text-[#6e727a] text-xs font-medium '>Expires in 47 hours</p>
                                </div>
                            </div>
                            <img src="nitro.png" className='h-[190px] rounded-r-lg '></img>
                        </div>
                    ) : <></>
                }

            </div>
        </div>
    )
}