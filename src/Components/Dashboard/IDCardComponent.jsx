import { useState } from "react";
import { Upload, Search, Download, X, Loader2, FileArchive, CheckCircle } from "lucide-react";

export default function IDCardComponent() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fromSerial, setFromSerial] = useState("");
  const [toSerial, setToSerial] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".zip")) {
      setUploadedFile(file);
      setUploadSuccess(false);
    } else {
      alert("Please upload a ZIP file only");
    }
  };

  const playSuccessSound = () => {
    // Create AudioContext
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Success sound sequence (happy ascending notes) - LOUDER VERSION
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const duration = 0.2;
    
    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      const startTime = audioContext.currentTime + (index * duration);
      gainNode.gain.setValueAtTime(0.8, startTime); // Increased from 0.3 to 0.8 (much louder!)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });
  };

  const handleSubmitFile = () => {
    if (!uploadedFile) {
      alert("Please select a file first");
      return;
    }

    setIsUploading(true);

    // Simulate file upload for 2 seconds
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      playSuccessSound(); // Play success sound
      alert(`File "${uploadedFile.name}" uploaded successfully!`);
    }, 2000);
  };

  const handleSearch = () => {
    if (!fromSerial || !toSerial) {
      alert("Please enter both serial numbers");
      return;
    }

    setIsLoading(true);
    
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 2000);
  };

  const handleDownload = () => {
    // Simulate download
    alert(`Downloading ID Cards from Serial ${fromSerial} to ${toSerial}`);
    setShowModal(false);
    setFromSerial("");
    setToSerial("");
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-10 blur-xl"></div>
          <div className="relative bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <FileArchive className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  ID Card Management
                </h1>
                <p className="text-gray-600">Upload and manage student ID cards with ease</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section with enhanced styling */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"></div>
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:border-emerald-300 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-md">
                  <Upload className="text-white" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Upload ID Cards</h2>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-300 bg-gradient-to-br from-gray-50 to-emerald-50/30">
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="zip-upload"
                />
                <label
                  htmlFor="zip-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl mb-4 shadow-sm">
                    <Upload className="text-emerald-600" size={36} />
                  </div>
                  <p className="text-gray-800 font-semibold mb-2 text-lg">
                    Click to upload ZIP file
                  </p>
                  <p className="text-gray-500 text-sm text-center">
                    or drag and drop your file here
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Supports .zip files up to 50MB</p>
                </label>
              </div>

              {uploadedFile && (
                <div className="mt-5 space-y-4">
                  <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-md">
                        <CheckCircle className="text-white" size={22} />
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold">{uploadedFile.name}</p>
                        <p className="text-gray-600 text-sm">
                          {(uploadedFile.size / 1024).toFixed(2)} KB • {uploadSuccess ? "Uploaded successfully" : "Ready to upload"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setUploadedFile(null);
                        setUploadSuccess(false);
                      }}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <X className="text-red-500" size={20} />
                    </button>
                  </div>

                  {!uploadSuccess && (
                    <button
                      onClick={handleSubmitFile}
                      disabled={isUploading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={20} />
                          Submit & Upload File
                        </>
                      )}
                    </button>
                  )}

                  {uploadSuccess && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={24} />
                      <div>
                        <p className="text-green-800 font-semibold">Upload Successful!</p>
                        <p className="text-green-600 text-sm">Your file has been uploaded and processed.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Search Section with enhanced styling */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"></div>
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
                  <Search className="text-white" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Search ID Cards</h2>
              </div>

              <div className="space-y-5 mb-6">
                {/* From Serial Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    From Serial Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fromSerial}
                      onChange={(e) => setFromSerial(e.target.value)}
                      placeholder="e.g., 1001"
                      className="w-full px-4 py-3 bg-gradient-to-br from-white to-blue-50/30 border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* To Serial Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    To Serial Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={toSerial}
                      onChange={(e) => setToSerial(e.target.value)}
                      placeholder="e.g., 1050"
                      className="w-full px-4 py-3 bg-gradient-to-br from-white to-blue-50/30 border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Search ID Cards
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions / Help Section and Downloads */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Quick Guide */}
          <div className="lg:col-span-2 group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-2xl opacity-10 blur-lg"></div>
            <div className="relative bg-white border-2 border-indigo-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Quick Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">1</div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Upload ZIP File</p>
                    <p className="text-sm text-gray-600">Select your ID cards ZIP file and click submit to upload</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">2</div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Enter Serial Range</p>
                    <p className="text-sm text-gray-600">Specify the serial number range you want to search</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">3</div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Download Cards</p>
                    <p className="text-sm text-gray-600">Search and download the ID cards you need instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Downloads Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl opacity-10 blur-lg"></div>
            <div className="relative bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                  <Download className="text-white" size={24} />
                </div>
                <h3 className="text-gray-800 font-bold">Total Downloads</h3>
              </div>
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">89</p>
              <p className="text-gray-600 text-sm mt-2">ID cards downloaded</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">Last download:</p>
                <p className="text-sm font-semibold text-gray-700">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-4 border-2 border-blue-200">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-50"></div>
              <Loader2 className="relative animate-spin text-blue-600" size={56} />
            </div>
            <p className="text-gray-800 font-bold text-xl">Loading ID Cards...</p>
            <p className="text-gray-600 text-sm">Please wait while we fetch your data</p>
          </div>
        </div>
      )}

      {/* Enhanced Result Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full relative border-2 border-emerald-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="text-gray-600" size={22} />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex p-5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl mb-4 shadow-lg">
                <Download className="text-white" size={52} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                ID Cards Found!
              </h3>
              <p className="text-gray-600 text-lg">
                Found ID cards from serial <span className="text-blue-600 font-bold">{fromSerial}</span> to <span className="text-blue-600 font-bold">{toSerial}</span>
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
              <div className="flex justify-between mb-3">
                <span className="text-gray-700 font-semibold">Total Cards:</span>
                <span className="text-gray-900 font-bold text-lg">
                  {parseInt(toSerial) - parseInt(fromSerial) + 1}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-semibold">Format:</span>
                <span className="text-gray-900 font-bold text-lg">PDF</span>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <Download size={22} />
              Download ID Cards
            </button>
          </div>
        </div>
      )}
    </div>
  );
}