
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface QuickSearchProps {
  onSearch: () => void;
}

export const QuickSearch = ({ onSearch }: QuickSearchProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md py-3 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
          onClick={onSearch}
        >
          <Search className="w-4 h-4 mr-2" />
          Book Your Stay
        </Button>
      </div>
    </div>
  );
};
