export default function RobuxPayout({ values, index }) {
    const todaysDate = new Date()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", 'Nov', 'Dec']
    const month = monthNames[todaysDate.getMonth()]
    const day = todaysDate.getDate()
    const year = todaysDate.getFullYear()
    const hour = todaysDate.getHours()
    let minute = todaysDate.getMinutes()
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12

    if (minute < 10) minute = "0" + minute.toString()

    const topDate = `${month} ${day}, ${year}`
    const bottomDate = `${hour12}:${minute} ${ampm}`

    const color = index % 2 == 0 ? "bg-[#232426]" : "bg-[#2b2c2d]"

    return (
        <div className={`w-[1100px] h-[90px] flex shadow-white justify-between items-center text-lg pr-4 ${color}`}>
            <div className="flex gap-20">
                <div className="pl-4">
                    <p>{topDate}</p>
                    <p>{bottomDate}</p>
                </div>

                <div className="flex items-center">
                    <img src={values.image} alt="owner" className="w-12 h-12 rounded-full"></img>
                    <div className="px-4">
                        <p className="font-medium">{values.payer}</p>
                        <p className="text-md text-gray-300">Owner</p>
                    </div>
                </div>
            </div>

            <div className="inline w-[35rem]">
                <p><span className="font font-medium">{values.payer}</span> spent <img src="/robux.png" className=' w-6 h-6 inline'></img> {values.amount} of group funds for: one-time payout of Robux from group funds to <span className="font-medium">{values.username}</span> ({values.amount})</p>
            </div>
        </div>)

}