import { useEffect } from "react";
import DiscordMessage from "./DiscordMessage";

function makeid() {
    let length = 20
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


export default function NitroProof({ values }) {
    const msg1 = new Date()
    let nitroLink = 'https://discord.com/gifts/'

    useEffect(() => {
        nitroLink += makeid()
    })


    // link, nitro, profile, name, content, time
    return (
        <div>
            <div className="bg-[#303238] w-[900px] h-[400px] flex-col flex pt-4">
                <DiscordMessage link={true} nitro={{
                    payer: values.payer,
                    amount: values.amount,
                }} profile={values.payerImage} name={values.payer} content={nitroLink} time={msg1} />

                <DiscordMessage profile="https://picsum.photos/500" name={values.username} content={values.response} time={msg1} second={true}/>
            </div>
        </div>

    )
}