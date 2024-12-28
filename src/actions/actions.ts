"use server";

interface StrapiResponse {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  }[];
}

async function uploadToStrapi(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("files", file);

  const response = await fetch(`${process.env.NEXT_API_URL}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const data: StrapiResponse = await response.json();
  return data.data[0].attributes.url;
}

async function processFormData(formData: FormData) {
  console.log("Parsing data");
  try {
    // Extract file from FormData
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file type if needed
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type");
    }

    // Upload to Strapi
    const fileUrl = await uploadToStrapi(file);

    // Return success response
    return {
      success: true,
      fileUrl,
      message: "File uploaded successfully",
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

export { processFormData };
