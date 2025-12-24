import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Search,
  RefreshCw,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllFeeStructures } from "../../api/feeStructure.js";

/* ================= CARD ================= */
const FeeStructureCard = ({ classInfo }) => {
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
      "from-violet-500 to-purple-600",
      "from-blue-500 to-cyan-600",
      "from-emerald-500 to-teal-600",
      "from-orange-500 to-red-600",
      "from-pink-500 to-rose-600",
      "from-indigo-500 to-blue-600",
    ];
    const index = parseInt(className) || className.length;
    return gradients[index % gradients.length];
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border hover:scale-105">
      <div
        className={`bg-gradient-to-r ${getGradientClass(
          classInfo.class
        )} p-6`}
      >
        <h3 className="text-2xl font-bold text-white">
          Class {classInfo.class}
        </h3>
        <p className="text-white text-sm mt-1">
          {classInfo.items.length} Fee Components
        </p>
      </div>

      <div className="p-6">
        {monthlyItems.length > 0 && (
          <div className="mb-4 bg-blue-50 rounded-xl p-4 border">
            <div className="flex justify-between">
              <span className="font-semibold text-blue-900">
                Monthly Payment
              </span>
              <span className="font-bold text-blue-600">
                ₹{monthlyTotal}
              </span>
            </div>
          </div>
        )}

        {/* Monthly */}
        {monthlyItems.map((item, i) => (
          <div key={i} className="flex justify-between py-2">
            <span className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-blue-500" />
              {item.item}
            </span>
            <span className="font-bold">₹{item.amount}</span>
          </div>
        ))}

        {/* One-time */}
        {oneTimeItems.map((item, i) => (
          <div key={i} className="flex justify-between py-2">
            <span className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-green-500" />
              {item.item}
            </span>
            <span className="font-bold">₹{item.amount}</span>
          </div>
        ))}

        {classInfo.items.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            No fee structure
          </div>
        )}

        {classInfo.items.length > 0 && (
          <div className="mt-5 pt-5 border-t">
            <div className="bg-indigo-600 text-white rounded-xl p-4 flex justify-between">
              <div>
                <p className="text-sm">Estimated Annual Fee</p>
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

  const filteredFees = feeCards.filter((fee) =>
    fee.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/?tab=fee-settings")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl mb-6"
        >
          ⚙️ Fee Settings
        </button>

        <div className="mb-6 flex gap-3">
          <input
            placeholder="Search class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-3 rounded-xl flex-1"
          />
          <button
            onClick={loadFeeStructure}
            className="bg-indigo-600 text-white px-4 rounded-xl flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFees.map((fee, i) => (
            <FeeStructureCard key={i} classInfo={fee} />
          ))}
        </div>

        {filteredFees.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No classes found
          </div>
        )}
      </div>
    </div>
  );
}
