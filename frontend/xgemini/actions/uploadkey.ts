'use server'

export async function uploadkey(prev:any,data: FormData) {
    let apikey = data.get('apikey') as string
    let res = await fetch("https://x.mobin.workers.dev/api/addkey", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            apikey: apikey,
            uploaderid: 1,
        }),
    })
    let msg = await res.json()
    if (msg.res) {
        return { message: 'API key added successfully' }
    }
    
        return { message: msg.error as string}
     
}

