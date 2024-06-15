"use client"
/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/vw3Fm1zvI36
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { TooltipTrigger, TooltipContent, Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { uploadkey } from "@/actions/uploadkey"
import { useFormState } from 'react-dom'
import { useEffect } from "react"

const initialState = {
  message: '',
}

export  function AddKey() {
  // const submit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   let res = await fetch("https://x.mobin.workers.dev/api/addkey", {
  //     method: "POST",
  //     headers: {
  //     "Content-Type": "application/json",
  //     },
      
  //     body: JSON.stringify({
  //     apikey: "test",
  //     uploaderid:1,
  //     }),
  //   })
  //   let msg = await res.text()
  //   console.log(res)
  // }

  const [state, formAction] = useFormState(uploadkey, initialState)
  useEffect(() => {
    if (state.message) {
      alert(state.message)
    }
  }, [state.message])
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TooltipProvider>
        <form className="bg-white dark:bg-gray-950 p-8 rounded-lg shadow-lg w-full max-w-md" action={formAction}>
          <div className="space-y-4">
            <div>
              <Label className="block font-medium" htmlFor="api-key">
                API Key
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    className="w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    id="api-key"
                    name="apikey"
                    placeholder="Enter your API key"
                    type="text"
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-red-500 text-white p-2 rounded-md shadow-lg max-w-[200px]">
                  Please enter a valid API key.
                </TooltipContent>
              </Tooltip>
            </div>
            <Button className="w-full" type="submit" >
              Submit
            </Button>
          </div>
        </form>
      </TooltipProvider>
    </div>
  )
}
