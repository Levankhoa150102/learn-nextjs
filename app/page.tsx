import CheckBox from "@/components/CheckBox";
import StandardizeName from "@/utils/StandlizeName";

export default function Home() {
  return (
    <>
        <div>
          <p>SOME FUNCTION {StandardizeName("Some Name")}, Here is main change version 2</p>
          <p>Test Github Action</p>
          <p>Do action to fix bug on main</p>
          <p>Fix quick bug in hear</p>
          <p>hihi ahha</p>
          <p>hihi ahha</p>
          <p>hihi ahha</p>
          <p>hihi ahha</p>
          <p>hihi ahha</p>
          <p>hihi ahha</p>
          <p>hihi ahha</p>
          <p>hihi ahha</p>
          <p>hihi ahha</p>
          <p>hihi ahha</p>
          <p>hihi ahha</p>
          <CheckBox id="checkbox1" label="CheckBox 1" />
          <CheckBox id="checkbox2" label="CheckBox 2" />
        </div>
    </>
  );
}
