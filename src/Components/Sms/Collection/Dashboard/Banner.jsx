import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  Plus,
  Eye,
  X,
  Loader2,
} from "lucide-react";

import {
  createBannerApi,
  getAllBannerApi,
  deleteBannerApi,
} from "../../../../api/bannerApi";

const Banner = () => {
  const fileInputRef = useRef();

  const [banners, setBanners] = useState([]);
  const [bannerTitle, setBannerTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [previewModal, setPreviewModal] = useState(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // ===============================
  // GET ALL BANNERS
  // ===============================

  const fetchAllBanners = async () => {
    try {
      setPageLoading(true);

      const response = await getAllBannerApi();

      setBanners(response?.banners || []);
    } catch (error) {
      console.log(error);

      alert(error?.message || "Failed to fetch banners");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBanners();
  }, []);

  // ===============================
  // HANDLE FILE SELECT
  // ===============================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // File Validation
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG, JPG and JPEG files are allowed");
      return;
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setSelectedFile(file);

    const imagePreview = URL.createObjectURL(file);

    setPreview(imagePreview);
  };

  // ===============================
  // CREATE BANNER
  // ===============================

  const handleSaveBanner = async () => {
    try {
      if (!bannerTitle.trim()) {
        alert("Please enter banner title");
        return;
      }

      if (!selectedFile) {
        alert("Please upload banner image");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("bannerTitle", bannerTitle);

      // IMPORTANT
      formData.append("banner", selectedFile);

      const response = await createBannerApi(formData);

      alert(response.message);

      // refresh banners
      fetchAllBanners();

      // reset fields
      setBannerTitle("");
      setSelectedFile(null);
      setPreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);

      alert(error?.message || "Failed to upload banner");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // DELETE BANNER
  // ===============================

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this banner?",
      );

      if (!confirmDelete) return;

      const response = await deleteBannerApi(id);

      alert(response.message);

      // refresh
      fetchAllBanners();
    } catch (error) {
      console.log(error);

      alert(error?.message || "Failed to delete banner");
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Website Banners</h1>

        <p className="text-slate-500 text-sm mt-1">
          Upload and manage homepage promotional banners professionally.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 sticky top-6">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <Upload size={20} className="text-emerald-500" />
              Upload New Banner
            </h2>

            <div className="space-y-5">
              {/* Upload Box */}
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-emerald-50 transition-all cursor-pointer group"
              >
                <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <Plus className="text-emerald-600" />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Click to Upload Banner
                </p>

                <p className="text-xs text-slate-400 mt-1 text-center">
                  Recommended Size: 1920 × 600 px
                  <br />
                  PNG, JPG, JPEG (Max 5MB)
                </p>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* IMAGE PREVIEW */}
              {preview && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-52 object-cover"
                  />

                  <button
                    onClick={() => {
                      setPreview("");
                      setSelectedFile(null);

                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* TITLE INPUT */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Banner Title
                </label>

                <input
                  type="text"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  placeholder="e.g. Annual Sports Day"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* SAVE BUTTON */}
              <button
                onClick={handleSaveBanner}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Save Banner"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ImageIcon size={20} className="text-blue-500" />
                Active Banners
              </h2>

              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                {banners.length} Banner
              </span>
            </div>

            {/* LOADING */}
            {pageLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-emerald-600" size={40} />
              </div>
            ) : (
              <div className="grid gap-5">
                {/* BANNERS */}
                {banners.map((item) => (
                  <div
                    key={item._id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-4 p-4">
                      {/* IMAGE */}
                      <div className="w-full md:w-56 h-28 overflow-hidden rounded-xl bg-slate-200">
                        <img
                          src={item.photoUrl}
                          alt={item.bannerTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* INFO */}
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="font-bold text-slate-800 text-lg">
                          {item.bannerTitle}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                          Banner ID: #{item._id?.slice(-6)}
                        </p>

                        <div className="mt-2">
                          <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
                            Active
                          </span>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreviewModal(item.photoUrl)}
                          className="p-3 bg-white text-slate-600 rounded-xl border border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-3 bg-white text-red-500 rounded-xl border border-slate-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* EMPTY STATE */}
                {banners.length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
                    <p className="text-slate-400 text-sm">
                      No banners uploaded yet.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {previewModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <img
              src={previewModal}
              alt="Preview"
              className="w-full rounded-2xl shadow-2xl"
            />

            <button
              onClick={() => setPreviewModal(null)}
              className="absolute top-4 right-4 bg-white text-slate-800 p-2 rounded-full hover:bg-red-50 hover:text-red-500"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
