import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Search,
  RefreshCw,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  Settings,
  Sparkles,
  Edit,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllFeeStructures } from "../../../../api/feeStructure.js";


/* ================= CARD ================= */
const FeeStructureCard = ({ classInfo, onEdit }) => {
  const calculateTotal = (items) =>
    items.reduce((sum, item) => {
      if (item.frequency === "Monthly") return sum + item.amount * 12;
      return sum + item.amount;
    }, 0);

  const monthlyItems = classInfo.items.filter(
    (it) => it.frequency === "Monthly"
  );
  const oneTimeItems = classInfo.items.filter(
    (it) => it.frequency === "One-time"
  );

  const monthlyTotal = monthlyItems.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalAnnual = calculateTotal(classInfo.items);

  const getGradientClass = (className) => {
    const gradients = [
      "from-violet-500 via-purple-500 to-purple-600",
      "from-blue-500 via-cyan-500 to-cyan-600",
      "from-emerald-500 via-teal-500 to-teal-600",
      "from-orange-500 via-amber-500 to-red-600",
      "from-pink-500 via-rose-500 to-rose-600",
      "from-indigo-500 via-blue-500 to-blue-600",
    ];
    const index = parseInt(className) || className.length;
    return gradients[index % gradients.length];
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-indigo-300">
      <div
        className={`bg-gradient-to-r ${getGradientClass(
          classInfo.class
        )} p-5 relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
        </div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/25 backdrop-blur-sm p-2 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Class {classInfo.class}
              </h3>
              <p className="text-white/80 text-xs mt-0.5">{classInfo.items.length} Components</p>
            </div>
          </div>
          <button
            onClick={() => onEdit(classInfo.class)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-lg transition-all hover:scale-110 border border-white/30"
            title="Edit Fee Structure"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {monthlyItems.length > 0 && (
          <div className="mb-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-900 text-sm">Monthly</span>
            </div>
            <span className="font-bold text-blue-600 text-lg">₹{monthlyTotal}</span>
          </div>
        )}

        <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {monthlyItems.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors text-sm">
              <span className="flex items-center gap-2 text-gray-700">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                {item.item}
              </span>
              <span className="font-bold text-gray-900">₹{item.amount}</span>
            </div>
          ))}

          {oneTimeItems.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-green-50 transition-colors text-sm">
              <span className="flex items-center gap-2 text-gray-700">
                <DollarSign className="w-3.5 h-3.5 text-green-500" />
                {item.item}
              </span>
              <span className="font-bold text-gray-900">₹{item.amount}</span>
            </div>
          ))}
        </div>

        {classInfo.items.length === 0 && (
          <div className="text-center py-8">
            <DollarSign className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No fee structure</p>
          </div>
        )}

        {classInfo.items.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative">
                <p className="text-xs text-white/80 mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Annual Total
                </p>
                <p className="text-2xl font-bold">₹{totalAnnual}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= MAIN ================= */
export default function SchoolFeeStructure() {
  const [searchTerm, setSearchTerm] = useState("");
  const [feeCards, setFeeCards] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const loadFeeStructure = async () => {
    try {
      const res = await getAllFeeStructures();

      const transformed = res.data.data.map((fs) => {
        const items = [
          { item: "Admission Fee", amount: fs.admissionFee, frequency: "One-time" },
          { item: "Tuition Fee", amount: fs.tuitionFee, frequency: "Monthly" },
          { item: "Annual Fee", amount: fs.annualFee, frequency: "One-time" },
          { item: "Exam Fee", amount: fs.examFee, frequency: "One-time" },
        ];

        if (fs.transportFee > 0) {
          items.push({
            item: "Transport Fee",
            amount: fs.transportFee,
            frequency: "Monthly",
          });
        }

        fs.extraFees.forEach((f) => {
          items.push({
            item: f.title,
            amount: f.amount,
            frequency: "One-time",
          });
        });

        return {
          class: fs.className,
          items,
        };
      });

      setFeeCards(transformed);
    } catch (error) {
      console.error("Failed to load fee structure", error);
    }
  };

  useEffect(() => {
    loadFeeStructure();
  }, []);

  // Auto-reload when coming back from edit/create
  useEffect(() => {
    const refresh = searchParams.get('refresh');
    if (refresh === 'true') {
      loadFeeStructure();
      // Clean up the URL
      navigate('/fee-structure', { replace: true });
    }
  }, [searchParams]);

 const handleEdit = (className) => {
  navigate(`/sms/fee-settings?edit=${className}`);
};

  const filteredFees = feeCards.filter((fee) =>
    fee.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                School Fee Structure
              </h1>
              <p className="text-gray-600 text-lg">View and manage fee structures for all classes</p>
            </div>
           <button
  onClick={() => navigate("/sms/fee-settings")}
  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
>
  <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
  Fee Settings
</button>

          </div>

          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder="Search class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-2 border-gray-200 focus:border-indigo-400 pl-12 pr-4 py-4 rounded-2xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-sm"
              />
            </div>
            <button
              onClick={loadFeeStructure}
              className="bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 px-6 rounded-2xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3 group"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFees.map((fee, i) => (
            <FeeStructureCard key={i} classInfo={fee} onEdit={handleEdit} />
          ))}
        </div>

        {filteredFees.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}