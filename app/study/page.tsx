'use client'
import Post from "@/components/Post";
import { UserProvider } from "@/context/UserContext";
// import CheckBox from "@/components/CheckBox";
import { useCallback, useMemo, useState } from "react";

export default function HookPage() {
const [user, setUser] = useState<Array<string>>([]);

  const getUser = useCallback((type: string) => {
    return fetch(`https://jsonplaceholder.typicode.com/${type}`)
  },[])


  async function fetchUser(type: string) {
    const response = await getUser(type);
    const data = await response.json();
    setUser(data);
  }

  function calcComplexity(number: number){
    setTimeout(() => {
      console.log("Complexity calculated");
    }, 3000);
    return number*number
  }
  const complexity = useMemo(() => calcComplexity(5), []);

  return(
     <UserProvider>
          <p>Complexity: {complexity}</p>
          <button onClick={() => fetchUser("users/1")}>Click</button>
          {JSON.stringify(user)}
          <br/>
          <Post getData={getUser} />

    </UserProvider>
  )
}
