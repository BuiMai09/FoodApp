import React from 'react'
import cake6 from '../../src/assest/cake6.PNG'
import cake7 from '../../src/assest/cake7.PNG'

const Contact = () => {
  return (
    <div>
      <div className='w-full mb-16'>
        <div className='ml-16 mt-6 flex items-center flex-row  mb-28'>
          <div className='mr-14 '>
            <div className='font-Lobster text-8xl'>Contact Us</div>
            <ul className='text-lg ml-6'>
              <li>Apostolia Nasiopoulou</li>
              <li>Katapola, Amorgos 84008, Greece</li>
              <li>+30 22850 71554</li>
              <li>+30 22850 74178</li>
              <li>+30 22850 71554</li>
              <li>info@sweets.com</li>

            </ul>
          </div>
          <div className='ml-14 mr-24 w-1/2 '>
            <img className='left-28 mb-6 relative' src={cake6}></img>
            <img className='ml-10' src={cake7}></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact