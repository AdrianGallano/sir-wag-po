import { Input } from "./ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="relative flex-1 md:grow-0">
      <Search className="absolute inset-y-0 right-5 top-[11px]  h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        className="w-full rounded-full bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
};

export default SearchInput;
