import StandardizeName from "@/utils/StandlizeName";

export default function Home() {
  return (
    <>
        <div>
          <p>SOME FUNCTION {StandardizeName("Some Name")}, Here is main change version 2</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
    </>
  );
}
