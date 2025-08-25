import Image from "next/image";
import NextImage from "@/public/next.svg";
import FileImage from "@/public/file.svg";
export default function Home() {
  return (
    <>
      <div>
        <p>Blog Viewer</p>
        <Image
          src= {NextImage}
          alt="Picture of the author"
          fill
        />

        <Image
          src={FileImage}
          alt="File icon"
          width={200}
          height={200}
        />
      </div>
    </>
  );
}
