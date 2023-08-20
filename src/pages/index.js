import Link from 'next/link'

export default function Home() {
  return (
    <main className={"flex items-center flex-col bg-black text-white h-screen"}>
      <h1 className="text-5xl font-semibold mt-8">Fake Proof Generator</h1>
      <div className="flex">
        <Link href="/roblox"><button className="underline p-8" >Robux Payout</button></Link>
        <Link href="/discord"><button className="underline p-8" >Nitro Payout</button> </Link>
        <Link href="/paypal"><button className="underline p-8" >PayPal Payout</button></Link>

      </div>

      <h1 className='text-2xl font-semibold'>Get Started</h1>
      <p className='pt-4'>To generate a proof, click on either robux or nitro tabs above.</p>
      <p>For Robux, fill out the user you want to pay and the amount and take a screenshot. </p>
      <p>Optionally, you can provide the username of the payer (case sensitive) and press the Get Image button to get the avatar of the player.</p>
      <p>For additional entries, seperate usernames with a comma</p>

      <p className='pt-4'>For Nitro, decide on what nitro you want to give, Month or Year. Type the username of the receiver and their response message</p>
      <p>Optionally, you can generate the receiver's username and their response message using AI</p>
    </main>
  )
}
