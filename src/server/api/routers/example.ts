import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { supabase } from "@/server/Supabase";
import { Tweet } from "@/utils/types";

export const tweetsRouter = createTRPCRouter({
  getTweets: publicProcedure.query(async () => {
    const { data, error } = await supabase.from("tweets").select("*");

    if (error) {
      return {
        tweets: [],
        error: error,
      };
    }

    return { tweets: data, error: error };
  }),
});
