import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hash, User, File } from "lucide-react";

export default function StudentFields({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-blue-100 rounded-lg">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
              <Hash className="h-4 w-4" />
              Student Number
            </Label>
            <Input 
              name={`studentNumber-${index}`}
              required 
              type="text"
              placeholder={`STD-${index + 1}`}
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Other student fields... */}
        </div>
      ))}
    </>
  );
}