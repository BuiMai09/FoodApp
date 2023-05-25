import React from 'react'
import Cake4 from '../../src/assest/Cake4.PNG'

const About = () => {
  return (
    <div>
      <div className="w-full  bg-violet-100">
        <div className="flex justify-center">
          <div className=" w-1/2  ml-28 mb-20  ">
            <img className="mt-6 " src={Cake4}></img>
          </div>
          <div className="w-1/2 -ml-16 mr-12 mt-28">
            <div className="flex flex-col items-center ">
              <div className='font-Lobster text-8xl text-gray-900 py-6'>About Us</div>
              <p className="text-lg">When in New Paltz, don't miss a trip to The Bakery. Residents consider The Bakery,
                with its rustic outdoor cafe and beautiful gardens, to be the center of social life
                in New Paltz, a place to meet people, bump into old friends, or sit quietly and read
                the papers. Known since 1981 for great bagels, croissants, rolls, rugulah, danish and
                butter cookies, The Bakery includes a coffee bar and full lunch menu. Experience New
                Paltz! Visit The Bakery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About