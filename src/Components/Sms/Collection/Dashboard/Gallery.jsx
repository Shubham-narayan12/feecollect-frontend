import React, { useEffect, useRef, useState } from "react";
import {
  Trash2,
  Filter,
  Tag,
  Type,
  MoreVertical,
  UploadCloud,
  X,
  AlertTriangle,
  Loader2,
} from "lucide-react";

import {
  createGalleryApi,
  getAllGalleryApi,
  deleteGalleryApi,
} from "../../../../api/galleryImagesApi";

const Gallery = () => {
  const [images, setImages] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // loading states
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const categories = ["All", "Sports", "Academics", "Events", "Facilities", "Infrastructure"];

  const fileInputRef = useRef(null);

  // ==========================================
  // GET ALL GALLERY IMAGES
  // ==========================================

  const fetchAllGallery = async () => {
    try {
      setPageLoading(true);

      const response = await getAllGalleryApi();

      setImages(response?.galleries || []);
    } catch (error) {
      console.log(error);

      alert(error?.message || "Failed to fetch gallery");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGallery();
  }, []);

  // ==========================================
  // HANDLE FILE CHANGE
  // ==========================================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG, JPG and JPEG files are allowed");
      return;
    }

    // max 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setSelectedFile(file);

    setPreviewUrl(URL.createObjectURL(file));
  };

  // ==========================================
  // REMOVE PREVIEW
  // ==========================================

  const handleRemovePreview = (e) => {
    e.stopPropagation();

    setSelectedFile(null);

    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // CREATE GALLERY IMAGE
  // ==========================================

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      if (!title.trim()) {
        return alert("Please enter image title");
      }

      if (!category) {
        return alert("Please select category");
      }

      if (!selectedFile) {
        return alert("Please select image");
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("imageTitle", title);

      formData.append("category", category);

      // IMPORTANT
      formData.append("image", selectedFile);

      const response = await createGalleryApi(formData);

      alert(response.message);

      // refresh
      fetchAllGallery();

      // reset
      setTitle("");
      setCategory("");
      setSelectedFile(null);
      setPreviewUrl("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);

      alert(error?.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // OPEN DELETE MODAL
  // ==========================================

  const openDeleteModal = (img) => {
    setImageToDelete(img);

    setIsDeleteModalOpen(true);
  };

  // ==========================================
  // DELETE GALLERY IMAGE
  // ==========================================

  const confirmDelete = async () => {
    try {
      if (!imageToDelete) return;

      const response = await deleteGalleryApi(imageToDelete._id);

      alert(response.message);

      // refresh gallery
      fetchAllGallery();

      // close modal
      setIsDeleteModalOpen(false);

      setImageToDelete(null);
    } catch (error) {
      console.log(error);

      alert(error?.message || "Failed to delete image");
    }
  };

  // ==========================================
  // FILTER IMAGES
  // ==========================================

  const filteredImages =
    selectedFilter === "All"
      ? images
      : images.filter(
          (img) => img.category.toLowerCase() === selectedFilter.toLowerCase(),
        );

  return (
    <div className="p-6 bg-slate-50 min-h-screen relative">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">School Gallery</h1>

        <p className="text-slate-500 text-sm">
          Manage and organize campus life photos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
          <form
            onSubmit={handleUpload}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200"
          >
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm">
              <Tag size={18} className="text-emerald-500" />
              Quick Upload
            </h2>

            <div className="space-y-4">
              {/* TITLE */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Image Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />

                <Type
                  size={16}
                  className="absolute left-3 top-2.5 text-slate-400"
                />
              </div>

              {/* CATEGORY */}
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm appearance-none"
                >
                  <option value="">Select Category</option>

                  {categories
                    .filter((c) => c !== "All")
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>

                <Filter
                  size={16}
                  className="absolute left-3 top-2.5 text-slate-400"
                />
              </div>

              {/* FILE INPUT */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {/* IMAGE PREVIEW */}
              <div
                onClick={() => fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer min-h-[120px] flex flex-col items-center justify-center relative ${
                  previewUrl
                    ? "border-emerald-500 bg-emerald-50/10"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                {previewUrl ? (
                  <div className="w-full h-full relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded-lg"
                    />

                    <button
                      type="button"
                      onClick={handleRemovePreview}
                      className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full shadow-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <UploadCloud size={24} className="text-slate-400 mb-1" />

                    <p className="text-[11px] text-slate-500 font-semibold">
                      Click to select image
                    </p>
                  </>
                )}
              </div>

              {/* UPLOAD BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-800 text-white py-2 rounded-lg font-semibold hover:bg-slate-900 transition-colors shadow-md text-sm flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload to Gallery"
                )}
              </button>
            </div>
          </form>

          {/* FILTERS */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="font-bold text-slate-800 mb-3 text-xs uppercase tracking-wider">
              Filter by Category
            </h2>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    selectedFilter === cat
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* GALLERY GRID */}
        <div className="lg:col-span-3">
          {pageLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 size={40} className="animate-spin text-emerald-600" />
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredImages.map((img) => (
                <div
                  key={img._id}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={img.imageUrl}
                      alt={img.imageTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-2 right-2">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                        {img.category}
                      </span>
                    </div>

                    {/* DELETE BUTTON */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => openDeleteModal(img)}
                        className="p-3 bg-white rounded-full text-rose-600 hover:bg-rose-50 transition-all transform hover:scale-110 shadow-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-slate-800 text-sm truncate">
                        {img.imageTitle}
                      </h3>

                      <p className="text-[11px] text-slate-400">
                        Uploaded on{" "}
                        {new Date(img.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <button className="text-slate-300 hover:text-slate-600">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-20 text-center border border-slate-200">
              <UploadCloud size={40} className="mx-auto text-slate-200 mb-3" />

              <p className="text-slate-500 font-medium">No photos found.</p>
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 overflow-hidden">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={32} />
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Are you sure?
              </h2>

              <p className="text-slate-500 text-sm mb-6">
                Do you really want to delete{" "}
                <span className="font-semibold text-slate-700">
                  "{imageToDelete?.imageTitle}"
                </span>
                ?
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-rose-200"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
