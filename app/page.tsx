import StandardizeName from "@/utils/StandlizeName";

export default function Home() {
  return (
    <>
        <div>
          <p>SOME FUNCTION {StandardizeName("Some Name")}, Here is main change version 2</p>
          <p>Test Github Action</p>
          <p>Do action to fix bug on main</p>
        </div>
    </>
  );
}
