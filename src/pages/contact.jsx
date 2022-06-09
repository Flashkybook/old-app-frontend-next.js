import { useRef } from 'react'
import emailjs from '@emailjs/browser';
import Layout from '../components/Layout';


const Contact = () => {

    const form = useRef();
    const sendEmail = (e) => {
        emailjs.sendForm('Personal_Email', 'template_falg43x', form.current, process.env.user_id_mail)
            .then((result) => {
                console.log(result.text);
                alert(`success, your message will be answered soon `)
            }, (error) => {
                console.log(error.text);
            });
        e.preventDefault();
        e.target.reset();

    };


    return (

        <Layout title={"Contact"}>


            <div className='my-12 flex flex-col justify-center items-center h-full w-full'>

                <h1 className='text-center text-4xl font-bold'>Contact</h1>

                <p className='text-center text-xl my-5'>if you have any suggestions or questions please do not hesitate to contact me.</p>

                <form ref={form} onSubmit={sendEmail} className="mt-6 card-2">
                    <div className="w-full flex flex-col mt-4">
                        <label className="font-semibold leading-none">Email</label>
                        <input autoComplete='off' type="email" name="from_email" required
                            className="leading-none p-3 focus:outline-none focus:border-blue-700 mt-1 border-0 bg-gray-800 rounded" />
                    </div>
                    <div className="w-full flex flex-col mt-8">
                        <label className="font-semibold leading-none">Subject</label>
                        <input autoComplete='off' type="text" name="subject" required
                            className="leading-none p-3 focus:outline-none focus:border-blue-700 mt-1 border-0 bg-gray-800 rounded" />
                    </div>

                    <div>
                        <div className="w-full flex flex-col mt-8">
                            <label className="font-semibold leading-none ">Message</label>
                            <textarea type="text" name="message" required
                                className="h-40 text-base leading-none p-3 focus:outline-none focus:border-blue-700 mt-1 bg-gray-800 border-0 rounded"></textarea>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <button
                            className="mt-2 button-secondary p-3 bg-gradient-to-tr from-sky-800 to-teal-800">
                            Send message
                        </button>
                    </div>
                </form>
            </div>

        </Layout>


    )
}

export default contact