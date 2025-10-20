export const uploadToCloudinary = async (pics) => {
  const CLOUD_NAME = "dqiivlmgs";
  const UPLOAD_PRESET = "ecommerce_preset";

  if (!pics) {
    console.error("No file provided");
    return null;
  }

  const data = new FormData();
  data.append("file", pics);
  data.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    console.log(result);

    if (!response.ok) {
      console.error("Upload error:", result);
      return null;
    }

    return result.secure_url;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};
