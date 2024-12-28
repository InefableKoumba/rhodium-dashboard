import { strapiSdk } from "@/strapi";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge", // Forces the Edge runtime
};

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        success: false,
        message: "Method not allowes",
      },
      { status: 405 }
    );
  }

  try {
    const formData = await req.formData();
    const files = formData.get("files");

    if (!files) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    const form = new FormData();
    form.append("files", files);

    const response = await fetch(`${process.env.NEXT_API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
      body: form,
    });

    if (!response.ok) {
      throw new Error(`Image upload failed: ${response.statusText}`);
    }

    const uploadedImage = await response.json();

    const newsLetterSingle = await strapiSdk.single("news-letter").find({
      populate: {
        articles: {
          populate: "*",
        },
      },
    });
    const articles = newsLetterSingle.data.attributes.articles;

    const formattedArticles = articles.map((article: any) => {
      return {
        __component: "news-letter.news-letter-article",
        image: article.image.data.id,
      };
    });

    const res = await fetch(`${process.env.NEXT_API_URL}/news-letter`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          articles: [
            {
              __component: "news-letter.news-letter-article",
              image: uploadedImage[0].id,
            },
            ...formattedArticles,
          ],
        },
      }),
    });

    return NextResponse.json(
      { success: true, message: "Success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
