   // pages/index.js
   import React from 'react';
   import PrintableContent from '../components/PrintableContent';

   const Home = () => {
       const handlePrint = () => {
           window.print();
       };

       return (
           <div>
               <h1>صفحه اصلی</h1>
               <PrintableContent />
               <button onClick={handlePrint}>پرینت</button>
           </div>
       );
   };

   export default Home;
   