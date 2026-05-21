import React, { useState } from "react";
import {
  ImagePlus,
  Trash2,
  Filter,
  Tag,
  Type,
  MoreVertical,
} from "lucide-react";

const Gallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d",
      title: "Sports Day 2024",
      category: "Sports",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
      title: "Science Lab",
      category: "Academic",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      title: "Graduation Ceremony",
      category: "Events",
    },
  ]);

  const categories = ["All", "Sports", "Academic", "Events", "Campus"];
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">School Gallery</h1>
          <p className="text-slate-500 text-sm">
            Manage and organize campus life photos.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-200">
          <ImagePlus size={20} />
          Add New Photo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR: Upload & Filters */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upload Form */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Tag size={18} className="text-emerald-500" /> Quick Upload
            </h2>
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Image Title"
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                />
                <Type
                  size={16}
                  className="absolute left-3 top-2.5 text-slate-400"
                />
              </div>

              <div className="relative">
                <select className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm appearance-none">
                  <option>Select Category</option>
                  <option>Sports</option>
                  <option>Academic</option>
                  <option>Events</option>
                </select>
                <Filter
                  size={16}
                  className="absolute left-3 top-2.5 text-slate-400"
                />
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <p className="text-xs text-slate-500 font-medium">
                  Click to select image
                </p>
              </div>

              <button className="w-full bg-slate-800 text-white py-2 rounded-lg font-semibold hover:bg-slate-900 transition-colors">
                Upload to Gallery
              </button>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="font-bold text-slate-800 mb-3 text-sm">
              Filter by Category
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedFilter === cat ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN: Photo Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Wrapper */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                      {img.category}
                    </span>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-4 flex items-center justify-between">
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-slate-800 text-sm truncate">
                      {img.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider">
                      Uploaded on 24 May
                    </p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="bg-white rounded-2xl p-20 text-center border border-slate-200">
              <p className="text-slate-400">No photos in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
