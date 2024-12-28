import AddNewsLetterArticleForm from "@/components/admin/add-news-letter-article-form";
import DeleteNewsLetterArticleForm from "@/components/admin/delete-news-letter-article-form";
import UpDateNewsLetterArticleForm from "@/components/admin/update-news-letter-article-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { strapiSdk } from "@/strapi";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export default async function page() {
  const newsLetterSingle = await strapiSdk.single("news-letter").find({
    populate: {
      articles: {
        populate: "*",
      },
    },
  });
  const articles = newsLetterSingle?.data?.attributes?.articles;

  return (
    <div className="p-12">
      <h1 className="font-extrabold text-3xl">Publicités</h1>
      <div className="flex justify-end">
        <AddNewsLetterArticleForm />
      </div>
      <Table className="mt-12">
        <TableHeader>
          <TableRow className="dark:hover:bg-gray-800 dark:border-gray-800">
            <TableHead>#</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Désignation</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Visible</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles &&
            articles.map((article: any, i: number) => (
              <TableRow key={article.id} className="cursor-pointer">
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="font-medium">
                  <div className="relative w-24 h-24 rounded">
                    {article.image.data?.attributes?.url && (
                      <Image
                        src={
                          process.env.NEXT_STORAGE_BUCKET_URL +
                          article.image.data.attributes.url
                        }
                        alt={"Publicité"}
                        fill
                        className="rounded object-cover"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {article.name ?? "-"}
                </TableCell>
                <TableCell className="font-medium">
                  {article.description ?? "-"}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex gap-3 items-center">
                    <UpDateNewsLetterArticleForm articleId={article.id} />
                    <DeleteNewsLetterArticleForm articleId={article.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
