import { useState } from "react";
import {
  X, Upload, Save, Briefcase,
  Award, Calendar, Bell, Shield, Eye, EyeOff, User, Lock, CheckCircle, Sparkles
} from "lucide-react";

export default function SchoolAdminProfile() {
  const [profile, setProfile] = useState({
    employeeId: "EMP2024-0156",
    firstName: "Sarah",
    lastName: "Johnson",
    name: "Sarah Johnson",
    designation: "Principal",
    department: "Administration",
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    mobile: "+1 (555) 123-4567",
    dateOfJoining: "2018-08-15",
    qualification: "M.Ed in Educational Leadership",
    experience: "15 years",
    bio: "Dedicated educational administrator with over 15 years of experience in school management. Passionate about creating inclusive learning environments and implementing innovative teaching methodologies.",
    bloodGroup: "O+",
    role: "SUPER_ADMIN",
    isActive: true,
    lastLogin: "2024-12-30T10:30:00",
    photo: null,
  });

  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsAlerts: false,
    systemUpdates: true,
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const togglePasswordVisibility = (field) =>
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });

  const handleNotificationChange = (key) =>
    setNotifications({ ...notifications, [key]: !notifications[key] });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, photo: URL.createObjectURL(file) });
    }
  };

  const handlePhotoRemove = () => {
    setProfile({ ...profile, photo: null });
  };

  const handlePasswordUpdate = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert("Please fill in all password fields");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match");
      return;
    }
    if (passwords.new.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleSaveProfile = () => {
    setIsSaved(true);
    alert("Profile saved successfully!");
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* ENHANCED HEADER */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-5 blur-2xl"></div>
          <div className="relative bg-white rounded-2xl shadow-lg border-2 border-blue-100 p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Admin Profile
                  </h1>
                </div>
                <p className="text-slate-600 ml-16">Manage your personal and professional information</p>
              </div>
              <div className="hidden md:block">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUCCESS MESSAGE */}
        {isSaved && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-800 px-6 py-4 rounded-xl flex items-center gap-3 animate-fade-in shadow-lg">
            <div className="p-2 bg-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-700" />
            </div>
            <span className="font-semibold">Profile changes saved successfully!</span>
          </div>
        )}

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDEBAR */}
          <div className="space-y-6">
            
            {/* ENHANCED PHOTO CARD */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
              <div className="relative bg-white rounded-2xl shadow-xl border-2 border-blue-100 p-6 hover:border-blue-300 transition-all">
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 border-4 border-white shadow-xl ring-4 ring-blue-100">
                    {profile.photo ? (
                      <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-7xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {profile.firstName[0]}{profile.lastName[0]}
                        </div>
                      </div>
                    )}
                  </div>
                  {profile.photo && (
                    <button
                      onClick={handlePhotoRemove}
                      className="absolute top-3 right-3 bg-white rounded-full p-2.5 shadow-xl hover:bg-red-50 transition border-2 border-red-200"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <h3 className="font-bold text-xl text-slate-800">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-sm text-indigo-600 font-semibold mt-1">{profile.designation}</p>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs text-slate-600 font-medium">ID: {profile.employeeId}</p>
                  </div>
                </div>

                <label className="mt-6 block">
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  <div className="w-full py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 cursor-pointer transition shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload New Photo
                  </div>
                </label>
              </div>
            </div>

            {/* ENHANCED QUICK INFO CARD */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
              <div className="relative bg-white rounded-2xl shadow-xl border-2 border-emerald-100 p-6 hover:border-emerald-300 transition-all">
                <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-3 text-lg">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-md">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  Quick Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="p-2 bg-blue-200 rounded-lg">
                      <Calendar className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Joined Date</p>
                      <p className="font-bold text-slate-800 text-sm">
                        {new Date(profile.dateOfJoining).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="p-2 bg-purple-200 rounded-lg">
                      <Award className="w-4 h-4 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Experience</p>
                      <p className="font-bold text-slate-800 text-sm">{profile.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <div className="p-2 bg-emerald-200 rounded-lg">
                      <Shield className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Department</p>
                      <p className="font-bold text-slate-800 text-sm">{profile.department}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ENHANCED SECURITY CARD */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
              <div className="relative bg-white rounded-2xl shadow-xl border-2 border-red-100 p-6 hover:border-red-300 transition-all">
                <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-3 text-lg">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-md">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  Security Settings
                </h3>

                <div className="space-y-4">
                  {[
                    { field: "current", label: "Current Password" },
                    { field: "new", label: "New Password" },
                    { field: "confirm", label: "Confirm Password" }
                  ].map(({ field, label }) => (
                    <div key={field}>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
                      <div className="relative">
                        <input
                          type={showPassword[field] ? "text" : "password"}
                          name={field}
                          value={passwords[field]}
                          onChange={handlePasswordChange}
                          placeholder={`Enter ${label.toLowerCase()}`}
                          className="w-full px-4 py-3 pr-11 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(field)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition"
                        >
                          {showPassword[field] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handlePasswordUpdate}
                    className="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold rounded-xl hover:from-slate-900 hover:to-black transition shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* ENHANCED TABS */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-3">
              <div className="flex gap-3">
                {[
                  { id: "profile", label: "Personal Info", icon: User },
                  { id: "settings", label: "Preferences", icon: Bell }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 py-3.5 px-5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      activeTab === id
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                        : "text-slate-600 hover:bg-slate-50 border-2 border-transparent hover:border-slate-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* PERSONAL INFO TAB */}
            {activeTab === "profile" && (
              <>
                <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-100">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Basic Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Role</label>
                      <select
                        name="role"
                        value={profile.role}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white font-medium transition-all"
                      >
                        <option value="SUPER_ADMIN">Super Admin</option>
                        <option value="ADMIN">Admin</option>
                        <option value="ACCOUNTANT">Accountant</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Employee ID</label>
                      <input
                        type="text"
                        value={profile.employeeId}
                        disabled
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Designation</label>
                      <select
                        name="designation"
                        value={profile.designation}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white font-medium transition-all"
                      >
                        <option>Principal</option>
                        <option>Vice Principal</option>
                        <option>Academic Coordinator</option>
                        <option>Admin Manager</option>
                        <option>HOD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={profile.mobile}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Account Status</label>
                      <div className="flex items-center gap-3 px-4 py-3 border-2 border-slate-300 rounded-xl bg-white">
                        <button
                          onClick={() => setProfile({ ...profile, isActive: !profile.isActive })}
                          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors shadow-inner ${
                            profile.isActive ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-lg ${
                              profile.isActive ? 'translate-x-8' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className={`font-semibold ${profile.isActive ? 'text-green-600' : 'text-slate-500'}`}>
                          {profile.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Last Login</label>
                      <input
                        type="text"
                        value={new Date(profile.lastLogin).toLocaleString('en-US', { 
                          dateStyle: 'medium', 
                          timeStyle: 'short' 
                        })}
                        disabled
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Department</label>
                      <select
                        name="department"
                        value={profile.department}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white font-medium transition-all"
                      >
                        <option>Administration</option>
                        <option>Academic Affairs</option>
                        <option>Student Services</option>
                        <option>Operations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Date of Joining</label>
                      <input
                        type="date"
                        name="dateOfJoining"
                        value={profile.dateOfJoining}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Total Experience</label>
                      <input
                        type="text"
                        name="experience"
                        value={profile.experience}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-100">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Professional Bio</h2>
                  </div>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    rows={6}
                    placeholder="Write a brief professional bio..."
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
                  />
                </div>
              </>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-100">
                  <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Notification Preferences</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "emailNotifications", title: "Email Notifications", desc: "Receive updates via email" },
                    { key: "smsAlerts", title: "SMS Alerts", desc: "Receive urgent alerts via SMS" },
                    { key: "systemUpdates", title: "System Updates", desc: "Get notified about system changes" }
                  ].map(({ key, title, desc }) => (
                    <div key={key} className="flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl hover:from-slate-100 hover:to-blue-100 transition border-2 border-slate-200">
                      <div>
                        <h3 className="font-bold text-slate-800">{title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{desc}</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors shadow-inner ${
                          notifications[key] ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-lg ${
                            notifications[key] ? 'translate-x-8' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ENHANCED SAVE BUTTON */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveProfile}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all flex items-center gap-3 shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform"
              >
                <Save className="w-6 h-6" />
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}