import React, { useContext } from "react";
import { AppContext } from "./../context/AppContext";

const Categories = () => {
  const { categories = [] } = useContext(AppContext);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold">
          Explore Our <span className="text-yellow-500">Categories</span>
        </h2>

        <p className="text-gray-600 mt-2">
          Discover delicious dishes from our carefully curated categories
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-10">
          {categories.map((cart) => (
            <div
              key={cart._id}
              className="cursor-pointer group"
            >
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-yellow-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                  <img
                    src={cart.image}
                    alt={cart.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 group-hover:text-yellow-500 transition-colors duration-300">
                  {cart.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;