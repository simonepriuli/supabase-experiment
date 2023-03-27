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

  postTweet: publicProcedure
    .input(z.object({ author: z.string(), content: z.string() }))
    .mutation(async ({ input }) => {
      //

      const tweet = {
        author: input.author,
        content: input.content,
      };

      await supabase.from("tweets").insert(tweet);
    }),
});
