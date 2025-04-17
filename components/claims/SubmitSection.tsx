import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubmitSection({ isPending }: { isPending: boolean }) {
  return (
    <motion.div 
      className="flex flex-col md:flex-row gap-4 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Button
        asChild
        variant="outline"
        className="w-full md:w-1/2 border-blue-300 text-blue-600 hover:bg-blue-50"
      >
        <Link href="/dashboard">
          Cancel
        </Link>
      </Button>
      <Button 
        type="submit" 
        className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 shadow-md"
        disabled={isPending}
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Submit Claim"
        )}
      </Button>
    </motion.div>
  );
}