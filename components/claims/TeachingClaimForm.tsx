import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Book, Clock, Car } from "lucide-react";
import TransportationForm from "./TransportationForm";
import { useState } from "react";

export default function TeachingClaimForm() {
  const [isTransportation, setIsTransportation] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pt-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-gray-700">
            <Calendar className="h-4 w-4" />
            Date
          </Label>
          <Input 
            name="date" 
            required 
            type="date"
            className="focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Other teaching claim fields... */}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isTransportation"
            name="isTransportation"
            checked={isTransportation}
            onChange={(e) => setIsTransportation(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <Label htmlFor="isTransportation" className="flex items-center gap-2 text-gray-700">
            <Car className="h-4 w-4" />
            Include Transportation Claim
          </Label>
        </div>
      </div>

      {isTransportation && <TransportationForm />}
    </motion.div>
  );
}