import CheckoutSuccessContent from "@/components/CheckoutSuccessContent";
import { Suspense } from "react";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[650px] flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}