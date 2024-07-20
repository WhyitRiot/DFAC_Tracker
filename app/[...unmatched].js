import React, {useEffect} from 'react'
import { useRouter } from "expo-router";

export default function Unmatched() {
  const router = useRouter();

  useEffect(() => {
    router.push("");
  }, []);

  return null;
}