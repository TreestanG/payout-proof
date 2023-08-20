import { useEffect } from "react";
import DiscordMessage from "./DiscordMessage";

export default function NitroProof({ values }) {
    const msg1 = new Date()

    return (
        <div>
            <div className="bg-[#303238] w-[900px] h-[450px] flex-col flex pt-4">
                <DiscordMessage link={true} nitro={{
                    payer: values.payer,
                    amount: values.amount,
                }} profile={values.payerImage} name={values.payer} content={"nitro"} time={msg1} spoiler={values.spoiler}/>

                <DiscordMessage profile="https://picsum.photos/500" name={values.username} content={values.response} time={msg1} second={true}/>

            </div>
        </div>

    )
}