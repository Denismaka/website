"use server";

import { joinCommunity } from "@cdc/api-client";

export async function joinCommunityAction(email: string) {
    return joinCommunity(email);
}
