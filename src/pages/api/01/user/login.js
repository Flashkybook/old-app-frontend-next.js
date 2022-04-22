
// /api/01/user/register/

import cookie from 'cookie'
const backend_api = process.env.BACKEND_DJANGO_API


export default async (request, response) => {
    const sendData = JSON.stringify(request.body)

    if (request.method === 'POST') {
        try {
            const apiRes = await fetch(`${backend_api}/api/token/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: sendData
            });
            const data = await apiRes.json()

            if (apiRes.status === 200) {
                // save data in cookies
                response.setHeader('Set-Cookie', [ // agrega un header a la respuesta de la peticion            
                // datos serializados por medio de la cookie que seran agregados al header del response
                    cookie.serialize('access', data.access, {
                        httpOnly: true,
                        secure: process.env.ENV_DEV !== 'true', // si ENV_DEV es 'true' devuelve false y agrega el protocolo ssp
                        maxAge : 1800, // 60*30 coincide con el SIMPLE_JWT = {'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30), del backend
                        sameSite: 'strict', // requiere que sea del mismo sitio de solicitud
                        path: '/api/'
                    }),
                    // apicamos lo mismo para el refresh token que nos dara el login
                    cookie.serialize('refresh', data.refresh, {
                        httpOnly: true,
                        secure: process.env.ENV_DEV !== 'true', // si ENV_DEV es 'true' devuelve false y agrega el protocolo ssp
                        maxAge : 60 * 60 * 24 , // 60*30 coincide con el SIMPLE_JWT = {'REFRESH_TOKEN_LIFETIME': timedelta(days=1), del backend
                        sameSite: 'strict', // requiere que sea del mismo sitio de solicitud
                        path: '/api/'
                    })
                ])
                return response.status(201).json({ success: data.success, "data": data.body })
                
            } else {
                console.log('login 403 no status 200', data)
                return response.status(apiRes.status).json({ error: data.error })
            }
        } catch (error) {
            console.log("login 402")

            response.status(402).json({ error: `solicitud fallida ${request.method}` })
        }
    } else {
        console.log("login 401")
        response.status(401).json({ error: `no soporta method ${request.method}` })
    }
}