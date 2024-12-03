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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImagePlusIcon, Inbox } from "lucide-react";
import { toast } from "sonner";
import { CircleCheck } from "lucide-react";
import { Label } from "../ui/label";
import DeleteImage from "./delete-image";
import { Image } from "@/models/image";

// interface Image {
//   id: string;
//   image_url: string;
//   open: boolean;
// }

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
  const [deleteImage, setDeleteImage] = useState<boolean>(false);

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
  };

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
        const response = await dataFetch(endpoint, "POST", formData, token!);
        toast("Image successfully added", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
          className: "bg-white text-custom-charcoalOlive",
        });
        fetchImages();
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-[70%] h-[80vh] overflow-y-auto flex flex-col">
          <DialogHeader>
            <DialogTitle>Image Manager</DialogTitle>
          </DialogHeader>

          {images.length != 0 && (
            <div>
              <TooltipProvider>
                <Tooltip>
                  <div className="flex w-full  items-start justify-end bg-grey-lighter">
                    <TooltipTrigger asChild>
                      <label className="w-fit flex flex-col items-center p-2.5 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-gray-100">
                        <ImagePlusIcon className="w-5 h-5" />

                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          id="filePicker"
                          onChange={handleFileChange}
                        />
                      </label>
                    </TooltipTrigger>
                  </div>
                  <TooltipContent side="left" align="center">
                    <p>Add Image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="grid grid-cols-4 gap-2 py-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 flex w-full"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image.image_url}
                      alt={`Image ${image.id}`}
                      className="w-fit h-auto object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteImage(true);
                          setSelectedImage(image);
                        }}
                        variant={"destructive"}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectImage(image.id, image.image_url);
                          onClose();
                        }}
                        className=" bg-green-500 text-white mx-1 hover:bg-green-700"
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!images.length && (
            <div className="flex items-center justify-center h-full w-full">
              <div className=" w-full max-w-md mx-auto  ">
                <div className="flex flex-col items-center">
                  <Inbox className="text-gray-400 text-6xl" />
                  <h2 className="mt-4 text-xl font-semibold text-gray-700">
                    No Images Found
                  </h2>
                  <p className="mt-2 text-center text-gray-500">
                    It looks like we couldn’t find any image here. Start by
                    adding some new image to see them listed here.
                  </p>
                  <Label
                    className="mt-6 px-4 py-3 bg-custom-char text-white rounded-md shadow hover:bg-custom-charcoalOlive focus:outline-none  focus:ring-opacity-75 cursor-pointer"
                    htmlFor="filePicker"
                  >
                    Add Image
                  </Label>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    id="filePicker"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {deleteImage && selectedImage && (
        <DeleteImage
          isOpen={deleteImage}
          onClose={() => setDeleteImage(false)}
          onUpdate={fetchImages}
          image={selectedImage}
        />
      )}
    </>
  );
};

export default ImageManager;
