// import Comparison from "@/components/constantElements/Comparison";
import { getSsrData } from "@/data/loaders";
import dynamic from "next/dynamic";
import Skeleton from '@mui/material/Skeleton';



const Comparison = dynamic(() => import("@/components/constantElements/Comparison"), {
  ssr: false,
  loading: () => (
      <div className="w-full h-[543px] sm:col-span-1"><Skeleton variant="rectangular" sx={{ width: '100%' }} height={543} animation="wave" /></div>
  ),
});

export default async function Page({ params, searchParams }) {
  const slug = params.handler.join("/");
  const fetchedData = await getSsrData(`api/compare/${slug}`);
  return (
    <>
      <Comparison data={fetchedData.data.data} />
    </>
  );
}
