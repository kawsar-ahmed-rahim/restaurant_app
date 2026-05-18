import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Menus = () => {
  const { axios, menus, fetchMenus } = useContext(AppContext);

  const deleteMenu = async (id) => {
    try {
      const { data } = await axios.delete(`/api/menu/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchMenus();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-3">All Menus</h1>
      <div className="border border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-5 font-semibold text-gray-700">
          <div>Image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Action</div>
        </div>
        <hr className="w-full my-4 text-gray-200" />
        <ul>
          {menus?.map((item) => (
            <div key={item?._id}>
              <div className="grid grid-cols-5 items-center mb-4">
                <div className="flex items-center gap-2 max-w-md">
                  <img
                    src={item?.image || "https://via.placeholder.com/100"}
                    alt={item?.name || "image"}
                    className="w-20 h-20 object-cover"
                  />
                </div>
                <p>{item?.name || "N/A"}</p>
                <p>{item?.category?.name || "N/A"}</p>
                <p>$ {item?.price || "0"}</p>
                <p
                  className="text-red-600 cursor-pointer hover:underline"
                  onClick={() => deleteMenu(item?._id)}
                >
                  <CircleX />
                </p>
              </div>
              <hr className="w-full text-gray-300" />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menus;
