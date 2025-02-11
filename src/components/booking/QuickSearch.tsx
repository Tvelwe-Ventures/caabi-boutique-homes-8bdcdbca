
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface QuickSearchProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  guests: string;
  setGuests: (guests: string) => void;
  onSearch: () => void;
}

export const QuickSearch = ({ date, setDate, guests, setGuests, onSearch }: QuickSearchProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md py-3 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-auto justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Input
          type="number"
          placeholder="Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full sm:w-24"
          min="1"
          max="20"
        />
        
        <Button 
          className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
          onClick={onSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
