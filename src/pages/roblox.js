import Image from 'next/image'
import { useState } from 'react'
import { Montserrat } from 'next/font/google'
import RobuxPayout from '../components/RobuxPayout'

const font = Montserrat({ subsets: ['latin'] })

function getUserID(name) {
    return new Promise((res, rej) => {
        fetch(`https://www.roblox.com/users/profile?username=${name}`)
            .then(r => {
                if (!r.ok) { throw "Invalid response"; }
                return r.url.match(/\d+/)[0];
            })
            .then(id => {
                res(id)
            })
    })
}

export default function Home() {

    const [values, setValues] = useState({
        username: "",
        payer: "Miseru",
        amount: "10,000",
        image: "/owner.png"
    })

    const handleChange = (name, value) => {
        if (name === "amount" && value) value = parseInt(value).toLocaleString()
        if (name === "payer" && value.length > 20) value = value.slice(0, 20) + "..."
        if (name === "username" && value.split(",").length > 1) value = value.split(",")

        setValues({
            ...values,
            [name]: value
        })
    }

    const getImage = async (name) => {
        const id = await getUserID(name)
        const res = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=150x150&format=Png&isCircular=false`).catch(e => {
            console.log('Couldnt find user thumbnail')
        })
        const data = await res.json()
        const thumbnail = data.data[0].imageUrl

        setValues({
            ...values,
            image: thumbnail
        })
    }

    const aiGenerated = () => {
        fetch('/api/username').then(res => res.json()).then(data => {
            setValues({
                ...values,
                username: data.username,
            })
        })
    }

    return (
        <main className={"flex items-center flex-col bg-black text-white h-screen pt-8"}>
            <div className={font.className}>
                <h1 className="text-5xl">Roblox Payout Proof Generator</h1>
                <p className="p-8 text-lg">Generate a proof of payment for your Roblox group.</p>


                <form>
                    <input onChange={event => {
                        handleChange("payer", event.target.value)
                    }} className="border-2 text-black border-black rounded-md" type="text" placeholder="Payer" />

                    <input onChange={event => {
                        handleChange("username", event.target.value)
                    }} className="border-2 text-black border-black rounded-md" type="text" placeholder="Username" />
                    <input onChange={event => {
                        handleChange("amount", event.target.value)
                    }} className="border-2 text-black border-black rounded-md" type="text" placeholder="Amount" />
                    <button className="font-medium underline mb-8" onClick={() => getImage(values.payer)}>Get Image</button>

                </form>

                <button className="rounded-lg px-6 py-2 mb-8 font-medium text-gray-100 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" onClick={aiGenerated}>Generate email with AI</button>


                {
                    (Array.isArray(values.username) && values.username.length > 0) ? values.username.map((name, i) => {
                        return (
                            <RobuxPayout key={i} values={{
                                ...values,
                                username: name,
                            }} index={i} />
                        )
                    }) : <RobuxPayout values={values} />
                }


                <div>

                </div>
            </div>

        </main>
    )
}
