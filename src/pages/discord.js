import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { default: NitroProof } = require("../components/NitroProof");

const { useState, useEffect } = require("react");

export default function Discord() {
    const [values, setValues] = useState({
        amount: "month",
        username: "Joey",
        payer: "GameBoi",
        response: "thanks",
        payerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Xbox_app_logo.svg/640px-Xbox_app_logo.svg.png",
        responseImage: "https://picsum.photos/500",
        spoiler: false
    })

    const handleChange = (name, value) => {
        if (name === "response" && value === "") value = "thanks"
        if (name === "username" && value === "") value = "Joey"

        setValues({
            ...values,
            [name]: value
        })

    }

    const aiGenerated = () => {
        fetch('/api/gen').then(res => res.json()).then(data => {
            setValues({
                ...values,
                username: data.username,
                response: data.response,
            })
        })
    }

    const [proof, setProof] = useState({
        year: "30",
        month: "51"
    })

    return (
        <div className="flex flex-col items-center text-white bg-black h-max pt-8">
            <h1 className="text-5xl">Nitro Proof Generator</h1>
            <p className="p-8 text-lg">Generate a proof of you sending a discord user nitro</p>
            <form className="pb-8 flex gap-4">
                <select className="text-black border-2 rounded-md" onChange={e => {
                    handleChange("amount", e.target.value)
                }}>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </select>

                <input onChange={event => {
                    handleChange("username", event.target.value)
                }} className="text-black rounded-md" type="text" placeholder="Username" />

                <input onChange={event => {
                    handleChange("response", event.target.value)
                }} className="text-black rounded-md" type="text" placeholder="Response" />

            </form>

            <button className="rounded-lg px-6 py-2 mb-8 font-medium text-gray-100 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" onClick={aiGenerated}>Generate name and message with AI</button>

            <NitroProof values={values} />


            <h1 className="my-8 text-4xl">Nitro Gift Inventory</h1>

            <div className="flex gap-8 mb-8">
                <input onChange={e => {
                    setProof({
                        ...proof,
                        month: e.target.value
                    })
                }} className="text-black rounded" placeholder="Month Amount"></input>

                <input onChange={e => {
                    setProof({
                        ...proof,
                        year: e.target.value
                    })
                }} className="text-black rounded" placeholder="Year Amount"></input>

            </div>


            <div className="bg-[#303238] w-[800px] h-[600px] flex-col flex p-12 divide-y-2 divide-[#3a3d43]">
                <h2 className="font-semibold text-lg pb-2">Gifts You Purchased</h2>

                <div>
                    <div className="pt-8">
                        <div className="p-6 bg-[#1f1e22] rounded-t-md flex justify-between items-center ">
                            <div className="flex gap-4">
                                <img src="/nitroSmall.png" className="w-12 h-12 rounded-md"></img>
                                <div>
                                    <h1>Nitro (1 month)</h1>
                                    <p className="text-[#9c9d9f]">{proof.month} copies</p>
                                </div>
                            </div>

                            <FontAwesomeIcon icon={faChevronUp} className="text-xl" />

                        </div>
                        <div className="p-6 bg-[#2a2c31] rounded-b-md flex justify-between items-center">
                            <p>You have more gifts! Make another link?</p>

                            <button className="px-4 py-2 rounded-md bg-[#5964f2] font-medium">Generate Link</button>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="p-6 bg-[#1f1e22] rounded-t-md flex justify-between items-center ">
                            <div className="flex gap-4">
                                <img src="/nitroSmall.png" className="w-12 h-12 rounded-md"></img>
                                <div>
                                    <h1>Nitro (1 year)</h1>
                                    <p className="text-[#9c9d9f]">{proof.year} copies</p>
                                </div>
                            </div>

                            <FontAwesomeIcon icon={faChevronUp} className="text-xl" />

                        </div>
                        <div className="p-6 bg-[#2a2c31] rounded-b-md flex justify-between items-center">
                            <p>You have more gifts! Make another link?</p>

                            <button className="px-4 py-2 rounded-md bg-[#5964f2] font-medium">Generate Link</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}