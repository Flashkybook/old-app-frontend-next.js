
// /api/01/user/register/

const backend_api = process.env.BACKEND_DJANGO_API


export default async function register(request, response) {
    const sendData = JSON.stringify(request.body)
    if (request.method === 'POST') {
        try {
            const apiRes = await fetch(`${backend_api}/api/account/register/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: sendData
            });
            const data = await apiRes.json()
            console.log(data)

            if (apiRes.status === 201) {
                return response.status(201).json({ success: data.success, 'data': data.body })
            } else {
                return response.status(apiRes.status).json({ error: data.error })
            }
        } catch (error) {
            response.status(402).json({ error: `solicitud fallida ${request.method}` })
        }
    } else {
        console.log('401')
        response.status(401).json({ error: `no soporta method ${request.method}` })
    }
}