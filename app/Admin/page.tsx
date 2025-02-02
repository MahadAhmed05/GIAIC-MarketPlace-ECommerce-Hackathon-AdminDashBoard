// // app/pages/admin/page.tsx
// "use client"; // Add this to indicate that this component is client-side

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// const Admin = () => {
//   const router = useRouter();

//   useEffect(() => {
//     // Check for authentication flag in localStorage
//     const isAuthenticated = localStorage.getItem("isAuthenticated");

//     if (!isAuthenticated) {
//       // If not authenticated, redirect to login page
//       router.push("../Pages/Login");
//     }
//   }, [router]);

//   // Logout function
//   const handleLogout = () => {
//     // Remove the authentication flag from localStorage
//     localStorage.removeItem("isAuthenticated");

//     // Redirect to login page after logout
//     router.push("../Pages/Login");
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Welcome to the Admin Dashboard</h1>
//       <p>You are authenticated!</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Admin;
//
//
// "use client";

// import { useEffect, useState } from "react";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";

// interface Order {
//   _id: string;
//   totalPrice: number;
//   status: string;
//   createdAt: string;
//   shippingDetails: {
//     name: string;
//     address: string;
//     city: string;
//     country: string;
//     zipCode: string;
//   };
//   cartItems: {
//     _key: string;
//     title: string;
//     quantity: number;
//     price: number;
//     imageUrl: string;
//   }[];
// }

// const Orders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await client.fetch(
//           `*[_type == "order"]{
//             _id,
//             totalPrice,
//             status,
//             createdAt,
//             shippingDetails,
//             cartItems
//           }`
//         );
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>

//       {orders.length === 0 ? (
//         <p className="text-gray-600">No orders found.</p>
//       ) : (
//         <div className="grid gap-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white shadow-md rounded-lg p-6 border"
//             >
//               <div className="mb-4">
//                 <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
//                 <p className="text-gray-500">
//                   <strong>Date:</strong>{" "}
//                   {new Date(order.createdAt).toLocaleString()}
//                 </p>
//                 <p className="text-gray-500">
//                   <strong>Status:</strong>{" "}
//                   <span
//                     className={`px-3 py-1 rounded-full text-white ${
//                       order.status === "Pending"
//                         ? "bg-yellow-500"
//                         : "bg-green-500"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </p>
//               </div>

//               <div className="mb-4">
//                 <h3 className="text-lg font-semibold">Customer Details</h3>
//                 <p>
//                   <strong>Name:</strong> {order.shippingDetails.name}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {order.shippingDetails.address},{" "}
//                   {order.shippingDetails.city}, {order.shippingDetails.country}{" "}
//                   - {order.shippingDetails.zipCode}
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold">Ordered Items</h3>
//                 <div className="grid gap-4">
//                   {order.cartItems.map((item) => (
//                     <div
//                       key={item._key}
//                       className="flex items-center gap-4 border-t pt-4"
//                     >
//                       <img
//                         // src={urlFor(product.image).url()}
//                         src={urlFor(item.imageUrl).url()}
//                         alt={item.title}
//                         className="w-20 h-20 object-cover rounded-lg border"
//                       />
//                       <div>
//                         <p className="font-medium">{item.title}</p>
//                         <p className="text-gray-600">
//                           {item.quantity} × ${item.price}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <p className="text-lg font-bold">
//                   Total: ${order.totalPrice.toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;
//
//
//
"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Package, Calendar, MapPin, User } from "lucide-react";

interface Order {
  _id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  shippingDetails: {
    name: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
  };
  cartItems: {
    _key: string;
    title: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "order"]{
            _id,
            totalPrice,
            status,
            createdAt,
            shippingDetails,
            cartItems
          }`
        );
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Orders Dashboard
          </h1>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
            <span className="text-gray-600 font-medium">Total Orders: </span>
            <span className="text-indigo-600 font-bold">{orders.length}</span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No orders found.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="border-b border-gray-100 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Order ID</p>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {order._id}
                      </h2>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                        order.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {order.shippingDetails.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <p className="text-sm text-gray-600">
                      {order.shippingDetails.address},{" "}
                      {order.shippingDetails.city},{" "}
                      {order.shippingDetails.country} -{" "}
                      {order.shippingDetails.zipCode}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {order.cartItems.map((item) => (
                      <div
                        key={item._key}
                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={urlFor(item.imageUrl).url()}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="text-xl font-bold text-indigo-600">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
