import React, { useState } from "react";
import { Upload, Trash2, Image as ImageIcon, Plus, Eye } from "lucide-react";

const Banner = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      url: "https://res.cloudinary.com/doomcnl20/image/upload/v1778002986/WhatsApp_Image_2026-04-14_at_9.23.49_AM_p8qftn.jpg",
      title: "Summer Sale",
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/doomcnl20/image/upload/v1778003078/WhatsApp_Image_2026-04-14_at_9.23.52_AM_hynenr.jpg",
      title: "Admission Open",
    },
  ]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Website Banners</h1>
        <p className="text-slate-500 text-sm">
          Upload and manage promotional banners for your website homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Upload size={20} className="text-emerald-500" />
              Upload New Banner
            </h2>

            <div className="space-y-4">
              {/* Dropzone Area */}
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-emerald-50 transition-colors cursor-pointer group">
                <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <Plus className="text-emerald-600" />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-600">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Recommended: 1920x600 px (PNG, JPG)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Banner Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Annual Sports Day"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-emerald-200">
                Save Banner
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Display List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ImageIcon size={20} className="text-blue-500" />
              Active Banners ({banners.length})
            </h2>

            <div className="grid gap-6">
              {banners.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row items-center gap-4 p-4">
                    {/* Banner Preview */}
                    <div className="w-full md:w-48 h-24 overflow-hidden rounded-lg bg-slate-200">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Banner Info */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="font-bold text-slate-800">{item.title}</h3>
                      <p className="text-xs text-slate-500">
                        ID: #B00{item.id} • Active
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="p-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 bg-white text-red-500 rounded-lg border border-slate-200 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {banners.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-xl">
                  <p className="text-slate-400">
                    No banners found. Start by uploading one.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
