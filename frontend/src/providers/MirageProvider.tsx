"use client";

import { makeServer } from "@/services/mirage";
import { useEffect } from "react";

export default function MirageProvider() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            makeServer({ environment: "development" });
        }
    }, []);

    return null;
}
