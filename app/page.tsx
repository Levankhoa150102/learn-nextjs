import StandardizeName from "@/utils/StandlizeName";

export default function Home() {
  return (
    <>
        <div>
          <p>SOME FUNCTION {StandardizeName("Some Name")}</p>
        </div>
    </>
  );
}
