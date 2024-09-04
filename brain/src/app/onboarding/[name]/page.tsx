"use client"
import React, { useState } from 'react'
import { GridPattern } from '@/components/ui/gridbacl'
import { useParams } from 'next/navigation'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Progress } from "@/components/ui/progress"
import Image from 'next/image'
import Link from 'next/link'


function Page() {
  const {name}= useParams()
  const newname=name.toString()
  const username=newname.replaceAll('%20'," ")
  const [currentstep, setcurrentstep] = useState(1)
  const [value, setValue] = useState("")
  const [progressbarvalue, setprogressbarvalue] = useState(33)
  const nextstep=()=>{
    setcurrentstep(currentstep+1)
    setprogressbarvalue(progressbarvalue+33)
  }
  return (
    <div className="relative bg-black w-full h-screen flex flex-col items-center justify-center">
      {/* Background GridPattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <GridPattern />
      </div>
      

      {/* Center the Tabs component */}
      {currentstep===1 && <div className=" grid bg-white rounded-md relative z-10  items-center h-100 w-100 justify-center">
        <h1 className=' text-black text-2xl m-3'>Hi {username} !</h1>
        <div className=' px-10'>
        <button onClick={nextstep} className='bg-blue-600 mt-2 h-fit w-fit m-3 text-white p-2 rounded-md'>Let's Get Started</button>
        </div>
      </div>}

      {currentstep===2 && 
      <div className=" grid bg-white rounded-md relative z-10  items-center h-100 w-100 justify-center">
        <div className=" m-3 p-3 space-y-2">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup className=' px-4 '>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <div className="text-center text-sm">
              {value.length<6 ? (
                <p className=' text-xl text-black'>Enter The Code You Recieved</p>
              ) : (
                <button onClick={nextstep} className=' m-2 p-2 text-md rounded-md text-white bg-black '>Submit</button>
              )}
            </div>
          </div>
      </div>}

      {currentstep===3 &&
      <div className=" grid bg-white rounded-md relative z-10  items-center h-100 w-100 justify-center">
          <section className="  container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Meet Your Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div className="bg-background rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://cdn.vox-cdn.com/thumbor/yIoKynT0Jl-zE7yWwzmW2fy04xc=/0x0:706x644/1400x1400/filters:focal(353x322:354x323)/cdn.vox-cdn.com/uploads/chorus_asset/file/13874040/stevejobs.1419962539.png"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                    width={300}
                    height={200}
                    style={{ aspectRatio: "300/300", objectFit: "cover" }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Steve Jobs</h3>
                  <p className="text-muted-foreground">Founder</p>
                  <p className="text-sm mt-2">
                    Jobs is the most passionnate person, but a cool guy after task is completed
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="https://pbs.twimg.com/profile_images/1589756412078555136/YlXMBzhp_400x400.jpg"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                    style={{ aspectRatio: "300/300", objectFit: "cover" }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Pieter Levels</h3>
                  <p className="text-muted-foreground">Senior Engineer</p>
                  <p className="text-sm mt-2">Shipping products fast and pushing directly to production is his thing </p>
                </div>
              </div>
              <div className="bg-background rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src="https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                    style={{ aspectRatio: "300/300", objectFit: "cover" }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Elon Musk</h3>
                  <p className="text-muted-foreground">Junior Engineer</p>
                  <p className="text-sm mt-2">
                    Elon is a junior engineer who is still learning , but he keeps talking about mars
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src="https://pbs.twimg.com/profile_images/1725685609057185792/pez5sLeP_400x400.jpg"
                    alt="Team Member"
                    className="w-full h-full rounded-md object-cover"
                    width={300}
                    height={300}
                    style={{ aspectRatio: "300/300", objectFit: "contain" }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">Yatharth</h3>
                  <p className="text-muted-foreground">Junior Engineer</p>
                  <p className="text-sm mt-2">
                    Yatharth is the new engineer who are you going to hire, he is a great guy DO Hire Him
                  </p>
                </div>
              </div>
            </div>
          </section>
          <Link href="https://discord.com/channels/@me" ><button className=" p-2 m-2 bg-black text-white rounded-md">Final Step Go To Discord</button></Link>
      </div>
        }

      <Progress className=' text-black bg-white w-[40%] m-3 ' value={progressbarvalue} />


    </div>
  )
}

export default Page





  

