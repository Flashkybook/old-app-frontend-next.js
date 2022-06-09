// /api/01/user/register/
import cookie from 'cookie'
const backend_api = process.env.BACKEND_DJANGO_API

export default async function index(request, response) {
    //  guardados en los cookies
    const save_cookies = cookie.parse(request.headers.cookie ?? '')
    // work flow data 
    // refres token >   http://127.0.0.1:8000/api/token/refresh/
    // verify token >   http://127.0.0.1:8000/api/token/verify/
    // get user Post > http://127.0.0.1:8000/api/account/

    const refresh = save_cookies.refresh
    const access = save_cookies.access

    if (request.method === 'GET') {
        try {

            // REFRESH
            const apiRes = await fetch(`${backend_api}/api/account/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`, // da una respuesta al backend con nuestro usuario
                }
            });
            const data = await apiRes.json()

            if (resApi.status === 200) {
                return response.status(200).json({ success: data.success })
            } else {
                return response.status(500).json({ error: data.error })
            }
        } catch (error) {
            response.status(402).json({ error: `Server error ${request.method}` })
        }
    } else {
        response.status(401).json({ error: `no soporta method ${request.method}` })
    }
}