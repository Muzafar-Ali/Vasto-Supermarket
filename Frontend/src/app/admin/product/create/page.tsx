"use client";

import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useProductStore } from "@/store/prodcutStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCategoryStore } from "@/store/categoryStore";
import { useSubCategorytStore } from "@/store/subCategoryStore";

const UploadProductCopy = () => {
  const { addProduct, loading } = useProductStore();
  const { categories, getAllCategories } = useCategoryStore();
  const { allSubCategories, getAllSubCategories } = useSubCategorytStore();

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "0",
    discount: "0",
    stock: "0",
    unit: "",
    published: true,
    category: [] as string[], 
    subCategory: [] as string[], 
    image: [] as (string | File)[],  // Allow both URLs and File objects
    moreDetails: {} as Record<string, string>,
  });


  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // // Handle file upload
  // const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const files = Array.from(e.target.files);
  //     const newImages = files.map((file) => URL.createObjectURL(file));
  //     setData((prev) => ({
  //       ...prev,
  //       image: [...prev.image, ...newImages],
  //     }));
  //   }
  // };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const fileObjects = files.map((file) => file); // Keep original File objects
  
      setData((prev) => ({
        ...prev,
        image: [...prev.image, ...fileObjects], // Store files, not URLs
      }));
    }
  };
  // Handle image deletion
  const handleDeleteImage = (index: number) => {
    setData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  // Handle category selection
  const handleAddCategory = (categoryId: string) => {
    const category = categories.find((el) => el._id === categoryId);
    if (category) {
      setData((prev) => ({
        ...prev,
        category: [...prev.category, category._id], // Send only the ID
      }));
      setSelectCategory("");
    }
  };

  // Handle removing a category
  const handleRemoveCategory = (index: number) => {
    setData((prev) => ({
      ...prev,
      category: prev.category.filter((_, i) => i !== index),
    }));
  };

  // Handle sub-category selection
  const handleAddSubCategory = (subCategoryId: string) => {
    const subCategory = allSubCategories.find((el) => el._id === subCategoryId);
    if (subCategory) {
      setData((prev) => ({
        ...prev,
        subCategory: [...prev.subCategory, subCategory._id], // Send only the ID
      }));
      setSelectSubCategory("");
    }
  };

  // Handle removing a sub-category
  const handleRemoveSubCategory = (index: number) => {
    setData((prev) => ({
      ...prev,
      subCategory: prev.subCategory.filter((_, i) => i !== index),
    }));
  };

  // Handle adding a new field to moreDetails
  const handleAddField = () => {
    if (fieldName) {
      setData((prev) => ({
        ...prev,
        moreDetails: {
          ...prev.moreDetails,
          [fieldName]: "",
        },
      }));
      setFieldName("");
      setOpenAddField(false);
    }
  };

  const prepareFormData = (): FormData => {
    const formData = new FormData();
  
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("stock", data.stock.toString());
    formData.append("unit", data.unit);
    formData.append("published", data.published.toString());
  
    formData.append("category", JSON.stringify(data.category));
    formData.append("subCategory", JSON.stringify(data.subCategory));
    formData.append("moreDetails", JSON.stringify(data.moreDetails));
  
    // Append actual File objects
    data.image.forEach((img, index) => {
      if (img instanceof File) {
        formData.append("image", img);
      } else {
        console.warn(`Skipping non-file image at index ${index}`);
      }
    });
  
    return formData;
  }; 

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = prepareFormData();
      const success = await addProduct(formData); // Call Zustand's addProduct
      if (success) {
        toast.success("Product added successfully!");
        // Reset form after successful submission
        setData({
          name: "",
          description: "",
          price: "0",
          discount: "0",
          stock: "0",
          unit: "",
          published: true,
          category: [],
          subCategory: [],
          image: [],
          moreDetails: {},
        });
      }
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllSubCategories();
  }, []);

  return (
    <section className="max-w-[1024px] mx-auto mb-20">
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="grid p-3">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Description */}
          <div className="grid gap-1">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter product description"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <p className="font-medium">Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
              >
                <div className="text-center flex justify-center items-center flex-col">
                  <FaCloudUploadAlt size={35} />
                  <p>Upload Image</p>
                </div>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadImage}
                  multiple
                />
              </label>
              
              {/* Display uploaded images */}
              <div className="flex flex-wrap gap-4">
                {data.image.map((img, index) => {
                  const imageUrl = img instanceof File ? URL.createObjectURL(img) : img;

                  return (
                    <div
                      key={index}
                      className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                    >
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="w-full h-full object-scale-down cursor-pointer"
                        onClick={() => setViewImageURL(imageUrl)}
                      />
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer"
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Category */}
          <div className="grid gap-1">
            <label className="font-medium">Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectCategory}
                onChange={(e) => handleAddCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => (
                  <div
                    key={c + index + "productsection"}
                    className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                  >
                    <p>{categories.find((cat) => cat._id === c)?.name}</p>
                    <div
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => handleRemoveCategory(index)}
                    >
                      <IoClose size={20} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sub-Category */}
          <div className="grid gap-1">
            <label className="font-medium">Sub Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectSubCategory}
                onChange={(e) => handleAddSubCategory(e.target.value)}
              >
                <option value="" className="text-neutral-600">
                  Select Sub Category</option>
                {allSubCategories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => (
                  <div
                    key={c + index + "productsection"}
                    className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                  >
                    <p>{allSubCategories.find((subCat) => subCat._id === c)?.name}</p>
                    <div
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => handleRemoveSubCategory(index)}
                    >
                      <IoClose size={20} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Unit */}
          <div className="grid gap-1">
            <label htmlFor="unit" className="font-medium">
              Unit
            </label>
            <input
              id="unit"
              type="text"
              placeholder="Enter product unit"
              name="unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Stock */}
          <div className="grid gap-1">
            <label htmlFor="stock" className="font-medium">
              Number of Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter product stock"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Price */}
          <div className="grid gap-1">
            <label htmlFor="price" className="font-medium">
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter product price"
              name="price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* Discount */}
          <div className="grid gap-1">
            <label htmlFor="discount" className="font-medium">
              Discount
            </label>
            <input
              id="discount"
              type="number"
              placeholder="Enter product discount"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          {/* More Details */}
          {Object.keys(data.moreDetails).map((k, index) => (
            <div className="grid gap-1" key={k + index}>
              <label htmlFor={k} className="font-medium">
                {k}
              </label>
              <input
                id={k}
                type="text"
                value={data.moreDetails[k]}
                onChange={(e) => {
                  const value = e.target.value;
                  setData((prev) => ({
                    ...prev,
                    moreDetails: {
                      ...prev.moreDetails,
                      [k]: value,
                    },
                  }));
                }}
                required
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>
          ))}

          {/* Add Field Button */}
          <div
            onClick={() => setOpenAddField(true)}
            className="hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded"
          >
            Add Fields
          </div>

          {/* Submit Button */}
          { loading ? (
            <button
            disabled={loading}
            type="submit"
            className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold border"
          >
            Loading ....
          </button>
          ) : (
            <button
            type="submit"
            className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold border"
          >
            Submit
          </button>
          )}          
          
        </form>
      </div>

      {/* Add Field Modal */}
      {openAddField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Add New Field</h3>
            <input
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Enter field name"
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddField}
                className="bg-primary-100 hover:bg-primary-200 py-1 px-3 rounded"
              >
                Add
              </button>
              <button
                onClick={() => setOpenAddField(false)}
                className="bg-gray-100 hover:bg-gray-200 py-1 px-3 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UploadProductCopy;