import { useState } from "react"


export default function PayPal() {

    const [values, setValues] = useState({
        amount: "100.00",
        email: "joeystinks@gmail.com",
        currency: "USD",
    })

    const handleChange = (name, value) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const aiGenerated = () => {
        fetch('/api/email').then(res => res.json()).then(data => {
            console.log(data)
            setValues({
                ...values,
                email: data.email,
            })
        })
    }

    return (
        <div className="flex flex-col items-center text-white bg-black h-screen pt-8">
            <h1 className="font-semibold text-4xl mb-8">PayPal Generator</h1>

            <div className="flex gap-8 pb-4">
                <input onChange={e => {
                    handleChange("email", e.target.value)
                }} placeholder="Email" className="rounded-md text-black"></input>

                <input onChange={e => {
                    handleChange("amount", e.target.value)
                }} placeholder="Amount" className="rounded-md text-black"></input>
            </div>
            <button className="rounded-lg px-6 py-2 mb-8 font-medium text-gray-100 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" onClick={aiGenerated}>Generate email with AI</button>

            <div className="bg-white text-black h-[750px] w-[750px] mt-8 flex items-center flex-col">
                <img src="/checkout_paypal.png" className="h-32 w-32 my-8"></img>
                <p>You've sent {values.amount} {values.currency} to {values.email}</p>

                <button className="bg-[#0070ba] px-56 py-4 text-white rounded-full mt-32 font-medium">Send More Money</button>
                <p className="text-[#0070ba] font-bold py-4">Go to Summary</p>
            </div>

        </div>
    )
}