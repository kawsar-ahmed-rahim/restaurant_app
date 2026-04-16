import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Categories = () => {
  const { categories, fetchCategories, axios } = useContext(AppContext);

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(`/api/category/delete/${id}`);

      if (data.success) {
        toast.success(data.message);
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-3">All Categories</h1>

      <div className="border border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-3 font-semibold text-gray-700">
          <div>Image</div>
          <div>Name</div>
          <div>Action</div>
        </div>

        <hr className="w-full my-4 text-gray-200" />

        <ul>
          {categories?.map((item) => (
            <li key={item._id}>
              <div className="grid grid-cols-3 items-center mb-4">
                <div className="flex items-center gap-2 max-w-md">
                  <img
                    src={item.image}
                    alt="category"
                    className="w-20 h-20 object-cover"
                  />
                </div>

                <p>{item.name}</p>

                <button
                  className="text-red-600 cursor-pointer hover:scale-110 transition"
                  onClick={() => deleteCategory(item._id)}
                >
                  <CircleX />
                </button>
              </div>

              <hr className="w-full text-gray-300" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;