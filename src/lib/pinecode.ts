import { Pinecone } from "@pinecone-database/pinecone";
import { getPdfFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  const file_name = await getPdfFromS3(fileKey);
  if (!file_name) {
    throw new Error("could not download from s3");
  }
  console.log("loading pdf into memory" + file_name);
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];

  return pages;
}
