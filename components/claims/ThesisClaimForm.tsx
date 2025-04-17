import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Award, Book, Calendar, Users } from "lucide-react";
import StudentFields from "./StudentFields";
import { useState } from "react";

export default function ThesisClaimForm() {
  const [thesisType, setThesisType] = useState<"supervision" | "examination">("supervision");
  const [studentCount, setStudentCount] = useState(1);

  const handleThesisTypeChange = (value: "supervision" | "examination") => {
    setThesisType(value);
    if (value === "examination") setStudentCount(1);
  };

  const addStudentField = () => {
    if (thesisType === "supervision" && studentCount < 10) {
      setStudentCount(studentCount + 1);
    }
  };

  const removeStudentField = () => {
    if (studentCount > 1) setStudentCount(studentCount - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pt-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Thesis type, degree, course code, date fields... */}
      </div>

      <Separator className="my-4 bg-blue-100" />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Students {thesisType === "supervision" ? "(Max 10)" : ""}
          </h3>
          {thesisType === "supervision" && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={removeStudentField}
                disabled={studentCount <= 1}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Remove
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addStudentField}
                disabled={studentCount >= 10}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Add Student
              </Button>
            </div>
          )}
        </div>

        <StudentFields count={thesisType === "supervision" ? studentCount : 1} />
      </div>
    </motion.div>
  );
}