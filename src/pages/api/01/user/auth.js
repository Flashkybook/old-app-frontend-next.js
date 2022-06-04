// /api/01/user/register/
import cookie from 'cookie'

const backend_api = process.env.BACKEND_DJANGO_API

export default async function auth(request, response){
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
            const apiRes = await fetch(`${backend_api}/api/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh })
            });
            const data = await apiRes.json()
            // console.log('primer llamado', save_cookies, apiRes.status)
            if (apiRes.status === 200) {
                // agregamos el token access a nuestra cookie
                response.setHeader('Set-Cookie', [ // agrega un header a la respuesta de la peticion
                    // datos serializados por medio de la cookie que seran agregados al header del response
                    cookie.serialize('access', data.access, {
                        httpOnly: true,
                        secure: process.env.ENV_DEV !== 'true', // si ENV_DEV es 'true' devuelve false y agrega el protocolo ssp
                        maxAge: 1800, // 60*30 coincide con el SIMPLE_JWT = {'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30), del backend
                        sameSite: 'strict', // requiere que sea del mismo sitio de solicitud
                        path: '/api/'

                    }),

                    // // apicamos lo mismo para el refresh token que nos dara el login
                    // cookie.serialize('refresh', data.refresh, {
                    //     httpOnly: true,
                    //     secure: process.env.ENV_DEV !== 'true', // si ENV_DEV es 'true' devuelve false y agrega el protocolo ssp
                    //     maxAge: 60 * 60 * 24, // 60*30 coincide con el SIMPLE_JWT = {'REFRESH_TOKEN_LIFETIME': timedelta(days=1), del backend
                    //     sameSite: 'strict', // requiere que sea del mismo sitio de solicitud
                    //     path: '/api/'


                    // })
                ])

                // VERIFY
                const token_verify = JSON.stringify({ 'token': access })
                try {
                    const apiResVerify = await fetch(`${backend_api}/api/token/verify/`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: token_verify
                    });
                    const access_data = apiResVerify.json()
                    if (apiResVerify.status === 200) {
                        // refresh y token correctamente verificados

                        // GET USER
                        const userApiRes = await fetch(`${backend_api}/api/account/`, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': `Bearer ${access}`, // da una respuesta al backend con nuestro usuario
                            }
                        });
                        const userData = await userApiRes.json()
                        if (userApiRes.status === 200) {
                            return response.status(200).json({ success: userData.success })
                        } else {
                            return response.status(500).json({ error: userData })
                        }



                        // return response.status(201).json({ success: 'verify user success' })
                    } else {
                        console.log(apiResVerify.status, '405')
                        return response.status(405).json({ error: 'verify token fail' })
                    }

                } catch (error) {
                    console.log(token_verify, '404')
                    return response.status(403).json({ error: 'Verify token fail' })
                }
            } else {
                return response.status(403).json({ error: 'Refresh token fail' })
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