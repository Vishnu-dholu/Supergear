import { twMerge } from "tailwind-merge";
import FormattedPrice from "./FormattedPrice";

interface Props {
  regularPrice?: number;
  discountedPrice?: number;
  className?: string;
}

const PriceTag = ({ regularPrice, discountedPrice, className }: Props) => {
  // Check if regularPrice or discountedPrice are undefined and handle accordingly
  const isPriceDefined = (price: number | undefined): boolean => {
    return price !== undefined && !isNaN(price);
  };

  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      {isPriceDefined(regularPrice) && (
        <p className="line-through text-gray-500 font-medium">
          <FormattedPrice amount={regularPrice} />
        </p>
      )}
      {isPriceDefined(discountedPrice) && (
        <p className="font-bold text-skyText">
          <FormattedPrice amount={discountedPrice} />
        </p>
      )}
    </div>
  );
};

export default PriceTag;
