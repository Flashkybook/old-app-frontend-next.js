// /api/01/bookwords/
import cookie from 'cookie'
const backend_api = process.env.BACKEND_DJANGO_API

export default async function index(request, response) {
    //  guardados en los cookies
    const save_cookies = cookie.parse(request.headers.cookie ?? '')

     // get book user > http://127.0.0.1:8000/api/words/ 

    const refresh = save_cookies.refresh
    const access = save_cookies.access

    if (request.method === 'GET') {
        try {

            // REFRESH
            const apiRes = await fetch(`${backend_api}/api/words/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`, // da una respuesta al backend con nuestro usuario
                }
            });
            const data = await apiRes.json()

            if (apiRes.status === 200) {
                return response.status(200).json({ success: data.success })
            } else {
                console.log('index?')
                return response.status(500).json({error: data})
            }
        } catch (error) {
            console.log('402')
            response.status(402).json({ error: `solicitud fallida ${request.method}` })
        }
    } else {
        console.log('401')
        response.status(401).json({ error: `no soporta method ${request.method}` })
    }
}