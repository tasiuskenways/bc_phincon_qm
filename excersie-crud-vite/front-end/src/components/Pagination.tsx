
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "./ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({ 
  currentPage,
  totalPages,
  onPageChange
}: PaginationControlsProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Logic to limit displayed page numbers
  let displayedPages = pages;
  if (totalPages > 5) {
    if (currentPage <= 3) {
      displayedPages = [...pages.slice(0, 5), totalPages];
    } else if (currentPage >= totalPages - 2) {
      displayedPages = [1, ...pages.slice(totalPages - 5)];
    } else {
      displayedPages = [1, ...pages.slice(currentPage - 2, currentPage + 1), totalPages];
    }
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {displayedPages.map((page, index) => {
          // Add ellipsis
          if (index > 0 && page > displayedPages[index - 1] + 1) {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <span className="px-2">...</span>
              </PaginationItem>
            );
          }
          
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
