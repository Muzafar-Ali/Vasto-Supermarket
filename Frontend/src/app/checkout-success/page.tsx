'use client'
import Wrapper from "@/components/Wrapper";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

const Success = () => {
  const { clearCart } = useCartStore();

  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("session_id");
  const invoice = searchParams.get('invoice_id')


  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!orderNumber) return;
    
    navigator.clipboard.writeText(orderNumber)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  useEffect(() => {
    clearCart();
  }, [clearCart])

  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper className="px-[20px]">
        <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col bg-primary-base/10">
          <div className="text-2xl font-bold text-center">
            Order Confirmed! 🎉
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-md border border-gray-200">
            <div className="font-medium text-gray-600 mb-1 text-center">
              Your order number:
            </div>
            <div 
              className="flex items-center justify-center gap-2 cursor-pointer group"
              onClick={copyToClipboard}
            >
              <span className="font-bold text-xs lg:text-sm text-primary-base break-all">
                {orderNumber || "N/A"}
              </span>
              <button 
                className="p-1 rounded-md group-hover:bg-gray-100 transition-colors"
                aria-label="Copy order number"
              >
                {copied ? (
                  <FiCheck className="text-green-500" />
                ) : (
                  <FiCopy className="text-gray-500 group-hover:text-primary-base" />
                )}
              </button>
            </div>
            {copied && (
              <div className="text-center text-sm text-green-500 mt-1">
                Copied to clipboard!
              </div>
            )}
          </div>

          <div className="text-lg font-bold mt-6 text-center">
            Thank you for your purchase!
            {<p>Invoice: {invoice}</p>}
          </div>
          
          <div className="text-base mt-4 text-center">
            We've received your order and it's being processed.
          </div>
          
          <div className="text-sm mt-6 text-center text-gray-600 flex max-tablet-s:flex-col items-center justify-center gap-x-2">
            <p>Need help? Contact us at:{" "}</p>
            <Link 
              href="mailto:info@vasto-supermarket.com" 
              className="underline text-primary-base font-semibold"
            >
              info@vasto-supermarket.com
            </Link>
          </div>

          <Link 
            href="/" 
            className="laptop-s:w-[35%] h-[45px] mt-8 mb-3 px-4 py-2 bg-primary-base justify-center items-center gap-2 inline-flex hover:bg-red-950 transition-all duration-200 ease-in-out rounded-md self-center"
          >
            <p className="text-white text-base font-semibold capitalize leading-7 bg-transparent">
              Continue Shopping
            </p>
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Success;