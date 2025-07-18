export default function CartPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Giỏ hàng</h1>
      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <p className="text-gray-600">Giỏ hàng trống</p>
        <p className="text-sm text-gray-500 mt-2">Thêm sản phẩm để bắt đầu mua sắm!</p>
      </div>
    </div>
  )
}