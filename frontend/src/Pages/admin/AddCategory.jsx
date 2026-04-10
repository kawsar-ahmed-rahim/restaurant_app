import React from "react";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const AddCategory = () => {
  const { axios, navigate, loading, setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    setFormData({ ...formData, image: selectedFile });
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("image", formData.image);
      const res = await axios.post("/api/categories", data);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/categories");
      } else {
        toast.error(res.data.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }

    return (<div className="py-12">
      <form onSubmit={handleSubmit} className="max-w-md w-full flex flex-col gap-5">
        {preview &&<img src={preview} alt="preview" className="w-1/2" />}
        <div><label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name *
          </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-transparent" placeholder="Enter Category Name" /></div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
            <input type="file" id="fileUpload" className="hidden" onChange={handleFileChange}  required />
            {/* custom upload area */}
            <label htmlFor="fileUpload" className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 transition"></label>
          </div>
      </form>

    </div>);
  };
};

export default AddCategory;
