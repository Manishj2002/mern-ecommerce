import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  useEffect(() => {
    console.log("Fetching feature images...");
    dispatch(getFeatureImages()).then((res) => console.log("Feature images:", res));
  }, [dispatch]);

  const handleUploadFeatureImage = () => {
    console.log("Uploading image:", uploadedImageUrl);
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      console.log("Upload response:", data);
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  };

  const handleDeleteImage = (imageId) => {
    console.log("Deleting image with ID:", imageId);
    if (window.confirm("Are you sure you want to delete this image?")) {
      dispatch(deleteFeatureImage(imageId))
        .then((res) => {
          console.log("Delete response:", res);
          if (res?.payload?.success) {
            console.log("Deleted successfully, refreshing list...");
            dispatch(getFeatureImages());
          } else {
            console.log("Delete failed:", res);
          }
        })
        .catch((err) => {
          console.error("Error deleting image:", err);
        });
    }
  };

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />

      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div key={featureImgItem._id} className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <Button
                  className="absolute top-2 right-2 bg-red-500 text-white"
                  onClick={() => handleDeleteImage(featureImgItem._id)}
                >
                  Delete
                </Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
