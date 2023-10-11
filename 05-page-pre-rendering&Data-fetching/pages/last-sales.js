/** @format */

import { useEffect, useState } from "react";
import useSWR from "swr";

// function LastSalesPage() {
//   const [sales, setSales] = useState();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     fetch(
//       "https://nextjs-course-be441-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const transformedSales = [];

//         for (const key in data) {
//           transformedSales.push({
//             id: key,
//             username: data[key].username,
//             volume: data[key].volume,
//           });
//         }

//         setSales(transformedSales);
//         setIsLoading(false);
//       });
//   }, []);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (!sales) {
//     return <p>No data yet</p>;
//   }

//   return (
//     <ul>
//       {sales.map((sale) => (
//         <li key={sale.id}>
//           {sale.username} - ${sale.volume}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default LastSalesPage;

// using swr nextjs hook

// function LastSalesPage() {
//   const [sales, setSales] = useState();

//   const { data, error } = useSWR(
//     "https://nextjs-course-be441-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
//   );

//   useEffect(() => {
//     if (data) {
//       const transformedSales = [];

//       for (const key in data) {
//         transformedSales.push({
//           id: key,
//           username: data[key].username,
//           volume: data[key].volume,
//         });
//       }

//       setSales(transformedSales);
//     }
//   }, [data]);

//   if (error) {
//     return <p>Failed to load</p>;
//   }

//   if (!data || !sales) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <ul>
//       {sales.map((sale) => (
//         <li key={sale.id}>
//           {sale.username} - ${sale.volume}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default LastSalesPage;

// Combining pre-fetching with client side fetching

function LastSalesPage() {
  const [sales, setSales] = useState();

  const { data, error } = useSWR(
    "https://nextjs-course-be441-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-be441-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  );

  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: { sales: transformedSales },
    revalidate: 10,
  };
}

export default LastSalesPage;
