// /api/01/bookwords/
import cookie from 'cookie'
const backend_api = process.env.BACKEND_DJANGO_API

/**
 * allow methos post and get for all user_book
 */
export default async function index(request, response) {
    //  guardados en los cookies
    const save_cookies = cookie.parse(request.headers.cookie ?? '')

     // endpoint get and post > http://127.0.0.1:8000/api/words/ 

    const refresh = save_cookies.refresh
    const access = save_cookies.access

    const sendData = JSON.stringify(request.body)

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
                return response.status(500).json({error: data})
            }
        } catch (error) {
            console.log('402')
            response.status(402).json({ error: `solicitud fallida ${request.method}` })
        }
    }
    if (request.method === 'POST') {
        try {
            const apiRes = await fetch(`${backend_api}/api/words/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`,
                    'Content-Type': 'application/json',
                },
                body: sendData
            });
            const data = await apiRes.json()

            //  201 created  202 acepted and added 406 no lo crea ni lo acepta
            if (apiRes.status === 201) {
                return response.status(201).json({ success: data.success })

            } else if (apiRes.status === 202) {
                return response.status(202).json({ success: data.success, })
                
            } else if (apiRes.status === 406) {
                return response.status(406).json({ error:` ${data.error} ` })
            }
        } catch (error) {
            response.status(402).json({ error: `solicitud fallida ${request.method}` })
        }
    } 
    else {
        console.log('401')
        response.status(401).json({ error: `no allow method ${request.method}` })
    }
}