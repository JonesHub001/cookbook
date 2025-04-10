
interface PriceTagProps {
  originalPrice: number;
  discountedPrice: number;
}

const PriceTag = ({ originalPrice, discountedPrice }: PriceTagProps) => {
  return (
    <div className="flex flex-col items-center max-w-xs mx-auto">
      <div className="bg-cookbook-terracotta/10 rounded-lg p-6 w-full">
        <div className="mb-2">
          <span className="text-cookbook-brown/60 text-lg line-through">
            ${originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-cookbook-terracotta">
            ${discountedPrice.toFixed(2)}
          </span>
          <span className="text-cookbook-brown/80 pb-1">only</span>
        </div>
        <div className="mt-2 text-sm text-cookbook-brown/70">
          Limited time offer - Save {Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)}%
        </div>
      </div>
    </div>
  );
};

export default PriceTag;
