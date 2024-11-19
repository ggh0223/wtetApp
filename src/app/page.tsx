"use client"; // Add this directive at the top

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageModal from "./components/ImageModal";

type MenuItem = {
  id: number;
  created_at: string;
  title: string;
  content: string;
  imageUrl: string | null;
  source: "dongchun-hansik" | "the.siktak" | "iganepork";
};

export default function Page() {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // Fetch data on the client side
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://whattoeattoday-server.vercel.app/api/menu");
      const data = await res.json();
      setMenuData(data.data ?? []);
    }
    fetchData();
  }, []);

  const openModal = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">오늘의 메뉴</h1>
        {menuData.length ? (
          menuData.map((item) => (
            <div key={item.id} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{item.source}</h2>
              <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer" onClick={() => item.imageUrl && openModal(item.imageUrl)}>
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={`${item.source} 메뉴 이미지`} width={300} height={200} className="object-cover" />
                ) : (
                  <a href={`/menu-link/${item.id}`} className="text-blue-500 underline text-center">
                    메뉴 확인하기
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">메뉴는 오전 11시 05분 경 업데이트 됩니다.</p>
          </div>
        )}
        {currentImage && <ImageModal isOpen={isModalOpen} onOpenChange={closeModal} imageUrl={currentImage} altText="확대된 이미지" />}
      </div>
    </div>
  );
}
