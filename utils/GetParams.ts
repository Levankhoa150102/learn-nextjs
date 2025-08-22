'use client'
import { useParams } from "next/navigation";

function GetParams() {
    const param = useParams();
    return param
}

export default GetParams;