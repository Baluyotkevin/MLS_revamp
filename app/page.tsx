import Banner from "@/components/Banner";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto w-full inset-0 h-full bg-[radial-gradient(#e5e7eb_1px), transparent_1px] [background-size:16px_16px]">
      <Banner />
      {/* <Divider />
      <HowItWorks />
      <Divider />
      <Pricing />
      <Divider />
      <Footer /> */}
    </div>
  );
}
