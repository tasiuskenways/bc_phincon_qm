import React, { useState } from "react";
import { Product, ProductState } from "../types/ProductType";
import {
  Edit,
  Trash,
  Search,
  ArrowUpAZ,
  ArrowDownAZ,
  CircleAlert,
  Loader,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Alert, AlertDescription } from "./ui/alert";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  fetchProductByIdAsync,
  fetchProductsAsync,
} from "./../features/products/products.slice";

interface DataTableProps {
  onEdit: (item: Product) => void;
  onDelete: (id: number | undefined) => void;
}

const DataTable: React.FC<DataTableProps> = ({ onEdit, onDelete }) => {
  const { toast } = useToast();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "ascending" | "descending" | null;
  }>({
    key: "name",
    direction: null,
  });
  const [itemToDelete, setItemToDelete] = useState<Product | null>(null);

  const dispatch = useAppDispatch();

  const { totalPages, currentPage, productList, state, errorMsg } =
    useAppSelector((state: { products: ProductState }) => state.products);

  const isLoading = state === "loading";
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleSort = (key: keyof Product) => {
    let direction: "ascending" | "descending" | null = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const handleConfirmDelete = () => {
    if (itemToDelete && itemToDelete.id !== undefined) {
      onDelete(itemToDelete.id);
      toast({
        title: "Item Deleted",
        description: `${itemToDelete.name} has been removed from the table.`,
      });
      setItemToDelete(null);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const getSortIcon = (key: keyof Product) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ArrowUpAZ className="inline-block ml-1 h-4 w-4" />
    ) : sortConfig.direction === "descending" ? (
      <ArrowDownAZ className="inline-block ml-1 h-4 w-4" />
    ) : null;
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-10 border rounded-lg bg-white shadow-sm">
        <Loader className="animate-spin h-10 w-10 text-gray-400 mb-4" />
        <p className="text-gray-500">Loading data...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 border rounded-lg bg-white shadow-sm">
        <Alert
          variant="destructive"
          className="mb-4 flex items-center w-full max-w-md gap-3"
        >
          <div className="flex items-center h-full">
            <CircleAlert className="h-5 w-5 text-red-500" />
          </div>
          <AlertDescription className="flex-1 text-sm flex items-center">
            {errorMsg}
          </AlertDescription>
          <div className="flex items-center h-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                dispatch(
                  fetchProductsAsync({
                    page: 1,
                    limit: 10,
                    sortBy: "",
                    sortOrder: "asc",
                  })
                );
              }}
            >
              Refresh
            </Button>
          </div>
        </Alert>
        <span className="text-gray-500 text-xs">
          Something went wrong while loading products. Please try again.
        </span>
      </div>
    );
  }

  if (productList.length === 0) {
    return (
      <div className="w-full p-8 text-center border rounded-lg bg-white shadow-sm">
        <p className="text-gray-500">
          No items found. Add some products to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (searchTerm === "") {
                  dispatch(
                    fetchProductsAsync({
                      page: 1,
                      limit: 10,
                      sortBy: "",
                      sortOrder: "asc",
                    })
                  );
                } else {
                  dispatch(fetchProductByIdAsync(searchTerm));
                }
              }
            }}
            value={searchTerm}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-gray-500">
          Showing {productList.length === 0 ? 0 : indexOfFirstItem + 1} -{" "}
          {Math.min(indexOfLastItem, productList.length)} of{" "}
          {productList.length} items
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm animate-fade-in">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Name {getSortIcon("name")}
              </th>
              <th
                onClick={() => handleSort("category")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Category {getSortIcon("category")}
              </th>
              <th
                onClick={() => handleSort("price")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Price {getSortIcon("price")}
              </th>
              <th
                onClick={() => handleSort("stock")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Stock {getSortIcon("stock")}
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productList.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors"
                onMouseEnter={() => setHoveredRow(item.id || null)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatPrice(item.price)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      item.stock > 30
                        ? "bg-green-100 text-green-800"
                        : item.stock > 10
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      onClick={() => onEdit(item)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-blue-600 transition-colors p-1 h-auto"
                    >
                      <Edit size={18} />
                    </Button>
                    <Button
                      onClick={() => setItemToDelete(item)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-red-600 transition-colors p-1 h-auto"
                    >
                      <Trash size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                dispatch(
                  fetchProductsAsync({
                    page: currentPage - 1,
                    limit: 10,
                    sortBy: "",
                    sortOrder: "asc",
                  })
                )
              }
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Prev</span>
            </Button>
            <div className="flex items-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                )
                .map((page, i, array) => (
                  <div key={page}>
                    {i > 0 && array[i - 1] !== page - 1 && (
                      <span className="px-2">...</span>
                    )}
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        dispatch(
                          fetchProductsAsync({
                            page: page,
                            limit: 10,
                            sortBy: "",
                            sortOrder: "asc",
                          })
                        )
                      }
                      className="mx-1 min-w-[36px]"
                    >
                      {page}
                    </Button>
                  </div>
                ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                dispatch(
                  fetchProductsAsync({
                    page: currentPage + 1,
                    limit: 10,
                    sortBy: "",
                    sortOrder: "asc",
                  })
                );
              }}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      )}

      <AlertDialog
        open={!!itemToDelete}
        onOpenChange={() => setItemToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {itemToDelete?.name}. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DataTable;
