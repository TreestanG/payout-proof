const { default: NitroProof } = require("./components/NitroProof");

const { useState } = require("react");

export default function Discord() {
    const [values, setValues] = useState({
        amount: "month", // year ****
        username: "Joey", // ****
        payer: "GameBoi",
        response: "thanks", // ****
        payerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Xbox_app_logo.svg/640px-Xbox_app_logo.svg.png",
        responseImage: "https://picsum.photos/500" // ****
    })

    const handleChange = (name, value) => {
        if(name === "response" && response === "") value = "thanks"
        if(name === "username" && username === "") value = "Joey"

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

    return (
        <div className="flex flex-col items-center text-white">
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
                }} className="border-2 text-black border-black rounded-md" type="text" placeholder="Username" />

                <input onChange={event => {
                    handleChange("response", event.target.value)
                }} className="border-2 text-black border-black rounded-md" type="text" placeholder="Response" />
            </form>

            <button className="rounded-lg px-6 py-2 mb-8 font-medium text-gray-100 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" onClick={aiGenerated}>Generate name and message with AI</button>

            <NitroProof values={values} />
        </div>
    )
}