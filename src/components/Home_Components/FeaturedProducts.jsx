// import React from 'react'
// import { Carousel } from 'primereact/carousel';
// import { Button } from 'primereact/button';


// const FeaturedProducts = () => {
//     const products = [
//         {
//             title: "Product 1",
//             price: "10/-"
//         },
//         {
//             title: "Product 1",
//             price: "20/-"
//         },
//         {
//             title: "Product 1",
//             price: "30/-"
//         },
//         {
//             title: "Product 1",
//             price: "430/-"
//         },
//         {
//             title: "Product 1",
//             price: "430/-"
//         },
//         {
//             title: "Product 1",
//             price: "430/-"
//         },
//     ]
//     const responsiveOptions = [
//         {
//             breakpoint: '1400px',
//             numVisible: 4,
//             numScroll: 1
//         },
//         {
//             breakpoint: '1199px',
//             numVisible: 3,
//             numScroll: 1
//         },
//         {
//             breakpoint: '767px',
//             numVisible: 2,
//             numScroll: 1
//         },
//         {
//             breakpoint: '575px',
//             numVisible: 2,
//             numScroll: 1
//         }
//     ];
//     const productTemplate = (product) => {
//         return (
//             <div className="bg-white mx-4 shadow-lg rounded-xl  border border-gray-300 overflow-hidden">
//                 <img
//                     src="https://via.placeholder.com/200"
//                     alt="Product 1"
//                     className="w h-32 object-cover"
//                 />
//                 <hr className="border-t border-gray-300" />
//                 <div className="p-4 text-center">
//                     <h2 className="text-xl font-normal mb-2">{product.title}</h2>
//                     <p className="text-sm text-gray-600">{product.price}</p>
//                     <button className="mt-3 px-6 py-2 text-black cursor-pointer rounded-lg bg-[#7eacac] hover:bg-[#adcaca] transition duration-300 border">
//                         Add to Cart
//                     </button>
//                 </div>
//             </div>
//         );
//     };
//     return (
//         <div className="place-items-center">
//             <Carousel className='w-[90%]' value={products} numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
//         </div>
//     )
// }

// export default FeaturedProducts
