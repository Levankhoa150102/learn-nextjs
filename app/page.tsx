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
            <li>Item 4</li>
            <li>Item 5</li>

            <li>Item 6</li> {/*Add by test2 */}
            <li>Item 7</li> {/*Add by test2 */}
          </ul>
        </div>
    </>
  );
}
