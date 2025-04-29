import { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import DataForm from "../components/DataForm";
import FloatingActionButton from "../components/FloatingActionButton";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Product, ProductState } from "@/types/ProductType";
import {
  createProductAsync,
  deleteProductAsync,
  fetchProductsAsync,
  updateProductAsync,
} from "@/features/products/products.slice";

const Index = () => {
  const dispatch = useAppDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | undefined>(
    undefined
  );
  const { productList, state, errorMsg } = useAppSelector(
    (state: { products: ProductState }) => state.products
  );

  useEffect(() => {
    dispatch(
      fetchProductsAsync({
        page: 1,
        limit: 10,
        sortBy: "",
        sortOrder: "asc",
      })
    );
  }, [dispatch]);

  const handleAddItem = (newItem: Omit<Product, "id">) => {
    dispatch(createProductAsync(newItem));
  };

  const handleEditItem = (item: Product) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleUpdateItem = (updatedItem: Omit<Product, "id">) => {
    if (!editingItem) return;
    dispatch(updateProductAsync({ product: updatedItem, id: editingItem.id }));
  };

  const handleDeleteItem = (id: number | undefined) => {
    if (id === undefined) return;
    dispatch(deleteProductAsync(id));
  };

  const handleFormSubmit = (formData: Omit<Product, "id">) => {
    if (editingItem) {
      handleUpdateItem(formData);
    } else {
      handleAddItem(formData);
    }
  };

  const handleOpenForm = () => {
    setEditingItem(undefined);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(undefined);
  };

  const handleReloadData = () => {
    dispatch(
      fetchProductsAsync({
        page: 1,
        limit: 10,
        sortBy: "",
        sortOrder: "asc",
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Product Inventory
          </h1>
          {errorMsg && (
            <button
              onClick={handleReloadData}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Reload Data
            </button>
          )}
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl">
          <DataTable onEdit={handleEditItem} onDelete={handleDeleteItem} />
        </div>
      </main>

      <FloatingActionButton onClick={handleOpenForm} />

      {isFormOpen && (
        <DataForm
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          initialData={editingItem}
        />
      )}
    </div>
  );
};

export default Index;
