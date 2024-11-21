
import React from 'react'
import Avatar from '../assets/Avatar.png'
import png from '../assets/undraw_Upvote_re_qn2k.png'
import { Link } from 'react-router-dom'

const Novotacion = () => {
    return (
        <div className='px-5 h-full flex items-center justify-center '>
        <section className="bg-white w-5/6">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">

          <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize md:text-3xl">
            No hay votaciones recientes
          </h1>
          <p className="mt-4 text-black">
            Recuerde Entrar por medio del link o codigo Qr
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link to='/Validation' className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Regresar</span>
            </Link>

         
          </div>
        </div>

        <div className="relative h-full w-full mt-8 lg:w-1/2 lg:mt-0 shadow-blue-500/50 rounded-lg flex items-center justify-center">
        <img className="w-full  lg:w-full h-full  rounded-lg object-cover bg-center " src={png} alt=""/>
        </div>
      </div>
    </section>
        </div>
    )
}

export default Novotacion
