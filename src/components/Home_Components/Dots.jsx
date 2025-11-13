import React from 'react'

const Dots = ({ activeIndex }) => {
    const number_of_dots = [1, 3, 3];

    return (
        <div className='flex space-x-1 justify-center mt-2'>
            {number_of_dots.map((dot, index) => (
                <div
                    key={index} // ✅ added key here
                    className={`${index === activeIndex ? 'bg-grey' : 'bg-grey-light'} w-2 h-2 rounded-full`}
                ></div>
            ))}
        </div>
    )
}

export default Dots
