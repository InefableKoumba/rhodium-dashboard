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
    const articleId = formData.get("articleId");

    const newsLetterSingle = await strapiSdk.single("news-letter").find({
      populate: {
        articles: {
          populate: "*",
        },
      },
    });
    const articles = newsLetterSingle.data.attributes.articles;

    const updatedArticles = [];

    for (const article of articles) {
      if (article.id.toString() !== articleId) {
        updatedArticles.push({
          __component: "news-letter.news-letter-article",
          image: article?.image?.data?.id,
        });
      }
    }
    console.log(articleId);
    console.log(updatedArticles);

    await fetch(`${process.env.NEXT_API_URL}/news-letter`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          articles: updatedArticles,
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
