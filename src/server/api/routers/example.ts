import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { supabase } from "@/server/Supabase";

export const exampleRouter = createTRPCRouter({
  user: publicProcedure.query(async () => {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.log(error);
      return {
        code: error.code,
        message: error.message,
      };
    }

    return { data: data, error: error };
  }),
});
