import cookie from 'cookie'

export default function handler(request, response) {

    if (request.method === 'POST') {
        response.setHeader('Set-Cookie', [
            cookie.serialize('access', '', {
                httpOnly: true,
                secure: process.env.ENV_DEV !== 'false',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/api/'
            }),
            cookie.serialize('refresh', '', {
                httpOnly: true,
                secure: process.env.ENV_DEV !== 'false',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/api/'
            })
        ])

        return response.status(200).json({ success: 'Logout success' })

    } else {
        response.setHeader('Allow', ['POST'])
        return response.status(200).json({ 'error': 'only alow POST method' })
    }
}
