import StandardizeName from "@/utils/StandlizeName";

export default function Home() {
  return (
    <>
        <div>
          <p>SOME FUNCTION {StandardizeName("Some Name")}, Here is main change version 2</p>
          <p> Here is a new paragraph added in version 2</p> <span>...</span>
        </div>
    </>
  );
}
