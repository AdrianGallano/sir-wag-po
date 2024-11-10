import React, { useState, useEffect } from "react";
import dataFetch from "@/services/data-service";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Image {
  id: string;
  image_url: string;
  open: boolean;
}

interface ImageManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageId: string, imageURL: string) => void;
}

const ImageManager: React.FC<ImageManagerProps> = ({
  isOpen,
  onClose,
  onSelectImage,
}) => {
  const [images, setImages] = useState<Image[]>([]);
  const { token } = useAuth();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  // Function to fetch images
  const fetchImages = async () => {
    const endpoint = "/api/images/";

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const response = await dataFetch(endpoint, "GET", {}, token);
      console.log("Images fetched:", response);
      setImages(response);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [token]);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    console.log("Image ID clicked:", image.id);
    console.log("Image URL clicked:", image.image_url);
  };
  //for deletion of images
  const handleDeleteImage = async (imageId: string) => {
    const endpoint = `/api/images/${imageId}/`;

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const response = await dataFetch(endpoint, "DELETE", {}, token);
      console.log("Image deleted:", response);
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  //for submission of images
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!token) {
      console.log("Token doesn't exist");
      return;
    }
    if (files) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        console.log(`Appending file: ${files[i].name}`);
        formData.append("images", files[i]);
      }

      const endpoint = "/api/images/";
      try {
        const response = await dataFetch(endpoint, "POST", formData, token);
        console.log("Images uploaded:", response);
        fetchImages(); // Refresh the image list after upload
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-[60%] h-[80vh] overflow-y-auto flex flex-col">
          <DialogHeader>
            <DialogTitle>Image Manager</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="upload" className="sticky top-0 z-10 bg-white">
            <TabsList className="w-full flex justify-around border-b border-gray-200">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="folder">Folders</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="">
              <div>
                <Label htmlFor="picture">Picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  id="filePicker"
                />
              </div>
            </TabsContent>
            <TabsContent value="folder">
              <div className="grid grid-cols-2 gap-4 p-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image.image_url}
                      alt={`Image ${image.id}`}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image.id);
                        }}
                        className="bg-red-600 text-white mx-1 hover:bg-red-700"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectImage(image.id, image.image_url);
                          onClose();
                        }}
                        className="bg-green-600 text-white mx-1 hover:bg-green-700"
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageManager;
