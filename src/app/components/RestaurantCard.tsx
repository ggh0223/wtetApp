import Image from 'next/image';

type RestaurantCardProps = {
  name: string;
  imageUrl: string | null;
  link: string;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, imageUrl, link }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${name} 메뉴 이미지`}
            width={300}
            height={200}
            className="object-cover"
          />
        ) : (
          <a href={link} className="text-blue-500 underline text-center">
            메뉴 확인하기
          </a>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
