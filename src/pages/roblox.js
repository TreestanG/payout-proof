import Image from 'next/image'
import { useState } from 'react'
import { Montserrat } from 'next/font/google'
import RobuxPayout from './components/RobuxPayout'

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
        if (name === "amount") value = parseInt(value).toLocaleString()
        if (name === "payer" && value.length > 20) value = value.slice(0, 20) + "..."
        if (name === "username" && value.split(",").length > 1) value = value.split(",")

        setValues({
            ...values,
            [name]: value
        })
    }

    console.log(values.username)

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
    const todaysDate = new Date()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", 'Nov', 'Dec']
    const month = monthNames[todaysDate.getMonth()]
    const day = todaysDate.getDate()
    const year = todaysDate.getFullYear()
    const hour = todaysDate.getHours()
    const minute = todaysDate.getMinutes()
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12

    const topDate = `${month} ${day}, ${year}`
    const bottomDate = `${hour12}:${minute} ${ampm}`

    return (
        <main className={"flex items-center flex-col"}>
            <div className={font.className}>
                <h1 className="text-5xl">Roblox Payout Proof Generator</h1>
                <p className="p-8 text-lg">Generate a proof of payment for your Roblox group.</p>

                <Image src="/robux.png" width="50" height="50" alt="robux" />

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
                </form>

                <button className="font-medium underline mb-8" onClick={() => getImage(values.payer)}>Get Image</button>
                {
                    (Array.isArray(values.username) && values.username.length > 0) ? values.username.map((name, i) => {
                        return (
                            <RobuxPayout key={i} values={{
                                ...values,
                                username: name,
                            }} index={i}/>
                        )
                    }) : <RobuxPayout values={values} />
                }
            </div>

        </main>
    )
}
