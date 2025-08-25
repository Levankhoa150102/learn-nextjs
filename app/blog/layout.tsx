import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Blog Page",
  description: "Welcome to the blog page",
};

export default function BlogPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-2">
      {children}
    </div>
  );
}
